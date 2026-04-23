const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const mongoose = require('mongoose')
const moment = require('moment')

const pickJobFields = (body = {}, options = {}) => {
    const { partial = false } = options
    const fields = [
        'company',
        'position',
        'status',
        'jobType',
        'jobLocation',
        'industry',
        'compensation',
        'transportation',
        'deadline',
        'website',
        'contactEmail',
        'applicationInstructions',
        'description',
        'notes',
        'requiredMajor',
        'targetGroup',
        'sourceType',
        'sourceOpportunityId',
    ]

    const jobData = {}

    fields.forEach((field) => {
        if (partial && !Object.prototype.hasOwnProperty.call(body, field)) {
            return
        }

        if (field === 'requiredMajor' || field === 'targetGroup') {
            if (Object.prototype.hasOwnProperty.call(body, field)) {
                jobData[field] = Array.isArray(body[field]) ? body[field] : []
            } else if (!partial) {
                jobData[field] = []
            }
            return
        }

        if (field === 'deadline') {
            if (Object.prototype.hasOwnProperty.call(body, field)) {
                jobData.deadline = body.deadline || undefined
            } else if (!partial) {
                jobData.deadline = undefined
            }
            return
        }

        if (Object.prototype.hasOwnProperty.call(body, field)) {
            jobData[field] = body[field]
        } else if (!partial) {
            jobData[field] = ''
        }
    })

    return jobData
}

const buildOpportunityKey = (company = '', position = '') =>
    `${company}::${position}`.trim()

const escapeRegex = (value = '') =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')


const getAllJobs = async(req, res) => {
    const { search, status, jobType, sort } = req.query
    const queryObject = {
        createdBy: req.user.userId,
    }
    if (search) {
        queryObject.$or = [
            { position: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
            { industry: { $regex: search, $options: 'i' } },
        ]
    }
    if (status && status !== 'all') {
        if (status === 'submitted') {
            queryObject.status = { $in: ['submitted', 'applied'] }
        } else if (status === "didn't apply yet") {
            queryObject.status = { $in: ["didn't apply yet", "didn't yet", 'pending'] }
        } else {
            queryObject.status = status
        }
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType
    }


    let result = Job.find(queryObject)
    if (sort === 'latest') { result = result.sort('-createdAt') }
    if (sort === 'oldest') { result = result.sort('createdAt') }
    if (sort === 'a-z') { result = result.sort('position') }
    if (sort === 'z-a') { result = result.sort('-position') }


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const jobs = await result.skip(skip).limit(limit)

    const totalJobs = await Job.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / limit)
    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

const getSavedOpportunityRefs = async(req, res) => {
    const jobs = await Job.find({
        createdBy: req.user.userId,
        sourceType: 'AIEF',
    }).select('company position sourceOpportunityId').lean()

    const savedOpportunityIds = [...new Set(
        jobs
            .map((job) => job.sourceOpportunityId)
            .filter(Boolean)
    )]

    const savedOpportunityKeys = [...new Set(
        jobs
            .map((job) => buildOpportunityKey(job.company, job.position))
            .filter((value) => value !== '::')
    )]

    res.status(StatusCodes.OK).json({ savedOpportunityIds, savedOpportunityKeys })
}

const getJob = async(req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId,
    })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}


const createJob = async(req, res) => {
    const jobData = pickJobFields(req.body)

    if (!jobData.company || !jobData.position || !jobData.jobLocation) {
        throw new BadRequestError('Company, Position and Job Location fields cannot be empty')
    }

    if (jobData.sourceType === 'AIEF') {
        const duplicateChecks = []

        if (jobData.sourceOpportunityId) {
            duplicateChecks.push({
                sourceType: 'AIEF',
                sourceOpportunityId: jobData.sourceOpportunityId,
            })
        }

        duplicateChecks.push({
            sourceType: 'AIEF',
            company: { $regex: `^${escapeRegex(jobData.company)}$`, $options: 'i' },
            position: { $regex: `^${escapeRegex(jobData.position)}$`, $options: 'i' },
        })

        const existingOpportunityJob = await Job.findOne({
            createdBy: req.user.userId,
            $or: duplicateChecks,
        })

        if (existingOpportunityJob) {
            throw new BadRequestError('This opportunity is already in your jobs')
        }
    }

    jobData.createdBy = req.user.userId
    const job = await Job.create(jobData)
    res.status(StatusCodes.CREATED).json({ job, msg: 'Job Created' })
}

const updateJob = async(req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req

    const jobData = pickJobFields(req.body, { partial: true })

    if (
        (Object.prototype.hasOwnProperty.call(jobData, 'company') && !jobData.company) ||
        (Object.prototype.hasOwnProperty.call(jobData, 'position') && !jobData.position) ||
        (Object.prototype.hasOwnProperty.call(jobData, 'jobLocation') && !jobData.jobLocation)
    ) {
        throw new BadRequestError('Company, Position and Job Location fields cannot be empty')
    }

    const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId },
        { $set: jobData }, { new: true, runValidators: true }
    )
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async(req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req

    const job = await Job.findByIdAndRemove({
        _id: jobId,
        createdBy: userId,
    })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}
const showStats = async(req, res) => {
    // 1. Get the aggregate data
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // 2. Convert array to object
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    // 3. Set defaults so the frontend always gets the expected keys
    const defaultStats = {
        didntYet: stats["didn't apply yet"] || stats["didn't yet"] || stats.pending || 0,
        submitted: stats.submitted || stats.applied || 0,
        interview: stats.interview || 0,
        accepted: stats.accepted || 0,
        rejected: stats.rejected || stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                count: { $sum: 1 },
            }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);
    console.log(monthlyApplications)
    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { year, month }, count } = item;
        const date = moment()
            .month(month - 1)
            .year(year);
        return { date: date.format('MMM Y'), count };
    });

    // 4. Send response (Empty array for monthlyApplications until you build that logic)
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications: monthlyApplications.reverse() });
};
module.exports = {
    createJob,
    deleteJob,
    getAllJobs,
    getSavedOpportunityRefs,
    updateJob,
    getJob,
    showStats
}

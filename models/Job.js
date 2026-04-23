const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["didn't apply yet", 'submitted', 'accepted', 'rejected', 'interview'],
        default: "didn't apply yet",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'internship'
    },
    jobLocation: {
        type: String,
        default: 'my city',
        required: true
    },
    industry: {
        type: String,
        default: '',
        trim: true,
    },
    compensation: {
        type: String,
        default: '',
        trim: true,
    },
    transportation: {
        type: String,
        default: '',
        trim: true,
    },
    deadline: {
        type: Date,
    },
    website: {
        type: String,
        default: '',
        trim: true,
    },
    contactEmail: {
        type: String,
        default: '',
        trim: true,
    },
    applicationInstructions: {
        type: String,
        default: '',
        trim: true,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    notes: {
        type: String,
        default: '',
        trim: true,
    },
    requiredMajor: {
        type: [String],
        default: [],
    },
    targetGroup: {
        type: [String],
        default: [],
    },
    sourceType: {
        type: String,
        default: '',
        trim: true,
    },
    sourceOpportunityId: {
        type: String,
        default: '',
        trim: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)

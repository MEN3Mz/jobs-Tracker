require('dotenv').config();

const connectDB = require('./db/connect');
const Job = require('./models/Job');
const AIEF = require('./models/AIEF');

const extractEmail = (value = '') => {
  const emailMatch = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return emailMatch ? emailMatch[0] : '';
};

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const jobs = await Job.find({}).lean();
    let updatedCount = 0;

    for (const job of jobs) {
      const aiefMatch = await AIEF.findOne({
        companyName: { $regex: `^${job.company.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' },
        internshipTitle: { $regex: `^${job.position.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' },
      }).lean();

      if (!aiefMatch) {
        continue;
      }

      const update = {
        industry: aiefMatch.industry || job.industry || '',
        compensation: aiefMatch.compensation || job.compensation || '',
        deadline: aiefMatch.deadline || job.deadline,
        website: aiefMatch.website || job.website || '',
        contactEmail: extractEmail(aiefMatch.howToApply) || job.contactEmail || '',
        applicationInstructions:
          aiefMatch.howToApply || job.applicationInstructions || '',
        description: aiefMatch.jobDescription || job.description || '',
        requiredMajor:
          aiefMatch.requiredMajor?.length > 0
            ? aiefMatch.requiredMajor
            : job.requiredMajor || [],
        targetGroup:
          aiefMatch.targetGroup?.length > 0
            ? aiefMatch.targetGroup
            : job.targetGroup || [],
        sourceType: 'AIEF',
        sourceOpportunityId: `${aiefMatch.companyName}${aiefMatch.internshipTitle}`,
      };

      await Job.updateOne({ _id: job._id }, { $set: update });
      updatedCount += 1;
    }

    console.log(`Backfilled ${updatedCount} jobs from AIEF data`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

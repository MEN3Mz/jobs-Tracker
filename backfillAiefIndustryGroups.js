require('dotenv').config();

const connectDB = require('./db/connect');
const AIEF = require('./models/AIEF');
const getAiefIndustryGroup = require('./utils/aiefIndustryGroup');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const opportunities = await AIEF.find({}, 'industry').lean();

    let updatedCount = 0;

    for (const opportunity of opportunities) {
      await AIEF.updateOne(
        { _id: opportunity._id },
        { $set: { industryGroup: getAiefIndustryGroup(opportunity.industry) } }
      );
      updatedCount += 1;
    }

    console.log(`Backfilled industry groups for ${updatedCount} AIEF opportunities`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

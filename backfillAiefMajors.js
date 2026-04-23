require("dotenv").config();

const connectDB = require("./db/connect");
const AIEF = require("./models/AIEF");
const normalizeAiefMajors = require("./utils/normalizeAiefMajors");

const backfillAiefMajors = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const opportunities = await AIEF.find({});
    let updatedCount = 0;

    for (const opportunity of opportunities) {
      const normalizedMajors = normalizeAiefMajors(opportunity.requiredMajor);
      const currentMajors = JSON.stringify(opportunity.requiredMajor || []);
      const nextMajors = JSON.stringify(normalizedMajors);

      if (currentMajors !== nextMajors) {
        opportunity.requiredMajor = normalizedMajors;
        await opportunity.save();
        updatedCount += 1;
      }
    }

    console.log(`Updated ${updatedCount} opportunities`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

backfillAiefMajors();

require("dotenv").config();

const connectDB = require("./db/connect");
const AIEF = require("./models/AIEF");

const backfillAiefCompensation = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const result = await AIEF.updateMany(
      { compensation: "Not Specified" },
      { $set: { compensation: "Not Mentioned" } }
    );

    console.log(`Updated ${result.modifiedCount || result.nModified || 0} opportunities`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

backfillAiefCompensation();

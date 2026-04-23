require('dotenv').config();

const connectDB = require('./db/connect');
const AIEF = require('./models/AIEF');
const aiefData = require('./aief-data.json');
const normalizeAiefMajors = require('./utils/normalizeAiefMajors');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const normalizedData = aiefData.map((opportunity) => ({
      ...opportunity,
      requiredMajor: normalizeAiefMajors(opportunity.requiredMajor),
    }));
    await AIEF.deleteMany();
    await AIEF.create(normalizedData);
    console.log(`Seeded ${normalizedData.length} AIEF opportunities`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

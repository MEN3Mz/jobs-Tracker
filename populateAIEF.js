require('dotenv').config();

const connectDB = require('./db/connect');
const AIEF = require('./models/AIEF');
const aiefData = require('./aief-data.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await AIEF.deleteMany();
    await AIEF.create(aiefData);
    console.log(`Seeded ${aiefData.length} AIEF opportunities`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

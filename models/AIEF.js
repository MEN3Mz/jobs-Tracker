const mongoose = require("mongoose");

const AIEFschema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
      default: "",
    },
    website: {
      type: String,
      trim: true,
      default: "",
    },
    internshipTitle: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: [String],
      default: [],
    },
    jobDescription: {
      type: String,
      trim: true,
      default: "",
    },
    qualifications: {
      type: String,
      trim: true,
      default: "",
    },
    requiredMajor: {
      type: [String],
      default: [],
    },
    targetGroup: {
      type: [String],
      default: [],
    },
    workType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Remote", "Internship"],
      required: true,
    },
    workDays: {
      type: Number,
      default: 0,
    },
    workHours: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    transportation: {
      type: String,
      enum: ["Provided", "Not Provided"],
      default: "Not Provided",
    },
    compensation: {
      type: String,
      enum: ["Paid", "Unpaid", "Not Specified"],
      default: "Not Specified",
    },
    durationInWeeks: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
    },
    deadline: {
      type: Date,
    },
    howToApply: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AIEF", AIEFschema);

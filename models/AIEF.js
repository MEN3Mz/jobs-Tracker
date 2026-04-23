const mongoose = require("mongoose");
const getAiefIndustryGroup = require("../utils/aiefIndustryGroup");
const GUC_MAJORS = require("../utils/gucMajors");
const normalizeAiefMajors = require("../utils/normalizeAiefMajors");

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
    industryGroup: {
      type: String,
      trim: true,
      default: "Other",
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
      validate: {
        validator: (majors) => majors.every((major) => GUC_MAJORS.includes(major)),
        message: "Please select only supported GUC majors",
      },
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
      enum: ["Provided", "Not Provided", "Not Mentioned"],
      default: "Not Mentioned",
    },
    compensation: {
      type: String,
      enum: ["Paid", "Unpaid", "Not Specified", "Not Mentioned"],
      default: "Not Mentioned",
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

AIEFschema.pre("save", function (next) {
  this.requiredMajor = normalizeAiefMajors(this.requiredMajor);
  this.industryGroup = getAiefIndustryGroup(this.industry);
  next();
});

AIEFschema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() || {};
  const nextMajors =
    update.requiredMajor ??
    update.$set?.requiredMajor ??
    update.$setOnInsert?.requiredMajor;
  const nextIndustry =
    update.industry ?? update.$set?.industry ?? update.$setOnInsert?.industry;

  if (nextMajors !== undefined) {
    const normalizedMajors = normalizeAiefMajors(nextMajors);

    if (update.$set) {
      update.$set.requiredMajor = normalizedMajors;
    } else {
      update.requiredMajor = normalizedMajors;
    }
  }

  if (nextIndustry !== undefined) {
    const industryGroup = getAiefIndustryGroup(nextIndustry);

    if (update.$set) {
      update.$set.industryGroup = industryGroup;
    } else {
      update.industryGroup = industryGroup;
    }

    this.setUpdate(update);
  }

  if (nextMajors !== undefined) {
    this.setUpdate(update);
  }

  next();
});

module.exports = mongoose.model("AIEF", AIEFschema);

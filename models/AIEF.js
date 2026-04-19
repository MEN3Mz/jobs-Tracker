const mongoose = require("mongoose");
const getAiefIndustryGroup = require("../utils/aiefIndustryGroup");

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

AIEFschema.pre("save", function (next) {
  this.industryGroup = getAiefIndustryGroup(this.industry);
  next();
});

AIEFschema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() || {};
  const nextIndustry =
    update.industry ?? update.$set?.industry ?? update.$setOnInsert?.industry;

  if (nextIndustry !== undefined) {
    const industryGroup = getAiefIndustryGroup(nextIndustry);

    if (update.$set) {
      update.$set.industryGroup = industryGroup;
    } else {
      update.industryGroup = industryGroup;
    }

    this.setUpdate(update);
  }

  next();
});

module.exports = mongoose.model("AIEF", AIEFschema);

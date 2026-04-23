const GUC_MAJORS = require("./gucMajors");

const majorMap = {
  BI: ["Business Informatics"],
  "Business Management": ["Business Management"],
  CS: ["Computer Science & Engineering"],
  Communications: ["Communications Engineering"],
  Electronics: ["Electronics Engineering"],
  IET: [
    "Communications Engineering",
    "Electronics Engineering",
    "Networks Engineering",
  ],
  MET: ["Computer Science & Engineering"],
  Pharmacy: ["Pharmacy"],
  "Production Engineering": ["Production Engineering"],
  Dentistry: ["Dentistry"],
  "Applied Arts": ["Applied Arts"],
  Architecture: ["Architecture"],
  "Civil Engineering": ["Civil Engineering"],
  "Business Informatics": ["Business Informatics"],
  "Computer Science & Engineering": ["Computer Science & Engineering"],
  "Communications Engineering": ["Communications Engineering"],
  "Electronics Engineering": ["Electronics Engineering"],
  "Networks Engineering": ["Networks Engineering"],
  "Mechatronics Engineering": ["Mechatronics Engineering"],
  "Materials Engineering": ["Materials Engineering"],
};

const normalizeAiefMajors = (majors = []) => {
  if (!Array.isArray(majors)) return [];

  const normalized = majors.flatMap((major) => {
    const trimmedMajor = typeof major === "string" ? major.trim() : "";

    if (!trimmedMajor) return [];

    const mappedMajors = majorMap[trimmedMajor] || [trimmedMajor];

    return mappedMajors.filter((mappedMajor) => GUC_MAJORS.includes(mappedMajor));
  });

  return [...new Set(normalized)];
};

module.exports = normalizeAiefMajors;

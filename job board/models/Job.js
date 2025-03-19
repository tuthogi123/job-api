const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  applyLink: String,
  skillsRequired: [String],
  scrapedFrom: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);

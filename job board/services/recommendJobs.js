const Job = require("../models/Job");

const recommendJobs = async (userSkills) => {
  const allJobs = await Job.find();
  
  const rankedJobs = allJobs.map(job => {
    const matchScore = job.skillsRequired.filter(skill => userSkills.includes(skill)).length;
    return { ...job._doc, matchScore };
  });

  return rankedJobs.sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = recommendJobs;

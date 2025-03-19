const express = require("express");
const Job = require("../models/Job");
const recommendJobs = require("../services/recommendJobs");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Get job recommendations
router.get("/recommendations", verifyToken, async (req, res) => {
  const user = req.user;
  const jobs = await recommendJobs(user.skills);
  res.json(jobs);
});

module.exports = router;

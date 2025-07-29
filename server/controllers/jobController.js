const Job = require("../models/Job");
const Location = require("../models/Location");

// ✅ GET all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(200).json({
        status: false,
        message: "No jobs found",
        data: [],
      });
    }

    res.status(200).json({
      status: true,
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server error while fetching jobs",
    });
  }
};

// ✅ GET job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(200).json({
        status: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Invalid job ID or server error",
    });
  }
};

// ✅ POST new job + add location if new
exports.createJob = async (req, res) => {
  try {
    const { title, company, type, location, description } = req.body;

    // Validate fields
    if (!title || !company || !type || !location || !description) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // Create new job
    const newJob = new Job({ title, company, type, location, description });
    await newJob.save();

    // ✅ Insert location if not exists
    const existingLocation = await Location.findOne({ name: location });
    if (!existingLocation) {
      await new Location({ name: location }).save();
    }

    res.status(201).json({
      status: true,
      message: "Job added successfully",
      data: newJob,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to add job",
    });
  }
};

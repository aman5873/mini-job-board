// controllers/jobController.js
const Job = require("../models/Job");
const Location = require("../models/Location");
const Application = require("../models/Application");
const cache = require("../utils/cache");

// Helper: enrich job with is_admin / is_applied
const enrichJobWithUserData = async (job, user) => {
  let is_admin = false;
  let is_applied = false;

  if (user) {
    const userId = user._id.toString();
    is_admin = job.postedBy?._id?.toString() === userId;
    is_applied = Boolean(
      await Application.exists({ job: job._id, user: user._id })
    );
  }

  return { ...job.toObject(), is_admin, is_applied };
};

// --- GET ALL JOBS ---
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await cache("all_jobs", async () => {
      const dbJobs = await Job.find().populate("postedBy", "_id email");
      return Promise.all(dbJobs.map((j) => enrichJobWithUserData(j, req.user)));
    });
    res.status(200).json({ status: true, data: jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// --- GET JOB BY ID ---
exports.getJobById = async (req, res) => {
  const key = `job_${req.params.id}`;
  try {
    const job = await cache(key, async () => {
      const dbJob = await Job.findById(req.params.id).populate(
        "postedBy",
        "_id email"
      );
      if (!dbJob) return null;
      return enrichJobWithUserData(dbJob, req.user);
    });

    if (!job)
      return res.status(404).json({ status: false, message: "Job not found" });

    res.status(200).json({ status: true, data: job });
  } catch (err) {
    console.error("Error fetching job by ID:", err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// --- GET JOBS BY LOGGED-IN USER ---
exports.getJobsByUser = async (req, res) => {
  try {
    if (!req.user?._id)
      return res.status(400).json({ status: false, message: "Invalid user" });

    const jobs = await Job.find({ postedBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, data: jobs });
  } catch (err) {
    console.error("Error fetching jobs by user:", err);
    res
      .status(500)
      .json({ status: false, message: "Server error fetching listings" });
  }
};

// --- CREATE JOB ---
exports.createJob = async (req, res) => {
  try {
    const { title, company, type, location, description } = req.body;
    if (!title || !company || !type || !location || !description)
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });

    const newJob = await new Job({
      title,
      company,
      type,
      location,
      description,
      postedBy: req.user._id,
    }).save();
    if (!(await Location.exists({ name: location })))
      await new Location({ name: location }).save();

    await cache.invalidate("all_jobs"); // safe fallback

    res
      .status(201)
      .json({ status: true, message: "Job added successfully", data: newJob });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ status: false, message: "Failed to add job" });
  }
};

// --- UPDATE JOB ---
exports.updateJob = async (req, res) => {
  try {
    const { job_id, ...updateFields } = req.body;
    if (!job_id)
      return res
        .status(400)
        .json({ status: false, message: "Job ID is required" });

    const updatedJob = await Job.findByIdAndUpdate(job_id, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob)
      return res.status(404).json({ status: false, message: "Job not found" });

    await cache.invalidate("all_jobs");
    await cache.invalidate(`job_${job_id}`);

    res.status(200).json({
      status: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ status: false, message: "Error updating job" });
  }
};

// --- DELETE JOB ---
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob)
      return res.status(404).json({ status: false, message: "Job not found" });

    await cache.invalidate("all_jobs");
    await cache.invalidate(`job_${id}`);

    res.status(200).json({ status: true, message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ status: false, message: "Error deleting job" });
  }
};

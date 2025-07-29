const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
} = require("../controllers/jobController");

const {
  validateJob,
  handleValidationErrors,
} = require("../middleware/jobValidator");

// GET all jobs
router.get("/", getAllJobs);

// GET job by ID
router.get("/:id", getJobById);

// POST new job with validation
router.post("/", validateJob, handleValidationErrors, createJob);

module.exports = router;

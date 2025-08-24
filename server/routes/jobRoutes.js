// routes/jobRoutes
const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const {
  validateJob,
  handleValidationErrors,
} = require("../middleware/jobValidator");
const {
  verifyToken,
  isAdmin,
  attachUserIfExists,
} = require("../middleware/auth");

// Public - view all jobs
router.get("/", attachUserIfExists, jobController.getAllJobs);

// Protected - user's jobs
router.get("/my-listings", verifyToken, jobController.getJobsByUser);

// Single job
router.get("/:id", attachUserIfExists, jobController.getJobById);

// Admin routes
router.post(
  "/",
  verifyToken,
  isAdmin,
  validateJob,
  handleValidationErrors,
  jobController.createJob
);
router.put("/", verifyToken, isAdmin, jobController.updateJob);
router.delete("/:id", verifyToken, isAdmin, jobController.deleteJob);

module.exports = router;

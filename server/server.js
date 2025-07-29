const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const locationRoutes = require("./routes/locationRoutes");

const app = express();

// app.use(cors());
app.use(cors()); // ✅ only allow React fronte
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/locations", locationRoutes);
app.get("/test", (req, res) => {
  res.send("✅ Hello from Mini Job Board backend!");
});

app.use((req, res) => {
  res.status(404).send("❌ Not Found");
});

// Connect DB
connectDB();

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { postNewJob } from "../functions/jobs_ops";

const AddJobPage = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await postNewJob(form); // res = { status, message, data? }

    if (res.status) {
      toast.success(res.message || "Job posted successfully!");
      navigate("/");
    } else {
      toast.error(res.message || "Failed to submit job. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="20px"
      mt={5}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: "100%" }}>
        <Typography variant="h5" mb={3}>
          Add New Job
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Job Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Company Name"
            name="company"
            value={form.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Job Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            select
            fullWidth
            margin="normal"
            variant="outlined"
            required
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </TextField>
          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Submit Job
          </Button>
        </form>
      </Paper>

      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Back To Home
        </Button>
      </Link>
    </Box>
  );
};

export default AddJobPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import { fetchJobById } from "../functions/jobs_ops";

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      const res = await fetchJobById(id);

      if (res.status) {
        setJob(res.data);
        setError("");
      } else {
        setError(res.message || "Failed to load job details");
        setJob(null);
      }

      setLoading(false);
    };

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} textAlign="center">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!job) return null;

  return (
    <Box mt={5} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          {job.title}
        </Typography>

        <Typography variant="h6" color="text.secondary">
          {job.company} — {job.location}
        </Typography>

        <Box mt={2}>
          <Chip label={job.type} color="primary" />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {job.description}
        </Typography>
      </Paper>
    </Box>
  );
}

export default JobDetailsPage;

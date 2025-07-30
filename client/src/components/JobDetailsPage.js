import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Button,
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
    <Box
      mt={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="20px"
      px={{ xs: 2, sm: 3, md: 4 }} // Padding for small to medium screens
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          width: "100%",
          maxWidth: { xs: "95%", sm: "90%", md: "80%" },
        }}
      >
        <Typography variant="h5" gutterBottom>
          {job.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
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

      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Back To Home
        </Button>
      </Link>
    </Box>
  );
}

export default JobDetailsPage;

import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert,
  Button,
} from "@mui/material";
import Select from "react-select";
import debounce from "lodash.debounce";

import { fetchAllJobs, fetchAllLocations } from "../functions/jobs_ops";
import Spinner from "../utils/spinner";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs and cities
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const jobRes = await fetchAllJobs();
      const locRes = await fetchAllLocations();

      if (jobRes.status) {
        setJobs(jobRes.data);
        setFilteredJobs(jobRes.data);
      }

      if (locRes.status) {
        const options = locRes.data.map((loc) => ({
          label: loc.name,
          value: loc.name,
        }));
        setCityOptions(options);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // Debounced title filter
  const debouncedFilter = useMemo(
    () =>
      debounce((title, city) => {
        let result = jobs;

        if (title) {
          result = result.filter((job) =>
            job.title.toLowerCase().includes(title.toLowerCase())
          );
        }

        if (city) {
          result = result.filter((job) =>
            job.location.toLowerCase().includes(city.value.toLowerCase())
          );
        }

        setFilteredJobs(result);
      }, 300),
    [jobs]
  );

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setSearchTitle(value);
    debouncedFilter(value, selectedCity);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    debouncedFilter(searchTitle, city);
  };

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Typography variant="h4">Job Listings</Typography>

        <Link to="/add-job" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            + Add Job
          </Button>
        </Link>
      </Box>

      <Box
        display="flex"
        gap={2}
        mb={3}
        flexWrap="wrap"
        style={{ alignItems: "center" }}
      >
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchTitle}
          onChange={handleTitleChange}
        />
        <Box width={200}>
          <Select
            placeholder="Filter by City"
            options={cityOptions}
            value={selectedCity}
            onChange={handleCityChange}
            isClearable
          />
        </Box>
      </Box>

      {loading ? (
        <Spinner />
      ) : filteredJobs.length === 0 ? (
        <Alert severity="info">No jobs found matching your criteria.</Alert>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={2}
        >
          {filteredJobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={`/job/${job._id}`} style={{ textDecoration: "none" }}>
                <Card sx={{ height: "100%", cursor: "pointer" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.company}
                    </Typography>
                    <Typography variant="body2">
                      {job.location} &bull; {job.type}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;

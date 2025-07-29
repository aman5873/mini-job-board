import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import AddJobPage from "./AddJobPage";
import JobDetailsPage from "./JobDetailsPage";

const JobsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-job" element={<AddJobPage />} />
      <Route path="/job/:id" element={<JobDetailsPage />} />
    </Routes>
  );
};

export default JobsRoutes;

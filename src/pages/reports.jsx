import { Route, Routes } from "react-router-dom";

import NotFound from "./404";
import ReportsPage from "../components/reports/pages/reportsPage";

const Reports = () => {
  return (
    <Routes>
      <Route path="/" element={<ReportsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Reports;

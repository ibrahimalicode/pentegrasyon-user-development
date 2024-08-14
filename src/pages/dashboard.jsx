import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/dashboardPage";

const DashboardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default DashboardPage;

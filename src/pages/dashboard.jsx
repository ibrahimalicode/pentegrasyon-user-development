import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/dashboard_";

const DashboardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default DashboardPage;

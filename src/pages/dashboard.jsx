import { Route, Routes } from "react-router-dom";
import DashboardPage from "../components/dashboard/pages/dashboardPage";

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
};

export default Dashboard;

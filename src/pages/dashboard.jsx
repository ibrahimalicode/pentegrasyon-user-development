import { Route, Routes } from "react-router-dom";
import Dashboard_ from "../components/dashboard/dashboard_";

const DashboardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard_ />} />
    </Routes>
  );
};

export default DashboardPage;

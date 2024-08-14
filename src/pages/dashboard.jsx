import { Route, Routes } from "react-router-dom";
import Dashboard_ from "../components/dashboard/renameD";

const DashboardPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard_ />} />
    </Routes>
  );
};

export default DashboardPage;

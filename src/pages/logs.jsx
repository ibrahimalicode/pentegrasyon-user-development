import { Route, Routes } from "react-router-dom";

import NotFound from "./404";
import LogsPage from "../components/logs/pages/logsPage";

const Logs = () => {
  return (
    <Routes>
      <Route path="/" element={<LogsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Logs;

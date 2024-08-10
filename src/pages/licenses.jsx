import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import LicensesPage from "../components/licenses/pages/licensesPage";

const Licenses = () => {
  return (
    <Routes>
      <Route path="/" element={<LicensesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Licenses;

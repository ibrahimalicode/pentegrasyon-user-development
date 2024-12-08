import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import ProtectPage from "../components/protected/pages/protectedPage";

const ProtectedPages = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProtectedPages;

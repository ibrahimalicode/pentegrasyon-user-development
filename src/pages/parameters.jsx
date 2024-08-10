import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import ParametersPage from "../components/parameters/parametersPage";

const Parameters = () => {
  return (
    <Routes>
      <Route path="/" element={<ParametersPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Parameters;

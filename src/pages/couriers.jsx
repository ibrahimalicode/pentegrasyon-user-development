import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import CouriersPage from "../components/couriers/pages/couriersPage";

const Couriers = () => {
  return (
    <Routes>
      <Route path="/" element={<CouriersPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Couriers;

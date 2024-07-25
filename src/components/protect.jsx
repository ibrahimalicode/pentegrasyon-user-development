import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const KEY = import.meta.env.VITE_LOACAL_KEY;

  const token = JSON.parse(localStorage.getItem(KEY))?.token;
  return !token ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;

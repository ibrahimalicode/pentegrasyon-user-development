import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const KEY = import.meta.env.VITE_LOCAL_KEY;
  let token;
  try {
    token = JSON.parse(localStorage.getItem(KEY))?.token;
  } catch (error) {
    console.error("Failed to retrieve token from local storage:", error);
  }

  return !token ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;

//MODULES
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

//CONTEXT
import { useProtectPages } from "../context/ProtectPagesContext";

const ProtectedRoute = () => {
  const page = useParams()["*"];
  const KEY = import.meta.env.VITE_LOCAL_KEY;

  const { protectedPages } = useProtectPages();

  const [isLocked, setIsLocked] = useState(null);
  let token;

  try {
    token = JSON.parse(localStorage.getItem(KEY))?.token;
  } catch (error) {
    console.error("Failed to retrieve token from local storage:", error);
  }

  useEffect(() => {
    if (protectedPages) {
      setIsLocked(protectedPages[page] && protectedPages.lock);
    }
  }, [page, protectedPages]);

  return !token ? (
    <Navigate to="/login" />
  ) : !isLocked ? (
    <Outlet />
  ) : (
    <Navigate to="/orders" />
  );
};

export default ProtectedRoute;

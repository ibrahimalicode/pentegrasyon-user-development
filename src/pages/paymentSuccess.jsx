import { useLocation } from "react-router-dom";
import NotFound from "./404";
import { useEffect, useState } from "react";
import LoadingI from "../assets/anim/loading";

const PaymentSuccess = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const unAuthorized = currentPath == "/payment-success";
  window.parent.postMessage({ status: "success" }, "*");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (unAuthorized) {
      const timer = setTimeout(() => {
        setNotFound(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [unAuthorized]);

  return notFound ? (
    <NotFound />
  ) : (
    <div className="w-full min-h-40 flex justify-center items-end">
      <LoadingI className="size-10 text-[var(--light-1)]" />
    </div>
  );
};

export default PaymentSuccess;

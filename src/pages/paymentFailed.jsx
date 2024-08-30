//MODULES
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//COMP
import NotFound from "./404";
import LoadingI from "../assets/anim/loading";

const PaymentFailed = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const unAuthorized = currentPath == "/payment-failed";
  window.parent.postMessage({ status: "failed" }, "*");
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

export default PaymentFailed;

import { useLocation } from "react-router-dom";
import NotFound from "./404";

const PaymentSuccess = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const unAuthorized = currentPath == "/payment-success";
  window.parent.postMessage({ status: "success" }, "*");

  return unAuthorized && <NotFound />;
};

export default PaymentSuccess;

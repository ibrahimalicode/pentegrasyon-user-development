import { useLocation } from "react-router-dom";

const CreditPayment = () => {
  const location = useLocation();
  const { currentLicense } = location?.state || {};

  return <div>creditPayment</div>;
};

export default CreditPayment;

//MODULES
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//COMP
import SuccessPage from "../stepsAssets/successPage";
import FailurePage from "../stepsAssets/failurePage";

const FourthStep = ({ step, paymentStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    let goToLicenses;

    if (step === 4) {
      goToLicenses = setTimeout(
        () => navigate(currentPath?.replace("/extend-license", "")),
        7000
      );
    }

    return () => {
      if (goToLicenses) {
        clearTimeout(goToLicenses);
      }
    };
  }, [step]);

  return (
    step === 4 &&
    (paymentStatus === "success" ? (
      <SuccessPage step={step} currentPath={currentPath} />
    ) : (
      <FailurePage currentPath={currentPath} />
    ))
  );
};

export default FourthStep;

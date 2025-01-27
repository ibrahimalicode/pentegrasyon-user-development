//MODULES
import { useLocation } from "react-router-dom";

//COMP
import BankPayment from "../paymentTypes/bankPayment";
import FifthStepOnlinePayment from "./5thStepOnlinePayment";

const FifthStep = ({
  step,
  setStep,
  licenseData,
  paymentMethod,
  restaurantData,
  setPaymentStatus,
}) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const actionType = pathArray[pathArray.length - 1];

  const value = paymentMethod.selectedOption.value;
  return (
    step === 5 && (
      <div className="h-full overflow-y-auto">
        {value === "onlinePayment" ? (
          <FifthStepOnlinePayment
            setStep={setStep}
            setPaymentStatus={setPaymentStatus}
          />
        ) : (
          value === "bankPayment" && (
            <BankPayment
              step={step}
              setStep={setStep}
              actionType={actionType}
              licenseData={licenseData}
              restaurantData={restaurantData}
            />
          )
        )}
      </div>
    )
  );
};

export default FifthStep;

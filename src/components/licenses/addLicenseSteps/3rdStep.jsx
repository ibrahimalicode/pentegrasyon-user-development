//MODULES

//COMP
import OnlinePayment from "../paymentTypes/onlinePayment";
import BankPayment from "../paymentTypes/bankPayment";
import { useLocation } from "react-router-dom";

const ThirdStep = ({
  step,
  setStep,
  licenseData,
  paymentMethod,
  restaurantData,
}) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const actionType = pathArray[pathArray.length - 1];

  const value = paymentMethod.selectedOption.value;
  return (
    step === 3 && (
      <div className="h-full overflow-y-auto">
        {value === "bankPayment" ? (
          <BankPayment
            setStep={setStep}
            licenseData={licenseData}
            restaurantData={restaurantData}
            actionType={actionType}
          />
        ) : (
          value === "onlinePayment" && (
            <OnlinePayment
              setStep={setStep}
              userId={restaurantData?.userId}
              actionType={actionType}
            />
          )
        )}
      </div>
    )
  );
};

export default ThirdStep;

//MODULES

//COMP
import OnlinePayment from "../paymentTypes/onlinePayment";
import BankPayment from "../paymentTypes/bankPayment";
import { useLocation } from "react-router-dom";

const FourthStep = ({
  step,
  setStep,
  userData,
  userInvData,
  licenseData,
  paymentMethod,
  restaurantData,
}) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const actionType = pathArray[pathArray.length - 1];

  const value = paymentMethod.selectedOption.value;
  return (
    step === 4 && (
      <div className="h-full overflow-y-auto">
        {value === "onlinePayment" ? (
          <OnlinePayment
            step={step}
            setStep={setStep}
            userData={userData}
            actionType={actionType}
            userInvData={userInvData}
          />
        ) : (
          value === "bankPayment" && (
            <BankPayment
              setStep={setStep}
              licenseData={licenseData}
              restaurantData={restaurantData}
              actionType={actionType}
            />
          )
        )}
      </div>
    )
  );
};

export default FourthStep;

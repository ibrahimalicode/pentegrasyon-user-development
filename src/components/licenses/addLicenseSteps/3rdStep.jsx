//MODULES

//COMP
import { useLocation } from "react-router-dom";
import ThirdStepOnlinePayment from "./3rdStepOnlinePayment";
import ThirdStepBankPayment from "./3rdStepBankPayment";

const ThirdStep = ({
  step,
  setStep,
  userData,
  userInvData,
  setUserData,
  paymentMethod,
  setUserInvData,
}) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const actionType = pathArray[pathArray.length - 1];

  const value = paymentMethod.selectedOption.value;
  return (
    step === 3 && (
      <div className="h-full overflow-y-auto">
        {value === "bankPayment" ? (
          <ThirdStepBankPayment step={step} setStep={setStep} />
        ) : (
          value === "onlinePayment" && (
            <ThirdStepOnlinePayment
              step={step}
              setStep={setStep}
              userData={userData}
              setUserData={setUserData}
              userInvData={userInvData}
              setUserInvData={setUserInvData}
            />
          )
        )}
      </div>
    )
  );
};

export default ThirdStep;

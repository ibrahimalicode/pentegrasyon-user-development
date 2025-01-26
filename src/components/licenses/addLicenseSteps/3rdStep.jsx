//MODULES

//COMP
import ThirdStepBankPayment from "./3rdStepBankPayment";
import ThirdStepOnlinePayment from "./3rdStepOnlinePayment";

const ThirdStep = ({
  step,
  setStep,
  userData,
  setUserData,
  userInvData,
  paymentMethod,
  setUserInvData,
}) => {
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

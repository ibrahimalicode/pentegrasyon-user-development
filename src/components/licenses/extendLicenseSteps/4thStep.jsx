//MODULES

//COMP
import BankPayment from "../paymentTypes/bankPayment";
import FourthStepOnlinePayment from "./4thStepOnlinePayment";

const FourthStep = ({ step, setStep, paymentMethod, setPaymentStatus }) => {
  const value = paymentMethod.selectedOption.value;
  return (
    step === 4 && (
      <div className="h-full">
        <div className="flex flex-col w-full items-center h-full overflow-y-auto">
          {value === "onlinePayment" ? (
            <FourthStepOnlinePayment
              setStep={setStep}
              setPaymentStatus={setPaymentStatus}
            />
          ) : (
            value === "bankPayment" && (
              <BankPayment step={step} setStep={setStep} />
            )
          )}
        </div>
      </div>
    )
  );
};

export default FourthStep;

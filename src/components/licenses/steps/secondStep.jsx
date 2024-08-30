//MODULES

//COMP
import OnlinePayment from "../paymentTypes/onlinePayment";
import CreditPayment from "../paymentTypes/creditPayment";
import BankPayment from "../paymentTypes/bankPayment";
import { useLocation } from "react-router-dom";

const SecondStep = ({ step, setStep, licenseData, paymentMethod, userId }) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const actionType = pathArray[pathArray.length - 1];
  console.log(userId);

  const value = paymentMethod.selectedOption.value;
  return (
    step === 2 && (
      <div className=" h-full">
        <div className="flex flex-col w-full items-center h-full overflow-y-auto">
          {value === "bankPayment" ? (
            <BankPayment
              setStep={setStep}
              licenseData={licenseData}
              actionType={actionType}
            />
          ) : value === "onlinePayment" ? (
            <OnlinePayment
              setStep={setStep}
              userId={userId}
              actionType={actionType}
            />
          ) : (
            <CreditPayment setStep={setStep} actionType={actionType} />
          )}
        </div>
      </div>
    )
  );
};

export default SecondStep;

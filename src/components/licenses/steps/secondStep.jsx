//MODULES

//COMP
import OnlinePayment from "../paymentTypes/onlinePayment";
import CreditPayment from "../paymentTypes/creditPayment";
import BankPayment from "../paymentTypes/bankPayment";

const SecondStep = ({
  step,
  setStep,
  licensePackageData,
  document,
  setDocument,
  explanation,
  setExplanation,
  paymentMethod,
}) => {
  const value = paymentMethod.selectedOption.value;
  return (
    step === 2 && (
      <div className=" h-full">
        <div className="flex flex-col w-full items-center h-full overflow-y-auto">
          {value === "bankPayment" ? (
            <BankPayment
              setStep={setStep}
              licensePackageData={licensePackageData}
              document={document}
              setDocument={setDocument}
              explanation={explanation}
              setExplanation={setExplanation}
            />
          ) : value === "onlinePayment" ? (
            <OnlinePayment setStep={setStep} />
          ) : (
            <CreditPayment />
          )}
        </div>
      </div>
    )
  );
};

export default SecondStep;

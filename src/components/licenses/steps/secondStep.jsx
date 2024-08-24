import OnlinePayment from "../paymentTypes/onlinePayment";
import CreditPayment from "../paymentTypes/creditPayment";
import BankPayment from "../paymentTypes/bankPayment";

const SecondStep = ({
  step,
  licensePackageData,
  document,
  setDocument,
  explanation,
  setExplanation,
  paymentMethod,
  cardData,
  setCardData,
  userData,
  setUserData,
}) => {
  const value = paymentMethod.selectedOption.value;
  return (
    <div className="flex w-full justify-center h-full overflow-y-auto">
      {value === "bankPayment" && step === 2 ? (
        <BankPayment
          licensePackageData={licensePackageData}
          document={document}
          setDocument={setDocument}
          explanation={explanation}
          setExplanation={setExplanation}
        />
      ) : value === "onlinePayment" && step === 2 ? (
        <OnlinePayment
          cardData={cardData}
          setCardData={setCardData}
          userData={userData}
          setUserData={setUserData}
        />
      ) : (
        <CreditPayment />
      )}
    </div>
  );
};

export default SecondStep;

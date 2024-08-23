import BankPayment from "../bankPayment";
import OnlinePayment from "../onlinePayment";
import CreditPayment from "../creditPayment";

const SecondStep = ({
  step,
  licenseData,
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
      {value === "bankPayment" ? (
        <BankPayment
          licenseData={licenseData}
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

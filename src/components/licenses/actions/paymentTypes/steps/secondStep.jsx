import BankPayment from "../bankPayment";
import OnlinePayment from "../onlinePayment";
import CreditPayment from "../creditPayment";

const SecondStep = ({
  licenseData,
  document,
  setDocument,
  explanation,
  setExplanation,
  paymentMethod,
  cardData,
  setCardData,
}) => {
  return (
    <div className="flex w-full justify-center h-full overflow-y-auto">
      {paymentMethod.selectedOption.value === "bankPayment" ? (
        <BankPayment
          licenseData={licenseData}
          document={document}
          setDocument={setDocument}
          explanation={explanation}
          setExplanation={setExplanation}
        />
      ) : paymentMethod.selectedOption.value === "onlinePayment" ? (
        <OnlinePayment cardData={cardData} setCardData={setCardData} />
      ) : (
        <CreditPayment />
      )}
    </div>
  );
};

export default SecondStep;

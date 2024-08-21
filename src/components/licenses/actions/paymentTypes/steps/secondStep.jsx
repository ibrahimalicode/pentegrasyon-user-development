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
}) => {
  return (
    <div>
      {paymentMethod.selectedOption.value === "bankPayment" ? (
        <BankPayment
          licenseData={licenseData}
          document={document}
          setDocument={setDocument}
          explanation={explanation}
          setExplanation={setExplanation}
        />
      ) : paymentMethod.selectedOption.value === "onlinePayment" ? (
        <OnlinePayment />
      ) : (
        <CreditPayment />
      )}
    </div>
  );
};

export default SecondStep;

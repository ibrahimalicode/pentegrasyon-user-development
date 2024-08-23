import { useState } from "react";
import PaymentCard from "../../../payment/card/card";
import PaymentCardForm from "../../../payment/form/PaymentCardForm";

const OnlinePayment = ({ cardData, setCardData, userData, setUserData }) => {
  const [flip, setFlip] = useState(false);

  return (
    <div className="full flex flex-col">
      <div className="w-[325px] self-center">
        <PaymentCard flip={flip} cardData={cardData} />
      </div>
      <PaymentCardForm
        setFlip={setFlip}
        cardData={cardData}
        setCardData={setCardData}
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  );
};

export default OnlinePayment;

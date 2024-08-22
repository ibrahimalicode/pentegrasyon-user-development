import { useState } from "react";
import PaymentCard from "../../../payment/card/card";
import PaymentCardForm from "../../../payment/form/PaymentCardForm";

const OnlinePayment = ({ cardData, setCardData }) => {
  const [flip, setFlip] = useState(false);

  const userData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    city: "",
    district: "",
    neigh: "",
    address: "",
  };

  return (
    <div className="w-[325px]">
      <PaymentCard flip={flip} cardData={cardData} />
      <PaymentCardForm
        setFlip={setFlip}
        cardData={cardData}
        setCardData={setCardData}
        userData={userData}
      />
    </div>
  );
};

export default OnlinePayment;

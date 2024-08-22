import { useState } from "react";
import PaymentCard from "../components/payment/card/card";
import PaymentCardForm from "../components/payment/form/PaymentCardForm";

const Test = () => {
  const [flip, setFlip] = useState(false);

  const [cardData, setCardData] = useState({
    userName: "",
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
  });

  return (
    <section className="min-h-0 md:ml-[280px] px-[4%] pt-28 flex justify-center">
      <div className="w-[325px]">
        <PaymentCard flip={flip} cardData={cardData} />
        <PaymentCardForm
          setFlip={setFlip}
          cardData={cardData}
          setCardData={setCardData}
        />
      </div>
    </section>
  );
};

export default Test;

import { useRef } from "react";
import CustomInput from "../../common/customInput";

const PaymentCardForm = ({ setFlip, cardData, setCardData }) => {
  const yearRef = useRef(null);
  const cvvRef = useRef(null);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "") // Remove non-digit characters
      .replace(/(.{4})/g, "$1 ") // Add a space every 4 digits
      .trim(); // Remove trailing space
  };

  const handleCardNumberChange = (e) => {
    const formattedNumber = formatCardNumber(e);
    setCardData((prev) => ({
      ...prev,
      cardNumber: formattedNumber,
    }));
  };

  const handleMonthChange = (value) => {
    if (value.length === 2) {
      yearRef.current.focus();
    }
    setCardData((prev) => {
      return {
        ...prev,
        month: value < 13 ? value : prev.month,
      };
    });
  };

  const handleYearChange = (value) => {
    if (value.length === 2) {
      cvvRef.current.focus();
    }
    setCardData((prev) => {
      return {
        ...prev,
        year: value,
      };
    });
  };

  return (
    <div className="w-max">
      <div className="mt-4 flex flex-col gap-3 max-w-[325px]">
        <div className="w-full">
          <CustomInput
            // label="Kart Sahibi"
            type="text"
            placeholder="Kart Sahibi"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={30}
            value={cardData.userName}
            onChange={(e) =>
              setCardData((prev) => {
                return {
                  ...prev,
                  userName: e,
                };
              })
            }
            onClick={() => setFlip(false)}
          />
        </div>
        <div className="w-full">
          <CustomInput
            // label="Kart No"
            type="text"
            placeholder="Kart No"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={19}
            value={cardData.cardNumber}
            onChange={handleCardNumberChange}
            onClick={() => setFlip(false)}
          />
        </div>
        <div className="w-full flex gap-2">
          <CustomInput
            // label="Ay"
            type="number"
            placeholder="Ay"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={2}
            value={cardData.month}
            onChange={handleMonthChange}
            onClick={() => setFlip(false)}
          />
          <CustomInput
            inputRef={yearRef}
            // label="Yıl"
            type="text"
            placeholder="Yıl"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={2}
            value={cardData.year}
            onChange={handleYearChange}
            onClick={() => setFlip(false)}
          />
          <CustomInput
            inputRef={cvvRef}
            // label="CVV"
            type="number"
            placeholder="CVV"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={3}
            value={cardData.cvv}
            onChange={(e) =>
              setCardData((prev) => {
                return {
                  ...prev,
                  cvv: e,
                };
              })
            }
            onFocus={() => setFlip(true)}
            onBlur={() => setFlip(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentCardForm;

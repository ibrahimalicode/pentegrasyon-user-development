import { useEffect, useRef, useState } from "react";
import CustomInput from "../../common/customInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  resetgetUser,
  resetgetUserState,
} from "../../../redux/users/getUserByIdSlice";
import { useLocation } from "react-router-dom";

const PaymentCardForm = ({
  setFlip,
  cardData,
  setCardData,
  userData,
  setUserData,
}) => {
  const dispatch = useDispatch();
  const yearRef = useRef(null);
  const cvvRef = useRef(null);
  const location = useLocation();
  const { currentLicense } = location?.state;
  const userId = currentLicense?.userId;

  const { loading, success, error, user } = useSelector(
    (state) => state.users.getUser
  );

  const [userInvData, setUserInvData] = useState(null);
  const address = "Gloria Prestij Apartmanı, Esertepe Mh. 324. Cd. No:9 Ankara";
  const city = "ANKARA";
  const district = "Keçiören";
  const neigh = "Ovacik";

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

  useEffect(() => {
    if (!userData) {
      dispatch(getUser({ userId }));
      console.log("get user");
    }
    return () => {
      if (user) dispatch(resetgetUser());
    };
  }, [userData]);

  useEffect(() => {
    if (success) {
      setUserData(user);
      setUserInvData(user.userInvoiceAddressDTO);
      dispatch(resetgetUserState());
    }
  }, [user, success]);
  return (
    <div className="w-full">
      {/* CARD INFO */}
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

      {/* FATURA ADDRESS */}
      <div className="text-xs pt-2 w-full">
        <span className="text-[--red-1]">
          Bu ödemenin faturası aşağdaki adrese kesilecektir.
        </span>
        <p className="pt-1">
          {userData && userData.fullName}, {userInvData && userInvData.title}
        </p>
        {userInvData && (
          <>
            <p className="pt-1">{userInvData.taxNumber},</p>
            <p>{userInvData.taxOffice},</p>
            <p>
              {userInvData.tradeRegistryNumber &&
                userInvData.tradeRegistryNumber}
              ,
            </p>
            <p>{userInvData.mersisNumber && userInvData.mersisNumber}</p>
            <p>
              {userInvData.address}/{userInvData.city}/{userInvData.district}/
              {userInvData.neighbourhood}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCardForm;

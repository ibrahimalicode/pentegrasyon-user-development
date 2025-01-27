//MODULES
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// COMP
import PaymentCard from "../../payment/card/card";
import BackButton from "../stepsAssets/backButton";
import PayTRForm from "../../payment/form/PayTRForm";
import ForwardButton from "../stepsAssets/forwardButton";
import PaymentCardForm from "../../payment/form/PaymentCardForm";

// REDUX
import { addByOnlinePay } from "../../../redux/licenses/addLicense/addByOnlinePaySlice";
import { extendByOnlinePay } from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";

const OnlinePayment = ({
  step,
  setStep,
  userData,
  actionType,
  userInvData,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { currentLicense } = location?.state || {};
  const isPageExtend = actionType === "extend-license";

  const { loading: addLoading } = useSelector(
    (state) => state.licenses.addByPay
  );

  const { loading: extendLoading } = useSelector(
    (state) => state.licenses.extendByPay
  );

  const cartItems = useSelector((state) => state.cart.items);

  const [flip, setFlip] = useState(false);
  const [cardData, setCardData] = useState({
    userName: "", // "PAYTR TEST",
    cardNumber: "", // "4355 0843 5508 4358",
    month: "", // "12",
    year: "", // "24",
    cvv: "", // "000",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const { userName, cardNumber, month, year, cvv } = cardData;
    const { email, fullName, phoneNumber } = userData;
    const address = `${userInvData.city}/${userInvData.district}/${userInvData.neighbourhood}`;

    const paymentAmount = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    const addLicenseBasket = cartItems.reduce((result, item) => {
      const existingRestaurant = result.find(
        (restaurant) => restaurant.restaurantId === item.restaurantId
      );

      if (existingRestaurant) {
        existingRestaurant.licensePackageIds.push(item.id);
      } else {
        result.push({
          restaurantId: item.restaurantId,
          licensePackageIds: [item.id],
        });
      }

      return result;
    }, []);

    const { licensePackageId, restaurantId } = cartItems[0];
    const extendLicenseBasket = {
      licensePackageId,
      restaurantId,
      licenseId: currentLicense?.id,
    };

    const data = {
      userName: fullName,
      userEmail: email,
      userPhoneNumber: phoneNumber,
      userAddress: address,
      ccOwner: userName,
      cardNumber: cardNumber.replace(/\D/g, ""),
      expiryMonth: month,
      expiryYear: year,
      cvv,
      userBasket: isPageExtend
        ? JSON.stringify(extendLicenseBasket)
        : JSON.stringify(addLicenseBasket),
      paymentType: "card",
      paymentAmount,
    };

    if (isPageExtend) {
      dispatch(extendByOnlinePay(data));
    } else {
      dispatch(addByOnlinePay(data));
    }
    //NOTE: the step changer function based on the response is in the "addLicensePage".
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="full flex justify-center">
        <div className="w-[325px] flex flex-col">
          <PaymentCard flip={flip} cardData={cardData} />

          <PaymentCardForm
            setFlip={setFlip}
            cardData={cardData}
            setCardData={setCardData}
          />
        </div>
      </div>

      {/* BTNS */}
      <div className="flex gap-3 absolute -bottom-20 -right-0 h-12">
        <BackButton
          text="Geri"
          letIcon={true}
          onClick={() => setStep(step - 1)}
          disabled={addLoading || extendLoading}
        />
        <ForwardButton
          text="Devam"
          letIcon={true}
          type="submit"
          disabled={addLoading || extendLoading}
        />
      </div>

      <PayTRForm cardData={cardData} />
    </form>
  );
};

export default OnlinePayment;

//MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMP
import PaymentCard from "../../payment/card/card";
import BackButton from "../stepsAssets/backButton";
import InvoiceData from "../stepsAssets/invoiceData";
import PayTRForm from "../../payment/form/PayTRForm";
import ForwardButton from "../stepsAssets/forwardButton";
import PaymentCardForm from "../../payment/form/PaymentCardForm";

// REDUX
import { getUser, resetGetUserState } from "../../../redux/user/getUserSlice";
import { addByOnlinePay } from "../../../redux/licenses/addLicense/addByOnlinePaySlice";
import { extendByOnlinePay } from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";

const OnlinePayment = ({ setStep }) => {
  const dispatch = useDispatch();

  const { success: getUserSucc, user } = useSelector(
    (state) => state.user.getUser
  );

  const { loading: contextLoading } = useSelector((state) => state.getContext);

  const [flip, setFlip] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userInvData, setUserInvData] = useState(null);
  const [cardData, setCardData] = useState({
    userName: "PAYTR TEST",
    cardNumber: "4355084355084358",
    month: "12",
    year: "24",
    cvv: "000",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const { userName, cardNumber, month, year, cvv } = cardData;
    const { email, fullName, phoneNumber } = userData;
    const address = `${userInvData.city}/${userInvData.district}/${userInvData.neighbourhood}`;

    const paymentAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
    const userBasket = cartItems.reduce((result, item) => {
      const existingRestaurant = result.find(
        (restaurant) => restaurant.restaurantId === item.restaurantId
      );

      if (existingRestaurant) {
        existingRestaurant.licenseIds.push(item.id);
      } else {
        result.push({
          restaurantId: item.restaurantId,
          licensePackageIds: [item.id],
        });
      }

      return result;
    }, []);

    const data = {
      userName: fullName,
      userEmail: email,
      userPhoneNumber: phoneNumber,
      userAddress: address,
      ccOwner: userName,
      cardNumber,
      expiryMonth: month,
      expiryYear: year,
      cvv,
      userBasket: JSON.stringify(userBasket),
      paymentType: "card",
      paymentAmount,
    };

    if (actionType === "extend-license") {
      const formData = new FormData(e.target);
      dispatch(extendByOnlinePay({ formData }));
    } else {
      dispatch(addByOnlinePay(data));
    }
    setSubmit(true);
  }

  //GET USER
  useEffect(() => {
    if (!userData) {
      dispatch(getUser());
    }
  }, [userData]);

  //SET USER AND INVOICE
  useEffect(() => {
    if (getUserSucc) {
      setUserData(user);
      setUserInvData(user.userInvoiceAddressDTO);
      dispatch(resetGetUserState());
    }
  }, [user, getUserSucc]);

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

      <div className="w-full max-w-3xl mx-auto">
        {userData && (
          <InvoiceData
            user={userData}
            submit={submit}
            title="Bu ödemenin faturası aşağdaki adrese kesilecektir."
            userInvData={userInvData}
            userData={userData}
          />
        )}
      </div>

      {/* BTNS */}
      <div className="flex gap-3 absolute -bottom-16 -right-0">
        <BackButton
          text="Geri"
          letIcon={true}
          onClick={() => setStep(2)}
          disabled={loading}
        />
        <ForwardButton
          text="Devam"
          letIcon={true}
          type="submit"
          disabled={loading || contextLoading}
        />
      </div>

      <PayTRForm cardData={cardData} />
    </form>
  );
};

export default OnlinePayment;

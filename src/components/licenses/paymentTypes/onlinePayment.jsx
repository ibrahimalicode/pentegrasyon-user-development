//MODULES
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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

const OnlinePayment = ({ setStep, actionType }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  let invoiceHandleSubmit = useRef(null);
  const { currentLicense } = location?.state || {};
  const isPageExtend = actionType === "extend-license";

  const { success: getUserSucc, user } = useSelector(
    (state) => state.user.getUser
  );

  const { loading: addLoading } = useSelector(
    (state) => state.licenses.addByPay
  );

  const { loading: extendLoading } = useSelector(
    (state) => state.licenses.extendByPay
  );

  const { loading: updateInvLoading } = useSelector(
    (state) => state.user.updateInvoice
  );

  const { loading: addInvLoading } = useSelector(
    (state) => state.user.addInvoice
  );

  const cartItems = useSelector((state) => state.cart.items);

  const [flip, setFlip] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openFatura, setOpenFatura] = useState(false);
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
    if (openFatura) {
      if (invoiceHandleSubmit.current) {
        invoiceHandleSubmit.current();
      }
      return;
    }

    const { userName, cardNumber, month, year, cvv } = cardData;
    const { email, fullName, phoneNumber } = userData;
    const address = `${userInvData.city}/${userInvData.district}/${userInvData.neighbourhood}`;

    const paymentAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
    const addLicenseBasket = cartItems.reduce((result, item) => {
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
      cardNumber,
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
            title="Bu ödemenin faturası aşağdaki adrese kesilecektir."
            userInvData={userInvData}
            setUserInvData={setUserInvData}
            openFatura={openFatura}
            setOpenFatura={setOpenFatura}
            userData={userData}
            onSubmit={(submitFn) => {
              invoiceHandleSubmit.current = submitFn;
            }}
          />
        )}
      </div>

      {/* BTNS */}
      <div className="flex gap-3 absolute -bottom-16 -right-0">
        <BackButton
          text="Geri"
          letIcon={true}
          onClick={() => setStep(2)}
          disabled={
            addLoading || extendLoading || updateInvLoading || addInvLoading
          }
        />
        <ForwardButton
          text="Devam"
          letIcon={true}
          type="submit"
          disabled={
            addLoading || extendLoading || updateInvLoading || addInvLoading
          }
        />
      </div>

      <PayTRForm cardData={cardData} />
    </form>
  );
};

export default OnlinePayment;

//MODULES
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// COMP
import PaymentCard from "../../payment/card/card";
import PayTRForm from "../../payment/form/PayTRForm";
import BackButton from "../actions/assets/backButton";
import InvoiceData from "../actions/assets/invoiceData";
import ForwardButton from "../actions/assets/forwardButton";
import PaymentCardForm from "../../payment/form/PaymentCardForm";

// REDUX
import {
  getUser,
  resetgetUserState,
} from "../../../redux/users/getUserByIdSlice";
import { extendByOnlinePay } from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";

const OnlinePayment = ({ setStep }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentLicense } = location?.state || {};
  const userId = currentLicense.userId;

  const { success, user } = useSelector((state) => state.users.getUser);

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

    const formData = new FormData(e.target);
    dispatch(extendByOnlinePay({ formData }));
    if (!userInvData) setSubmit(true);
  }

  useEffect(() => {
    if (!userData) {
      dispatch(getUser({ userId }));
      console.log("get user");
    }
  }, [userData]);

  useEffect(() => {
    if (success) {
      setUserData(user);
      setUserInvData(user.userInvoiceAddressDTO);
      dispatch(resetgetUserState());
    }
  }, [user, success]);

  return (
    <form onSubmit={handleSubmit}>
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

      <div className="w-[325px]">
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
        <BackButton text="Geri" letIcon={true} onClick={() => setStep(1)} />
        <ForwardButton text="Devam" letIcon={true} type="submit" />
      </div>

      <PayTRForm cardData={cardData} setStep={setStep} />
    </form>
  );
};

export default OnlinePayment;

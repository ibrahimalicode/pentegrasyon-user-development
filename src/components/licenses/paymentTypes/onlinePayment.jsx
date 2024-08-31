//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMP
import PaymentCard from "../../payment/card/card";
import PayTRForm from "../../payment/form/PayTRForm";
import BackButton from "../stepsAssets/backButton";
import InvoiceData from "../stepsAssets/invoiceData";
import ForwardButton from "../stepsAssets/forwardButton";
import PaymentCardForm from "../../payment/form/PaymentCardForm";

// REDUX
import {
  getUser,
  resetgetUserState,
} from "../../../redux/users/getUserByIdSlice";
import { extendByOnlinePay } from "../../../redux/licenses/extendLicense/extendByOnlinePaySlice";

const OnlinePayment = ({ setStep, userId }) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { success: getUserSucc, user } = useSelector(
    (state) => state.users.getUser
  );

  const { loading, success, error } = useSelector(
    (state) => state.licenses.extendByPay
  );
  const cartItems = useSelector((state) => state.cart.items);

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
    console.log(cartItems);
    const formData = new FormData(e.target);
    dispatch(extendByOnlinePay({ formData }));
    if (!userInvData) setSubmit(true);
  }

  //TOAST PAYMENT
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Loading...");
    } else if (success) {
      toast.remove(toastId.current);
    } else if (error) {
      toast.remove(toastId.current);
      if (error.message_TR) {
        toast.error(message_TR);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [loading, success, error]);

  //GET USER
  useEffect(() => {
    if (!userData) {
      dispatch(getUser({ userId }));
    }
  }, [userData]);

  //SET USER AND INVOICE
  useEffect(() => {
    if (getUserSucc) {
      setUserData(user);
      setUserInvData(user.userInvoiceAddressDTO);
      dispatch(resetgetUserState());
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

      <div className="w-full">
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
          disabled={loading}
        />
      </div>

      <PayTRForm cardData={cardData} />
    </form>
  );
};

export default OnlinePayment;

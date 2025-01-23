import { useEffect, useRef, useState } from "react";
import InvoiceData from "../stepsAssets/invoiceData";
import { useDispatch, useSelector } from "react-redux";
import { getUser, resetGetUserState } from "../../../redux/user/getUserSlice";
import BackButton from "../stepsAssets/backButton";
import ForwardButton from "../stepsAssets/forwardButton";

const ThirdStepOnlinePayment = ({
  step,
  setStep,
  userData,
  setUserData,
  userInvData,
  setUserInvData,
}) => {
  const dispatch = useDispatch();
  let invoiceHandleSubmit = useRef(null);

  const { loading: updateInvLoading } = useSelector(
    (state) => state.user.updateInvoice
  );

  const { loading: addInvLoading } = useSelector(
    (state) => state.user.addInvoice
  );

  const { success: getUserSucc, user } = useSelector(
    (state) => state.user.getUser
  );

  const [openFatura, setOpenFatura] = useState(false);

  //SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    if (openFatura) {
      if (invoiceHandleSubmit.current) {
        invoiceHandleSubmit.current();
      }
      return;
    }

    setStep(4);
  }

  //SET USER AND INVOICE
  useEffect(() => {
    if (getUserSucc) {
      setUserData(user);
      setUserInvData(user.userInvoiceAddressDTO);
      dispatch(resetGetUserState());
    }
  }, [user, getUserSucc]);

  //GET USER
  useEffect(() => {
    if (!userData) {
      dispatch(getUser());
    }
  }, [userData]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full">
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
      <div className="flex gap-3 absolute -bottom-20 -right-0 h-12">
        <BackButton
          text="Geri"
          letIcon={true}
          onClick={() => setStep(step - 1)}
          disabled={updateInvLoading || addInvLoading}
        />
        <ForwardButton
          text={openFatura ? "Kaydet" : "Devam"}
          letIcon={true}
          type="submit"
          disabled={updateInvLoading || addInvLoading}
        />
      </div>
    </form>
  );
};

export default ThirdStepOnlinePayment;

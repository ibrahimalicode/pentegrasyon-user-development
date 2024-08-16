import { useEffect, useRef, useState } from "react";
import { CancelI, EditI } from "../../../../assets/icon";
import { usePopup } from "../../../../context/PopupContext";
import LoadingI2 from "../../../../assets/anim/spinner";
import EditUserdata from "./editUserData";
import EditUserPassword from "./editUserPassword";
import EditUserInvoice from "./editUserInvoice";
import toast from "react-hot-toast";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  resetgetUser,
} from "../../../../redux/users/getUserByIdSlice";
import { getCities } from "../../../../redux/data/getCitiesSlice";
import ActionButton from "../../../common/actionButton";

const EditUser = ({ user, onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(<EditUserPopup user={user} onSuccess={onSuccess} />);
    setShowPopup(true);
  };
  return (
    <ActionButton
      element={<EditI className="w-5" strokeWidth="1.8" />}
      element2="Düzenle"
      onClick={handleClick}
    />
  );
};

export default EditUser;

////******POPUP COMPONENT*******////
const EditUserPopup = ({ user: inData, onSuccess }) => {
  const dispatch = useDispatch();
  const dispatcher = useRef();

  const { loading: updateDataLoading, success: updateDataSuccess } =
    useSelector((state) => state.users.updateUser);

  const { loading: updatePassLoading, success: updatePassSuccess } =
    useSelector((state) => state.users.updatePassword);

  const { loading: updateInvoiceLoading, success: updateInvoiceSuccess } =
    useSelector((state) => state.users.updateInvoice);

  const { loading: addInvoiceLoading, success: addInvoiceSuccess } =
    useSelector((state) => state.users.addInvoice);

  const {
    loading: getUserLoading,
    error: getUserError,
    user,
  } = useSelector((state) => state.users.getUser);

  const { cities: citiesData } = useSelector((state) => state.data.getCities);

  const { setShowPopup, setPopupContent } = usePopup();

  const [updateUserState, setUpdateUserState] = useState({ loading: false });
  const [cities, setCities] = useState([]);

  const [submit, setSubmit] = useState(false);
  const [noChange, setNoChange] = useState({
    userData: null,
    userInv: null,
    userPass: true,
  });
  const [submitPass, setSubmitPass] = useState({ state: false, submit: false });

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitPass({ status: false, submit: true });
  };

  // HANDLE SUBMIT
  useEffect(() => {
    if (submitPass.status) {
      setSubmit(true);
      // console.log("submit");
    }
  }, [submitPass.status]);

  useEffect(() => {
    if (
      (noChange.userData && noChange.userInv) ||
      (noChange.userData && noChange.userInv === null) ||
      (noChange.userData === null && noChange.userInv)
    ) {
      if (noChange.userPass) {
        toast("Her hangı bir deişiklik yapmadınız");
        setNoChange({ userData: null, userInv: null });
      }
    }
  }, [noChange.userData, noChange.userInv, noChange.userPass]);

  // GET USER IF THERE IS NOT
  useEffect(() => {
    if (!user) {
      dispatch(getUser({ userId: inData.id }));
    }

    return () => {
      if (user) {
        dispatch(resetgetUser());
        console.log("out");
      }
    };
  }, [user]);

  // GET AND SET CITIES IF THERE IS NO CITIES
  useEffect(() => {
    if (!citiesData) {
      dispatch(getCities());
    } else {
      setCities(citiesData);
    }
  }, [citiesData]);

  // LISTEN TO EDITUSERDATA, PASSWORD AND INVOICE
  useEffect(() => {
    if (
      updateDataLoading ||
      updatePassLoading ||
      updateInvoiceLoading ||
      addInvoiceLoading
    ) {
      setUpdateUserState({ loading: true });
    } else setUpdateUserState({ loading: false });

    if (updateDataSuccess) {
      onSuccess(); //renew users table
    }
    if (
      updateDataSuccess ||
      updatePassSuccess ||
      updateInvoiceSuccess ||
      addInvoiceSuccess
    ) {
      if (!updateDataLoading && !updatePassLoading && !updateInvoiceLoading) {
        closeForm();
        // console.log("close");
      }
    }
  }, [
    updateDataLoading,
    updatePassLoading,
    updateInvoiceLoading,
    addInvoiceLoading,
    updateDataSuccess,
    updatePassSuccess,
    updateInvoiceSuccess,
    addInvoiceSuccess,
  ]);

  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base max-h-[90dvh] overflow-y-scroll relative">
      {(getUserLoading || getUserError || updateUserState.loading) && (
        <div className="flex justify-center items-center absolute top-24 bottom-0 left-0 right-0 bg-slate-950/[.01]  z-10">
          <div className="pb-72">
            <LoadingI2 className="rounded-full scale-150" />
          </div>
        </div>
      )}
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-2xl font-bold">Kullanıcı Düzenle</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleSubmit}>
            <EditUserdata
              cities={cities}
              submit={submit}
              setSubmit={setSubmit}
              dispatcher={dispatcher}
              setNoChange={setNoChange}
            />

            <EditUserPassword
              targetUserId={inData.id}
              submit={submit}
              setSubmit={setSubmit}
              submitPass={submitPass}
              setSubmitPass={setSubmitPass}
              setNoChange={setNoChange}
            />

            <EditUserInvoice
              cities={cities}
              submit={submit}
              setSubmit={setSubmit}
              dispatcher={dispatcher}
              setNoChange={setNoChange}
            />

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={updateUserState.loading}
                className="py-2 px-3 bg-[--primary-1] text-[--white-1] rounded-lg"
                type="submit"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

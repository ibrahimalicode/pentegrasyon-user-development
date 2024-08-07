import { useEffect, useRef, useState } from "react";
import { usePopup } from "../../context/PopupContext";
import { CancelI } from "../../assets/icon";
import CustomCheckbox from "../common/customCheckbox";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  resetUpdateUserIsVerified,
  updateUserIsVerified,
} from "../../redux/users/updateUserIsVerifiedSlice";

const ChangeUserIsVerified = ({ user, onSuccess }) => {
  const usersStatusRef = useRef();

  const { setShowPopup, setPopupContent } = usePopup();

  const handleEditUserStatus = () => {
    setPopupContent(
      <EditUserIsVerifiedPopup user={user} onSuccess={onSuccess} />
    );
    setShowPopup(true);
  };

  return (
    <>
      <span
        className={`text-xs font-normal px-3 py-1 border border-solid rounded-full cursor-pointer ${
          user.isVerify
            ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
            : "text-[--black-1] bg-[--light-4]"
        } `}
        onClick={handleEditUserStatus}
        ref={usersStatusRef}
      >
        ● {user.isVerify ? "Onaylı" : "Onlaylanmadı"}
      </span>
    </>
  );
};

export default ChangeUserIsVerified;

function EditUserIsVerifiedPopup({ user, onSuccess }) {
  const dispatch = useDispatch();
  const toastId = useRef();
  const userStatusRef = useRef();

  const { loading, success, error } = useSelector(
    (state) => state.users.updateIsVerified
  );

  const { setShowPopup, setPopupContent, contentRef, setContentRef } =
    usePopup();

  const [userData, setUserData] = useState({
    userId: user.id,
    isVerify: user.isVerify,
    checked: false,
  });

  const closeThePopup = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  function editUserStatus() {
    dispatch(updateUserIsVerified({ ...userData }));
    console.log(userData);
  }

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...🤩");
    }
    if (error) {
      toastId.current && toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Bir şeyler ters gitti 😟");
      }
      dispatch(resetUpdateUserIsVerified());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      closeThePopup();
      toast.success("Kullanıcı durumu güncelendi🥳");
      dispatch(resetUpdateUserIsVerified());
    }
  }, [loading, success, error]);

  useEffect(() => {
    if (userStatusRef) {
      const refs = contentRef.filter(
        (ref) => ref.id !== "changeUserIsVerifiedPopup"
      );
      setContentRef([
        ...refs,
        {
          id: "changeUserIsVerifiedPopup",
          outRef: null,
          ref: userStatusRef,
          callback: () => closeThePopup(),
        },
      ]);
    }
  }, [userStatusRef]);

  return (
    <div className="w-full flex justify-center">
      <div
        className="w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl"
        ref={userStatusRef}
      >
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-3">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={closeThePopup}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">Hesap Durumu</h1>
          <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left gap-8">
            <div className="w-full flex gap-12 items-center">
              <p className="min-w-28">Durum:</p>
              <p
                className={`py-3 border border-dashed w-36 text-center rounded-md ${
                  user.isVerify
                    ? "text-[--green-1] border-[--green-1]"
                    : "text-[--black-1] bg-[--light-4]"
                }`}
              >
                ● {user.isVerify ? "Onaylı" : "Onlaylanmadı"}
              </p>
            </div>

            <div className="w-full flex gap-12 items-center">
              <p className="min-w-28">İşlem:</p>
              <CustomCheckbox
                className2={`${
                  user.isVerify ? "text-[--red-1]" : "text-[--green-1]"
                }`}
                label={user.isVerify ? "Onaylama" : "Onayla"}
                checked={userData.checked}
                onChange={() =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      checked: !userData.checked,
                      isVerify: !userData.isVerify,
                    };
                  })
                }
              />
            </div>

            <div className="w-full flex gap-12 items-center justify-end">
              <button
                disabled={!userData.checked}
                onClick={editUserStatus}
                className={`py-3 w-24 text-center rounded-md border border-solid transition-colors disabled:cursor-not-allowed ${
                  user.isVerify
                    ? "bg-[--status-red] text-[--red-1] border-[--red-1] hover:bg-[--red-1] hover:text-[--white-1] disabled:hover:bg-[--status-red] disabled:hover:text-[--red-1]"
                    : "bg-[--status-green] text-[--green-1] hover:bg-[--green-1] hover:text-[--white-1] border-[--green-1] disabled:hover:bg-[--status-green] disabled:hover:text-[--green-1]"
                }`}
              >
                {user.isVerify ? "Onaylama" : "Onayla"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

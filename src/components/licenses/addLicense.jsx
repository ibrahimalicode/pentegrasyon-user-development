import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePopup } from "../../context/PopupContext";
import {
  addLicense,
  resetAddLicenseState,
} from "../../redux/licenses/addLicenseSlice";
import toast from "react-hot-toast";
import { CancelI } from "../../assets/icon";
import { useLocation, useParams } from "react-router-dom";

const AddLicense = ({ onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();
  const params = useParams();
  const location = useLocation();
  const restaurantId = params.id;
  const { userId } = location.state || {};

  const handleClick = () => {
    setPopupContent(
      <AddLicensesPopup
        onSuccess={onSuccess}
        userId={userId}
        restaurantId={restaurantId}
      />
    );
    setShowPopup(true);
  };

  return (
    <button
      className="h-11 whitespace-nowrap text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
      onClick={handleClick}
    >
      Add License
    </button>
  );
};

export default AddLicense;

// EDIT RESTAURANT POPUP
function AddLicensesPopup({ onSuccess, userId, restaurantId }) {
  const dispatch = useDispatch();
  const toastId = useRef();

  const { setShowPopup, setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.licenses.addLicense
  );

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userId, restaurantId);
    return;
    dispatch(addLicense({ userId, restaurantId }));
  };

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      toastId.current && toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR + "🙁");
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetAddLicenseState());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      setShowPopup(false);
      setPopupContent(null);
      toast.success("Restoran barıyla eklendi 🥳🥳");
      dispatch(resetAddLicenseState());
    }
  }, [loading, success, error]);

  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base overflow-visible relative">
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-2xl font-bold">Lisans Ekle</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleSubmit}>
            <div className="flex max-sm:flex-col sm:gap-4"></div>

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={false}
                className={`py-2 px-3 bg-[--primary-1] text-[--white-1] rounded-lg`}
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
}

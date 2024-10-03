//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import { CancelI } from "../../../assets/icon";
import CustomCheckbox from "../../common/customCheckbox";

//REDUX
import {
  resetupdateCourier,
  updateCourier,
} from "../../../redux/couriers/updateCouriersSlice";

const EditCourierIsActive = ({ courierData, onSuccess }) => {
  const { setPopupContent } = usePopup();

  const handleClick = () => {
    setPopupContent(
      <EditCourierIsActivesPopup onSuccess={onSuccess} courier={courierData} />
    );
  };

  return (
    <span
      className={`text-xs font-normal cursor-pointer ${
        courierData.isActive
          ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
          : "text-[--red-1] bg-[--status-red] border-[--red-1]"
      } px-3 py-1 border border-solid rounded-full`}
      onClick={handleClick}
    >
      ● {courierData.isActive ? "Aktif" : "Pasif"}
    </span>
  );
};

export default EditCourierIsActive;

/////////////
// EDIT courierData POPUP
function EditCourierIsActivesPopup({ onSuccess, courier }) {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.couriers.update
  );

  const [courierData, setCourierData] = useState({
    ...courier,
    checked: false,
    courierId: courier.id,
    isActive: courier.isActive,
  });

  const closeForm = () => {
    setPopupContent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCourier(courierData));
  };

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      toast.dismiss(toastId.current);
      dispatch(resetupdateCourier());
    }
    if (success) {
      toast.dismiss(toastId.current);
      onSuccess();
      setPopupContent(null);
      toast.success(
        `Kurye başarıyla ${
          courier.isActive ? "Pasifleştirildi" : "Aktifleştirildi"
        } 🥳🥳`
      );
      dispatch(resetupdateCourier());
    }
  }, [loading, success, error]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl">
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-3">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={closeForm}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">Kurye Durumu</h1>
          <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left gap-8">
            <div className="w-full flex gap-12 items-center">
              <p className="min-w-28">Durum:</p>
              <p
                className={`py-3 border border-dashed w-24 text-center rounded-md ${
                  courier.isActive
                    ? "text-[--green-1] border-[--green-1]"
                    : "text-[--red-1] border-[--red-1]"
                }`}
              >
                ● {courier.isActive ? "Aktif" : "Pasif"}
              </p>
            </div>

            <div className="w-full flex gap-12 items-center">
              <p className="min-w-28">İşlem:</p>
              <CustomCheckbox
                className2={`${
                  courier.isActive ? "text-[--red-1]" : "text-[--green-1]"
                }`}
                label={courier.isActive ? "Pasifleştir" : "Aktifleştir"}
                checked={courierData.checked}
                onChange={() =>
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      checked: !courierData.checked,
                      isActive: !courierData.isActive,
                    };
                  })
                }
              />
            </div>

            <div className="w-full flex gap-12 items-center justify-end">
              <button
                disabled={!courierData.checked}
                onClick={handleSubmit}
                className={`py-3 w-24 text-center rounded-md border border-solid transition-colors disabled:cursor-not-allowed ${
                  courier.isActive
                    ? "bg-[--status-red] text-[--red-1] border-[--red-1] hover:bg-[--red-1] hover:text-[--white-1] disabled:hover:bg-[--status-red] disabled:hover:text-[--red-1]"
                    : "bg-[--status-green] text-[--green-1] hover:bg-[--green-1] hover:text-[--white-1] border-[--green-1] disabled:hover:bg-[--status-green] disabled:hover:text-[--green-1]"
                }`}
              >
                {courier.isActive ? "Pasifleştir" : "Aktifleştir"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

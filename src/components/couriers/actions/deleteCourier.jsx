//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { DeleteI } from "../../../assets/icon";
import LoadingI from "../../../assets/anim/loading";
import ActionButton from "../../common/actionButton";
import { usePopup } from "../../../context/PopupContext";
import CustomCheckbox from "../../common/customCheckbox";

//REDUX
import {
  deleteCourier,
  resetdeleteCourier,
} from "../../../redux/couriers/deleteCourierSlice";

const DeleteCourier = ({ courier, onSuccess }) => {
  const { setPopupContent } = usePopup();

  const handleClick = () => {
    setPopupContent(
      <DeleteCourierPopup courier={courier} onSuccess={onSuccess} />
    );
  };

  return (
    <ActionButton
      className="text-[--red-1]"
      element={<DeleteI className="w-[1.1rem]" />}
      element2="Sil"
      onClick={handleClick}
    />
  );
};

export default DeleteCourier;

function DeleteCourierPopup({ courier, onSuccess }) {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.couriers.delete
  );

  const [checked, setChecked] = useState(false);

  const handleDelete = () => {
    dispatch(deleteCourier({ courierId: courier.id }));
  };

  const closeForm = () => {
    setChecked(false);
    setPopupContent(null);
  };

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (error) {
      dispatch(resetdeleteCourier());
    }
    if (success) {
      onSuccess();
      closeForm();
      toast.dismiss(toastId.current);
      toast.success("Başarıyla Silindi");
      dispatch(resetdeleteCourier());
    }
  }, [loading, success, error, dispatch]);

  return (
    <>
      <div className="flex flex-col w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base">
        <h1 className="self-center text-2xl font-bold">Silinecek</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <p className="mt-7">
            Kurye
            <span className="text-[--primary-1]">
              {" "}
              {courier.username}{" "}
            </span>{" "}
            Silinecektir. Emin misiniz?
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <CustomCheckbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              label="Eminim sil"
            />
          </div>
          <div className="flex gap-3 self-end max-sm:mt-4 mt-2 text-[--white-1]">
            <button
              className="px-10 py-2 text-base bg-[--red-1] rounded-lg disabled:cursor-not-allowed disabled:opacity-70"
              disabled={!checked || loading}
              onClick={handleDelete}
            >
              Sil
            </button>
            <button
              className="px-6 py-2 text-base bg-[--primary-1] rounded-lg"
              onClick={closeForm}
            >
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

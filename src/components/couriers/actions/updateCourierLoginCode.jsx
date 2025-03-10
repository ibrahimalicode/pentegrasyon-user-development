//MODULES
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

//COMP
import ActionButton from "../../common/actionButton";
import { CancelI, RotateI, TransferI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";
import CustomCheckbox from "../../common/customCheckbox";
import CustomInput from "../../common/customInput";

//REDUX
import {
  updateCourierLoginCode,
  resetUpdateCourierLoginCode,
} from "../../../redux/couriers/updateCourierLoginCodeSlice";
import {
  generateLoginCode,
  resetgenerateLoginCode,
} from "../../../redux/couriers/generateLoginCodeSlice";

const UpdateCourierLoginCode = ({ courier, onSuccess }) => {
  const { setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(
      <UpdateCourierLoginCodePopup courier={courier} onSuccess={onSuccess} />
    );
  };

  return (
    <ActionButton
      element={<RotateI className="w-5" strokeWidth="1.8" />}
      element2="Kodu Yenile"
      onClick={handleClick}
    />
  );
};

export default UpdateCourierLoginCode;

function UpdateCourierLoginCodePopup({ courier, onSuccess }) {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.couriers.updateLoginCode
  );

  const { loading: codeLoading, code } = useSelector(
    (state) => state.couriers.generateCode
  );

  const { setPopupContent } = usePopup();
  const [courierData, setCourierData] = useState({
    courierId: courier.id,
    loginCode: "",
    sendSMSNotify: false,
  });

  const closeForm = () => {
    setPopupContent(null);
  };

  function handleClick() {
    dispatch(updateCourierLoginCode(courierData));
  }

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (error) {
      dispatch(resetUpdateCourierLoginCode());
    }
    if (success) {
      onSuccess();
      closeForm();
      toast.dismiss(toastId.current);
      toast.success("Giriş Kodu Başarıyla Güncelendi");
      dispatch(resetUpdateCourierLoginCode());
    }
  }, [loading, success, error, dispatch]);

  // SET THE CODE
  useEffect(() => {
    if (code) {
      console.log(code);
      setCourierData((prev) => {
        return {
          ...prev,
          loginCode: code,
        };
      });
      dispatch(resetgenerateLoginCode());
    }
  }, [code]);

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
          <div className="flex flex-col px-14 mt-9 w-full text-left">
            <div className="w-full flex gap-12 items-center">
              <p className="min-w-28">Mevcüt Giriş Kodu:</p>
              <p className="py-3 text-[--primary-1]">{courier.loginCode}</p>
            </div>

            <div className="flex items-center gap-8">
              <CustomInput
                // required
                type="text"
                label="Yeni Giriş Kodu"
                placeholder="Yeni Giriş Kodu"
                className="py-[.45rem] text-sm"
                className2="mt-[.5rem] sm:mt-[.5rem] max-w-40"
                value={courierData.loginCode}
                onChange={(e) => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      loginCode: e,
                    };
                  });
                }}
              />

              <div className="mt-7">
                <button
                  type="button"
                  className="flex gap-1 hover:text-[--primary-2]"
                  onClick={() => dispatch(generateLoginCode({}))}
                >
                  <TransferI /> Otomatik Oluştur
                </button>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <CustomCheckbox
                label="SMS Gönder"
                className="mt-7 whitespace-nowrap"
                checked={courierData.sendSMSNotify}
                onChange={() => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      sendSMSNotify: !courierData.sendSMSNotify,
                    };
                  });
                }}
              />
            </div>

            <div className="w-full flex gap-12 items-center justify-end">
              <button
                disabled={loading}
                onClick={handleClick}
                className="py-2 px-3 bg-[--primary-1] text-white rounded-lg disabled:cursor-not-allowed"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

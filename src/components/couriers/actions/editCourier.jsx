//MODULES
import { isEqual } from "lodash";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//REDUX

import {
  resetupdateCourier,
  updateCourier,
} from "../../../redux/couriers/updateCouriersSlice";
import {
  generateLoginCode,
  resetgenerateLoginCode,
} from "../../../redux/couriers/generateLoginCodeSlice";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import CustomInput from "../../common/customInput";
import ActionButton from "../../common/actionButton";
import CustomSelect from "../../common/customSelector";
import CustomCheckbox from "../../common/customCheckbox";
import CustomPhoneInput from "../../common/customPhoneInput";
import { CancelI, EditI, TransferI } from "../../../assets/icon";

//UTILS
import { formatToPrice } from "../../../utils/utils";
import compensationTypes from "../../../enums/compensationTypes";

const EditCourier = ({ courier, onSuccess }) => {
  const { setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(
      <EditCourierPopup courier={courier} onSuccess={onSuccess} />
    );
  };

  return (
    <ActionButton
      element={<EditI className="w-5" strokeWidth="1.8" />}
      element2="Düzenle"
      onClick={handleClick}
    />
  );
};

export default EditCourier;

//
///
function EditCourierPopup({ onSuccess, courier }) {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.couriers.update
  );
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  const { loading: codeLoading, code } = useSelector(
    (state) => state.couriers.generateCode
  );

  const {
    id,
    username,
    phoneNumber,
    email,
    loginCode,
    compensationTypeId,
    compensationRate,
  } = courier;

  const [courierData, setCourierData] = useState({
    courierId: id,
    compensation: compensationTypes[compensationTypeId],
    username: username,
    phoneNumber: "9" + phoneNumber,
    email: email,
    loginCode,
    compensationTypeId,
    compensationRate: Number(compensationRate).toFixed(2).replace(".", ","),
    sendSMSNotify: false,
    isOnline: true,
  });

  const [courierDataBefore, setCourierDataBefore] = useState({
    courierId: id,
    compensation: compensationTypes[compensationTypeId],
    username: username,
    phoneNumber: "9" + phoneNumber,
    email: email,
    loginCode,
    compensationTypeId,
    compensationRate: Number(compensationRate).toFixed(2).replace(".", ","),
    sendSMSNotify: false,
    isOnline: true,
  });

  const closeForm = () => {
    setPopupContent(null);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const noChange = isEqual(courierDataBefore, courierData);
    if (noChange) {
      toast.error("Hiç bir değişiklik yapmadınız.");
      return;
    }
    dispatch(
      updateCourier({
        ...courierData,
        compensationRate: courierData.compensationRate
          .replace(".", "")
          .replace(",", "."),
      })
    );
  }

  // TOAST FOR ADD
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
      closeForm();
      toast.success("Kurye başarıyla düzenlendi");
      dispatch(resetupdateCourier());
    }
  }, [loading, success, error]);

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
    <main>
      <div className="w-full pt-12 px-[4%] pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl">
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-0">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={closeForm}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">Kurye Düzenle</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex items-end max-sm:flex-col sm:gap-4 sm:w-1/2">
              <CustomInput
                required
                label="Ad"
                placeholder="Ad"
                className="py-[.45rem] text-sm"
                className2="mt-[.5rem] sm:mt-[.5rem]"
                value={courierData.username}
                onChange={(e) => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      username: e,
                    };
                  });
                }}
              />
            </div>

            <div className="flex max-sm:flex-col sm:gap-4">
              <CustomPhoneInput
                required
                label="Telefon"
                placeholder="Telefon"
                className="py-[.45rem] text-sm"
                className2="mt-[.5rem] sm:mt-[.5rem]"
                value={courierData.phoneNumber}
                onChange={(phone) => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      phoneNumber: phone,
                    };
                  });
                }}
                maxLength={14}
              />

              <CustomInput
                required
                type="email"
                label="E-Posta"
                placeholder="E-Posta"
                className="py-[.45rem] text-sm"
                className2="mt-[.5rem] sm:mt-[.5rem]"
                value={courierData.email}
                onChange={(e) => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      email: e,
                    };
                  });
                }}
              />
            </div>

            <div className="flex max-sm:flex-col sm:gap-4 items-end">
              <CustomSelect
                // required
                label="Hakediş Şekli"
                style={{ padding: "1px 0px" }}
                className="text-sm"
                value={
                  courierData.compensation
                    ? courierData.compensation
                    : { value: null, label: "Hakediş Şekli seç" }
                }
                options={compensationTypes}
                onChange={(selectedOption) => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      compensation: selectedOption,
                      compensationTypeId: selectedOption.value,
                    };
                  });
                }}
              />

              <CustomInput
                // required
                type="text"
                maxLength={11}
                label="Hakediş Tutarı"
                placeholder="Hakediş Tutarı"
                className="py-[.45rem] text-sm"
                className2="mt-[.5rem] sm:mt-[.5rem]"
                value={formatToPrice(courierData.compensationRate)}
                onChange={(e) => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      compensationRate: formatToPrice(e),
                    };
                  });
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <CustomInput
                // required
                type="text"
                label="Giriş Kodu"
                placeholder="Giriş Kodu"
                className="py-[.45rem] text-sm"
                className2="mt-[.5rem] sm:mt-[.5rem]"
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

              <div className="mt-9">
                <button
                  type="button"
                  className="flex gap-1 hover:text-[--primary-2] whitespace-nowrap"
                  onClick={() => dispatch(generateLoginCode({}))}
                >
                  <TransferI /> Otomatik Oluştur
                </button>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <CustomCheckbox
                label="Teslimata Hazır"
                className="mt-7 whitespace-nowrap"
                checked={courierData.isOnline}
                onChange={() => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      isOnline: !courierData.isOnline,
                    };
                  });
                }}
              />

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

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={loading}
                className={`py-2 px-3 bg-[--primary-1] text-white rounded-lg`}
                type="submit"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

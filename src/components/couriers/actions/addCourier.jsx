//MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { TransferI } from "../../../assets/icon";
import { CancelI } from "../../../assets/icon";
import CustomInput from "../../common/customInput";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";
import CustomCheckbox from "../../common/customCheckbox";
import CustomPhoneInput from "../../common/customPhoneInput";

//REDUX
import {
  addCourier,
  resetAddCourier,
} from "../../../redux/couriers/addCourierSlice";
import {
  generateLoginCode,
  resetGenerateLoginCode,
} from "../../../redux/couriers/generateLoginCodeSlice";

//UTILS
import compensationTypes from "../../../enums/compensationTypes";
import { formatToPrice } from "../../../utils/utils";
import { useAsyncActionToast } from "@/hooks/useAsyncActionToast";

const AddCourier = ({ onSuccess }) => {
  const { setPopupContent } = usePopup();

  const handleClick = () => {
    setPopupContent(<AddCourierPopup onSuccess={onSuccess} />);
  };

  return (
    <button
      className="h-11 whitespace-nowrap text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
      onClick={handleClick}
    >
      Kurye Ekle
    </button>
  );
};

export default AddCourier;

//
///
////
function AddCourierPopup({ onSuccess }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.couriers.add
  );

  const { loading: codeLoading, code } = useSelector(
    (state) => state.couriers.generateCode
  );

  const { setPopupContent } = usePopup();
  const [courierData, setCourierData] = useState({
    compensation: null,
    username: "",
    phoneNumber: "",
    email: "",
    loginCode: "",
    compensationTypeId: 0,
    rate: "",
    sendSMSNotify: false,
  });

  const closeForm = () => {
    setPopupContent(null);
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      addCourier({
        ...courierData,
        compensationRate: courierData.rate.replace(".", "").replace(",", "."),
      })
    );
  }

  // TOAST FOR ADD
  useAsyncActionToast(
    { loading, success, error },
    {
      loadingMessage: "İşleniyor 🤩...",
      successMessage: "Kurye başarıyla eklendi",
      onSuccess: () => {
        onSuccess();
        closeForm();
      },
      reset: resetAddCourier,
    }
  );

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
      dispatch(resetGenerateLoginCode());
    }
  }, [code]);

  return (
    <main>
      <div className="w-full pt-12 px-[4%] pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl">
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-3">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={closeForm}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">Kurye Ekle</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex max-sm:flex-col sm:gap-4 items-end sm:w-1/2">
              <CustomInput
                required
                label="Ad"
                placeholder="Kurye Adı"
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

            <div className="flex max-sm:flex-col sm:gap-4 items-end">
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
                label="Hakediş Tutarı"
                placeholder="Hakediş Tutarı"
                className="py-[.45rem] text-sm"
                className2="mt-[.5rem] sm:mt-[.5rem]"
                value={formatToPrice(courierData.rate)}
                onChange={(e) => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      rate: formatToPrice(e),
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
                Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
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
  resetaddCourier,
} from "../../../redux/couriers/addCourierSlice";
import {
  getRestaurants,
  resetGetRestaurants,
} from "../../../redux/restaurants/getRestaurantsSlice";
import {
  generateLoginCode,
  resetgenerateLoginCode,
} from "../../../redux/couriers/generateLoginCodeSlice";

//UTILS
import compensationTypes from "../../../enums/compensationTypes";
import { formatSelectorData, formatToPrice } from "../../../utils/utils";

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
  const toastId = useRef();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.couriers.add
  );
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  const { loading: codeLoading, code } = useSelector(
    (state) => state.couriers.generateCode
  );

  const { setPopupContent } = usePopup();
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [courierData, setCourierData] = useState({
    restaurant: null,
    compensation: null,
    restaurantId: "",
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

  //GET RESTAURANTS
  useEffect(() => {
    if (!restaurantsData.length) {
      dispatch(getRestaurants({}));
    }
  }, [restaurantsData]);

  //SET RESTAURANTS
  useEffect(() => {
    if (restaurants) {
      setRestaurantsData(formatSelectorData(restaurants.data, false));
      dispatch(resetGetRestaurants());
    }
  }, [restaurants]);

  // TOAST FOR ADD
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      toast.dismiss(toastId.current);
      dispatch(resetaddCourier());
    }
    if (success) {
      toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      toast.success("Kurye başarıyla eklendi");
      dispatch(resetaddCourier());
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
            <div className="flex max-sm:flex-col sm:gap-4 items-end">
              <CustomSelect
                required
                label="Restoran"
                style={{ padding: "1px 0px" }}
                className="text-sm"
                value={
                  courierData.restaurant
                    ? courierData.restaurant
                    : { value: null, label: "Restoran seç" }
                }
                options={restaurantsData}
                onChange={(selectedOption) => {
                  setCourierData((prev) => {
                    return {
                      ...prev,
                      restaurant: selectedOption,
                      restaurantId: selectedOption.id,
                    };
                  });
                }}
              />

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

            <div className="flex max-sm:flex-col sm:gap-4 items-end">
              <CustomPhoneInput
                required
                label="Telefon"
                placeholder="Telefon"
                className="py-[.45rem] text-sm"
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
                label="Hakediş Oranı"
                placeholder="Hakediş Oranı"
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
                className={`py-2 px-3 bg-[--primary-1] text-[--white-1] rounded-lg`}
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

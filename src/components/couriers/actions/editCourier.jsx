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
  getRestaurants,
  resetGetRestaurants,
} from "../../../redux/restaurants/getRestaurantsSlice";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import CustomInput from "../../common/customInput";
import ActionButton from "../../common/actionButton";
import { CancelI, EditI } from "../../../assets/icon";
import CustomSelect from "../../common/customSelector";
import CustomPhoneInput from "../../common/customPhoneInput";

//UTILS
import { formatSelectorData } from "../../../utils/utils";

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
  const { loading, success, error } = useSelector(
    (state) => state.couriers.update
  );
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  const { setPopupContent } = usePopup();
  const [restaurantsData, setRestaurantsData] = useState([]);
  const { id, username, phoneNumber, email } = courier;
  const [courierData, setCourierData] = useState({
    courierId: id,
    restaurant: null,
    restaurantId: "",
    username: username,
    phoneNumber: "9" + phoneNumber,
    email: email,
  });
  const [courierDataBefore, setCourierDataBefore] = useState({
    courierId: id,
    restaurant: null,
    restaurantId: "",
    username: username,
    phoneNumber: "9" + phoneNumber,
    email: email,
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
    dispatch(updateCourier(courierData));
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
      const currentRestaurant = restaurants.data.filter(
        (r) => r.id === courier.restaurantId
      )[0];
      if (currentRestaurant) {
        const { id, name } = currentRestaurant;
        const updateData = {
          ...courierData,
          restaurant: { value: id, label: name, id: id },
          restaurantId: id,
        };
        setCourierData(updateData);
        setCourierDataBefore(updateData);
      }
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
            <div className="flex max-sm:flex-col sm:gap-4">
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

            <div className="flex max-sm:flex-col sm:gap-4">
              <CustomPhoneInput
                required
                label="Telefone"
                placeholder="Telefone"
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

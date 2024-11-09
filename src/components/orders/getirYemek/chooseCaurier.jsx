import { useEffect, useRef, useState } from "react";
import CloseI from "../../../assets/icon/close";
import { usePopup } from "../../../context/PopupContext";
import CustomInput from "../../common/customInput";
import CustomSelect from "../../common/customSelector";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableCouriers } from "../../../redux/couriers/getAvailableCouriersSlice";
import ActionButton from "../../common/actionButton";
import {
  resetupdateOrderCourier,
  updateOrderCourier,
} from "../../../redux/orders/updateOrderCourierSlice";
import toast from "react-hot-toast";

const ChooseCourier = ({ order }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading: couriersLoading, couriers } = useSelector(
    (state) => state.couriers.getOnlineCouriers
  );
  const { loading, error, success } = useSelector(
    (state) => state.orders.updateCourier
  );

  const [compensationRate, setCompensationRate] = useState("");
  const [courierServices, setCourierServices] = useState(null);
  const [restaurantCouriers, setRestaurantCouriers] = useState(null);
  const [compensationValue, setCompensationValue] = useState({
    label: "Choose Type",
    value: null,
  });
  const [compensationOptions, setCompensationOptions] = useState([
    {
      label: "Package",
      value: 0,
    },
    {
      label: "KM",
      value: 1,
    },
  ]);

  function handleSubmit() {
    dispatch(
      updateOrderCourier({
        ticketId: order.id,
        marketplaceId: order.marketplaceId,
        courierService: courierServices.value,
        courierId: restaurantCouriers.value,
        courierCompensationType: compensationValue.value,
        compensationRate,
      })
    );
  }

  // TOAST FOR UPDATE
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (success) {
      toast.dismiss(toastId.current);
      toast.success("Başarıyla güncelendi.");
    }
    if (error) {
      toast.dismiss(toastId);
      dispatch(resetupdateOrderCourier());
    }
  }, [loading, error, success]);

  // GET COURIERS
  useEffect(() => {
    if (!restaurantCouriers) {
      dispatch(getAvailableCouriers()); // GetAvialableCouriers
    }
    // dispatch() //GetAvialableCourierService
  }, []);

  // SET COURIERS
  useEffect(() => {
    if (couriers) {
      console.log(couriers);
      setRestaurantCouriers(couriers);
    }
  }, [couriers]);

  return (
    <main className="bg-[--white-1] rounded-md p-5">
      <div className="flex justify-end">
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] border border-[--red-1] p-2 rounded-full"
        >
          <CloseI />
        </button>
      </div>

      <h1 className="text-center text-xl font-bold">Kurye Seç</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <CustomSelect
              label="Restoran Kuryeleri"
              value={compensationRate}
              required
              onChange={(e) => setCompensationRate(e)}
            />
            <CustomSelect
              label="Compensation Type"
              isSearchable={false}
              value={compensationValue}
              options={compensationOptions}
              onChange={(selectedOption) =>
                setCompensationValue(selectedOption)
              }
            />
            <CustomInput label="Compensation Rate" />
          </div>
          {courierServices && <div></div>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[--primary-2] text-[--white-1] rounded-md mt-3"
          >
            Kaydet
          </button>
        </div>
      </form>
    </main>
  );
};

export default ChooseCourier;

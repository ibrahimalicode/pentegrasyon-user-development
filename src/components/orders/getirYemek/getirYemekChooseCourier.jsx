//MODULE
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMPONENT
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";

//UTILS
import { formatSelectorData } from "../../../utils/utils";
import compensationTypes from "../../../enums/compensationTypes";
import courierServiceTypes from "../../../enums/courierServiceType";

//REDUX
import {
  resetupdateOrderCourier,
  updateOrderCourier,
} from "../../../redux/orders/updateOrderCourierSlice";
import {
  getAvailableCouriers,
  resetgetAvailableCouriers,
} from "../../../redux/couriers/getAvailableCouriersSlice";
import { getAvailableCourierServices } from "../../../redux/couriers/getAvailableCourierServicesSlice";
import LoadingI from "../../../assets/anim/loading";
import { RouteInfo } from "../components/googleRoute";
import {
  getOrderCompensation,
  resetGetOrderCompensation,
} from "../../../redux/orders/getOrderCompensationSlice";

const GetirYemekChooseCourier = ({ order }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading: couriersLoading, couriers } = useSelector(
    (state) => state.couriers.getOnlineCouriers
  );
  const { /* loading: servicesLoading, */ services } = useSelector(
    (state) => state.couriers.getCourierLicenses
  );
  const { loading, error, success } = useSelector(
    (state) => state.orders.updateCourier
  );
  const {
    loading: compensationLoading,
    error: compensationError,
    compensationData,
  } = useSelector((state) => state.orders.getOrderCompensation);

  const [routeData, setRouteData] = useState(null);
  const [courierServices, setCourierServices] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [restaurantCouriers, setRestaurantCouriers] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);

  const [compensationType, setCompensationType] = useState(null);
  const [compensationRate, setCompensationRate] = useState("");
  const [specialBonusRate, setSpecialBonusRate] = useState("");
  const [currentCompensation, setCurrentCompensation] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedCourier?.id) {
      toast.error("Lütfen kurye seçin", { id: "kurye-error" });
      return;
    }
    if (selectedService?.id == null) {
      toast.error("Lütfen servis seçin", { id: "kurye-error" });
      return;
    }
    dispatch(
      updateOrderCourier({
        ticketId: order.id,
        marketplaceId: order.marketplaceId,
        courierService: selectedService.licenseTypeId,
        courierId: selectedCourier.id,
        courierCompensationType: compensationType.id,
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
      setPopupContent(null);
      toast.dismiss(toastId.current);
      toast.success("Başarıyla güncelendi.");
      dispatch(resetupdateOrderCourier());
    }
    if (error) {
      toast.dismiss(toastId);
      dispatch(resetupdateOrderCourier());
    }
  }, [loading, error, success]);

  // GET COURIERS AND COURIER LICENSES
  useEffect(() => {
    if (!restaurantCouriers && selectedService?.id === 0) {
      dispatch(getAvailableCouriers({ restaurantId: order.restaurantId }));
    }
    if (!courierServices) {
      dispatch(
        getAvailableCourierServices({ restaurantId: order.restaurantId })
      );
    }
    if (!currentCompensation) {
      dispatch(
        getOrderCompensation({
          marketplaceId: order.marketplaceId,
          ticketId: order.id,
        })
      );
    }
  }, [restaurantCouriers, selectedService, courierServices]);

  // SET COURIERS
  useEffect(() => {
    if (couriers?.length) {
      const couriersForSelector = formatSelectorData(couriers);
      setRestaurantCouriers(couriersForSelector);

      if (order.courier?.id && !selectedCourier?.id) {
        const currentCourier = couriersForSelector.filter(
          (C) => C.id == order.courier.id
        );
        if (currentCourier.length) setSelectedCourier(currentCourier[0]);
      }
    }
    return () => {
      if (couriers) {
        dispatch(resetgetAvailableCouriers());
      }
    };
  }, [couriers]);

  //SET COMPENSATION
  useEffect(() => {
    if (compensationData) {
      console.log(compensationData);
      setCurrentCompensation(compensationData);
      dispatch(resetGetOrderCompensation());
    }
  }, [compensationData]);

  // SET SERVICES(LICENSES)
  useEffect(() => {
    if (services?.length) {
      const userServices = courierServiceTypes.filter((T) =>
        services.some((s) => s.licenseTypeId === T.licenseTypeId || T.id == 0)
      );
      setCourierServices(userServices);
    }
    if (order.courierTypeId != null && !selectedService?.id) {
      const currentService = courierServiceTypes.filter(
        (T) => T.licenseTypeId == order.courierTypeId
      );
      if (currentService.length) setSelectedService(currentService[0]);
    }
  }, [services]);

  //GET ROUTE INFO
  useEffect(() => {
    const data = {
      lat1: order.courier.latitude,
      lng1: order.courier.longitude,
      lat2: order.client.latitude,
      lng2: order.client.longitude,
    };
    RouteInfo(data)
      .then((routeInfo) => {
        setRouteData({
          ...routeInfo,
          distance: Number(routeInfo?.distance?.replace("km", "")),
        });
      })
      .catch((error) => {
        toast.error("Mesafe alınamadı", { id: "google-error" });
        console.error(error.message);
      });
  }, []);

  return (
    <main className="bg-[--white-1] rounded-md">
      <div className="flex justify-between bg-indigo-700/60 p-3 rounded-t-md">
        <div className="text-sm text-[--white-1]">
          <p>
            <span className="font-bold text-[--black-1]">Müşteri:</span>{" "}
            {order?.client?.name}{" "}
          </p>
          <p>
            <span className="font-bold text-[--black-1]">Adres: </span>
            <span>{order.client.address}</span>
            {order.client.aptNo && <span>Apt No: {order.client.aptNo}</span>}
            {order.client.doorNo && (
              <span> Daire No: {order.client.doorNo}</span>
            )}
            {order.client.floor && <span> Kat: {order.client.floor}</span>}
          </p>
          <p className="flex">
            <span className="font-bold text-[--black-1] mr-2">Mesafe: </span>
            {routeData ? <span> {routeData.distance} KM</span> : <LoadingI />}
          </p>
          <p>
            <span className="font-bold text-[--black-1]">Platform:</span> Getir
            Yemek
          </p>
        </div>
        {/* <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] w-max h-max border border-[--red-1] p-2 rounded-full"
        >
          <CloseI />
        </button> */}
      </div>

      <form onSubmit={handleSubmit} className="px-5 pb-5">
        <div>
          <div>
            <h1 className="text-center text-2xl font-bold py-4">
              Servis Seçin
            </h1>
            {courierServices?.length && (
              <div className="flex gap-4">
                {courierServices.map((C) => (
                  <button
                    key={C.id}
                    onClick={() => setSelectedService(C)}
                    className={`border bg-[--light-3] py-2 px-3 rounded-sm ${
                      selectedService.id == C.id &&
                      "bg-[--status-green] text-[--green-1] border-[--green-1]"
                    }`}
                  >
                    {C.label}
                  </button>
                ))}
              </div>
            )}
            {selectedService?.id === 0 && (
              <div>
                <h1 className="text-center text-2xl font-bold mt-8">
                  Kurye Seçin
                </h1>
                <div>
                  {restaurantCouriers?.length ? (
                    restaurantCouriers.map((R) => (
                      <button
                        key={R.id}
                        type="button"
                        onClick={() => setSelectedCourier(R)}
                        className={`border rounded-sm px-3 py-1.5 ${
                          R.id == selectedCourier?.id
                            ? "bg-[--status-green] text-[--green-1] border border-[--green-1]"
                            : "bg-[--light-3] font-normal"
                        }`}
                      >
                        {R.label}
                      </button>
                    ))
                  ) : couriersLoading ? (
                    <p>
                      <LoadingI className="text-[var(--light-4)]" />
                    </p>
                  ) : (
                    <p className="text-[--red-1] text-sm">
                      Uygun kuryeleriniz bulunamadı.
                    </p>
                  )}
                </div>

                <main className="text-sm">
                  <h1 className="text-center text-2xl font-bold mt-8">
                    Hadeiş Şekli
                  </h1>

                  <div className="flex flex-wrap w-full">
                    <div className="flex flex-wrap gap-1 mr-3 mt-3">
                      {currentCompensation ? (
                        <div>
                          <p className="flex whitespace-nowrap mr-1 items-center px-3 rounded-sm bg-[--light-3]">
                            Mevcut:{" "}
                            <span className="ml-2">
                              {currentCompensation.label}₺
                            </span>
                          </p>
                          <p>
                            {
                              compensationTypes.filter(
                                (c) => c.id !== currentCompensation.id
                              )[0].label
                            }
                          </p>
                        </div>
                      ) : compensationTypes?.length ? (
                        compensationTypes.map((C) => (
                          <button
                            key={C.id}
                            type="button"
                            onClick={() => setCompensationType(C)}
                            className={`border flex whitespace-nowrap mr-1 items-center px-3 rounded-sm bg-[--light-3] ${
                              C.id == compensationType?.id &&
                              "border-[--green-1] bg-[--status-green] text-[--green-1]"
                            }`}
                          >
                            {C.label}
                          </button>
                        ))
                      ) : null}
                      <CustomInput
                        type="number"
                        className="mt-[0] sm:mt-[0] text-[--red-1]"
                        className2="max-w-[64px] mt-[0] sm:mt-[0] justify-end"
                        value={compensationRate}
                        disabled={!compensationType?.id}
                        required={compensationType?.value ? true : false}
                        onChange={(e) => setCompensationRate(e)}
                      />
                      <p className="flex items-center text-[--red-1]">₺</p>
                    </div>

                    <div className="flex mt-3">
                      <button
                        type="button"
                        className={`flex whitespace-nowrap mr-1 items-center px-3 rounded-sm bg-[--light-3]`}
                      >
                        Özel Hakediş
                      </button>
                      <CustomInput
                        type="number"
                        className="mt-[0] sm:mt-[0] text-[--red-1]"
                        className2="max-w-[64px] mt-[0] sm:mt-[0] justify-end"
                        value={specialBonusRate}
                        onChange={(e) => setSpecialBonusRate(e)}
                      />
                      <p className="flex items-center text-[--red-1]">₺</p>
                    </div>

                    <div className="flex flex-col items-center w-full pt-4">
                      <div>
                        <p className="flex">
                          <span className="font-bold mr-2">Mesafe: </span>
                          {routeData ? (
                            <span className="text-[--red-1]">
                              {routeData.distance} KM
                            </span>
                          ) : (
                            <LoadingI />
                          )}
                        </p>

                        <p>
                          <span className="font-bold">Tutar: </span>
                          <span className="text-[--red-1]">
                            {compensationRate * routeData?.distance} ₺
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            disabled={loading}
            onClick={() => setPopupContent(null)}
            className="border border-[--red-1] px-5 py-2 bg-[--status-red] text-[--red-1] rounded-sm mt-3"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="border border-transparent px-5 py-2 bg-[--primary-2] text-[--white-1] rounded-sm mt-3"
          >
            Kaydet
          </button>
        </div>
      </form>
    </main>
  );
};

export default GetirYemekChooseCourier;

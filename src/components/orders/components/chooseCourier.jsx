//MODULE
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMPONENT
import CustomInput from "../../common/customInput";
import LoadingI from "../../../assets/anim/loading";
import { RouteInfo } from "../components/googleRoute";
import { usePopup } from "../../../context/PopupContext";

//UTILS
import {
  formatByDate,
  formatSelectorData,
  formatToPrice,
} from "../../../utils/utils";
import compensationTypes from "../../../enums/compensationTypes";
import courierServiceTypes from "../../../enums/courierServiceType";

//REDUX
import {
  updateOrderCourier,
  resetupdateOrderCourier,
} from "../../../redux/orders/updateOrderCourierSlice";
import {
  getAvailableCouriers,
  resetgetAvailableCouriers,
} from "../../../redux/couriers/getAvailableCouriersSlice";
import {
  getOrderCompensation,
  resetGetOrderCompensation,
} from "../../../redux/orders/getOrderCompensationSlice";
import { getAvailableCourierServices } from "../../../redux/couriers/getAvailableCourierServicesSlice";
import MarketPalceIds from "../../../enums/marketPlaceIds";

const ChooseCourier = ({ order, Address, locatioData, setOrdersData }) => {
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
    compensationData: compensation,
    error: compensationError,
    loading: compensationLoading,
  } = useSelector((state) => state.orders.getOrderCompensation);

  const [routeData, setRouteData] = useState(null);
  const [courierServices, setCourierServices] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [restaurantCouriers, setRestaurantCouriers] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);

  const [compensationData, setCompensationData] = useState(null);
  const [compensationRate, setCompensationRate] = useState("");
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
        courierCompensationType: compensationData.id,
        compensationRate,
      })
    );
  }

  function formatCompensation(inData) {
    const data = compensationTypes.filter(
      (C) => C.id == inData.compensationTypeId
    )[0];
    return {
      label: data.label,
      value: data.value,
      id: data.id,
    };
  }

  // TOAST FOR UPDATE
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (success) {
      toast.dismiss(toastId.current);
      toast.success("Başarıyla güncelendi.");
      setOrdersData((prev) => {
        const outCurrentOrder = prev.filter((O) => O.id !== order.id);
        return formatByDate([
          ...outCurrentOrder,
          { ...order, courierId: selectedCourier.id },
        ]);
      });
      setPopupContent(null);
      dispatch(resetupdateOrderCourier());
    }
    if (error) {
      toast.dismiss(toastId);
      dispatch(resetupdateOrderCourier());
    }
  }, [loading, error, success]);

  // GET COURIERS, COURIER LICENSES AND COMPENSATION
  useEffect(() => {
    if (!restaurantCouriers && selectedService?.id === 0) {
      dispatch(getAvailableCouriers({ restaurantId: order.restaurantId }));
    }
    if (!courierServices && selectedService?.id === 0) {
      dispatch(
        getAvailableCourierServices({ restaurantId: order.restaurantId })
      );
    }
    if (!currentCompensation && selectedService?.id === 0) {
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

      if (order?.courierId && !selectedCourier?.id) {
        const currentCourier = couriersForSelector.filter(
          (C) => C.id == order?.courierId
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
    if (compensation) {
      setCompensationData(formatCompensation(compensation));
      setCurrentCompensation(formatCompensation(compensation));
      setCompensationRate(compensation.rate);
      dispatch(resetGetOrderCompensation());
    }
    if (compensationError) {
      dispatch(resetGetOrderCompensation());
    }
  }, [compensation, compensationError]);

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
    if (locatioData) {
      RouteInfo(locatioData)
        .then((routeInfo) => {
          setRouteData({
            ...routeInfo,
            distance: Number(
              routeInfo?.distance
                ?.replace("km", "")
                .replace(",", "#")
                .replace(".", ",")
                .replace("#", ".")
            ),
          });
        })
        .catch((error) => {
          toast.error("Mesafe alınamadı", { id: "google-error" });
          console.error(error.message);
        });
    }
  }, []);

  const bgColors = [
    "var(--getiryemek)",
    "var(--migrosyemek)",
    "var(--trendyol)",
    "var(--yemeksepeti)",
    "var(--gofody)",
    "var(--siparisim)",
  ];

  const userName = order?.client?.name
    ? order?.client?.name
    : order?.customer?.firstName
    ? order?.customer?.firstName
    : "";

  // console.log(currentCompensation);
  // console.log(restaurantCouriers);

  return (
    <main className="bg-[--white-1] rounded-md overflow-clip">
      <div className="flex justify-between p-3 rounded-t-md relative">
        <span
          className="absolute top-0 left-0 w-full h-full opacity-60 z-10"
          style={{ backgroundColor: bgColors[order.marketplaceId] }}
        ></span>
        <div className="text-sm text-[--white-1] z-20">
          <p>
            <span className="font-bold text-[--black-1]">Müşteri:</span>{" "}
            {userName}{" "}
          </p>
          <p>
            <span className="font-bold text-[--black-1]">Adres: </span>
            <Address order={order} />
          </p>
          {locatioData && (
            <p className="flex">
              <span className="font-bold text-[--black-1] mr-2">Mesafe: </span>
              {routeData ? <span> {routeData.distance} KM</span> : <LoadingI />}
            </p>
          )}
          <p>
            <span className="font-bold text-[--black-1]">Platform:</span>{" "}
            {MarketPalceIds[order.marketplaceId].label}
          </p>
        </div>
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
                    type="button"
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
                <div className="flex gap-2">
                  {restaurantCouriers?.length ? (
                    restaurantCouriers.map((R) => (
                      <button
                        key={R.id}
                        type="button"
                        onClick={() => {
                          setSelectedCourier(R);
                          setCurrentCompensation(formatCompensation(R));
                          setCompensationData(formatCompensation(R));
                          setCompensationRate(R.compensationRate);
                        }}
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
                    Hakediş Şekli
                  </h1>

                  <div className="flex flex-wrap justify-center w-full">
                    <div className="flex flex-wrap gap-1 mr-3 mt-3">
                      {currentCompensation && (
                        <div className="flex">
                          {compensationTypes.map((C) => (
                            <button
                              key={C.id}
                              type="button"
                              onClick={() => setCompensationData(C)}
                              className={`border flex whitespace-nowrap mr-1 items-center px-3 py-2.5 rounded-sm bg-[--light-3] ${
                                C.id == compensationData?.id &&
                                "border-[--green-1] bg-[--status-green] text-[--green-1]"
                              }`}
                            >
                              {currentCompensation.id === C.id && " Mevcut:"}{" "}
                              <span className="ml-2">{C.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      <CustomInput
                        type="number"
                        className="mt-[0] sm:mt-[0] text-[--red-1]"
                        className2="max-w-[64px] mt-[0] sm:mt-[0] justify-end"
                        value={compensationRate}
                        disabled={!compensationData?.value}
                        required={compensationData?.value ? true : false}
                        onChange={(e) => setCompensationRate(e)}
                      />
                      <p className="flex items-center text-[--red-1]">₺</p>
                    </div>

                    <div className="flex flex-col items-center w-full pt-4">
                      <div>
                        {locatioData && (
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
                        )}

                        <p>
                          <span className="font-bold">Tutar: </span>
                          <span className="text-[--red-1]">
                            {compensationData?.id === 1
                              ? formatToPrice(
                                  String(
                                    compensationRate * routeData?.distance
                                  )?.replace(".", ",")
                                )
                              : formatToPrice(
                                  String(compensationRate)?.replace(".", ",")
                                )}
                            {""}₺
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

export default ChooseCourier;

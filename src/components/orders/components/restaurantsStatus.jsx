//MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { usePopup } from "../../../context/PopupContext";
import { useSignalR } from "../../../context/SignalRContext";
import GetirYemekRestaurantStatuses from "../../../enums/getirYemekRestaurantStatuses";

//COMP
import RestaurantsStatusPopup from "./restaurantsStatusPopup";

//IMAGES
import GetirYemek from "../../../assets/img/orders/GetirYemek.png";
import MigrosYemek from "../../../assets/img/orders/MigrosYemek.png";
import TrendyolYemek from "../../../assets/img/orders/TrendyolYemek.png";
import YemekSepeti from "../../../assets/img/orders/YemekSepeti.png";
import GoFody from "../../../assets/img/orders/GoFody.png";
import Siparisim from "../../../assets/img/orders/Siparisim.png";

//REDUX
import { getRestaurantsStatus } from "../../../redux/orders/getRestaurantsStatusSlice";

const MarketPlaceAssets = [
  { src: GetirYemek },
  { src: MigrosYemek },
  { src: TrendyolYemek },
  { src: YemekSepeti },
  { src: GoFody },
  { src: Siparisim },
];

const RestaurantsStatus = () => {
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();
  const { statusChangedRestaurant, setStatusChangedRestaurant } = useSignalR();

  const { restaurantStatuses } = useSelector(
    (state) => state.orders.getRestaurantsStatus
  );
  const [statusesData, setStatusesData] = useState(null);
  const [closedRestaurants, setClosedRestaurants] = useState([]);

  function setRestaurantStatusData(restaurantStatData) {
    function statusValue(inData) {
      return GetirYemekRestaurantStatuses.filter(
        (S) => S.id == inData.status
      )[0]?.value;
    }

    const formattedData = [];
    restaurantStatData.map((res, i) => {
      formattedData.push({
        ...res,
        index: i + 1,
        restaurantStatus: statusValue(res),
        courierStatus: res.isCourierAvailable,
      });
    });
    setStatusesData(formattedData);
    setClosedRestaurants(
      formattedData.filter((R) => R.restaurantStatus === false)
    );
  }

  //GET STATUSES
  useEffect(() => {
    if (!statusesData) {
      dispatch(getRestaurantsStatus());
    }
  }, [statusesData]);

  //SET STATUESE FROM FETCH
  useEffect(() => {
    if (restaurantStatuses) {
      setRestaurantStatusData(restaurantStatuses);
    }
  }, [restaurantStatuses]);

  //SET STATUSES FROM SIGNALR
  useEffect(() => {
    if (statusChangedRestaurant) {
      const uniqueRestaurants = statusesData.filter(
        (R) => R.id !== statusChangedRestaurant.id
      );
      setRestaurantStatusData([statusChangedRestaurant, ...uniqueRestaurants]);
      setStatusChangedRestaurant(null);
    }
  }, [statusChangedRestaurant]);

  const buttonClass =
    "text-white bg-[--red-1] transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.7 animate-pulse relative after:absolute after:inset-0 after:rounded-lg after:border-2 after:border-red-500 after:animate-[emergencyRipple_1s_ease-out_infinite] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-red-600 before:animate-[emergencyRipple_1s_ease-out_infinite] before:delay-500 flex items-center justify-center transition-all duration-[.3] ease-in-out";

  const toolTipClass = `w-max absolute top-14 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 
                   px-4 py-1 rounded-md border border-red-200 shadow-lg
                   transition-all duration-300 transform z-50
                   ${
                     closedRestaurants.length
                       ? "opacity-100 translate-y-0"
                       : "opacity-0 translate-y-2 pointer-events-none"
                   }
                   whitespace-nowrap
                   after:content-[''] after:absolute after:left-1/2 after:-top-2
                   after:w-4 after:h-4 after:bg-red-100 after:rotate-45
                   after:-translate-x-1/2 after:border-t after:border-l after:border-red-200`;

  return (
    <div className="flex items-end relative w-max">
      <div className={toolTipClass}>
        <div
          className="text-sm"
          style={
            closedRestaurants?.length > 3
              ? {
                  overflow: "hidden",
                  height: "4rem",
                  position: "relative",
                }
              : {}
          }
        >
          {closedRestaurants.length && closedRestaurants?.length > 3 ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  animation: "scroll-marquee 3s linear infinite",
                }}
              >
                {[...closedRestaurants, ...closedRestaurants].map(
                  (rest, index) => (
                    <div
                      key={`${rest.id}-${index}`}
                      className={`flex items-center gap-2  ${
                        !(rest.index % 2) && "py-1"
                      }`}
                    >
                      <img
                        alt="pentegrasyon"
                        className="size-6 rounded-full"
                        src={MarketPlaceAssets[rest.marketplaceId].src}
                      />
                      <p>{rest.name} Kapalı</p>
                    </div>
                  )
                )}
              </div>
              <style>
                {`
              @keyframes scroll-marquee {
                0% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(-50%);
                }
              }
            `}
              </style>
            </>
          ) : (
            closedRestaurants.map((rest) => (
              <div
                key={rest.id}
                className={`flex items-center gap-2 ${
                  !(rest.index % 2) && "py-1"
                }`}
              >
                <img
                  alt="pentegrasyon"
                  className="size-6 rounded-full"
                  src={MarketPlaceAssets[rest.marketplaceId].src}
                />{" "}
                <p>{rest.name} Kapalı</p>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => setPopupContent(<RestaurantsStatusPopup />)}
        className={`w-full whitespace-nowrap ${
          !closedRestaurants.length
            ? "border border-[--primary-2] text-[--primary-2] text-sm"
            : buttonClass
        } py-2.5 px-4 rounded-md`}
      >
        Restoran Durumları
      </button>
    </div>
  );
};

export default RestaurantsStatus;

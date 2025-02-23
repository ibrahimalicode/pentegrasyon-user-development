//MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { useSlideBar } from "../../../context/SlideBarContext";
import { useFirestore } from "../../../context/FirestoreContext";
import RestaurantStatuses from "../../../enums/restaurantStatuses";

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
import {
  getRestaurantsStatus,
  resetGetRestaurantsStatus,
} from "../../../redux/orders/getRestaurantsStatusSlice";
import {
  getRestaurantsMap,
  resetGetRestaurantsMap,
} from "../../../redux/restaurants/getRestaurantsMapSlice";

const MarketPlaceAssets = [
  { src: GetirYemek },
  { src: MigrosYemek },
  { src: TrendyolYemek },
  { src: YemekSepeti },
  { src: GoFody },
  { src: Siparisim },
];

const RestaurantsStatus = ({ licenses }) => {
  const dispatch = useDispatch();
  const { setSlideBarContent } = useSlideBar();
  const { statusChangedRestaurant, setStatusChangedRestaurant } =
    useFirestore();

  const { restaurantStatuses } = useSelector(
    (state) => state.orders.getRestaurantsStatus
  );

  const { entities, error: mapError } = useSelector(
    (state) => state.restaurants.getRestaurantsMap
  );
  const [statusesData, setStatusesData] = useState(null);
  const [closedRestaurants, setClosedRestaurants] = useState([]);

  //CHECK OPEN/CLOSE STATUS
  function statusValue(inData) {
    const statCodeArray = RestaurantStatuses[inData.marketplaceId];
    const restautantStatus = inData[statCodeArray[0].key];

    if (inData.marketplaceId == 3) {
      const YSRestaurantStat = inData[statCodeArray[0].key].toLocaleLowerCase();
      return statCodeArray.filter((S) => YSRestaurantStat.includes(S.id))[0]
        ?.value;
    } else {
      return statCodeArray.filter((S) => S.id == restautantStatus)[0]?.value;
    }
  }

  //SET THE DATA
  function setRestaurantStatusData(restaurantStatData) {
    const formattedData = [];
    restaurantStatData.map((res, i) => {
      if (!statusValue(res)) {
        formattedData.push({
          ...res,
          restaurantStatus: false,
          courierStatus: res.isCourierAvailable,
        });
      }
    });
    setStatusesData(restaurantStatData);
    setClosedRestaurants(formattedData);
    dispatch(resetGetRestaurantsStatus());
  }

  //GET RESTAURANT NAMES
  function getRestaurantNames(inRestaurant) {
    const noNameRestaurants = inRestaurant.filter((Restaurant) => {
      if (
        !Restaurant?.name &&
        !Restaurant?.restaurantName &&
        !Restaurant?.storeName &&
        !statusValue(Restaurant)
      ) {
        return Restaurant;
      }
    });
    if (noNameRestaurants.length) {
      setStatusesData(inRestaurant);
      dispatch(getRestaurantsMap(noNameRestaurants));
    } else setRestaurantStatusData(inRestaurant);
  }

  //GET STATUSES
  useEffect(() => {
    if (!statusesData) {
      dispatch(getRestaurantsStatus());
    }
  }, [statusesData]);

  //SET THE STATUSES
  useEffect(() => {
    if (restaurantStatuses) {
      getRestaurantNames(restaurantStatuses);
    }
  }, [restaurantStatuses]);

  //SET THE STATUS FROM THE MAP
  useEffect(() => {
    if (mapError) {
      dispatch(resetGetRestaurantsMap());
    } else if (entities?.length && statusesData) {
      const uniqueRestaurants = statusesData.filter((R) => {
        let notSameId;
        entities.map((e) => {
          notSameId = e.id !== R.id;
        });
        return notSameId;
      });
      setRestaurantStatusData([...uniqueRestaurants, ...entities]);
      dispatch(resetGetRestaurantsMap());
    }
  }, [entities]);

  //SET STATUSES FROM SIGNALR
  useEffect(() => {
    if (statusChangedRestaurant && statusesData) {
      const uniqueRestaurants = statusesData.filter(
        (R) => R.id !== statusChangedRestaurant.id
      );
      getRestaurantNames([statusChangedRestaurant, ...uniqueRestaurants]);
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
                        !((index + 1) % 2) && "py-1"
                      }`}
                    >
                      <img
                        alt="pentegrasyon"
                        className="size-6 rounded-full"
                        src={MarketPlaceAssets[rest.marketplaceId].src}
                      />
                      <p>
                        {rest.name
                          ? rest.name
                          : rest.restaurantName
                          ? rest.restaurantName
                          : rest.storeName}{" "}
                        Kapalı
                      </p>
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
            closedRestaurants.map((rest, i) => (
              <div
                key={rest.id}
                className={`flex items-center gap-2 ${
                  !((i + 1) % 2) && "py-1"
                }`}
              >
                <img
                  alt="pentegrasyon"
                  className="size-6 rounded-full"
                  src={MarketPlaceAssets[rest.marketplaceId].src}
                />{" "}
                <p>
                  {rest.name
                    ? rest.name
                    : rest.restaurantName
                    ? rest.restaurantName
                    : rest.storeName}{" "}
                  Kapalı
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        disabled={!statusesData}
        onClick={() =>
          setSlideBarContent({
            content: (
              <RestaurantsStatusPopup
                licenses={licenses}
                inData={statusesData}
                onSuccess={() => setStatusesData(null)}
              />
            ),
          })
        }
        className={`w-full whitespace-nowrap ${
          !closedRestaurants.length
            ? "border border-[--primary-2] text-[--primary-2] text-sm"
            : buttonClass
        } py-2.5 px-4 rounded-md`}
      >
        Restoran Durumları
      </button>
      <style>
        {`
        @keyframes emergencyRipple {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.15);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }`}
      </style>
    </div>
  );
};

export default RestaurantsStatus;

//MODULES
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { cn } from "../../../lib/utils";
import { WarnI } from "../../../assets/icon";
import { TOOLBAR_BTN } from "../../common/toolbarStyles";
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

const nameOf = (rest) =>
  rest.name || rest.restaurantName || rest.storeName || "Restoran";

// Rendered in the page flow above the orders table rather than floating out
// of the toolbar button. The old tooltip overlapped the first order row, and
// covering live order data to warn about something else is a bad trade.
export const ClosedRestaurantsBanner = ({ closed = [], onOpen }) => {
  if (!closed.length) return null;

  return (
    <div
      role="status"
      className="w-full mb-4 flex items-start gap-3 rounded-lg border border-solid border-[--red-1] bg-[--status-red] px-4 py-3"
    >
      <WarnI className="size-5 shrink-0 mt-0.5 text-[--red-1]" />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[--red-1]">
          {closed.length} restoran kapalı
        </p>

        {/* Chips wrap, so a long list grows the banner instead of needing the
            marquee the cramped tooltip used to rely on. */}
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1.5">
          {closed.map((rest, i) => (
            <span
              key={`${rest.id}-${i}`}
              className="flex items-center gap-1.5 text-xs text-[--black-2]"
            >
              <img
                alt=""
                className="size-4 rounded-full"
                src={MarketPlaceAssets[rest.marketplaceId]?.src}
              />
              {nameOf(rest)}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="shrink-0 self-center rounded-md border border-solid border-[--red-1] px-3 py-1.5 text-xs font-medium text-[--red-1] transition-colors hover:bg-[--red-1] hover:text-[--white-1]"
      >
        Detaylar
      </button>
    </div>
  );
};

const RestaurantsStatus = ({ licenses, onClosedChange }) => {
  const dispatch = useDispatch();
  const { setSlideBarContent } = useSlideBar();
  const { statusChangedRestaurant, setStatusChangedRestaurant } =
    useFirestore();

  const { restaurantStatuses } = useSelector(
    (state) => state.orders.getRestaurantsStatus,
  );

  const { entities, error: mapError } = useSelector(
    (state) => state.restaurants.getRestaurantsMap,
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
        (R) => R.id !== statusChangedRestaurant.id,
      );
      getRestaurantNames([statusChangedRestaurant, ...uniqueRestaurants]);
      setStatusChangedRestaurant(null);
    }
  }, [statusChangedRestaurant]);

  // The banner lives in the page flow above the table, so the panel opener and
  // the closed list are lifted to the page. useCallback keeps the identity
  // stable, so the effect below can't feed a re-render loop.
  const openPanel = useCallback(() => {
    setSlideBarContent({
      content: (
        <RestaurantsStatusPopup
          licenses={licenses}
          inData={statusesData}
          onSuccess={() => setStatusesData(null)}
        />
      ),
    });
  }, [licenses, statusesData, setSlideBarContent]);

  useEffect(() => {
    onClosedChange?.({ closed: closedRestaurants, openPanel });
  }, [closedRestaurants, openPanel]);

  const buttonClass =
    "text-white bg-[--red-1] transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.7 animate-pulse relative after:absolute after:inset-0 after:rounded-lg after:border-2 after:border-red-500 after:animate-[emergencyRipple_1s_ease-out_infinite] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-red-600 before:animate-[emergencyRipple_1s_ease-out_infinite] before:delay-500 flex items-center justify-center transition-all duration-[.3] ease-in-out";


  return (
    <div className="flex items-end relative w-max">
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
        className={cn(
          TOOLBAR_BTN,
          // When restaurants are closed the button becomes an alert. It has to
          // keep its red fill on hover — TOOLBAR_BTN's neutral hover:bg turned
          // the alert into a pale grey chip, which read as disabled.
          closedRestaurants.length &&
            "border-transparent hover:border-transparent hover:text-white hover:bg-[--red-1] hover:brightness-110 " +
              buttonClass
        )}
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

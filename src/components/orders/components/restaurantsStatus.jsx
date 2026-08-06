//MODULES
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { cn } from "../../../lib/utils";
import { checkLeng } from "../../../utils/utils";
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
    // One line: the count, the names and the action share a row and only wrap
    // when they genuinely run out of width, so the alert costs the table a
    // single row of height instead of three.
    <div
      role="status"
      className="w-full mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border border-solid border-[--red-1] bg-[--status-red] px-3 py-2"
    >
      <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[--red-1]">
        <WarnI className="size-4 shrink-0" />
        {closed.length} restoran kapalı
      </span>

      {/* Below sm the names drop to their own line (order-last), because
          sharing the row with the count and the button squeezed them into a
          ~100px column that broke every name one word per line. */}
      <div className="order-last flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 sm:order-none sm:w-auto sm:flex-1">
        {closed.map((rest, i) => (
          <span
            key={`${rest.id}-${i}`}
            // Full name in the title so truncation never hides which
            // restaurant is down.
            title={nameOf(rest)}
            className="flex items-center gap-1.5 text-xs text-[--black-2]"
          >
            <img
              alt=""
              className="size-4 shrink-0 rounded-full"
              src={MarketPlaceAssets[rest.marketplaceId]?.src}
            />
            {checkLeng(nameOf(rest))}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="ml-auto shrink-0 rounded-md border border-solid border-[--red-1] px-2.5 py-1 text-xs font-medium text-[--red-1] transition-colors hover:bg-[--red-1] hover:text-[--white-1]"
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

  // Alert styling for the button when restaurants are closed. Two dropped
  // classes used to live here: `shadow-[0_0_20px_rgba(220,38,38,0.7` (missing
  // its closing paren+bracket) and `duration-[.3]` (no unit) — both were
  // silently discarded by Tailwind, so the intended red glow never rendered.
  const buttonClass =
    "text-white bg-[--red-1] transition-colors duration-300 animate-[alertPulse_1.6s_ease-in-out_infinite] relative after:absolute after:inset-0 after:rounded-lg after:border-2 after:border-red-500 after:animate-[emergencyRipple_1s_ease-out_infinite] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-red-600 before:animate-[emergencyRipple_1s_ease-out_infinite] before:delay-500 flex items-center justify-center";


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
        /* Not Tailwind's animate-pulse: that bottoms out at opacity .5, which
           on a solid red button reads as disabled. The original intent here
           was a gentle throb, so this keeps it well above that. */
        @keyframes alertPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }

        /* Expands by a fixed 5px rather than transform: scale(1.15). Scale is
           proportional to the button's width, so the halo grew with the label
           and painted ~13px past the button into the search field and the
           toggle beside it. A fixed inset keeps the overshoot inside the
           toolbar's gap no matter how long the text gets. */
        @keyframes emergencyRipple {
          0% {
            inset: 0;
            opacity: 0.7;
          }
          70% {
            inset: -5px;
            opacity: 0;
          }
          100% {
            inset: -5px;
            opacity: 0;
          }
        }`}
      </style>
    </div>
  );
};

export default RestaurantsStatus;

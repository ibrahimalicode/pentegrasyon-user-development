//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { getRemainingDays } from "../../../utils/utils";
import RestaurantStatuses from "../../../enums/restaurantStatuses";

//COMP
import RestaurantStatusToggle, {
  staleNote,
} from "../components/restaurantStatusToggle";
import { StatusCard, StatusRow } from "../components/statusCard";

//REDUX
import {
  migrosYemekUpdateRestaurantStatus,
  resetMigrosYemekUpdateRestaurantStatus,
} from "../../../redux/migrosYemek/migrosYemekUpdateRestaurantStatusSlice";

const MigrosYemekRestaurantsStatus = ({ statRest, licenses, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);

  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.migrosYemek.updateRestaurants);

  function isActive(key) {
    return licenses.filter(
      (L) => L.restaurantId == statusData[key].restaurantId,
    )[0]?.isActive;
  }

  function remainingDays(restaurantId) {
    const endDate = licenses.filter((L) => L.restaurantId == restaurantId)[0]
      ?.endDateTime;
    const remainingDays = getRemainingDays(endDate);
    return remainingDays;
  }

  function updateRestaurantStatus(id) {
    // Stale availability: the marketplace mapping is not responding,
    // so the update would fail. The toggle is disabled too.
    if (statusData[id]?.isAvailabilityStale) return;

    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        restaurantStatus: !statusData[id].restaurantStatus,
      },
    };
    dispatch(migrosYemekUpdateRestaurantStatus({ ...updatedStat[id] })).then(
      (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.dismiss(toastId.current);
          const text =
            updatedStat[id].restaurantStatus === true ? "Açıldı" : "Kapandı";
          const className =
            updatedStat[id].restaurantStatus === true
              ? "text-[--green-1]"
              : "text-[--red-1]";
          const comp = (
            <div>
              {updatedStat[id].storeName}
              <span className={className}> {text}</span>
            </div>
          );
          toast.success(comp, { id: "success" });
          setStatusData(updatedStat);
          dispatch(resetMigrosYemekUpdateRestaurantStatus());
        }
      },
    );
  }

  //TOAST AND SET RESTAURANT STATUS
  useEffect(() => {
    function statusValue(inData) {
      return RestaurantStatuses[inData.marketplaceId].filter(
        (S) => S.id == inData.active,
      )[0]?.value;
    }
    if (statRest) {
      const seenIds = new Set();

      const formattedData = [];
      statRest.map((res) => {
        const isDuplicate = seenIds.has(res.marketplaceRestaurantId);
        seenIds.add(res.marketplaceRestaurantId);

        formattedData[res.id] = {
          ...res,
          restaurantStatus: statusValue(res),
          courierStatus: res.isCourierAvailable,
          isDuplicate,
        };
      });
      setStatusData(formattedData);
    }
  }, [statRest]);

  //RESTAURANT UPDATE TOAST
  useEffect(() => {
    if (updateRestaurantLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (updateRestaurantError) {
      toast.dismiss(toastId.current);
      dispatch(resetMigrosYemekUpdateRestaurantStatus());
    }
  }, [updateRestaurantLoading, updateRestaurantError]);

  return (
    statusData &&
    Object.keys(statusData).length > 0 && (
      <StatusCard brandVar="--migrosyemek" title="Migros Yemek">
        {Object.keys(statusData).map((key, i) => {
          const restaurant = statusData[key];
          return (
            <StatusRow
              key={i}
              name={restaurant.storeName}
              remainingDays={remainingDays(restaurant.restaurantId)}
              controls={
                <>
                  <RestaurantStatusToggle
                    label="Restoran Durumu"
                    onChange={() => updateRestaurantStatus(key)}
                    checked={statusData[key].restaurantStatus}
                    disabled={updateRestaurantLoading || !isActive(key)}
                    stale={restaurant.isAvailabilityStale}
                    note={staleNote(restaurant)}
                  />
                  {/* Kurye Durumu toggle removed — the backend endpoint
                      MigrosYemek/UpdateRestaurantCourierStatus does not
                      exist (only GetirYemek has one); it always 404'd. */}
                </>
              }
            />
          );
        })}
      </StatusCard>
    )
  );
};

export default MigrosYemekRestaurantsStatus;

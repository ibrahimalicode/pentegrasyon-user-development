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
import DeleteIntegrationInfo from "../components/deleteIntegrationInfo";

//REDUX
import {
  trendyolYemekUpdateRestaurantStatus,
  resetTrendyolYemekUpdateRestaurantStatus,
} from "../../../redux/trendyol/trendyolYemekUpdateRestaurantStatusSlice";

const TrendyolYemekRestaurantsStatus = ({ statRest, licenses, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);

  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.trendyol.updateRestaurants);

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

  //UPDATE RESTAURANT STATUS
  function updateRestaurantStatus(id) {
    // Stale availability: the marketplace mapping is not responding,
    // so the update would fail. The toggle is disabled too.
    if (statusData[id]?.isAvailabilityStale) return;

    if (!statusData[id].changeable) {
      toast.error(
        `Trendyol Yemek restoran durumu değiştirilemez. ${
          statusData[id].closedReason
            ? `Kapanma sebebi ${statusData[id].closedReason}`
            : ""
        }`,
        { id: 1 },
      );
      return;
    }
    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        restaurantStatus: !statusData[id].restaurantStatus,
      },
    };

    dispatch(trendyolYemekUpdateRestaurantStatus(updatedStat[id])).then(
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
              {updatedStat[id].name}
              <span className={className}> {text}</span>
            </div>
          );
          setStatusData(updatedStat);
          toast.success(comp, { id: "success" });
          dispatch(resetTrendyolYemekUpdateRestaurantStatus());
        }
      },
    );
  }

  //TOAST RESTAURANT STATUS AND GET RESTAURANTS NAME
  useEffect(() => {
    function statusValue(inData) {
      return RestaurantStatuses[inData.marketplaceId].filter((S) =>
        inData.workingStatus
          ?.toLocaleLowerCase()
          .includes(S.id.toLocaleLowerCase()),
      )[0]?.value;
    }

    if (statRest) {
      const uniqueStatRest = statRest.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.id === item.id),
      );

      const formattedData = [];
      const seenIds = new Set();

      uniqueStatRest.map((res) => {
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
      // dispatch(getRestaurantsMap(statRest));
    }
  }, [statRest]);

  //RESTAURANT UPDATE TOAST
  useEffect(() => {
    if (updateRestaurantLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (updateRestaurantError) {
      toast.dismiss(toastId.current);
      if (updateRestaurantError?.data) {
        try {
          toast.dismiss();
          const msg = JSON.parse(updateRestaurantError.data);
          toast.error(msg?.message);
        } catch (err) {
          //Pass
        }
      }
      dispatch(resetTrendyolYemekUpdateRestaurantStatus());
    }
  }, [updateRestaurantLoading, updateRestaurantError]);

  return (
    statusData &&
    Object.keys(statusData).length > 0 && (
      <main className="border-2 border-[--trendyol] rounded-md mx-2">
        <div className="w-full text-center py-3 bg-[--trendyol] text-white">
          Trendyol Yemek
        </div>

        <div className="w-full text-sm">
          <div className="flex flex-col gap-2">
            {statusData &&
              Object.keys(statusData).map((key, i) => {
                const restaurant = statusData[key];
                return (
                  <main key={i}>
                    <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start px-3">
                      <p className="text-start max-sm:text-base max-sm:py-2 min-w-56">
                        {restaurant.name}
                      </p>
                      <div className="w-full flex justify-between">
                        <div className="flex gap-4">
                          <div className="max-w-40 text-center">
                            <RestaurantStatusToggle
                              label="Restoran Durumu"
                              onChange={() => updateRestaurantStatus(key)}
                              checked={statusData[key].restaurantStatus}
                              disabled={updateRestaurantLoading || !isActive(key)}
                              stale={restaurant.isAvailabilityStale}
                              note={staleNote(restaurant)}
                            />
                          </div>
                        </div>

                        <DeleteIntegrationInfo
                          restaurant={restaurant}
                          onSuccess={onSuccess}
                        />
                      </div>
                    </div>

                    <>
                      {(() => {
                        const remaining = remainingDays(
                          restaurant.restaurantId,
                        );
                        return (
                          Number.isFinite(remaining) && (
                            <div
                              className={`w-full flex items-center justify-center mt-2 ${remaining < 15 ? "bg-[--status-red] text-[--red-1]" : "bg-[--trendyol] text-white"}`}
                            >
                              <p>
                                {remaining > 0
                                  ? `Lisansın bitimine ${remaining} gün kaldı`
                                  : "Lisans süresi doldu"}
                              </p>
                            </div>
                          )
                        );
                      })()}
                    </>
                  </main>
                );
              })}
          </div>
        </div>
      </main>
    )
  );
};

export default TrendyolYemekRestaurantsStatus;

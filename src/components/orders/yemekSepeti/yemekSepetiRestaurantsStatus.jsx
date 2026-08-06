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
import { StatusCard, StatusRow } from "../components/statusCard";

//REDUX
import {
  yemekSepetiUpdateRestaurantStatus,
  resetYemekSepetiUpdateRestaurantStatus,
} from "../../../redux/yemekSepeti/yemekSepetiUpdateRestaurantStatusSlice";

const YemekSepetiRestaurantsStatus = ({ statRest, licenses, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);

  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.yemekSepeti.updateRestaurants);

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
        `Yemeksepeti restoran durumu değiştirilemez. ${
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

    dispatch(yemekSepetiUpdateRestaurantStatus(updatedStat[id])).then((res) => {
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
        dispatch(resetYemekSepetiUpdateRestaurantStatus());
      }
    });
  }

  //TOAST RESTAURANT STATUS AND GET RESTAURANTS NAME
  useEffect(() => {
    function statusValue(inData) {
      return RestaurantStatuses[inData.marketplaceId].filter((S) =>
        inData.availabilityState
          .toLocaleLowerCase()
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

  //SET RESTAURANT STATUS FROM MAP
  // useEffect(() => {
  //   function statusValue(inData) {
  //     return RestaurantStatuses[inData.marketplaceId].filter((S) =>
  //       inData.availabilityState
  //         .toLocaleLowerCase()
  //         .includes(S.id.toLocaleLowerCase())
  //     )[0]?.value;
  //   }

  //   if (mapError) {
  //     dispatch(resetGetRestaurantsMap());
  //   } else if (entities) {
  //     const formattedData = [];
  //     entities.map((res) => {
  //       formattedData[res.restaurantId] = {
  //         ...res,
  //         id: res.restaurantId,
  //         restaurantStatus: statusValue(res),
  //         courierStatus: res.isCourierAvailable,
  //       };
  //     });
  //     setStatusData(formattedData);
  //     dispatch(resetGetRestaurantsMap());
  //   }
  // }, [entities]);

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
      dispatch(resetYemekSepetiUpdateRestaurantStatus());
    }
  }, [updateRestaurantLoading, updateRestaurantError]);

  return (
    statusData &&
    Object.keys(statusData).length > 0 && (
      <StatusCard
        brandVar="--yemeksepeti"
        title="Yemeksepeti"
        notice={
          <p className="px-3 py-2 text-xs text-[--red-1] bg-[--status-red] border-b border-[--border-1]">
            YemekSepeti Restoran Aç/Kapat işlemleri canlı ortamda 30sn ile 5dk
            arasında yansımaktadır.
          </p>
        }
      >
        {Object.keys(statusData).map((key, i) => {
          const restaurant = statusData[key];
          return (
            <StatusRow
              key={i}
              name={restaurant.name}
              remainingDays={remainingDays(restaurant.restaurantId)}
              controls={
                <RestaurantStatusToggle
                  label="Restoran Durumu"
                  onChange={() => updateRestaurantStatus(key)}
                  checked={statusData[key].restaurantStatus}
                  disabled={updateRestaurantLoading || !isActive(key)}
                  stale={restaurant.isAvailabilityStale}
                  note={staleNote(restaurant)}
                />
              }
              action={
                <DeleteIntegrationInfo
                  restaurant={restaurant}
                  onSuccess={onSuccess}
                />
              }
            />
          );
        })}
      </StatusCard>
    )
  );
};

export default YemekSepetiRestaurantsStatus;

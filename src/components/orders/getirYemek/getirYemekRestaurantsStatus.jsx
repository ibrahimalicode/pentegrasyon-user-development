//MODELS
import toast from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import RestaurantStatuses from "../../../enums/restaurantStatuses";

//COMP
import RestaurantStatusToggle, {
  staleNote,
} from "../components/restaurantStatusToggle";
import { StatusCard, StatusRow } from "../components/statusCard";

//REDUX
import {
  getirYemekUpdateRestaurantStatus,
  resetGetirYemekUpdateRestaurantStatus,
} from "../../../redux/getirYemek/getirYemekUpdateRestaurantStatusSlice";
import {
  getirYemekUpdateRestaurantCourierStatus,
  resetGetirYemekUpdateRestaurantCourierStatus,
} from "../../../redux/getirYemek/getirYemekUpdateRestaurantCourierStatusSlice";
import { getRemainingDays } from "../../../utils/utils";

const GetirYemekRestaurantsStatus = ({ statRest, licenses, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);

  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.getirYemek.updateRestaurants);

  const { loading: updateCourierLoading, error: updateCourierError } =
    useSelector((state) => state.getirYemek.updateRestaurantsCourier);

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

    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        restaurantStatus: !statusData[id].restaurantStatus,
      },
    };
    dispatch(getirYemekUpdateRestaurantStatus({ ...updatedStat[id] })).then(
      (res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
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
          toast.success(comp, { id: "success" });
          setStatusData(updatedStat);
          dispatch(resetGetirYemekUpdateRestaurantStatus());
        }
      },
    );
  }

  //UPDATE COURIER STATUS
  function updateRestaurantCourierStatus(id) {
    // Stale availability: the marketplace mapping is not responding,
    // so the update would fail. The toggle is disabled too.
    if (statusData[id]?.isAvailabilityStale) return;

    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        courierStatus: !statusData[id].courierStatus,
      },
    };

    dispatch(
      getirYemekUpdateRestaurantCourierStatus({ ...updatedStat[id] }),
    ).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        toast.dismiss(toastId.current);
        const text =
          updatedStat[id].courierStatus === true ? "Açıldı" : "Kapandı";
        const className =
          updatedStat[id].courierStatus === true
            ? "text-[--green-1]"
            : "text-[--red-1]";
        const comp = (
          <div>
            {updatedStat[id].name} Kuriye durumu
            <span className={className}> {text}</span>
          </div>
        );
        toast.success(comp, { id: "success" });
        setStatusData(updatedStat);
        dispatch(resetGetirYemekUpdateRestaurantCourierStatus());
      }
    });
  }

  //TOAST AND SET RESTAURANT STATUS
  useEffect(() => {
    function statusValue(inData) {
      return RestaurantStatuses[inData.marketplaceId].filter(
        (S) => S.id == inData.status,
      )[0]?.value;
    }

    if (statRest) {
      const formattedData = [];
      const seenIds = new Set();

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
      dispatch(resetGetirYemekUpdateRestaurantStatus());
    }
  }, [updateRestaurantLoading, updateRestaurantError]);

  //COURIER UPDATE TOAST
  useEffect(() => {
    if (updateCourierLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (updateCourierError) {
      toast.dismiss(toastId.current);
      dispatch(resetGetirYemekUpdateRestaurantCourierStatus());
    }
  }, [updateCourierLoading, updateCourierError]);

  return (
    statusData &&
    Object.keys(statusData).length > 0 && (
      <StatusCard brandVar="--getiryemek" title="Getir Yemek">
        {Object.keys(statusData).map((key, i) => {
          const restaurant = statusData[key];
          return (
            <StatusRow
              key={i}
              name={restaurant.name}
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
                  {statusData[key].restaurantStatus && (
                    <RestaurantStatusToggle
                      label="Kurye Durumu"
                      onChange={() => updateRestaurantCourierStatus(key)}
                      checked={restaurant.courierStatus}
                      disabled={updateCourierLoading || !isActive(key)}
                      stale={restaurant.isAvailabilityStale}
                      note={staleNote(restaurant)}
                    />
                  )}
                </>
              }
            />
          );
        })}
      </StatusCard>
    )
  );
};

export default GetirYemekRestaurantsStatus;

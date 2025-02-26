//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import RestaurantStatuses from "../../../enums/restaurantStatuses";

//COMP
import CustomToggle from "../../common/customToggle";
import DeleteIntegrationInfo from "../components/deleteIntegrationInfo";

//REDUX
import {
  yemekSepetiUpdateRestaurantStatus,
  resetYemekSepetiUpdateRestaurantStatus,
} from "../../../redux/yemekSepeti/yemekSepetiUpdateRestaurantStatusSlice";
import {
  yemekSepetiUpdateRestaurantCourierStatus,
  resetYemekSepetiUpdateRestaurantCourierStatus,
} from "../../../redux/yemekSepeti/yemekSepetiUpdateRestaurantCourierStatusSlice";

const YemekSepetiRestaurantsStatus = ({ statRest, licenses, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);

  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.yemekSepeti.updateRestaurants);

  const { loading: updateCourierLoading, error: updateCourierError } =
    useSelector((state) => state.yemekSepeti.updateRestaurantsCourier);

  function isActive(key) {
    return licenses.filter(
      (L) => L.restaurantId == statusData[key].restaurantId
    )[0]?.isActive;
  }

  //UPDATE RESTAURANT STATUS
  function updateRestaurantStatus(id) {
    if (!statusData[id].changeable) {
      toast.error(
        `Yemeksepeti restoran durumu değiştirilemez. ${
          statusData[id].closedReason
            ? `Kapanma sebebi ${statusData[id].closedReason}`
            : ""
        }`,
        { id: 1 }
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

  //UPDATE COURIER STATUS
  function updateRestaurantCourierStatus(id) {
    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        isCourierAvailable: !statusData[id].isCourierAvailable,
      },
    };
    dispatch(yemekSepetiUpdateRestaurantCourierStatus(updatedStat[id])).then(
      (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.dismiss(toastId.current);
          const text =
            updatedStat[id].isCourierAvailable === true ? "Açıldı" : "Kapandı";
          const className =
            updatedStat[id].isCourierAvailable === true
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
          dispatch(resetYemekSepetiUpdateRestaurantCourierStatus());
        }
      }
    );
  }

  //TOAST RESTAURANT STATUS AND GET RESTAURANTS NAME
  useEffect(() => {
    function statusValue(inData) {
      return RestaurantStatuses[inData.marketplaceId].filter((S) =>
        inData.availabilityState
          .toLocaleLowerCase()
          .includes(S.id.toLocaleLowerCase())
      )[0]?.value;
    }

    if (statRest) {
      const uniqueStatRest = statRest.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
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

  //COURIER UPDATE TOAST
  useEffect(() => {
    if (updateCourierLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (updateCourierError) {
      toast.dismiss(toastId.current);
      dispatch(resetYemekSepetiUpdateRestaurantCourierStatus());
    }
  }, [updateCourierLoading, updateCourierError]);

  return (
    statusData &&
    Object.keys(statusData).length > 0 && (
      <main className="border-2 border-[--yemeksepeti] rounded-md mx-2">
        <div className="w-full text-center py-3 bg-[--yemeksepeti] text-[--white-1]">
          Yemeksepeti
        </div>

        <div className="w-full px-3 text-sm">
          <h1 className="mt-1 py-1 px-4 text-[--red-1] bg-[--light-1] w-full rounded-full">
            YemekSepeti Restoran Aç/Kapat işlemleri canlı ortamda 30sn ile 5dk
            arasında yansımaktadır.
          </h1>

          <div className="flex flex-col gap-2">
            {statusData &&
              Object.keys(statusData).map((key, i) => {
                const restaurant = statusData[key];
                return (
                  <div
                    key={i}
                    className="flex justify-between items-center max-sm:flex-col max-sm:items-start"
                  >
                    <p className="text-start max-sm:text-base max-sm:py-2 min-w-56">
                      {restaurant.name}
                    </p>
                    <div className="w-full flex justify-between">
                      <div className="flex gap-4">
                        <div className="max-w-40 text-center">
                          <CustomToggle
                            label="Restoran Durumu"
                            className="scale-75 order-2"
                            className1="flex-col max-sm:items-start"
                            className2="order-1 ml-[0]"
                            onChange={() => updateRestaurantStatus(key)}
                            checked={statusData[key].restaurantStatus}
                            disabled={updateRestaurantLoading || !isActive(key)}
                          />
                        </div>
                      </div>
                      <DeleteIntegrationInfo
                        restaurant={restaurant}
                        onSuccess={onSuccess}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    )
  );
};

export default YemekSepetiRestaurantsStatus;

//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import CustomToggle from "../../common/customToggle";
import RestaurantStatuses from "../../../enums/restaurantStatuses";
import DeleteIntegrationInfo from "../components/deleteIntegrationInfo";

//REDUX
import {
  migrosYemekUpdateRestaurantStatus,
  resetMigrosYemekUpdateRestaurantStatus,
} from "../../../redux/migrosYemek/migrosYemekUpdateRestaurantStatusSlice";
import {
  migrosYemekUpdateRestaurantCourierStatus,
  resetMigrosYemekUpdateRestaurantCourierStatus,
} from "../../../redux/migrosYemek/migrosYemekUpdateRestaurantCourierStatusSlice";

const MigrosYemekRestaurantsStatus = ({ statRest, licenses, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);

  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.migrosYemek.updateRestaurants);

  const { loading: updateCourierLoading, error: updateCourierError } =
    useSelector((state) => state.migrosYemek.updateRestaurantsCourier);

  function isActive(key) {
    return licenses.filter(
      (L) => L.restaurantId == statusData[key].restaurantId
    )[0].isActive;
  }

  function updateRestaurantStatus(id) {
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
      }
    );
  }

  function updateRestaurantCourierStatus(id) {
    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        isCourierAvailable: !statusData[id].isCourierAvailable,
      },
    };
    dispatch(
      migrosYemekUpdateRestaurantCourierStatus({ ...updatedStat[id] })
    ).then((res) => {
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
            {updatedStat[id].storeName} Kuriye durumu
            <span className={className}> {text}</span>
          </div>
        );
        toast.success(comp, { id: "success" });
        setStatusData(updatedStat);
        dispatch(resetMigrosYemekUpdateRestaurantCourierStatus());
      }
    });
  }

  //TOAST AND SET RESTAURANT STATUS
  useEffect(() => {
    function statusValue(inData) {
      return RestaurantStatuses[inData.marketplaceId].filter(
        (S) => S.id == inData.active
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

  //COURIER UPDATE TOAST
  useEffect(() => {
    if (updateCourierLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (updateCourierError) {
      toast.dismiss(toastId.current);
      dispatch(resetMigrosYemekUpdateRestaurantCourierStatus());
    }
  }, [updateCourierLoading, updateCourierError]);

  return (
    statusData &&
    Object.keys(statusData).length > 0 && (
      <main className="border-2 border-[--migrosyemek] rounded-md mx-2">
        <div className="w-full text-center py-3 bg-[--migrosyemek] text-[--white-1]">
          Migros Yemek
        </div>
        <div className="w-full px-3 text-sm">
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
                      {restaurant.storeName}
                    </p>
                    <div className="w-full flex justify-between">
                      <div className="flex gap-4 whitespace-nowrap">
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
                        {statusData[key].restaurantStatus && (
                          <div className="max-w-40 text-end pr-2">
                            <CustomToggle
                              label="Kurye Durumu"
                              className="scale-75 order-2"
                              className1="flex-col max-sm:items-start"
                              className2="order-1 ml-[0]"
                              onChange={() =>
                                updateRestaurantCourierStatus(key)
                              }
                              checked={restaurant.courierStatus}
                              disabled={
                                updateCourierLoading || !licenses?.isActive
                              }
                            />
                          </div>
                        )}
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

export default MigrosYemekRestaurantsStatus;

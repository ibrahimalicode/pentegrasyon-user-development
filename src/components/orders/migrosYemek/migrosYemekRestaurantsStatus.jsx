//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import CustomToggle from "../../common/customToggle";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import RestaurantStatuses from "../../../enums/restaurantStatuses";

//REDUX
import {
  migrosYemekGetRestaurants,
  resetMigrosYemekGetRestaurants,
} from "../../../redux/migrosYemek/migrosYemekGetRestaurantsSlice";
import {
  migrosYemekUpdateRestaurantStatus,
  resetMigrosYemekUpdateRestaurantStatus,
} from "../../../redux/migrosYemek/migrosYemekUpdateRestaurantStatusSlice";
import {
  migrosYemekUpdateRestaurantCourierStatus,
  resetMigrosYemekUpdateRestaurantCourierStatus,
} from "../../../redux/migrosYemek/migrosYemekUpdateRestaurantCourierStatusSlice";

const MigrosYemekRestaurantsStatus = () => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);
  const { loading, success, data, error } = useSelector(
    (state) => state.migrosYemek.getRestaurants
  );
  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.migrosYemek.updateRestaurants);

  const { loading: updateCourierLoading, error: updateCourierError } =
    useSelector((state) => state.migrosYemek.updateRestaurantsCourier);

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

  //GET RESTAURANT STATUS
  useEffect(() => {
    if (!statusData) {
      dispatch(migrosYemekGetRestaurants());
    }
  }, [statusData]);

  //TOAST AND SET RESTAURANT STATUS
  useEffect(() => {
    function statusValue(inData) {
      return RestaurantStatuses[inData.marketplaceId].filter(
        (S) => S.id == inData.active
      )[0]?.value;
    }
    if (error) {
      dispatch(resetMigrosYemekGetRestaurants());
    }
    if (success) {
      const formattedData = [];
      data.map((res) => {
        formattedData[res.id] = {
          ...res,
          restaurantStatus: statusValue(res),
          courierStatus: res.isCourierAvailable,
        };
      });
      setStatusData(formattedData);
      dispatch(resetMigrosYemekGetRestaurants());
    }
  }, [error, success]);

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
    <main>
      <div className="w-full text-center py-3 bg-[--migrosyemek] text-[--white-1] border-y border-[--migrosyemek-1]">
        Migros Yemek
      </div>
      <div className="w-full px-3 text-sm">
        <table className="w-full mt-2">
          <thead>
            <tr>
              <th className="font-medium pb-3 text-start">İşletme</th>
              <th className="font-medium pb-3 text-center">Restoran Durumu</th>
              <th className="font-medium pb-3 text-end">Kurye Durumu</th>
            </tr>
          </thead>

          <tbody>
            {statusData &&
              Object.keys(statusData).map((key, i) => {
                const restaurant = statusData[key];
                return (
                  <tr key={i}>
                    <td className="text-start">{restaurant.storeName}</td>
                    <td className="text-center">
                      <CustomToggle
                        className="scale-75"
                        className1={`${
                          updateRestaurantLoading && "cursor-not-allowed"
                        }`}
                        onChange={() => updateRestaurantStatus(key)}
                        checked={statusData[key].restaurantStatus}
                        disabled={updateRestaurantLoading}
                      />
                    </td>
                    <td className="text-end pr-6">
                      <CustomToggle
                        className="scale-75"
                        className1={`${
                          updateCourierLoading && "cursor-not-allowed"
                        }`}
                        onChange={() => updateRestaurantCourierStatus(key)}
                        checked={restaurant.isCourierAvailable}
                        disabled={updateCourierLoading}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default MigrosYemekRestaurantsStatus;

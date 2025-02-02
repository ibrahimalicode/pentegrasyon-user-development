//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomToggle from "../../common/customToggle";

//UTILS
import RestaurantStatuses from "../../../enums/restaurantStatuses";

//REDUX
import {
  yemekSepetiGetRestaurants,
  resetYemekSepetiGetRestaurants,
} from "../../../redux/yemekSepeti/yemekSepetiGetRestaurantsSlice";
import {
  yemekSepetiUpdateRestaurantStatus,
  resetYemekSepetiUpdateRestaurantStatus,
} from "../../../redux/yemekSepeti/yemekSepetiUpdateRestaurantStatusSlice";
import {
  yemekSepetiUpdateRestaurantCourierStatus,
  resetYemekSepetiUpdateRestaurantCourierStatus,
} from "../../../redux/yemekSepeti/yemekSepetiUpdateRestaurantCourierStatusSlice";
import {
  getRestaurantsMap,
  resetGetRestaurantsMap,
} from "../../../redux/restaurants/getRestaurantsMapSlice";

const YemekSepetiRestaurantsStatus = () => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);

  const { success, data, error } = useSelector(
    (state) => state.yemekSepeti.getRestaurants
  );

  const { entities, error: mapError } = useSelector(
    (state) => state.restaurants.getRestaurantsMap
  );

  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.yemekSepeti.updateRestaurants);

  const { loading: updateCourierLoading, error: updateCourierError } =
    useSelector((state) => state.yemekSepeti.updateRestaurantsCourier);

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

  //GET RESTAURANT STATUS
  useEffect(() => {
    if (!statusData) {
      dispatch(yemekSepetiGetRestaurants());
    }
  }, [statusData]);

  //TOAST RESTAURANT STATUS AND GET RESTAURANTS NAME
  useEffect(() => {
    if (error) {
      dispatch(resetYemekSepetiGetRestaurants());
    } else if (success) {
      dispatch(getRestaurantsMap(data));
      dispatch(resetYemekSepetiGetRestaurants());
    }
  }, [error, success]);

  //SET RESTAURANT STATUS FROM MAP
  useEffect(() => {
    function statusValue(inData) {
      return RestaurantStatuses[inData.marketplaceId].filter((S) =>
        inData.availabilityState
          .toLocaleLowerCase()
          .includes(S.id.toLocaleLowerCase())
      )[0]?.value;
    }

    if (mapError) {
      dispatch(resetGetRestaurantsMap());
    } else if (entities) {
      const formattedData = [];
      entities.map((res) => {
        formattedData[res.restaurantId] = {
          ...res,
          id: res.restaurantId,
          restaurantStatus: statusValue(res),
          courierStatus: res.isCourierAvailable,
        };
      });
      setStatusData(formattedData);
      dispatch(resetGetRestaurantsMap());
    }
  }, [entities]);

  //RESTAURANT UPDATE TOAST
  useEffect(() => {
    if (updateRestaurantLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (updateRestaurantError) {
      toast.dismiss(toastId.current);
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
      <main>
        <div className="w-full text-center py-3 bg-[--yemeksepeti] text-[--white-1]">
          Yemeksepeti
        </div>

        <div className="w-full px-3 text-sm">
          <h1 className="pt-2 text-[--red-1]">
            YemekSepeti Restoran Aç/Kapat işlemleri canlı ortamda 30sn ile 5dk
            arasında yansımaktadır.
          </h1>
          <table className="w-full mt-2">
            <thead>
              <tr>
                <th className="font-medium pb-3 text-start">İşletme</th>
                <th className="font-medium pb-3 w-44 text-center">
                  Restoran Durumu
                </th>
                <th className="font-medium pb-3 w-44 text-end">Kurye Durumu</th>
              </tr>
            </thead>

            <tbody>
              {statusData &&
                Object.keys(statusData).map((key, i) => {
                  const restaurant = statusData[key];
                  return (
                    <tr key={i}>
                      <td className="text-start">
                        {restaurant.restaurantName}
                      </td>
                      <td className="w-44 text-center">
                        <CustomToggle
                          className="scale-75"
                          className1={`${
                            updateRestaurantLoading && "cursor-not-allowed"
                          }`}
                          onChange={() => updateRestaurantStatus(key)}
                          checked={statusData[key].restaurantStatus}
                          disabled={updateRestaurantLoading}
                        />
                        {!statusData[key].restaurantStatus &&
                          statusData[key].closedReason && (
                            <p className="w-full bg-[--white-1] text-[--red-1] text-left">
                              Sebep: {statusData[key].closedReason}
                            </p>
                          )}
                      </td>
                      <td className="w-44 text-end pr-6">
                        {/* <CustomToggle
                        className="scale-75"
                        className1={`${
                          updateCourierLoading && "cursor-not-allowed"
                        }`}
                        onChange={() => updateRestaurantCourierStatus(key)}
                        checked={restaurant.isCourierAvailable}
                        disabled={updateCourierLoading}
                      /> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    )
  );
};

export default YemekSepetiRestaurantsStatus;

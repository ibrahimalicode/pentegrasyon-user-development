//MODELS
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomToggle from "../../common/customToggle";

//UTILS
import RestaurantStatuses from "../../../enums/restaurantStatuses";

//REDUX
import {
  getirYemekUpdateRestaurantStatus,
  resetGetirYemekUpdateRestaurantStatus,
} from "../../../redux/getirYemek/getirYemekUpdateRestaurantStatusSlice";
import {
  getirYemekUpdateRestaurantCourierStatus,
  resetgetirYemekUpdateRestaurantCourierStatus,
} from "../../../redux/getirYemek/getirYemekUpdateRestaurantCourierStatusSlice";

const GetirYemekRestaurantsStatus = ({ statRest }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);

  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.getirYemek.updateRestaurants);

  const { loading: updateCourierLoading, error: updateCourierError } =
    useSelector((state) => state.getirYemek.updateRestaurantsCourier);

  //UPDATE RESTAURANT STATUS
  function updateRestaurantStatus(id) {
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
      }
    );
  }

  //UPDATE COURIER STATUS
  function updateRestaurantCourierStatus(id) {
    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        courierStatus: !statusData[id].courierStatus,
      },
    };

    dispatch(
      getirYemekUpdateRestaurantCourierStatus({ ...updatedStat[id] })
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
        dispatch(resetgetirYemekUpdateRestaurantCourierStatus());
      }
    });
  }

  //TOAST AND SET RESTAURANT STATUS
  useEffect(() => {
    function statusValue(inData) {
      return RestaurantStatuses[inData.marketplaceId].filter(
        (S) => S.id == inData.status
      )[0]?.value;
    }
    if (statRest) {
      const formattedData = [];
      statRest.map((res) => {
        formattedData[res.marketplaceRestaurantId] = {
          ...res,
          restaurantStatus: statusValue(res),
          courierStatus: res.isCourierAvailable,
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
      dispatch(resetgetirYemekUpdateRestaurantCourierStatus());
    }
  }, [updateCourierLoading, updateCourierError]);

  return (
    statusData &&
    Object.keys(statusData).length > 0 && (
      <main className="border-2 border-[--getiryemek] rounded-md mx-2">
        <div className="w-full text-center py-3 bg-[--getiryemek] text-[--white-1]">
          Getir Yemek
        </div>
        <div className="w-full px-3 text-sm">
          <table className="w-full mt-2">
            <thead>
              <tr>
                <th className="font-medium pb-3 text-start">İşletme</th>
                <th className="font-medium pb-3 w-32 text-center">
                  Restoran Durumu
                </th>
                <th className="font-medium pb-3 w-28 text-end">Kurye Durumu</th>
              </tr>
            </thead>

            <tbody>
              {statusData &&
                Object.keys(statusData).map((key, i) => {
                  const restaurant = statusData[key];
                  return (
                    <tr key={i}>
                      <td className="text-start">{restaurant.name}</td>
                      <td className="w-32 text-center">
                        <CustomToggle
                          className="scale-75"
                          onChange={() => updateRestaurantStatus(key)}
                          checked={statusData[key].restaurantStatus}
                          disabled={updateRestaurantLoading}
                        />
                      </td>
                      <td className="w-28 text-end pr-6">
                        {statusData[key].restaurantStatus && (
                          <CustomToggle
                            className="scale-75"
                            onChange={() => updateRestaurantCourierStatus(key)}
                            checked={restaurant.courierStatus}
                            disabled={updateCourierLoading}
                          />
                        )}
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

export default GetirYemekRestaurantsStatus;

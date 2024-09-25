import { useEffect, useRef, useState } from "react";
import CustomToggle from "../../common/customToggle";
import { useDispatch, useSelector } from "react-redux";
import {
  getirYemekGetRestaurants,
  resetGetirYemekGetRestaurants,
} from "../../../redux/getirYemek/getirYemekGetRestaurantsSlice";
import {
  getirYemekUpdateRestaurantStatus,
  resetGetirYemekUpdateRestaurantStatus,
} from "../../../redux/getirYemek/getirYemekUpdateRestaurantStatusSlice";
import toast from "react-hot-toast";
import {
  getirYemekUpdateRestaurantCourierStatus,
  resetgetirYemekUpdateRestaurantCourierStatus,
} from "../../../redux/getirYemek/getirYemekUpdateRestaurantCourierStatusSlice";
const GetirYemekRestaurantsStatus = () => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);
  const { loading, success, data, error } = useSelector(
    (state) => state.getirYemek.getRestaurants
  );
  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.getirYemek.updateRestaurants);

  const { loading: updateCourierLoading, error: updateCourierError } =
    useSelector((state) => state.getirYemek.updateRestaurantsCourier);

  function updateRestaurantStatus(id) {
    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        status: !statusData[id].status,
      },
    };
    dispatch(getirYemekUpdateRestaurantStatus({ ...updatedStat[id] })).then(
      (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.dismiss(toastId.current);
          const text = updatedStat[id].status === true ? "Açıldı" : "Kapandı";
          const className =
            updatedStat[id].status === true
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

  function updateRestaurantCourierStatus(id) {
    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        isCourierAvailable: !statusData[id].isCourierAvailable,
      },
    };
    dispatch(
      getirYemekUpdateRestaurantCourierStatus({ ...updatedStat[id] })
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

  //GET RESTAURANT STATUS
  useEffect(() => {
    if (!statusData) {
      dispatch(getirYemekGetRestaurants());
    }
  }, [statusData]);

  //TOAST AND SET RESTAURANT STATUS
  useEffect(() => {
    if (error) {
      dispatch(resetGetirYemekGetRestaurants());
    }
    if (success) {
      const formattedData = [];
      data.map((res) => {
        formattedData[res.id] = {
          ...res,
          status: res.status == 100 ? true : false,
        };
      });
      setStatusData(formattedData);
      dispatch(resetGetirYemekGetRestaurants());
    }
  }, [error, success]);

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
    <main>
      <div className="w-full text-center py-3 bg-[--getiryemek] text-[--white-1]">
        Getir Yemek
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
                    <td className="text-start">{restaurant.name}</td>
                    <td className="text-center">
                      <CustomToggle
                        className="scale-75"
                        className1={`${
                          updateRestaurantLoading && "cursor-not-allowed"
                        }`}
                        onChange={() => updateRestaurantStatus(key)}
                        checked={statusData[key].status}
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

export default GetirYemekRestaurantsStatus;

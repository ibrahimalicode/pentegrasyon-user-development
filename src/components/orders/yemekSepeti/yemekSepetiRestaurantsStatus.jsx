//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomToggle from "../../common/customToggle";

//REDUX
import {
  resetYemekSepetiUpdateRestaurantStatus,
  yemekSepetiUpdateRestaurantStatus,
} from "../../../redux/yemekSepeti/yemekSepetiUpdateRestaurantStatusSlice";
import {
  resetYemekSepetiUpdateRestaurantCourierStatus,
  yemekSepetiUpdateRestaurantCourierStatus,
} from "../../../redux/yemekSepeti/yemekSepetiUpdateRestaurantCourierStatusSlice";
import {
  resetYemekSepetiGetRestaurants,
  yemekSepetiGetRestaurants,
} from "../../../redux/yemekSepeti/yemekSepetiGetRestaurantsSlice";

const YemekSepetiRestaurantsStatus = () => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);

  const { loading, success, data, error } = useSelector(
    (state) => state.getirYemek.getRestaurants
  );
  const { loading: updateRestaurantLoading, error: updateRestaurantError } =
    useSelector((state) => state.yemekSepeti.updateRestaurants);

  const { loading: updateCourierLoading, error: updateCourierError } =
    useSelector((state) => state.yemekSepeti.updateRestaurantsCourier);

  //UPDATE RESTAURANT STATUS
  function updateRestaurantStatus(id) {
    const updatedStat = {
      ...statusData,
      [id]: {
        ...statusData[id],
        status: !statusData[id].status,
      },
    };

    dispatch(yemekSepetiUpdateRestaurantStatus(updatedStat[id])).then((res) => {
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

  //TOAST AND SET RESTAURANT STATUS
  useEffect(() => {
    if (error) {
      dispatch(resetYemekSepetiGetRestaurants());
    }
    if (success) {
      console.log(data);
      const formattedData = [];
      data.map((res) => {
        formattedData[res.id] = {
          ...res,
          restaurantStatus: res.status == 100 ? true : false,
          courierStatus: res.isCourierAvailable,
        };
      });
      setStatusData(formattedData);
      dispatch(resetYemekSepetiGetRestaurants());
    }
  }, [error, success]);

  return (
    <main>
      <div className="w-full text-center py-3 bg-[--yemeksepeti] text-[--white-1]">
        Yemeksepeti
      </div>
      <div className="w-full px-3 text-sm">
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
                    <td className="text-start">{restaurant.name}</td>
                    <td className="w-44 text-center">
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
                    <td className="w-44 text-end pr-6">
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

export default YemekSepetiRestaurantsStatus;

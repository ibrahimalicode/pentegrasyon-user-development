//MODULES
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrendDownI, TrendUpI } from "../../assets/icon";

//REDUX
import {
  getRestaurantStatistics,
  resetgetRestaurantStatistics,
} from "../../redux/dashboard/restaurant/getRestaurantStatisticsSlice";
import {
  getLicenseStatistics,
  resetgetLicenseStatistics,
} from "../../redux/dashboard/license/getLicenseStatisticsSlice";

const StatCard = () => {
  const dispatch = useDispatch();
  const [statData, setStatData] = useState(null);
  const {
    loading: restLoading,
    error: restError,
    data: restData,
  } = useSelector((state) => state.dashboard.restaurant);
  const {
    loading: licenseLoading,
    error: licenseError,
    data: licenseData,
  } = useSelector((state) => state.dashboard.license);

  function percentageClass(percentage) {
    const isPositive = percentage >= 0;

    if (isPositive) {
      return "text-[--green-1] bg-[--status-green]";
    } else {
      return "text-[--red-1] bg-[--status-red]";
    }
  }

  function resetStates() {
    dispatch(resetgetLicenseStatistics());
    dispatch(resetgetRestaurantStatistics());
  }

  useEffect(() => {
    if (!statData) {
      dispatch(getRestaurantStatistics()).then(() =>
        dispatch(getLicenseStatistics())
      );
    }
  }, [statData]);

  useEffect(() => {
    if (restData && licenseData) {
      const updatedStat = [
        { ...restData, unit: "Restoran" },
        { ...licenseData, unit: "Lisans" },
      ];
      resetStates();
      setStatData(updatedStat);
    }
  }, [restData, licenseData]);

  // TOAST AND SET USERS
  useEffect(() => {
    if (restError || licenseError) {
      const error = restError || licenseError;
      if (error?.message) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      resetStates();
    }
  }, [restError, licenseError]);

  return (
    <main className="w-full flex gap-5 max-md:flex-col">
      {statData &&
        statData.map((card, index) => (
          <div
            key={index}
            className="w-full flex flex-col px-5 py-3 gap-3 bg-[--white-1] rounded-md border-2 border-solid border-[--light-1]"
          >
            <div className="w-full flex justify-between items-center">
              <h1 className="font-bold">Toplam {card?.unit}</h1>

              <div
                className={`w-max flex items-center whitespace-nowrap rounded-[50px] text-xs py-1 px-1.5 ${percentageClass(
                  card?.changeRate
                )}`}
              >
                {card?.changeRate >= 0 ? <TrendUpI /> : <TrendDownI />}
                {Math.abs(card?.changeRate).toFixed(2)}%
              </div>
            </div>

            <div className="w-full flex justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  {card?.total.toLocaleString()}
                </h1>
                <div className="text-[--gr-2] text-sm mt-1.5">{card?.unit}</div>
              </div>

              <div>
                <div className="flex gap-1.5 justify-between items-center text-xs text-[--green-1] font-bold">
                  <span>{card?.totalActive}</span>
                  <span className="px-4 py-1 border border-solid border-green-500 border-opacity-50 rounded-[54px]">
                    Aktif
                  </span>
                </div>
                <div className="flex gap-1.5 justify-between items-center text-xs text-[--gr-1] font-bold mt-1.5">
                  <span>{card?.totalPassive}</span>
                  <span className="px-4 py-1 border border-solid border-slate-500 border-opacity-50 rounded-[54px]">
                    Pasif
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </main>
  );
};

export default StatCard;

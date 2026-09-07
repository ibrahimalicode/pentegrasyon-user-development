//MODULES
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrendDownI, TrendUpI } from "../../assets/icon";

//UTILS
import { formatToPrice } from "../../utils/utils";

//REDUX
import {
  getRestaurantStatistics,
  resetGetRestaurantStatistics,
} from "../../redux/dashboard/restaurant/getRestaurantStatisticsSlice";
import {
  getLicenseStatistics,
  resetGetLicenseStatistics,
} from "../../redux/dashboard/license/getLicenseStatisticsSlice";

// orderTotals comes from SalesBar (the component that owns the order
// statistics fetch), so these KPIs follow the chart's filters.
const StatCard = ({ orderTotals }) => {
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
    dispatch(resetGetLicenseStatistics());
    dispatch(resetGetRestaurantStatistics());
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

  const loading = !statData || restLoading || licenseLoading;

  // Entity cards carry a trend badge and active/passive split; the order
  // KPIs are plain figures with a qualifier.
  const cards = statData
    ? [
        ...statData.map((card) => ({
          label: `Toplam ${card.unit}`,
          value: card?.total?.toLocaleString() ?? "0",
          changeRate: card?.changeRate,
          active: card?.totalActive,
          passive: card?.totalPassive,
        })),
        {
          label: "Toplam Sipariş",
          value:
            orderTotals?.orders != null
              ? orderTotals.orders.toLocaleString()
              : "—",
        },
        {
          label: "Toplam Ciro",
          value:
            orderTotals?.revenue != null
              ? `${formatToPrice(
                  String(orderTotals.revenue.toFixed(2)).replace(".", ",")
                )} ₺`
              : "—",
          hint: "Onaylanan",
        },
      ]
    : [];

  return (
    <main className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {!loading
        ? cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col gap-2.5 px-5 py-4 bg-[--white-1] rounded-xl border border-solid border-[--border-1] shadow-card"
            >
              <div className="w-full flex justify-between items-center gap-2">
                <h2 className="text-sm font-medium text-[--gr-1] truncate">
                  {card.label}
                </h2>

                {card.changeRate != null && (
                  <div
                    className={`flex items-center gap-1 whitespace-nowrap rounded-full text-xs font-medium py-1 px-2 [&>svg]:size-3.5 ${percentageClass(
                      card.changeRate
                    )}`}
                  >
                    {card.changeRate >= 0 ? <TrendUpI /> : <TrendDownI />}
                    {Math.abs(card.changeRate).toFixed(2)}%
                  </div>
                )}

                {card.hint && (
                  <span className="text-xs text-[--gr-3] whitespace-nowrap">
                    {card.hint}
                  </span>
                )}
              </div>

              <div className="w-full flex justify-between items-end gap-3">
                <p className="text-2xl font-bold text-[--black-1] leading-none tabular-nums truncate">
                  {card.value}
                </p>

                {card.active != null && (
                  <div className="flex gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 rounded-lg bg-[--status-green] px-2.5 py-1">
                      <span className="text-xs font-semibold text-[--green-1]">
                        {card.active}
                      </span>
                      <span className="text-xs text-[--green-1]">Aktif</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-[--light-3] px-2.5 py-1">
                      <span className="text-xs font-semibold text-[--gr-1]">
                        {card.passive}
                      </span>
                      <span className="text-xs text-[--gr-1]">Pasif</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        : [0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[5.5rem] rounded-xl border border-solid border-[--border-1] bg-[--light-3] fade"
            ></div>
          ))}
    </main>
  );
};

export default StatCard;

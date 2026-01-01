import { initChart } from "./chart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGetOrderStatistics } from "../../redux/dashboard/statistics/getOrderStatisticsSlice";

const initialData = {
  series: [0, 0, 0, 0, 0, 0],
  colors: [
    "var(--getiryemek)",
    "var(--migrosyemek)",
    "var(--trendyol)",
    "var(--yemeksepeti)",
    "var(--gofody)",
    "var(--siparisim)",
  ],
  labels: [
    "GetirYemek",
    "MigrosYemek",
    "Trendyol",
    "Yemeksepeti",
    "GoFody",
    "Siparişim+",
  ],
};

const MarketplaceChart = () => {
  const dispatch = useDispatch();
  const { data: ordersData } = useSelector(
    (state) => state.dashboard.getOrderStatistics
  );
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (!ordersData) return;
    ordersData.map((d) =>
      setData((prev) => {
        const updatedData = [...prev.series];
        updatedData[d.marketplaceId] = d.totalCount;
        return {
          ...prev,
          series: [...updatedData],
        };
      })
    );
    dispatch(resetGetOrderStatistics());
  }, [ordersData]);

  useEffect(() => {
    const chartElement = document.getElementById("donut-chart");
    const cleanup = initChart(chartElement, data);

    // Cleanup function to avoid memory leaks
    return () => {
      if (cleanup) cleanup();
    };
  }, [data]);

  return (
    <main className="max-md:w-full w-max flex justify-center bg-[--white-1] rounded-md border-2 border-solid border-[--light-1]">
      <div className="w-[26rem] max-lg:w-full h-[220px] overflow-hidden">
        <div className="w-full" id="donut-chart"></div>
      </div>
    </main>
  );
};

export default MarketplaceChart;

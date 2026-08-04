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
    <main className="w-full flex flex-col bg-[--white-1] rounded-xl border border-solid border-[--border-1] shadow-card p-5">
      <h2 className="text-base font-semibold text-[--black-1] mb-2">
        Pazaryeri Dağılımı
      </h2>
      {/* No fixed height: the rendered donut is taller than the old 240px
          box, so overflow-hidden was clipping its bottom edge. */}
      <div className="w-full">
        <div className="w-full" id="donut-chart"></div>
      </div>
    </main>
  );
};

export default MarketplaceChart;

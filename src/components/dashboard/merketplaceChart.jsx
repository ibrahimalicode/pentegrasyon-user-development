import { initChart } from "./chart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGetOrderStatistics } from "../../redux/dashboard/statistics/getOrderStatisticsSlice";

// The four supported marketplaces; GoFody/Siparişim+ have no panel
// support and no licenses, so they no longer occupy legend slots.
const MARKETPLACES = [
  { id: 0, label: "GetirYemek", color: "var(--getiryemek)" },
  { id: 1, label: "MigrosYemek", color: "var(--migrosyemek)" },
  { id: 2, label: "Trendyol", color: "var(--trendyol)" },
  { id: 3, label: "Yemeksepeti", color: "var(--yemeksepeti)" },
];

const MarketplaceChart = ({ licensedMarketplaceIds }) => {
  const dispatch = useDispatch();
  const { data: ordersData } = useSelector(
    (state) => state.dashboard.getOrderStatistics
  );
  // counts keyed by marketplaceId; the visible slice set is projected from
  // this at render so the license filter can arrive before or after.
  const [counts, setCounts] = useState({});

  useEffect(() => {
    if (!ordersData) return;
    setCounts((prev) => {
      const updated = { ...prev };
      for (const d of ordersData) updated[d.marketplaceId] = d.totalCount;
      return updated;
    });
    dispatch(resetGetOrderStatistics());
  }, [ordersData]);

  useEffect(() => {
    // Only marketplaces the user holds a license for; before the license
    // list resolves (or if it fails), all four majors.
    const visible = MARKETPLACES.filter(
      (m) =>
        !licensedMarketplaceIds?.length ||
        licensedMarketplaceIds.includes(m.id)
    );
    const data = {
      series: visible.map((m) => counts[m.id] || 0),
      colors: visible.map((m) => m.color),
      labels: visible.map((m) => m.label),
    };

    const chartElement = document.getElementById("donut-chart");
    const cleanup = initChart(chartElement, data);

    // Cleanup function to avoid memory leaks
    return () => {
      if (cleanup) cleanup();
    };
  }, [counts, licensedMarketplaceIds]);

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

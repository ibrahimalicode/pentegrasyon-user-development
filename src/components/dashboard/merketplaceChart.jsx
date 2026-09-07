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

// Ödeme / kurye splits from the shared last-30-days OrderFacts rows —
// segmented percent bars, deliberately a different chart style than the
// donut above and the bar charts in the analysis section.
const PAYMENT_KINDS = [
  { id: 1, label: "Online", color: "var(--primary-1)" },
  { id: 2, label: "Kapıda Nakit", color: "var(--green-1)" },
  { id: 3, label: "Kapıda Kart", color: "var(--yellow-1)" },
  { id: 4, label: "Yemek Kartı", color: "var(--purple-1)" },
  { id: 5, label: "Kapıda (Nakit/Kart)", color: "var(--brown-1)" },
  { id: 0, label: "Bilinmiyor", color: "var(--gr-3)" },
];
const COURIER_TYPES = [
  { id: 1, label: "Platform Kuryesi", color: "var(--primary-1)" },
  { id: 2, label: "Restoran Kuryesi", color: "var(--green-1)" },
  { id: 0, label: "Bilinmiyor", color: "var(--gr-3)" },
];

const SegmentSplit = ({ title, entries, total }) => {
  const present = entries.filter((e) => e.count > 0);
  if (!present.length) return null;
  return (
    <div>
      <p className="pb-1.5 text-sm font-medium text-[--black-1]">
        {title}{" "}
        <span className="text-xs font-normal text-[--gr-1]">· son 30 gün</span>
      </p>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[--light-3]">
        {present.map((e) => (
          <span
            key={e.id}
            style={{
              width: `${(e.count / total) * 100}%`,
              backgroundColor: e.color,
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs text-[--gr-1]">
        {present.map((e) => (
          <span key={e.id} className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: e.color }}
            />
            {e.label}{" "}
            <span className="tabular-nums text-[--black-1]">
              %{Math.round((e.count / total) * 100)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

const MarketplaceChart = ({ licensedMarketplaceIds, factsRows }) => {
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

      {/* The card used to end here with dead space below the donut —
          filled with two splits no other section shows. */}
      {factsRows?.length > 0 &&
        (() => {
          const paymentCounts = {};
          const courierCounts = {};
          for (const r of factsRows) {
            paymentCounts[r.paymentKind] =
              (paymentCounts[r.paymentKind] || 0) + 1;
            courierCounts[r.courierType] =
              (courierCounts[r.courierType] || 0) + 1;
          }
          return (
            <div className="flex flex-col gap-4 pt-4 mt-auto">
              <SegmentSplit
                title="Ödeme Türleri"
                total={factsRows.length}
                entries={PAYMENT_KINDS.map((k) => ({
                  ...k,
                  count: paymentCounts[k.id] || 0,
                }))}
              />
              <SegmentSplit
                title="Kurye"
                total={factsRows.length}
                entries={COURIER_TYPES.map((k) => ({
                  ...k,
                  count: courierCounts[k.id] || 0,
                }))}
              />
            </div>
          );
        })()}
    </main>
  );
};

export default MarketplaceChart;

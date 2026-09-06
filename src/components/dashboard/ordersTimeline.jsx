//MODULES
import ApexCharts from "apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

//CONTEXT
import { useFirestore } from "../../context/FirestoreContext";

//REDUX
import {
  getTicketTimeline,
  resetGetTicketTimeline,
} from "../../redux/orders/getTicketTimelineSlice";

// One line per marketplace, in the brand colors used across the panel.
const MARKETPLACE_SERIES = [
  { id: 0, name: "GetirYemek", color: "#5d3ebd" },
  { id: 1, name: "MigrosYemek", color: "#2cb54e" },
  { id: 2, name: "TrendyolYemek", color: "#fc903a" },
  { id: 3, name: "YemekSepeti", color: "#fa0050" },
];

// 30-minute buckets: single-restaurant volumes (5-50 orders/day) render
// flat at 1-minute resolution, per the backend's own guidance.
const BUCKET_MS = 30 * 60 * 1000;
const WINDOW_MS = 24 * 60 * 60 * 1000;
// The endpoint returns a few KB and is scoped server-side to the token's
// user; the 60s refetch is the contract's prescribed live cadence (it is
// also excluded from the global loader in loadingSlice).
const REFRESH_MS = 60 * 1000;

function buildSeries(tickets, marketplaces) {
  const now = Date.now();
  const firstBucket = Math.floor((now - WINDOW_MS) / BUCKET_MS) * BUCKET_MS;
  const bucketCount = Math.ceil((now - firstBucket) / BUCKET_MS);
  const counts = marketplaces.map(() => new Array(bucketCount).fill(0));

  for (const t of tickets || []) {
    // Timeline dates are Turkey local time without offset — parsed as
    // local, the same convention as the rest of the panel.
    const ts = new Date(t.createdDateTime).getTime();
    const bucket = Math.floor((ts - firstBucket) / BUCKET_MS);
    const seriesIdx = marketplaces.findIndex(
      (m) => m.id === t.marketplaceId,
    );
    if (seriesIdx >= 0 && bucket >= 0 && bucket < bucketCount)
      counts[seriesIdx][bucket] += 1;
  }

  return marketplaces.map((m, i) => ({
    name: m.name,
    data: counts[i].map((c, j) => [firstBucket + j * BUCKET_MS, c]),
  }));
}

const OrdersTimeline = ({ licensedMarketplaceIds }) => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.orders.timeline);
  const { newOrder } = useFirestore();

  const chartRef = useRef(null);
  const chartElRef = useRef(null);
  const seenIdsRef = useRef(new Set());
  const [tickets, setTickets] = useState(null);
  const [unavailable, setUnavailable] = useState(false);

  //GET TIMELINE + 60s LIVE REFRESH
  useEffect(() => {
    dispatch(getTicketTimeline({ lastHours: 24 }));
    const timer = setInterval(
      () => dispatch(getTicketTimeline({ lastHours: 24 })),
      REFRESH_MS,
    );
    return () => clearInterval(timer);
  }, []);

  //SET TIMELINE
  useEffect(() => {
    if (data) {
      const rows = Array.isArray(data.tickets) ? data.tickets : [];
      seenIdsRef.current = new Set(rows.map((t) => t.ticketId));
      setTickets(rows);
      setUnavailable(false);
      dispatch(resetGetTicketTimeline());
    }
    if (error) {
      // No retry beyond the normal 60s cycle. Until the endpoint reaches
      // prod (backend deploys at its 03:00 window) the card shows a quiet
      // empty state and self-heals on a later tick.
      if (!tickets) setUnavailable(true);
      dispatch(resetGetTicketTimeline());
    }
  }, [data, error]);

  //LIVE-APPEND PUSHED ORDERS BETWEEN REFRESHES
  useEffect(() => {
    // Read-only consumer: OrdersContext owns clearing newOrder. The push
    // doc is slim; created time falls back to "now", and an order without
    // a marketplaceId simply lands in no series until the next refetch.
    if (!newOrder?.id || seenIdsRef.current.has(newOrder.id)) return;
    seenIdsRef.current.add(newOrder.id);
    setTickets((prev) => [
      ...(prev || []),
      {
        ticketId: newOrder.id,
        marketplaceId: newOrder.marketplaceId,
        createdDateTime: newOrder.createdDateTime || new Date().toISOString(),
      },
    ]);
  }, [newOrder]);

  //RENDER / UPDATE CHART
  useEffect(() => {
    if (!tickets || !chartElRef.current) return;
    // Only marketplaces the user holds a license for; before the license
    // list resolves (or if it fails), all four majors.
    const marketplaces = MARKETPLACE_SERIES.filter(
      (m) =>
        !licensedMarketplaceIds?.length ||
        licensedMarketplaceIds.includes(m.id),
    );
    const series = buildSeries(tickets, marketplaces);

    if (chartRef.current) {
      // Colors are baked in at creation, so a changed marketplace set
      // needs a rebuild, not an updateSeries.
      if (chartRef.current.__seriesKey === marketplaces.length) {
        chartRef.current.updateSeries(series);
        return;
      }
      chartRef.current.destroy();
      chartRef.current = null;
    }

    chartRef.current = new ApexCharts(chartElRef.current, {
      series,
      colors: marketplaces.map((m) => m.color),
      chart: {
        type: "line",
        height: 280,
        width: "100%",
        foreColor: "var(--black-1)",
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: false },
        fontFamily: "inherit",
      },
      stroke: { curve: "smooth", width: 2.5 },
      grid: {
        borderColor: "var(--border-1)",
        strokeDashArray: 4,
      },
      dataLabels: { enabled: false },
      legend: {
        position: "top",
        horizontalAlign: "right",
        markers: { radius: 12 },
      },
      xaxis: {
        type: "datetime",
        labels: { datetimeUTC: false, format: "HH:mm" },
        tooltip: { enabled: false },
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: { formatter: (v) => Math.round(v) },
      },
      tooltip: {
        shared: true,
        intersect: false,
        x: { format: "HH:mm" },
      },
    });
    chartRef.current.__seriesKey = marketplaces.length;
    chartRef.current.render();
  }, [tickets, licensedMarketplaceIds]);

  //DESTROY ON UNMOUNT
  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return (
    <main className="w-full p-5 bg-[--white-1] rounded-xl border border-solid border-[--border-1] shadow-card">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold whitespace-nowrap text-[--black-1]">
          Sipariş Akışı
        </h2>
        <p className="text-xs text-[--gr-1]">Son 24 saat · canlı</p>
      </div>
      {unavailable ? (
        <p className="py-16 text-center text-sm text-[--gr-1]">
          Sipariş akışı verisi şu an alınamıyor.
        </p>
      ) : (
        <div ref={chartElRef} className="w-full min-w-0" />
      )}
    </main>
  );
};

export default OrdersTimeline;

//MODULES
import ApexCharts from "apexcharts";
import { useEffect, useMemo, useRef, useState } from "react";

//UTILS
import { cn } from "../../lib/utils";

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

// User-selectable chart style for the splits; persisted per browser.
const SPLIT_CHART_KEY = "DASH_SPLIT_CHART";
const SPLIT_CHART_TYPES = [
  { id: "radial", label: "Halka" },
  { id: "segment", label: "Şerit" },
  { id: "hbar", label: "Çubuk" },
  { id: "donut", label: "Donut" },
];

const radialOptions = (present, total) => {
  // Each series draws its own ring inside the previous one, so a wide
  // hollow leaves 5 payment kinds as hairlines. Shrink the hollow (and
  // grow the canvas) as rings are added; the center label still needs
  // room for "Kapıda (Nakit/Kart)".
  const count = present.length;
  const hollow = count <= 1 ? "58%" : count === 2 ? "50%" : count === 3 ? "42%" : "34%";
  const dominant = present.reduce((a, b) => (b.count > a.count ? b : a));

  return {
    series: present.map((e) => Math.round((e.count / total) * 100)),
    labels: present.map((e) => e.label),
    colors: present.map((e) => e.color),
    chart: {
      type: "radialBar",
      height: count > 3 ? 300 : 260,
      foreColor: "var(--black-1)",
      fontFamily: "inherit",
    },
    plotOptions: {
      radialBar: {
        hollow: { size: hollow },
        track: { background: "var(--light-3)", margin: count > 3 ? 3 : 6 },
        dataLabels: {
          name: { fontSize: "10px", offsetY: -2 },
          value: { fontSize: "15px", offsetY: 2, formatter: (v) => `%${v}` },
          // Resting state names the dominant kind instead of Apex's
          // "Total", which sums the percentages to a meaningless number.
          total: {
            show: true,
            label: dominant.label,
            fontSize: "10px",
            formatter: () =>
              `${dominant.count} · %${Math.round(
                (dominant.count / total) * 100,
              )}`,
          },
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: "12px",
      formatter: (name, opts) =>
        `${name} ${present[opts.seriesIndex]?.count ?? 0} · %${
          opts.w.globals.series[opts.seriesIndex]
        }`,
    },
    stroke: { lineCap: "round" },
  };
};

const donutOptions = (present, total) => ({
  series: present.map((e) => e.count),
  labels: present.map((e) => e.label),
  colors: present.map((e) => e.color),
  chart: {
    type: "donut",
    height: 220,
    foreColor: "var(--black-1)",
    fontFamily: "inherit",
  },
  dataLabels: { enabled: false },
  plotOptions: { pie: { donut: { size: "70%" } } },
  stroke: { colors: ["var(--white-1)"] },
  legend: {
    show: true,
    position: "bottom",
    fontSize: "12px",
    formatter: (name, opts) => {
      const count = opts.w.globals.series[opts.seriesIndex];
      return `${name} ${count} · %${Math.round((count / total) * 100)}`;
    },
  },
});

const SplitLegend = ({ present, total }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs text-[--gr-1]">
    {present.map((e) => (
      <span key={e.id} className="flex items-center gap-1.5">
        <span
          className="size-2 shrink-0 rounded-full"
          style={{ backgroundColor: e.color }}
        />
        {e.label}{" "}
        <span className="tabular-nums text-[--black-1]">
          {e.count} · %{Math.round((e.count / total) * 100)}
        </span>
      </span>
    ))}
  </div>
);

// One split (Ödeme / Kurye) rendered in the selected chart style.
const Split = ({ type, title, entries, total }) => {
  const chartElRef = useRef(null);
  const present = useMemo(
    () => entries.filter((e) => e.count > 0),
    [entries],
  );

  useEffect(() => {
    if (
      !chartElRef.current ||
      !present.length ||
      (type !== "radial" && type !== "donut")
    )
      return;
    const chart = new ApexCharts(
      chartElRef.current,
      type === "radial"
        ? radialOptions(present, total)
        : donutOptions(present, total),
    );
    chart.render();
    return () => chart.destroy();
  }, [type, present, total]);

  if (!present.length) return null;

  return (
    <div>
      <p className="pb-1.5 text-sm font-medium text-[--black-1]">
        {title}{" "}
        <span className="text-xs font-normal text-[--gr-1]">· son 30 gün</span>
      </p>

      {(type === "radial" || type === "donut") && (
        <div ref={chartElRef} className="w-full min-w-0" />
      )}

      {type === "segment" && (
        <>
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
          <SplitLegend present={present} total={total} />
        </>
      )}

      {type === "hbar" && (
        <div className="flex flex-col gap-1.5">
          {present.map((e) => (
            <div key={e.id} className="flex items-center gap-3 text-xs">
              <span className="w-32 shrink-0 truncate text-[--black-2]">
                {e.label}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-[--light-3]">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${Math.max((e.count / total) * 100, 2)}%`,
                    backgroundColor: e.color,
                  }}
                />
              </span>
              <span className="w-20 shrink-0 text-right tabular-nums text-[--black-1]">
                {e.count} · %{Math.round((e.count / total) * 100)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Own full-width row: Ödeme Türleri and Kurye side by side (stacked on
// mobile), in the chart style the user picks from the pill tabs
// (persisted). Fed by the last-30-days OrderFacts rows DashboardPage
// fetches once.
const PaymentCourierSplits = ({ factsRows }) => {
  const [splitType, setSplitType] = useState(
    () => localStorage.getItem(SPLIT_CHART_KEY) || "radial",
  );

  const { paymentEntries, courierEntries } = useMemo(() => {
    const paymentCounts = {};
    const courierCounts = {};
    for (const r of factsRows || []) {
      paymentCounts[r.paymentKind] = (paymentCounts[r.paymentKind] || 0) + 1;
      courierCounts[r.courierType] = (courierCounts[r.courierType] || 0) + 1;
    }
    return {
      paymentEntries: PAYMENT_KINDS.map((k) => ({
        ...k,
        count: paymentCounts[k.id] || 0,
      })),
      courierEntries: COURIER_TYPES.map((k) => ({
        ...k,
        count: courierCounts[k.id] || 0,
      })),
    };
  }, [factsRows]);

  if (!factsRows?.length) return null;

  return (
    <main className="w-full p-5 bg-[--white-1] rounded-xl border border-solid border-[--border-1] shadow-card">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold whitespace-nowrap text-[--black-1]">
          Ödeme ve Kurye
        </h2>
        <div className="flex rounded-lg border border-solid border-[--border-1] bg-[--white-1] p-0.5">
          {SPLIT_CHART_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setSplitType(t.id);
                localStorage.setItem(SPLIT_CHART_KEY, t.id);
              }}
              className={cn(
                "rounded-lg px-3 py-1 text-xs font-medium transition-colors",
                splitType === t.id
                  ? "bg-[--primary-1] text-white"
                  : "text-[--gr-1] hover:text-[--black-1]",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        <Split
          type={splitType}
          title="Ödeme Türleri"
          total={factsRows.length}
          entries={paymentEntries}
        />
        <Split
          type={splitType}
          title="Kurye"
          total={factsRows.length}
          entries={courierEntries}
        />
      </div>
    </main>
  );
};

export default PaymentCourierSplits;

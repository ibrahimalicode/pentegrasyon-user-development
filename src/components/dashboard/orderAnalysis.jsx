//MODULES
import ApexCharts from "apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

//UTILS
import { formatDate, formatToPrice } from "../../utils/utils";

//REDUX
import {
  getOrderFacts,
  resetGetOrderFacts,
} from "../../redux/orders/getOrderFactsSlice";

const MARKETPLACES = [
  { id: 0, label: "GetirYemek", color: "#5d3ebd" },
  { id: 1, label: "MigrosYemek", color: "#2cb54e" },
  { id: 2, label: "TrendyolYemek", color: "#fc903a" },
  { id: 3, label: "YemekSepeti", color: "#fa0050" },
];

const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const PAGE_SIZE = 5000;
// Safety cap: 3 pages = 15k orders / 30 days, far above any single account.
const MAX_PAGES = 3;

const price = (n) =>
  formatToPrice(String(Number(n || 0).toFixed(2)).replace(".", ","));

// One pass over the fact rows → everything the section shows.
function buildStats(rows) {
  const stats = {
    total: rows.length,
    cancelled: 0,
    netSum: 0,
    netCount: 0,
    days: new Array(7).fill(0),
    hours: new Array(24).fill(0),
    // per-marketplace day/hour matrices → stacked chart series
    daysByMp: MARKETPLACES.map(() => new Array(7).fill(0)),
    hoursByMp: MARKETPLACES.map(() => new Array(24).fill(0)),
    marketplaces: {},
    discountPlatform: 0,
    discountRestaurant: 0,
    discountTotal: 0,
    customers: new Map(),
  };

  for (const r of rows) {
    if (r.isCancelled) stats.cancelled += 1;
    else {
      stats.netSum += Number(r.netAmount) || 0;
      stats.netCount += 1;
    }
    const mpIdx = MARKETPLACES.findIndex((m) => m.id === r.marketplaceId);
    const day = Number(r.orderDayOfWeek);
    if (day >= 1 && day <= 7) {
      stats.days[day - 1] += 1;
      if (mpIdx >= 0) stats.daysByMp[mpIdx][day - 1] += 1;
    }
    const hour = Number(r.orderHour);
    if (hour >= 0 && hour <= 23) {
      stats.hours[hour] += 1;
      if (mpIdx >= 0) stats.hoursByMp[mpIdx][hour] += 1;
    }
    stats.marketplaces[r.marketplaceId] =
      (stats.marketplaces[r.marketplaceId] || 0) + 1;
    stats.discountPlatform += Number(r.discountPlatform) || 0;
    stats.discountRestaurant += Number(r.discountRestaurant) || 0;
    stats.discountTotal += Number(r.discountTotal) || 0;
    if (r.customerKey)
      stats.customers.set(
        r.customerKey,
        (stats.customers.get(r.customerKey) || 0) + 1,
      );
  }

  const distinctCustomers = stats.customers.size;
  let repeatCustomers = 0;
  for (const count of stats.customers.values())
    if (count >= 2) repeatCustomers += 1;

  return {
    ...stats,
    cancelRate: stats.total ? (stats.cancelled / stats.total) * 100 : 0,
    avgBasket: stats.netCount ? stats.netSum / stats.netCount : 0,
    distinctCustomers,
    repeatCustomers,
    repeatRate: distinctCustomers
      ? (repeatCustomers / distinctCustomers) * 100
      : 0,
    busiestDay: stats.days.indexOf(Math.max(...stats.days)),
    busiestHour: stats.hours.indexOf(Math.max(...stats.hours)),
  };
}

// One stacked series per marketplace present in the data, brand colors,
// legend on top — the total bar height stays the overall busy-ness.
const barChartOptions = (categories, series, colors) => ({
  series,
  colors,
  chart: {
    type: "bar",
    stacked: true,
    height: 210,
    width: "100%",
    foreColor: "var(--black-1)",
    toolbar: { show: false },
    fontFamily: "inherit",
  },
  plotOptions: { bar: { borderRadius: 3, columnWidth: "60%" } },
  dataLabels: { enabled: false },
  grid: { borderColor: "var(--border-1)", strokeDashArray: 4 },
  legend: { position: "top", horizontalAlign: "right" },
  xaxis: { categories, labels: { rotate: 0 } },
  yaxis: { labels: { formatter: (v) => Math.round(v) } },
  tooltip: { y: { formatter: (v) => `${v} sipariş` } },
});

const OrderAnalysis = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.orders.facts);

  const dayChartElRef = useRef(null);
  const hourChartElRef = useRef(null);
  const rowsRef = useRef([]);
  const pageRef = useRef(1);
  const [stats, setStats] = useState(null);
  const [unavailable, setUnavailable] = useState(false);

  function fetchPage(pageNumber) {
    dispatch(
      getOrderFacts({
        pageNumber,
        pageSize: PAGE_SIZE,
        startDateTime: formatDate(
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        ),
        endDateTime: formatDate(new Date()),
      }),
    );
  }

  //GET FACTS (paged; a single page covers normal volumes)
  useEffect(() => {
    rowsRef.current = [];
    pageRef.current = 1;
    fetchPage(1);
  }, []);

  //ACCUMULATE PAGES → STATS
  useEffect(() => {
    if (data) {
      rowsRef.current = [...rowsRef.current, ...(data.data || [])];
      const morePages =
        data.hasNextPage && pageRef.current < MAX_PAGES;
      dispatch(resetGetOrderFacts());
      if (morePages) {
        pageRef.current += 1;
        fetchPage(pageRef.current);
      } else {
        setStats(buildStats(rowsRef.current));
        setUnavailable(false);
      }
    }
    if (error) {
      if (!stats) setUnavailable(true);
      dispatch(resetGetOrderFacts());
    }
  }, [data, error]);

  //RENDER BAR CHARTS
  useEffect(() => {
    if (!stats || !dayChartElRef.current || !hourChartElRef.current) return;

    const present = MARKETPLACES.map((m, i) => ({ ...m, idx: i })).filter(
      (m) => stats.marketplaces[m.id],
    );
    const colors = present.map((m) => m.color);

    const dayChart = new ApexCharts(
      dayChartElRef.current,
      barChartOptions(
        DAY_LABELS,
        present.map((m) => ({ name: m.label, data: stats.daysByMp[m.idx] })),
        colors,
      ),
    );
    dayChart.render();

    const hourChart = new ApexCharts(
      hourChartElRef.current,
      barChartOptions(
        [...Array(24).keys()].map((h) => String(h).padStart(2, "0")),
        present.map((m) => ({ name: m.label, data: stats.hoursByMp[m.idx] })),
        colors,
      ),
    );
    hourChart.render();

    return () => {
      dayChart.destroy();
      hourChart.destroy();
    };
  }, [stats]);

  const marketplaceRows = stats
    ? MARKETPLACES.filter((m) => stats.marketplaces[m.id]).map((m) => ({
        ...m,
        count: stats.marketplaces[m.id],
        percent: stats.total
          ? (stats.marketplaces[m.id] / stats.total) * 100
          : 0,
      }))
    : [];

  const discountMax = stats
    ? Math.max(stats.discountPlatform, stats.discountRestaurant, 1)
    : 1;

  const kpis = stats
    ? [
        { label: "Toplam Sipariş", value: stats.total },
        { label: "İptal Oranı", value: `%${stats.cancelRate.toFixed(1)}` },
        {
          label: "Tekrar Sipariş Veren",
          value: `%${stats.repeatRate.toFixed(0)}`,
          note: `${stats.repeatCustomers} / ${stats.distinctCustomers} müşteri`,
        },
        {
          label: "Ortalama Sepet",
          value: `${price(stats.avgBasket)} ₺`,
        },
      ]
    : [];

  return (
    <main className="w-full p-5 bg-[--white-1] rounded-xl border border-solid border-[--border-1] shadow-card">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-semibold whitespace-nowrap text-[--black-1]">
          Sipariş Analizi
        </h2>
        {/* Facts sync nightly at 02:30 — history, not the live feed. */}
        <p className="text-xs text-[--gr-1] whitespace-nowrap">
          Son 30 gün · gece eşitlenir
        </p>
      </div>

      {unavailable && (
        <p className="py-16 text-center text-sm text-[--gr-1]">
          Analiz verisi şu an alınamıyor.
        </p>
      )}

      {stats && stats.total === 0 && (
        <p className="py-16 text-center text-sm text-[--gr-1]">
          Son 30 günde sipariş bulunmuyor.
        </p>
      )}

      {stats && stats.total > 0 && (
        <div className="flex flex-col gap-5 pt-4">
          {/* KPI row */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-solid border-[--border-1] px-4 py-3"
              >
                <p className="text-[0.65rem] font-medium uppercase tracking-wide text-[--gr-1]">
                  {kpi.label}
                </p>
                <p className="pt-1 text-xl font-semibold text-[--black-1] tabular-nums">
                  {kpi.value}
                </p>
                {kpi.note && (
                  <p className="text-xs text-[--gr-1]">{kpi.note}</p>
                )}
              </div>
            ))}
          </div>

          {/* Busy-ness charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="min-w-0">
              <p className="pb-1 text-sm font-medium text-[--black-1]">
                Günlere Göre{" "}
                <span className="text-xs font-normal text-[--gr-1]">
                  · en yoğun {DAY_LABELS[stats.busiestDay]}
                </span>
              </p>
              <div ref={dayChartElRef} className="w-full min-w-0" />
            </div>
            <div className="min-w-0">
              <p className="pb-1 text-sm font-medium text-[--black-1]">
                Saatlere Göre{" "}
                <span className="text-xs font-normal text-[--gr-1]">
                  · en yoğun {String(stats.busiestHour).padStart(2, "0")}
                  :00
                </span>
              </p>
              <div ref={hourChartElRef} className="w-full min-w-0" />
            </div>
          </div>

          {/* Marketplace split + discount funding */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div>
              <p className="pb-2 text-sm font-medium text-[--black-1]">
                Pazaryeri Dağılımı
              </p>
              <div className="flex flex-col gap-2">
                {marketplaceRows.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 text-sm">
                    <span className="w-28 shrink-0 text-[--black-2]">
                      {m.label}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-[--light-3]">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${Math.max(m.percent, 2)}%`,
                          backgroundColor: m.color,
                        }}
                      />
                    </span>
                    <span className="w-20 shrink-0 text-right tabular-nums text-[--black-1]">
                      {m.count} · %{m.percent.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="pb-2 text-sm font-medium text-[--black-1]">
                İndirim Finansmanı{" "}
                <span className="text-xs font-normal text-[--gr-1]">
                  · toplam {price(stats.discountTotal)} ₺
                </span>
              </p>
              <div className="flex flex-col gap-2">
                {[
                  {
                    label: "Platform",
                    amount: stats.discountPlatform,
                    color: "var(--primary-1)",
                  },
                  {
                    label: "Restoran",
                    amount: stats.discountRestaurant,
                    color: "var(--green-1)",
                  },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-28 shrink-0 text-[--black-2]">
                      {d.label}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-[--light-3]">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${Math.max(
                            (d.amount / discountMax) * 100,
                            d.amount > 0 ? 2 : 0,
                          )}%`,
                          backgroundColor: d.color,
                        }}
                      />
                    </span>
                    <span className="w-24 shrink-0 text-right tabular-nums text-[--black-1]">
                      {price(d.amount)} ₺
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default OrderAnalysis;

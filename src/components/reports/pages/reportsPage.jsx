//MODULES
import ApexCharts from "apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

//COMP
import { cn } from "../../../lib/utils";
import CustomDatePicker from "../../common/customdatePicker";
import { TOOLBAR_BTN_PRIMARY } from "../../common/toolbarStyles";
import NoTableData from "../../common/noTableData";

//UTILS
import { formatDate, formatToPrice } from "../../../utils/utils";

//REDUX
import {
  getUserReport,
  resetGetUserReport,
} from "../../../redux/reports/getUserReportSlice";

const MARKETPLACE_COLORS = {
  0: "#5d3ebd",
  1: "#2cb54e",
  2: "#fc903a",
  3: "#fa0050",
};

// Backend period types; "custom" is ours and sends startDate/endDate.
const PERIODS = [
  { id: 0, label: "Geçen Ay" },
  { id: 1, label: "Bu Ay (bugüne kadar)" },
  { id: "custom", label: "Özel Aralık" },
];

const price = (n) =>
  formatToPrice(String(Number(n || 0).toFixed(2)).replace(".", ","));

const TR_MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

// "1–31 Ağustos 2026" / "28 Ağustos – 3 Eylül 2026" — labels like "Geçen
// Ay" or "Çarşamba" don't say which actual days they cover.
const dayRange = (startIso, endIso) => {
  if (!startIso || !endIso) return "";
  const s = new Date(startIso);
  const e = new Date(endIso);
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  return sameMonth
    ? `${s.getDate()}–${e.getDate()} ${TR_MONTHS[s.getMonth()]} ${e.getFullYear()}`
    : `${s.getDate()} ${TR_MONTHS[s.getMonth()]} – ${e.getDate()} ${
        TR_MONTHS[e.getMonth()]
      } ${e.getFullYear()}`;
};

const pct = (part, whole) => (whole ? Math.round((part / whole) * 100) : 0);

// Apex ships English month/day names only; the panel is Turkish.
const TR_LOCALE = {
  name: "tr",
  options: {
    months: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ],
    shortMonths: [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara",
    ],
    days: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
    shortDays: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
  },
};

// Change percentages are null when the previous period had no orders.
const Change = ({ percent }) => {
  if (percent == null) return null;
  const up = percent >= 0;
  return (
    <span
      className={cn(
        "text-xs font-medium",
        up ? "text-[--green-1]" : "text-[--red-1]",
      )}
    >
      {up ? "▲" : "▼"} %{Math.abs(percent).toFixed(1)}
    </span>
  );
};

const Kpi = ({ label, value, note, percent }) => (
  <div className="rounded-xl border border-solid border-[--border-1] px-4 py-3">
    <p className="text-[0.65rem] font-medium uppercase tracking-wide text-[--gr-1]">
      {label}
    </p>
    <div className="flex items-baseline gap-2 pt-1">
      <p className="text-xl font-semibold text-[--black-1] tabular-nums">
        {value}
      </p>
      <Change percent={percent} />
    </div>
    {note && <p className="text-xs text-[--gr-1]">{note}</p>}
  </div>
);

// Daily order/revenue course of the period.
const DaysChart = ({ days }) => {
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current || !days?.length) return;
    const chart = new ApexCharts(elRef.current, {
      series: [
        {
          name: "Sipariş",
          type: "column",
          data: days.map((d) => [new Date(d.date).getTime(), d.orderCount]),
        },
        {
          name: "Ciro",
          type: "line",
          data: days.map((d) => [new Date(d.date).getTime(), d.revenue]),
        },
      ],
      colors: ["var(--primary-1)", "var(--green-1)"],
      chart: {
        height: 260,
        width: "100%",
        toolbar: { show: false },
        foreColor: "var(--black-1)",
        fontFamily: "inherit",
        locales: [TR_LOCALE],
        defaultLocale: "tr",
      },
      stroke: { width: [0, 2.5], curve: "smooth" },
      plotOptions: { bar: { borderRadius: 3, columnWidth: "55%" } },
      dataLabels: { enabled: false },
      grid: { borderColor: "var(--border-1)", strokeDashArray: 4 },
      legend: { position: "top", horizontalAlign: "right" },
      xaxis: {
        type: "datetime",
        labels: { datetimeUTC: false, format: "d MMM" },
      },
      yaxis: [
        { labels: { formatter: (v) => Math.round(v) } },
        {
          opposite: true,
          labels: { formatter: (v) => `${Math.round(v / 1000)}k` },
        },
      ],
      tooltip: {
        shared: true,
        x: { format: "d MMMM yyyy" },
        y: [
          { formatter: (v) => `${v} sipariş` },
          { formatter: (v) => `${price(v)} ₺` },
        ],
      },
    });
    chart.render();
    return () => chart.destroy();
  }, [days]);

  return <div ref={elRef} className="w-full min-w-0" />;
};

// Shared "label · bar · value" row used by weekday / hour / marketplace
// / payment breakdowns.
const Bars = ({ rows, max, valueFormatter }) => (
  <div className="flex flex-col gap-1.5">
    {rows.map((r) => (
      <div key={r.key} className="flex items-center gap-3 text-xs">
        <span
          className="w-28 shrink-0 truncate text-[--black-2]"
          title={r.title}
        >
          {r.label}
        </span>
        <span className="h-2 flex-1 overflow-hidden rounded-full bg-[--light-3]">
          <span
            className="block h-full rounded-full"
            style={{
              width: `${max ? Math.max((r.value / max) * 100, r.value > 0 ? 2 : 0) : 0}%`,
              backgroundColor: r.color || "var(--primary-1)",
            }}
          />
        </span>
        <span className="w-32 shrink-0 text-right tabular-nums text-[--black-1]">
          {valueFormatter(r)}
        </span>
      </div>
    ))}
  </div>
);

const RestaurantReport = ({ report }) => {
  const weekdayMax = Math.max(...report.weekdays.map((w) => w.orderCount), 1);
  const hourMax = Math.max(...report.hours.map((h) => h.orderCount), 1);
  const mpMax = Math.max(...report.marketplaces.map((m) => m.orderCount), 1);
  const payMax = Math.max(...report.paymentKinds.map((p) => p.orderCount), 1);
  // Only hours with orders — a full 24-row list is mostly zeros.
  const activeHours = report.hours.filter((h) => h.orderCount > 0);
  // Which calendar days each weekday covers, e.g. Çarşamba → "2, 9, 16, 23".
  const weekdayDates = {};
  for (const d of report.days || []) {
    const date = new Date(d.date);
    // JS Sunday=0; the API uses Monday=1..Sunday=7.
    const key = date.getDay() === 0 ? 7 : date.getDay();
    (weekdayDates[key] ||= []).push(
      `${date.getDate()} ${TR_MONTHS[date.getMonth()]}`,
    );
  }

  return (
    <main className="w-full p-5 bg-[--white-1] rounded-xl border border-solid border-[--border-1] shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold text-[--black-1]">
          {report.restaurantName}
        </h3>
        <p className="text-xs text-[--gr-1]">
          {dayRange(report.periodStart, report.periodEnd)} ·{" "}
          {report.activeDays}/{report.daysInPeriod} gün aktif ·{" "}
          {report.comparisonLabel}
          {report.previousPeriodStart && (
            <>
              {" "}
              (
              {dayRange(report.previousPeriodStart, report.previousPeriodEnd)})
            </>
          )}
        </p>
      </div>

      {/* Every order is either approved or cancelled — no in-between
          state is shown anywhere in the report. */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 pt-4">
        <Kpi
          label="Onaylanan Sipariş"
          value={report.orderCount - report.cancelledCount}
          percent={report.orderCountChangePercent}
          note={`toplam ${report.orderCount} sipariş`}
        />
        <Kpi
          label="İptal Edilen"
          value={report.cancelledCount}
          note={`%${report.cancelRate} iptal oranı`}
        />
        <Kpi
          label="Ciro"
          value={`${price(report.revenue)} ₺`}
          percent={report.revenueChangePercent}
          note={`Brüt ${price(report.grossRevenue)} ₺`}
        />
        <Kpi
          label="Ortalama Sepet"
          value={`${price(report.averageBasket)} ₺`}
          percent={report.averageBasketChangePercent}
        />
      </div>

      {report.highlights?.length > 0 && (
        <ul className="flex flex-col gap-1 pt-4">
          {report.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-[--black-2]">
              <span className="text-[--primary-1]">•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {report.days?.length > 0 && (
        <div className="pt-5">
          <p className="pb-1 text-sm font-medium text-[--black-1]">
            Günlük Seyir
          </p>
          <DaysChart days={report.days} />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 pt-5">
        <div>
          <p className="pb-2 text-sm font-medium text-[--black-1]">
            Pazaryerleri
          </p>
          <Bars
            max={mpMax}
            rows={report.marketplaces.map((m) => ({
              key: m.marketplaceId,
              label: m.name,
              // Approved = not cancelled, matching the KPI split.
              value: m.orderCount - m.cancelledCount,
              cancelled: m.cancelledCount,
              color: MARKETPLACE_COLORS[m.marketplaceId],
              revenue: m.revenue,
              share: m.revenueShare,
            }))}
            // Bar is the order share; the ₺ line underneath is the revenue
            // share, which can differ a lot (bigger baskets on one app).
            valueFormatter={(r) => (
              <>
                <p>
                  {r.value} onaylı
                  {r.cancelled > 0 && (
                    <span className="text-[--red-1]"> · {r.cancelled} iptal</span>
                  )}
                </p>
                <p className="text-[--gr-1]">
                  {price(r.revenue)} ₺ · %{Math.round(r.share)}
                </p>
              </>
            )}
          />
        </div>

        <div>
          <p className="pb-2 text-sm font-medium text-[--black-1]">
            Ödeme Türleri
          </p>
          <Bars
            max={payMax}
            rows={report.paymentKinds.map((p) => ({
              key: p.paymentKind,
              label: p.name,
              value: p.orderCount,
              share: p.share,
            }))}
            valueFormatter={(r) => `${r.value} · %${Math.round(r.share)}`}
          />
        </div>

        <div>
          <p className="pb-2 text-sm font-medium text-[--black-1]">
            Günlere Göre{" "}
            <span className="text-xs font-normal text-[--gr-1]">
              · dönemde kaç kez geçtiği parantezde
            </span>
          </p>
          <Bars
            max={weekdayMax}
            rows={report.weekdays.map((w) => ({
              key: w.dayOfWeek,
              // "Çarşamba" alone doesn't say which dates it covers.
              label: `${w.name}${
                weekdayDates[w.dayOfWeek]?.length
                  ? ` (${weekdayDates[w.dayOfWeek].length})`
                  : ""
              }`,
              title: weekdayDates[w.dayOfWeek]?.join(", "),
              value: w.orderCount,
            }))}
            valueFormatter={(r) =>
              `${r.value} · %${pct(r.value, report.orderCount)}`
            }
          />
        </div>

        <div>
          <p className="pb-2 text-sm font-medium text-[--black-1]">
            Saatlere Göre
          </p>
          <Bars
            max={hourMax}
            rows={activeHours.map((h) => ({
              key: h.hour,
              label: `${String(h.hour).padStart(2, "0")}:00–${String(
                (h.hour + 1) % 24,
              ).padStart(2, "0")}:00`,
              value: h.orderCount,
            }))}
            valueFormatter={(r) =>
              `${r.value} · %${pct(r.value, report.orderCount)}`
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 pt-5">
        <div>
          <p className="pb-2 text-sm font-medium text-[--black-1]">
            İndirim Finansmanı{" "}
            <span className="text-xs font-normal text-[--gr-1]">
              · toplam {price(report.discountTotal)} ₺
            </span>
          </p>
          <Bars
            max={Math.max(
              report.discountPlatform,
              report.discountRestaurant,
              1,
            )}
            rows={[
              {
                key: "platform",
                label: "Pazaryeri karşıladı",
                value: report.discountPlatform,
              },
              {
                key: "restaurant",
                label: "Siz karşıladınız",
                value: report.discountRestaurant,
                color: "var(--green-1)",
              },
            ]}
            valueFormatter={(r) =>
              `${price(r.value)} ₺ · %${pct(r.value, report.discountTotal)}`
            }
          />
        </div>
        <div>
          <p className="pb-2 text-sm font-medium text-[--black-1]">Müşteri</p>
          <div className="grid grid-cols-2 gap-3">
            <Kpi label="Farklı Müşteri" value={report.uniqueCustomers} />
            <Kpi
              label="Tekrar Eden"
              value={`%${report.repeatCustomerRate}`}
              note={`${report.repeatCustomers} müşteri`}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

const ReportsPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.reports.getUserReport,
  );

  const [periodType, setPeriodType] = useState(1);
  const [range, setRange] = useState({ start: "", end: "" });
  const [report, setReport] = useState(null);
  const [failed, setFailed] = useState(false);

  // The account-level payload carries no cancelled figure; sum the
  // restaurants so the two-category split holds here too.
  const accountCancelled = (report?.restaurants || []).reduce(
    (sum, r) => sum + (r.cancelledCount || 0),
    0,
  );

  function fetchReport(type, customRange) {
    setFailed(false);
    if (type === "custom") {
      if (!customRange.start || !customRange.end) return;
      dispatch(
        getUserReport({
          startDate: formatDate(customRange.start),
          endDate: formatDate(customRange.end),
        }),
      );
      return;
    }
    dispatch(getUserReport({ periodType: type }));
  }

  useEffect(() => {
    fetchReport(1, range);
  }, []);

  useEffect(() => {
    if (data) {
      setReport(data);
      dispatch(resetGetUserReport());
    }
    if (error) {
      setFailed(true);
      dispatch(resetGetUserReport());
    }
  }, [data, error]);

  return (
    <section className="pt-20 sm:pt-[5.25rem] px-[4%] pb-5 min-h-0">
      <div className="flex flex-col gap-4 py-4">
        {/* Period picker */}
        <main className="w-full p-5 bg-[--white-1] rounded-xl border border-solid border-[--border-1] shadow-card">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-full border border-solid border-[--border-1] p-0.5">
              {PERIODS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPeriodType(p.id);
                    if (p.id !== "custom") fetchReport(p.id, range);
                  }}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                    periodType === p.id
                      ? "bg-[--primary-1] text-white"
                      : "text-[--gr-1] hover:text-[--black-1]",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {periodType === "custom" && (
              <div className="flex flex-wrap items-end gap-3">
                <CustomDatePicker
                  label="Başlangıç"
                  className="text-sm sm:mt-1 w-40"
                  value={range.start}
                  onChange={(d) => setRange((prev) => ({ ...prev, start: d }))}
                />
                <CustomDatePicker
                  label="Bitiş"
                  className="text-sm sm:mt-1 w-40"
                  value={range.end}
                  onChange={(d) => setRange((prev) => ({ ...prev, end: d }))}
                />
                <button
                  type="button"
                  disabled={!range.start || !range.end}
                  onClick={() => fetchReport("custom", range)}
                  className={cn(TOOLBAR_BTN_PRIMARY, "h-10")}
                >
                  Raporu Getir
                </button>
              </div>
            )}
          </div>

          {report && (
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 pt-5">
              <Kpi
                label="Dönem"
                value={report.periodLabel}
                note={`${dayRange(report.periodStart, report.periodEnd)} · ${
                  report.restaurants?.length || 0
                } restoran`}
              />
              <Kpi
                label="Onaylanan Sipariş"
                value={report.orderCount - accountCancelled}
                percent={report.orderCountChangePercent}
                note={`toplam ${report.orderCount} sipariş`}
              />
              <Kpi
                label="İptal Edilen"
                value={accountCancelled}
                note={`%${
                  report.orderCount
                    ? ((accountCancelled / report.orderCount) * 100).toFixed(1)
                    : 0
                } iptal oranı`}
              />
              <Kpi
                label="Toplam Ciro"
                value={`${price(report.revenue)} ₺`}
                percent={report.revenueChangePercent}
                note={`Önceki dönem ${price(report.previousRevenue)} ₺`}
              />
            </div>
          )}
        </main>

        {loading && !report && (
          <main className="w-full p-16 bg-[--white-1] rounded-xl border border-solid border-[--border-1] text-center text-sm text-[--gr-1]">
            Rapor hazırlanıyor...
          </main>
        )}

        {failed && (
          <main className="w-full p-16 bg-[--white-1] rounded-xl border border-solid border-[--border-1] text-center text-sm text-[--gr-1]">
            Rapor alınamadı. Lütfen tekrar deneyin.
          </main>
        )}

        {report?.restaurants?.map((r) => (
          <RestaurantReport key={r.restaurantId} report={r} />
        ))}

        {report && !report.restaurants?.length && !loading && (
          <main className="w-full bg-[--white-1] rounded-xl border border-solid border-[--border-1] py-10">
            <NoTableData
              title="Bu dönemde veri yok"
              text="Seçtiğiniz dönemde sipariş bulunmuyor."
            />
          </main>
        )}
      </div>
    </section>
  );
};

export default ReportsPage;

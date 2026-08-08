//MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomSelector from "../common/customSelector";

//UTILS
import years from "../../enums/years";
import months from "../../enums/months";
import MarketPalceIds from "../../enums/marketPlaceIds";
import { formatSelectorData, formatToPrice } from "../../utils/utils";

//REDUX
import {
  getOrderStatistics,
  resetGetOrderStatistics,
} from "../../redux/dashboard/statistics/getOrderStatisticsSlice";
import {
  getRestaurants,
  resetGetRestaurants,
} from "../../redux/restaurants/getRestaurantsSlice";

// onTotalsChange lifts the KPI figures up to the dashboard page. The order
// statistics slice is already consumed-and-reset by both this chart and the
// donut, so deriving the totals here (the component that owns the fetch and
// the filters) avoids adding a third racing consumer — and it means the
// KPIs follow the chart's restaurant/year/month filter.
const SalesBar = ({ onTotalsChange }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard.getOrderStatistics);
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  const [salesData, setSalesData] = useState(null);
  // null = not fetched yet; [] = fetched and empty. The old initial value of
  // [] plus a "!length" fetch guard meant an account with no restaurants
  // refetched forever (~10 req/s): every empty response re-armed the guard.
  const [restaurantsData, setRestaurantsData] = useState(null);
  const [filterData, setFilterData] = useState({
    restaurantId: null,
    year: "",
    month: "",
    selectedYear: { label: "Yıl" },
    selectedMonth: { label: "Ay" },
    selectedRestaurant: { label: "Hepsi" },
  });

  function handleFilter(inData) {
    dispatch(getOrderStatistics(inData));
  }

  //GET STAT DATA
  useEffect(() => {
    if (!salesData) {
      dispatch(getOrderStatistics({}));
    }
  }, [salesData]);

  //SET STAT DATA
  useEffect(() => {
    function format(price) {
      return formatToPrice(String(price.toFixed(1)).replace(".", ","));
    }

    if (data) {
      const salesSum = data.reduce((sum, stat) => sum + stat.approvedAmount, 0);
      const updatedData = data.map((stat) => {
        return {
          ...stat,
          // keep the raw number: bar heights and the axis scale off it
          approvedValue: stat.approvedAmount,
          approvedAmount: format(stat.approvedAmount),
          rejectedAmount: format(stat.rejectedAmount),
          percent: salesSum ? (stat.approvedAmount / salesSum) * 100 : 0,
        };
      });
      setSalesData(updatedData);
      onTotalsChange?.({
        // totalCount (not approvedCount) so the KPI agrees with the donut
        // and the restaurants table, which both count every order.
        orders: data.reduce((sum, s) => sum + (s.totalCount || 0), 0),
        revenue: salesSum,
      });
      dispatch(resetGetOrderStatistics());
    }
  }, [data]);

  //GET RESTAURANTS
  useEffect(() => {
    if (!restaurantsData) {
      // Real pagination params: GetRestaurants treats the 0/0 defaults as
      // "page zero of size zero" and returns an empty list, not "all".
      dispatch(getRestaurants({ pageNumber: 1, pageSize: 100 }));
    }
  }, [restaurantsData]);

  //SET RESTAURANTS
  useEffect(() => {
    if (restaurants) {
      setRestaurantsData(formatSelectorData(restaurants.data, false));
      dispatch(resetGetRestaurants());
    }
  }, [restaurants]);

  // Bars scale against the largest value in the CURRENT dataset, so the
  // tallest bar fills the plot. (This used to scale against a hardcoded
  // TotalSales fixture, which only lined up by coincidence.)
  const maxValue = salesData?.length
    ? Math.max(...salesData.map((s) => s.approvedValue || 0))
    : 0;

  function barHeight(value) {
    if (!maxValue) return 0;
    // floor at 2% so a non-zero marketplace is still visible
    return Math.max((value / maxValue) * 100, value > 0 ? 2 : 0);
  }

  // Axis ticks are real amounts derived from the max, not bare percentages.
  // Six ticks keeps the existing gridline rhythm.
  const axisTicks = [1, 0.8, 0.6, 0.4, 0.2, 0].map((f) =>
    formatToPrice(String(Math.round(maxValue * f)))
  );

  return (
    <main className="w-full p-5 bg-[--white-1] rounded-xl border border-solid border-[--border-1] shadow-card max-md:overflow-x-auto">
      <div className="flex flex-col gap-2.5 w-full min-w-0">
        <main className="flex w-full justify-between items-center gap-4 z-[51] relative">
          <h2 className="text-base font-semibold whitespace-nowrap text-[--black-1]">
            Toplam Satış
          </h2>
          <div className="flex justify-end gap-2">
            <CustomSelector
              value={filterData.selectedRestaurant}
              options={[{ label: "Hepsi", value: "" }, ...(restaurantsData || [])]}
              onChange={(selectedOption) => {
                const updatedData = {
                  ...filterData,
                  restaurantId: selectedOption?.id || "",
                  selectedRestaurant: selectedOption,
                };
                setFilterData(updatedData);
                handleFilter(updatedData);
              }}
              className2="mt-[0] sm:mt-[0] w-48"
              className="mt-[0] sm:mt-[0]"
            />
            <CustomSelector
              options={[{ label: "Hepsi", value: "" }, ...years]}
              value={filterData.selectedYear}
              onChange={(selectedOption) => {
                const updatedData = {
                  ...filterData,
                  year: selectedOption.value,
                  selectedYear: selectedOption,
                };
                setFilterData(updatedData);
                handleFilter(updatedData);
              }}
              className2="mt-[0] sm:mt-[0] w-28"
              className="mt-[0] sm:mt-[0]"
            />
            <CustomSelector
              options={[{ label: "Hepsi", value: "" }, ...months]}
              value={filterData.selectedMonth}
              onChange={(selectedOption) => {
                const updatedData = {
                  ...filterData,
                  month: selectedOption.value,
                  selectedMonth: selectedOption,
                };
                setFilterData(updatedData);
                handleFilter(updatedData);
              }}
              className2="mt-[0] sm:mt-[0] w-28"
              className="mt-[0] sm:mt-[0]"
            />
          </div>
        </main>

        {/* Axis column + plot are siblings, and the bar row and label row
            share identical flex geometry — that is what keeps marketplace
            names centred under their bars regardless of axis label width
            (they used to be a separate row with a guessed pl-8 offset). */}
        <div className="flex gap-3 pt-8">
          <div className="flex flex-col justify-between h-[200px] shrink-0 text-xs text-[--gr-1] text-right tabular-nums whitespace-nowrap">
            {axisTicks.map((tick, index) => (
              <span key={index} className="leading-none">
                {tick}
              </span>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            <div className="relative h-[200px]">
              <div className="absolute inset-0 flex flex-col justify-between">
                {axisTicks.map((_, i) => (
                  <span
                    key={i}
                    className="w-full border-t border-dashed border-[--border-1]"
                  />
                ))}
              </div>

              <div className="relative h-full flex items-end justify-center gap-6 sm:gap-10 px-2">
                {salesData &&
                  salesData.map((sales, index) => {
                    const h = barHeight(sales.approvedValue);
                    return (
                      <div
                        key={index}
                        className="group relative flex-1 max-w-[6.5rem] h-full"
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-[--primary-1] rounded-t-md transition-[filter] duration-200 group-hover:brightness-110"
                          style={{ height: `${h}%` }}
                        />
                        <span
                          className="absolute left-0 right-0 text-center text-xs font-medium text-[--black-2] whitespace-nowrap transition-opacity group-hover:opacity-0"
                          style={{ bottom: `calc(${h}% + 0.375rem)` }}
                        >
                          {sales.approvedAmount}
                        </span>
                        <div
                          className="absolute left-1/2 -translate-x-1/2 z-30 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
                          style={{ bottom: `calc(${h}% + 0.375rem)` }}
                        >
                          <ToolTip data={sales} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="flex justify-center gap-6 sm:gap-10 px-2 mt-2">
              {salesData &&
                salesData.map((sales, index) => (
                  <p
                    key={index}
                    className="flex-1 max-w-[6.5rem] text-center text-xs text-[--gr-1] truncate"
                  >
                    {MarketPalceIds[sales.marketplaceId]?.label}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SalesBar;

function ToolTip({ data }) {
  return (
    <div className="relative flex items-center justify-center -mt-3 z-50">
      <div className="bg-[--white-1] text-[--black-2] whitespace-nowrap text-xs px-2.5 py-1.5 rounded-lg shadow-dropdown border border-[--border-1]">
        <p className="text-[--green-1] flex gap-1 justify-between">
          <span>Onaylanmış: {data.approvedAmount}</span>
          <span className="text-[--primary-1]">({data.approvedCount})</span>
        </p>
        <p className="text-[--red-1] flex gap-1 justify-between">
          <span>Reddedilmiş: {data.rejectedAmount}</span>
          <span className="text-[--primary-1]">({data.rejectedCount})</span>
        </p>
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-[--primary-1]"></div>
      </div>
    </div>
  );
}

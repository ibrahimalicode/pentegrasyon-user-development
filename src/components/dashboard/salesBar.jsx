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

const SalesBar = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard.getOrderStatistics);
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  const [salesData, setSalesData] = useState(null);
  const [restaurantsData, setRestaurantsData] = useState([]);
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
      dispatch(resetGetOrderStatistics());
    }
  }, [data]);

  //GET RESTAURANTS
  useEffect(() => {
    if (!restaurantsData?.length) {
      dispatch(getRestaurants({}));
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
      <div className="flex flex-col gap-2.5 w-full min-w-[36rem]">
        <main className="flex w-full justify-between items-center gap-4 z-[51] relative">
          <h2 className="text-base font-semibold whitespace-nowrap text-[--black-1]">
            Toplam Satış
          </h2>
          <div className="flex justify-end gap-2">
            <CustomSelector
              value={filterData.selectedRestaurant}
              options={[{ label: "Hepsi", value: "" }, ...restaurantsData]}
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

        <main className="w-full flex pt-6 relative">
          <div className="flex flex-col gap-6 text-[--gr-1] text-sm text-right tabular-nums whitespace-nowrap">
            {axisTicks.map((tick, index) => (
              <p key={index} className="leading-5">
                {tick}
              </p>
            ))}
          </div>

          <div className="flex z-50 w-full pt-2.5 text-[--black-1]">
            {salesData &&
              salesData.map((sales, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 items-center justify-end pl-4 w-[6rem]"
                >
                  <div className="w-max h-full flex items-end relative group">
                    <div
                      className="w-12 h-full bg-[--primary-1] rounded-t-md relative transition-[filter] duration-200 group-hover:brightness-110"
                      style={{
                        zIndex: (salesData.length - index) * 10,
                        maxHeight: `${barHeight(sales.approvedValue)}%`,
                      }}
                    >
                      <div className="absolute -top-10 left-0 right-0 min-w-full flex justify-center opacity-0 group-hover:opacity-100 transition-all ease-in">
                        <ToolTip data={sales} />
                      </div>
                      <div className="absolute -top-5 left-0 right-0 min-w-full text-center text-xs group-hover:opacity-0">
                        {sales.approvedAmount}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="absolute top-0 left-0 h-full w-full flex flex-col pt-[25px] gap-6 px-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-full flex items-center h-5 last:items-end"
              >
                <span
                  className={`w-full h-1 border-b`}
                  style={{
                    borderImage: `repeating-linear-gradient(to right, var(--gr-5), var(--gr-5), transparent 6px, transparent 10px) 1 / 1 / 0 stretch`,
                  }}
                ></span>
              </div>
            ))}
          </div>
        </main>

        <main className="flex  pl-8  w-max">
          {salesData &&
            salesData.map((sales, index) => (
              <p
                key={index}
                className="w-[6rem] h-max py-2 text-[--gr-1] text-center whitespace-nowrap text-xs"
              >
                {MarketPalceIds[sales.marketplaceId]?.label}
              </p>
            ))}
        </main>
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

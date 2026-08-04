import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { formatToPrice } from "../../utils/utils";

//REDUX
import {
  getRestaurantSalesStatistics,
  resetGetRestaurantSalesStatistics,
} from "../../redux/dashboard/restaurant/getRestaurantSalesStatisticsSlice";
import TableSkeleton from "../common/tableSkeleton";
import {
  TABLE,
  TABLE_CARD,
  TABLE_SCROLL,
  TD,
  TH,
  THEAD_ROW,
  TR,
} from "../common/tableStyles";
import { cn } from "../../lib/utils";

const RestaurantsTable = () => {
  const dispatch = useDispatch();
  const [restaurantsData, setRestaurantsData] = useState(null);
  const { error, data, loading } = useSelector(
    (state) => state.dashboard.restaurantSales
  );

  useEffect(() => {
    if (!restaurantsData) {
      dispatch(getRestaurantSalesStatistics());
    }
  }, [restaurantsData]);

  useEffect(() => {
    if (error) {
      //pass
    } else if (data) {
      setRestaurantsData(data);
      dispatch(resetGetRestaurantSalesStatistics());
    }
  }, [error, data]);

  return (
    <main className={cn(TABLE_CARD, "w-full")}>
      {restaurantsData && !loading ? (
        <div className={TABLE_SCROLL}>
          <table className={cn(TABLE, "max-sm:min-w-[30rem]")}>
            <thead>
              <tr className={THEAD_ROW}>
                <th className={TH}>Restoran Adı</th>
                <th className={cn(TH, "text-center")}>Toplam Satış</th>
                <th className={cn(TH, "text-center")}>Toplam Tutarı</th>
                <th className={cn(TH, "text-right")}>İl</th>
              </tr>
            </thead>

            <tbody>
              {restaurantsData.map((rest, index) => (
                <tr key={index} className={TR}>
                  <td className={TD}>{rest.restaurantName}</td>
                  <td className={cn(TD, "text-center")}>{rest.totalCount}</td>
                  <td className={cn(TD, "text-center")}>
                    {formatToPrice(String(rest.totalAmount).replace(".", ","))}
                  </td>
                  <td className={cn(TD, "text-right")}>{rest.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <TableSkeleton row={3} headerClass="h-14" />
      )}
    </main>
  );
};

export default RestaurantsTable;

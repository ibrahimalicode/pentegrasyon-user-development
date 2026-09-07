import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//CONTEXT
import { useFirestore } from "../../context/FirestoreContext";

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
  const { ordersVersion } = useFirestore();
  const [restaurantsData, setRestaurantsData] = useState(null);
  const { error, data, loading } = useSelector(
    (state) => state.dashboard.restaurantSales
  );

  useEffect(() => {
    if (!restaurantsData) {
      dispatch(getRestaurantSalesStatistics());
    }
  }, [restaurantsData]);

  // Live: approved/cancelled figures follow order events.
  useEffect(() => {
    if (ordersVersion > 0) dispatch(getRestaurantSalesStatistics());
  }, [ordersVersion]);

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
                <th className={cn(TH, "text-center")}>Onaylanan Satış</th>
                <th className={cn(TH, "text-center")}>Onaylanan Tutar</th>
                <th className={cn(TH, "text-center")}>İptal Edilen Satış</th>
                <th className={cn(TH, "text-center")}>İptal Edilen Tutar</th>
                <th className={cn(TH, "text-right")}>İl</th>
              </tr>
            </thead>

            <tbody>
              {restaurantsData.map((rest, index) => (
                <tr key={index} className={TR}>
                  <td className={TD}>{rest.restaurantName}</td>
                  <td className={cn(TD, "text-center")}>
                    {rest.approvedCount}
                  </td>
                  {/* The endpoint's totalAmount IS the approved amount
                      (backend sums ApprovedAmount into it). */}
                  <td className={cn(TD, "text-center")}>
                    {formatToPrice(String(rest.totalAmount).replace(".", ","))}
                  </td>
                  <td className={cn(TD, "text-center text-[--red-1]")}>
                    {rest.rejectedCount}
                  </td>
                  {/* rejectedAmount is not projected by the endpoint yet;
                      lights up automatically once the backend adds it. */}
                  <td className={cn(TD, "text-center text-[--red-1]")}>
                    {rest.rejectedAmount != null
                      ? formatToPrice(
                          String(rest.rejectedAmount).replace(".", ","),
                        )
                      : "—"}
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

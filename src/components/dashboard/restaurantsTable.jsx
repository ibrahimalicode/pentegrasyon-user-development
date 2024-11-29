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
    <main className="w-full bg-[--white-1] rounded-md max-sm:overflow-x-scroll">
      {restaurantsData && !loading ? (
        <main className="h-max pb-4 px-2 sm:px-9 border-2 border-solid border-[--light-1]">
          <table className="w-full text-center text-sm max-sm:min-w-[26rem]">
            <thead>
              <tr className="text-[--gr-1] font-light">
                <th className="font-light py-5 border-b border-solid border-[--light-1] text-start">
                  Restoran Adı
                </th>
                <th className="font-light py-5 border-b border-solid border-[--light-1]">
                  Toplam Satış
                </th>
                <th className="font-light py-5 border-b border-solid border-[--light-1]">
                  Toplam Tutarı
                </th>
                <th className="font-light py-5 border-b border-solid border-[--light-1] text-end">
                  İl
                </th>
              </tr>
            </thead>

            <tbody>
              {restaurantsData.map((rest, index) => (
                <tr key={index}>
                  <td className="py-3.5 text-start">{rest.restaurantName}</td>
                  <td className="py-3.5">{rest.totalCount}</td>
                  <td className="py-3.5">
                    {formatToPrice(String(rest.totalAmount).replace(".", ","))}
                  </td>
                  <td className="py-3.5 text-end">{rest.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      ) : (
        <TableSkeleton row={3} headerClass="h-14" />
      )}
    </main>
  );
};

export default RestaurantsTable;

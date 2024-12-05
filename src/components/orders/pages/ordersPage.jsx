//MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import OrdersTable from "../ordersTable";
import SearchOrders from "../components/searchOrders";
import FilterOrders from "../components/filterOrders";
import OnTheWayTime from "../components/onTheWayTime";
import DeliveryTime from "../components/deliveryTime";
import CustomPagination from "../../common/pagination";
import TableSkeleton from "../../common/tableSkeleton";
import CustomSelect from "../../common/customSelector";
import OrdersTotalPrice from "../components/ordersTotalPrice";
import AutomaticApproval from "../components/automaticApproval";
import RestaurantsStatus from "../components/restaurantsStatus";
import NoOrdersPlaceholder from "../components/noOrdersPlaceholder";

// REDUX
import { getOnTheWayTimeVariable } from "../../../redux/orders/getOnTheWayTimeVariableSlice";
import { getDeliveryTimeVariable } from "../../../redux/orders/getDeliveryTimeVariableSlice";

//UTILS
import { useOrdersContext } from "../../../context/OrdersContext";

const OrdersPage = () => {
  const dispatch = useDispatch();

  const {
    itemsPerPage,
    handleItemsPerPage,
    ordersData,
    setOrdersData,
    pageNumber,
    setPageNumber,
    totalItems,
    setTotalItems,
    handlePageChange,
  } = useOrdersContext();

  const { loading } = useSelector((state) => state.orders.get);

  const [onTheWayTimeData, setOnTheWayTimeData] = useState({
    label: "Zaman Seç",
  });
  const [deliveryTimeData, setDeliveryTimeData] = useState({
    label: "Zaman Seç",
  });
  const pageNumbers = () => {
    const numbersColl = [];
    for (let i = 20; i < 101; i++) {
      numbersColl.push({ label: `${i}`, value: i });
    }
    return numbersColl;
  };

  //GET ON THE WAY
  useEffect(() => {
    if (!onTheWayTimeData?.onTheWayTime) {
      dispatch(getOnTheWayTimeVariable());
    }
  }, [onTheWayTimeData]);

  //GET DELIVERY TIME
  useEffect(() => {
    if (!deliveryTimeData?.deliveryTime) {
      dispatch(getDeliveryTimeVariable());
    }
  }, [deliveryTimeData]);

  return (
    <section className="pt-20 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row max-h-screen">
      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2 min-h-max">
        <SearchOrders />
        <main className="flex items-end gap-4 max-sm:flex-col max-sm:w-full max-sm:items-start">
          <div className="flex gap-2 max-sm:mt-3">
            <RestaurantsStatus />
            <AutomaticApproval ordersData={ordersData} />
          </div>

          <main className="flex items-end gap-4 max-sm:w-full max-sm:justify-between">
            <div className="flex gap-2 max-sm:w-full">
              <OnTheWayTime
                onTheWayTimeData={onTheWayTimeData}
                setOnTheWayTimeData={setOnTheWayTimeData}
                deliveryTimeData={deliveryTimeData}
              />
              <DeliveryTime
                deliveryTimeData={deliveryTimeData}
                setDeliveryTimeData={setDeliveryTimeData}
                onTheWayTimeData={onTheWayTimeData}
              />
              <OrdersTotalPrice orders={ordersData} />
            </div>

            <FilterOrders pageNumber={pageNumber} itemsPerPage={itemsPerPage} />
          </main>
        </main>
      </div>

      {/* TABLE */}
      {ordersData && !loading ? (
        <OrdersTable
          ordersData={ordersData}
          setOrdersData={setOrdersData}
          onSuccess={() => setOrdersData(null)}
        />
      ) : loading ? (
        <TableSkeleton row={11} />
      ) : (
        <NoOrdersPlaceholder />
      )}

      {/* PAGINATION */}
      {ordersData && typeof totalItems === "number" && (
        <div className="w-full self-end flex justify-center pt-4 text-[--black-2]">
          <div className="scale-[.8]">
            <CustomSelect
              className="mt-[0] sm:mt-[0]"
              className2="mt-[0] sm:mt-[0]"
              menuPlacement="top"
              value={itemsPerPage}
              options={pageNumbers()}
              onChange={(option) => {
                handleItemsPerPage(option.value);
              }}
            />
          </div>
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemsPerPage={itemsPerPage.value}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default OrdersPage;

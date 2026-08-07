//MODULES
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//COMP
import OrdersTable from "../ordersTable";
import OrdersCount from "../components/ordersCount";
import SearchOrders from "../components/searchOrders";
import FilterOrders from "../components/filterOrders";
import OnTheWayTime from "../components/onTheWayTime";
import DeliveryTime from "../components/deliveryTime";
import CustomPagination from "../../common/pagination";
import TableSkeleton from "../../common/tableSkeleton";
import CustomSelect from "../../common/customSelector";
import OrdersTotalPrice from "../components/ordersTotalPrice";
import AutomaticApproval from "../components/automaticApproval";
import RestaurantsStatus, {
  ClosedRestaurantsBanner,
} from "../components/restaurantsStatus";
import NoOrdersPlaceholder from "../components/noOrdersPlaceholder";

// REDUX
import {
  getAutomationVariables,
  resetGetAutomationVariables,
} from "../../../redux/orders/getAutomationVariablesSlice";

//UTILS
import { cn } from "../../../lib/utils";
import { TOOLBAR_ROW } from "../../common/toolbarStyles";
import { useFirestore } from "../../../context/FirestoreContext";
import { useOrdersContext } from "../../../context/OrdersContext";
import {
  getLicenses,
  resetGetLicensesState,
} from "../../../redux/licenses/getLicensesSlice";
import { getRestaurants } from "../../../redux/restaurants/getRestaurantsSlice";
import {
  getCouriers,
  resetGetCouriersState,
} from "../../../redux/couriers/getCouriersSlice";

const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { automaticApprovalDatas, setAutomaticApprovalDatas } = useFirestore();

  const {
    itemsPerPage,
    handleItemsPerPage,
    ordersData,
    setOrdersData,
    pageNumber,
    setPageNumber,
    totalItems,
    handlePageChange,
  } = useOrdersContext();

  const { loading } = useSelector((state) => state.orders.get);

  const { data, error } = useSelector(
    (state) => state.orders.getAutomationVariables,
  );
  const {
    success,
    licenses,
    error: licensesError,
  } = useSelector((state) => state.licenses.getLicenses);

  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants,
  );

  const { error: couriersError, couriers } = useSelector(
    (state) => state.couriers.get,
  );

  const [couriersData, setCouriersData] = useState(null);
  const [licensesData, setLicensesData] = useState(null);
  const [automationDatas, setAutomationDatas] = useState(null);
  // Lifted out of RestaurantsStatus so the alert can render above the table
  // instead of floating over its first row.
  const [closedInfo, setClosedInfo] = useState({ closed: [], openPanel: null });
  const hasCourier = couriersData?.length > 0;
  const hasCourierLicense =
    licensesData?.filter((L) => L.licenseTypeId === 7 || L.licenseTypeId === 8)
      .length > 0;
  const canSelectCourier = hasCourier && hasCourierLicense;

  const pageNumbers = () => {
    const numbersColl = [];
    for (let i = 20; i < 101; i += 5) {
      numbersColl.push({ label: `${i}`, value: i });
    }
    return numbersColl;
  };

  //GET AUTOMATION DATAS
  useEffect(() => {
    if (!automationDatas) {
      dispatch(getAutomationVariables());
    }
  }, [automationDatas]);

  //GET RESTAURANTS
  useEffect(() => {
    //GET RESTAURANTS
    if (!restaurants) {
      dispatch(
        getRestaurants({
          pageNumber: 1,
          pageSize: 2,
        }),
      );
      // console.log("Distaptch Get Restaurants");
    }
  }, [restaurants]);

  //GET LICENSES
  useEffect(() => {
    if (restaurants?.data) {
      if (!(restaurants.data?.length > 0)) {
        navigate("/restaurants");
        return;
      } else {
        //GET LICENSES
        if (!licensesData) {
          dispatch(
            getLicenses({
              pageNumber: 0,
              pageSize: 0,
            }),
          );
        }
      }
    }
  }, [licensesData, restaurants]);

  //GET COURIERS DATA
  useEffect(() => {
    if (!couriersData) {
      dispatch(getCouriers());
    }
  }, [couriersData]);

  //SET LICENSES DATA
  useEffect(() => {
    if (success) {
      if (licenses?.data) {
        if (!(licenses.data?.length > 0)) {
          navigate("/licenses");
        }
        setLicensesData(licenses.data);
        dispatch(resetGetLicensesState());
      }
    } else if (licensesError) {
      navigate("/licenses");
      dispatch(resetGetLicensesState());
    }
  }, [licenses, success, licensesError]);

  //SET COURIERS DATA
  useEffect(() => {
    if (couriers) {
      if (couriers?.data) {
        setCouriersData(couriers.data);
        dispatch(resetGetCouriersState());
      }
    } else if (couriersError) {
      dispatch(resetGetCouriersState());
    }
  }, [couriers, couriersError]);

  //TOAST AND SET DATA
  useEffect(() => {
    if (error) dispatch(resetGetAutomationVariables());

    if (data) {
      setAutomationDatas(data.data);
      dispatch(resetGetAutomationVariables());
    }
  }, [data, error]);

  //FIRESTORE
  useEffect(() => {
    if (automaticApprovalDatas) {
      setAutomationDatas(automaticApprovalDatas);
      setAutomaticApprovalDatas(null);
    }
  }, [automaticApprovalDatas]);

  // console.log(licensesData.filter((L) => L.isSettingsAdded));

  return (
    // The fixed header is h-16 (64px), so the old sm:pt-16 put the toolbar
    // flush against it — 5.25rem leaves a 20px gutter below the header.
    // Flex column at viewport height instead of the section_row grid: the
    // table area absorbs the slack (and scrolls internally), so the
    // pagination sits at the bottom of the screen even when the page holds
    // only a handful of orders.
    <section className="pt-20 sm:pt-[5.25rem] px-[4%] pb-4 flex flex-col h-dvh bg-[--white-1]">
      {/* ACTIONS/BUTTONS
          One flat wrapping row instead of nested fixed-width groups: the
          search now sits inline with the controls on wide screens, and on a
          phone every control wraps onto the next line instead of being forced
          side by side and overflowing the viewport horizontally. */}
      <div className={cn(TOOLBAR_ROW, "w-full mb-4")}>
        <SearchOrders />

        <RestaurantsStatus
          licenses={licensesData}
          onClosedChange={setClosedInfo}
        />
        <AutomaticApproval
          ordersData={ordersData}
          automationDatas={automationDatas}
          setAutomationDatas={setAutomationDatas}
        />

        <OrdersCount />
        <OnTheWayTime
          automationDatas={automationDatas}
          setAutomationDatas={setAutomationDatas}
        />
        <DeliveryTime
          automationDatas={automationDatas}
          setAutomationDatas={setAutomationDatas}
        />
        <OrdersTotalPrice orders={ordersData} />

        <FilterOrders licenses={licensesData} />
      </div>

      {/* Closed-restaurant alert sits in the flow so it never covers an order */}
      <ClosedRestaurantsBanner
        closed={closedInfo.closed}
        onOpen={closedInfo.openPanel}
      />

      {/* TABLE — flex-1 min-h-0 hands the table the leftover viewport space
          so it scrolls internally while the pagination stays put below. */}
      <div className="flex-1 min-h-0">
        {ordersData?.length && licensesData && !loading ? (
          <OrdersTable
            licenses={licensesData}
            ordersData={ordersData}
            hasCourier={hasCourier}
            setOrdersData={setOrdersData}
            canSelectCourier={canSelectCourier}
            hasCourierLicense={hasCourierLicense}
          />
        ) : loading ? (
          <TableSkeleton row={11} />
        ) : (
          <NoOrdersPlaceholder />
        )}
      </div>

      {/* PAGINATION */}
      {ordersData && typeof totalItems === "number" && (
        <div className="w-full shrink-0 text-[--black-2]">
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemsPerPage={itemsPerPage.value}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
            leading={
              // Page size lives in the pagination's left region — it used to
              // sit beside it under a scale-[.8] hack that blurred the text.
              <div className="min-w-20">
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
            }
          />
        </div>
      )}
    </section>
  );
};

export default OrdersPage;

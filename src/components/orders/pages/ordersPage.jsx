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
import RestaurantsStatus from "../components/restaurantsStatus";
import NoOrdersPlaceholder from "../components/noOrdersPlaceholder";

// REDUX
import {
  getAutomationVariables,
  resetGetAutomationVariables,
} from "../../../redux/orders/getAutomationVariablesSlice";

//UTILS
import { useFirestore } from "../../../context/FirestoreContext";
import { useOrdersContext } from "../../../context/OrdersContext";
import {
  getLicenses,
  resetGetLicensesState,
} from "../../../redux/licenses/getLicensesSlice";
import { getRestaurants } from "../../../redux/restaurants/getRestaurantsSlice";
import {
  getCouriers,
  resetgetCouriersState,
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
    (state) => state.orders.getAutomationVariables
  );
  const {
    success,
    licenses,
    error: licensesError,
  } = useSelector((state) => state.licenses.getLicenses);

  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants
  );

  const { error: couriersError, couriers } = useSelector(
    (state) => state.couriers.get
  );

  const [couriersData, setCouriersData] = useState(null);
  const [licensesData, setLicensesData] = useState(null);
  const [automationDatas, setAutomationDatas] = useState(null);
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
        })
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
            })
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
        dispatch(resetgetCouriersState());
      }
    } else if (couriersError) {
      dispatch(resetgetCouriersState());
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

  return (
    <section className="pt-20 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row max-h-screen">
      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2 min-h-max">
        <SearchOrders />
        <main className="flex items-end gap-4 max-sm:flex-col max-sm:w-full max-sm:items-start">
          <div className="flex gap-2 max-sm:mt-3">
            <RestaurantsStatus licenses={licensesData} />
            <AutomaticApproval
              ordersData={ordersData}
              automationDatas={automationDatas}
              setAutomationDatas={setAutomationDatas}
            />
          </div>

          <main className="flex items-end gap-4 max-sm:w-full max-sm:justify-between">
            <div className="flex items-end gap-2 max-sm:w-full">
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
            </div>

            <FilterOrders licenses={licensesData} />
          </main>
        </main>
      </div>

      {/* TABLE */}
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

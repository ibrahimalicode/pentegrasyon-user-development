//MODULES
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import OrdersTable from "../ordersTable";
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import OnTheWayTime from "../components/onTheWayTime";
import DeliveryTime from "../components/deliveryTime";
import CustomPagination from "../../common/pagination";
import TableSkeleton from "../../common/tableSkeleton";
import CustomSelect from "../../common/customSelector";
import AutomaticApproval from "../components/automaticApproval";
import RestaurantsStatus from "../components/restaurantsStatus";
import NoOrdersPlaceholder from "../components/noOrdersPlaceholder";

//SOUND
import getirYemekNewOrderSoundPath from "../../../assets/sound/getiryemekneworder.mp3";
import migrosYemekNewOrderSoundPath from "../../../assets/sound/migrosyemekneworder.mp3";
import trendyolYemekNewOrderSoundPath from "../../../assets/sound/trendyolyemekneworder.mp3";
import yemekSepetiNewOrderSoundPath from "../../../assets/sound/yemeksepetineworder.mp3";
import goFodyNewOrderSoundPath from "../../../assets/sound/gofodyneworder.mp3";
import siparisimPlusNewOrderSoundPath from "../../../assets/sound/siparisimplus.mp3";

const newOrderSounds = [
  new Audio(getirYemekNewOrderSoundPath),
  new Audio(migrosYemekNewOrderSoundPath),
  new Audio(trendyolYemekNewOrderSoundPath),
  new Audio(yemekSepetiNewOrderSoundPath),
  new Audio(goFodyNewOrderSoundPath),
  new Audio(siparisimPlusNewOrderSoundPath),
];

// REDUX
import {
  getOrders,
  resetGetOrdersState,
} from "../../../redux/orders/getOrdersSlice";
import { getOnTheWayTimeVariable } from "../../../redux/orders/getOnTheWayTimeVariableSlice";
import { getDeliveryTimeVariable } from "../../../redux/orders/getDeliveryTimeVariableSlice";

//UTILS
import { formatOrders } from "../../../utils/utils";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSignalR } from "../../../context/SignalRContext";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { newOrder, setNewOrder } = useSignalR();
  const { contentRef, setContentRef } = usePopup();

  const { loading, success, error, orders } = useSelector(
    (state) => state.orders.get
  );

  const [ordersData, setOrdersData] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const [filter, setFilter] = useState({
    date: null,
    status: null,
    MarketPalce: null,
  });
  const [openFilter, setOpenFilter] = useState(false);

  const itemsPerPage = 20;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [onTheWayTimeData, setOnTheWayTimeData] = useState({
    label: "Zaman Seç",
  });
  const [deliveryTimeData, setDeliveryTimeData] = useState({
    label: "Zaman Seç",
  });

  function handlePageChange(number) {
    dispatch(
      getOrders({
        page: number,
        pageSize: itemsPerPage,
      })
    );
  }

  //GET ORDERS
  useEffect(() => {
    if (!ordersData) {
      dispatch(getOrders({ pageNumber, pageSize: itemsPerPage }));
    }
  }, [ordersData]);

  //TOAST AND SET ORDERS
  useEffect(() => {
    if (error) {
      dispatch(resetGetOrdersState());
    }
    if (success) {
      // console.log(orders.data);
      setOrdersData(orders.data);
      setTotalItems(orders.totalCount);
      dispatch(resetGetOrdersState());
    }
  }, [success, error, orders]);

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

  //HIDE POPUP
  const filterOrders = useRef();
  useEffect(() => {
    if (filterOrders) {
      const refs = contentRef.filter((ref) => ref.id !== "ordersFilter");
      setContentRef([
        ...refs,
        {
          id: "ordersFilter",
          outRef: null,
          ref: filterOrders,
          callback: () => setOpenFilter(false),
        },
      ]);
    }
  }, [filterOrders]);

  useEffect(() => {
    if (newOrder) {
      const newOrderSound = newOrderSounds[newOrder.marketplaceId];
      newOrderSound.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });

      if (ordersData) {
        setOrdersData(formatOrders([newOrder, ...ordersData]));
      } else {
        setOrdersData([newOrder]);
      }
      setNewOrder(null);
    }
  }, [newOrder]);

  return (
    <section className="pt-20 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2 min-h-max">
        <div className="flex items-center w-full max-w-80">
          <form className="w-full" onSubmit={() => {}}>
            <CustomInput
              onChange={(e) => {
                setSearchVal(e);
                // !e && clearSearch();
              }}
              value={searchVal}
              placeholder="Ara...Onay kodu veya Müşteri Adı"
              className2="mt-[0px] w-full"
              className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
              icon={<CloseI className="w-4 text-[--red-1]" />}
              className4={`top-[20px] right-2 hover:bg-[--light-4] rounded-full px-2 py-1 ${
                searchVal ? "block" : "hidden"
              }`}
              // iconClick={clearSearch}
            />
          </form>
        </div>
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
              <div className="max-sm:hidden border border-[--light-1] rounded-md py-1 px-2 text-xs flex flex-col gap-2">
                <p>Toplam Tutarı</p>
                <p className=" py-1.5 px-4">15.162,00</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="flex gap-2">
                <div className="w-full relative" ref={filterOrders}>
                  <button
                    className="w-full h-11 flex items-center justify-center text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    Filtre
                  </button>

                  <div
                    className={`absolute right-0 top-12 px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] border border-solid border-[--light-3] rounded-lg drop-shadow-md -drop-shadow-md z-[999] ${
                      openFilter ? "visible" : "hidden"
                    }`}
                  >
                    <div className="flex gap-6">
                      <CustomSelect
                        label="Durum"
                        className="text-sm sm:mt-1"
                        className2="sm:mt-3"
                        style={{ padding: "0 !important" }}
                        options={[
                          { label: "Hepsi", value: null, id: null },
                          { label: "Pending", value: true, id: 0 },
                          { label: "Onaylamış", value: true, id: 1 },
                        ]}
                        value={
                          filter?.status
                            ? filter.status
                            : { value: null, label: "Hepsi" }
                        }
                        onChange={(selectedOption) => {
                          setFilter((prev) => {
                            return {
                              ...prev,
                              status: selectedOption,
                            };
                          });
                        }}
                      />
                      <CustomSelect
                        label="pazaryeri"
                        className="text-sm sm:mt-1"
                        className2="sm:mt-3"
                        style={{ padding: "0 !important" }}
                        options={[
                          { label: "Hepsi", value: null, id: null },
                          { label: "Pending", value: true, id: 0 },
                          { label: "Onaylamış", value: true, id: 1 },
                        ]}
                        value={
                          filter?.status
                            ? filter.status
                            : { value: null, label: "Hepsi" }
                        }
                        onChange={(selectedOption) => {
                          setFilter((prev) => {
                            return {
                              ...prev,
                              status: selectedOption,
                            };
                          });
                        }}
                      />
                    </div>

                    <div className="w-full flex gap-2 justify-center pt-10">
                      <button
                        className="text-[--white-1] bg-[--red-1] py-2 px-12 rounded-lg hover:opacity-90"
                        // onClick={() => handleFilter(false)}
                      >
                        Temizle
                      </button>
                      <button
                        className="text-[--white-1] bg-[--primary-1] py-2 px-12 rounded-lg hover:opacity-90"
                        // onClick={() => handleFilter(true)}
                      >
                        Filtre
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </main>
      </div>

      {/* TABLE */}
      {ordersData ? (
        <OrdersTable
          ordersData={ordersData}
          setOrdersData={setOrdersData}
          onSuccess={() => setOrdersData(null)}
        />
      ) : loading ? (
        <TableSkeleton />
      ) : (
        <NoOrdersPlaceholder />
      )}

      {/* PAGINATION */}
      {ordersData && typeof totalItems === "number" && (
        <div className="w-full self-end flex justify-center pt-4 text-[--black-2]">
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default OrdersPage;

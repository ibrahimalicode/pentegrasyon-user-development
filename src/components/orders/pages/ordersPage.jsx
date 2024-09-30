//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import OrdersTable from "../ordersTable";
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import CustomPagination from "../../common/pagination";
import TableSkeleton from "../../common/tableSkeleton";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";

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

//UTILS
import minutes from "../../../data/minutes";

// REDUX
import {
  getOrders,
  resetGetOrdersState,
} from "../../../redux/orders/getOrdersSlice";
import RestaurantsStatus from "../components/restaurantsStatus";
import { useSignalR } from "../../../context/SignalRContext";
import oneOrder from "../../../data/orderTest";
import { formatOrders } from "../../../utils/utils";
import AutomaticApproval from "../components/automaticApproval";
import OnTheWayTime from "../components/onTheWayTime";
import DeliveryTime from "../components/deliveryTime";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { newOrder, setNewOrder } = useSignalR();
  const { contentRef, setContentRef, setPopupContent } = usePopup();

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

  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  function handlePageChange(number) {}

  useEffect(() => {
    if (!ordersData) {
      dispatch(getOrders());
    }
  }, [ordersData]);

  useEffect(() => {
    if (error) {
      dispatch(resetGetOrdersState());
    }
    if (success) {
      setOrdersData(orders.data);
      dispatch(resetGetOrdersState());
    }
  }, [success, error, orders]);

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
              placeholder="Search..."
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
        <main className="flex items-center gap-4 max-sm:flex-col max-sm:w-full max-sm:items-start">
          <div className="flex gap-2">
            <RestaurantsStatus />
            <AutomaticApproval />
          </div>

          <main className="flex items-end gap-4 max-sm:w-full max-sm:justify-between">
            <div className="flex gap-2 max-sm:w-full">
              <OnTheWayTime />
              <DeliveryTime />
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
                    Filter
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
                        Filter
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  {/* <AddLicense
                onSuccess={() => setOrdersData(null)}
                licenses={ordersData}
              /> */}
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
      ) : true ? (
        <TableSkeleton />
      ) : null}

      {/* PAGINATION */}
      {/* {ordersData && typeof totalItems === "number" && (
        <div className="w-full self-end flex justify-center pt-4 text-[--black-2]">
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
          />
        </div>
      )} */}
    </section>
  );
};

export default OrdersPage;

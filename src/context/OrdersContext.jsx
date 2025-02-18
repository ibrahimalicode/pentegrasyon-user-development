//MODULES
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext, useEffect, useRef, useState } from "react";

//REDUX
import { getOrders, resetGetOrdersState } from "../redux/orders/getOrdersSlice";

//SOUND
import unverifiedOrderPath from "../assets/sound/unverifiedOrder.mp3";

//UTILS
import { getAuth } from "../redux/api";
import { CloseI } from "../assets/icon";
import { usePopup } from "./PopupContext";
import { useFirestore } from "./FirestoreContext";
import { formatByDate, formatDate } from "../utils/utils";
import { getTicketById } from "../redux/orders/getTicketByIdSlice";
import {
  getTicketCountStatistics,
  resetGetTicketCountStatistics,
} from "../redux/dashboard/statistics/getTicketCountStatisticsSlice";

const OrdersContext = createContext();

export const useOrdersContext = () => useContext(OrdersContext);

export const OrdersContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = getAuth()?.token;
  const timeoutRef = useRef(null);
  const { setPopupContent } = usePopup();
  const unverifiedOrderSoundRef = useRef(new Audio(unverifiedOrderPath));

  const { success, error, orders } = useSelector((state) => state.orders.get);
  const { data: countData } = useSelector(
    (state) => state.dashboard.ordersCount
  );
  const { newOrder, setNewOrder, statusChangedOrder, setStatusChangedOrder } =
    useFirestore();

  const filterInitialState = {
    dateRange: 0,
    startDateTime: "",
    endDateTime: "",
    statusId: null,
    status: { label: "Hepsi", value: null },
    marketplaceId: null,
    marketplace: { value: null, label: "Hepsi", id: null },
  };

  const localItemsPerPage = JSON.parse(
    localStorage.getItem("ITEMS_PERPAGE")
  ) || { label: "20", value: 20 };
  const [itemsPerPage, setItemsPerPage] = useState(localItemsPerPage);
  const [ordersData, setOrdersData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [ordersCount, setOrdersCount] = useState(null);
  const [filter, setFilter] = useState(filterInitialState);
  const [unverifiedOrders, setUnverifiedOrders] = useState(false);

  function handlePageChange(number) {
    dispatch(
      getOrders({
        page: number,
        pageSize: itemsPerPage.value,
        dateRange: filter.dateRange,
        startDateTime: filter.endDateTime
          ? formatDate(filter.startDateTime)
          : null,
        endDateTime: filter.endDateTime ? formatDate(filter.endDateTime) : null,
        status: filter.statusId,
        marketplaceId: filter.marketplaceId,
      })
    );
  }

  function handleItemsPerPage(number) {
    dispatch(
      getOrders({
        page: pageNumber,
        pageSize: number,
        dateRange: filter.dateRange,
        startDateTime: filter.endDateTime
          ? formatDate(filter.startDateTime)
          : null,
        endDateTime: filter.endDateTime ? formatDate(filter.endDateTime) : null,
        status: filter.statusId,
        marketplaceId: filter.marketplaceId,
      })
    );
    const localData = { label: `${number}`, value: number };
    localStorage.removeItem("ITEMS_PERPAGE");
    localStorage.setItem("ITEMS_PERPAGE", JSON.stringify(localData));
    setItemsPerPage({ label: `${number}`, value: number });
  }

  function isOrderUnverifiedInDB(order) {
    if (order.status === 325 || order.status === 400 || order.status === 0) {
      dispatch(getTicketById({ ticketId: order.id })).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          const data = res.payload.data;
          if (data.id === order.id && data.status != order.status)
            setStatusChangedOrder(data);
        }
      });
    }
  }

  //GET ORDERS AND COUNT
  useEffect(() => {
    if (!ordersData && token) {
      dispatch(
        getOrders({
          pageNumber,
          pageSize: itemsPerPage.value,
        })
      );
      dispatch(getTicketCountStatistics(filterInitialState));
    }
  }, [ordersData, token]);

  //SET ORDER COUNT
  useEffect(() => {
    if (countData) {
      console.log(countData);
      setOrdersCount(countData);
      dispatch(resetGetTicketCountStatistics());
    }
  }, [countData]);

  //TOAST AND SET ORDERS
  useEffect(() => {
    if (error) {
      dispatch(resetGetOrdersState());
    }
    if (success) {
      setOrdersData(formatByDate(orders.data));
      setTotalItems(orders.totalCount);
      dispatch(resetGetOrdersState());
    }
  }, [success, error, orders]);

  //CHECK FOR UNVERIFIED ORDERS
  useEffect(() => {
    if (ordersData?.length) {
      const hasUnverifiedOrders = ordersData.filter(
        (order) =>
          order.status === 325 || order.status === 400 || order.status === 0
      );
      // console.log(hasUnverifiedOrders[0]);
      setUnverifiedOrders(hasUnverifiedOrders[0]);
    }
    if (statusChangedOrder) {
      setOrdersData((prev) => {
        const updatedOrder = prev.filter((O) => O.id !== statusChangedOrder.id);
        return formatByDate([...updatedOrder, statusChangedOrder]);
      });
      setStatusChangedOrder(null);
    }
  }, [ordersData, statusChangedOrder]);

  //PLAY SOUND FOR UNVERIFIED ORDERS
  useEffect(() => {
    const unverifiedOrderSound = unverifiedOrderSoundRef.current;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    if (audioContext.state === "suspended" && token) {
      const popupContent = (
        <main className="bg-[--white-1] rounded-sm p-5">
          <div className="flex justify-end mb-3">
            <button
              onClick={() => setPopupContent(null)}
              className="text-[--red-1] w-max h-max border border-[--red-1] p-2 rounded-full"
            >
              <CloseI />
            </button>
          </div>
          <p>
            Ses oynatma tarayıcı tarafından engellendi. Pentegrasyon.net&apos;in
            sesi çalmasına izin verin.
          </p>
          <div className="flex justify-end mt-5">
            <button
              onClick={() => setPopupContent(null)}
              className="px-2.5 py-1.5 bg-[--status-green] text-[--green-1] border border-[--green-1] rounded-sm"
            >
              İzin Ver
            </button>
          </div>
        </main>
      );
      setPopupContent(popupContent);
      console.warn(
        "Audio context is suspended due to lack of user interaction."
      );
    }

    if (unverifiedOrders) {
      timeoutRef.current = setTimeout(() => {
        unverifiedOrderSound.loop = true;
        unverifiedOrderSound.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
        isOrderUnverifiedInDB(unverifiedOrders);
        console.log("Sound played");
      }, 4000);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      unverifiedOrderSound.loop = false;
      unverifiedOrderSound.pause();
      unverifiedOrderSound.currentTime = 0;
      console.log("Sound Paused");
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [unverifiedOrders, token]);

  //SET NEW ORDER
  useEffect(() => {
    if (newOrder) {
      setOrdersData((prevOrders) => {
        const existingOrders = prevOrders || [];
        const isDuplicate = existingOrders.some(
          (order) => order.id === newOrder.id
        );
        return isDuplicate
          ? existingOrders
          : formatByDate([newOrder, ...existingOrders]);
      });
      setNewOrder(null);
    }
  }, [newOrder]);

  return (
    <OrdersContext.Provider
      value={{
        ordersCount,
        itemsPerPage,
        handleItemsPerPage,
        ordersData,
        setOrdersData,
        pageNumber,
        setPageNumber,
        totalItems,
        setTotalItems,
        unverifiedOrders,
        setUnverifiedOrders,
        handlePageChange,
        filter,
        setFilter,
        filterInitialState,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

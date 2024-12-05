import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext, useEffect, useRef, useState } from "react";

//REDUX
import { getOrders, resetGetOrdersState } from "../redux/orders/getOrdersSlice";

//SOUND
import unverifiedOrderPath from "../assets/sound/unverifiedOrder.mp3";

//UTILS
import { useSignalR } from "./SignalRContext";
import { formatOrders } from "../utils/utils";
import { usePopup } from "./PopupContext";
import { CloseI } from "../assets/icon";
import { getAuth } from "../redux/api";

const OrdersContext = createContext();

export const useOrdersContext = () => useContext(OrdersContext);

export const OrdersContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = getAuth()?.token;
  const timeoutRef = useRef(null);
  const { setPopupContent } = usePopup();
  const unverifiedOrderSoundRef = useRef(new Audio(unverifiedOrderPath));

  const { newOrder, setNewOrder, statusChangedOrder, setStatusChangedOrder } =
    useSignalR();

  const { success, error, orders } = useSelector((state) => state.orders.get);

  const localItemsPerPage = JSON.parse(
    localStorage.getItem("ITEMS_PERPAGE")
  ) || { label: "20", value: 20 };
  const [itemsPerPage, setItemsPerPage] = useState(localItemsPerPage);
  const [ordersData, setOrdersData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [isThereUnverifiedOrder, setisThereUnverifiedOrder] = useState(false);

  function handlePageChange(number) {
    dispatch(
      getOrders({
        page: number,
        pageSize: itemsPerPage.value,
      })
    );
  }

  function handleItemsPerPage(number) {
    dispatch(
      getOrders({
        page: pageNumber,
        pageSize: number,
      })
    );
    const localData = { label: `${number}`, value: number };
    localStorage.removeItem("ITEMS_PERPAGE");
    localStorage.setItem("ITEMS_PERPAGE", JSON.stringify(localData));
    setItemsPerPage({ label: `${number}`, value: number });
  }

  //GET ORDERS
  useEffect(() => {
    if (!ordersData && token) {
      dispatch(getOrders({ pageNumber, pageSize: itemsPerPage.value }));
    }
  }, [ordersData, token]);

  //TOAST AND SET ORDERS
  useEffect(() => {
    if (error) {
      dispatch(resetGetOrdersState());
    }
    if (success) {
      setOrdersData(orders.data);
      setTotalItems(orders.totalCount);
      dispatch(resetGetOrdersState());
    }
  }, [success, error, orders]);

  //CHECK FOR UNVERIFIED ORDERS
  useEffect(() => {
    if (ordersData?.length) {
      const hasUnverifiedOrders = ordersData.some(
        (order) =>
          order.status === 325 || order.status === 400 || order.status === 0
      );

      setisThereUnverifiedOrder(hasUnverifiedOrders);
    }
    if (statusChangedOrder) {
      setOrdersData((prev) => {
        const updatedOrder = prev.filter((O) => O.id !== statusChangedOrder.id);
        return formatOrders([...updatedOrder, statusChangedOrder]);
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

    if (isThereUnverifiedOrder) {
      timeoutRef.current = setTimeout(() => {
        unverifiedOrderSound.loop = true;
        unverifiedOrderSound.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
        console.log("Sound played");
      }, 4000);
    } else {
      console.log("Sound Paused");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      unverifiedOrderSound.loop = false;
      unverifiedOrderSound.pause();
      unverifiedOrderSound.currentTime = 0;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isThereUnverifiedOrder, token]);

  //SET NEW ORDER
  useEffect(() => {
    if (newOrder) {
      if (ordersData) {
        setOrdersData(formatOrders([newOrder, ...ordersData]));
      } else {
        setOrdersData([newOrder]);
      }
      setNewOrder(null);
    }
  }, [newOrder]);

  return (
    <OrdersContext.Provider
      value={{
        itemsPerPage,
        handleItemsPerPage,
        ordersData,
        setOrdersData,
        pageNumber,
        setPageNumber,
        totalItems,
        setTotalItems,
        isThereUnverifiedOrder,
        setisThereUnverifiedOrder,
        handlePageChange,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

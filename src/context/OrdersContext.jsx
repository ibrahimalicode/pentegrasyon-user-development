//MODULES
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext, useEffect, useRef, useState } from "react";

//SOUND
import unverifiedOrderPath from "../assets/sound/unverifiedOrder.mp3";

//UTILS
import { getAuth } from "../redux/api";
import { usePopup } from "./PopupContext";
import PopupShell from "../components/common/popupShell";
import { TOOLBAR_BTN_PRIMARY } from "../components/common/toolbarStyles";
import { useFirestore } from "./FirestoreContext";
import { formatByDate, formatDate } from "../utils/utils";

//REDUX
import { getTicketById } from "../redux/orders/getTicketByIdSlice";
import { getOrders, resetGetOrdersState } from "../redux/orders/getOrdersSlice";

const OrdersContext = createContext();

export const useOrdersContext = () => useContext(OrdersContext);

export const OrdersContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = getAuth()?.token;
  const timeoutRef = useRef(null);
  const { popupContent, setPopupContent } = usePopup();
  const unverifiedOrderSoundRef = useRef(new Audio(unverifiedOrderPath));

  const { success, error, orders } = useSelector((state) => state.orders.get);
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
    localStorage.getItem("ITEMS_PERPAGE"),
  ) || { label: "20", value: 20 };
  const [itemsPerPage, setItemsPerPage] = useState(localItemsPerPage);
  const [ordersData, setOrdersData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [filter, setFilter] = useState(filterInitialState);
  const [unverifiedOrders, setUnverifiedOrders] = useState(false);
  const [searchVal, setSearchVal] = useState("");

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
      }),
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
      }),
    );
    const localData = { label: `${number}`, value: number };
    localStorage.removeItem("ITEMS_PERPAGE");
    localStorage.setItem("ITEMS_PERPAGE", JSON.stringify(localData));
    setItemsPerPage({ label: `${number}`, value: number });
  }

  function isOrderUnverifiedInDB(order) {
    if (order.status === 325 || order.status === 400 || order.status === 0) {
      dispatch(
        getTicketById({ ticketId: order.id, marketplaceId: order.marketplaceId }),
      ).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          const data = res.payload.data;
          if (data.id === order.id && data.status != order.status)
            setStatusChangedOrder(data);
        }
      });
    }
  }

  //GET ORDERS
  useEffect(() => {
    if (!ordersData && token) {
      dispatch(
        getOrders({
          pageNumber,
          pageSize: itemsPerPage.value,
        }),
      );
    }
  }, [ordersData, token]);

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
          // Only marketplaces the table can render may ring the alarm: an
          // order from an unmapped marketplace (or a slim doc without a
          // marketplaceId) has no visible row, so the alarm played over an
          // apparently clean list — "sound but nothing pending".
          [0, 1, 2, 3].includes(order.marketplaceId) &&
          (order.status === 325 ||
            order.status === 400 ||
            (order.status === 0 && order.marketplaceId !== 2) ||
            order.packageStatus === "Created"),
      );
      // console.log(hasUnverifiedOrders[0]);
      setUnverifiedOrders(hasUnverifiedOrders[0]);
    }
    if (statusChangedOrder) {
      // Same slim-notification caveat as new orders: swap in the full
      // ticket so the row keeps its prices and dates after the update.
      dispatch(
        getTicketById({
          ticketId: statusChangedOrder.id,
          marketplaceId: statusChangedOrder.marketplaceId,
        }),
      ).then(
        (res) => {
          const full =
            res?.meta?.requestStatus === "fulfilled"
              ? res.payload?.data
              : null;
          setOrdersData((prev) => {
            const rest =
              prev?.filter((O) => O.id !== statusChangedOrder.id) || [];
            return formatByDate([...rest, full || statusChangedOrder]);
          });
        },
      );
      setStatusChangedOrder(null);
    }
  }, [ordersData, statusChangedOrder]);

  //PLAY SOUND FOR UNVERIFIED ORDERS
  useEffect(() => {
    const unverifiedOrderSound = unverifiedOrderSoundRef.current;

    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();

    if (audioContext.state === "suspended" && token && !popupContent) {
      const popupContent = (
        // The popup container is 45rem wide (sized for forms); a two-line
        // notice floats in a narrower card so it reads as a dialog.
        <div className="mx-auto max-w-md">
          <PopupShell
            title="Ses İzni"
            onClose={() => setPopupContent(null)}
            footer={
              // Any click unlocks the browser's autoplay policy — the
              // button exists to capture that gesture.
              <button
                onClick={() => setPopupContent(null)}
                className={TOOLBAR_BTN_PRIMARY}
              >
                İzin Ver
              </button>
            }
          >
            <p className="pt-4 text-sm leading-relaxed text-[--black-2]">
              Yeni sipariş bildirimleri için ses oynatma tarayıcı tarafından
              engellendi. Pentegrasyon&apos;un sesli bildirim çalmasına izin
              verin.
            </p>
          </PopupShell>
        </div>
      );
      setPopupContent(popupContent);
      console.warn(
        "Audio context is suspended due to lack of user interaction.",
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
    if (!newOrder) return;

    const existingOrders = ordersData || [];
    const isDuplicate = existingOrders.some(
      (order) => order.id === newOrder.id,
    );

    if (!isDuplicate) {
      // The Firestore doc is a slim notification, not the full ticket —
      // prepending it as-is rendered a half-empty row and left the page
      // total unchanged. Fetch the real order, fall back to the doc only
      // if that fails.
      // marketplaceId (backend #219) skips the marketplace probe chain —
      // one query, and no more empty-200 YemekSepeti false positives.
      dispatch(
        getTicketById({
          ticketId: newOrder.id,
          marketplaceId: newOrder.marketplaceId,
        }),
      ).then((res) => {
        const full =
          res?.meta?.requestStatus === "fulfilled" ? res.payload?.data : null;
        setOrdersData((prev) => {
          const current = prev || [];
          if (current.some((order) => order.id === newOrder.id))
            return current;
          return formatByDate([full || newOrder, ...current]);
        });
      });

      // The toolbar counter is GetTickets' totalCount; bump it locally so
      // it moves with the arrival — the next list fetch (filter, page,
      // refresh) re-trues it from the server anyway.
      setTotalItems((prev) => (prev || 0) + 1);
    }
    setNewOrder(null);
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
        unverifiedOrders,
        setUnverifiedOrders,
        handlePageChange,
        filter,
        setFilter,
        filterInitialState,
        searchVal,
        setSearchVal,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

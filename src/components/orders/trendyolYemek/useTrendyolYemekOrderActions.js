//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { formatByDate } from "../../../utils/utils";
import { usePopup } from "../../../context/PopupContext";

//REDUX
import {
  trendyolYemekTicketVerify,
  resetTrendyolYemekTicketVerify,
} from "../../../redux/trendyol/trendyolYemekTicketVerifySlice";
import {
  trendyolYemekTicketPrepare,
  resetTrendyolYemekTicketPrepare,
} from "../../../redux/trendyol/trendyolYemekTicketPrepareSlice";
import {
  trendyolYemekTicketDeliver,
  resetTrendyolYemekTicketDeliver,
} from "../../../redux/trendyol/trendyolYemekTicketDeliverSlice";
import {
  trendyolYemekTicketCancel,
  resetTrendyolYemekTicketCancel,
} from "../../../redux/trendyol/trendyolYemekTicketCancelSlice";
import toastStatusError from "../components/toastOrderStatError";

export const useTrendyolYemekOrderActions = ({
  order,
  ticketId,
  setSideOrder,
  setOrdersData,
  onlyInDataBase,
  cancelOrderData,
}) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const {
    loading: verifyLoading,
    success: verifySuccess,
    error: verifyErr,
  } = useSelector((state) => state.trendyol.verifyTicket);

  const {
    loading: prepareLoading,
    success: prepareSuccess,
    error: prepareErr,
  } = useSelector((state) => state.trendyol.prepareTicket);

  const {
    loading: deliverLoading,
    success: deliverSuccess,
    error: deliverErr,
  } = useSelector((state) => state.trendyol.deliverTicket);

  const {
    loading: cancelLoading,
    success: cancelSuccess,
    error: cancelErr,
  } = useSelector((state) => state.trendyol.cancelTicket);

  //VERIFY ORDER
  const verifyOrder = () => {
    dispatch(trendyolYemekTicketVerify({ ticketId, onlyInDataBase })).then(
      (res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          const currentDate = new Date().toLocaleString();

          setPopupContent(null);
          setOrdersData((prev) => {
            const unChangedOrders = prev.filter(
              (p) => p.id !== res.meta.arg.ticketId,
            );
            const updatedData = [
              ...unChangedOrders,
              { ...order, status: res.payload.data, approvalDate: currentDate },
            ];
            return formatByDate(updatedData);
          });
          setSideOrder &&
            setSideOrder({
              ...order,
              status: res.payload.data,
              approvalDate: currentDate,
            });
        }
      },
    );
  };

  //PREPARE ORDER
  const prepareOrder = () => {
    dispatch(trendyolYemekTicketPrepare({ ticketId, onlyInDataBase })).then(
      (res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          const currentDate = new Date().toLocaleString();

          setPopupContent(null);
          setOrdersData((prev) => {
            const unChangedOrders = prev.filter(
              (p) => p.id !== res.meta.arg.ticketId,
            );
            const updatedData = [
              ...unChangedOrders,
              {
                ...order,
                status: res.payload.data,
                preparationDate: currentDate,
              },
            ];
            return formatByDate(updatedData);
          });
          setSideOrder &&
            setSideOrder({
              ...order,
              status: res.payload.data,
              preparationDate: currentDate,
            });
        }
      },
    );
  };

  //DELIVER ORDER
  const deliverOrder = () => {
    dispatch(trendyolYemekTicketDeliver({ ticketId, onlyInDataBase })).then(
      (res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          const currentDate = new Date().toLocaleString();

          setPopupContent(null);
          setOrdersData((prev) => {
            const unChangedOrders = prev.filter(
              (p) => p.id !== res.meta.arg.ticketId,
            );
            const updatedData = [
              ...unChangedOrders,
              { ...order, status: res.payload.data, deliveryDate: currentDate },
            ];
            return formatByDate(updatedData);
          });

          setSideOrder &&
            setSideOrder({
              ...order,
              status: res.payload.data,
              deliveryDate: currentDate,
            });
        }
      },
    );
  };

  //CANCEL ORDER
  const cancelOrder = () => {
    dispatch(trendyolYemekTicketCancel(cancelOrderData)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const currentDate = new Date().toLocaleString();

        setPopupContent(null);
        setOrdersData((prev) => {
          const unChangedOrders = prev.filter(
            (p) => p.id !== res.meta.arg.ticketId,
          );
          const updatedData = [
            ...unChangedOrders,
            { ...order, status: res.payload.data, cancelDate: currentDate },
          ];
          return formatByDate(updatedData);
        });
      }
    });
  };

  // VERIFY TOAST
  useEffect(() => {
    if (verifyLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (verifyErr) {
      dispatch(resetTrendyolYemekTicketVerify());
    }
    if (verifySuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetTrendyolYemekTicketVerify());
    }
  }, [verifyLoading, verifySuccess, verifyErr]);

  // PREPARE TOAST
  useEffect(() => {
    if (prepareLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (prepareErr) {
      if (order.id === prepareErr.ticketId) {
        if (prepareErr.statusCode === 408) {
          toastStatusError(order.approvalDate);
        }
      }
      dispatch(resetTrendyolYemekTicketPrepare());
    }
    if (prepareSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetTrendyolYemekTicketPrepare());
    }
  }, [prepareLoading, prepareSuccess, prepareErr]);

  // DELIVER TOAST
  useEffect(() => {
    if (deliverLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (deliverErr) {
      if (order.id === deliverErr.ticketId) {
        if (deliverErr.statusCode === 408) {
          toastStatusError(order.preparationDate, 10);
        }
      }
      dispatch(resetTrendyolYemekTicketDeliver());
    }
    if (deliverSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetTrendyolYemekTicketDeliver());
    }
  }, [deliverLoading, deliverSuccess, deliverErr]);

  // CANCEL TOAST
  useEffect(() => {
    if (cancelLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (cancelErr) {
      dispatch(resetTrendyolYemekTicketCancel());
    }
    if (cancelSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetTrendyolYemekTicketCancel());
    }
  }, [cancelLoading, cancelSuccess, cancelErr]);

  return { verifyOrder, prepareOrder, deliverOrder, cancelOrder };
};

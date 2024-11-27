//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//REDUX
import {
  getirYemekTicketVerify,
  resetGetirYemekTicketVerify,
} from "../../../redux/getirYemek/getirYemekTicketVerifySlice";
import {
  getirYemekTicketPrepare,
  resetGetirYemekTicketPrepare,
} from "../../../redux/getirYemek/getirYemekTicketPrepareSlice";
import {
  getirYemekTicketDeliver,
  resetGetirYemekTicketDeliver,
} from "../../../redux/getirYemek/getirYemekTicketDeliverSlice";
import {
  getirYemekTicketCancel,
  resetGetirYemekTicketCancel,
} from "../../../redux/getirYemek/getirYemekTicketCancelSlice";

//UTILS
import { formatOrders } from "../../../utils/utils";
import { usePopup } from "../../../context/PopupContext";

export const useGetirYemekOrderActions = ({
  order,
  ticketId,
  setSideOrder,
  setOrdersData,
  cancelOrderData,
}) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const {
    loading: verifyLoading,
    success: verifySuccess,
    error: verifyErr,
  } = useSelector((state) => state.getirYemek.verifyTicket);

  const {
    loading: prepareLoading,
    success: prepareSuccess,
    error: prepareErr,
  } = useSelector((state) => state.getirYemek.prepareTicket);

  const {
    loading: deliverLoading,
    success: deliverSuccess,
    error: deliverErr,
  } = useSelector((state) => state.getirYemek.deliverTicket);

  const {
    loading: cancelLoading,
    success: cancelSuccess,
    error: cancelErr,
  } = useSelector((state) => state.getirYemek.cancelTicket);

  //VERIFY ORDER
  const verifyOrder = () => {
    dispatch(getirYemekTicketVerify({ ticketId })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const currentDate = new Date().toLocaleString();

        setPopupContent(null);
        setOrdersData((prev) => {
          const unChangedOrders = prev.filter(
            (p) => p.id !== res.meta.arg.ticketId
          );
          const updatedData = [
            ...unChangedOrders,
            { ...order, status: res.payload.data, approvalDate: currentDate },
          ];
          return formatOrders(updatedData);
        });
        setSideOrder &&
          setSideOrder({
            ...order,
            status: res.payload.data,
            approvalDate: currentDate,
          });
      }
    });
  };

  //PREPARE ORDER
  const prepareOrder = () => {
    dispatch(getirYemekTicketPrepare({ ticketId })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const currentDate = new Date().toLocaleString();

        setPopupContent(null);
        setOrdersData((prev) => {
          const unChangedOrders = prev.filter(
            (p) => p.id !== res.meta.arg.ticketId
          );
          const updatedData = [
            ...unChangedOrders,
            {
              ...order,
              status: res.payload.data,
              preparationDate: currentDate,
            },
          ];
          return formatOrders(updatedData);
        });
        setSideOrder &&
          setSideOrder({
            ...order,
            status: res.payload.data,
            preparationDate: currentDate,
          });
      }
    });
  };

  //DELIVER ORDER
  const deliverOrder = () => {
    dispatch(getirYemekTicketDeliver({ ticketId })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const currentDate = new Date().toLocaleString();

        setPopupContent(null);
        setOrdersData((prev) => {
          const unChangedOrders = prev.filter(
            (p) => p.id !== res.meta.arg.ticketId
          );
          const updatedData = [
            ...unChangedOrders,
            { ...order, status: res.payload.data, deliveryDate: currentDate },
          ];
          return formatOrders(updatedData);
        });
        setSideOrder &&
          setSideOrder({
            ...order,
            status: res.payload.data,
            deliveryDate: currentDate,
          });
      }
    });
  };

  //CANCEL ORDER
  const cancelOrder = () => {
    dispatch(getirYemekTicketCancel(cancelOrderData)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const currentDate = new Date().toLocaleString();

        setPopupContent(null);
        setOrdersData((prev) => {
          const unChangedOrders = prev.filter(
            (p) => p.id !== res.meta.arg.ticketId
          );
          const updatedData = [
            ...unChangedOrders,
            { ...order, status: res.payload.data, cancelDate: currentDate },
          ];
          return formatOrders(updatedData);
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
      dispatch(resetGetirYemekTicketVerify());
    }
    if (verifySuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetGetirYemekTicketVerify());
    }
  }, [verifyLoading, verifySuccess, verifyErr]);

  // PREPARE TOAST
  useEffect(() => {
    if (prepareLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (prepareErr) {
      dispatch(resetGetirYemekTicketPrepare());
    }
    if (prepareSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetGetirYemekTicketPrepare());
    }
  }, [prepareLoading, prepareSuccess, prepareErr]);

  // DELIVER TOAST
  useEffect(() => {
    if (deliverLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (deliverErr) {
      dispatch(resetGetirYemekTicketDeliver());
    }
    if (deliverSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetGetirYemekTicketDeliver());
    }
  }, [deliverLoading, deliverSuccess, deliverErr]);

  // CANCEL TOAST
  useEffect(() => {
    if (cancelLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (cancelErr) {
      dispatch(resetGetirYemekTicketCancel());
    }
    if (cancelSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetGetirYemekTicketCancel());
    }
  }, [cancelLoading, cancelSuccess, cancelErr]);

  return { verifyOrder, prepareOrder, deliverOrder, cancelOrder };
};

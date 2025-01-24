//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { formatByDate } from "../../../utils/utils";
import { usePopup } from "../../../context/PopupContext";

//REDUX
import {
  migrosYemekTicketVerify,
  resetMigrosYemekTicketVerify,
} from "../../../redux/migrosYemek/migrosYemekTicketVerifySlice";
import {
  migrosYemekTicketPrepare,
  resetMigrosYemekTicketPrepare,
} from "../../../redux/migrosYemek/migrosYemekTicketPrepareSlice";
import {
  migrosYemekTicketDeliver,
  resetMigrosYemekTicketDeliver,
} from "../../../redux/migrosYemek/migrosYemekTicketDeliverSlice";
import {
  migrosYemekTicketCancel,
  resetMigrosYemekTicketCancel,
} from "../../../redux/migrosYemek/migrosYemekTicketCancelSlice";
import toastStatusError from "../components/toastOrderStatError";

export const useMigrosYemekOrderActions = ({
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
  } = useSelector((state) => state.migrosYemek.verifyTicket);

  const {
    loading: prepareLoading,
    success: prepareSuccess,
    error: prepareErr,
  } = useSelector((state) => state.migrosYemek.prepareTicket);

  const {
    loading: deliverLoading,
    success: deliverSuccess,
    error: deliverErr,
  } = useSelector((state) => state.migrosYemek.deliverTicket);

  const {
    loading: cancelLoading,
    success: cancelSuccess,
    error: cancelErr,
  } = useSelector((state) => state.migrosYemek.cancelTicket);

  //VERIFY ORDER
  const verifyOrder = () => {
    dispatch(migrosYemekTicketVerify({ ticketId, onlyInDataBase })).then(
      (res) => {
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
            return formatByDate(updatedData);
          });
          setSideOrder &&
            setSideOrder({
              ...order,
              status: res.payload.data,
              approvalDate: currentDate,
            });
        }
      }
    );
  };

  //PREPARE ORDER
  const prepareOrder = () => {
    dispatch(migrosYemekTicketPrepare({ ticketId, onlyInDataBase })).then(
      (res) => {
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
            console.log({ status: Number(order.status) + 1 });
            return formatByDate(updatedData);
          });
          setSideOrder &&
            setSideOrder({
              ...order,
              status: res.payload.data,
              preparationDate: currentDate,
            });
        }
      }
    );
  };

  //DELIVER ORDER
  const deliverOrder = () => {
    dispatch(migrosYemekTicketDeliver({ ticketId, onlyInDataBase })).then(
      (res) => {
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
            return formatByDate(updatedData);
          });

          setSideOrder &&
            setSideOrder({
              ...order,
              status: res.payload.data,
              deliveryDate: currentDate,
            });
        }
      }
    );
  };

  //CANCEL ORDER
  const cancelOrder = () => {
    dispatch(migrosYemekTicketCancel(cancelOrderData)).then((res) => {
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
      dispatch(resetMigrosYemekTicketVerify());
    }
    if (verifySuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetMigrosYemekTicketVerify());
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
      dispatch(resetMigrosYemekTicketPrepare());
    }
    if (prepareSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetMigrosYemekTicketPrepare());
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
      dispatch(resetMigrosYemekTicketDeliver());
    }
    if (deliverSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetMigrosYemekTicketDeliver());
    }
  }, [deliverLoading, deliverSuccess, deliverErr]);

  // CANCEL TOAST
  useEffect(() => {
    if (cancelLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (cancelErr) {
      dispatch(resetMigrosYemekTicketCancel());
    }
    if (cancelSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetMigrosYemekTicketCancel());
    }
  }, [cancelLoading, cancelSuccess, cancelErr]);

  return { verifyOrder, prepareOrder, deliverOrder, cancelOrder };
};

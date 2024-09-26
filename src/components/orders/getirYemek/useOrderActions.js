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
import { resetGetirYemekTicketCancel } from "../../../redux/getirYemek/getirYemekTicketCancelSlice";

//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { formatOrders } from "../../../utils/utils";

//COMP

export const useOrderActions = (
  order,
  ticketId,
  setOrdersData,
  setSideOrder
) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const {
    loading: verifyLoading,
    success: verifySuccess,
    error: verifyErr,
    data: verifyData,
  } = useSelector((state) => state.getirYemek.verifyTicket);

  const {
    loading: prepareLoading,
    success: prepareSuccess,
    error: prepareErr,
    data: prepareData,
  } = useSelector((state) => state.getirYemek.prepareTicket);

  const {
    loading: deliverLoading,
    success: deliverSuccess,
    error: deliverErr,
    data: deliverData,
  } = useSelector((state) => state.getirYemek.deliverTicket);

  const {
    loading: cancelLoading,
    success: cancelSuccess,
    error: cancelErr,
    data: cancelData,
  } = useSelector((state) => state.getirYemek.cancelTicket);

  const verifyOrder = () => {
    dispatch(getirYemekTicketVerify({ ticketId }));
  };

  const prepareOrder = () => {
    dispatch(getirYemekTicketPrepare({ ticketId }));
  };

  const deliverOrder = () => {
    dispatch(getirYemekTicketDeliver({ ticketId }));
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
      setOrdersData((prev) => {
        const unChangedOrders = prev.filter((p) => p.id !== ticketId);
        const updatedData = [
          ...unChangedOrders,
          { ...order, status: verifyData.data },
        ];
        return formatOrders(updatedData);
      });

      setSideOrder && setSideOrder({ ...order, status: verifyData.data });
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
      setOrdersData((prev) => {
        const unChangedOrders = prev.filter((p) => p.id !== ticketId);
        const updatedData = [
          ...unChangedOrders,
          { ...order, status: prepareData.data },
        ];
        return formatOrders(updatedData);
      });
      setSideOrder && setSideOrder({ ...order, status: prepareData.data });
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
      setOrdersData((prev) => {
        const unChangedOrders = prev.filter((p) => p.id !== ticketId);
        const updatedData = [
          ...unChangedOrders,
          { ...order, status: deliverData.data },
        ];
        return formatOrders(updatedData);
      });
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      setSideOrder && setSideOrder({ ...order, status: deliverData.data });
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
      setOrdersData((prev) => {
        const unChangedOrders = prev.filter((p) => p.id !== ticketId);
        const updatedData = [
          ...unChangedOrders,
          { ...order, status: cancelData.data },
        ];
        return formatOrders(updatedData);
      });
      setSideOrder && setSideOrder({ ...order, status: cancelData.data });
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetGetirYemekTicketCancel());
    }
  }, [cancelLoading, cancelSuccess, cancelErr]);

  return { verifyOrder, prepareOrder, deliverOrder };
};

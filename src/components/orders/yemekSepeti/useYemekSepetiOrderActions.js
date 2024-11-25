//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { formatOrders } from "../../../utils/utils";

//REDUX
import {
  resetyemekSepetiTicketVerify,
  yemekSepetiTicketVerify,
} from "../../../redux/yemekSepeti/yemekSepetiTicketVerifySlice";
import {
  resetyemekSepetiTicketPrepare,
  yemekSepetiTicketPrepare,
} from "../../../redux/yemekSepeti/yemekSepetiTicketPrepareSlice";
import {
  resetyemekSepetiTicketDeliver,
  yemekSepetiTicketDeliver,
} from "../../../redux/yemekSepeti/yemekSepetiTicketDeliverSlice";
import { resetyemekSepetiTicketCancel } from "../../../redux/yemekSepeti/yemekSepetiTicketCancelSlice";

export const useYemekSepetiOrderActions = (
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
  } = useSelector((state) => state.yemekSepeti.verifyTicket);

  const {
    loading: prepareLoading,
    success: prepareSuccess,
    error: prepareErr,
  } = useSelector((state) => state.yemekSepeti.prepareTicket);

  const {
    loading: deliverLoading,
    success: deliverSuccess,
    error: deliverErr,
  } = useSelector((state) => state.yemekSepeti.deliverTicket);

  const {
    loading: cancelLoading,
    success: cancelSuccess,
    error: cancelErr,
  } = useSelector((state) => state.yemekSepeti.cancelTicket);

  const verifyOrder = () => {
    dispatch(yemekSepetiTicketVerify({ ticketId })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const currentDate = new Date().toLocaleString();

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

  const prepareOrder = () => {
    dispatch(yemekSepetiTicketPrepare({ ticketId })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const currentDate = new Date().toLocaleString();

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

  const deliverOrder = () => {
    dispatch(yemekSepetiTicketDeliver({ ticketId })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const currentDate = new Date().toLocaleString();

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

  // VERIFY TOAST
  useEffect(() => {
    if (verifyLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (verifyErr) {
      dispatch(resetyemekSepetiTicketVerify());
    }
    if (verifySuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetyemekSepetiTicketVerify());
    }
  }, [verifyLoading, verifySuccess, verifyErr]);

  // PREPARE TOAST
  useEffect(() => {
    if (prepareLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (prepareErr) {
      dispatch(resetyemekSepetiTicketPrepare());
    }
    if (prepareSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetyemekSepetiTicketPrepare());
    }
  }, [prepareLoading, prepareSuccess, prepareErr]);

  // DELIVER TOAST
  useEffect(() => {
    if (deliverLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (deliverErr) {
      dispatch(resetyemekSepetiTicketDeliver());
    }
    if (deliverSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetyemekSepetiTicketDeliver());
    }
  }, [deliverLoading, deliverSuccess, deliverErr]);

  // CANCEL TOAST
  useEffect(() => {
    if (cancelLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (cancelErr) {
      dispatch(resetyemekSepetiTicketCancel());
    }
    if (cancelSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetyemekSepetiTicketCancel());
    }
  }, [cancelLoading, cancelSuccess, cancelErr]);

  return { verifyOrder, prepareOrder, deliverOrder };
};

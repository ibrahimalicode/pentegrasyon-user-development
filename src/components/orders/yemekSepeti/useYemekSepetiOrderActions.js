//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { compareWithCurrentDateTime, formatOrders } from "../../../utils/utils";
import { usePopup } from "../../../context/PopupContext";

//REDUX
import {
  resetYemekSepetiTicketVerify,
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
import {
  resetyemekSepetiTicketCancel,
  yemekSepetiTicketCancel,
} from "../../../redux/yemekSepeti/yemekSepetiTicketCancelSlice";

export const useYemekSepetiOrderActions = ({
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

  //VERIFY ORDER
  const verifyOrder = () => {
    dispatch(yemekSepetiTicketVerify({ ticketId, onlyInDataBase })).then(
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
            return formatOrders(updatedData);
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
    dispatch(yemekSepetiTicketPrepare({ ticketId, onlyInDataBase })).then(
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
            return formatOrders(updatedData);
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
    dispatch(yemekSepetiTicketDeliver({ ticketId, onlyInDataBase })).then(
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
            return formatOrders(updatedData);
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
    dispatch(yemekSepetiTicketCancel(cancelOrderData)).then((res) => {
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

  //FUNC
  function remainingMin(date) {
    const xMinuteAhead = new Date(new Date(date).getTime() + 60000);
    return compareWithCurrentDateTime(xMinuteAhead).remainingSeconds;
  }

  // VERIFY TOAST
  useEffect(() => {
    if (verifyLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (verifyErr) {
      dispatch(resetYemekSepetiTicketVerify());
    }
    if (verifySuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı", { id: "order-stat-success" });
      dispatch(resetYemekSepetiTicketVerify());
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
          toast.dismiss();
          const message = `Lütfen ${remainingMin(
            order.approvalDate
          )}sn sonra tekrar deneyiniz.`;
          toast.error(message);
        }
      }
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
      if (order.id === deliverErr.ticketId) {
        if (deliverErr.statusCode === 408) {
          toast.dismiss();
          const message = `Lütfen ${remainingMin(
            order.approvalDate
          )}sn sonra tekrar deneyiniz.`;
          toast.error(message);
        }
      }
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

  return { verifyOrder, prepareOrder, deliverOrder, cancelOrder };
};

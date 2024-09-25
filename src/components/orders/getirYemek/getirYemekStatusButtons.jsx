//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
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
import orderStatuses from "../../../data/orderStatuses";

const GetirYemekStatusButtons = ({ order, setOrder, setOrderStatus }) => {
  const toastId = useRef();
  const ticketId = order.id;
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

  function verifyOrder() {
    dispatch(getirYemekTicketVerify({ ticketId }));
  }

  function prepareOrder() {
    dispatch(getirYemekTicketPrepare({ ticketId }));
  }

  function deliverOrder() {
    dispatch(getirYemekTicketDeliver({ ticketId }));
  }

  function cancelOrder() {
    dispatch(getirYemekTicketCancel({ ticketId }));
  }

  // VERIFY TOAST
  useEffect(() => {
    if (verifyLoading) {
      toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
    }
    if (verifyErr) {
      dispatch(resetGetirYemekTicketVerify());
    }
    if (verifySuccess) {
      setOrderStatus(verifyData.data);
      setOrder({ ...order, status: verifyData.data });
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı");
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
      setOrderStatus(prepareData.data);
      setOrder({ ...order, status: prepareData.data });
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı");
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
      setOrderStatus(deliverData.data);
      setOrder({ ...order, status: deliverData.data });
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı");
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
      setOrderStatus(cancelData.data);
      setOrder({ ...order, status: cancelData.data });
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı");
      dispatch(resetGetirYemekTicketCancel());
    }
  }, [cancelLoading, cancelSuccess, cancelErr]);

  const btnClass =
    "py-2 px-1 sm:px-4 rounded-md border text-[--black-1] disabled:cursor-not-allowed";
  const disabled =
    verifyLoading || prepareLoading || deliverLoading || cancelLoading;
  return (
    <div className="fixed bottom-0 right-0 left-0 flex gap-2 sm:gap-4 p-2 py-3.5 bg-white border-t border-[--light-4] text-xs whitespace-nowrap">
      <button
        onClick={verifyOrder}
        disabled={disabled}
        className={`bg-[--status-green] rounded-md border-[--green-1] ${btnClass}`}
      >
        Onayla
      </button>
      <button
        onClick={prepareOrder}
        disabled={disabled}
        className={`bg-[--status-blue] rounded-md border-[--blue-1] ${btnClass}`}
      >
        Hazırlanıyor
      </button>
      <button
        disabled={disabled}
        className={`bg-[--status-purple] rounded-md border-[--purple-1] ${btnClass}`}
      >
        Yola Çıkar
      </button>
      <button
        onClick={deliverOrder}
        disabled={disabled}
        className={`bg-[--status-brown] rounded-md border-[--brown-1] ${btnClass}`}
      >
        Teslim Et
      </button>
      <button
        // onClick={cancelOrder}
        disabled={disabled}
        className={`bg-[--status-red] rounded-md border-[--red-1] ${btnClass}`}
      >
        İptal Et
      </button>
    </div>
  );
};

export default GetirYemekStatusButtons;

export function GetirYemekStatusButton({ order }) {
  return (
    <button
      className="w-24 py-3.5 px-2 rounded-md border"
      style={{
        backgroundColor: `var(${
          orderStatuses.filter((col) => col.id === order.status)[0]?.bg
        })`,
        color: `var(${
          orderStatuses.filter((col) => col.id === order.status)[0]?.color
        })`,
        borderColor: `var(${
          orderStatuses.filter((col) => col.id === order.status)[0]?.color
        })`,
      }}
    >
      {orderStatuses.filter((stat) => stat.id === order.status)[0]?.label}
    </button>
  );
}

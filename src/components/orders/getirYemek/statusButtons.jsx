import { useDispatch, useSelector } from "react-redux";
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
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const StatusButtons = ({ order }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const ticketId = order.id;

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
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı");
      dispatch(resetGetirYemekTicketCancel());
    }
  }, [cancelLoading, cancelSuccess, cancelErr]);

  // console.log(order);
  const btnClass = "py-2 px-1 sm:px-4 rounded-md border text-[--black-1] ";
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

export default StatusButtons;

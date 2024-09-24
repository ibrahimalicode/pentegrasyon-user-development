import { useDispatch, useSelector } from "react-redux";
import { getirYemekTicketVerify } from "../../../redux/getirYemek/getirYemekTicketVerifySlice";
import { getirYemekTicketPrepare } from "../../../redux/getirYemek/getirYemekTicketPrepareSlice";
import { getirYemekTicketDeliver } from "../../../redux/getirYemek/getirYemekTicketDeliverSlice";
import { getirYemekTicketCancel } from "../../../redux/getirYemek/getirYemekTicketCancelSlice";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const StatusButtons = (order) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading: verifyLoading, success: verifySuccess } = useSelector(
    (state) => state.getirYemek.verifyTicket
  );

  const { loading: prepareLoading, success: prepareSuccess } = useSelector(
    (state) => state.getirYemek.prepareTicket
  );

  const { loading: deliverLoading, success: deliverSuccess } = useSelector(
    (state) => state.getirYemek.deliverTicket
  );

  const { loading: cancelLoading, success: cancelSuccess } = useSelector(
    (state) => state.getirYemek.cancelTicket
  );

  function verifyOrder() {
    dispatch(getirYemekTicketVerify({ ticketId: order.id }));
  }

  function prepareOrder() {
    dispatch(getirYemekTicketPrepare({ ticketId: order.id }));
  }

  function deliverOrder() {
    dispatch(getirYemekTicketDeliver({ ticketId: order.id }));
  }

  function cancelOrder() {
    dispatch(getirYemekTicketCancel({ ticketId: order.id }));
  }

  // VERIFY TOAST
  useEffect(() => {
    if (verifyLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (verifySuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı");
    }
  }, [verifyLoading, verifySuccess]);

  // PREPARE TOAST
  useEffect(() => {
    if (prepareLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (prepareSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı");
    }
  }, [prepareLoading, prepareSuccess]);

  // DELIVER TOAST
  useEffect(() => {
    if (deliverLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (deliverSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı");
    }
  }, [deliverLoading, deliverSuccess]);

  // CANCEL TOAST
  useEffect(() => {
    if (cancelLoading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (cancelSuccess) {
      toast.dismiss(toastId.current);
      toast.success("İşlem başarılı");
    }
  }, [cancelLoading, cancelSuccess]);

  // console.log(order);
  const btnClass = "py-2 px-1 sm:px-4 rounded-md border text-[--black-1] ";
  return (
    <div className="fixed bottom-0 right-0 left-0 flex gap-2 sm:gap-4 p-2 py-3.5 bg-white border-t border-[--light-4] text-xs whitespace-nowrap">
      <button
        className={`bg-[--status-green] rounded-md border-[--green-1] ${btnClass}`}
      >
        Onayla
      </button>
      <button
        className={`bg-[--status-blue] rounded-md border-[--blue-1] ${btnClass}`}
      >
        Hazırlanıyor
      </button>
      <button
        className={`bg-[--status-purple] rounded-md border-[--purple-1] ${btnClass}`}
      >
        Yola Çıkar
      </button>
      <button
        className={`bg-[--status-brown] rounded-md border-[--brown-1] ${btnClass}`}
      >
        Teslim Et
      </button>
      <button
        className={`bg-[--status-red] rounded-md border-[--red-1] ${btnClass}`}
      >
        İptal Et
      </button>
    </div>
  );
};

export default StatusButtons;

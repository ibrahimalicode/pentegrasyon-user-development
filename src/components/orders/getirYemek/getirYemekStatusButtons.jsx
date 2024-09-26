//MODULES
import { useSelector } from "react-redux";

//REDUX
import orderStatuses from "../../../data/orderStatuses";

//HOOK
import { useOrderActions } from "./useOrderActions";
import CancelOrderPopup from "./cancelOrderPopup";
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";

const GetirYemekStatusButtons = ({ order, setOrdersData, setSideOrder }) => {
  const { setPopupContent } = usePopup();
  const { setSlideBarContent } = useSlideBar();

  const ticketId = order.id;
  const { verifyOrder, prepareOrder, deliverOrder } = useOrderActions(
    ticketId,
    setOrdersData,
    setSideOrder
  );

  const { loading: verifyLoading } = useSelector(
    (state) => state.getirYemek.verifyTicket
  );

  const { loading: prepareLoading } = useSelector(
    (state) => state.getirYemek.prepareTicket
  );

  const { loading: deliverLoading } = useSelector(
    (state) => state.getirYemek.deliverTicket
  );

  const { loading: cancelLoading } = useSelector(
    (state) => state.getirYemek.cancelTicket
  );

  function cancelOrder() {
    setSlideBarContent(null);
    setPopupContent(<CancelOrderPopup ticketId={ticketId} />);
  }

  const nextId = orderStatuses.filter((s) => s.id === order.status)[0]?.nextId;
  let orderStat = orderStatuses.filter((stat) => stat.id === order.status)[0];
  if (nextId) orderStat = orderStatuses.filter((s) => s.id === nextId)[0];

  const btnClass =
    "py-2 px-1 sm:px-4 rounded-md border text-[--black-1] disabled:cursor-not-allowed disabled:opacity-50";
  const disabled =
    verifyLoading || prepareLoading || deliverLoading || cancelLoading;

  return (
    <div className="fixed bottom-0 right-0 left-0 flex gap-2 sm:gap-4 p-2 py-3.5 bg-white border-t border-[--light-4] text-xs whitespace-nowrap">
      <button
        onClick={verifyOrder}
        disabled={disabled || orderStat.id !== 350}
        className={`bg-[--status-green] border-[--green-1] ${btnClass}`}
      >
        Onayla
      </button>
      {/* <button
        onClick={prepareOrder}
        disabled={disabled}
        className={`bg-[--status-blue] border-[--blue-1] ${btnClass}`}
      >
        Hazırlanıyor
      </button> */}
      <button
        onClick={prepareOrder}
        disabled={disabled || orderStat.id !== 700}
        className={`bg-[--status-purple] border-[--purple-1] ${btnClass}`}
      >
        Yola Çıkart
      </button>
      <button
        onClick={deliverOrder}
        disabled={disabled || nextId !== 900}
        className={`bg-[--status-brown] border-[--brown-1] ${btnClass}`}
      >
        Teslim Et
      </button>
      <button
        onClick={cancelOrder}
        disabled={disabled || orderStat.id == 1600 || orderStat.id == 1500}
        className={`bg-[--status-red] border-[--red-1] ${btnClass}`}
      >
        İptal Et
      </button>
    </div>
  );
};

export default GetirYemekStatusButtons;

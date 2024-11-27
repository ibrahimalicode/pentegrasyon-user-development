//MODULES
import { useEffect } from "react";
import { useSelector } from "react-redux";

//COMP
import { useGetirYemekOrderActions } from "./useGetirYemekOrderActions";
import GetirYemekCancelOrderPopup from "./getirYemekCancelOrderPopup";

//UTILS
import { usePopup } from "../../../context/PopupContext";
import getirYemekOrderStatuses from "../../../enums/getirYemekOrderStatuses";
import GetirYemekOrderErrorPopup from "./getirYemekOrderErrorPopup";

function GetirYemekStatusButton({ order, setOrdersData }) {
  const ticketId = order.id;
  const { setPopupContent } = usePopup();

  const { verifyOrder, prepareOrder, deliverOrder } = useGetirYemekOrderActions(
    { order, ticketId, setOrdersData }
  );

  const { loading: verifyLoading, error: verifyErr } = useSelector(
    (state) => state.getirYemek.verifyTicket
  );

  const { loading: prepareLoading, error: prepareErr } = useSelector(
    (state) => state.getirYemek.prepareTicket
  );

  const { loading: deliverLoading, error: deliverErr } = useSelector(
    (state) => state.getirYemek.deliverTicket
  );

  const { loading: cancelLoading, error: cancelErr } = useSelector(
    (state) => state.getirYemek.cancelTicket
  );

  const nextId = getirYemekOrderStatuses.filter((s) => s.id === order.status)[0]
    ?.nextId;
  let orderStat = getirYemekOrderStatuses.filter(
    (stat) => stat.id === order.status
  )[0];
  if (nextId) {
    orderStat = getirYemekOrderStatuses.filter((s) => s.id === nextId)[0];
  } else {
    orderStat = { ...orderStat, text: orderStat?.label };
  }

  function handleClick() {
    if (orderStat.id === 350) {
      verifyOrder();
    }
    if (orderStat.id === 700) {
      prepareOrder();
    }
    if (nextId === 900) {
      deliverOrder();
    }
  }

  const disabled =
    verifyLoading ||
    prepareLoading ||
    deliverLoading ||
    cancelLoading ||
    (orderStat.id !== 350 && orderStat.id !== 700 && nextId !== 900);

  //ORDER ONLY DB ACTION POPUP
  useEffect(() => {
    if (verifyErr || prepareErr || deliverErr || cancelErr) {
      setPopupContent(
        <GetirYemekOrderErrorPopup
          order={order}
          ticketId={ticketId}
          setOrdersData={setOrdersData}
          errorDetails={verifyErr || prepareErr || deliverErr || cancelErr}
        />
      );
    }
  }, [verifyErr, prepareErr, deliverErr, cancelErr]);

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="w-24 py-3.5 px-2 rounded-md border disabled:py-2.5 disabled:cursor-not-allowed"
      style={{
        backgroundColor: `var(${orderStat?.bg})`,
        color: `var(${orderStat?.color})`,
        borderColor: `var(${orderStat?.color})`,
      }}
    >
      {orderStat.text}
    </button>
  );
}

export default GetirYemekStatusButton;

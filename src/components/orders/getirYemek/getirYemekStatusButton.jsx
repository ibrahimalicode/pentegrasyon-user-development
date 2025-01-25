//MODULES
import { useEffect } from "react";
import { useSelector } from "react-redux";

//COMP
import { useGetirYemekOrderActions } from "./useGetirYemekOrderActions";

//UTILS
import { usePopup } from "../../../context/PopupContext";
import toastStatusError from "../components/toastOrderStatError";
import { compareWithCurrentDateTime } from "../../../utils/utils";
import GetirYemekOrderErrorPopup from "./getirYemekOrderErrorPopup";
import getirYemekOrderStatuses from "../../../enums/getirYemekOrderStatuses";
import GlowButton from "../components/glowButton";

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
    if (nextId === 900)
      orderStat = {
        ...orderStat,
        bg: "--status-brown",
        color: "--brown-1",
      };
  } else {
    orderStat = { ...orderStat, text: orderStat?.label };
  }

  function handleClick() {
    function remSec(date, min = 1) {
      return compareWithCurrentDateTime(date, null, min).remainingSeconds;
    }

    if (orderStat.id === 350) {
      verifyOrder();
    }
    if (orderStat.id === 700) {
      if (!(remSec(order.approvalDate) > 0)) {
        prepareOrder();
      } else toastStatusError(order.approvalDate, 1);
    }
    if (nextId === 900) {
      if (!(remSec(order.preparationDate, 10) > 0)) {
        deliverOrder();
      } else toastStatusError(order.preparationDate, 10);
    }
  }

  const disabled =
    verifyLoading ||
    prepareLoading ||
    deliverLoading ||
    cancelLoading ||
    !nextId;

  const btnClass = `relative overflow-clip dynamic-after after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[var(--after-bg)] after:transition-transform after:duration-[7000ms] after:-translate-x-full after:rounded-md after:ease-in-out`;

  //ORDER ONLY DB ACTION POPUP
  useEffect(() => {
    if (verifyErr || prepareErr || deliverErr || cancelErr) {
      const actionError = verifyErr || prepareErr || deliverErr || cancelErr;

      if (actionError.ticketId == order.id && actionError.statusCode != 408) {
        setPopupContent(
          <GetirYemekOrderErrorPopup
            order={order}
            ticketId={ticketId}
            setOrdersData={setOrdersData}
            errorDetails={verifyErr || prepareErr || deliverErr || cancelErr}
          />
        );
      }
    }
  }, [verifyErr, prepareErr, deliverErr, cancelErr]);

  return order.status === 400 || order.status === 325 ? (
    <GlowButton text="Onayla" onClick={handleClick} />
  ) : (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`w-24 py-3.5 px-2 rounded-md border disabled:py-2.5 disabled:cursor-not-allowed ${
        disabled ? btnClass : "after:translate-x-0"
      }`}
      style={{
        backgroundColor: `var(${orderStat?.bg})`,
        color: `var(${orderStat?.color})`,
        borderColor: `var(${orderStat?.color})`,
        "--after-bg": orderStat?.transColor,
      }}
    >
      <span className="relative z-10">{orderStat.text}</span>
    </button>
  );
}

export default GetirYemekStatusButton;

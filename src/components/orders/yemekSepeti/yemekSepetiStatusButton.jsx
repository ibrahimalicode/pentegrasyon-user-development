//MODULES
import { useEffect } from "react";
import { useSelector } from "react-redux";

//COMP
import YemekSepetiOrderErrorPopup from "./yemekSepetiOrderErrorPopup";
import { useYemekSepetiOrderActions } from "./useYemekSepetiOrderActions";

//UTILS
import GlowButton from "../components/glowButton";
import { usePopup } from "../../../context/PopupContext";
import toastStatusError from "../components/toastOrderStatError";
import { compareWithCurrentDateTime } from "../../../utils/utils";
import { useOrdersContext } from "../../../context/OrdersContext";
import yemekSepetiOrderStatuses from "../../../enums/yemekSepetiOrderStatuses";

const YemekSepetiStatusButton = ({ order, setOrdersData }) => {
  const ticketId = order.id;
  const { setPopupContent } = usePopup();
  const { pageNumber } = useOrdersContext();

  const { verifyOrder, prepareOrder, deliverOrder } =
    useYemekSepetiOrderActions({ order, ticketId, setOrdersData });

  const { loading: verifyLoading, error: verifyErr } = useSelector(
    (state) => state.yemekSepeti.verifyTicket
  );

  const { loading: prepareLoading, error: prepareErr } = useSelector(
    (state) => state.yemekSepeti.prepareTicket
  );

  const { loading: deliverLoading, error: deliverErr } = useSelector(
    (state) => state.yemekSepeti.deliverTicket
  );

  const { loading: cancelLoading, error: cancelErr } = useSelector(
    (state) => state.yemekSepeti.cancelTicket
  );

  let orderStatus = yemekSepetiOrderStatuses.filter(
    (stat) => stat.id === order.status
  )[0];
  const nextId = yemekSepetiOrderStatuses.filter((S) => S.id == order.status)[0]
    ?.nextId;

  if (nextId) {
    orderStatus = yemekSepetiOrderStatuses.filter((s) => s.id === nextId)[0];
    if (nextId === 3)
      orderStatus = {
        ...orderStatus,
        bg: "--status-brown",
        color: "--brown-1",
      };
  } else {
    orderStatus = { ...orderStatus, text: orderStatus?.label };
  }

  function handleClick() {
    function remSec(date, min = 1) {
      return compareWithCurrentDateTime(date, null, min).remainingSeconds;
    }
    if (order.status === 0) {
      verifyOrder();
      return;
    } else if (order.status === 1) {
      if (!(remSec(order.approvalDate) > 0)) {
        prepareOrder();
      } else toastStatusError(order.approvalDate, 1);
    } else if (order.status === 2) {
      if (!(remSec(order.preparationDate, 10) > 0)) {
        deliverOrder();
      } else toastStatusError(order.preparationDate, 10);
    }
  }

  const isDisabled =
    verifyLoading ||
    prepareLoading ||
    deliverLoading ||
    cancelLoading ||
    order.status == 3 ||
    order.status == 4;

  const btnClass =
    "relative overflow-clip after:absolute after:top-0 after:left-0 after:bg-[var(--after-bg)] after:w-full after:h-full after:transition-transform after:duration-[7000ms] after:-translate-x-full after:rounded-md after:ease-in-out";

  //ORDER: ONLY IN DB ACTION-POPUP
  useEffect(() => {
    if (verifyErr || prepareErr || deliverErr || cancelErr) {
      const actionError = verifyErr || prepareErr || deliverErr || cancelErr;

      if (actionError.ticketId == order.id && actionError.statusCode != 408) {
        setPopupContent(
          <YemekSepetiOrderErrorPopup
            order={order}
            ticketId={ticketId}
            setOrdersData={setOrdersData}
            errorDetails={verifyErr || prepareErr || deliverErr || cancelErr}
          />
        );
      }
    }
  }, [verifyErr, prepareErr, deliverErr, cancelErr]);

  return order.status == 0 ? (
    <GlowButton text="Onayla" onClick={handleClick} />
  ) : (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={`w-24 py-3.5 px-2 rounded-md border disabled:py-2.5 disabled:cursor-not-allowed ${
        isDisabled ? pageNumber == 1 && btnClass : "after:translate-x-0"
      }`}
      style={{
        backgroundColor: `var(${orderStatus?.bg})`,
        color: `var(${orderStatus?.color})`,
        borderColor: `var(${orderStatus?.color})`,
        "--after-bg": orderStatus?.transColor,
      }}
    >
      {orderStatus?.text}
    </button>
  );
};

export default YemekSepetiStatusButton;

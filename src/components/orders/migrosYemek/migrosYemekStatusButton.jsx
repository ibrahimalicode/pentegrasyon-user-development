//MODULES
import { useEffect } from "react";
import { useSelector } from "react-redux";

//UTILS
import { usePopup } from "../../../context/PopupContext";
import { compareWithCurrentDateTime } from "../../../utils/utils";
import { useMigrosYemekOrderActions } from "./useMigrosYemekOrderActions";
import migrosYemekiOrderStatuses from "../../../enums/migrosYemekiOrderStatuses";

//COMP
import GlowButton from "../components/glowButton";
import toastStatusError from "../components/toastOrderStatError";
import MigrosYemekOrderErrorPopup from "./migrosYemekOrderErrorPopup";

const MigrosYemekStatusButton = ({ order, setOrdersData }) => {
  const ticketId = order.id;
  const { setPopupContent } = usePopup();

  const { verifyOrder, prepareOrder, deliverOrder } =
    useMigrosYemekOrderActions({ order, ticketId, setOrdersData });

  const { loading: verifyLoading, error: verifyErr } = useSelector(
    (state) => state.migrosYemek.verifyTicket
  );

  const { loading: prepareLoading, error: prepareErr } = useSelector(
    (state) => state.migrosYemek.prepareTicket
  );

  const { loading: deliverLoading, error: deliverErr } = useSelector(
    (state) => state.migrosYemek.deliverTicket
  );

  const { loading: cancelLoading, error: cancelErr } = useSelector(
    (state) => state.migrosYemek.cancelTicket
  );

  let orderStatus = migrosYemekiOrderStatuses.filter(
    (stat) => stat.id === order.status
  )[0];
  const nextId = migrosYemekiOrderStatuses.filter(
    (S) => S.id == order.status
  )[0]?.nextId;

  if (nextId) {
    orderStatus = migrosYemekiOrderStatuses.filter((s) => s.id === nextId)[0];
  } else {
    orderStatus = { ...orderStatus, text: orderStatus?.label };
  }

  function handleClick() {
    function remSec(date, min = 1) {
      return compareWithCurrentDateTime(date, null, min).remainingSeconds;
    }
    if (order.status === "NEW_PENDING") {
      verifyOrder();
      return;
    } else if (order.status === "COLLECTING") {
      if (!(remSec(order.approvalDate) > 0)) {
        prepareOrder();
      } else toastStatusError(order.approvalDate, 1);
    } else if (order.status === "COLLECTION_APPROVED") {
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
    order.status == "DELIVERED" ||
    order.status == "Cancelled";

  const btnClass =
    "relative overflow-clip after:absolute after:top-0 after:left-0 after:bg-[var(--after-bg)] after:w-full after:h-full after:transition-transform after:duration-[7000ms] after:-translate-x-full after:rounded-md after:ease-in-out";

  //ORDER ONLY DB ACTION POPUP
  useEffect(() => {
    if (verifyErr || prepareErr || deliverErr || cancelErr) {
      const actionError = verifyErr || prepareErr || deliverErr || cancelErr;

      if (actionError.ticketId == order.id && actionError.statusCode != 408) {
        setPopupContent(
          <MigrosYemekOrderErrorPopup
            order={order}
            ticketId={ticketId}
            setOrdersData={setOrdersData}
            errorDetails={verifyErr || prepareErr || deliverErr || cancelErr}
          />
        );
      }
    }
  }, [verifyErr, prepareErr, deliverErr, cancelErr]);

  return order.status == "NEW_PENDING" ? (
    <GlowButton text="Onayla" onClick={handleClick} />
  ) : (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={`w-24 py-3.5 px-2 rounded-md border disabled:py-2.5 disabled:cursor-not-allowed ${
        isDisabled ? btnClass : "after:translate-x-0"
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

export default MigrosYemekStatusButton;

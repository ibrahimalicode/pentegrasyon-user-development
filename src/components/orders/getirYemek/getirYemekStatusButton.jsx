//MODULES
// import { useState } from "react";
import { useSelector } from "react-redux";

//COMP
import { useGetirYemekOrderActions } from "./useGetirYemekOrderActions";

//UTILS
import getirYemekOrderStatuses from "../../../enums/getirYemekOrderStatuses";

function GetirYemekStatusButton({ order, setOrdersData }) {
  const ticketId = order.id;
  const { verifyOrder, prepareOrder, deliverOrder } = useGetirYemekOrderActions(
    { order, ticketId, setOrdersData }
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

  // const [isDisabled, setIsDisabled] = useState(false);
  const isDisabled = false;

  // useEffect(() => {
  //   const nextStatus = getirYemekOrderStatuses.filter((s) => s.id === order.status);
  //   const nextId = nextStatus[0]?.nextId;
  //   setIsDisabled(false);

  //   function diffSec(date) {
  //     return compareWithCurrentDateTime(new Date(), date).remainingSeconds < 1;
  //   }

  //   if (order?.approvalDate && nextId === 700 && diffSec(order.approvalDate)) {
  //     setIsDisabled(true);
  //   }
  //   if (order?.preparationDate && nextId === 900 && diffSec(order.preparationDate)) {
  //     setIsDisabled(true);
  //   }
  // }, [order]);

  return (
    <button
      disabled={disabled || isDisabled}
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

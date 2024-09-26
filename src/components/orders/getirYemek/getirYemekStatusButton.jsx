import { useSelector } from "react-redux";
import orderStatuses from "../../../data/orderStatuses";
import { useOrderActions } from "./useOrderActions";

function GetirYemekStatusButton({ order, setOrdersData }) {
  const ticketId = order.id;
  const { verifyOrder, prepareOrder, deliverOrder } = useOrderActions(
    order,
    ticketId,
    setOrdersData
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

  const nextId = orderStatuses.filter((s) => s.id === order.status)[0]?.nextId;
  let orderStat = orderStatuses.filter((stat) => stat.id === order.status)[0];
  if (nextId) {
    orderStat = orderStatuses.filter((s) => s.id === nextId)[0];
  } else {
    orderStat = { ...orderStat, text: orderStat.label };
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

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="w-24 py-3.5 px-2 rounded-md border disabled:py-2.5"
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

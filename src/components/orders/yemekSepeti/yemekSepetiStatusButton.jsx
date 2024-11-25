import { useSelector } from "react-redux";
import { useYemekSepetiOrderActions } from "./useYemekSepetiOrderActions";
import yemekSepetiOrderStatuses from "../../../enums/yemekSepetiOrderStatuses";

const YemekSepetiStatusButton = ({ order, setOrdersData }) => {
  const ticketId = order.id;
  const { verifyOrder, prepareOrder, deliverOrder } =
    useYemekSepetiOrderActions(order, ticketId, setOrdersData);

  const { loading: verifyLoading } = useSelector(
    (state) => state.yemekSepeti.verifyTicket
  );

  const { loading: prepareLoading } = useSelector(
    (state) => state.yemekSepeti.prepareTicket
  );

  const { loading: deliverLoading } = useSelector(
    (state) => state.yemekSepeti.deliverTicket
  );

  const { loading: cancelLoading } = useSelector(
    (state) => state.yemekSepeti.cancelTicket
  );

  const nextId = yemekSepetiOrderStatuses.filter(
    (s) => s.id === order.status
  )[0]?.nextId;
  let orderStat = yemekSepetiOrderStatuses.filter(
    (stat) => stat.id === order.status
  )[0];
  if (nextId) {
    orderStat = yemekSepetiOrderStatuses.filter((s) => s.id === nextId)[0];
  } else {
    orderStat = { ...orderStat, text: orderStat?.label };
  }

  function handleClick() {
    if (orderStat.id === 0) {
      verifyOrder();
    }
    if (orderStat.id === 1) {
      prepareOrder();
    }
    if (nextId === 3) {
      deliverOrder();
    }
  }

  const isDisabled =
    verifyLoading ||
    prepareLoading ||
    deliverLoading ||
    cancelLoading ||
    (orderStat.id == 3 && orderStat.id == 4);

  return (
    <button
      disabled={isDisabled}
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
};

export default YemekSepetiStatusButton;

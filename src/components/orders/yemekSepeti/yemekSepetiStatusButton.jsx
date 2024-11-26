//MODULES
import { useEffect } from "react";
import { useSelector } from "react-redux";

//COMP
import YemekSepetoOrderErrorPopup from "./yemekSepetiOrderErrorPopup";
import { useYemekSepetiOrderActions } from "./useYemekSepetiOrderActions";

//UTILS
import { usePopup } from "../../../context/PopupContext";
import yemekSepetiOrderStatuses from "../../../enums/yemekSepetiOrderStatuses";

const YemekSepetiStatusButton = ({ order, setOrdersData }) => {
  const ticketId = order.id;
  const { setPopupContent } = usePopup();

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

  const nextId = yemekSepetiOrderStatuses.filter(
    (s) => s.id === order.status
  )[0]?.nextId;

  let orderStat = yemekSepetiOrderStatuses.filter(
    (stat) => stat.id === order.status
  )[0];

  // if (nextId) {
  //   orderStat = yemekSepetiOrderStatuses.filter((s) => s.id === nextId)[0];
  // } else {
  //   orderStat = { ...orderStat, text: orderStat?.label };
  // }

  function handleClick() {
    if (order.status === 0) {
      verifyOrder();
    }
    if (order.status === 1) {
      console.log(orderStat, "this is the stat");
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
    orderStat.id == 3 ||
    orderStat.id == 4;

  //ORDER ONLY DB ACTION POPUP
  useEffect(() => {
    if (verifyErr || prepareErr || deliverErr || cancelErr) {
      setPopupContent(
        <YemekSepetoOrderErrorPopup
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
      disabled={isDisabled}
      onClick={handleClick}
      className="w-24 py-3.5 px-2 rounded-md border disabled:py-2.5 disabled:cursor-not-allowed"
      style={{
        backgroundColor: `var(${orderStat?.bg})`,
        color: `var(${orderStat?.color})`,
        borderColor: `var(${orderStat?.color})`,
      }}
    >
      {orderStat.text ? orderStat.text : orderStat.label}
    </button>
  );
};

export default YemekSepetiStatusButton;

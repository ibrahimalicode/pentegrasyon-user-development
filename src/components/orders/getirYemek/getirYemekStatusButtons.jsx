//MODULES
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";

//UTILS
import { formatDateString } from "../../../utils/utils";
import { compareWithCurrentDateTime } from "../../../utils/utils";

//COMP
import CancelOrderPopup from "./cancelOrderPopup";
import { useOrderActions } from "./useOrderActions";
import orderStatuses from "../../../data/orderStatuses";
import RemainingSeconds from "../components/remainingSeconds";

const GetirYemekStatusButtons = ({ order, setOrdersData, setSideOrder }) => {
  const { setPopupContent } = usePopup();
  const { setSlideBarContent } = useSlideBar();

  const ticketId = order.id;
  const { verifyOrder, prepareOrder, deliverOrder } = useOrderActions(
    order,
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

  function xMinuteAhead(date, x) {
    return new Date(new Date(date).getTime() + 60000 * x);
  }

  const btnClass =
    "py-2 px-1 sm:px-4 rounded-md border text-[--black-1] disabled:cursor-not-allowed disabled:opacity-50";
  const disabled =
    verifyLoading || prepareLoading || deliverLoading || cancelLoading;

  // console.log(order);
  function xMinWait(date, min = 1) {
    if (!date) {
      return true;
    }
    return (
      compareWithCurrentDateTime(xMinuteAhead(date, min)).remainingSeconds > 0
    );
  }

  const nextId = orderStatuses.filter((s) => s.id === order.status)[0]?.nextId;

  const [secState, setSecState] = useState(0);

  const [verifyDisabled, setVerifyDisabled] = useState(
    disabled || nextId != 350
  );
  const [prepareDisabled, setPrepareDisabled] = useState(
    disabled || nextId != 700 || xMinWait(order.approvalDate)
  );
  const [deliverDisabled, setDeliverDisabled] = useState(
    disabled || !nextId || xMinWait(order.preparationDate)
  );

  useEffect(() => {
    const nextId = orderStatuses.filter((s) => s.id === order.status)[0]
      ?.nextId;
    setVerifyDisabled(disabled || nextId !== 350);
    setPrepareDisabled(
      disabled || nextId !== 700 || xMinWait(order.approvalDate)
    );
    setDeliverDisabled(disabled || !nextId || xMinWait(order.preparationDate));
  }, [secState, order]);

  return (
    <div className="fixed bottom-0 right-0 left-0 flex gap-2 sm:gap-4 p-2 py-3.5 bg-white border-t border-[--light-4] text-xs whitespace-nowrap">
      <button
        onClick={verifyOrder}
        disabled={verifyDisabled}
        className={`bg-[--status-green] border-[--green-1] ${btnClass}`}
      >
        {order.approvalDate ? (
          <>
            <p>Onaylandı</p>
            <p>
              {formatDateString(
                order.approvalDate,
                false,
                false,
                false,
                true,
                true,
                false
              )}
            </p>
          </>
        ) : (
          "Onayla"
        )}
      </button>

      <button
        onClick={prepareOrder}
        disabled={prepareDisabled}
        className={`bg-[--status-purple] border-[--purple-1] ${btnClass}`}
      >
        {order.preparationDate ? (
          <>
            <p>Yola Çıktı</p>
            <p>
              {formatDateString(
                order.preparationDate,
                false,
                false,
                false,
                true,
                true,
                false
              )}
            </p>
          </>
        ) : (
          <>
            <p>Yola Çıkart</p>
            {350 <= order.status &&
              order.status <= 600 &&
              order.status != 400 &&
              xMinWait(order.approvalDate) && (
                <p>
                  Bekle:{" "}
                  <RemainingSeconds
                    date={order.approvalDate}
                    state={secState}
                    setState={setSecState}
                  />{" "}
                  Sn
                </p>
              )}
          </>
        )}
      </button>

      <button
        onClick={deliverOrder}
        disabled={deliverDisabled}
        className={`bg-[--status-brown] border-[--brown-1] ${btnClass}`}
      >
        {order.deliveryDate ? (
          <>
            <p>Teslim Edildi</p>
            <p>
              {formatDateString(
                order.deliveryDate,
                false,
                false,
                false,
                true,
                true,
                false
              )}
            </p>
          </>
        ) : (
          <>
            <p>Teslim Et</p>
            {order.status == 700 && xMinWait(order.preparationDate) && (
              <p>
                Bekle:{" "}
                <RemainingSeconds
                  date={order.preparationDate}
                  state={secState}
                  setState={setSecState}
                />{" "}
                Sn
              </p>
            )}
          </>
        )}
      </button>
      <button
        onClick={cancelOrder}
        disabled={
          disabled ||
          order.status == 900 ||
          order.status == 1500 ||
          order.status == 1600
        }
        className={`bg-[--status-red] border-[--red-1] ${btnClass}`}
      >
        İptal Et
      </button>
    </div>
  );
};

export default GetirYemekStatusButtons;

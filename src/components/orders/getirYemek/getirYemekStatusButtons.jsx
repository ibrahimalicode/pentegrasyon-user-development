//MODULES
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";

//UTILS
import { formatDateString } from "../../../utils/utils";
import { compareWithCurrentDateTime } from "../../../utils/utils";
import { useGetirYemekOrderActions } from "./useGetirYemekOrderActions";
import getirYemekOrderStatuses from "../../../enums/getirYemekOrderStatuses";

//COMP
import PrintComponent from "../components/printComponent";
import GetirYemekPrintOrder from "./getirYemekPrintOrder";
import RemainingSeconds from "../components/remainingSeconds";
import GetirYemekCancelOrderPopup from "./getirYemekCancelOrderPopup";
import GetirYemekOrderErrorPopup from "./getirYemekOrderErrorPopup";

const GetirYemekStatusButtons = ({ order, setOrdersData, setSideOrder }) => {
  const { setPopupContent } = usePopup();
  const { setSlideBarContent } = useSlideBar();

  const ticketId = order.id;
  const { verifyOrder, prepareOrder, deliverOrder } = useGetirYemekOrderActions(
    { order, ticketId, setOrdersData, setSideOrder }
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

  function cancelOrder() {
    setSlideBarContent(null);
    setPopupContent(<GetirYemekCancelOrderPopup ticketId={ticketId} />);
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

  const nextId = getirYemekOrderStatuses.filter((s) => s.id === order.status)[0]
    ?.nextId;

  const [secState, setSecState] = useState(0);

  const [verifyDisabled, setVerifyDisabled] = useState(
    disabled || nextId != 350
  );
  const [prepareDisabled, setPrepareDisabled] = useState(
    disabled || nextId != 700 || xMinWait(order.approvalDate)
  );
  const [deliverDisabled, setDeliverDisabled] = useState(
    disabled || !nextId || xMinWait(order.preparationDate, 10)
  );
  const [cancelDisabled, setCancelDisabled] = useState(
    disabled ||
      order.status == 900 ||
      order.status == 1500 ||
      order.status == 1600 ||
      order.cancelDate
  );

  useEffect(() => {
    const nextId = getirYemekOrderStatuses.filter(
      (s) => s.id === order.status
    )[0]?.nextId;
    setVerifyDisabled(disabled || nextId !== 350);
    setPrepareDisabled(
      disabled || nextId !== 700 || xMinWait(order.approvalDate)
    );
    setDeliverDisabled(
      disabled || !nextId || xMinWait(order.preparationDate, 10)
    );
    setCancelDisabled(
      disabled ||
        order.status == 900 ||
        order.status == 1500 ||
        order.status == 1600 ||
        order.cancelDate
    );
  }, [
    secState,
    order,
    verifyLoading,
    prepareLoading,
    deliverLoading,
    cancelLoading,
  ]);

  //ORDER ONLY DB ACTION POPUP
  useEffect(() => {
    if (verifyErr || prepareErr || deliverErr || cancelErr) {
      const actionError = verifyErr || prepareErr || deliverErr || cancelErr;

      if (actionError.ticketId == order.id && actionError.statusCode == 400) {
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
              {formatDateString({
                dateString: order.approvalDate,
                letDay: false,
                letMonth: false,
                letYear: false,
                hour: true,
                min: true,
              })}
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
              {formatDateString({
                dateString: order.preparationDate,
                letDay: false,
                letMonth: false,
                letYear: false,
                hour: true,
                min: true,
              })}
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
              {formatDateString({
                dateString: order.deliveryDate,
                letDay: false,
                letMonth: false,
                letYear: false,
                hour: true,
                min: true,
              })}
            </p>
          </>
        ) : (
          <>
            <p>Teslim Et</p>
            {order.status == 700 && xMinWait(order.preparationDate, 10) && (
              <p>
                Bekle:{" "}
                <RemainingSeconds
                  date={order.preparationDate}
                  state={secState}
                  setState={setSecState}
                  m={10}
                />{" "}
                Sn
              </p>
            )}
          </>
        )}
      </button>
      <button
        onClick={cancelOrder}
        disabled={cancelDisabled}
        className={`bg-[--status-red] border-[--red-1] ${btnClass}`}
      >
        {order.cancelDate ? (
          <>
            <p>İptal Edildi</p>
            <p>
              {formatDateString({
                dateString: order.cancelDate,
                letDay: false,
                letMonth: false,
                letYear: false,
                hour: true,
                min: true,
              })}
            </p>
          </>
        ) : (
          "İptal Et"
        )}
      </button>
      <div className="w-full max-w-16 bg-gray-200 flex justify-center items-center rounded-md">
        {<PrintComponent component={<GetirYemekPrintOrder order={order} />} />}
      </div>
    </div>
  );
};

export default GetirYemekStatusButtons;

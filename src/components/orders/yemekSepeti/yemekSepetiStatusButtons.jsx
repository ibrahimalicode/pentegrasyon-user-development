import { useSelector } from "react-redux";
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";
import { useYemekSepetiOrderActions } from "./useYemekSepetiOrderActions";
import {
  compareWithCurrentDateTime,
  formatDateString,
} from "../../../utils/utils";
import { useEffect, useState } from "react";
import RemainingSeconds from "../components/remainingSeconds";
import PrintComponent from "../components/printComponent";
import YemekSepetiPrintOrder from "./yemekSepetiPrintOrder";
import YemekSepetoOrderErrorPopup from "./yemekSepetiOrderErrorPopup";
import YemekSepetiCancelOrderPopup from "./yemekSepetiCancelOrderPopup";

const YemekSepetiStatusButtons = ({ order, setOrdersData, setSideOrder }) => {
  const { setPopupContent } = usePopup();
  const { setSlideBarContent } = useSlideBar();

  const ticketId = order.id;
  const { verifyOrder, prepareOrder, deliverOrder } =
    useYemekSepetiOrderActions({
      order,
      ticketId,
      setOrdersData,
      setSideOrder,
    });

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

  function cancelOrder() {
    setSlideBarContent(null);
    setPopupContent(
      <YemekSepetiCancelOrderPopup
        order={order}
        ticketId={ticketId}
        setOrdersData={setOrdersData}
      />
    );
  }

  function xMinuteAhead(date, x) {
    return new Date(new Date(date).getTime() + 60000 * x);
  }

  const btnClass =
    "py-2 px-1 sm:px-4 rounded-md border text-[--black-1] disabled:cursor-not-allowed disabled:opacity-50";
  const disabled =
    verifyLoading || prepareLoading || deliverLoading || cancelLoading;

  function xMinWait(date, min = 1) {
    if (!date) {
      return true;
    }
    return (
      compareWithCurrentDateTime(xMinuteAhead(date, min)).remainingSeconds > 0
    );
  }

  const [secState, setSecState] = useState(0);

  const [verifyDisabled, setVerifyDisabled] = useState(
    disabled || order.status != 0
  );
  const [prepareDisabled, setPrepareDisabled] = useState(
    disabled || order.status != 1 || xMinWait(order.approvalDate)
  );
  const [deliverDisabled, setDeliverDisabled] = useState(
    disabled || order.status != 2 || xMinWait(order.preparationDate)
  );
  const [cancelDisabled, setCancelDisabled] = useState(
    disabled || order.status == 3 || order.status == 4 || order.cancelDate
  );

  useEffect(() => {
    setVerifyDisabled(disabled || order.status !== 0);
    setPrepareDisabled(
      disabled || order.status != 1 || xMinWait(order.approvalDate)
    );
    setDeliverDisabled(
      disabled || order.status != 2 || xMinWait(order.preparationDate)
    );
    setCancelDisabled(
      disabled || order.status == 3 || order.status == 4 || order.cancelDate
    );
  }, [
    secState,
    order,
    verifyLoading,
    prepareLoading,
    deliverLoading,
    cancelLoading,
  ]);

  useEffect(() => {
    if (verifyErr || prepareErr || deliverErr || cancelErr) {
      const actionError = verifyErr || prepareErr || deliverErr || cancelErr;
      if (actionError.ticketId == order.id) {
        setPopupContent(
          <YemekSepetoOrderErrorPopup
            order={order}
            ticketId={ticketId}
            setOrdersData={setOrdersData}
            setSideOrder={setSideOrder}
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
            <p>Onaylandıdd</p>
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
            {order.status == 1 && xMinWait(order.approvalDate) && (
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
            {order.status == 2 && xMinWait(order.preparationDate) && (
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
        disabled={cancelDisabled}
        className={`bg-[--status-red] border-[--red-1] ${btnClass}`}
      >
        {order.cancelDate ? (
          <>
            <p>İptal Edildi</p>
            <p>
              {formatDateString(
                order.cancelDate,
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
          "İptal Et"
        )}
      </button>
      <div className="w-full max-w-16 bg-gray-200 flex justify-center items-center rounded-md">
        {<PrintComponent component={<YemekSepetiPrintOrder order={order} />} />}
      </div>
    </div>
  );
};

export default YemekSepetiStatusButtons;

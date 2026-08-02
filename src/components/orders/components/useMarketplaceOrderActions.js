//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//UTILS
import { formatByDate } from "../../../utils/utils";
import { usePopup } from "../../../context/PopupContext";
import toastStatusError from "./toastOrderStatError";

// Which order field each transition stamps with the action timestamp.
const DATE_FIELDS = {
  verify: "approvalDate",
  prepare: "preparationDate",
  deliver: "deliveryDate",
  cancel: "cancelDate",
};

// Shared implementation behind the four use<Marketplace>OrderActions hooks.
// `config` is per-marketplace wiring:
//   {
//     stateKey: "getirYemek",          // feature key in the store
//     verify:  { thunk, reset },       // ticket-action thunk + its reset action
//     prepare: { thunk, reset },
//     deliver: { thunk, reset },
//     cancel:  { thunk, reset },
//   }
// Store sub-keys (verifyTicket/prepareTicket/deliverTicket/cancelTicket) are
// identical across all marketplaces.
//
// Note: the 408 "time exceeded" check uses loose equality on purpose — the
// backend sends statusCode as a string ("408"). Three of the four original
// hooks compared with === and their toastStatusError never fired; this
// unifies on the GetirYemek behavior, which was the evident intent.
export const useMarketplaceOrderActions = (
  config,
  { order, ticketId, setSideOrder, setOrdersData, onlyInDataBase, cancelOrderData }
) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const applyTransition = (res, dateField, { updateSideOrder }) => {
    if (res?.meta?.requestStatus !== "fulfilled") return;
    const currentDate = new Date().toLocaleString();
    const updatedOrder = {
      ...order,
      status: res.payload.data,
      [dateField]: currentDate,
    };

    setPopupContent(null);
    setOrdersData((prev) => {
      const unChangedOrders = prev.filter((p) => p.id !== res.meta.arg.ticketId);
      return formatByDate([...unChangedOrders, updatedOrder]);
    });
    updateSideOrder && setSideOrder && setSideOrder(updatedOrder);
  };

  // Called once per action in a fixed order, so the hook order is stable.
  const useTicketAction = (action, { onError, updateSideOrder = true } = {}) => {
    const { thunk, reset } = config[action];
    const { loading, success, error } = useSelector(
      (state) => state[config.stateKey][`${action}Ticket`]
    );

    useEffect(() => {
      if (loading) {
        toastId.current = toast.loading("İşleniyor...", { id: "isleniyor" });
      }
      if (error) {
        onError && onError(error);
        dispatch(reset());
      }
      if (success) {
        toast.dismiss(toastId.current);
        toast.success("İşlem başarılı", { id: "order-stat-success" });
        dispatch(reset());
      }
    }, [loading, success, error]);

    return (arg) =>
      dispatch(thunk(arg)).then((res) =>
        applyTransition(res, DATE_FIELDS[action], { updateSideOrder })
      );
  };

  const runVerify = useTicketAction("verify");
  const runPrepare = useTicketAction("prepare", {
    onError: (err) => {
      if (order.id === err.ticketId && err.statusCode == 408) {
        toastStatusError(order.approvalDate);
      }
    },
  });
  const runDeliver = useTicketAction("deliver", {
    onError: (err) => {
      if (order.id === err.ticketId && err.statusCode == 408) {
        toastStatusError(order.preparationDate, 10);
      }
    },
  });
  const runCancel = useTicketAction("cancel", { updateSideOrder: false });

  return {
    verifyOrder: () => runVerify({ ticketId, onlyInDataBase }),
    prepareOrder: () => runPrepare({ ticketId, onlyInDataBase }),
    deliverOrder: () => runDeliver({ ticketId, onlyInDataBase }),
    cancelOrder: () => runCancel(cancelOrderData),
  };
};

//COMP
import { useMarketplaceOrderActions } from "../components/useMarketplaceOrderActions";

//REDUX
import {
  getirYemekTicketVerify,
  resetGetirYemekTicketVerify,
} from "../../../redux/getirYemek/getirYemekTicketVerifySlice";
import {
  getirYemekTicketPrepare,
  resetGetirYemekTicketPrepare,
} from "../../../redux/getirYemek/getirYemekTicketPrepareSlice";
import {
  getirYemekTicketDeliver,
  resetGetirYemekTicketDeliver,
} from "../../../redux/getirYemek/getirYemekTicketDeliverSlice";
import {
  getirYemekTicketCancel,
  resetGetirYemekTicketCancel,
} from "../../../redux/getirYemek/getirYemekTicketCancelSlice";

const CONFIG = {
  stateKey: "getirYemek",
  verify: { thunk: getirYemekTicketVerify, reset: resetGetirYemekTicketVerify },
  prepare: {
    thunk: getirYemekTicketPrepare,
    reset: resetGetirYemekTicketPrepare,
  },
  deliver: {
    thunk: getirYemekTicketDeliver,
    reset: resetGetirYemekTicketDeliver,
  },
  cancel: { thunk: getirYemekTicketCancel, reset: resetGetirYemekTicketCancel },
};

export const useGetirYemekOrderActions = (args) =>
  useMarketplaceOrderActions(CONFIG, args);

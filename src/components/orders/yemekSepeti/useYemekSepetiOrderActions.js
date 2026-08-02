//COMP
import { useMarketplaceOrderActions } from "../components/useMarketplaceOrderActions";

//REDUX
import {
  yemekSepetiTicketVerify,
  resetYemekSepetiTicketVerify,
} from "../../../redux/yemekSepeti/yemekSepetiTicketVerifySlice";
import {
  yemekSepetiTicketPrepare,
  resetYemekSepetiTicketPrepare,
} from "../../../redux/yemekSepeti/yemekSepetiTicketPrepareSlice";
import {
  yemekSepetiTicketDeliver,
  resetYemekSepetiTicketDeliver,
} from "../../../redux/yemekSepeti/yemekSepetiTicketDeliverSlice";
import {
  yemekSepetiTicketCancel,
  resetYemekSepetiTicketCancel,
} from "../../../redux/yemekSepeti/yemekSepetiTicketCancelSlice";

const CONFIG = {
  stateKey: "yemekSepeti",
  verify: {
    thunk: yemekSepetiTicketVerify,
    reset: resetYemekSepetiTicketVerify,
  },
  prepare: {
    thunk: yemekSepetiTicketPrepare,
    reset: resetYemekSepetiTicketPrepare,
  },
  deliver: {
    thunk: yemekSepetiTicketDeliver,
    reset: resetYemekSepetiTicketDeliver,
  },
  cancel: {
    thunk: yemekSepetiTicketCancel,
    reset: resetYemekSepetiTicketCancel,
  },
};

export const useYemekSepetiOrderActions = (args) =>
  useMarketplaceOrderActions(CONFIG, args);

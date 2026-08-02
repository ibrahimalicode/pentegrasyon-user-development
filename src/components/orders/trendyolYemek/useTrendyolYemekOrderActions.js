//COMP
import { useMarketplaceOrderActions } from "../components/useMarketplaceOrderActions";

//REDUX
import {
  trendyolYemekTicketVerify,
  resetTrendyolYemekTicketVerify,
} from "../../../redux/trendyol/trendyolYemekTicketVerifySlice";
import {
  trendyolYemekTicketPrepare,
  resetTrendyolYemekTicketPrepare,
} from "../../../redux/trendyol/trendyolYemekTicketPrepareSlice";
import {
  trendyolYemekTicketDeliver,
  resetTrendyolYemekTicketDeliver,
} from "../../../redux/trendyol/trendyolYemekTicketDeliverSlice";
import {
  trendyolYemekTicketCancel,
  resetTrendyolYemekTicketCancel,
} from "../../../redux/trendyol/trendyolYemekTicketCancelSlice";

const CONFIG = {
  stateKey: "trendyol",
  verify: {
    thunk: trendyolYemekTicketVerify,
    reset: resetTrendyolYemekTicketVerify,
  },
  prepare: {
    thunk: trendyolYemekTicketPrepare,
    reset: resetTrendyolYemekTicketPrepare,
  },
  deliver: {
    thunk: trendyolYemekTicketDeliver,
    reset: resetTrendyolYemekTicketDeliver,
  },
  cancel: {
    thunk: trendyolYemekTicketCancel,
    reset: resetTrendyolYemekTicketCancel,
  },
};

export const useTrendyolYemekOrderActions = (args) =>
  useMarketplaceOrderActions(CONFIG, args);

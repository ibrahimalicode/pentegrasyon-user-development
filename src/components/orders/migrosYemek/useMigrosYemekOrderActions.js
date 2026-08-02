//COMP
import { useMarketplaceOrderActions } from "../components/useMarketplaceOrderActions";

//REDUX
import {
  migrosYemekTicketVerify,
  resetMigrosYemekTicketVerify,
} from "../../../redux/migrosYemek/migrosYemekTicketVerifySlice";
import {
  migrosYemekTicketPrepare,
  resetMigrosYemekTicketPrepare,
} from "../../../redux/migrosYemek/migrosYemekTicketPrepareSlice";
import {
  migrosYemekTicketDeliver,
  resetMigrosYemekTicketDeliver,
} from "../../../redux/migrosYemek/migrosYemekTicketDeliverSlice";
import {
  migrosYemekTicketCancel,
  resetMigrosYemekTicketCancel,
} from "../../../redux/migrosYemek/migrosYemekTicketCancelSlice";

const CONFIG = {
  stateKey: "migrosYemek",
  verify: {
    thunk: migrosYemekTicketVerify,
    reset: resetMigrosYemekTicketVerify,
  },
  prepare: {
    thunk: migrosYemekTicketPrepare,
    reset: resetMigrosYemekTicketPrepare,
  },
  deliver: {
    thunk: migrosYemekTicketDeliver,
    reset: resetMigrosYemekTicketDeliver,
  },
  cancel: {
    thunk: migrosYemekTicketCancel,
    reset: resetMigrosYemekTicketCancel,
  },
};

export const useMigrosYemekOrderActions = (args) =>
  useMarketplaceOrderActions(CONFIG, args);

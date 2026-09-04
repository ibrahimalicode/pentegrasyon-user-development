import { useOrdersContext } from "../../../context/OrdersContext";
import {
  TOOLBAR_STAT,
  TOOLBAR_STAT_LABEL,
  TOOLBAR_STAT_VALUE,
} from "../../common/toolbarStyles";

const OrdersCount = () => {
  // GetTickets' own totalCount — the separate GetTicketCountStatistics
  // round-trip (a ~15s query server-side) told us nothing this doesn't.
  const { totalItems } = useOrdersContext();

  return (
    <div className={TOOLBAR_STAT}>
      <p className={TOOLBAR_STAT_LABEL}>Sipariş Sayısı</p>
      <p className={TOOLBAR_STAT_VALUE}>{totalItems || 0}</p>
    </div>
  );
};

export default OrdersCount;

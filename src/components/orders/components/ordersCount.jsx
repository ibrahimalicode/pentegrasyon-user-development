import { useOrdersContext } from "../../../context/OrdersContext";
import {
  TOOLBAR_STAT,
  TOOLBAR_STAT_LABEL,
  TOOLBAR_STAT_VALUE,
} from "../../common/toolbarStyles";

const OrdersCount = () => {
  const { ordersCount } = useOrdersContext();

  return (
    <div className={TOOLBAR_STAT}>
      <p className={TOOLBAR_STAT_LABEL}>Sipariş Sayısı</p>
      <p className={TOOLBAR_STAT_VALUE}>
        {ordersCount?.totalProcessedOrders?.count || 0}
      </p>
    </div>
  );
};

export default OrdersCount;

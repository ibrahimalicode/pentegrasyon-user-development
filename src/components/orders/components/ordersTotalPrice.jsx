import { formatToPrice } from "../../../utils/utils";
import { cn } from "../../../lib/utils";
import {
  TOOLBAR_STAT,
  TOOLBAR_STAT_LABEL,
  TOOLBAR_STAT_VALUE,
} from "../../common/toolbarStyles";

const OrdersTotalPrice = ({ orders }) => {
  const total = orders?.reduce((sum, order) => {
    const isGetirNotCancelled = order.status !== 1500 && order.status !== 1600;
    const isMigrosNOtCancelled = order.status !== 10 && order.status !== 9;
    const isTrendyolNotCancelled =
      order.packageStatus !== "Cancelled" &&
      order.packageStatus !== "UnSupplied";
    const isYSNotCancelled = order.status !== 4;

    const isNotCancelledArray = [
      isGetirNotCancelled,
      isMigrosNOtCancelled,
      isTrendyolNotCancelled,
      isYSNotCancelled,
    ];
    const isNotCancelled = isNotCancelledArray[order.marketplaceId];

    if (isNotCancelled) {
      return (
        sum +
        (order.totalDiscountedPrice
          ? Number(order.totalDiscountedPrice) //getir iskontolu
          : order?.totalPrice
            ? Number(order.totalPrice) //getir, trendyol
            : order?.grandTotal
              ? Number(order.grandTotal) //YS
              : 0)
      );
    } else {
      return sum;
    }
  }, 0);

  return (
    <div className={cn(TOOLBAR_STAT, "max-sm:hidden")}>
      <p className={TOOLBAR_STAT_LABEL}>Sayfa Toplamı</p>
      <p className={TOOLBAR_STAT_VALUE}>
        {formatToPrice(String(total?.toFixed(2)).replace(".", ","))}
      </p>
    </div>
  );
};

export default OrdersTotalPrice;

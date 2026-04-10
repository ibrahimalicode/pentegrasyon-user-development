import { formatToPrice } from "../../../utils/utils";

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
    <div className="max-sm:hidden border border-[--light-1] rounded-md py-1 px-2 text-xs flex flex-col gap-2  text-[--black-1]">
      <p>Sayfa Toplamı</p>
      <p className=" py-1.5 px-4">
        {formatToPrice(String(total?.toFixed(2)).replace(".", ","))}
      </p>
    </div>
  );
};

export default OrdersTotalPrice;

import { formatToPrice } from "../../../utils/utils";

const OrdersTotalPrice = ({ orders }) => {
  const total = orders?.reduce((sum, order) => {
    return (
      sum +
      (order?.totalPrice
        ? Number(order.totalPrice) //getir
        : order?.grandTotal
        ? Number(order.grandTotal) //YS
        : 0)
    );
  }, 0);

  return (
    <div className="max-sm:hidden border border-[--light-1] rounded-md py-1 px-2 text-xs flex flex-col gap-2">
      <p>Toplam Tutarı</p>
      <p className=" py-1.5 px-4">
        {formatToPrice(String(total?.toFixed(2)).replace(".", ","))}
      </p>
    </div>
  );
};

export default OrdersTotalPrice;

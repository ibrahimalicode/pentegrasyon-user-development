import { useOrdersContext } from "../../../context/OrdersContext";

const OrdersCount = () => {
  const { ordersCount } = useOrdersContext();

  return (
    <div className="border border-[--border-1] rounded-md text-center px-2 pb-0.5 whitespace-nowrap max-h-max">
      <p className="text-xs text-[--black-1] pb-0.5">Sipariş Sayısı</p>
      <p className="border border-[--border-1] rounded-md text-[--red-1]">
        {ordersCount?.totalProcessedOrders?.count || 0}
      </p>
    </div>
  );
};

export default OrdersCount;

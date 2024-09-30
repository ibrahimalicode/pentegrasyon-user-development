import { useEffect } from "react";
import { useSlideBar } from "../../context/SlideBarContext";
import GetirYemekStatusButton from "./getirYemek/getirYemekStatusButton";

// IMAGES
import GetirYemek from "../../assets/img/orders/GetirYemek.png";
import MigrosYemek from "../../assets/img/orders/MigrosYemek.png";
import Siparisim from "../../assets/img/orders/Siparisim.png";
import TrendyolYemek from "../../assets/img/orders/TrendyolYemek.png";
import GoFody from "../../assets/img/orders/GoFody.png";
import Yemeksepeti from "../../assets/img/orders/Yemeksepeti.png";

//UTILS
import { formatDateString, formatOrders } from "../../utils/utils";

//COMP
import { PrinterI } from "../../assets/icon";
import GoogleRoute from "./components/googleRoute";
import RemainingMinutes from "./components/remainingMinutes";
import GetirYemekOrderDetails from "./getirYemek/getirYemekOrderDetails";

//CONTEXT
import { usePopup } from "../../context/PopupContext";
import { useSignalR } from "../../context/SignalRContext";

const marketPlaceAssets = [
  { src: GetirYemek, statusButton: GetirYemekStatusButton },
  { src: MigrosYemek, statusButton: GetirYemekStatusButton },
  { src: TrendyolYemek, statusButton: GetirYemekStatusButton },
  { src: Yemeksepeti, statusButton: GetirYemekStatusButton },
  { src: GoFody, statusButton: GetirYemekStatusButton },
  { src: Siparisim, statusButton: GetirYemekStatusButton },
];

const orderDetails = [
  { src: GetirYemek, orderDetailsComp: GetirYemekOrderDetails },
  { src: MigrosYemek, orderDetailsComp: GetirYemekOrderDetails },
  { src: TrendyolYemek, orderDetailsComp: GetirYemekOrderDetails },
  { src: Yemeksepeti, orderDetailsComp: GetirYemekOrderDetails },
  { src: GoFody, orderDetailsComp: GetirYemekOrderDetails },
  { src: Siparisim, orderDetailsComp: GetirYemekOrderDetails },
];

const OrdersTableBody = ({ order, totalItems, setOrdersData }) => {
  const { setPopupContent } = usePopup();
  const { statusChangedOrder } = useSignalR();
  const { setSlideBarContent } = useSlideBar();

  function getButtonComponent() {
    const StatusButtonComponent =
      marketPlaceAssets[order.marketplaceId]?.statusButton;
    return StatusButtonComponent ? (
      <StatusButtonComponent order={order} setOrdersData={setOrdersData} />
    ) : null;
  }

  function checkDate(date) {
    const today = new Date().getDate();
    const orderDate =
      formatDateString(date, true, false, false) === today
        ? formatDateString(date, false, false, false, true, true, false)
        : formatDateString(date, true, true, true, true, true);
    return orderDate;
  }

  function cellClicked() {
    const OrderDetailsComponent =
      orderDetails[order.marketplaceId]?.orderDetailsComp;

    setSlideBarContent(
      <OrderDetailsComponent
        order={{
          ...order,
          checkedScheduledDate: checkDate(order.scheduledDate),
        }}
        setOrdersData={setOrdersData}
      />
    );
  }

  useEffect(() => {
    if (statusChangedOrder) {
      if (statusChangedOrder.id === order.id && statusChangedOrder) {
        console.log(statusChangedOrder);
        setOrdersData((prev) => {
          const updatedOrder = prev.filter((O) => O.id !== order.id);
          return formatOrders([...updatedOrder, statusChangedOrder]);
        });
      }
    }
  }, [statusChangedOrder]);

  return (
    order && (
      <tr
        className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors text-[--black-1] font-normal cursor-pointer ${
          totalItems < 8 ? "" : "last:border-b-0"
        }`}
      >
        <td onClick={cellClicked} className="pl-4">
          <img
            alt="perntegrasyon-marketplace"
            src={marketPlaceAssets[order.marketplaceId]?.src}
            className="size-10"
          />
        </td>
        <td onClick={cellClicked} className="pl-4 whitespace-nowrap">
          {order.confirmationId}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {order.marketplaceTicketRestaurantName}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          <p>{checkDate(order.checkoutDate)}</p>
          {order.isScheduled &&
            (order.status != 1500 && order.status != 1600 ? (
              <RemainingMinutes date={order.scheduledDate} />
            ) : (
              <span className="text-[--red-1]">İptal edildi</span>
            ))}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {order.client.name}
        </td>
        <td
          onClick={() =>
            setPopupContent(
              <GoogleRoute
                data={{
                  lat1: order.restaurantLatitude,
                  lng1: order.restaurantLongitude,
                  lat2: order.client.latitude,
                  lng2: order.client.longitude,
                }}
                name1={order.marketplaceTicketRestaurantName}
                name2={order.client.name}
              />
            )
          }
          className="whitespace-nowrap"
        >
          <button className="border border-[--primary-1] py-2 px-3 rounded-md">
            {order.client.district}
          </button>
        </td>
        <td
          onClick={() =>
            setPopupContent(
              <GoogleRoute
                data={{
                  lat1: order.courier.latitude,
                  lng1: order.courier.longitude,
                  lat2: order.client.latitude,
                  lng2: order.client.longitude,
                }}
                name1={order.courier.name}
                name2={order.client.name}
              />
            )
          }
          className="whitespace-nowrap"
        >
          <button className="border border-[--primary-1] py-2 px-3 rounded-md">
            {order.courier.name}
          </button>
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {order.totalDiscountedPrice
            ? order.totalDiscountedPrice
            : order.totalPrice}
        </td>
        <td onClick={() => {}} className="whitespace-nowrap">
          {getButtonComponent(order)}
        </td>
        <td className="w-14 relative">
          <div className="flex justify-center w-full bg-[--light-1] py-2 rounded-md">
            <PrinterI />
          </div>
        </td>
      </tr>
    )
  );
};

export default OrdersTableBody;

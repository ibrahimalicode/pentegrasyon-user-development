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
import {
  formatDateString,
  formatOrders,
  formatToPrice,
} from "../../utils/utils";

//COMP
import PrintComponent from "./components/printComponent";
import GoogleRoute from "./components/googleRoute";
import RemainingMinutes from "./components/remainingMinutes";
import GetirYemekPrintOrder from "./getirYemek/getirYemekPrintOrder";
import GetirYemekOrderDetails from "./getirYemek/getirYemekOrderDetails";
import GetirYemekChooseCourier from "./getirYemek/getirYemekChooseCourier";

//CONTEXT
import { usePopup } from "../../context/PopupContext";
import { useSignalR } from "../../context/SignalRContext";

export const marketPlaceAssets = [
  {
    src: GetirYemek,
    statusButton: GetirYemekStatusButton,
    orderDetailsComp: GetirYemekOrderDetails,
    printerComp: GetirYemekPrintOrder,
  },
  {
    src: MigrosYemek,
    statusButton: GetirYemekStatusButton,
    orderDetailsComp: GetirYemekOrderDetails,
    printerComp: GetirYemekPrintOrder,
  },
  {
    src: TrendyolYemek,
    statusButton: GetirYemekStatusButton,
    orderDetailsComp: GetirYemekOrderDetails,
    printerComp: GetirYemekPrintOrder,
  },
  {
    src: Yemeksepeti,
    statusButton: GetirYemekStatusButton,
    orderDetailsComp: GetirYemekOrderDetails,
    printerComp: GetirYemekPrintOrder,
  },
  {
    src: GoFody,
    statusButton: GetirYemekStatusButton,
    orderDetailsComp: GetirYemekOrderDetails,
    printerComp: GetirYemekPrintOrder,
  },
  {
    src: Siparisim,
    statusButton: GetirYemekStatusButton,
    orderDetailsComp: GetirYemekOrderDetails,
    printerComp: GetirYemekPrintOrder,
  },
];

const OrdersTableBody = ({ order, totalItems, setOrdersData }) => {
  const { popupContent, setPopupContent } = usePopup();
  const { statusChangedOrder, setStatusChangedOrder } = useSignalR();
  const { setSlideBarContent } = useSlideBar();

  function isValidDate(date) {
    if (date === "0001-01-01T00:00:00") {
      return "";
    } else {
      return date;
    }
  }

  function getMarketPlaceAssets() {
    const StatusButton = marketPlaceAssets[order.marketplaceId]?.statusButton;
    const OrderDetailsComp =
      marketPlaceAssets[order.marketplaceId]?.orderDetailsComp;
    const PrinterComp = marketPlaceAssets[order.marketplaceId]?.printerComp;

    return {
      StatusButton: (
        <StatusButton
          order={{
            ...order,
            approvalDate: isValidDate(order.approvalDate),
            cancelDate: isValidDate(order.cancelDate),
            deliveryDate: isValidDate(order.deliveryDate),
            preparationDate: isValidDate(order.preparationDate),
          }}
          setOrdersData={setOrdersData}
        />
      ),
      OrderDetailsComp,
      PrinterComp: <PrintComponent component={<PrinterComp order={order} />} />,
    };
  }

  function isCheckoutToday(date) {
    const today = new Date().getDate();
    const orderDate =
      formatDateString(date, true, false, false) === today
        ? formatDateString(date, false, false, false, true, true, false)
        : formatDateString(date, true, true, true, true, true);
    return orderDate;
  }

  function cellClicked() {
    const OrderDetailsComponent =
      marketPlaceAssets[order.marketplaceId]?.orderDetailsComp;

    setSlideBarContent(
      <OrderDetailsComponent
        order={{
          ...order,
          checkedScheduledDate: isCheckoutToday(order.scheduledDate),
        }}
        setOrdersData={setOrdersData}
      />
    );
  }

  useEffect(() => {
    if (statusChangedOrder) {
      if (statusChangedOrder.id === order.id && statusChangedOrder) {
        // console.log(statusChangedOrder);
        setOrdersData((prev) => {
          const updatedOrder = prev.filter((O) => O.id !== order.id);
          return formatOrders([...updatedOrder, statusChangedOrder]);
        });
        if (!popupContent) setStatusChangedOrder(null);
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
          <p>{isCheckoutToday(order.checkoutDate)}</p>
          {order.isScheduled &&
            order.status != 1500 &&
            order.status != 1600 &&
            order.status != 900 && (
              <RemainingMinutes date={order.scheduledDate} />
            )}
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
              <>
                <GetirYemekChooseCourier order={order} />
                {/* <GoogleRoute
                  data={{
                    lat1: order.courier.latitude,
                    lng1: order.courier.longitude,
                    lat2: order.client.latitude,
                    lng2: order.client.longitude,
                  }}
                  name1={order.courier.name}
                  name2={order.client.name}
                /> */}
              </>
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
            ? formatToPrice(
                String(order.totalDiscountedPrice.toFixed(2)).replace(".", ",")
              )
            : formatToPrice(
                String(order.totalPrice.toFixed(2)).replace(".", ",")
              )}
        </td>
        <td onClick={() => {}} className="whitespace-nowrap">
          {getMarketPlaceAssets(order).StatusButton}
        </td>
        <td className="w-14 relative">{getMarketPlaceAssets().PrinterComp}</td>
      </tr>
    )
  );
};

export default OrdersTableBody;

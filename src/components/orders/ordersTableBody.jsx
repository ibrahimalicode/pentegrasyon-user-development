import { useSlideBar } from "../../context/SlideBarContext";
import { GetirYemekStatusButton } from "./getirYemek/getirYemekStatusButtons";

// IMAGES
import GetirYemek from "../../assets/img/orders/GetirYemek.png";
import MigrosYemek from "../../assets/img/orders/MigrosYemek.png";
import Siparisim from "../../assets/img/orders/Siparisim.png";
import TrendyolYemek from "../../assets/img/orders/TrendyolYemek.png";
import GoFody from "../../assets/img/orders/GoFody.png";
import Yemeksepeti from "../../assets/img/orders/Yemeksepeti.png";
import { formatDateString } from "../../utils/utils";
import OrderDetails from "./components/orderDetails";
import RemainingMinutes from "./components/remainingMinutes";
import { PrinterI } from "../../assets/icon";
import { useState } from "react";
import GoogleRoute from "./components/googleRoute";
import { usePopup } from "../../context/PopupContext";

const marketPlaceAssets = [
  { src: GetirYemek, statusButton: GetirYemekStatusButton },
  { src: MigrosYemek, statusButton: GetirYemekStatusButton },
  { src: TrendyolYemek, statusButton: GetirYemekStatusButton },
  { src: Yemeksepeti, statusButton: GetirYemekStatusButton },
  { src: GoFody, statusButton: GetirYemekStatusButton },
  { src: Siparisim, statusButton: GetirYemekStatusButton },
];

const OrdersTableBody = ({ data, totalItems }) => {
  const { setPopupContent } = usePopup();
  const { setSlideBarContent } = useSlideBar();

  const [order, setOrder] = useState(data);

  function getButtonComponent() {
    const StatusButtonComponent =
      marketPlaceAssets[order.marketplaceId]?.statusButton;
    return StatusButtonComponent ? (
      <StatusButtonComponent order={order} />
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
    setSlideBarContent(
      <OrderDetails
        order={{
          ...order,
          checkedScheduledDate: checkDate(data.scheduledDate),
        }}
        setOrder={setOrder}
      />
    );
  }

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
            src={marketPlaceAssets[data.marketplaceId]?.src}
            className="size-10"
          />
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {data.confirmationId}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {data.marketplaceTicketRestaurantName}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          <p>{checkDate(data.checkoutDate)}</p>
          {data.isScheduled && <RemainingMinutes date={data.scheduledDate} />}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {data.client.name}
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
              />
            )
          }
          className="whitespace-nowrap"
        >
          <button className="border border-[--primary-1] py-2 px-3 rounded-md">
            {data.client.district}
          </button>
        </td>
        <td onClick={() => {}} className="whitespace-nowrap">
          {data.courier.name}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {data.totalPrice}
        </td>
        <td onClick={() => {}} className="whitespace-nowrap">
          {getButtonComponent(data)}
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

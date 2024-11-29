//MODULES
import { useEffect } from "react";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSignalR } from "../../../context/SignalRContext";
import { useSlideBar } from "../../../context/SlideBarContext";

//UTILS
import { formatOrders } from "../../../utils/utils";
import { formatToPrice } from "../../../utils/utils";
import { formatDateString } from "../../../utils/utils";
import courierServiceTypes from "../../../enums/courierServiceType";

//COMP
import GoogleRoute from "../components/googleRoute";
import PrintComponent from "../components/printComponent";
import YemekSepetiPrintOrder from "./yemekSepetiPrintOrder";
import RemainingMinutes from "../components/remainingMinutes";
import YemekSepetiOrderDetails from "./yemekSepetiOrderDetails";
import YemekSepetiStatusButton from "./yemekSepetiStatusButton";
import YemekSepetiChooseCourier from "./yemekSepetiChooseCourier";
import YemekSepeti from "../../../assets/img/orders/YemekSepeti.png";

const YemekSepetiTableBody = ({ order, totalItems, setOrdersData }) => {
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

  function isCheckoutToday(date) {
    const today = new Date().getDate();
    const orderDate =
      formatDateString(date, true, false, false) === today
        ? formatDateString(date, false, false, false, true, true, false)
        : formatDateString(date, true, true, true, true, true);
    return orderDate;
  }

  function cellClicked() {
    setSlideBarContent(
      <YemekSepetiOrderDetails
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
            src={YemekSepeti}
            className="size-10"
          />
        </td>
        <td onClick={cellClicked} className="pl-4 whitespace-nowrap">
          {order.shortCode}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {order.restaurantName}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          <p>{isCheckoutToday(order.createdDateTime)}</p>
          {order.isScheduled &&
            order.status != 1500 &&
            order.status != 1600 &&
            order.status != 900 && (
              <RemainingMinutes date={order.scheduledDate} />
            )}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {order.customer.firstName}
        </td>
        <td
          onClick={() =>
            setPopupContent(
              <GoogleRoute
                data={{
                  lat1: order.restaurantLatitude,
                  lng1: order.restaurantLongitude,
                  lat2: order.customer.latitude,
                  lng2: order.customer.longitude,
                }}
                name1={order.restaurantName}
                name2={order.customer.firstName}
              />
            )
          }
          className="whitespace-nowrap"
        >
          <button className="border border-[--primary-1] py-2 px-3 rounded-md">
            {order?.customer?.deliveryMainArea?.split(" ")[0]}
          </button>
        </td>
        <td
          onClick={() =>
            setPopupContent(<YemekSepetiChooseCourier order={order} />)
          }
          className="whitespace-nowrap"
        >
          <button className="border border-[--primary-1] py-2 px-3 rounded-md">
            {(() => {
              const currentCourier = courierServiceTypes.filter(
                (T) => T.licenseTypeId === order.courierTypeId
              );
              return currentCourier.length
                ? currentCourier[0].label
                : order?.courier?.name; //YS kurye adi
            })()}
          </button>
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {Number(order.discountAmountTotal)
            ? formatToPrice(
                String(Number(order.discountAmountTotal).toFixed(2)).replace(
                  ".",
                  ","
                )
              )
            : formatToPrice(
                String(Number(order.grandTotal).toFixed(2)).replace(".", ",")
              )}
        </td>
        <td onClick={() => {}} className="whitespace-nowrap">
          <YemekSepetiStatusButton
            order={{
              ...order,
              approvalDate: isValidDate(order.approvalDate),
              cancelDate: isValidDate(order.cancelDate),
              deliveryDate: isValidDate(order.deliveryDate),
              preparationDate: isValidDate(order.preparationDate),
            }}
            setOrdersData={setOrdersData}
          />
        </td>
        <td className="w-14 relative">
          {
            <PrintComponent
              component={<YemekSepetiPrintOrder order={order} />}
            />
          }
        </td>
      </tr>
    )
  );
};

export default YemekSepetiTableBody;

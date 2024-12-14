// IMAGES
import GetirYemek from "../../../assets/img/orders/GetirYemek.png";

//UTILS
import { formatToPrice } from "../../../utils/utils";
import { formatDateString } from "../../../utils/utils";
import courierServiceTypes from "../../../enums/courierServiceType";

//COMP
import GoogleRoute from "../components/googleRoute";
import PrintComponent from "../components/printComponent";
import GetirYemekPrintOrder from "./getirYemekPrintOrder";
import RemainingMinutes from "../components/remainingMinutes";
import GetirYemekOrderDetails from "./getirYemekOrderDetails";
import GetirYemekChooseCourier from "./getirYemekChooseCourier";
import GetirYemekStatusButton from "./getirYemekStatusButton";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";

const GetirYemekTableBody = ({ order, totalItems, setOrdersData }) => {
  const { setPopupContent } = usePopup();
  const { setSlideBarContent } = useSlideBar();

  function isValidDate(date) {
    return date.startsWith("0001-01-01T00:00:00") ? "" : date;
  }

  function isCheckoutToday(date) {
    const today = new Date().getDate();
    const orderDate =
      formatDateString({
        dateString: date,
        letMonth: false,
        letYear: false,
      }) === today
        ? formatDateString({
            dateString: date,
            letDay: false,
            letMonth: false,
            letYear: false,
            hour: true,
            min: true,
          })
        : formatDateString({ dateString: date, hour: true, min: true });
    return orderDate;
  }

  function cellClicked() {
    setSlideBarContent(
      <GetirYemekOrderDetails
        order={{
          ...order,
          checkedScheduledDate: isCheckoutToday(order.scheduledDate),
        }}
        setOrdersData={setOrdersData}
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
            src={GetirYemek}
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
          {order?.client?.name}
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
          className={`whitespace-nowrap ${
            order.deliveryType == 1 && "pointer-events-none"
          }`}
        >
          <button className="border border-[--primary-1] py-2 px-3 rounded-md">
            {order.deliveryType == 1
              ? "Kurye Bilgisinde"
              : order?.client?.district}
          </button>
        </td>
        <td
          onClick={() =>
            setPopupContent(<GetirYemekChooseCourier order={order} />)
          }
          className={`whitespace-nowrap ${
            order.deliveryType == 1 && "pointer-events-none"
          }`}
        >
          <button className="border border-[--primary-1] py-2 px-3 rounded-md">
            {(() => {
              const currentCourier = courierServiceTypes.filter(
                (T) => T.licenseTypeId === order.courierTypeId
              );

              return currentCourier.length && order.deliveryType != 1
                ? currentCourier[0].label
                : "Getir Kuryesi";
            })()}
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
          <GetirYemekStatusButton
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
              component={
                <GetirYemekPrintOrder
                  order={{
                    ...order,
                    checkedScheduledDate: isCheckoutToday(order.scheduledDate),
                  }}
                />
              }
            />
          }
        </td>
      </tr>
    )
  );
};

export default GetirYemekTableBody;

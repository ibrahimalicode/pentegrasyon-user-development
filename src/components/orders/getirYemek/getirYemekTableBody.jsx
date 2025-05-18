// IMAGES
import GetirYemek from "../../../assets/img/orders/GetirYemek.png";

//UTILS
import { formatToPrice } from "../../../utils/utils";
import { formatDateString } from "../../../utils/utils";
import courierServiceTypes from "../../../enums/courierServiceType";

//COMP
import GoogleRoute from "../components/googleRoute";
import ChooseCourier from "../components/chooseCourier";
import PrintComponent from "../components/printComponent";
import GetirYemekPrintOrder from "./getirYemekPrintOrder";
import RemainingMinutes from "../components/remainingMinutes";
import GetirYemekOrderDetails from "./getirYemekOrderDetails";
import GetirYemekStatusButton from "./getirYemekStatusButton";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";
import { GetirYemekAddress } from "../components/marketplaceAddresses";
import toast from "react-hot-toast";

const GetirYemekTableBody = ({
  licenses,
  order,
  totalItems,
  setOrdersData,
}) => {
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
    const currentLicense = licenses.find(
      (L) => L.restaurantId === order.restaurantId
    );
    if (currentLicense && !currentLicense?.isActive) {
      toast.error("Lisan Süresi Bitmiştir! Lütfen lisansınızı uzatınız.");
      return;
    }

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
            className="size-10 rounded-full"
          />
        </td>
        <td onClick={cellClicked} className="pl-4 whitespace-nowrap">
          {order.confirmationId}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap relative">
          {order.marketplaceTicketRestaurantName}
          <span className="absolute top-2 left-0 bg-[--status-green] border border-[--green-1] py-1.5 px-3 rounded-md opacity-0 hover:opacity-100">
            {order.restaurantName}
          </span>
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
            setPopupContent(
              <ChooseCourier
                order={order}
                setOrdersData={setOrdersData}
                Address={GetirYemekAddress}
                locatioData={{
                  lat1: order.restaurantLatitude,
                  lng1: order.restaurantLongitude,
                  lat2: order.client.latitude,
                  lng2: order.client.longitude,
                }}
              />
            )
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
                ? currentCourier[0].id === 0 && order?.courier?.username
                  ? order?.courier?.username
                  : currentCourier[0].label
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

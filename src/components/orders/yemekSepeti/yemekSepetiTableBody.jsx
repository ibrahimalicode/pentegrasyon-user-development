//MODULES

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";

//UTILS
import { formatToPrice } from "../../../utils/utils";
import { formatDateString } from "../../../utils/utils";
import courierServiceTypes from "../../../enums/courierServiceType";

//COMP
import GoogleRoute from "../components/googleRoute";
import ChooseCourier from "../components/chooseCourier";
import PrintComponent from "../components/printComponent";
import YemekSepetiPrintOrder from "./yemekSepetiPrintOrder";
import RemainingMinutes from "../components/remainingMinutes";
import YemekSepetiOrderDetails from "./yemekSepetiOrderDetails";
import YemekSepetiStatusButton from "./yemekSepetiStatusButton";
import YemekSepeti from "../../../assets/img/orders/YemekSepeti.png";
import { YemekSepetiAddress } from "../components/marketplaceAddresses";

const YemekSepetiTableBody = ({ order, totalItems, setOrdersData }) => {
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
      <YemekSepetiOrderDetails
        order={{
          ...order,
          checkedScheduledDate: isCheckoutToday(order.scheduledDate),
        }}
        setOrdersData={setOrdersData}
      />
    );
  }

  function formatOrder() {
    const formattdOrder = order.orders.flatMap((order) =>
      order.options.length > 0
        ? order.options.map((option) => ({
            ...order,
            options: [option],
          }))
        : [order]
    );
    return { ...order, orders: formattdOrder };
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
            src={YemekSepeti}
            className="size-10"
          />
        </td>
        <td onClick={cellClicked} className="pl-4 whitespace-nowrap">
          {order.code}
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
          <button
            className={`border py-2 px-3 rounded-md ${
              order.expeditionType.toLocaleLowerCase() == "pickup"
                ? "border-[--green-1] text-[--green-1]"
                : "border-[--primary-1]"
            }`}
          >
            {order.expeditionType.toLocaleLowerCase() == "pickup"
              ? "Gel Al"
              : order?.customer?.deliveryMainArea?.split(" ")[0]}
          </button>
        </td>
        <td
          onClick={() =>
            setPopupContent(
              <ChooseCourier
                order={order}
                setOrdersData={setOrdersData}
                Address={YemekSepetiAddress}
              />
            )
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
              component={<YemekSepetiPrintOrder order={formatOrder()} />}
            />
          }
        </td>
      </tr>
    )
  );
};

export default YemekSepetiTableBody;

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
import MigrosYemekPrintOrder from "./migrosYemekPrintOrder";
import MigrosYemekOrderDetails from "./migrosYemekOrderDetails";
import MigrosYemekStatusButton from "./migrosYemekStatusButton";
import MigrosYemek from "../../../assets/img/orders/MigrosYemek.png";
import { MigrosYemekAddress } from "../components/marketplaceAddresses";

const MigrosYemekTableBody = ({
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
    if (currentLicense && !currentLicense?.isActive) return;

    setSlideBarContent(
      <MigrosYemekOrderDetails order={order} setOrdersData={setOrdersData} />
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
            src={MigrosYemek}
            className="size-10 rounded-full"
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
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {order.customer.firstName + " " + order.customer.lastName}
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
            className={`border py-2 px-3 rounded-md border-[--primary-1]`}
          >
            {order.customer.district}
          </button>
        </td>
        <td
          onClick={() =>
            setPopupContent(
              <ChooseCourier
                order={order}
                setOrdersData={setOrdersData}
                Address={MigrosYemekAddress}
                locatioData={{
                  lat1: order.restaurantLatitude,
                  lng1: order.restaurantLongitude,
                  lat2: order.customer.latitude,
                  lng2: order.customer.longitude,
                }}
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
                : order?.courier?.name; //MY kurye adi
            })()}
          </button>
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {order.discountedPrice == order.totalPrice
            ? formatToPrice(
                String(order.totalPrice.toFixed(2)).replace(".", ",")
              )
            : formatToPrice(
                String(order.discountedPrice.toFixed(2)).replace(".", ",")
              )}
        </td>
        <td onClick={() => {}} className="whitespace-nowrap">
          <MigrosYemekStatusButton
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
              component={<MigrosYemekPrintOrder order={formatOrder()} />}
            />
          }
        </td>
      </tr>
    )
  );
};

export default MigrosYemekTableBody;

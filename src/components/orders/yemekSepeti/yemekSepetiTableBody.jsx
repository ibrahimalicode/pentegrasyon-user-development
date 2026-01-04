//MODULES
import toast from "react-hot-toast";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";

//UTILS
import { checkLeng, formatToPrice } from "../../../utils/utils";
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

const YemekSepetiTableBody = ({
  order,
  licenses,
  totalItems,
  setOrdersData,
  canSelectCourier,
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
      <YemekSepetiOrderDetails
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
            src={YemekSepeti}
            className="size-10 rounded-full"
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
          {order?.preOrder && order.status != 3 && order.status != 4 && (
            <RemainingMinutes date={order.expectedDeliveryTime} />
          )}
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {order.customer.firstName + " " + order.customer.lastName}
        </td>
        <td
          className={`whitespace-nowrap ${
            !order?.customer?.deliveryMainArea && "pointer-events-none"
          }`}
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
                order={order}
                setOrdersData={setOrdersData}
              />
            )
          }
        >
          <button
            className={`border relative group py-2 px-3 rounded-md ${
              order.expeditionType.toLocaleLowerCase() == "pickup"
                ? "border-[--green-1] text-[--green-1]"
                : "border-[--primary-1]"
            }`}
          >
            {order.expeditionType.toLocaleLowerCase() == "pickup"
              ? "Gel Al"
              : checkLeng(order?.customer?.deliveryMainArea) ||
                "Kurye Bilgisinde"}

            {order?.customer?.deliveryMainArea?.length > 25 && (
              <span className="absolute -left-1 -top-1 group-hover:opacity-100 opacity-0 bg-[--white-1] z-[999] p-3 rounded-md border border-[--primary-2] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-150 ease-out">
                <p className="w-full">{order?.customer?.deliveryMainArea}</p>
              </span>
            )}
          </button>
        </td>
        <td
          className={`whitespace-nowrap ${
            (order.expressDelivery || !canSelectCourier) &&
            "pointer-events-none"
          } `}
          onClick={() =>
            setPopupContent(
              <ChooseCourier
                order={order}
                setOrdersData={setOrdersData}
                Address={YemekSepetiAddress}
                locatioData={{
                  lat1: order.restaurantLatitude,
                  lng1: order.restaurantLongitude,
                  lat2: order.customer.latitude,
                  lng2: order.customer.longitude,
                }}
              />
            )
          }
        >
          <button className="border border-[--primary-1] py-2 px-3 rounded-md">
            {order.expressDelivery
              ? "YS Kuryesi"
              : (() => {
                  const custAdd = order?.customer?.deliveryMainArea;
                  const currentCourier = courierServiceTypes.filter(
                    (T) => T.licenseTypeId === order.courierTypeId
                  );

                  return custAdd
                    ? currentCourier[0].id === 0 && order?.courier?.username
                      ? order?.courier?.username
                      : currentCourier[0].label
                    : "Platform Kuryesi";
                })()}
          </button>
        </td>
        <td onClick={cellClicked} className="whitespace-nowrap">
          {formatToPrice(
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

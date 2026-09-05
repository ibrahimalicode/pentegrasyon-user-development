//MODULES
import toast from "react-hot-toast";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";

//UTILS
import { cn } from "../../../lib/utils";
import { formatDateString } from "../../../utils/utils";
import { checkLeng, formatToPrice } from "../../../utils/utils";
import courierServiceTypes from "../../../enums/courierServiceType";

//COMP
import { TR, TD, CELL_CHIP } from "../../common/tableStyles";
import GoogleRoute from "../components/googleRoute";
import ChooseCourier from "../components/chooseCourier";
import PrintComponent from "../components/printComponent";
import RemainingMinutes from "../components/remainingMinutes";
import TrendyolOrderDetails from "./trendyolYemekOrderDetails";
import TrendyolYemekPrintOrder from "./trendyolYemekPrintOrder";
import TrendyolYemekStatusButton from "./trendyolYemekStatusButton";
import Trendyol from "../../../assets/img/orders/TrendyolYemek.png";
import { TrendyolYemekAddress } from "../components/marketplaceAddresses";
import { calculateTrendyolOrderTotals } from "./orderTotals";

const TrendyolYemekTableBody = ({
  order,
  licenses,
  totalItems,
  setOrdersData,
  licenseSettings,
  canSelectCourier,
}) => {
  const { setPopupContent } = usePopup();
  const { setSlideBarContent } = useSlideBar();
  const { payableTotal } = calculateTrendyolOrderTotals(order);

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
      (L) => L.restaurantId === order.restaurantId,
    );
    if (currentLicense && !currentLicense?.isActive) {
      toast.error("Lisan Süresi Bitmiştir! Lütfen lisansınızı uzatınız.");
      return;
    }

    setSlideBarContent(
      <TrendyolOrderDetails
        order={{
          ...order,
          checkedScheduledDate: isCheckoutToday(order.scheduledDate),
        }}
        setOrdersData={setOrdersData}
        licenseSettings={licenseSettings}
      />,
    );
  }
  // console.log(order);

  return (
    order && (
      <tr
        className={cn(
          TR,
          "text-[--black-1] cursor-pointer",
          totalItems < 8 ? "" : "last:border-b-0",
        )}
      >
        <td onClick={cellClicked} className={cn(TD)}>
          <img
            alt="perntegrasyon-marketplace"
            src={Trendyol}
            className="size-8 rounded-full"
          />
        </td>
        <td onClick={cellClicked} className={cn(TD, "whitespace-nowrap")}>
          {order.orderCode}
        </td>
        <td onClick={cellClicked} className={cn(TD, "max-w-[16rem] truncate")}>
          {order.restaurantName}
        </td>
        <td onClick={cellClicked} className={cn(TD, "whitespace-nowrap")}>
          <p>{isCheckoutToday(order.createdDateTime)}</p>
          {/* {order?.preOrder && order.status != 3 && order.status != 4 && (
            <RemainingMinutes date={order.expectedDeliveryTime} />
          )} */}
        </td>
        <td onClick={cellClicked} className={cn(TD)}>
          {order.customer.firstName + " " + order.customer.lastName}
        </td>
        <td
          className={cn(
            TD,
            (!order?.customer?.addressDescription ||
              order?.deliveryType?.toLocaleLowerCase() == "go") &&
              "pointer-events-none",
          )}
          onClick={() =>
            setPopupContent(
              <GoogleRoute
                data={{
                  lat1: order.restaurantLatitude,
                  lng1: order.restaurantLongitude,
                  lat2: Number(order.customer.latitude),
                  lng2: Number(order.customer.longitude),
                }}
                name1={order.restaurantName}
                name2={[order.customer.firstName, order.customer.lastName]
                  .filter(Boolean)
                  .join(" ")}
                order={order}
                setOrdersData={setOrdersData}
              />,
            )
          }
        >
          <button
            className={cn(
              CELL_CHIP,
              "relative group text-clip overflow-visible whitespace-nowrap cursor-pointer hover:bg-[--light-1] hover:text-[--primary-1] transition-colors",
              order?.deliveryType?.toLocaleLowerCase() !== "store" &&
                order?.deliveryType?.toLocaleLowerCase() !== "go" &&
                "text-[--green-1]",
            )}
          >
            {order?.deliveryType?.toLocaleLowerCase() !== "store" &&
            order?.deliveryType?.toLocaleLowerCase() !== "go"
              ? "Gel Al"
              : (order.customer.addressDescription != "Trendyol Yemek" &&
                  order.customer.addressDescription != "TGO Yemek" &&
                  checkLeng(order?.customer?.addressDescription)) ||
                "Kurye Bilgisinde"}

            {order?.customer?.addressDescription?.length > 25 && (
              <span className="absolute -left-1 -top-1 group-hover:opacity-100 opacity-0 bg-[--white-1] z-[999] p-3 rounded-md border border-[--primary-2] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-150 ease-out">
                <p className="w-full">{order?.customer?.addressDescription}</p>
              </span>
            )}
          </button>
        </td>
        <td
          className={cn(
            TD,
            (!canSelectCourier ||
              order?.deliveryType?.toLocaleLowerCase() == "go") &&
              "pointer-events-none",
          )}
          onClick={() =>
            setPopupContent(
              <ChooseCourier
                order={order}
                setOrdersData={setOrdersData}
                Address={TrendyolYemekAddress}
                locatioData={{
                  lat1: order.restaurantLatitude,
                  lng1: order.restaurantLongitude,
                  lat2: order.customer.latitude,
                  lng2: order.customer.longitude,
                }}
              />,
            )
          }
        >
          <button
            className={cn(
              CELL_CHIP,
              "cursor-pointer hover:bg-[--light-1] hover:text-[--primary-1] transition-colors",
            )}
          >
            {order.expressDelivery
              ? "Trendyol Kuryesi"
              : (() => {
                  const custAdd = order?.customer?.deliveryMainArea;
                  const currentCourier = courierServiceTypes.filter(
                    (T) => T.licenseTypeId === order.courierTypeId,
                  );

                  return custAdd
                    ? currentCourier[0].id === 0 && order?.courier?.username
                      ? order?.courier?.username
                      : currentCourier[0].label
                    : "Platform Kuryesi";
                })()}
          </button>
        </td>
        <td onClick={cellClicked} className={cn(TD, "whitespace-nowrap text-right tabular-nums")}>
          {formatToPrice(String(payableTotal.toFixed(2)).replace(".", ","))}
        </td>
        <td onClick={() => {}} className={cn(TD, "whitespace-nowrap")}>
          <TrendyolYemekStatusButton
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
        <td className={cn(TD, "w-14 relative text-center")}>
          {
            <PrintComponent
              component={<TrendyolYemekPrintOrder order={order} />}
            />
          }
        </td>
      </tr>
    )
  );
};

export default TrendyolYemekTableBody;

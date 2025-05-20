//MODULES
import ReactDOM from "react-dom";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import { useRef, useState } from "react";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useSlideBar } from "../../../context/SlideBarContext";

//UTILS
import { formatToPrice } from "../../../utils/utils";
import { formatDateString } from "../../../utils/utils";
import courierServiceTypes from "../../../enums/courierServiceType";

//COMP
import ToolTip from "../../common/tooltip";
import GoogleRoute from "../components/googleRoute";
import ChooseCourier from "../components/chooseCourier";
import PrintComponent from "../components/printComponent";
import MigrosYemekPrintOrder from "./migrosYemekPrintOrder";
import MigrosYemekOrderDetails from "./migrosYemekOrderDetails";
import MigrosYemekStatusButton from "./migrosYemekStatusButton";
import MigrosCourierStatus from "../../../enums/migrosCourierStatus";
import MigrosYemek from "../../../assets/img/orders/MigrosYemek.png";
import { MigrosYemekAddress } from "../components/marketplaceAddresses";

//ANIMATIONS
import ASSIGNED_FOR_DELIVERY_ANIM from "../../../assets/anim/lottie/ASSIGNED_FOR_DELIVERY.json";
import COURIER_APPROACHED_ANIM from "../../../assets/anim/lottie/COURIER_APPROACHED.json";
import COURIER_ARRIVED_ANIM from "../../../assets/anim/lottie/COURIER_ARRIVED.json";
import IN_DELIVERY_ANIM from "../../../assets/anim/lottie/IN_DELIVERY.json";
import DELIVERED_ANIM from "../../../assets/anim/lottie/DELIVERED.json";

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
    if (currentLicense && !currentLicense?.isActive) {
      toast.error("Lisan Süresi Bitmiştir! Lütfen lisansınızı uzatınız.");
      return;
    }

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
          className={`whitespace-nowrap`}
          onClick={() => {
            if (order?.deliveryProvider?.toUpperCase() !== "RESTAURANT") return;
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
            );
          }}
        >
          <CourierCell order={order} />
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
            {order?.deliveryProvider?.toUpperCase() == "RESTAURANT"
              ? (() => {
                  const currentCourier = courierServiceTypes.filter(
                    (T) => T.licenseTypeId === order.courierTypeId
                  );

                  return currentCourier.length
                    ? currentCourier[0].id === 0 && order?.courier?.username
                      ? order?.courier?.username
                      : currentCourier[0].label
                    : "Bilgi Bulunamadı"; //order?.courier?.name; //MY kurye adi
                })()
              : "Platform Kuryesi"}
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

function CourierCell({ order }) {
  const courierStatAnim = [
    ASSIGNED_FOR_DELIVERY_ANIM,
    COURIER_APPROACHED_ANIM,
    COURIER_ARRIVED_ANIM,
    IN_DELIVERY_ANIM,
    DELIVERED_ANIM,
  ];
  const buttonRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  const courierStat = MigrosCourierStatus.find(
    (S) => S.value == order?.courierStatus?.status?.toUpperCase()
  );

  function showTooltip() {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        top: rect.top + window.scrollY - rect.height - 100,
        left: rect.left + window.scrollX + rect.width / 2 - 110,
      });
    }
  }

  function hideTooltip() {
    setTooltipPos(null);
  }

  return (
    <button
      ref={buttonRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="border rounded-md border-[--primary-1] relative group"
    >
      {order?.deliveryProvider?.toUpperCase() == "RESTAURANT" ? (
        <p className="py-2 px-3">{order.customer.district}</p>
      ) : (
        (() => {
          if (!courierStat || !order?.courierStatus)
            return <p className="py-2 px-3">{order.customer.district}</p>;

          return (
            <div>
              <Lottie
                className="h-[45px] w-20 overflow-hidden"
                animationData={courierStatAnim[courierStat?.id]}
                loop={true}
              />
              {tooltipPos &&
                ReactDOM.createPortal(
                  <div
                    className="absolute min-w-max w-56 flex justify-center bg-[--white-1] border-2 border-[--primary-1] p-1 rounded-md invisible- group-hover:visible z-[99999]"
                    style={{
                      top: tooltipPos.top,
                      left: tooltipPos.left,
                    }}
                  >
                    <div className="">
                      <p className="text-center font-bold text-[--primary-2]">
                        {courierStat?.text}
                      </p>
                      <div className="w-full h-32 flex items-center justify-center">
                        <Lottie
                          className="w-full h-full object-contain"
                          animationData={courierStatAnim[courierStat?.id]}
                          loop={true}
                        />
                      </div>
                      <ToolTip
                        color="--primary-1"
                        className="scale-150 -mb-1"
                      />
                    </div>
                  </div>,
                  document.body
                )}
            </div>
          );
        })()
      )}
    </button>
  );
}

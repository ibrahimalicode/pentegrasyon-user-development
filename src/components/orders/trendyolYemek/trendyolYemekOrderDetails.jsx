//MODELS
import React, { useEffect, useState } from "react";

//COMP
import CloseI from "../../../assets/icon/close";
import TrendyolYemekStatusButtons from "./trendyolYemekStatusButtons";
import { TrendyolYemekAddress } from "../components/marketplaceAddresses";

//CONTEXT
import { useSlideBar } from "../../../context/SlideBarContext";
import { useFirestore } from "../../../context/FirestoreContext";

//UTILS
import { InfoI } from "../../../assets/icon";
import RemainingMinutes from "../components/remainingMinutes";
import courierServiceTypes from "../../../enums/courierServiceType";
import { formatDateString, formatToPrice } from "../../../utils/utils";
import { PaymentMethods } from "../../../enums/trendyolPaymentMethods";
import trendyolYemekOrderStatuses from "../../../enums/trendyolYemekOrderStatuses";

const TrendyolOrderDetails = ({ order, setOrdersData, licenseSettings }) => {
  const { statusChangedOrder, setStatusChangedOrder } = useFirestore();
  const { setSlideBarContent } = useSlideBar();
  const [sideOrder, setSideOrder] = useState(order);

  function isValidDate(date) {
    return date.startsWith("0001-01-01T00:00:00") ? "" : date;
  }

  useEffect(() => {
    if (statusChangedOrder) {
      if (statusChangedOrder.id === order.id && statusChangedOrder) {
        // console.log(statusChangedOrder);
        setSideOrder(statusChangedOrder);
        setStatusChangedOrder(null);
      }
    }
  }, [statusChangedOrder]);

  function getCurrentCourier() {
    if (order.expressDelivery) return "YS Kuryesi";

    const custAdd = order?.customer?.deliveryMainArea;
    const currentCourier = courierServiceTypes.filter(
      (T) => T.licenseTypeId === order.courierTypeId,
    );
    return custAdd ? currentCourier?.[0]?.label : "Platform Kuryesi";
  }
  console.log(order);

  return (
    <main className="w-full h-[100dvh] bg-[--white-2] text-[--black-2] overflow-y-auto px-4 pb-20 text-sm font-normal flex flex-col gap-2 relative">
      <div className="flex items-center -mx-4 text-base bg-[--trendyol] text-white">
        <div className="w-full flex justify-center items-center gap-2">
          <p>Sipariș Detayı</p>
        </div>
        <span
          onClick={() => setSlideBarContent(null)}
          className="p-2 cursor-pointer"
        >
          <CloseI />
        </span>
      </div>

      <div className="bg-[--white-1] p-2 rounded-md flex flex-col gap-1">
        <div className="w-full flex justify-between">
          <p>İşletme</p>
          <p>{order.restaurantName}</p>
        </div>

        <div className="w-full flex justify-between">
          <p>Sipariş durumu</p>
          <p
            style={{
              color: `var(${
                trendyolYemekOrderStatuses.filter(
                  (col) => col.id === sideOrder.packageStatus,
                )[0]?.color
              })`,
            }}
          >
            {
              trendyolYemekOrderStatuses.filter(
                (stat) => stat.id === sideOrder.packageStatus,
              )[0]?.label
            }
          </p>
        </div>

        {isValidDate(sideOrder.cancelDate) && (
          <div className="w-full flex justify-between">
            <p>İptal notu</p>
            <p>
              {sideOrder.cancelMessage}, {sideOrder.cancelNote}
            </p>
          </div>
        )}

        <div className="w-full flex justify-between">
          <p>Ödeme Yöntemi</p>
          <p>
            {
              PaymentMethods.filter(
                (method) => method.value === order.payment.paymentType,
              )[0]?.label
            }
          </p>
        </div>

        <div className="w-full flex justify-between">
          <p>Sipariş Tarihi</p>
          <p>
            {formatDateString({
              dateString: order.createdDateTime,
              hour: true,
              min: true,
            })}
          </p>
        </div>

        <div className="w-full flex justify-between">
          <p>Kurye</p>
          <p className="flex items-center">
            <span className="flex justify-center items-center text-xs size-4 bg-[--green-2] text-[--white-1] rounded-full mr-1">
              {getCurrentCourier().slice(0, 1)}
            </span>
            {getCurrentCourier()}
          </p>
        </div>

        <div className="w-full flex justify-between">
          <p>Onay Kodu</p>
          <p className="bg-[--gr-1] text-[--white-1] px-2 rounded-sm">
            {order.orderCode}
          </p>
        </div>

        {licenseSettings && (
          <div className="w-full flex justify-between">
            <p>Komisyon Oranı</p>
            <p className="bg-[--gr-1] text-[--white-1] px-2 rounded-sm">
              {licenseSettings.commissionRate}%
            </p>
          </div>
        )}
      </div>

      <div className="bg-[--white-1] p-2 rounded-md flex flex-col gap-1">
        <div className="flex">
          <p className="w-1/2">Müşteri</p>
          <p className="w-1/2 text-end">
            {order.customer.firstName + " " + order.customer.lastName}
          </p>
        </div>
        <div className="flex">
          <p className="w-1/2">Tel</p>
          <p className="w-1/2 text-end">{order.customer.phone}</p>
        </div>

        <div className="flex justify-between">
          <p>Adres</p>
          <div className="w-full max-w-[65%] text-end text-[--primary-2]">
            <TrendyolYemekAddress order={order} className="justify-end" />
          </div>
        </div>

        <div className="flex border-t border-[--gr-3] py-2">
          <p className="w-1/2">Adres Tarifi</p>
          <p className="w-1/2 text-end">{order.customer.addressDescription}</p>
        </div>
      </div>

      <div className="bg-[--white-1] p-2 rounded-md flex flex-col gap-3">
        {order.preOrder && (
          <div className="flex border border-[--gr-1] rounded-md overflow-clip">
            <div className="bg-[--red-3] text-[--gr-3] px-4 flex items-center">
              🕑
            </div>
            <div className="w-full p-2 text-xs flex gap-4">
              <p>Teslimat Zamanı:</p>
              <div className="flex gap-4">
                {formatDateString({
                  dateString: order.customer.expectedDeliveryTime,
                  hour: true,
                  min: true,
                })}
                {order.preOrder &&
                  (order.packageStatus != "Cancelled" ? (
                    <RemainingMinutes
                      date={order.customer.expectedDeliveryTime}
                    />
                  ) : (
                    <span className="text-[--red-1]">İptal edildi</span>
                  ))}
              </div>
            </div>
          </div>
        )}

        {order.customer.customerNote && (
          <div className="flex border border-[--gr-1] rounded-md overflow-clip">
            <div className="bg-[--gr-1] text-[--gr-1] px-3 flex items-center">
              <InfoI fill="white" />
            </div>
            <div className="w-full p-2 text-xs italic flex flex-col gap-1">
              <p>{order.customer.customerNote}</p>
            </div>
          </div>
        )}

        <table className="rounded-md overflow-clip h-max">
          <thead className="bg-[--light-3]">
            <tr>
              <th className="p-2 font-normal text-left">Ürün</th>
              <th className="p-2 font-normal text-right">Tutar</th>
            </tr>
          </thead>

          <tbody>
            {sideOrder &&
              sideOrder.orders.map((order, i) => (
                <React.Fragment key={i}>
                  <tr className={`${i}"-here"`}>
                    <td className="p-2 text-left">
                      <div>
                        <span className="bg-[--gr-1] text-[--white-1] px-1.5 py-0.5 mr-0.5 rounded-sm">
                          {order.items.length}
                        </span>
                        {order.name}
                      </div>
                    </td>
                    <td className="p-2 flex justify-end items-start">
                      {formatToPrice(
                        String(Number(order.price).toFixed(2)).replace(
                          ".",
                          ",",
                        ),
                      )}
                    </td>
                  </tr>
                  {order.modifiers.map((mod) => (
                    <React.Fragment key={mod.id}>
                      <tr className="text-xs px-2">
                        <td className="pl-2">{mod.name}</td>
                        <td
                          className={`pr-2 text-right ${
                            mod.price > 0
                              ? "text-[--green-1]"
                              : "text-[--red-1]"
                          }`}
                        >
                          {mod.price > 0 ? `+` : mod.price < 0 ? `-` : ""}
                          {mod.price > 0 &&
                            formatToPrice(
                              String(
                                (
                                  Number(mod.price) *
                                  // Number(mod.quantity) *
                                  Number(order.items.length)
                                ).toFixed(2),
                              ).replace(".", ","),
                            )}
                        </td>
                      </tr>
                      {(Array.isArray(mod.subModifier)
                        ? mod.subModifier
                        : JSON.parse(mod.subModifier || "[]")
                      ).map((subMod) => (
                        <tr key={subMod.id} className="text-xs">
                          <td className="pl-2">▸ {subMod.name}</td>
                          <td
                            className={`pr-2 text-right ${
                              subMod.price > 0
                                ? "text-[--green-1]"
                                : "text-[--red-1]"
                            }`}
                          >
                            {subMod.price > 0
                              ? `+`
                              : subMod.price < 0
                                ? `-`
                                : ""}
                            {subMod.price > 0 &&
                              formatToPrice(
                                String(Number(subMod.price).toFixed(2)).replace(
                                  ".",
                                  ",",
                                ),
                              )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  {(order.comment || order.description) && (
                    <tr>
                      <td className="relative text-sm">
                        <p className="invisible px-2 py-1 flex gap-1">
                          👉 {order.comment}, {order.description}
                        </p>
                        <span className="absolute top-0 left-0 right-0 bg-[--light-3] px-2 py-1 flex gap-1">
                          👉 {order.comment}{" "}
                          {order.description && `, ${order.description}`}
                        </span>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>

        <div className="w-full border-t border-[--gr-1]">
          {Number(order.discountAmountTotal) ? (
            <>
              <div className="w-full flex items-center justify-between gap-2">
                <p>Toplam:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(
                      (
                        Number(order.grandTotal) +
                        Number(order.discountAmountTotal)
                      ).toFixed(2),
                    ).replace(".", ","),
                  )}
                </p>
              </div>
              <div className="w-full flex items-center justify-between gap-2">
                <p>İndirim:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(
                      Number(order.discountAmountTotal).toFixed(2),
                    ).replace(".", ","),
                  )}
                </p>
              </div>
            </>
          ) : null}
          <div className="w-full flex items-center justify-between gap-2">
            <p>Ödenecek Tutar:</p>
            <p className="font-bold text-base">
              {formatToPrice(
                String(Number(order.totalPrice).toFixed(2)).replace(".", ","),
              )}
            </p>
          </div>
        </div>
      </div>

      <TrendyolYemekStatusButtons
        order={{
          ...sideOrder,
          approvalDate: isValidDate(sideOrder.approvalDate),
          cancelDate: isValidDate(sideOrder.cancelDate),
          deliveryDate: isValidDate(sideOrder.deliveryDate),
          preparationDate: isValidDate(sideOrder.preparationDate),
        }}
        setOrdersData={setOrdersData}
        setSideOrder={setSideOrder}
      />
    </main>
  );
};

export default TrendyolOrderDetails;

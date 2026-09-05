//MODELS
import React, { useEffect, useState } from "react";

//COMP
import CloseI from "../../../assets/icon/close";
import TrendyolYemekStatusButtons from "./trendyolYemekStatusButtons";
import {
  TrendyolYemekAddress,
  trendyolAddressText,
} from "../components/marketplaceAddresses";

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
import {
  calculateTrendyolOrderTotals,
  calculateTrendyolDiscountSplit,
} from "./orderTotals";

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

  const {
    grossTotal: calculatedGrossTotal,
    discountTotal: calculatedDiscount,
    payableTotal: calculatedPayableTotal,
  } = calculateTrendyolOrderTotals(sideOrder);
  const { sellerTotal: discountBySeller, platformTotal: discountByTrendyol } =
    calculateTrendyolDiscountSplit(sideOrder);

  const sponsorPrice = (n) =>
    formatToPrice(String(Number(n).toFixed(2)).replace(".", ","));

  console.log(order);

  return (
    <main className="w-full h-[100dvh] bg-[--white-2] text-[--black-2] overflow-y-auto px-4 pb-20 text-sm font-normal flex flex-col gap-2 relative">
      <div className="flex items-center -mx-4 text-base bg-[--trendyol] text-white">
        <div className="w-full flex justify-center items-center gap-2">
          <p>Trendyol Yemek</p>
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
            {PaymentMethods.filter(
              (method) => method.value === order.payment.paymentType,
            )[0]?.label || order.payment.paymentType}
            {order?.payment?.mealCard?.cardSourceType} && (
            <span className="ml-2">
              {order?.payment?.mealCard?.cardSourceType}
            </span>
            )
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
            <p>
              Komisyon Tutarı{" "}
              <span className="text-xs text-[--primary-1] italic ml-1">
                ({licenseSettings.commissionRate}%)
              </span>
            </p>
            <p className="bg-[--gr-1] text-[--white-1] px-2 rounded-sm">
              {formatToPrice(
                String(
                  (
                    (calculatedPayableTotal / 100) *
                    licenseSettings.commissionRate
                  ).toFixed(2),
                ).replace(".", ","),
              )}
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
          <p className="w-1/2 text-end">
            {trendyolAddressText(order.customer.addressDescription)}
          </p>
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
              sideOrder.orders.map((lineItem, i) => (
                <React.Fragment key={i}>
                  <tr className={`${i}"-here"`}>
                    <td className="p-2 text-left">
                      <div>
                        <span className="bg-[--gr-1] text-[--white-1] px-1.5 py-0.5 mr-0.5 rounded-sm">
                          {lineItem.items.length}
                        </span>
                        {lineItem.name}
                      </div>
                    </td>
                    <td className="p-2 flex justify-end items-start">
                      {formatToPrice(
                        String(
                          Number(
                            lineItem.price * lineItem.items.length,
                          ).toFixed(2),
                        ).replace(".", ","),
                      )}
                    </td>
                  </tr>
                  {lineItem.modifiers.map((mod) => (
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
                                  Number(lineItem.items.length)
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
                      {/* Modifier-level ingredient changes — JSON strings
                          like subModifier (confirmed backend shape). */}
                      {(Array.isArray(mod.subExtraIngredients)
                        ? mod.subExtraIngredients
                        : JSON.parse(mod.subExtraIngredients || "[]")
                      ).map((subIng) => (
                        <tr key={subIng.id} className="text-xs text-[--green-1]">
                          <td className="pl-2">▸ + {subIng.name}</td>
                          <td className="pr-2 text-right">
                            {subIng.price > 0 &&
                              `+${formatToPrice(
                                String(Number(subIng.price).toFixed(2)).replace(
                                  ".",
                                  ",",
                                ),
                              )}`}
                          </td>
                        </tr>
                      ))}
                      {(Array.isArray(mod.subRemovedIngredients)
                        ? mod.subRemovedIngredients
                        : JSON.parse(mod.subRemovedIngredients || "[]")
                      ).map((subIng) => (
                        <tr key={subIng.id} className="text-xs text-[--red-1]">
                          <td className="pl-2">▸ - {subIng.name}</td>
                          <td className="pr-2 text-right"></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  {Array.isArray(lineItem.extraIngredients) &&
                    lineItem.extraIngredients.map((extraIngredient) => (
                      <tr
                        key={extraIngredient.id}
                        className="text-xs text-[--green-1]"
                      >
                        <td className="pl-2">+ {extraIngredient.name}</td>
                        <td className="pr-2 text-right">
                          {extraIngredient.price > 0 &&
                            `+${formatToPrice(
                              String(
                                Number(extraIngredient.price).toFixed(2),
                              ).replace(".", ","),
                            )}`}
                        </td>
                      </tr>
                    ))}
                  {Array.isArray(lineItem.removedIngredients) &&
                    lineItem.removedIngredients.map((removedIngredient) => (
                      <tr
                        key={removedIngredient.id}
                        className="text-xs text-[--red-1]"
                      >
                        <td className="pl-2">- {removedIngredient.name}</td>
                        <td className="pr-2 text-right text-[--red-1]">
                          {removedIngredient.price > 0
                            ? `-`
                            : removedIngredient.price < 0
                              ? `+`
                              : ""}
                          {removedIngredient.price > 0 &&
                            formatToPrice(
                              String(
                                Number(removedIngredient.price).toFixed(2),
                              ).replace(".", ","),
                            )}
                        </td>
                      </tr>
                    ))}
                  {(lineItem.comment || lineItem.description) && (
                    <tr>
                      <td className="relative text-sm">
                        <p className="invisible px-2 py-1 flex gap-1">
                          👉 {lineItem.comment}, {lineItem.description}
                        </p>
                        <span className="absolute top-0 left-0 right-0 bg-[--light-3] px-2 py-1 flex gap-1">
                          👉 {lineItem.comment}{" "}
                          {lineItem.description && `, ${lineItem.description}`}
                        </span>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>

        <div className="w-full border-t border-[--gr-1]">
          {calculatedDiscount ? (
            <>
              <div className="w-full flex items-center justify-between gap-2">
                <p>Toplam:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(calculatedGrossTotal.toFixed(2)).replace(".", ","),
                  )}
                </p>
              </div>
              <div className="w-full flex items-center justify-between gap-2">
                <p>İndirim:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(calculatedDiscount.toFixed(2)).replace(".", ","),
                  )}
                </p>
              </div>
              {/* Who paid the discount, as labeled sub-rows (split from
                  items[].coupon/promotions amounts); a side that paid
                  nothing gets no row. */}
              {discountBySeller > 0 && (
                <div className="w-full flex items-center justify-between gap-2 text-xs text-[--gr-1]">
                  <p>Restoran İndirimi:</p>
                  <p>{sponsorPrice(discountBySeller)}</p>
                </div>
              )}
              {discountByTrendyol > 0 && (
                <div className="w-full flex items-center justify-between gap-2 text-xs text-[--gr-1]">
                  <p>Platform İndirimi:</p>
                  <p>{sponsorPrice(discountByTrendyol)}</p>
                </div>
              )}
            </>
          ) : null}
          <div className="w-full flex items-center justify-between gap-2">
            <p>Ödenecek Tutar:</p>
            <p className="font-bold text-base">
              {formatToPrice(
                String(calculatedPayableTotal.toFixed(2)).replace(".", ","),
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

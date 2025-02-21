//MODELS
import React, { useEffect, useState } from "react";

//COMP
import CloseI from "../../../assets/icon/close";
import { MigrosYemekAddress } from "../components/marketplaceAddresses";

//CONTEXT
import { useSlideBar } from "../../../context/SlideBarContext";
import { useFirestore } from "../../../context/FirestoreContext";

//UTILS
import courierServiceTypes from "../../../enums/courierServiceType";
import MigrosYemekStatusButtons from "./migrosYemekStatusButtons";
import { formatDateString, formatToPrice } from "../../../utils/utils";
import migrosYemekiOrderStatuses from "../../../enums/migrosYemekiOrderStatuses";

const MigrosYemekOrderDetails = ({ order, setOrdersData }) => {
  const { statusChangedOrder, setStatusChangedOrder } = useFirestore();
  const { setSlideBarContent } = useSlideBar();
  const [sideOrder, setSideOrder] = useState(order);

  function isValidDate(date) {
    return date.startsWith("0001-01-01T00:00:00") ? "" : date;
  }

  function getSign(item) {
    return item;
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
    const currentCourier = courierServiceTypes.filter(
      (T) => T.licenseTypeId === order.courierTypeId
    );
    return currentCourier.length
      ? currentCourier[0].label
      : order?.courier?.name;
  }
  console.log(order);
  // sideOrder.orders.map((O) => O.options.map((opt) => console.log(opt)));

  return (
    <main className="w-full h-[100dvh] bg-gray-100 text-slate-700 overflow-y-auto px-4 pb-20 text-sm font-normal flex flex-col gap-2 relative">
      <div className="flex items-center -mx-4 text-base bg-[--migrosyemek] text-[--white-1]">
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

      <div className="bg-white p-2 rounded-md flex flex-col gap-1">
        <div className="w-full flex justify-between">
          <p>İşletme</p>
          <p>{order.restaurantName}</p>
        </div>
        <div className="w-full flex justify-between">
          <p>Sipariş durumu</p>
          <p
            style={{
              color: `var(${
                migrosYemekiOrderStatuses.filter(
                  (col) => col.id === sideOrder.status
                )[0]?.color
              })`,
            }}
          >
            {
              migrosYemekiOrderStatuses.filter(
                (stat) => stat.id === sideOrder.status
              )[0]?.label
            }
          </p>
        </div>
        {isValidDate(sideOrder.cancelDate) && (
          <div className="w-full flex justify-between">
            <p>İptal notu</p>
            <p>{sideOrder.cancelMessage}</p>
          </div>
        )}
        <div className="w-full flex justify-between">
          <p>Ödeme Yöntemi</p>
          <p>{order.marketplaceTicketPaymentTypeDescription}</p>
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
            {order.shortCode}
          </p>
        </div>
      </div>

      <div className="bg-white p-2 rounded-md flex flex-col gap-1">
        <div className="flex">
          <p className="w-1/2">Müşteri</p>
          <p className="w-1/2 text-end">
            {order.customer.firstName + " " + order.customer.lastName}
          </p>
        </div>
        <div className="flex">
          <p className="w-1/2">Tel</p>
          <p className="w-1/2 text-end">{order.customer.phoneNumber}</p>
        </div>
        <div className="flex justify-between">
          <p>Adres</p>
          <div className="w-full max-w-[65%] text-end text-[--primary-2]">
            <MigrosYemekAddress order={order} className="justify-end" />
          </div>
        </div>
        <div className="flex border-t border-[--gr-3] py-2">
          <p className="w-1/2">Adres Tarifi</p>
          <p className="w-1/2 text-end">{order.customer.direction}</p>
        </div>
      </div>

      <div className="bg-white p-2 rounded-md flex flex-col gap-3">
        {order.orderNote && (
          <div className="flex rounded-md overflow-clip my-2">
            <p className="whitespace-nowrap font-bold">Not : </p>
            <div className="w-full px-2 italic flex flex-col gap-1">
              {<p>{order.orderNote}</p>}
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
              sideOrder.orders.map((Order, i) => (
                <React.Fragment key={i}>
                  <tr className={`${i}"-here"`}>
                    <td className="p-2 text-left">
                      <div>
                        <span className="bg-[--gr-1] text-white px-1.5 py-0.5 mr-0.5 rounded-sm">
                          {Order.amount}
                        </span>
                        {Order.name}
                      </div>
                    </td>
                    <td className="p-2 flex justify-end items-start">
                      {formatToPrice(Order.priceText)}
                    </td>
                  </tr>

                  {Order.options.map((option, index) => (
                    <React.Fragment key={index}>
                      {option.subOptions.length >= 0 && (
                        <>
                          <tr className="text-xs px-2">
                            <td className="pl-2 font-bold">
                              {option.headerName}
                            </td>
                          </tr>

                          <tr className="text-xs">
                            <td className="pl-4">{option.itemNames}</td>
                            <td
                              className={`pr-2 text-right ${
                                option.primaryPrice > 0
                                  ? "text-[--green-1]"
                                  : "text-[--red-1]"
                              }`}
                            >
                              {option.primaryPrice > 0
                                ? `+`
                                : option.primaryPrice < 0
                                ? `-`
                                : ""}
                              {option.primaryPrice > 0 &&
                                formatToPrice(
                                  String(
                                    (
                                      option.primaryPrice * option.quantity
                                    ).toFixed(2)
                                  )
                                    .replace(".", "#")
                                    .replace(",", ".")
                                    .replace("#", ",")
                                )}
                            </td>
                          </tr>
                        </>
                      )}

                      {option.subOptions.map((subOpt) => (
                        <React.Fragment key={subOpt.id}>
                          <tr className="text-xs px-2">
                            <td className="pl-6 font-bold">
                              {subOpt.headerName}
                            </td>
                          </tr>

                          <tr className="text-xs">
                            <td className="pl-8">
                              ▸ {subOpt.itemNames}
                              {subOpt.quantity > 1 && (
                                <span className="ml-1 text-[--green-1]">
                                  {"(x" + subOpt.quantity + ")"}
                                </span>
                              )}
                            </td>
                            <td
                              className={`pr-2 text-right ${
                                subOpt.primaryPrice > 0
                                  ? "text-[--green-1]"
                                  : "text-[--red-1]"
                              }`}
                            >
                              {subOpt.primaryPrice > 0
                                ? `+`
                                : subOpt.primaryPrice < 0
                                ? `-`
                                : ""}

                              {subOpt.primaryPrice > 0 &&
                                formatToPrice(
                                  String(
                                    (
                                      subOpt.primaryPrice * subOpt.quantity
                                    ).toFixed(2)
                                  )
                                    .replace(".", "#")
                                    .replace(",", ".")
                                    .replace("#", ",")
                                )}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                  {order.note && (
                    <tr>
                      <td className="relative text-sm">
                        <p className="invisible px-2 py-1 flex gap-1">
                          👉 {order.note}
                        </p>
                        <span className="absolute top-0 left-0 right-0 bg-[--light-3] px-2 py-1 flex gap-1">
                          👉 {order.note}
                        </span>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>

        <div className="w-full border-t border-[--gr-1]">
          {order.totalPrice !== order.discountedPrice ? (
            <>
              <div className="w-full flex items-center justify-between gap-2">
                <p>Toplam:</p>
                <p className="text-base">
                  {formatToPrice(order.totalPriceText)}
                </p>
              </div>
              <div className="w-full flex items-center justify-between gap-2">
                <p>İndirim:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(
                      (order.totalPrice - order.discountedPrice).toFixed(2)
                    )
                      .replace(".", "#")
                      .replace(",", ".")
                      .replace("#", ",")
                  )}
                </p>
              </div>
            </>
          ) : null}
          <div className="w-full flex items-center justify-between gap-2">
            <p>Ödenecek Tutar:</p>
            <p className="font-bold text-base">
              {order.totalPrice !== order.discountedPrice
                ? formatToPrice(order.discountedPriceText)
                : formatToPrice(order.totalPriceText)}
            </p>
          </div>
        </div>
      </div>

      <MigrosYemekStatusButtons
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

export default MigrosYemekOrderDetails;

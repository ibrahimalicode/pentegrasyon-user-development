//MODELS
import React, { useEffect, useState } from "react";

//COMP
import CloseI from "../../../assets/icon/close";
import YemekSepetiStatusButtons from "./yemekSepetiStatusButtons";
import { YemekSepetiAddress } from "../components/marketplaceAddresses";

//CONTEXT
import { useSlideBar } from "../../../context/SlideBarContext";
import { useFirestore } from "../../../context/FirestoreContext";

//UTILS
import { InfoI } from "../../../assets/icon";
import courierServiceTypes from "../../../enums/courierServiceType";
import { formatDateString, formatToPrice } from "../../../utils/utils";
import yemekSepetiOrderStatuses from "../../../enums/yemekSepetiOrderStatuses";
import RemainingMinutes from "../components/remainingMinutes";

const YemekSepetiOrderDetails = ({ order, setOrdersData }) => {
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
    const currentCourier = courierServiceTypes.filter(
      (T) => T.licenseTypeId === order.courierTypeId
    );
    return currentCourier.length
      ? currentCourier[0].label
      : order?.courier?.name;
  }
  console.log(sideOrder);

  return (
    <main className="w-full h-[100dvh] bg-[--white-2] text-[--black-2] overflow-y-auto px-4 pb-20 text-sm font-normal flex flex-col gap-2 relative">
      <div className="flex items-center -mx-4 text-base bg-[--yemeksepeti] text-white">
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
                yemekSepetiOrderStatuses.filter(
                  (col) => col.id === sideOrder.status
                )[0]?.color
              })`,
            }}
          >
            {
              yemekSepetiOrderStatuses.filter(
                (stat) => stat.id === sideOrder.status
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
          <p>{order.marketplaceTicketPaymentMethodName}</p>
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
            {order.code}
          </p>
        </div>
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
          <p className="w-1/2 text-end">
            {order.customer.mobilePhone ? (
              `${order.customer.mobilePhone}`
            ) : (
              <>
                {order.customer.customerPhoneNumber.split("/")[0]}
                <span className="bg-[--border-1] text-xs ml-2 p-1">
                  Ext: {order.customer.customerPhoneNumber.split("/")[1]}
                </span>
              </>
            )}
          </p>
        </div>

        <div className="flex justify-between">
          <p>Adres</p>
          <div className="w-full max-w-[65%] text-end text-[--primary-2]">
            <YemekSepetiAddress order={order} className="justify-end" />
          </div>
        </div>

        <div className="flex border-t border-[--gr-3] py-2">
          <p className="w-1/2">Adres Tarifi</p>
          <p className="w-1/2 text-end">
            {order.customer.deliveryInstructions?.replace(
              order.customerComment,
              ""
            )}
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
                {order.expectedDeliveryTime}
                {order.preOrder &&
                  order.status != 4 &&
                  (order.status != 3 ? (
                    <RemainingMinutes date={order.expectedDeliveryTime} />
                  ) : (
                    <span className="text-[--red-1]">İptal edildi</span>
                  ))}
              </div>
            </div>
          </div>
        )}

        {order.customerComment && (
          <div className="flex border border-[--gr-1] rounded-md overflow-clip">
            <div className="bg-[--gr-1] text-[--gr-1] px-3 flex items-center">
              <InfoI fill="white" />
            </div>
            <div className="w-full p-2 text-xs italic flex flex-col gap-1">
              <p>{order.customerComment}</p>
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
                          {order.quantity}
                        </span>
                        {order.name}
                      </div>
                    </td>
                    <td className="p-2 flex justify-end items-start">
                      {formatToPrice(
                        String(Number(order.paidPrice).toFixed(2)).replace(
                          ".",
                          ","
                        )
                      )}
                    </td>
                  </tr>
                  {order.options.map((cat) => (
                    <React.Fragment key={cat.id}>
                      <tr className="text-xs px-2">
                        <td className="pl-2">{cat.name}</td>
                        <td
                          className={`pr-2 text-right ${
                            cat.price > 0
                              ? "text-[--green-1]"
                              : "text-[--red-1]"
                          }`}
                        >
                          {cat.price > 0 ? `+` : cat.price < 0 ? `-` : ""}
                          {cat.price > 0 &&
                            formatToPrice(
                              String(
                                (
                                  Number(cat.price) *
                                  Number(cat.quantity) *
                                  Number(order.quantity)
                                ).toFixed(2)
                              ).replace(".", ",")
                            )}
                        </td>
                      </tr>
                      {cat.childrens.map((opt) => (
                        <tr key={opt.id} className="text-xs">
                          <td className="pl-2">▸ {opt.name}</td>
                          <td
                            className={`pr-2 text-right ${
                              opt.price > 0
                                ? "text-[--green-1]"
                                : "text-[--red-1]"
                            }`}
                          >
                            {opt.price > 0 ? `+` : opt.price < 0 ? `-` : ""}
                            {opt.price > 0 &&
                              formatToPrice(
                                String(Number(opt.price).toFixed(2)).replace(
                                  ".",
                                  ","
                                )
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
                      ).toFixed(2)
                    ).replace(".", ",")
                  )}
                </p>
              </div>
              <div className="w-full flex items-center justify-between gap-2">
                <p>İndirim:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(
                      Number(order.discountAmountTotal).toFixed(2)
                    ).replace(".", ",")
                  )}
                </p>
              </div>
            </>
          ) : null}
          <div className="w-full flex items-center justify-between gap-2">
            <p>Ödenecek Tutar:</p>
            <p className="font-bold text-base">
              {formatToPrice(
                String(Number(order.grandTotal).toFixed(2)).replace(".", ",")
              )}
            </p>
          </div>
        </div>
      </div>

      <YemekSepetiStatusButtons
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

export default YemekSepetiOrderDetails;

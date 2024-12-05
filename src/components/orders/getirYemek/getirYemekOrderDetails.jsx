//MODULES
import React, { useEffect, useState } from "react";

//COMP
import { InfoI } from "../../../assets/icon";
import CloseI from "../../../assets/icon/close";
import getirYemekOrderStatuses from "../../../enums/getirYemekOrderStatuses";
import RemainingMinutes from "../components/remainingMinutes";
import GetirYemekStatusButtons from "./getirYemekStatusButtons";

//UTILS
import { formatDateString, formatToPrice } from "../../../utils/utils";

//CONTEXT
import { useSignalR } from "../../../context/SignalRContext";
import { useSlideBar } from "../../../context/SlideBarContext";
import courierServiceTypes from "../../../enums/courierServiceType";

const GetirYemekOrderDetails = ({ order, setOrdersData }) => {
  const { statusChangedOrder, setStatusChangedOrder } = useSignalR();
  const { setSlideBarContent } = useSlideBar();
  const [sideOrder, setSideOrder] = useState(order);

  function checkDate(date) {
    if (date === "0001-01-01T00:00:00") {
      return "";
    } else {
      return date;
    }
  }

  useEffect(() => {
    if (statusChangedOrder) {
      if (statusChangedOrder.id === order.id && statusChangedOrder) {
        console.log(statusChangedOrder);
        setSideOrder(statusChangedOrder);
        setStatusChangedOrder(null);
      }
    }
  }, [statusChangedOrder]);

  function getCurrentCourier() {
    const currentCourier = courierServiceTypes.filter(
      (T) => T.licenseTypeId === order.courierTypeId
    );
    return currentCourier.length && order.deliveryType != 1
      ? currentCourier[0].label
      : "Getir Kuryesi";
  }
  console.log(order);

  return (
    <main className="w-full h-[100dvh] bg-gray-100 text-slate-700 overflow-y-auto px-4 pb-20 text-sm font-normal flex flex-col gap-2 relative">
      <div className="flex items-center -mx-4 text-base bg-[--getiryemek] text-[--white-1]">
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
          <p>{order.marketplaceTicketRestaurantName}</p>
        </div>
        <div className="w-full flex justify-between">
          <p>Sipariş durumu</p>
          <p
            style={{
              color: `var(${
                getirYemekOrderStatuses.filter(
                  (col) => col.id === sideOrder.status
                )[0]?.color
              })`,
            }}
          >
            {
              getirYemekOrderStatuses.filter(
                (stat) => stat.id === sideOrder.status
              )[0]?.label
            }
          </p>
        </div>
        {checkDate(sideOrder.cancelDate) && (
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
            {order.confirmationId}
          </p>
        </div>
      </div>

      <div className="bg-white p-2 rounded-md flex flex-col gap-1">
        <div className="flex">
          <p className="w-1/2">Müşteri</p>
          <p className="w-1/2 text-end">{order.client.name}</p>
        </div>
        <div className="flex">
          <p className="w-1/2">Telefon Numarası</p>
          <p className="w-1/2 text-end">
            {order.client.clientUnmaskedPhoneNumber ? (
              `${order.client.clientUnmaskedPhoneNumber}`
            ) : (
              <>
                {order.client.clientPhoneNumber.split("/")[0]}
                <span className="bg-[--border-1] text-xs ml-2 p-1">
                  Dahili: {order.client.clientPhoneNumber.split("/")[1]}
                </span>
              </>
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Adres</p>
          <div className="w-full max-w-[65%] text-end text-[--primary-2]">
            <p>{order.client.address}</p>
            <p>
              {order.client.aptNo && <span>Apt No: {order.client.aptNo}</span>}
              {order.client.doorNo && (
                <span> Daire No: {order.client.doorNo}</span>
              )}
              {order.client.floor && <span> Kat: {order.client.floor}</span>}
            </p>
          </div>
        </div>
        <div className="flex border-t border-[--gr-3] py-2">
          <p className="w-1/2">Adres Tarifi</p>
          <p className="w-1/2 text-end">{order.client.description}</p>
        </div>
      </div>

      <div className="bg-white p-2 rounded-md flex flex-col gap-3">
        {order.isScheduled && (
          <div className="flex border border-[--gr-1] rounded-md overflow-clip">
            <div className="bg-[--red-3] text-[--gr-3] px-4 flex items-center">
              🕑
            </div>
            <div className="w-full p-2 text-xs flex gap-4">
              <p>Teslimat Zamanı:</p>
              <div className="flex gap-4">
                {order.checkedScheduledDate}
                {order.isScheduled &&
                  (order.status != 1500 && order.status != 1600 ? (
                    <RemainingMinutes date={order.scheduledDate} />
                  ) : (
                    <span className="text-[--red-1]">İptal edildi</span>
                  ))}
              </div>
            </div>
          </div>
        )}

        {(order.clientNote ||
          order.doNotKnock ||
          order.dropOffAtDoor ||
          order.isEcoFriendly) && (
          <div className="flex border border-[--gr-1] rounded-md overflow-clip">
            <div className="bg-[--gr-1] text-[--gr-1] px-3 flex items-center">
              <InfoI fill="white" />
            </div>
            <div className="w-full p-2 text-xs italic flex flex-col gap-1">
              {order.clientNote && <p>{order.clientNote}</p>}
              {order.doNotKnock && <p>Lütfen zil çalmayın.</p>}
              {order.dropOffAtDoor && <p>Kapıda Bırakın.</p>}
              {order.isEcoFriendly && (
                <p>
                  Doğayı seviyorum. Plastik çatal, bıçak, peçete istemiyorum.
                </p>
              )}
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
            {order.orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td className="p-2 text-left">
                    <div>
                      <span className="bg-[--gr-1] text-white px-1.5 py-0.5 mr-0.5 rounded-sm">
                        {order.count}
                      </span>
                      {order.name}
                    </div>
                  </td>

                  <td className="p-2 flex justify-end items-start">
                    {formatToPrice(
                      String((order.price * order.count).toFixed(2)).replace(
                        ".",
                        ","
                      )
                    )}
                  </td>
                </tr>
                {order.optionCategories.map((cat) => (
                  <React.Fragment key={cat.id}>
                    <tr className="text-xs px-2">
                      <td className="pl-2">{cat.name}</td>
                    </tr>
                    {cat.options.map((opt) => (
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
                              String(
                                (opt.price * order.count).toFixed(2)
                              ).replace(".", ",")
                            )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
                {order.note && (
                  <tr>
                    <td className="relative text-xs">
                      <p className="invisible px-2 py-1 flex gap-1">
                        <InfoI className="size-[16px]" strokeWidth={2} />{" "}
                        {order.note}
                      </p>
                      <span className="absolute top-0 left-0 right-0 bg-[--light-3] px-2 py-1 flex gap-1">
                        <InfoI className="size-[16px]" strokeWidth={2} />{" "}
                        {order.note}
                      </span>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="w-full border-t border-[--gr-1]">
          {order.totalDiscountedPrice ? (
            <>
              <div className="w-full flex items-center justify-end gap-2">
                <p>Toplam:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(order.totalPrice.toFixed(2)).replace(".", ",")
                  )}
                </p>
              </div>
              <div className="w-full flex items-center justify-end gap-2">
                <p>İndirim:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(
                      (order.totalPrice - order.totalDiscountedPrice).toFixed(2)
                    ).replace(".", ",")
                  )}
                </p>
              </div>
            </>
          ) : null}
          <div className="w-full flex items-center justify-end gap-2">
            <p>Ödenecek Tutar:</p>
            <p className="font-bold text-base">
              {order.totalDiscountedPrice
                ? formatToPrice(
                    String(order.totalDiscountedPrice.toFixed(2)).replace(
                      ".",
                      ","
                    )
                  )
                : formatToPrice(
                    String(order.totalPrice.toFixed(2)).replace(".", ",")
                  )}
            </p>
          </div>
        </div>
      </div>

      <GetirYemekStatusButtons
        order={{
          ...sideOrder,
          approvalDate: checkDate(sideOrder.approvalDate),
          cancelDate: checkDate(sideOrder.cancelDate),
          deliveryDate: checkDate(sideOrder.deliveryDate),
          preparationDate: checkDate(sideOrder.preparationDate),
        }}
        setOrdersData={setOrdersData}
        setSideOrder={setSideOrder}
      />
    </main>
  );
};

export default GetirYemekOrderDetails;

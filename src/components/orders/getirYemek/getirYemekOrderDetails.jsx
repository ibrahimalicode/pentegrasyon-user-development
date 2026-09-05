//MODULES
import React, { useEffect, useState } from "react";

//COMP
import { InfoI } from "../../../assets/icon";
import CloseI from "../../../assets/icon/close";
import RemainingMinutes from "../components/remainingMinutes";
import GetirYemekStatusButtons from "./getirYemekStatusButtons";
import { GetirYemekAddress } from "../components/marketplaceAddresses";
import getirYemekOrderStatuses from "../../../enums/getirYemekOrderStatuses";

//UTILS
import { formatDateString, formatToPrice } from "../../../utils/utils";

//CONTEXT
import { useSlideBar } from "../../../context/SlideBarContext";
import { useFirestore } from "../../../context/FirestoreContext";
import courierServiceTypes from "../../../enums/courierServiceType";

const GetirYemekOrderDetails = ({ order, setOrdersData, licenseSettings }) => {
  const { statusChangedOrder, setStatusChangedOrder } = useFirestore();
  const { setSlideBarContent } = useSlideBar();
  const [sideOrder, setSideOrder] = useState(order);

  function isValidDate(date) {
    return date.startsWith("0001-01-01T00:00:00") ? "" : date;
  }

  useEffect(() => {
    if (statusChangedOrder) {
      if (statusChangedOrder.id === order.id && statusChangedOrder) {
        console.log(statusChangedOrder);
        setSideOrder(statusChangedOrder);
        // setStatusChangedOrder(null);
      }
    }
  }, [statusChangedOrder]);

  function getCurrentCourier() {
    const currentCourier = courierServiceTypes.filter(
      (T) => T.licenseTypeId === order.courierTypeId,
    );
    return currentCourier.length && order.deliveryType != 1
      ? currentCourier[0].label
      : "Platform Kuryesi";
  }
  console.log(order);

  return (
    <main className="w-full h-[100dvh] bg-[--white-2] text-[--black-2] overflow-y-auto px-4 pb-20 text-sm font-normal flex flex-col gap-2 relative">
      <div className="flex items-center -mx-4 text-base bg-[--getiryemek] text-white">
        <div className="w-full flex justify-center items-center gap-2">
          <p>Getir Yemek</p>
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
          <p>{order.marketplaceTicketRestaurantName}</p>
        </div>

        <div className="w-full flex justify-between">
          <p>Sipariş durumu</p>
          <p
            style={{
              color: `var(${
                getirYemekOrderStatuses.filter(
                  (col) => col.id === sideOrder.status,
                )[0]?.color
              })`,
            }}
          >
            {
              getirYemekOrderStatuses.filter(
                (stat) => stat.id === sideOrder.status,
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
            {order.confirmationId}
          </p>
        </div>

        {licenseSettings && (
          <div className="w-full flex justify-between">
            <p>
              Komisyon Tutarı
              <span className="text-xs text-[--primary-1] italic ml-1">
                ({licenseSettings.commissionRate}%)
              </span>
            </p>
            <p className="bg-[--gr-1] text-[--white-1] px-2 rounded-sm">
              {formatToPrice(
                String(
                  (
                    ((order.totalDiscountedPrice || order.totalPrice) / 100) *
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
          <p className="w-1/2 text-end">{order.client.name}</p>
        </div>

        <div className="flex">
          <p className="w-1/2">Tel</p>
          <p className="w-1/2 text-end">
            {order.client.clientUnmaskedPhoneNumber ? (
              `${order.client.clientUnmaskedPhoneNumber}`
            ) : (
              <>
                {order.client.clientPhoneNumber.split("/")[0]}
                <span className="bg-[--border-1] text-xs ml-2 p-1">
                  Ext: {order.client.clientPhoneNumber.split("/")[1]}
                </span>
              </>
            )}
          </p>
        </div>

        <div className="flex justify-between">
          <p>Adres</p>
          <div className="w-full max-w-[65%] text-end text-[--primary-2]">
            <GetirYemekAddress order={order} />
          </div>
        </div>

        <div className="flex border-t border-[--gr-3] py-2">
          <p className="w-1/2">Adres Tarifi</p>
          <p className="w-1/2 text-end">{order.client.description}</p>
        </div>
      </div>

      <div className="bg-[--white-1] p-2 rounded-md flex flex-col gap-3">
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
                  order.status !== 900 &&
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
            {/* Renamed from `order` to `item`: the callback used to shadow the
                outer `order` prop, which made this block hard to read. */}
            {order.orders.map((item, i) => {
              // Only genuinely extra information belongs under a product: the
              // chosen options, and the title when it differs from the name.
              // Quantity is already in the badge and the line total is in the
              // Tutar column, so a "1 × 180" line just repeated them.
              // filter(Boolean) also drops the empty entry that
              // "".split(",") produces, which was rendering a blank line.
              const details = [
                item.displayInfoTitle !== item.name ? item.displayInfoTitle : null,
                ...(item.displayInfoOptions?.split(",") ?? []),
              ]
                .map((detail) => detail?.trim())
                .filter(Boolean);

              return (
                <React.Fragment key={item.id ?? i}>
                  <tr>
                    <td className="p-2 text-left font-medium">
                      <div>
                        <span className="bg-[--gr-1] text-[--white-1] px-1.5 py-0.5 mr-0.5 rounded-sm">
                          {item.count}
                        </span>
                        {item.name}
                      </div>
                    </td>
                    <td className="p-2 text-right align-top">
                      {formatToPrice(
                        String(item.totalPriceWithOption).replace(".", ","),
                      )}
                    </td>
                  </tr>

                  {/* Spans both columns. This row used to emit FOUR cells,
                      which silently widened the table past its two-column
                      header. Rendered only when there is something to say, so
                      products without options add no empty row. */}
                  {details.length > 0 && (
                    <tr className="text-xs">
                      <td className="pl-4 pb-2 text-[--gr-1]" colSpan={2}>
                        {details.map((detail, index) => (
                          <span key={index} className="block">
                            {detail}
                          </span>
                        ))}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        <div className="w-full border-t border-[--gr-1]">
          {order.totalDiscountedPrice ? (
            <>
              <div className="w-full flex items-center justify-between gap-2">
                <p>Toplam:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(order.totalPrice.toFixed(2)).replace(".", ","),
                  )}
                </p>
              </div>
              <div className="w-full flex items-center justify-between gap-2">
                <p>İndirim:</p>
                <p className="text-base">
                  {formatToPrice(
                    String(
                      (order.totalPrice - order.totalDiscountedPrice).toFixed(
                        2,
                      ),
                    ).replace(".", ","),
                  )}
                </p>
              </div>
            </>
          ) : null}
          <div className="w-full flex items-center justify-between gap-2">
            <p>Ödenecek Tutar:</p>
            <p className="font-bold text-base">
              {order.totalDiscountedPrice
                ? formatToPrice(
                    String(order.totalDiscountedPrice.toFixed(2)).replace(
                      ".",
                      ",",
                    ),
                  )
                : formatToPrice(
                    String(order.totalPrice.toFixed(2)).replace(".", ","),
                  )}
            </p>
          </div>
        </div>
      </div>

      <GetirYemekStatusButtons
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

export default GetirYemekOrderDetails;

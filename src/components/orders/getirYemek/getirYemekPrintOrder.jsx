import React from "react";

//COMP
import QrGenerator from "../../common/qrGenerator";
import MarketPalceIds from "../../../enums/marketPlaceIds";
import { formatDateString, formatToPrice } from "../../../utils/utils";
import { GetirYemekAddress } from "../components/marketplaceAddresses";

const GetirYemekPrintOrder = ({ order }) => {
  function getLocationLink() {
    const googleMapsUrl = `https://www.google.com/maps?q=${order.client.latitude},${order.client.longitude}`;
    return googleMapsUrl;
  }

  function getPhoneNumber() {
    return order.client.clientUnmaskedPhoneNumber
      ? order.client.clientUnmaskedPhoneNumber
      : order.client.clientPhoneNumber.split("/")[0];
  }

  return (
    <main className="flex flex-col justify-center p-4 bg-[--light-3] font-normal mx-auto">
      <div className="text-center mb-2">
        <p className="text-[--primary-2] text-3xl font-medium">
          {order.marketplaceTicketRestaurantName}
        </p>
        <p className="text-[--red-1] text-xl ">
          {MarketPalceIds[order.marketplaceId]?.value}
        </p>
      </div>

      <div className="text-lg">
        <p>
          <span className="font-bold">Müşteri </span>
          <span>: {order.client.name}</span>
        </p>
        <p>
          <span className="font-bold">Tel </span>

          {order.client.clientUnmaskedPhoneNumber ? (
            <span>: {order.client.clientUnmaskedPhoneNumber}</span>
          ) : (
            <>
              {order.client.clientPhoneNumber.split("/")[0]}
              <span className="font-bold">Ext </span>
              <span>: {order.client.clientPhoneNumber.split("/")[1]}</span>
            </>
          )}
        </p>
        {(order.client.address ||
          order.client.aptNo ||
          order.client.doorNo ||
          order.client.floor) && (
          <p>
            <span className="font-bold">Adres: </span>
            <span>
              <GetirYemekAddress order={order} />
            </span>
          </p>
        )}

        {order?.client?.district && (
          <p>
            <span className="font-bold">Bölge </span>{" "}
            <span>: {order?.client?.district}</span>
          </p>
        )}

        {order.client.description && (
          <p>
            <span className="font-bold">Tarif </span>
            <span>: {order.client.description}</span>
          </p>
        )}
        <p>
          <span className="font-bold">Sip. Tar. </span>
          <span>
            :{" "}
            {formatDateString({
              dateString: order.createdDateTime,
              hour: true,
              min: true,
            })}
          </span>
        </p>
        <p>
          <span className="font-bold">Ödeme </span>
          <span>: {order.marketplaceTicketPaymentMethodName}</span>
        </p>
        <p>
          <span className="font-bold">Sip No </span>
          <span>: {order.confirmationId}</span>
        </p>
      </div>

      {order.isScheduled && (
        <div className="flex items-center text-lg mt-2 border rounded-md border-gray-700 overflow-clip">
          <div className="px-1 mt-1.5 mr-1 bg-[--gr-1]">🕑</div>
          <div>Teslim Zamanı : </div>
          <div className="font-medium ml-3">{order.checkedScheduledDate}</div>
        </div>
      )}

      {(order.clientNote ||
        order.doNotKnock ||
        order.dropOffAtDoor ||
        order.isEcoFriendly) && (
        <div className="flex rounded-md overflow-clip my-2">
          <p className="whitespace-nowrap font-bold">Not : </p>
          <div className="w-full px-2 italic flex flex-col gap-1">
            {order.clientNote && <p>{order.clientNote}</p>}
            {order.doNotKnock && <p>Lütfen zil çalmayın.</p>}
            {order.dropOffAtDoor && <p>Kapıda Bırakın.</p>}
            {order.isEcoFriendly && (
              <p>Doğayı seviyorum. Plastik çatal, bıçak, peçete istemiyorum.</p>
            )}
          </div>
        </div>
      )}

      <h1 className="font-bold text-center text-lg border-b border-black">
        Siparişler
      </h1>

      <div className="text-lg w-full pb-2">
        <table className="rounded-md overflow-clip w-full h-max">
          <thead className="bg-[--light-3]-">
            <tr>
              <th className="p-2- font-normal text-left"></th>
              <th className="p-2- font-normal text-right"></th>
            </tr>
          </thead>

          <tbody>
            {order.orders.map((order) => (
              <>
                <tr>
                  <td className="font-medium">
                    <div>
                      <span className="bg-[--gr-1] px-1.5 py-0.5 mr-0.5 rounded-sm">
                        {order.count} x
                      </span>
                      {order.name}
                    </div>
                  </td>
                  <td className="text-right pr-1">
                    {formatToPrice(
                      String(order.totalPriceWithOption).replace(".", ","),
                    )}
                  </td>
                </tr>

                {order.displayInfoOptions ? (
                  <React.Fragment key={order.id}>
                    <tr className="text-xs">
                      <td className="pl-1">
                        {order.displayInfoOptions
                          .split(",")
                          .map((info, index) => (
                            <span key={index} className="block">
                              {info}
                            </span>
                          ))}
                      </td>
                    </tr>
                  </React.Fragment>
                ) : (
                  <tr>
                    <td className="text-xs">{order.displayInfoTitle}</td>
                    <td className="font-bold text-center">{order.count}</td>
                    <td className="font-bold text-center">
                      {formatToPrice(String(order.price).replace(".", ","))}
                    </td>
                    <td className="text-right font-bold pr-1">
                      {formatToPrice(
                        String(order.totalPriceWithOption).replace(".", ","),
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-lg border-y border-black">
        {order.totalDiscountedPrice ? (
          <>
            <p className="flex justify-between">
              <span>Hesap Toplamı : </span>
              <span className="font-bold">
                {formatToPrice(
                  String(order.totalPrice.toFixed(2).replace(".", ",")),
                )}
              </span>
            </p>
            <p className="flex justify-between">
              <span>İskonto : </span>
              <span>
                -
                {formatToPrice(
                  String(
                    (order.totalPrice - order.totalDiscountedPrice).toFixed(2),
                  ).replace(".", ","),
                )}
              </span>
            </p>
          </>
        ) : null}

        <p className="flex justify-between text-base">
          <span>Ödenecek Tutar : </span>
          <span className="font-bold">
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
          </span>
        </p>
      </div>

      <div className="text-lg text-center">
        <div className="flex justify-center gap-4 mb-10">
          <div className="w-1/3 flex flex-col items-center">
            <p className="my-5">Müşteri Konumu QR</p>
            <QrGenerator text={getLocationLink()} />
          </div>

          <div className="w-1/3 flex flex-col items-center">
            <p className="my-5">Müşteri Telefonu</p>
            <QrGenerator text={getPhoneNumber()} />
          </div>
        </div>
        <p>
          <span className="font-bold" style={{ fontFamily: "conthrax" }}>
            Pentegrasyon
          </span>{" "}
          Sipariş Otomasyonu
        </p>
        <p>www.pentegrasyon.net</p>
      </div>
    </main>
  );
};

export default GetirYemekPrintOrder;

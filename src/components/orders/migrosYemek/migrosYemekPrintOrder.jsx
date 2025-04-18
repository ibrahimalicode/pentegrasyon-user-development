//MODULES
import React from "react";

//UTILS
import MarketPalceIds from "../../../enums/marketPlaceIds";
import { formatDateString, formatToPrice } from "../../../utils/utils";

//COMP
import QrGenerator from "../../common/qrGenerator";
import { MigrosYemekAddress } from "../components/marketplaceAddresses";

const MigrosYemekPrintOrder = ({ order }) => {
  function getGoogleAddress() {
    const googleMapsUrl = `https://www.google.com/maps?q=${order.customer.latitude},${order.customer.longitude}`;
    return googleMapsUrl;
  }

  return (
    <main className="flex flex-col justify-center p-4 bg-[--light-3] font-normal mx-auto">
      <div className="text-center mb-2">
        <p className="text-[--primary-2] text-3xl font-medium">
          {order.restaurantName}
        </p>
        <p className="text-[--red-1] text-xl ">
          {MarketPalceIds[order.marketplaceId]?.label}
        </p>
      </div>

      <div className="text-lg">
        <p>
          <span className="font-bold">Müşteri: </span>
          <span>
            {" "}
            {order.customer.firstName + " " + order.customer.lastName}
          </span>
        </p>
        <p>
          <span className="font-bold">Tel: </span>
          {order.customer.phoneNumber}
        </p>

        {(order.customer.city ||
          order.customer.district ||
          order.customer.streetName) && (
          <div className="flex">
            <p className="font-bold pr-1">Adres: </p>
            <MigrosYemekAddress order={order} />
          </div>
        )}

        {order?.customer?.district && (
          <p>
            <span className="font-bold">Bölge: </span>{" "}
            <span> {order?.customer?.district}</span>
          </p>
        )}

        {order.customer.deliveryInstructions && (
          <div className="flex">
            <p className="font-bold pr-1">Tarif: </p>
            <div> {order.customer.direction}</div>
          </div>
        )}
        <p>
          <span className="font-bold">Sip. Tar. </span>
          <span>
            :{" "}
            {formatDateString({
              dateString: order.customer.createdDateTime,
              hour: true,
              min: true,
            })}
          </span>
        </p>
        <p>
          <span className="font-bold">Ödeme </span>
          <span>: {order.marketplaceTicketPaymentTypeDescription}</span>
        </p>
        <p>
          <span className="font-bold">Sip No: </span>
          <span> {order.shortCode}</span>
        </p>
      </div>

      {order.orderNote && (
        <div className="flex rounded-md overflow-clip my-2">
          <p className="whitespace-nowrap font-bold">Not : </p>
          <div className="w-full px-2 italic flex flex-col gap-1">
            {<p>{order.orderNote}</p>}
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
            {order.orders.map((order, i) => (
              <React.Fragment key={i}>
                <tr>
                  <td className="px-2 text-left">
                    <div className="font-bold">
                      <span className="mr-0.5 rounded-sm">{order.amount} </span>
                      x {order.name}
                    </div>
                  </td>
                  <td className="p-2 flex justify-end items-start">
                    {formatToPrice(order.priceText)}
                  </td>
                </tr>

                {order.options.map((option, index) => (
                  <React.Fragment key={index}>
                    {option.subOptions.length >= 0 && (
                      <>
                        <tr className="px-2">
                          <td className="pl-2 font-bold">
                            {option.headerName}
                          </td>
                        </tr>

                        <tr className="text-">
                          <td className="pl-4">{option.itemNames}</td>
                          <td className="pr-2 text-right">
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
                        <tr className="px-2">
                          <td className="pl-6 font-bold">
                            {subOpt.headerName}
                          </td>
                        </tr>

                        <tr>
                          <td className="pl-8">
                            ▸ {subOpt.itemNames}
                            {subOpt.quantity > 1 && (
                              <span className="ml-1">
                                {"(x" + subOpt.quantity + ")"}
                              </span>
                            )}
                          </td>
                          <td className="pr-2 text-right">
                            {subOpt.primaryPrice > 0
                              ? `+`
                              : subOpt.primaryPrice < 0
                              ? `-`
                              : ""}
                            {subOpt.primaryPrice > 0 &&
                              formatToPrice(subOpt.primaryPriceText)}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}

                {order.note && (
                  <tr>
                    <td className="relative text-base">
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
      </div>

      <div className="text-lg border-y border-black">
        {order.totalPrice !== order.discountedPrice ? (
          <>
            <p className="flex justify-between">
              <span>Hesap Toplamı : </span>
              <span className="font-bold">
                {formatToPrice(order.totalPriceText)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>
                %
                {(
                  (100 / order.totalPrice) *
                  (order.totalPrice - order.discountedPrice)
                ).toFixed(2)}{" "}
                iskonto :{" "}
              </span>{" "}
              <span>
                {formatToPrice(
                  String((order.totalPrice - order.discountedPrice).toFixed(2))
                    .replace(".", "#")
                    .replace(",", ".")
                    .replace("#", ",")
                )}
              </span>
            </p>
          </>
        ) : null}

        <p className="flex justify-between text-base">
          <span>Ödenecek Tutar : </span>
          <span className="font-bold">
            {order.totalPrice !== order.discountedPrice
              ? formatToPrice(order.discountedPriceText)
              : formatToPrice(order.totalPriceText)}
          </span>
        </p>
      </div>

      <div className="text-lg text-center">
        <div className="flex justify-center gap-4 mb-10">
          <div className="w-1/3 flex flex-col items-center">
            <p className="my-5">Müşteri Konumu QR</p>
            <QrGenerator text={getGoogleAddress()} />
          </div>

          <div className="w-1/3 flex flex-col items-center">
            <p className="my-5">Müşteri Telefonu</p>
            <QrGenerator text={order.customer.phoneNumber} />
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

export default MigrosYemekPrintOrder;

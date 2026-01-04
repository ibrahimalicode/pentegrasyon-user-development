//MODULES
import React from "react";

//UTILS
import MarketPalceIds from "../../../enums/marketPlaceIds";
import { formatDateString, formatToPrice } from "../../../utils/utils";

//COMP
import QrGenerator from "../../common/qrGenerator";
import { TrendyolYemekAddress } from "../components/marketplaceAddresses";

const TrendyolYemekPrintOrder = ({ order }) => {
  const customerAddress = `
  ${order.customer.city ?? ""},
  ${order.customer.addressDescription ?? ""},
  ${order.customer.address1 ?? ""},`;

  function getGoogleAddress() {
    const googleMapsUrl = `https://www.google.com/maps?q=${order.customer.latitude},${order.customer.longitude}`;
    return googleMapsUrl;
  }

  function getPhoneNumber() {
    return order.customer.phone
      ? order.customer.phone
      : order.customer.customerPhoneNumber.split("/")[0];
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

          {order.customer.phone ? (
            <span> {order.customer.phone}</span>
          ) : (
            <>
              {order.customer.phone.split("/")[0]}
              <span className="font-bold">Ext: </span>
              <span> {order.customer.phone.split("/")[1]}</span>
            </>
          )}
        </p>

        {(order.customer.city ||
          order.customer.addressDescription ||
          order.customer.address1) && (
          <div className="flex">
            <p className="font-bold pr-1">Adres: </p>
            <TrendyolYemekAddress order={order} />
          </div>
        )}

        {order?.customer?.addressDescription && (
          <p>
            <span className="font-bold">Bölge: </span>{" "}
            <span> {order?.customer?.addressDescription?.split(" ")[0]}</span>
          </p>
        )}

        {order.customer.customerNote && (
          <div className="flex">
            <p className="font-bold pr-1">Tarif: </p>
            <div>
              {" "}
              {order.customer.customerNote?.replace(order.customerNote, "")}
            </div>
          </div>
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
          <span>: {order?.marketplaceTicketPaymentMethodName}</span>
        </p>
        <p>
          <span className="font-bold">Sip No: </span>
          <span> {order.orderCode}</span>
        </p>
      </div>

      {order?.isScheduled && (
        <div className="flex items-center text-lg mt-2 border rounded-md border-gray-700 overflow-clip">
          <div className="px-1 mt-1.5 mr-1 bg-[--gr-1]">🕑</div>
          <div>Teslim Zamanı : </div>
          <div className="font-medium">{order.checkedScheduledDate}</div>
        </div>
      )}

      {order.customerNote && (
        <div className="flex rounded-md overflow-clip my-2">
          <p className="whitespace-nowrap font-bold">Not : </p>
          <div className="w-full px-2 italic flex flex-col gap-1">
            {order.customerNote && <p>{order.customerNote}</p>}
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
            {order.orders?.length > 0 &&
              order.orders.map((order, i) => (
                <React.Fragment key={i}>
                  <tr>
                    <td className="px-2 text-left">
                      <div className="font-bold">
                        <span className="mr-0.5 rounded-sm">
                          {order?.orders?.length}{" "}
                        </span>
                        x {order.name}
                      </div>
                    </td>
                    <td className="p-2 flex justify-end items-start">
                      {formatToPrice(
                        String(Number(order.price).toFixed(2)).replace(".", ",")
                      )}
                    </td>
                  </tr>
                  {order?.options?.length > 0 &&
                    order.options.map((cat) => (
                      <React.Fragment key={cat.id}>
                        <tr className="px-2">
                          <td className="pl-2">{cat.name}</td>
                          <td
                            className={`pr-2 text-right ${
                              cat.price > 0
                                ? "text-[--green-1]"
                                : "text-[--red-1]"
                            }`}
                          >
                            {cat.price > 0 &&
                              formatToPrice(
                                String(Number(cat.price).toFixed(2)).replace(
                                  ".",
                                  ","
                                )
                              )}
                          </td>
                        </tr>
                        {cat.childrens.map((opt) => (
                          <tr key={opt.id} className="">
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
                      <td className="relative text-base">
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
      </div>

      <div className="text-lg border-y border-black">
        {Number(order.discountAmountTotal) ? (
          <>
            <p className="flex justify-between">
              <span>Hesap Toplamı : </span>
              <span className="font-bold">
                {formatToPrice(
                  String(
                    (
                      Number(order.grandTotal) +
                      Number(order.discountAmountTotal)
                    ).toFixed(2)
                  ).replace(".", ",")
                )}
              </span>
            </p>
            <p className="flex justify-between">
              <span>
                %
                {(
                  (100 /
                    (Number(order.grandTotal) +
                      Number(order.discountAmountTotal))) *
                  Number(order.discountAmountTotal)
                ).toFixed(2)}{" "}
                iskonto :{" "}
              </span>{" "}
              {/* LOOK */}
              <span>
                {formatToPrice(
                  String(Number(order.discountAmountTotal).toFixed(2)).replace(
                    ".",
                    ","
                  )
                )}
              </span>
            </p>
          </>
        ) : null}

        <p className="flex justify-between text-base">
          <span>Ödenecek Tutar : </span>
          <span className="font-bold">
            {formatToPrice(
              String(Number(order.grandTotal).toFixed(2)).replace(".", ",")
            )}
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

export default TrendyolYemekPrintOrder;

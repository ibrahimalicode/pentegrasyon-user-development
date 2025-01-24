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
        <div className="flex">
          <p className="font-bold pr-1">Adres: </p>
          <MigrosYemekAddress order={order} />
        </div>
        <p>
          <span className="font-bold">Bölge: </span>{" "}
          <span> {order?.customer?.district}</span>
        </p>
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
          <thead className="bg-[--light-3]">
            <tr>
              <th className="p-2 font-normal text-left">Ürün</th>
              <th className="p-2 font-normal text-right">Tutar</th>
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
                {order.options.map((cat) => (
                  <React.Fragment key={cat.id}>
                    {cat.subOptions.length > 0 && (
                      <tr className="px-2">
                        <td className="pl-2">{cat.headerName}</td>
                      </tr>
                    )}
                    {cat.subOptions.map((opt) => (
                      <tr key={opt.id} className="">
                        <td className="pl-2">
                          ▸ {opt.itemNames}
                          {opt.quantity > 1 && (
                            <span className="ml-1 text-[--green-1]">
                              {"(x" + opt.quantity + ")"}
                            </span>
                          )}
                        </td>
                        <td
                          className={`pr-2 text-right ${
                            opt.primaryPrice > 0
                              ? "text-[--green-1]"
                              : "text-[--red-1]"
                          }`}
                        >
                          {opt.primaryPrice > 0
                            ? `+`
                            : opt.primaryPrice < 0
                            ? `-`
                            : ""}
                          {opt.primaryPrice > 0 &&
                            formatToPrice(opt.primaryPriceText)}
                        </td>
                      </tr>
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
                %{(100 / order.totalPrice) * order.discountedPrice} iskonto :{" "}
              </span>{" "}
              {/* LOOK */}
              <span>
                {formatToPrice(
                  String(
                    (order.totalPrice - order.discountedPrice).toFixed(2)
                  ).replace(".", ",")
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
        <p>Müşteri Konumu QR</p>
        <div className="flex justify-center my-2">
          <QrGenerator text={getGoogleAddress()} />
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

import React from "react";
import MarketPalceIds from "../../../enums/marketPlaceIds";
import { formatDateString, formatToPrice } from "../../../utils/utils";
import QrGenerator from "../../common/qrGenerator";

const YemekSepetiPrintOrder = ({ order }) => {
  const customerAddress = `
    ${order.customer.city},
    ${order.customer.deliveryMainArea},
    ${order.customer.street}`;

  function getFullAddress() {
    let address = customerAddress;
    if (order.customer.building) {
      address += order.customer.building;
    }
    if (order.customer.entrance) {
      address += order.customer.entrance;
    }
    if (order.customer.floor) {
      order.customer.floor;
    }
    // return address;
    const googleMapsUrl = `https://www.google.com/maps?q=${order.restaurantLatitude},${order.restaurantLongitude}`;
    return googleMapsUrl;
  }

  return (
    <main className="flex flex-col justify-center p-4 bg-[--light-3] font-normal mx-auto">
      <div className="text-center mb-2">
        <p className="text-[--primary-2] text-3xl font-medium">
          {order.marketplaceTicketRestaurantName}
        </p>
        <p className="text-[--red-1] text-xl ">
          {MarketPalceIds[order.marketplaceId]?.label}
        </p>
      </div>

      <div className="text-lg">
        <p>
          <span className="font-bold">Müşteri </span>
          <span>: {order.customer.firstName}</span>
        </p>
        <p>
          <span className="font-bold">Telefon </span>

          {order.customer.mobilePhone ? (
            <span>: {order.customer.mobilePhone}</span>
          ) : (
            <>
              {order.customer.customerPhoneNumber.split("/")[0]}
              <span className="font-bold">Dahili </span>
              <span>: {order.customer.customerPhoneNumber.split("/")[1]}</span>
            </>
          )}
        </p>
        <p>
          <span className="font-bold">Adres </span>
          <span>
            <span>: {customerAddress}</span>
            {order.customer.building && (
              <span>Bldg: {order.customer.building}</span>
            )}
            {order.customer.entrance && (
              <span> Daire No: {order.customer.entrance}</span>
            )}
            {order.customer.floor && <span> Kat: {order.customer.floor}</span>}
          </span>
        </p>
        <p>
          <span className="font-bold">Bölge </span>{" "}
          <span>: {order?.customer?.deliveryMainArea?.split("")[0]}</span>
        </p>
        {order.customer.deliveryInstructions && (
          <p>
            <span className="font-bold">Tarif </span>
            <span>: {order.customer.deliveryInstructions}</span>
          </p>
        )}
        <p>
          <span className="font-bold">Sip. Tar. </span>
          <span>: {formatDateString(order.customer.createdDateTime)}</span>
        </p>
        <p>
          <span className="font-bold">Ödeme </span>
          <span>: {order.marketplaceTicketPaymentMethodName}</span>
        </p>
        <p>
          <span className="font-bold">Sip No </span>
          <span>: {order.shortCode}</span>
        </p>
      </div>

      {order?.isScheduled && (
        <div className="flex items-center text-lg mt-2 border rounded-md border-gray-700 overflow-clip">
          <div className="px-1 mt-1.5 mr-1 bg-[--gr-1]">🕑</div>
          <div>Teslim Zamanı : </div>
          <div className="font-medium">{order.checkedScheduledDate}</div>
        </div>
      )}

      {order.customerComment && (
        <div className="flex rounded-md overflow-clip my-2">
          <p className="whitespace-nowrap font-bold">Not : </p>
          <div className="w-full px-2 italic flex flex-col gap-1">
            {order.customerComment && <p>{order.customerComment}</p>}
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
            {order.orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td className="px-2 text-left">
                    <div className="font-bold">
                      <span className="mr-0.5 rounded-sm">
                        {order.quantity}{" "}
                      </span>
                      x {order.name}
                    </div>
                    {order.options.map((cat) => (
                      <div key={cat.id} className="text-sm pl-4">
                        <span>{cat.name}</span>

                        {cat.childrens.map((opt) => (
                          <div key={opt.id} className="flex justify-between">
                            <span>▸ {opt.name}</span>
                            <span
                              className={`${
                                opt.price > 0
                                  ? "text-[--green-1]"
                                  : "text-[--red-1]"
                              }`}
                            >
                              {opt.price > 0 ? `+` : opt.price < 0 ? `-` : ""}
                              {opt.price > 0 &&
                                formatToPrice(
                                  String(
                                    (opt.price * order.quantity).toFixed(2)
                                  ).replace(".", ",")
                                )}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 flex justify-end items-start">
                    {formatToPrice(
                      String(
                        (order.paidPrice * order.quantity).toFixed(2)
                      ).replace(".", ",")
                    )}
                  </td>
                </tr>
                {(order.comment || order.description) && (
                  <tr>
                    <td className="relative text-base">
                      <p className="invisible px-2 py-1 flex gap-1">
                        👉 {order.comment}, {order.description}
                      </p>
                      <span className="absolute top-0 left-0 right-0 bg-[--light-3] px-2 py-1 flex gap-1">
                        👉 {order.description}, {order.description}
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
              <span className="font-bold">{order.grandTotal}</span>
            </p>
            <p className="flex justify-between">
              <span>
                %
                {Number(100 / order.grandTotal) *
                  Number(order.discountAmountTotal)}{" "}
                iskonto :{" "}
              </span>{" "}
              {/* LOOK */}
              <span>
                {formatToPrice(
                  String(Number(order.grandTotal).toFixed(2)).replace(".", ",")
                )}
              </span>
            </p>
          </>
        ) : null}

        <p className="flex justify-between text-base">
          <span>Ödenecek Tutar : </span>
          <span className="font-bold">
            {formatToPrice(
              String(
                (
                  Number(order.grandTotal) - Number(order.discountAmountTotal)
                ).toFixed(2)
              ).replace(".", ",")
            )}
          </span>
        </p>
      </div>

      <div className="text-lg text-center">
        <p>Müşteri Konumu QR</p>
        <div className="flex justify-center my-2">
          <QrGenerator text={getFullAddress()} />
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

export default YemekSepetiPrintOrder;

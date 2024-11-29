import React from "react";

//COMP
import QrGenerator from "../../common/qrGenerator";
import { formatToPrice } from "../../../utils/utils";
import MarketPalceIds from "../../../enums/marketPlaceIds";

const GetirYemekPrintOrder = ({ order }) => {
  function getFullAddress() {
    let address = order.client.address;
    if (order.client.aptNo) {
      address += order.client.aptNo;
    }
    if (order.client.doorNo) {
      address += order.client.doorNo;
    }
    if (order.client.floor) {
      order.client.floor;
    }
    // return address;
    const googleMapsUrl = `https://www.google.com/maps?q=${order.restaurantLatitude},${order.restaurantLongitude}`;
    return googleMapsUrl;
  }

  return (
    <main className="px-4 bg-[--light-3] font-normal mx-auto">
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
          <span>: {order.client.name}</span>
        </p>
        <p>
          <span className="font-bold">Telefon </span>

          {order.client.clientUnmaskedPhoneNumber ? (
            <span>: {order.client.clientUnmaskedPhoneNumber}</span>
          ) : (
            <>
              {order.client.clientPhoneNumber.split("/")[0]}
              <span className="font-bold">Dahili </span>
              <span>: {order.client.clientPhoneNumber.split("/")[1]}</span>
            </>
          )}
        </p>
        <p>
          <span className="font-bold">Adres </span>
          <span>
            <span>: {order.client.address}</span>
            {order.client.aptNo && <span>Apt No: {order.client.aptNo}</span>}
            {order.client.doorNo && (
              <span> Daire No: {order.client.doorNo}</span>
            )}
            {order.client.floor && <span> Kat: {order.client.floor}</span>}
          </span>
        </p>
        <p>
          <span className="font-bold">Bölge </span> <span>: Keçiören</span>
        </p>
        {order.client.description && (
          <p>
            <span className="font-bold">Tarif </span>
            <span>: {order.client.description}</span>
          </p>
        )}
        <p>
          <span className="font-bold">Sip. Tar. </span>
          <span>: 04:10.2024 - 17:45</span>
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
          <div className="font-medium">{order.checkedScheduledDate}</div>
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
                      <span className="mr-0.5 rounded-sm">{order.count} </span>x{" "}
                      {order.name}
                    </div>
                    {order.optionCategories.map((cat) => (
                      <div key={cat.id} className="text-sm pl-4">
                        <span>{cat.name}</span>

                        {cat.options.map((opt) => (
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
                                    (opt.price * order.count).toFixed(2)
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
                      String((order.price * order.count).toFixed(2)).replace(
                        ".",
                        ","
                      )
                    )}
                  </td>
                </tr>
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
        {order.totalDiscountedPrice ? (
          <>
            <p className="flex justify-between">
              <span>Hesap Toplamı : </span>
              <span className="font-bold">{order.totalPrice}</span>
            </p>
            <p className="flex justify-between">
              <span>%15 iskonto : </span>
              <span>
                -
                {formatToPrice(
                  String(
                    (order.totalPrice - order.totalDiscountedPrice).toFixed(2)
                  ).replace(".", ",")
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
                    ","
                  )
                )
              : formatToPrice(
                  String(order.totalPrice.toFixed(2)).replace(".", ",")
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

export default GetirYemekPrintOrder;

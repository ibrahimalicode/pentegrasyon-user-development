//MODULES
import React, { useState } from "react";

// IMAGES
import GetirYemek from "../../assets/img/orders/GetirYemek.png";
import MigrosYemek from "../../assets/img/orders/MigrosYemek.png";
import Siparisim from "../../assets/img/orders/Siparisim.png";
import TrendyolYemek from "../../assets/img/orders/TrendyolYemek.png";
import GoFody from "../../assets/img/orders/GoFody.png";
import Yemeksepeti from "../../assets/img/orders/Yemeksepeti.png";
import {
  compareWithCurrentDateTime,
  formatDateString,
} from "../../utils/utils";
import { PrinterI } from "../../assets/icon";
import orderStatuses from "../../data/orderStatuses";

const OrdersTable = ({ inData, totalItems = inData.length, onSuccess }) => {
  const imageSRCs = [
    GetirYemek,
    MigrosYemek,
    TrendyolYemek,
    Yemeksepeti,
    GoFody,
    Siparisim,
  ];

  const [selected, setSelected] = useState(null);
  const [minNow, setMinNow] = useState(new Date());
  function changeSelected(i) {
    setSelected(selected === i ? null : i);
  }
  function checkDate(date) {
    const today = new Date().getDate();
    const orderDate =
      formatDateString(date, true, false, false) === today
        ? formatDateString(date, false, false, false, true, true, false)
        : formatDateString(date, true, true, true, true, true);
    return orderDate;
  }
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-10 text-left">
              <th></th>
              <th>Sipariş No</th>
              <th>Restoran</th>
              <th>Tarih/Saat</th>
              <th>Müşteri Adı</th>
              <th>Bölge</th>
              <th>Kurye</th>
              <th>Tutar</th>
              <th>Durum</th>
              <th className="pr-2">Yazdır</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, i) => (
              <React.Fragment key={i}>
                <tr
                  key={i}
                  onClick={() => changeSelected(i)}
                  className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors text-[--black-1] font-normal cursor-pointer ${
                    totalItems < 8 ? "" : "last:border-b-0"
                  } ${
                    selected === i &&
                    "odd:bg-[--status-green] even:bg-[--status-green]"
                  } `}
                >
                  <td className="pl-4">
                    <img
                      alt="perntegrasyon-marketplace"
                      src={imageSRCs[data.marketplaceId]}
                      className="size-10"
                    />
                  </td>
                  <td className="whitespace-nowrap">{data.confirmationId}</td>
                  <td className="whitespace-nowrap">
                    {data.marketplaceTicketRestaurantName}
                  </td>
                  <td className="whitespace-nowrap">
                    {formatDateString(data.checkoutDate)}
                  </td>
                  <td className="whitespace-nowrap">{data.client.name}</td>
                  <td className="whitespace-nowrap">
                    <button className="border border-[--primary-1] py-2 px-3 rounded-md">
                      {data.client.district}
                    </button>
                  </td>
                  <td className="whitespace-nowrap">{data.courier.name}</td>
                  <td className="whitespace-nowrap">{data.totalPrice}</td>
                  <td className="whitespace-nowrap">
                    <button className="bg-[--status-yellow] py-3.5 px-2 rounded-md border border-[--yellow-1]">
                      {
                        orderStatuses.filter(
                          (stat) => stat.id === data.status
                        )[0]?.label
                      }
                    </button>
                  </td>
                  <td className="w-14 relative">
                    <div className="flex justify-center w-full bg-[--light-1] py-2 rounded-md">
                      <PrinterI />
                    </div>
                  </td>
                </tr>

                <tr className={`${selected !== i && "hidden"}`}>
                  <td colSpan={10}>
                    <div className="w-full bg-slate-100 font-normal z-[999] border border-dashed border-[--primary-1] rounded-md">
                      <table className="w-full">
                        <thead className="h-5 border-b border-[--light-4]">
                          <tr>
                            <th className="font-[400] text-start pl-5">Ürün</th>

                            <th className="font-[400] text-start">
                              Teslimat Zamanı
                            </th>
                            <th className="font-[400] text-start">Adres</th>
                            <th className="font-[400] text-start">Note</th>
                          </tr>
                        </thead>

                        <tbody>
                          {data.orders.map((order, index) => (
                            <tr
                              key={index}
                              className="pb-10 border-0 border-dashed border-[--primary-1]"
                            >
                              <td className="pl-5 py-2.5">
                                <div className="w-max flex">
                                  <div>
                                    <p className="text-[--white-1] bg-[--gr-1] px-1 rounded-sm mr-1">
                                      {order.count}
                                    </p>
                                  </div>
                                  <div className="w-max">
                                    <div className="flex gap-10">
                                      <p>{order.name}</p>
                                      <p className="text-[--black-1] font-bold">
                                        {order.totalPriceWithOption}
                                      </p>
                                    </div>
                                    <div>
                                      {order.optionCategories.map((cat) => (
                                        <React.Fragment key={cat.id}>
                                          <div className="flex justify-between text-xs">
                                            <span>{cat.name}</span>
                                          </div>
                                          {cat.options.map((opt) => (
                                            <div className="flex justify-between text-xs">
                                              <span>▸ {opt.name}</span>
                                              <span
                                                className={`${
                                                  opt.price > 0
                                                    ? "text-[--green-1]"
                                                    : "text-[--red-1]"
                                                }`}
                                              >
                                                {opt.price}
                                              </span>
                                            </div>
                                          ))}
                                          {data.doNotKnock && (
                                            <div className="flex justify-between text-xs">
                                              <span>▸ Zil Çalmayınız</span>
                                            </div>
                                          )}
                                          {data.dropOffAtDoor && (
                                            <div className="flex justify-between text-xs">
                                              <span>▸ Kapıda Bırak</span>
                                            </div>
                                          )}
                                        </React.Fragment>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              {index === 0 && (
                                <>
                                  {data.isScheduled && (
                                    <td>
                                      <p className="text-lg text-[--red-1]">
                                        {checkDate(data.scheduledDate)}
                                      </p>
                                      <p>
                                        {compareWithCurrentDateTime(
                                          "2024-09-23T23:50:00",
                                          minNow
                                        )}{" "}
                                        Dk. Kaldı
                                      </p>
                                    </td>
                                  )}
                                  <td className="max-w-40">
                                    {data.client.address}{" "}
                                    {data.client.description}
                                  </td>
                                  <td>{data.clientNote}</td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="w-full flex gap-5 px-10 py-3.5 border-t border-[--light-4]">
                        <button className="bg-[--status-yellow] py-2 px-4 rounded-md text-[--black-1] border border-[--yellow-1]">
                          Pending...
                        </button>
                        <button className="bg-[--status-green] py-2 px-4 rounded-md text-[--black-1] border border-[--green-1]">
                          Accept
                        </button>
                        <button className="bg-[--status-blue] py-2 px-4 rounded-md text-[--black-1] border border-[--blue-1]">
                          Preparing
                        </button>
                        <button className="bg-[--status-purple] py-2 px-4 rounded-md text-[--black-1] border border-[--purple-1]">
                          On the way
                        </button>
                        <button className="bg-[--status-brown] py-2 px-4 rounded-md text-[--black-1] border border-[--brown-1]">
                          Delivered
                        </button>
                        <button className="bg-[--status-red] py-2 px-4 rounded-md text-[--black-1] border border-[--red-1]">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrdersTable;

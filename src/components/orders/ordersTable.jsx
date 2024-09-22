//MODULES
import React, { useState } from "react";

// IMAGES
import GetirYemek from "../../assets/img/orders/GetirYemek.png";
import MigrosYemek from "../../assets/img/orders/MigrosYemek.png";
import Siparisim from "../../assets/img/orders/Siparisim.png";
import TrendyolYemek from "../../assets/img/orders/TrendyolYemek.png";
import GoFody from "../../assets/img/orders/GoFody.png";
import Yemeksepeti from "../../assets/img/orders/Yemeksepeti.png";
import { formatDateString } from "../../utils/utils";
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

  function changeSelected(i) {
    setSelected(selected === i ? null : i);
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

          <tbody className="relative">
            {inData.map((data, i) => (
              <React.Fragment key={i}>
                <tr
                  key={i}
                  onClick={() => changeSelected(i)}
                  className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors text-[--black-1] font-normal cursor-pointer ${
                    totalItems < 8 ? "" : "last:border-b-0"
                  } ${
                    selected === i && "odd:bg-[--light-1] even:bg-[--light-1]"
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
                  <td className="whitespace-nowrap">{data.restaurant.name}</td>
                  <td className="whitespace-nowrap">
                    {formatDateString(data.checkoutDate)}
                  </td>
                  <td className="whitespace-nowrap">{data.client.name}</td>
                  <td className="whitespace-nowrap">
                    <button className="border border-[--primary-1] py-2 px-3 rounded-md">
                      {data.client.deliveryAddress.district}
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

                <div className={`h-52 ${selected !== i && "hidden"}`}>
                  <div className="absolute left-0 right-0 bg-white font-normal z-[999]">
                    <table className="w-full">
                      <thead className="h-5">
                        <tr>
                          <th className="font-normal text-start pl-5">Ürün</th>
                          <th className="font-normal text-start">
                            Adres Tarifi
                          </th>
                          <th className="font-normal text-start">
                            Teslimat Zamanı
                          </th>
                          <th className="font-normal text-start">Konum</th>
                          <th className="font-normal text-start">Note</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td className="pl-5 pt-1">
                            <div className="w-max flex">
                              <div>
                                <p className="text-[--white-1] bg-[--gr-1] px-1 rounded-sm mr-1">
                                  2
                                </p>
                              </div>
                              <div className="w-max">
                                <div className="flex gap-10">
                                  <p>Tavuklu Wrap</p>
                                  <p className="text-[--green-1]">180.00</p>
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs">
                                    <span>● Tuzsuz</span>
                                    <span className="text-[--green-1]">
                                      5.00
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>● Yağsız</span>
                                    <span className="text-[--green-1]">
                                      0.00
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>● Limonlu</span>
                                    <span className="text-[--green-1]">
                                      0.00
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.
                          </td>
                          <td>2 saat sonra</td>
                          <td>
                            Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.
                          </td>
                          <td>baharatlı olsun</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="w-full flex gap-5 px-10 py-5 mt-6 border-t border-[--light-4]">
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
                </div>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrdersTable;

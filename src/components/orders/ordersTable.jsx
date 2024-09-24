//MODULES
import React, { useEffect, useState } from "react";

// IMAGES
import GetirYemek from "../../assets/img/orders/GetirYemek.png";
import MigrosYemek from "../../assets/img/orders/MigrosYemek.png";
import Siparisim from "../../assets/img/orders/Siparisim.png";
import TrendyolYemek from "../../assets/img/orders/TrendyolYemek.png";
import GoFody from "../../assets/img/orders/GoFody.png";
import Yemeksepeti from "../../assets/img/orders/Yemeksepeti.png";

//UTILS
import { formatDateString } from "../../utils/utils";

//COMP
import { PrinterI } from "../../assets/icon";
import orderStatuses from "../../data/orderStatuses";
import { useSlideBar } from "../../context/SlideBarContext";
import GetirYemekOrderDetails from "./components/getirYemekOrderDetails_";
import RemainingMinutes from "./components/remainingMinutes";

const OrdersTable = ({ inData, totalItems = inData.length, onSuccess }) => {
  const imageSRCs = [
    GetirYemek,
    MigrosYemek,
    TrendyolYemek,
    Yemeksepeti,
    GoFody,
    Siparisim,
  ];
  const { setSlideBarContent } = useSlideBar();

  const [selected, setSelected] = useState(null);

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

  function cellClicked(data) {
    // console.log(data);
    // console.log(data.scheduledDate);
    // console.log(checkDate(data.scheduledDate));
    setSlideBarContent(
      <GetirYemekOrderDetails
        data={{
          ...data,
          checkedScheduledDate: checkDate(data.scheduledDate),
        }}
      />
    );
  }
  // console.log(inData);

  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-10 text-left">
              <th></th>
              <th>Sip. No</th>
              <th>Restoran</th>
              <th>Tarih</th>
              <th>Müşteri Adı</th>
              <th>Bölge</th>
              <th>Kurye</th>
              <th>Tutar</th>
              <th className="w-28">Durum</th>
              <th className="pr-2">Yazdır</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, i) => (
              <tr
                key={i}
                className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors text-[--black-1] font-normal cursor-pointer ${
                  totalItems < 8 ? "" : "last:border-b-0"
                } ${
                  selected === i &&
                  "odd:bg-[--status-green] even:bg-[--status-green]"
                } `}
              >
                <td onClick={() => cellClicked(data)} className="pl-4">
                  <img
                    alt="perntegrasyon-marketplace"
                    src={imageSRCs[data.marketplaceId]}
                    className="size-10"
                  />
                </td>
                <td
                  onClick={() => cellClicked(data)}
                  className="whitespace-nowrap"
                >
                  {data.confirmationId}
                </td>
                <td
                  onClick={() => cellClicked(data)}
                  className="whitespace-nowrap"
                >
                  {data.marketplaceTicketRestaurantName}
                </td>
                <td
                  onClick={() => cellClicked(data)}
                  className="whitespace-nowrap"
                >
                  <p>{checkDate(data.checkoutDate)}</p>
                  {data.isScheduled && (
                    <RemainingMinutes date={data.scheduledDate} />
                  )}
                </td>
                <td
                  onClick={() => cellClicked(data)}
                  className="whitespace-nowrap"
                >
                  {data.client.name}
                </td>
                <td onClick={() => {}} className="whitespace-nowrap">
                  <button className="border border-[--primary-1] py-2 px-3 rounded-md">
                    {data.client.district}
                  </button>
                </td>
                <td onClick={() => {}} className="whitespace-nowrap">
                  {data.courier.name}
                </td>
                <td
                  onClick={() => cellClicked(data)}
                  className="whitespace-nowrap"
                >
                  {data.totalPrice}
                </td>
                <td onClick={() => {}} className="whitespace-nowrap">
                  <button
                    className="w-24 py-3.5 px-2 rounded-md border"
                    style={{
                      backgroundColor: `var(${
                        orderStatuses.filter((col) => col.id === data.status)[0]
                          ?.bg
                      })`,
                      color: `var(${
                        orderStatuses.filter((col) => col.id === data.status)[0]
                          ?.color
                      })`,
                      borderColor: `var(${
                        orderStatuses.filter((col) => col.id === data.status)[0]
                          ?.color
                      })`,
                    }}
                  >
                    {
                      orderStatuses.filter((stat) => stat.id === data.status)[0]
                        ?.label
                    }
                  </button>
                </td>
                <td className="w-14 relative">
                  <div className="flex justify-center w-full bg-[--light-1] py-2 rounded-md">
                    <PrinterI />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrdersTable;

import React from "react";

//COMP
import { InfoI } from "../../../assets/icon";
import CloseI from "../../../assets/icon/close";

//UTILS
import { formatDateString } from "../../../utils/utils";

//CONTEXT
import { useSlideBar } from "../../../context/SlideBarContext";

const marketPlaceColors = [
  { bg: "--getiryemek", color: "--white-1" },
  { bg: "--migrosyemek", color: "--white-1" },
  { bg: "--trendyol", color: "--white-1" },
  { bg: "--yemeksepeti", color: "--white-1" },
  { bg: "--gofody", color: "--white-1" },
  { bg: "--siparisim", color: "--white-1" },
];

const GetirYemekOrderDetails = ({ data }) => {
  const { setSlideBarContent } = useSlideBar();
  // console.log(data);
  return (
    <main className="w-full h-screen bg-gray-100 text-slate-700 overflow-y-auto px-4 pb-20 text-sm font-normal flex flex-col gap-2 relative">
      <div
        className="flex items-center -mx-4 text-base"
        style={{
          backgroundColor: `var(${marketPlaceColors[data.marketplaceId]?.bg})`,
          color: `var(${marketPlaceColors[data.marketplaceId]?.color})`,
        }}
      >
        <div className="w-full flex justify-center items-center gap-2">
          <p>Sipariș Detayı</p>
        </div>
        <span
          onClick={() => setSlideBarContent(null)}
          className="p-2 cursor-pointer"
        >
          <CloseI />
        </span>
      </div>

      <div className="bg-white p-2 rounded-md flex flex-col gap-1">
        <div className="w-full flex justify-between">
          <p>Sipariş durumu</p>
          <p className="text-[--green-2]">{data.status}</p>
        </div>
        <div className="w-full flex justify-between">
          <p>Ödeme Yöntemi</p>
          <p>{data.marketplaceTicketPaymentMethodName}</p>
        </div>
        <div className="w-full flex justify-between">
          <p>Sipariş Tarihi</p>
          <p>
            {formatDateString(
              data.createdDateTime,
              true,
              true,
              true,
              true,
              true
            )}
          </p>
        </div>
        <div className="w-full flex justify-between">
          <p>Kurye</p>
          <p className="flex items-center">
            <span className="flex justify-center items-center text-xs size-4 bg-[--green-2] text-[--white-1] rounded-full mr-1">
              {data.courier.name.slice(0, 1)}
            </span>
            {data.courier.name}
          </p>
        </div>
        <div className="w-full flex justify-between">
          <p>Onay Kodu</p>
          <p className="bg-[--gr-1] text-[--white-1] px-2 rounded-sm">
            {data.confirmationId}
          </p>
        </div>
      </div>

      <div className="bg-white p-2 rounded-md flex flex-col gap-1">
        <div className="flex">
          <p className="w-1/2">Müşteri</p>
          <p className="w-1/2 text-end">{data.client.name}</p>
        </div>
        <div className="flex">
          <p className="w-1/2">Telefon Numarası</p>
          <p className="w-1/2 text-end">
            {data.client.clientUnmaskedPhoneNumber}
            <span className="bg-[--border-1] text-xs ml-2 p-1">
              Dahili: {data.client.clientPhoneNumber.split("/")[1]}
            </span>
          </p>
        </div>
        <div className="flex justify-between">
          <p>Adres</p>
          <div className="w-full max-w-[65%] text-end text-[--primary-2]">
            <p>{data.client.address}</p>
            <p>
              {data.client.aptNo && <span>Apt No: {data.client.aptNo}</span>}
              {data.client.doorNo && (
                <span> Daire No: {data.client.doorNo}</span>
              )}
              {data.client.floor && <span> Kat: {data.client.floor}</span>}
            </p>
          </div>
        </div>
        <div className="flex border-t border-[--gr-3] py-2">
          <p className="w-1/2">Adres Tarifi</p>
          <p className="w-1/2 text-end">{data.client.description}</p>
        </div>
      </div>

      <div className="bg-white p-2 rounded-md flex flex-col gap-3">
        <div className="flex border border-[--gr-1] rounded-md overflow-clip">
          <div className="bg-[--gr-1] text-[--gr-1] px-3 flex items-center">
            <InfoI fill="white" />
          </div>
          <div className="w-full p-2 text-xs italic flex flex-col gap-1">
            <p className="not-italic">Ticket Note</p>
            {data.clientNote && <p>{data.clientNote}</p>}
            {data.doNotKnock && <p>Lütfen zil çalmayın.</p>}
            {data.dropOffAtDoor && <p>Kapıda Bırakın.</p>}
          </div>
        </div>

        <table className="rounded-md overflow-clip h-max">
          <thead className="bg-[--light-3]">
            <tr>
              <th className="p-2 font-normal text-left">Ürün</th>
              <th className="p-2 font-normal text-right">Tutar</th>
            </tr>
          </thead>

          <tbody>
            {data.orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td className="p-2 text-left">
                    <div>
                      <span className="bg-[--gr-1] text-white px-1.5 py-0.5 mr-0.5 rounded-sm">
                        {order.count}
                      </span>
                      {order.name}
                    </div>
                    {order.optionCategories.map((cat) => (
                      <div key={cat.id} className="text-xs mt-1">
                        <span>{cat.name}</span>

                        {cat.options.map((opt) => (
                          <div
                            key={opt.id}
                            className="flex justify-between max-w-44"
                          >
                            <span>▸ {opt.name}</span>
                            <span
                              className={`${
                                opt.price > 0
                                  ? "text-[--green-1]"
                                  : "text-[--red-1]"
                              }`}
                            >
                              {opt.price > 0 ? "+" : opt.price < 0 ? "-" : ""}
                              {opt.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 flex justify-end items-start">
                    {order.price}
                  </td>
                </tr>
                {order.note && (
                  <tr className="relative text-xs">
                    <td>
                      <p className="invisible px-2 py-1 flex gap-1">
                        <InfoI className="size-[16px]" strokeWidth={2} />{" "}
                        {order.note}
                      </p>
                      <span className="absolute top-0 left-0 right-0 bg-[--light-3] px-2 py-1 flex gap-1">
                        <InfoI className="size-[16px]" strokeWidth={2} />{" "}
                        {order.note}
                      </span>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="w-full flex justify-end gap-2 border-t border-[--gr-1]">
          <p>Toplam:</p>
          <p>{data.totalPrice}</p>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-0 flex gap-4 p-2 py-3.5 bg-white border-t border-[--light-4] text-xs whitespace-nowrap">
        <button className="bg-[--status-green] py-2 px-4 rounded-md text-[--black-1] border border-[--green-1]">
          Onayla
        </button>
        <button className="bg-[--status-blue] py-2 px-4 rounded-md text-[--black-1] border border-[--blue-1]">
          Hazırlanıyor
        </button>
        <button className="bg-[--status-purple] py-2 px-4 rounded-md text-[--black-1] border border-[--purple-1]">
          Yola Çıkar
        </button>
        <button className="bg-[--status-brown] py-2 px-4 rounded-md text-[--black-1] border border-[--brown-1]">
          Teslim Et
        </button>
        <button className="bg-[--status-red] py-2 px-4 rounded-md text-[--black-1] border border-[--red-1]">
          İptal Et
        </button>
      </div>
    </main>
  );
};

export default GetirYemekOrderDetails;

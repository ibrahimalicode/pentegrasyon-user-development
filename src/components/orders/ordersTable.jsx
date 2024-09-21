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

  // console.log(inData);
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
            {inData.map((data) => (
              <tr
                key={data.id}
                className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors text-[--black-1] font-normal ${
                  totalItems < 8 ? "" : "last:border-b-0"
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

// IMAGES
import GetirYemek from "../../assets/img/orders/GetirYemek.png";
import MigrosYemek from "../../assets/img/orders/MigrosYemek.png";
import Siparisim from "../../assets/img/orders/Siparisim.png";
import TrendyolYemek from "../../assets/img/orders/TrendyolYemek.png";
import GoFody from "../../assets/img/orders/GoFody.png";
import Yemeksepeti from "../../assets/img/orders/Yemeksepeti.png";
import { formatDateString } from "../../utils/utils";
import { PrinterI } from "../../assets/icon";

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
                className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors ${
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
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.confirmationId}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.restaurant.name}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {formatDateString(data.checkoutDate)}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.client.name}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.client.deliveryAddress.district}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.courier.name}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.totalPrice}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.status}
                </td>
                <td className="w-14 text-[--black-2] relative">
                  <div className="flex justify-center w-full">
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

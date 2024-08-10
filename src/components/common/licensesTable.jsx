import MenuI from "../../assets/icon/menu";
import MarketPalces from "../../data/marketPlaces";
import { formatDateString, getRemainingDays } from "../../utils/utils";

const LicensesTable = ({ inData, Actions, totalItems, onSuccess }) => {
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              <th className="first:pl-4 font-normal">Restoran</th>
              <th className="irst:pl-4 font-normal">Pazaryeri</th>
              <th className="irst:pl-4 font-normal">Başlangıç Tarihi</th>
              <th className="irst:pl-4 font-normal">Bitiş Tarihi</th>
              <th className="irst:pl-4 font-normal">Kalan Gün</th>
              <th className="irst:pl-4 font-normal">Durum</th>
              <th className="irst:pl-4 font-normal">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, index) => (
              <tr
                key={data.id}
                className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 ${
                  totalItems < 8 ? "" : "last:border-b-0"
                } `}
              >
                <td className="whitespace-nowrap text-[--black-2] pl-4 font-light first:font-normal">
                  {data.name}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {MarketPalces[data.marketplaceId]}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {formatDateString(data.startDateTime)}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {formatDateString(data.endDateTime)}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {getRemainingDays(data.startDateTime, data.endDateTime)}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  <span
                    className={`text-xs font-normal cursor-pointer ${
                      data.isActive
                        ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
                        : "text-[--red-1] bg-[--status-red] border-[--red-1]"
                    } px-3 py-1 border border-solid rounded-full`}
                  >
                    ● {data.isActive ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] font-light first:font-normal relative">
                  <MenuI />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default LicensesTable;

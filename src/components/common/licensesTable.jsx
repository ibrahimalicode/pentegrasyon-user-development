import MarketPalceIds from "../../data/marketPlaceIds";
import LicensesActions from "../licenses/actions/licensesActions";
import { formatDateString, getRemainingDays } from "../../utils/utils";
import EditLicenseIsActive from "../licenses/actions/updateLicenseIsActive";

const LicensesTable = ({ inData, totalItems, onSuccess }) => {
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
                className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors ${
                  totalItems < 8 ? "" : "last:border-b-0"
                } `}
              >
                <td className="whitespace-nowrap text-[--black-2] pl-4 font-light first:font-normal">
                  {data.restaurantName}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {MarketPalceIds[data.marketplaceId].value}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {formatDateString(data.startDateTime)}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {formatDateString(data.endDateTime)}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {getRemainingDays(data.endDateTime)}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  <EditLicenseIsActive
                    licenseData={data}
                    onSuccess={onSuccess}
                  />
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] font-light first:font-normal relative">
                  <LicensesActions
                    index={index}
                    licenseData={data}
                    itemsPerPage={inData.length}
                    onSuccess={onSuccess}
                  />
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

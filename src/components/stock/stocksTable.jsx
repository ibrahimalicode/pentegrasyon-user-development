import licenseTypeIds from "../../enums/licenseTypeIds";
import StocksActions from "./actions/stoksActions";
// import LicensesActions from "./actions/licensesActions";

const StocksTable = ({ inData, totalItems = inData?.length, onSuccess }) => {
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              <th className="pl-4 font-normal">Pazaryeri</th>
              <th className="font-normal">Bitiş Tarihi</th>
              <th className="font-normal">Fiyatı</th>
              <th className="font-normal text-center">İşlem</th>
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
                <td className="whitespace-nowrap text-[--black-2] pl-4 font-normal">
                  {licenseTypeIds[data?.licenseTypeId]?.value}
                </td>

                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.time} Yıllık
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.price} ₺
                </td>

                <td className="whitespace-nowrap w-14 text-[--black-2] font-light relative">
                  <StocksActions
                    index={index}
                    stockData={data}
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

export default StocksTable;

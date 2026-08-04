import licenseTypeIds from "../../enums/licenseTypeIds";
import StocksActions from "./actions/stoksActions";
// import LicensesActions from "./actions/licensesActions";
import {
  TABLE,
  TABLE_CARD,
  TABLE_SCROLL,
  TD,
  TH,
  THEAD_ROW,
  TR,
} from "../common/tableStyles";
import { cn } from "../../lib/utils";

const StocksTable = ({ inData, totalItems = inData?.length, onSuccess }) => {
  return (
    <main className={TABLE_SCROLL}>
      <div className={cn(TABLE_CARD, "min-h-[30rem] min-w-[60rem]")}>
        <table className={TABLE}>
          <thead>
            <tr className={THEAD_ROW}>
              <th className={TH}>Pazaryeri</th>
              <th className={TH}>Bitiş Tarihi</th>
              <th className={TH}>Fiyatı</th>
              <th className={cn(TH, "text-center")}>İşlem</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, index) => (
              <tr key={data.id} className={TR}>
                <td className={TD}>
                  {licenseTypeIds[data?.licenseTypeId]?.value}
                </td>

                <td className={TD}>{data.time} Yıllık</td>
                <td className={TD}>{data.price} ₺</td>

                <td className={cn(TD, "w-14 relative")}>
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

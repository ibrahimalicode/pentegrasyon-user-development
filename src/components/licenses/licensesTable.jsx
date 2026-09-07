import licenseTypeIds from "../../enums/licenseTypeIds";
import LicensesActions from "./actions/licensesActions";
import { formatDateString, getRemainingDays } from "../../utils/utils";
import EditLicenseIsActive from "./actions/updateLicenseIsActive";
import CustomPing from "../common/customPing";
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

// Row selection is opt-in: only the licenses page passes selectedIds /
// onToggle (for bulk extension); the restaurant-licenses page renders the
// plain table.
const CHECKBOX =
  "size-4 accent-[--primary-1] cursor-pointer align-middle";

const LicensesTable = ({
  inData,
  totalItems,
  onSuccess,
  selectedIds,
  onToggle,
  onToggleAll,
}) => {
  const selectable = !!onToggle;
  const allSelected =
    selectable && inData.length > 0 && inData.every((d) => selectedIds.has(d.id));

  return (
    <main className={TABLE_SCROLL}>
      <div className={cn(TABLE_CARD, "min-h-[30rem] min-w-[60rem]")}>
        <table className={TABLE}>
          <thead>
            <tr className={THEAD_ROW}>
              {selectable && (
                <th className={cn(TH, "w-10")}>
                  <input
                    type="checkbox"
                    aria-label="Tümünü seç"
                    className={CHECKBOX}
                    checked={allSelected}
                    onChange={() => onToggleAll(inData)}
                  />
                </th>
              )}
              <th className={TH}>Pazaryeri</th>
              <th className={TH}>Restoran</th>
              <th className={TH}>Bitiş Tarihi</th>
              <th className={TH}>Kalan Gün</th>
              <th className={TH}>Durum</th>
              <th className={cn(TH, "text-center")}>İşlem</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, index) => (
              <tr key={data.id} className={TR}>
                {selectable && (
                  <td className={TD}>
                    <input
                      type="checkbox"
                      aria-label={`${data.restaurantName} lisansını seç`}
                      className={CHECKBOX}
                      checked={selectedIds.has(data.id)}
                      onChange={() => onToggle(data)}
                    />
                  </td>
                )}
                <td className={TD}>
                  {licenseTypeIds[data?.licenseTypeId]?.value}
                </td>
                <td className={cn(TD, "w-max")}>
                  <div className="w-max flex items-center gap-1">
                    {!data?.isSettingsAdded && <CustomPing />}
                    <span>{data.restaurantName}</span>
                  </div>
                </td>
                <td className={TD}>
                  {formatDateString({ dateString: data.endDateTime })}
                </td>
                <td className={TD}>
                  {getRemainingDays(data.endDateTime) > 0 ? (
                    getRemainingDays(data.endDateTime)
                  ) : (
                    <p className="text-[--red-1] font-bold">Süresi bitmiş</p>
                  )}
                </td>
                <td className={TD}>
                  <EditLicenseIsActive
                    licenseData={data}
                    onSuccess={onSuccess}
                  />
                </td>
                <td className={cn(TD, "whitespace-nowrap")}>
                  <LicensesActions licenseData={data} onSuccess={onSuccess} />
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

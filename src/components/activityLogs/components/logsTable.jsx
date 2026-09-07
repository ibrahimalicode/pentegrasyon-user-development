import { formatDateString } from "../../../utils/utils";
import CustomCheckbox from "../../common/customCheckbox";
import {
  activityActionType,
  activityEntityType,
  activitySeverity,
  activitySource,
} from "../../../enums/logsEnums";
import {
  TABLE,
  TABLE_CARD,
  TABLE_SCROLL,
  TD,
  TH,
  THEAD_ROW,
  TR,
} from "../../common/tableStyles";
import { cn } from "../../../lib/utils";

const LogsTable = ({
  inData = [],
  isSelectMode = false,
  selectedIds = [],
  setSelectedIds,
}) => {
  const getEnumLabel = (enumData, value) => {
    if (!value) return "-";

    return enumData.find((item) => item.value === value)?.label || value;
  };

  const getSeverityClass = (severity) => {
    if (severity === "Info") {
      return "text-[--green-1] bg-[--status-green] border-[--green-1]";
    }

    if (severity === "Warning") {
      return "text-[--yellow-1] bg-[--status-yellow] border-[--yellow-1]";
    }

    if (severity === "Critical") {
      return "text-[--red-1] bg-[--status-red] border-[--red-1]";
    }

    return "text-[--gray-1] bg-[--status-gray] border-[--gray-1]";
  };

  const getSourceClass = (source) => {
    if (source === "Marketplace") {
      return "text-[--primary-2] bg-[--light-3] border-[--primary-2]";
    }

    return "text-[--black-2] bg-[--light-3] border-[--light-4]";
  };

  const isAllSelected =
    inData.length > 0 && inData.every((item) => selectedIds.includes(item.id));

  const handleSelectAll = (checked) => {
    if (!setSelectedIds) return;

    if (checked) {
      setSelectedIds(inData.map((item) => item.id));
      return;
    }

    setSelectedIds([]);
  };

  const handleSelectRow = (id, checked) => {
    if (!setSelectedIds) return;

    if (checked) {
      setSelectedIds((prev) => [...new Set([...prev, id])]);
      return;
    }

    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <main className={TABLE_SCROLL}>
      <div className={cn(TABLE_CARD, "min-h-[30rem] min-w-[72rem]")}>
        <table className={TABLE}>
          <thead>
            <tr className={THEAD_ROW}>
              {isSelectMode && (
                <th className={cn(TH, "w-12")}>
                  <CustomCheckbox
                    id="logs-select-all"
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    size="5"
                  />
                </th>
              )}
              <th className={TH}>Tarih</th>
              <th className={TH}>İşlem</th>
              <th className={TH}>Varlık</th>
              <th className={TH}>Kaynak</th>
              <th className={TH}>Pazaryeri</th>
              <th className={TH}>Seviye</th>
              <th className={TH}>Mesaj</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, index) => (
              <tr key={data.id || index} className={TR}>
                {isSelectMode && (
                  <td className={TD}>
                    <CustomCheckbox
                      id={`logs-select-${data.id}`}
                      checked={selectedIds.includes(data.id)}
                      onChange={(e) =>
                        handleSelectRow(data.id, e.target.checked)
                      }
                      size="5"
                    />
                  </td>
                )}
                <td className={TD}>
                  {formatDateString({
                    // createdAt is UTC; createdAtTr is Turkey time. Showing
                    // the UTC value put every log 3 hours in the past.
                    dateString: data.createdAtTr || data.createdAt,
                    hour: true,
                    min: true,
                  })}
                </td>
                <td className={TD}>
                  {getEnumLabel(activityActionType, data.actionType)}
                </td>
                <td className={TD}>
                  {getEnumLabel(activityEntityType, data.entityType)}
                </td>
                <td className={TD}>
                  <span
                    className={`text-xs font-normal whitespace-nowrap px-2.5 py-1 border border-solid rounded-lg ${getSourceClass(
                      data.source,
                    )}`}
                  >
                    {getEnumLabel(activitySource, data.source)}
                  </span>
                </td>
                <td className={TD}>{data.marketplace || "-"}</td>
                <td className={TD}>
                  <span
                    className={`text-xs font-normal whitespace-nowrap px-2.5 py-1 border border-solid rounded-lg ${getSeverityClass(
                      data.severity,
                    )}`}
                  >
                    ● {getEnumLabel(activitySeverity, data.severity)}
                  </span>
                </td>
                <td className={cn(TD, "relative group")}>
                  <p
                    className="max-w-[28rem] truncate"
                    title={data.message || ""}
                  >
                    {data.message || "-"}
                  </p>
                  <span className="absolute top-0 left-0 p-2 border border-[--primary-1] border-dashed opacity-0 group-hover:opacity-100 rounded bg-[--white-1] text-xs text-center whitespace-normal">
                    {data.message}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default LogsTable;

import { formatDateString } from "../../../utils/utils";
import CustomCheckbox from "../../common/customCheckbox";
import {
  activityActionType,
  activityEntityType,
  activitySeverity,
  activitySource,
} from "../../../enums/logsEnums";

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
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[72rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              {isSelectMode && (
                <th className="pl-4 font-normal w-12">
                  <CustomCheckbox
                    id="logs-select-all"
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    size="5"
                  />
                </th>
              )}
              <th className="pl-4 font-normal">Tarih</th>
              <th className="font-normal">İşlem</th>
              <th className="font-normal">Varlık</th>
              <th className="font-normal">Kaynak</th>
              <th className="font-normal">Pazaryeri</th>
              <th className="font-normal">Seviye</th>
              <th className="font-normal pr-4">Mesaj</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, index) => (
              <tr
                key={data.id || index}
                className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors ${
                  inData.length < 8 ? "" : "last:border-b-0"
                }`}
              >
                {isSelectMode && (
                  <td className="pl-4">
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
                <td className="whitespace-nowrap text-[--black-2] pl-4 font-normal">
                  {formatDateString({
                    dateString: data.createdAt,
                    hour: true,
                    min: true,
                  })}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {getEnumLabel(activityActionType, data.actionType)}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {getEnumLabel(activityEntityType, data.entityType)}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  <span
                    className={`text-xs font-normal px-2.5 py-1 border border-solid rounded-full ${getSourceClass(
                      data.source,
                    )}`}
                  >
                    {getEnumLabel(activitySource, data.source)}
                  </span>
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.marketplace || "-"}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  <span
                    className={`text-xs font-normal px-2.5 py-1 border border-solid rounded-full ${getSeverityClass(
                      data.severity,
                    )}`}
                  >
                    ● {getEnumLabel(activitySeverity, data.severity)}
                  </span>
                </td>
                <td className="text-[--black-2] font-light pr-4 relative group">
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

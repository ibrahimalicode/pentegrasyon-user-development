import CustomSelect from "../../common/customSelector";
import CustomDatePicker from "../../common/customdatePicker";
import licenseTypeIds from "../../../enums/licenseTypeIds";
import { activityActionType, activitySeverity } from "../../../enums/logsEnums";

const allOption = { value: null, label: "Hepsi", id: null };

const FilterLogs = ({ filter, setFilter, onApply, onClear }) => {
  return (
    <div className="w-full pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 max-sm:gap-y-2">
        <CustomDatePicker
          label="Başlangıç Tarihi"
          value={filter.fromDate}
          onChange={(date) =>
            setFilter((prev) => {
              return {
                ...prev,
                fromDate: date,
              };
            })
          }
          placeholder="Başlangıç tarihi seçin"
          className2="mt-[0]"
          className="py-2.5 w-full"
        />

        <CustomDatePicker
          label="Bitiş Tarihi"
          value={filter.toDate}
          onChange={(date) =>
            setFilter((prev) => {
              return {
                ...prev,
                toDate: date,
              };
            })
          }
          placeholder="Bitiş tarihi seçin"
          className2="mt-[0]"
          className="py-2.5 w-full"
        />

        <CustomSelect
          label="İşlem Tipi"
          className="text-sm"
          className2="mt-[0]"
          isSearchable={false}
          optionStyle={{ fontSize: ".8rem" }}
          options={[allOption, ...activityActionType]}
          value={filter.actionType || allOption}
          onChange={(selectedOption) => {
            setFilter((prev) => {
              return {
                ...prev,
                actionType: selectedOption,
              };
            });
          }}
        />

        <CustomSelect
          label="Pazaryeri"
          className="text-sm"
          className2="mt-[0]"
          isSearchable={false}
          optionStyle={{ fontSize: ".8rem" }}
          options={[allOption, ...licenseTypeIds]}
          value={filter.marketplace || allOption}
          onChange={(selectedOption) => {
            setFilter((prev) => {
              return {
                ...prev,
                marketplace: selectedOption,
              };
            });
          }}
        />

        <CustomSelect
          label="Seviye"
          className="text-sm"
          className2="mt-[0]"
          isSearchable={false}
          optionStyle={{ fontSize: ".8rem" }}
          options={[allOption, ...activitySeverity]}
          value={filter.severity || allOption}
          onChange={(selectedOption) => {
            setFilter((prev) => {
              return {
                ...prev,
                severity: selectedOption,
              };
            });
          }}
        />

        {/* We don't have it here since this is not admins app */}
        {/* <CustomInput
          label="Kullanıcı ID"
          type="text"
          placeholder="Kullanıcı ID"
          value={filter.userId || ""}
          onChange={(value) =>
            setFilter((prev) => {
              return {
                ...prev,
                userId: value,
              };
            })
          }
          className2="mt-[0]"
          className="py-2.5"
        /> */}
      </div>

      <div className="w-full flex gap-2 justify-center pt-6">
        <button
          className="text-[--white-1] bg-[--red-1] py-2 px-12 rounded-lg hover:opacity-90"
          onClick={onClear}
        >
          Temizle
        </button>
        <button
          className="text-[--white-1] bg-[--primary-1] py-2 px-12 rounded-lg hover:opacity-90"
          onClick={onApply}
        >
          Uygula
        </button>
      </div>
    </div>
  );
};

export default FilterLogs;

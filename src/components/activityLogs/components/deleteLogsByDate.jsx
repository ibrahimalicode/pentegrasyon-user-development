import CustomDatePicker from "../../common/customdatePicker";

const DeleteLogsByDate = ({ dateFilter, setDateFilter, onApply, onClear }) => {
  return (
    <div className="w-full pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 max-sm:gap-y-2">
        <CustomDatePicker
          label="Başlangıç Tarihi"
          value={dateFilter.fromDate}
          onChange={(date) =>
            setDateFilter((prev) => {
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
          value={dateFilter.toDate}
          onChange={(date) =>
            setDateFilter((prev) => {
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

export default DeleteLogsByDate;

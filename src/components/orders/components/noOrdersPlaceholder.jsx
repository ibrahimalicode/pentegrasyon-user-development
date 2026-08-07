import { NoOrdersI } from "../../../assets/icon";

// Same shape as NoTableData, but keeps the food illustration this page has
// always had. h-full centers it in the slot the page reserves for the table.
const NoOrdersPlaceholder = () => {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center px-6 py-16 text-center">
      <div className="text-[--status-primary-1]">
        <NoOrdersI className="size-48" fill="currentColor" />
      </div>
      <h3 className="mt-2 text-base font-semibold text-[--black-1]">
        Henüz sipariş alınmadı
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-[--gr-1]">
        Yeni siparişleriniz geldiğinde burada görünecek.
      </p>
    </main>
  );
};

export default NoOrdersPlaceholder;

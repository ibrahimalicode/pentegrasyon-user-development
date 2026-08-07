import { ArrowIL, ArrowIR } from "../../assets/icon/index";
import { usePopup } from "../../context/PopupContext";
import { PrivacyPolicyContent } from "../../pages/privacyPolicy";
import PopupShell from "./popupShell";

const PAGE_BTN =
  "inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm text-[--black-2] transition-colors hover:bg-[--light-3] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent";

const CustomPagination = ({
  pageNumber,
  setPageNumber,
  totalItems,
  itemsPerPage,
  handlePageChange,
  leading,
}) => {
  const { setPopupContent } = usePopup();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      handlePageChange(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
      handlePageChange(pageNumber + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (pageNumber > 3) {
        pages.push("...");
      }
      const startPage = Math.max(2, pageNumber - 1);
      const endPage = Math.min(totalPages - 1, pageNumber + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (pageNumber < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    // Three regions on one row: meta left, controls centered, terms right.
    // The old version faked this with absolutely-positioned side blocks and
    // breakpoint offsets (max-sm:-left-14), which overlapped the controls on
    // narrow screens. A grid gives the same centered look without the hacks;
    // below sm the regions stack.
    <div className="mt-3 grid w-full items-center gap-x-3 gap-y-2 sm:grid-cols-[1fr_auto_1fr]">
      <div className="flex items-center gap-3 max-sm:justify-center">
        {leading}
        {totalItems ? (
          <span className="whitespace-nowrap text-sm text-[--gr-1]">
            Toplam Sayım: {totalItems}
          </span>
        ) : null}
      </div>

      <div className="flex justify-center gap-1 max-sm:-order-1">
        <button onClick={handlePrevious} disabled={pageNumber === 1} className={PAGE_BTN}>
          <ArrowIL className="w-4" /> Önceki
        </button>
        <div className="flex gap-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={index}
                className="inline-flex h-9 items-center px-1 text-sm text-[--gr-1]"
              >
                ...
              </span>
            ) : (
              <button
                key={index}
                className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm transition-colors ${
                  pageNumber === page
                    ? "bg-[--primary-1] font-medium text-white"
                    : "text-[--black-2] hover:bg-[--light-3]"
                }`}
                onClick={() => {
                  setPageNumber(page);
                  handlePageChange(page);
                }}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          onClick={handleNext}
          disabled={pageNumber === totalPages}
          className={PAGE_BTN}
        >
          Sonraki
          <ArrowIR className="w-4" />
        </button>
      </div>

      <div className="flex max-sm:justify-center sm:justify-end">
        <button
          className="text-sm text-[--link-1] hover:underline"
          onClick={() => setPopupContent(<PrivacyPopup />)}
        >
          Kullanım Şartları
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;

const PrivacyPopup = () => {
  const { setPopupContent } = usePopup();
  return (
    <PopupShell title="Kullanım Şartları" onClose={() => setPopupContent(null)}>
      <PrivacyPolicyContent />
    </PopupShell>
  );
};

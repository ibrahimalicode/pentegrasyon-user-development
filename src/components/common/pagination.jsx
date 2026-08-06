import { ArrowIL, ArrowIR } from "../../assets/icon/index";
import { cn } from "../../lib/utils";

// Table footer bar: 40px, sits on the recessed plane with a hairline top rule
// so it bonds to the bottom of the table card. Count readout left, pager
// centre. Nothing is absolutely positioned — the row is a plain flex bar, so
// it lands at the same y on every route.
const PAGER_BTN =
  "inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md text-sm text-[--black-2] transition-colors hover:bg-[--light-3] active:bg-[--light-4] disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-transparent";

const CustomPagination = ({
  pageNumber,
  setPageNumber,
  totalItems,
  itemsPerPage,
  handlePageChange,
}) => {
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

  // Display-only range readout — no effect on what is fetched.
  const rangeStart = totalItems ? (pageNumber - 1) * itemsPerPage + 1 : 0;
  const rangeEnd = Math.min(pageNumber * itemsPerPage, totalItems);

  return (
    <div className="w-full flex h-10 items-center justify-between gap-3 border-t border-[--border-1] bg-[--white-2] px-3">
      <span className="min-w-0 truncate text-2xs font-semibold uppercase tabular-nums text-[--gr-1]">
        {totalItems
          ? `Toplam Sayım: ${rangeStart}–${rangeEnd} / ${totalItems}`
          : null}
      </span>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={pageNumber === 1}
          className={cn(PAGER_BTN, "max-sm:px-2")}
        >
          <ArrowIL className="size-4" />
          <span className="max-sm:sr-only">Önceki</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={index}
                className="px-1 text-sm text-[--gr-1] select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={index}
                type="button"
                className={cn(
                  "inline-flex items-center justify-center min-w-8 h-8 px-2 text-sm tabular-nums rounded-md border border-transparent transition-colors",
                  pageNumber === page
                    ? "border-[--primary-2] bg-[--light-1] text-[--primary-2] font-medium"
                    : "text-[--black-2] hover:bg-[--light-3] active:bg-[--light-4]"
                )}
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
          type="button"
          onClick={handleNext}
          disabled={pageNumber === totalPages}
          className={cn(PAGER_BTN, "max-sm:px-2")}
        >
          <span className="max-sm:sr-only">Sonraki</span>
          <ArrowIR className="size-4" />
        </button>
      </div>

      {/* Balances the count readout so the pager stays optically centred. */}
      <span aria-hidden="true" className="hidden lg:block w-40 shrink-0" />
    </div>
  );
};

export default CustomPagination;

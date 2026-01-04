import { ArrowIL, ArrowIR } from "../../assets/icon/index";
import { usePopup } from "../../context/PopupContext";
import PrivacyPolicy from "../../pages/privacyPolicy";
import { CancelI } from "../../assets/icon";

const CustomPagination = ({
  pageNumber,
  setPageNumber,
  totalItems,
  itemsPerPage,
  handlePageChange,
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
    <div className="mt-3 relative w-full flex justify-center">
      <div className="absolute top-0 bottom-0 right-0 flex items-center max-sm:top-14">
        <button
          className="text-sm text-[--link-1] max-sm:text-xs"
          onClick={() => setPopupContent(<PrivacyPopup />)}
        >
          Kullanım Şartları
        </button>
      </div>

      <div className="flex gap-1">
        <button
          onClick={handlePrevious}
          disabled={pageNumber === 1}
          className="flex gap-2 text-sm items-center px-2 max-sm:pr-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-[--light-3] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowIL className="w-4" /> Önceki
        </button>
        <div className="flex sm:gap-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="p-2 text-sm">
                ...
              </span>
            ) : (
              <button
                key={index}
                className={`py-2 px-4 text-sm border-2 border-solid hover:border-[--border-1] rounded-md ${
                  pageNumber === page
                    ? "border-[--border-1]"
                    : "border-transparent"
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
          className="flex gap-2 text-sm items-center px-2 max-sm:pr-3 sm:px-4 py-2 rounded-md hover:bg-[--light-3] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sonraki
          <ArrowIR className="w-4" />
        </button>
      </div>

      {totalItems ? (
        <div className="absolute top-0 bottom-0 left-0 flex items-center max-sm:top-14 max-sm:pb-6 max-sm:-left-14">
          <span className="text-sm text-[--link-1] max-sm:text-xs">
            Toplam Sayım: {totalItems}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default CustomPagination;

const PrivacyPopup = () => {
  const { setPopupContent } = usePopup();
  return (
    <div className="pt-8 bg-[--white-1] rounded-lg overflow-clip">
      <div className="overflow-y-auto h-[95dvh]">
        <div className="absolute top-2 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-white transition-colors"
            onClick={() => setPopupContent(null)}
          >
            <CancelI />
          </div>
        </div>
        <PrivacyPolicy />
      </div>
    </div>
  );
};

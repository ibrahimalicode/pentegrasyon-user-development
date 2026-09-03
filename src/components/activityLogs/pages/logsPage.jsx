//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import LogsTable from "../components/logsTable";
import FilterLogs from "../components/filterLogs";
import DeleteLogsActions from "../components/deleteLogsActions";
import DeleteLogsByDate from "../components/deleteLogsByDate";
import { LogI } from "../../../assets/icon";
import NoTableData from "../../common/noTableData";
import CustomPagination from "../../common/pagination";
import TableSkeleton from "../../common/tableSkeleton";
import { usePopup } from "../../../context/PopupContext";
import { TOOLBAR_BTN } from "../../../components/common/toolbarStyles";

// REDUX
import {
  getLogs,
  resetGetLogs,
} from "../../../redux/activityLogs/getLogsSlice";
import {
  deleteLogsByDateRange,
  resetDeleteLogsByDateRange,
} from "../../../redux/activityLogs/deleteLogsByDateRangeSlice";
import {
  deleteLogsByIds,
  resetDeleteLogsByIds,
} from "../../../redux/activityLogs/deleteLogsByIdsSlice";

const LogsPage = () => {
  const dispatch = useDispatch();

  const { loading, success, error, logs } = useSelector((s) => s.logs.get);
  const {
    loading: deleteByDateLoading,
    success: deleteByDateSuccess,
    error: deleteByDateError,
  } = useSelector((s) => s.logs.deleteByDateRange);
  const {
    loading: deleteByIdsLoading,
    success: deleteByIdsSuccess,
    error: deleteByIdsError,
  } = useSelector((s) => s.logs.deleteByIds);

  const defaultFilter = {
    fromDate: null,
    toDate: null,
    actionType: { value: null, label: "Hepsi", id: null },
    marketplace: { value: null, label: "Hepsi", id: null },
    severity: { value: null, label: "Hepsi", id: null },
    userId: "",
  };

  const [filter, setFilter] = useState(defaultFilter);
  const [logsData, setLogsData] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openDeleteByDate, setOpenDeleteByDate] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedLogIds, setSelectedLogIds] = useState([]);
  const [deleteDateFilter, setDeleteDateFilter] = useState({
    fromDate: null,
    toDate: null,
  });

  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  const buildFilterParams = () => {
    return {
      fromDate: filter.fromDate
        ? new Date(filter.fromDate).toISOString()
        : null,
      toDate: filter.toDate ? new Date(filter.toDate).toISOString() : null,
      actionType: filter.actionType?.value || null,
      marketplace: filter.marketplace?.value || null,
      severity: filter.severity?.value || null,
      userId: filter.userId?.trim() || null,
    };
  };

  //HANDLER
  function handleGetLogs(number) {
    dispatch(
      getLogs({
        ...buildFilterParams(),
        page: number ? number : pageNumber,
        pageSize: itemsPerPage,
      }),
    );
  }

  //FILTER AND CLEAR FILTER
  function handleFilter(bool) {
    if (bool) {
      setPageNumber(1);
      handleGetLogs(1);
    } else {
      setFilter(defaultFilter);
      setPageNumber(1);
      dispatch(
        getLogs({
          page: 1,
          pageSize: itemsPerPage,
        }),
      );
    }
    setOpenFilter(false);
  }

  function handleToggleSelectMode() {
    if (isSelectMode) {
      setSelectedLogIds([]);
      setIsSelectMode(false);
      return;
    }

    setIsSelectMode(true);
  }

  function handleDeleteSelected() {
    if (selectedLogIds.length < 1) {
      toast.error("Silmek için en az bir kayıt seçin.");
      return;
    }

    dispatch(deleteLogsByIds(selectedLogIds));
  }

  function handleDeleteByDateApply() {
    if (!deleteDateFilter.fromDate || !deleteDateFilter.toDate) {
      toast.error("Başlangıç ve bitiş tarihi zorunludur.");
      return;
    }

    dispatch(
      deleteLogsByDateRange({
        fromDate: new Date(deleteDateFilter.fromDate).toISOString(),
        toDate: new Date(deleteDateFilter.toDate).toISOString(),
      }),
    );
  }

  function handleDeleteByDateClear() {
    setDeleteDateFilter({ fromDate: null, toDate: null });
  }

  // GET LICENSES
  useEffect(() => {
    if (!logsData) {
      handleGetLogs();
    }
  }, [logsData]);

  // TOAST AND GET LICENSES
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(resetGetLogs());
    }
    if (success) {
      console.log(logs);
      setLogsData(logs.data);
      setTotalItems(logs.totalCount);
      dispatch(resetGetLogs());
    }
  }, [success, error, logs]);

  useEffect(() => {
    if (deleteByDateError) {
      dispatch(resetDeleteLogsByDateRange());
    }

    if (deleteByDateSuccess) {
      toast.success("Kayıtlar tarih aralığına göre silindi.");
      setOpenDeleteByDate(false);
      setDeleteDateFilter({ fromDate: null, toDate: null });
      setLogsData(null);
      dispatch(resetDeleteLogsByDateRange());
    }
  }, [deleteByDateSuccess, deleteByDateError]);

  useEffect(() => {
    if (deleteByIdsError) {
      dispatch(resetDeleteLogsByIds());
    }

    if (deleteByIdsSuccess) {
      toast.success("Seçilen kayıtlar silindi.");
      setSelectedLogIds([]);
      setIsSelectMode(false);
      setLogsData(null);
      dispatch(resetDeleteLogsByIds());
    }
  }, [deleteByIdsSuccess, deleteByIdsError]);

  //HIDE POPUP
  const { registerClickOutside } = usePopup();
  const filterLogs = useRef();
  const deleteByDateLogs = useRef();
  useEffect(() => {
    if (filterLogs) {
      registerClickOutside("logsFilter", {
        ref: filterLogs,
        outRef: null,
        callback: () => setOpenFilter(false),
      });
      registerClickOutside("logsDeleteByDate", {
        ref: deleteByDateLogs,
        outRef: null,
        callback: () => setOpenDeleteByDate(false),
      });
    }
  }, [filterLogs, deleteByDateLogs]);

  return (
    <section className="pt-20 sm:pt-[5.25rem] px-[4%] pb-4 flex flex-col min-h-dvh bg-[--white-1]">
      {/* TITLE */}
      <div className="w-full text-[--black-2] pt-4 text-2xl font-semibold">
        <h2>Logs</h2>
      </div>

      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2">
        <div className="w-full flex justify-end">
          <div className="flex gap-2 max-sm:order-1 ">
            {/* <div className="relative" ref={deleteByDateLogs}>
              <DeleteLogsActions
                isSelectMode={isSelectMode}
                selectedCount={selectedLogIds.length}
                onToggleSelectMode={handleToggleSelectMode}
                onDeleteSelected={handleDeleteSelected}
                onToggleDateDelete={() => {
                  setOpenFilter(false);
                  setOpenDeleteByDate((prev) => !prev);
                }}
              />

              <div
                className={`absolute right-0 top-12 max-sm:fixed max-sm:inset-x-4 max-sm:top-24 max-sm:w-auto px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] max-w-[calc(100vw-2rem)] border border-solid border-[--light-3] rounded-lg drop-shadow-md -drop-shadow-md z-50 ${
                  openDeleteByDate ? "visible" : "hidden"
                }`}
              >
                <DeleteLogsByDate
                  dateFilter={deleteDateFilter}
                  setDateFilter={setDeleteDateFilter}
                  onApply={handleDeleteByDateApply}
                  onClear={handleDeleteByDateClear}
                />
              </div>
            </div> */}

            <div className="relative" ref={filterLogs}>
              <button
                className={TOOLBAR_BTN}
                onClick={() => {
                  setOpenDeleteByDate(false);
                  setOpenFilter(!openFilter);
                }}
              >
                Filtre
              </button>

              <div
                className={`absolute right-0 top-12 max-sm:fixed max-sm:inset-x-4 max-sm:top-24 max-sm:w-auto px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] max-w-[calc(100vw-2rem)] border border-solid border-[--light-3] rounded-lg drop-shadow-md -drop-shadow-md z-50 ${
                  openFilter ? "visible" : "hidden"
                }`}
              >
                <FilterLogs
                  filter={filter}
                  setFilter={setFilter}
                  onApply={() => handleFilter(true)}
                  onClear={() => handleFilter(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {logsData?.length > 0 && !loading ? (
        <LogsTable
          inData={logsData}
          isSelectMode={isSelectMode}
          selectedIds={selectedLogIds}
          setSelectedIds={setSelectedLogIds}
        />
      ) : loading ? (
        <TableSkeleton />
      ) : (
        // The old copy said "Lisansınız bulunmamaktadır" — pasted from the
        // licenses page; this is the activity-log list.
        <NoTableData
          Icon={LogI}
          title="Henüz işlem kaydınız yok"
          text="Siparişleriniz işlendikçe hareketler burada listelenecek."
        />
      )}

      {/* PAGINATION */}
      {logsData && typeof totalItems === "number" && (
        <div className="w-full mt-auto pt-4 text-[--black-2]">
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handlePageChange={handleGetLogs}
            disabled={deleteByDateLoading || deleteByIdsLoading}
          />
        </div>
      )}
    </section>
  );
};

export default LogsPage;

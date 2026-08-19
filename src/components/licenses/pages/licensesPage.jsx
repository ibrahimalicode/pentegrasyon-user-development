//MODULES
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import LicensesTable from "../licensesTable";
import AddLicense from "../actions/addLicense";
import CloseI from "../../../assets/icon/close";
import { LicenseI } from "../../../assets/icon";
import NoTableData from "../../common/noTableData";
import DownloadDesktopButton from "../../common/downloadDesktopButton";
import CustomInput from "../../common/customInput";
import CustomPagination from "../../common/pagination";
import TableSkeleton from "../../common/tableSkeleton";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";
import MarketPalceIds from "../../../enums/marketPlaceIds";
import licenseFilterDates from "../../../enums/licenseFilterDates";
import { getRemainingDays } from "../../../utils/utils";
import {
  TOOLBAR_BTN,
  TOOLBAR_BTN_PRIMARY,
} from "../../../components/common/toolbarStyles";

// REDUX
import {
  getLicenses,
  resetGetLicensesState,
} from "../../../redux/licenses/getLicensesSlice";
import {
  getRestaurantsMap,
  resetGetRestaurantsMap,
} from "../../../redux/restaurants/getRestaurantsMapSlice";

const LicensesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error, licenses } = useSelector(
    (state) => state.licenses.getLicenses,
  );

  const {
    loading: restaurantsLoading,
    error: restaurantsError,
    entities,
  } = useSelector((state) => state.restaurants.getRestaurantsMap);

  const [searchVal, setSearchVal] = useState("");
  const [filter, setFilter] = useState({});
  const [licensesData, setLicensesData] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  // Bulk extension: whole license objects keyed by id (a Map, not a Set),
  // because the extend page needs the objects and selection has to survive
  // paging away and back.
  const [selected, setSelected] = useState(new Map());

  const toggleLicense = (license) =>
    setSelected((prev) => {
      const next = new Map(prev);
      if (next.has(license.id)) next.delete(license.id);
      else next.set(license.id, license);
      return next;
    });

  const togglePage = (pageRows) =>
    setSelected((prev) => {
      const next = new Map(prev);
      const allOnPage = pageRows.every((row) => next.has(row.id));
      pageRows.forEach((row) =>
        allOnPage ? next.delete(row.id) : next.set(row.id, row)
      );
      return next;
    });

  // Selects the loaded page's licenses that are expired or expire within
  // 30 days — the ones the licence rings flag.
  const selectExpiring = () => {
    const expiring = (licensesData || []).filter(
      (license) => getRemainingDays(license.endDateTime) < 30
    );
    if (!expiring.length) {
      toast("Bu sayfada süresi yaklaşan lisans yok", { id: "no-expiring" });
      return;
    }
    setSelected((prev) => {
      const next = new Map(prev);
      expiring.forEach((license) => next.set(license.id, license));
      return next;
    });
  };

  const startBulkExtend = () => {
    navigate("/licenses/extend-license", {
      state: { bulkLicenses: [...selected.values()] },
    });
  };

  //HANDLER
  function handleGetLicenses(number, searchVal) {
    dispatch(
      getLicenses({
        pageNumber: number || pageNumber,
        pageSize: itemsPerPage,
        isActive: filter?.status?.value,
        [searchVal ? "searchKey" : ""]: searchVal || null,
        isSettingsAdded: filter?.isSettingsAdded?.value,
        licenseTypeId: filter?.licenseTypeId?.id,
        dateRange: filter?.dateRange?.value,
      }),
    );
  }

  //SEARCH
  function handleSearch(e) {
    e.preventDefault();
    if (!searchVal) return;
    handleGetLicenses(1, searchVal);
    setPageNumber(1);
  }

  //FILTER AND CLEAR FILTER
  function handleFilter(bool) {
    if (bool) {
      handleGetLicenses(1);
    } else {
      dispatch(
        getLicenses({
          pageNumber,
          pageSize: itemsPerPage,
        }),
      );
      setFilter({});
    }
    setPageNumber(1);
    setOpenFilter(false);
  }

  //CLEAR SEARCH
  function clearSearch() {
    setSearchVal("");
    handleGetLicenses();
  }

  // GET LICENSES
  useEffect(() => {
    if (!licensesData) {
      handleGetLicenses();
    }
  }, [licensesData]);

  // TOAST AND GET LICENSES
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(resetGetLicensesState());
    }
    if (success) {
      setTotalItems(licenses.totalCount);
      dispatch(getRestaurantsMap(licenses.data));
      dispatch(resetGetLicensesState());
    }
  }, [success, error, licenses]);

  // TOAST GET AND SET RESTAURANTS
  useEffect(() => {
    if (restaurantsError) {
      toast.error(restaurantsError.message);
      dispatch(resetGetRestaurantsMap());
    }
    if (entities) {
      setLicensesData(entities);
      dispatch(resetGetRestaurantsMap());
    }
  }, [entities, restaurantsError, licenses]);

  //HIDE POPUP
  const { registerClickOutside } = usePopup();
  const filterLicense = useRef();
  useEffect(() => {
    if (filterLicense) {
      registerClickOutside("licensesFilter", {
        ref: filterLicense,
        outRef: null,
        callback: () => setOpenFilter(false),
      });
    }
  }, [filterLicense]);

  return (
    <section className="pt-20 sm:pt-[5.25rem] px-[4%] pb-4 flex flex-col min-h-dvh bg-[--white-1]">
      {/* ACTIONS/BUTTONS — one flat wrapping row, same as the orders page:
          the old justify-between of a fixed-width search against an
          internally-wrapping button group produced a zigzag at mid widths
          (buttons on the first row, search and Filtre orphaned below). */}
      <div className="w-full flex items-center mb-6 flex-wrap gap-2">
        <div className="flex items-center w-full sm:w-auto sm:flex-1 sm:min-w-56 sm:max-w-sm">
          <form className="w-full" onSubmit={handleSearch}>
            <CustomInput
              onChange={(e) => {
                setSearchVal(e);
                !e && clearSearch();
              }}
              value={searchVal}
              placeholder="Ara..."
              // sm:mt-0 too: CustomInput reserves label space at sm+, which
              // made the search 64px tall beside 44px buttons.
              className2="mt-0 sm:mt-0 w-full"
              className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
              icon={<CloseI className="w-4 text-[--red-1]" />}
              className4={`top-[20px] right-2 hover:bg-[--light-4] rounded-full px-2 py-1 ${
                searchVal ? "block" : "hidden"
              }`}
              iconClick={clearSearch}
            />
          </form>
        </div>

        <div className="ml-auto flex justify-end">
          <div className="flex gap-2 flex-wrap justify-end">
            <button
              type="button"
              onClick={selectExpiring}
              title="Süresi 30 günden az kalan veya bitmiş lisansları seç"
              className={TOOLBAR_BTN}
            >
              Yaklaşanları Seç
            </button>
            <DownloadDesktopButton />
            <div>
              <AddLicense
                licenses={licensesData}
                onSuccess={() => setLicensesData(null)}
              />
            </div>

            {/* relative only — w-full here forced the Filtre button onto its
                own wrap line inside the group, splitting the toolbar into a
                zigzag at every width. */}
            <div className="relative" ref={filterLicense}>
              <button
                className={TOOLBAR_BTN}
                onClick={() => setOpenFilter(!openFilter)}
              >
                Filtre
              </button>

              <div
                className={`absolute right-[-60px] sm:right-0 top-12 px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] border border-solid border-[--light-3] rounded-lg drop-shadow-md -drop-shadow-md z-50 ${
                  openFilter ? "visible" : "hidden"
                }`}
              >
                <div className="flex gap-6">
                  <CustomSelect
                    label="Durum"
                    className="text-sm sm:mt-1"
                    className2="sm:mt-3"
                    style={{ padding: "0 !important" }}
                    options={[
                      { value: null, label: "Hepsi" },
                      { value: true, label: "Aktif" },
                      { value: false, label: "Pasif" },
                    ]}
                    value={
                      filter?.status
                        ? filter.status
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          status: selectedOption,
                        };
                      });
                    }}
                  />

                  <CustomSelect
                    label="Ayarlar"
                    style={{ padding: "1px 0px" }}
                    className="text-sm"
                    options={[
                      { value: null, label: "Hepsi" },
                      { value: true, label: "Eklenmiş" },
                      { value: false, label: "Eklenmemiş" },
                    ]}
                    optionStyle={{ fontSize: ".8rem" }}
                    value={
                      filter?.isSettingsAdded
                        ? filter.isSettingsAdded
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          isSettingsAdded: selectedOption,
                        };
                      });
                    }}
                  />
                </div>

                <div className="flex gap-6">
                  <CustomSelect
                    label="Pazaryeri"
                    className2="sm:mt-[.75rem] mt-1"
                    className="text-sm sm:mt-[.25rem]"
                    isSearchable={false}
                    style={{ padding: "0 !important" }}
                    optionStyle={{ fontSize: ".8rem" }}
                    options={[
                      { value: null, label: "Hepsi", id: null },
                      ...MarketPalceIds,
                    ]}
                    value={
                      filter?.licenseTypeId
                        ? filter.licenseTypeId
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          licenseTypeId: selectedOption,
                        };
                      });
                    }}
                  />

                  <CustomSelect
                    label="Bitiş Zamanı"
                    className2="sm:mt-[.75rem] mt-1"
                    className="text-sm sm:mt-[.25rem]"
                    isSearchable={false}
                    style={{ padding: "0 !important" }}
                    optionStyle={{ fontSize: ".8rem" }}
                    options={[
                      { value: null, label: "Hepsi", id: null },
                      ...licenseFilterDates,
                    ]}
                    value={
                      filter?.dateRange
                        ? filter.dateRange
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          dateRange: selectedOption,
                        };
                      });
                    }}
                  />
                </div>

                <div className="w-full flex gap-2 justify-center pt-10">
                  <button
                    className="text-[--white-1] bg-[--red-1] py-2 px-12 rounded-lg hover:opacity-90"
                    onClick={() => handleFilter(false)}
                  >
                    Temizle
                  </button>
                  <button
                    className="text-[--white-1] bg-[--primary-1] py-2 px-12 rounded-lg hover:opacity-90"
                    onClick={() => handleFilter(true)}
                  >
                    Uygula
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BULK-EXTEND BAR — appears once anything is selected */}
      {selected.size > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-3 rounded-lg border border-solid border-[--primary-1]/40 bg-[--light-1] px-3 py-2">
          <p className="text-sm font-medium text-[--black-1]">
            {selected.size} lisans seçildi
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelected(new Map())}
              className={TOOLBAR_BTN}
            >
              Temizle
            </button>
            <button
              type="button"
              onClick={startBulkExtend}
              className={TOOLBAR_BTN_PRIMARY}
            >
              Toplu Uzat ({selected.size})
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      {licensesData?.length > 0 && !loading && !restaurantsLoading ? (
        <LicensesTable
          inData={licensesData}
          onSuccess={() => setLicensesData(null)}
          selectedIds={selected}
          onToggle={toggleLicense}
          onToggleAll={togglePage}
        />
      ) : loading || restaurantsLoading ? (
        <TableSkeleton />
      ) : (
        <NoTableData
          Icon={LicenseI}
          title="Henüz lisansınız yok"
          text="Pazaryeri entegrasyonlarını kullanmaya başlamak için bir lisans ekleyin."
          action={
            <AddLicense
              licenses={licensesData}
              onSuccess={() => setLicensesData(null)}
            />
          }
        />
      )}

      {/* PAGINATION */}
      {licensesData && typeof totalItems === "number" && (
        <div className="w-full mt-auto pt-4 text-[--black-2]">
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handlePageChange={handleGetLicenses}
          />
        </div>
      )}
    </section>
  );
};

export default LicensesPage;

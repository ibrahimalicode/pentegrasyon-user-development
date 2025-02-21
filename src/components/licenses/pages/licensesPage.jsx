//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import LicensesTable from "../licensesTable";
import AddLicense from "../actions/addLicense";
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import CustomPagination from "../../common/pagination";
import TableSkeleton from "../../common/tableSkeleton";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";
import MarketPalceIds from "../../../enums/marketPlaceIds";
import orderFilterDates from "../../../enums/orderFilterDates";

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

  const { loading, success, error, licenses } = useSelector(
    (state) => state.licenses.getLicenses
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

  function handlePageChange(number) {
    dispatch(
      getLicenses({
        pageNumber: number,
        pageSize: itemsPerPage,
      })
    );
  }

  //SEARCH
  function handleSearch(e) {
    e.preventDefault();
    if (!searchVal) return;
    console.log(searchVal);
    dispatch(
      getLicenses({
        pageNumber: 1,
        pageSize: itemsPerPage,
        searchKey: searchVal,
        isActive: filter?.status?.value,
        isSettingsAdded: filter?.isSettingsAdded?.value,
        licenseTypeId: filter?.licenseTypeId?.id,
        dateRange: filter?.dateRange?.value,
      })
    );
    setPageNumber(1);
  }

  //FILTER AND CLEAR FILTER
  function handleFilter(bool) {
    if (bool) {
      const filterData = {
        pageNumber: 1,
        pageSize: itemsPerPage,
        isActive: filter?.status?.value,
        isSettingsAdded: filter?.isSettingsAdded?.value,
        licenseTypeId: filter?.licenseTypeId?.id,
        dateRange: filter?.dateRange?.value,
      };
      dispatch(getLicenses(filterData));
    } else {
      dispatch(
        getLicenses({
          pageNumber,
          pageSize: itemsPerPage,
        })
      );
      setFilter({});
    }
    setPageNumber(1);
    setOpenFilter(false);
  }

  //CLEAR SEARCH
  function clearSearch() {
    setSearchVal("");
    dispatch(
      getLicenses({
        pageNumber,
        pageSize: itemsPerPage,
        searchKey: null,
        isActive: filter?.status?.value,
        isSettingsAdded: filter?.isSettingsAdded?.value,
        licenseTypeId: filter?.licenseTypeId?.id,
        dateRange: filter?.dateRange?.value,
      })
    );
  }

  // GET LICENSES
  useEffect(() => {
    if (!licensesData) {
      dispatch(
        getLicenses({
          pageNumber,
          pageSize: itemsPerPage,
        })
      );
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
  const { contentRef, setContentRef } = usePopup();
  const filterLicense = useRef();
  useEffect(() => {
    if (filterLicense) {
      const refs = contentRef.filter((ref) => ref.id !== "licensesFilter");
      setContentRef([
        ...refs,
        {
          id: "licensesFilter",
          outRef: null,
          ref: filterLicense,
          callback: () => setOpenFilter(false),
        },
      ]);
    }
  }, [filterLicense]);

  return (
    <section className="lg:ml-[280px] pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h2>Lisanslar</h2>
      </div>

      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2">
        <div className="flex items-center w-full max-w-sm max-sm:order-2">
          <form className="w-full" onSubmit={handleSearch}>
            <CustomInput
              onChange={(e) => {
                setSearchVal(e);
                !e && clearSearch();
              }}
              value={searchVal}
              placeholder="Ara..."
              className2="mt-[0px] w-full"
              className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
              icon={<CloseI className="w-4 text-[--red-1]" />}
              className4={`top-[20px] right-2 hover:bg-[--light-4] rounded-full px-2 py-1 ${
                searchVal ? "block" : "hidden"
              }`}
              iconClick={clearSearch}
            />
          </form>
        </div>

        <div className="max-sm:w-full flex justify-end">
          <div className="flex gap-2 max-sm:order-1 ">
            <div className="w-full relative" ref={filterLicense}>
              <button
                className="w-full h-11 flex items-center justify-center text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
                onClick={() => setOpenFilter(!openFilter)}
              >
                Filtre
              </button>

              <div
                className={`absolute right-[-60px] sm:right-0 top-12 px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] border border-solid border-[--light-3] rounded-lg drop-shadow-md -drop-shadow-md ${
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
                      ...orderFilterDates,
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

            <div>
              <AddLicense
                licenses={licensesData}
                onSuccess={() => setLicensesData(null)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {licensesData && !loading && !restaurantsLoading ? (
        <LicensesTable
          inData={licensesData}
          onSuccess={() => setLicensesData(null)}
        />
      ) : loading || restaurantsLoading ? (
        <TableSkeleton />
      ) : null}

      {/* PAGINATION */}
      {licensesData && typeof totalItems === "number" && (
        <div className="w-full self-end flex justify-center pt-4 text-[--black-2]">
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default LicensesPage;

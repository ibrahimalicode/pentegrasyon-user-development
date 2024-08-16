import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import CustomInput from "../../common/customInput";
import { usePopup } from "../../../context/PopupContext";
import CloseI from "../../../assets/icon/close";
import CustomSelect from "../../common/customSelector";
import TableSkeleton from "../../common/tableSkeleton";
import CustomPagination from "../../common/pagination";
import LicensesTable from "../../../components/common/licensesTable";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../../redux/data/getCitiesSlice";
import { getDistricts } from "../../../redux/data/getDistrictsSlice";
import { getNeighs } from "../../../redux/data/getNeighsSlice";
import {
  getUserLicenses,
  resetGetUserLicenses,
} from "../../../redux/licenses/getUserLicensesSlice";
import AddLicense from "../../licenses/addLicense";
import {
  getLicensesRestaurant,
  resetGetLicensesRestaurant,
} from "../../../redux/restaurants/getRestaurantSlice";
import { getUser } from "../../../redux/users/getUserByIdSlice";
import DoubleArrowRI from "../../../assets/icon/doubleArrowR";

const UserLicensesPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;

  const { loading, success, error, userLicenses } = useSelector(
    (state) => state.licenses.getUserLicenses
  );

  const {
    success: withRestaurantSucc,
    error: withRestaurantError,
    licenses: licensesWithRestaurant,
  } = useSelector(
    (state) => state.restaurants.getRestaurant.licensesRestaurant
  );

  const { user } = useSelector((state) => state.users.getUser);

  const { cities: citiesData } = useSelector((state) => state.data.getCities);

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );
  const { neighs: neighsData, success: neighsSuccess } = useSelector(
    (state) => state.data.getNeighs
  );

  const [searchVal, setSearchVal] = useState("");
  const [filter, setFilter] = useState({
    city: null,
    district: null,
    neighbourhood: null,
  });
  const [licensesData, setLicensesData] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const [userData, setUserData] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);

  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  function clearSearch() {
    setSearchVal("");
    return;
    dispatch(
      getUserLicenses({
        pageNumber,
        pageSize: itemsPerPage,
        searchKey: null,
        active: filter?.status?.value,
        city: filter?.city?.value,
        district: filter?.district?.value,
        neighbourhood: filter?.neighbourhood?.value,
      })
    );
  }

  function handleSearch(e) {
    e.preventDefault();
    return;
    if (!searchVal) return;
    dispatch(
      getUserLicenses({
        pageNumber,
        pageSize: itemsPerPage,
        searchKey: searchVal,
        active: filter?.status?.value,
        city: filter?.city?.value,
        district: filter?.district?.value,
        neighbourhood: filter?.neighbourhood?.value,
      })
    );
  }

  function handleFilter(bool) {
    return;
    if (bool) {
      setOpenFilter(false);
      setPageNumber(1);
      dispatch(
        getUserLicenses({
          pageNumber,
          pageSize: itemsPerPage,
          searchKey: searchVal,
          active: filter?.status?.value,
          city: filter?.city?.value,
          district: filter?.district?.value,
          neighbourhood: filter?.neighbourhood?.value,
        })
      );
    } else {
      if (filter) {
        dispatch(
          getUserLicenses({
            pageNumber,
            pageSize: itemsPerPage,
            searchKey: null,
            active: null,
            city: null,
            district: null,
            neighbourhood: null,
          })
        );
      }
      setFilter({
        city: null,
        district: null,
        neighbourhood: null,
      });
      setOpenFilter(false);
    }
  }

  function handlePageChange(number) {
    dispatch(
      getUserLicenses({
        userId,
        pageNumber: number,
        pageSize: itemsPerPage,
        searchKey: searchVal,
        active: filter?.status?.value,
        city: filter?.city?.value,
        district: filter?.district?.value,
        neighbourhood: filter?.neighbourhood?.value,
      })
    );
  }
  // GET USER
  useEffect(() => {
    if (!userData) {
      dispatch(getUser({ userId }));
    }
  }, [userData]);

  //SET USER
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  // GET LICENSES
  useEffect(() => {
    if (!licensesData) {
      dispatch(
        getUserLicenses({
          userId,
          pageNumber,
          pageSize: itemsPerPage,
          searchKey: null,
          active: null,
          city: null,
          district: null,
          neighbourhood: null,
        })
      );
    }
  }, [licensesData]);

  // TOAST AND SET LICENSES
  useEffect(() => {
    if (error) {
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetUserLicenses());
    }

    if (success) {
      dispatch(getLicensesRestaurant({ licenses: userLicenses.data }));
    }
  }, [success, error, userLicenses]);

  // TOAST AND SET LICENSES
  useEffect(() => {
    if (withRestaurantError) {
      if (withRestaurantError?.message_TR) {
        toast.error(withRestaurantError.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetLicensesRestaurant());
    }
    if (withRestaurantSucc) {
      setLicensesData(licensesWithRestaurant);
      setTotalItems(userLicenses.totalCount);
      dispatch(resetGetUserLicenses());
      dispatch(resetGetLicensesRestaurant());
    }
  }, [
    withRestaurantSucc,
    withRestaurantError,
    licensesWithRestaurant,
    userLicenses,
  ]);

  // GET AND SET CITIES
  useEffect(() => {
    if (!citiesData) {
      dispatch(getCities());
    } else {
      setCities(citiesData);
    }
  }, [citiesData]);

  // GET DISTRICTS
  useEffect(() => {
    if (filter.city?.id) {
      dispatch(getDistricts({ cityId: filter.city.id }));
      setFilter((prev) => {
        return {
          ...prev,
          district: null,
        };
      });
    }
  }, [filter.city]);

  // SET DISTRICTS
  useEffect(() => {
    if (districtsSuccess) {
      setDistricts(districtsData);
    }
  }, [districtsSuccess]);

  // GET NEIGHS
  useEffect(() => {
    if (filter.district?.id && filter.city?.id) {
      dispatch(
        getNeighs({
          cityId: filter.city.id,
          districtId: filter.district.id,
        })
      );
      setFilter((prev) => {
        return {
          ...prev,
          neighbourhood: null,
        };
      });
    }
  }, [filter.district]);

  // SET NEIGHS
  useEffect(() => {
    if (neighsSuccess) {
      setNeighs(neighsData);
    }
  }, [neighsSuccess]);

  //HIDE POPUP
  const { contentRef, setContentRef, setShowPopup, setPopupContent } =
    usePopup();
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
    <section className="lg:ml-[280px] pt-28 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--gr-1] pt-4 text-sm font-[300] cursor-pointer">
        {userData ? (
          <div
            className="flex items-center gap-1"
            onClick={() => window.history.back()}
          >
            {userData.isDealer ? "Bayi " : "Müşteri "}
            {userData.fullName} <DoubleArrowRI className="size-3" /> Lisanslar
          </div>
        ) : (
          <div
            className="flex items-center gap-1"
            onClick={() => window.history.back()}
          >
            Müşteriler <DoubleArrowRI className="size-3" /> Lisanslar
          </div>
        )}
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
              placeholder="Search..."
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
                Filter
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
                    label="Şehir"
                    style={{ padding: "1px 0px" }}
                    className="text-sm"
                    options={[{ value: null, label: "Hepsi" }, ...cities]}
                    optionStyle={{ fontSize: ".8rem" }}
                    value={
                      filter?.city
                        ? filter.city
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          city: selectedOption,
                        };
                      });
                    }}
                  />
                </div>

                <div className="flex gap-6">
                  <CustomSelect
                    label="District"
                    className2="sm:mt-[.75rem] mt-1"
                    className="text-sm sm:mt-[.25rem]"
                    isSearchable={false}
                    style={{ padding: "0 !important" }}
                    options={[{ value: null, label: "Hepsi" }, ...districts]}
                    optionStyle={{ fontSize: ".8rem" }}
                    value={
                      filter?.district
                        ? filter.district
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          district: selectedOption,
                        };
                      });
                    }}
                  />
                  <CustomSelect
                    label="neighbourhood"
                    className2="sm:mt-[.75rem] mt-1"
                    className="text-sm sm:mt-[.25rem]"
                    isSearchable={false}
                    style={{ padding: "0 !important" }}
                    options={[{ value: null, label: "Hepsi" }, ...neighs]}
                    optionStyle={{ fontSize: ".8rem" }}
                    value={
                      filter?.neighbourhood
                        ? filter.neighbourhood
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          neighbourhood: selectedOption,
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
                    Filter
                  </button>
                </div>
              </div>
            </div>

            <div>
              <AddLicense onSuccess={() => setLicensesData(null)} />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {licensesData ? (
        <LicensesTable
          inData={licensesData}
          onSuccess={() => setLicensesData(null)}
        />
      ) : loading ? (
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

export default UserLicensesPage;

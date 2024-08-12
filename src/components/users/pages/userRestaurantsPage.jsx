import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CustomPagination from "../../common/pagination";
import {
  getUserRestaurants,
  resetGetUserRestaurants,
} from "../../../redux/restaurants/getUserRestaurantsSlice";
import TableSkeleton from "../../common/tableSkeleton";
import toast from "react-hot-toast";
import RestaurantsTable from "../../common/restaurantsTable";
import CustomInput from "../../common/customInput";
import CloseI from "../../../assets/icon/close";
import CustomSelect from "../../common/customSelector";
import { getCities } from "../../../redux/data/getCitiesSlice";
import { getDistricts } from "../../../redux/data/getDistrictsSlice";
import { getNeighs } from "../../../redux/data/getNeighsSlice";
import { usePopup } from "../../../context/PopupContext";
import RestaurantActions from "../userRestaurantActions/userRestaurantActions";
import AddRestaurant from "../../restaurants/addRestaurant";

const UserRestaurants = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, success, error, restaurants } = useSelector(
    (state) => state.restaurants.getUserRestaurants
  );
  const { cities: citiesData } = useSelector((state) => state.data.getCities);

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );
  const { neighs: neighsData, success: neighsSuccess } = useSelector(
    (state) => state.data.getNeighs
  );

  const { users } = useSelector((state) => state.users.getUsers);

  const [searchVal, setSearchVal] = useState("");
  const [restaurantsData, setRestaurantsData] = useState(null);
  const [filter, setFilter] = useState({
    city: null,
    district: null,
    neighbourhood: null,
  });
  const [openFilter, setOpenFilter] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 8;

  const [userInfo, setUserInfo] = useState(() => {
    if (users?.data) {
      const user = users.data.filter((data) => data.id === params?.id)[0];
      return user;
    }
  });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);
  const [totalItems, setTotalItems] = useState(null);

  function clearSearch() {
    setSearchVal("");
    dispatch(
      getUserRestaurants({
        userId: params.id,
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
    if (!searchVal) return;
    dispatch(
      getUserRestaurants({
        userId: params.id,
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
    if (bool) {
      setOpenFilter(false);
      setPageNumber(1);
      dispatch(
        getUserRestaurants({
          userId: params.id,
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
          getUserRestaurants({
            userId: params.id,
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
      getUserRestaurants({
        userId: params.id,
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

  // GET USER RESTAURATS
  useEffect(() => {
    if (!restaurantsData) {
      dispatch(
        getUserRestaurants({
          userId: params.id,
          pageNumber,
          pageSize: itemsPerPage,
          searchKey: null,
          city: null,
          district: null,
          neighbourhood: null,
        })
      );
    }
  }, [params, restaurantsData]);

  // TOAST, AND SET RESTAURATS
  useEffect(() => {
    if (error) {
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetUserRestaurants());
    }

    if (success) {
      setRestaurantsData(restaurants.data);
      // console.log(restaurants.data);
      setTotalItems(restaurants.totalCount);
      dispatch(resetGetUserRestaurants());
    }
  }, [success, error, restaurants]);

  // GET CITIES
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
  const filterRestaurant = useRef();
  useEffect(() => {
    if (filterRestaurant) {
      const refs = contentRef.filter(
        (ref) => ref.id !== "userRestaurantFilter"
      );
      setContentRef([
        ...refs,
        {
          id: "userRestaurantFilter",
          outRef: null,
          ref: filterRestaurant,
          callback: () => setOpenFilter(false),
        },
      ]);
    }
  }, [filterRestaurant]);

  return (
    <section className="lg:ml-[280px] pt-28 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--gr-1] pt-4 text-base cursor-pointer">
        {userInfo ? (
          <div onClick={() => window.history.back()}>
            {userInfo.isDealer ? "Bayi " : "Müşteri "}
            {userInfo.fullName} {">"} Restoranlar
          </div>
        ) : (
          <div onClick={() => window.history.back()}>
            Müşteriler {">"} Restoranlar
          </div>
        )}
      </div>

      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2">
        <div className="flex items-center w-full max-w-sm max-sm:order-2">
          <form className="w-full" onSubmit={handleSearch}>
            <CustomInput
              onChange={(e) => {
                setSearchVal(e.target.value);
                !e.target.value && clearSearch();
              }}
              value={searchVal}
              placeholder="Search..."
              className2="mt-[0px] w-full"
              className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
              icon={<CloseI className="w-4 text-[--red-1]" />}
              className4={`hover:bg-[--light-4] rounded-full px-2 py-1 ${
                searchVal ? "block" : "hidden"
              }`}
              iconClick={clearSearch}
            />
          </form>
        </div>

        <div className="max-sm:w-full flex justify-end">
          <div className="flex gap-2 max-sm:order-1 ">
            <div className="w-full relative" ref={filterRestaurant}>
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
                    className="text-sm sm:mt-1"
                    className2="sm:mt-3"
                    style={{ padding: "0 !important" }}
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
              <AddRestaurant onSuccess={() => handleFilter(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {restaurantsData ? (
        <RestaurantsTable
          inData={restaurantsData}
          Actions={RestaurantActions}
          totalItems={restaurantsData.length}
          onSuccess={() => handleFilter(true)}
        />
      ) : loading ? (
        /* TABLE SKELETON */
        <TableSkeleton />
      ) : null}

      {/* PAGINATION */}
      {restaurantsData && typeof totalItems === "number" && (
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

export default UserRestaurants;

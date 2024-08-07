import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomPagination from "../../common/pagination";
import {
  getUserRestaurants,
  resetGetUserRestaurants,
} from "../../../redux/restaurants/getUserRestaurantsSlice";
import TableSkeleton from "../../common/tableSkeleton";
import toast from "react-hot-toast";
import RestaurantsTable from "../../common/restaurantsTable";
import CustomInput from "../../common/CustomInput";
import CloseI from "../../../assets/icon/close";
import CustomSelect from "../../common/CustomSelector";

const UserRestaurants = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, success, error, restaurants } = useSelector(
    (state) => state.restaurants.getUserRestaurants
  );

  const [searchVal, setSearchVal] = useState("");
  const [restaurantData, setRestaurantData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 8;

  const [totalItems, setTotalItems] = useState(null);
  const lastItemIndex = pageNumber * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const handleSearch = (e) => {
    if ((!e.code && e?.target?.value === "") || typeof e === "string" || !e) {
      setSearchVal("");
      dispatch(
        getUserRestaurants({
          userId: params.id,
          pageNumber,
          pageSize: itemsPerPage,
          searchKey: null,
          status: filter?.status?.value,
          city: filter?.city?.value,
          district: filter?.district?.value,
          neighbourhood: filter?.neighbourhood?.value,
        })
      );
      return;
    }
    setSearchVal(e.target.value);
    if (e.code === "Enter") {
      dispatch(
        getUserRestaurants({
          userId: params.id,
          pageNumber,
          pageSize: itemsPerPage,
          searchKey: searchVal,
          status: filter?.status?.value,
          city: filter?.city?.value,
          district: filter?.district?.value,
          neighbourhood: filter?.neighbourhood?.value,
        })
      );
    }
    return;
  };

  const handlePageChange = (number) => {
    dispatch(
      getUserRestaurants({
        userId: params.id,
        pageNumber: number,
        pageSize: itemsPerPage,
        searchKey: searchVal,
        status: filter?.status?.value,
        city: filter?.city?.value,
        district: filter?.district?.value,
        neighbourhood: filter?.neighbourhood?.value,
      })
    );
  };

  useEffect(() => {
    if (!restaurantData) {
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
  }, [params, restaurantData]);

  useEffect(() => {
    if (error) {
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetUserRestaurants());
    }

    if (success) {
      setRestaurantData(restaurants.data.data);
      setTotalItems(restaurants.totalCount);
      console.log(restaurants);
      dispatch(resetGetUserRestaurants());
    }
  }, [loading, success, error, restaurants]);

  restaurantData && console.log(restaurantData, typeof totalItems === "number");

  return (
    <section className="lg:ml-[280px] pt-28 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--gr-1] pt-4 text-lg">
        <p>Müşteriler {">"} restoranlar</p>
      </div>

      {/* ACTIONS/BUTTONS */}
      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2">
        <div className="flex items-center w-full max-w-sm max-sm:order-2">
          <CustomInput
            onKeyDown={(e) => handleSearch(e)}
            onChange={(e) => handleSearch(e)}
            value={searchVal}
            placeholder="Search..."
            className2="mt-[0px] w-full"
            className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
            icon={<CloseI className="w-4 text-[--red-1]" />}
            className3={`top-[20px] hover:bg-[--light-4] rounded-full px-2 py-1 ${
              searchVal ? "block" : "hidden"
            }`}
            onClick={() => handleSearch("")}
          />
        </div>

        <div className="w-full flex justify-end">
          <div className="flex gap-2 max-sm:order-1 ">
            <div className="w-full relative">
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
                    options={[{ value: null, label: "Hepsi" }, ...cities]}
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
                    options={[{ value: null, label: "Hepsi" }, ...cities]}
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

            <div className="">
              <button className="h-11 whitespace-nowrap text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]">
                Add user
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {restaurantData ? (
        <RestaurantsTable inData={restaurantData} />
      ) : loading ? (
        /* TABLE SKELETON */
        <TableSkeleton />
      ) : null}

      {/* PAGINATION */}
      {restaurantData && typeof totalItems === "number" && (
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

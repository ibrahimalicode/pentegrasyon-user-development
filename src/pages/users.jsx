import CustomInput from "../components/common/CustomInput";
import { useEffect, useState } from "react";
import MenuI from "../assets/icon/menu";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, resetGetUsersState } from "../redux/users/getUsersSlice";
import toast from "react-hot-toast";
import { formatDateString } from "../utils/utils";
import CustomPagination from "../components/common/pagination";
import CloseI from "../assets/icon/close";
import TableSkeleton from "../components/common/tableSkeleton";
import CustomSelect from "../components/common/CustomSelector";
import cities from "../assets/json/cities";
import { DeleteI, UsersI } from "../assets/icon";
import UsersActions from "../components/users/usersActions";

const Users = () => {
  const dispatch = useDispatch();
  const { loading, success, error, users } = useSelector(
    (state) => state.users.getUsers
  );

  const [searchVal, setSearchVal] = useState("");
  const [usersData, setUsersData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 8;

  const [totalItems, setTotalItems] = useState(null);
  const lastItemIndex = pageNumber * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = usersData?.slice(firstItemIndex, lastItemIndex);

  const handleSearch = (e) => {
    if ((!e.code && e?.target?.value === "") || typeof e === "string" || !e) {
      setSearchVal("");
      dispatch(
        getUsers({
          pageNumber,
          pageSize: itemsPerPage,
          searchKey: null,
          active: filter?.active?.value,
          verify: filter?.verify?.value,
          dealer: filter?.dealer?.value,
          city: filter?.city?.value,
        })
      );
      return;
    }
    setSearchVal(e.target.value);
    if (e.code === "Enter") {
      dispatch(
        getUsers({
          pageNumber,
          pageSize: itemsPerPage,
          searchKey: searchVal,
          active: filter?.active?.value,
          verify: filter?.verify?.value,
          dealer: filter?.dealer?.value,
          city: filter?.city?.value,
        })
      );
    }
    return;
  };

  const handleFilter = (bool) => {
    if (bool) {
      setOpenFilter(false);
      setPageNumber(1);
      dispatch(
        getUsers({
          pageNumber: 1,
          pageSize: itemsPerPage,
          active: filter?.active?.value,
          verify: filter?.verify?.value,
          dealer: filter?.dealer?.value,
          city: filter?.city?.value,
        })
      );
    } else {
      if (filter) {
        dispatch(
          getUsers({
            pageNumber,
            pageSize: itemsPerPage,
            active: null,
            verify: null,
            dealer: null,
            city: null,
          })
        );
      }
      setFilter(null);
      setOpenFilter(false);
    }
  };

  const handlePageChange = (number) => {
    dispatch(
      getUsers({
        pageNumber: number,
        pageSize: itemsPerPage,
        searchKey: searchVal,
        active: filter?.active?.value,
        verify: filter?.verify?.value,
        dealer: filter?.dealer?.value,
        city: filter?.city?.value,
      })
    );
  };

  useEffect(() => {
    if (!usersData) {
      dispatch(
        getUsers({
          pageNumber,
          pageSize: itemsPerPage,
          searchKey: searchVal,
          active: null,
          verify: null,
          dealer: null,
          city: null,
        })
      );
    }
  }, [usersData]);

  useEffect(() => {
    if (error) {
      toast.dismiss();

      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetUsersState());
    }

    if (success) {
      toast.dismiss();
      setUsersData(users?.data);
      setTotalItems(users?.totalCount);
      dispatch(resetGetUsersState());
    }
  }, [loading, success, error, users]);

  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h2>Customers</h2>
      </div>

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
                    label="Rol"
                    className="text-sm sm:mt-1"
                    className2="sm:mt-3"
                    style={{ padding: "0 !important" }}
                    options={[
                      { value: null, label: "Hepsi" },
                      { value: true, label: "Bayi" },
                      { value: false, label: "Müşteri" },
                    ]}
                    value={
                      filter?.dealer
                        ? filter.dealer
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          dealer: selectedOption,
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
                    label="Durum"
                    className2="sm:mt-[.75rem] mt-1"
                    className="text-sm sm:mt-[.25rem]"
                    isSearchable={false}
                    style={{ padding: "0 !important" }}
                    options={[
                      { value: null, label: "Hepsi" },
                      { value: true, label: "Aktif" },
                      { value: false, label: "Pasif" },
                    ]}
                    value={
                      filter?.active
                        ? filter.active
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          active: selectedOption,
                        };
                      });
                    }}
                  />
                  <CustomSelect
                    label="Onay"
                    className2="sm:mt-[.75rem] mt-1"
                    className="text-sm sm:mt-[.25rem]"
                    isSearchable={false}
                    style={{ padding: "0 !important" }}
                    options={[
                      { value: null, label: "Hepsi" },
                      { value: true, label: "Onaylı" },
                      { value: false, label: "Onlaylanmadı" },
                    ]}
                    value={
                      filter?.verify
                        ? filter.verify
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          verify: selectedOption,
                        };
                      });
                    }}
                  />
                </div>

                {/* 
                <div className="flex gap-2">
                  <CustomDatePicker
                    label="Başlangıç"
                    className="sm:py-[.5rem] py-[.5rem] w-full"
                    className2="sm:mt-[.75rem]"
                    popperClassName="custom-popper-left"
                    dateFormat="dd.MM.yyyy"
                    value={filter?.startDateTime ? filter.startDateTime : null}
                    onChange={(date) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          startDateTime: date,
                        };
                      });
                    }}
                  />
                  <CustomDatePicker
                    label="Bitiş"
                    className="sm:py-[.5rem] py-[.5rem] w-full"
                    className2="sm:mt-[.75rem]"
                    popperClassName="custom-popper-right"
                    dateFormat="dd.MM.yyyy"
                    value={filter?.endDateTime ? filter.endDateTime : null}
                    onChange={(date) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          endDateTime: date,
                        };
                      });
                    }}
                  />
                </div>
                */}

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
      {usersData ? (
        <div className="border border-solid border-[--light-4] rounded-lg max-xl:overflow-x-scroll">
          <table className="w-full text-sm font-light min-w-[60rem]">
            <thead>
              <tr className="bg-[--light-3] h-8 text-left">
                <th className="first:pl-4 font-normal">Ad Soyad</th>
                <th className="irst:pl-4 font-normal">Rol</th>
                <th className="irst:pl-4 font-normal">iletişim</th>
                <th className="irst:pl-4 font-normal">Il</th>
                <th className="irst:pl-4 font-normal">Durum</th>
                <th className="irst:pl-4 font-normal text-center">Onaylı</th>
                <th className="irst:pl-4 font-normal">Kayıt Tarihi</th>
                <th className="irst:pl-4 font-normal text-center">İşlem</th>
              </tr>
            </thead>

            <tbody>
              {usersData.map((data, index) => (
                <tr
                  key={data.id}
                  className="odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 last:border-b-0"
                >
                  <td className="whitespace-nowrap text-[--black-2] pl-4 font-light first:font-normal">
                    {data.fullName}
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    {data.isDealer ? "Bayi" : "Musteri"}
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    {data.phoneNumber}
                    <br />
                    <span className="text-xs font-light text-[--gr-1]">
                      {data.email}
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    {data.city}
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    <span
                      className={`text-xs font-normal ${
                        data.isActive
                          ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
                          : "text-[--red-1] bg-[--status-red] border-[--red-1]"
                      } px-3 py-1 border border-solid rounded-full`}
                    >
                      ● {data.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-center text-[--black-2] font-light first:font-normal">
                    <span
                      className={`text-xs font-normal ${
                        data.isVerify
                          ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
                          : "text-[--black-1] bg-[--light-4]"
                      } px-3 py-1 border border-solid rounded-full`}
                    >
                      {data.isVerify ? "Onaylı" : "Onlaylanmadı"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    {formatDateString(data.createdDateTime)}
                  </td>
                  <td className="text-center text-[--black-2] font-light first:font-normal relative">
                    <UsersActions index={index} user={data} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <TableSkeleton />
      )}

      {/* PAGINATION */}
      {usersData && totalItems && (
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

export default Users;

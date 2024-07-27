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

const Users = () => {
  const dispatch = useDispatch();
  const { loading, success, error, users } = useSelector(
    (state) => state.users.getUsers
  );

  const [searchVal, setSearchVal] = useState("");
  const [usersData, setUsersData] = useState(null);
  const [selectedType, setSelectedType] = useState("users");

  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 8;

  const [totalItems, setTotalItems] = useState(null);
  const lastItemIndex = pageNumber * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = usersData?.slice(firstItemIndex, lastItemIndex);

  const filter = (type) => {
    setSelectedType(type);
  };

  const handleSearch = (word) => {
    setSearchVal(word);
    if (!word) {
      setUsersData(users.Data);
      return;
    }
  };

  const handlePageChange = (number) => {
    dispatch(getUsers({ pageNumber: number, pageSize: itemsPerPage }));
  };

  useEffect(() => {
    if (!usersData) {
      dispatch(getUsers({ pageNumber, pageSize: itemsPerPage }));
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
    }

    if (success) {
      toast.dismiss();
      setUsersData(users.Data);
      setTotalItems(users.TotalCount);
    }
    dispatch(resetGetUsersState());
  }, [loading, success, error, users]);

  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-24 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h2>Customers</h2>
      </div>

      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-center mb-6 flex-wrap gap-2">
        <div className="flex items-center w-full max-w-sm max-sm:order-2">
          <CustomInput
            onChange={handleSearch}
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

        <div className="flex gap-2 max-sm:order-1">
          <button
            className={`h-11 px-3 rounded-md text-sm font-normal border-solid border-[--primary-2] ${
              selectedType === "users"
                ? "bg-[--primary-2] text-[--white-1]"
                : "text-[--primary-2] border-[1.5px]"
            }`}
            onClick={() => filter("users")}
          >
            Customers
          </button>
          <button
            className={`h-11 px-3 rounded-md text-sm font-normal border-solid border-[--primary-2] ${
              selectedType === "dealers"
                ? "bg-[--primary-2] text-[--white-1]"
                : "text-[--primary-2] border-[1.5px]"
            }`}
            onClick={() => filter("dealers")}
          >
            Sellers
          </button>
          <button className="text-[--primary-2] h-11 px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]">
            Filter
          </button>
          <button className="text-[--primary-2] h-11 px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]">
            Add user
          </button>
        </div>
      </div>

      {/* TABLE */}
      {usersData ? (
        <div className="border border-solid border-[--light-4] rounded-lg max-xl:overflow-x-scroll">
          <table className="w-full text-sm font-light min-w-[60rem]">
            <thead>
              <tr className="bg-[--light-3] h-8 text-left">
                <th className="first:pl-4 font-normal">Ad</th>
                <th className="irst:pl-4 font-normal">Soyad</th>
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
                  key={data.Id}
                  className="odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 last:border-b-0"
                >
                  <td className="whitespace-nowrap text-[--black-2] pl-4 font-light first:font-normal">
                    {data.FirstName}
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    {data.LastName}
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    {data.PhoneNumber}
                    <br />
                    <span className="text-xs font-light text-[--gr-1]">
                      {data.Email}
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    {data.City}
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    <span
                      className={`text-xs font-normal ${
                        data.IsActive
                          ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
                          : "text-[--red-1] bg-[--status-red] border-[--red-1]"
                      } px-3 py-1 border border-solid rounded-full`}
                    >
                      ● {data.IsActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-center text-[--black-2] font-light first:font-normal">
                    <span
                      className={`text-xs font-normal ${
                        data.IsVerify
                          ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
                          : "text-[--black-1] bg-[--light-4]"
                      } px-3 py-1 border border-solid rounded-full`}
                    >
                      {data.IsVerify ? "Onaylı" : "Onlaylanmadı"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                    {formatDateString(data.CreatedDateTime)}
                  </td>
                  <td className="whitespace-nowrap text-center text-[--black-2] font-light first:font-normal">
                    <MenuI className="w-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <TableSkeleton />
      )}

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

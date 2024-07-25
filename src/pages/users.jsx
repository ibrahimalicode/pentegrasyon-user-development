import CustomInput from "../components/common/CustomInput";
import { useEffect, useState } from "react";
import MenuI from "../assets/icon/menu";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, resetGetUsersState } from "../redux/users/getUsersSlice";
import toast from "react-hot-toast";
import { formatDateString } from "../utils/utils";
import { users } from "../data/users";
import CustomPagination from "../components/common/pagination";

const Users = () => {
  const dispatch = useDispatch();
  //const { loading, success, error, users } = useSelector(
  //  (state) => state.users.getUsers
  //);

  const [searchVal, setSearchVal] = useState("");
  const [usersData, setUsersData] = useState(null);
  const [selectedType, setSelectedType] = useState("users");

  useEffect(() => {
    //dispatch(getUsers());
    setUsersData(formatUsers(users));
  }, []);

  /* 
  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.loading("Loading..");
    } else if (error) {
      toast.dismiss();
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } else if (success) {
      toast.dismiss();
      toast.success("Success");
      setUsersData(formatUsers(users));
    }
    dispatch(resetGetUsersState());
  }, [loading, success, error, users]); 
  */

  const formatUsers = (data) => {
    if (selectedType === "dealers") {
      return data.filter((item) => item.IsDealer);
    } else {
      return data.filter((item) => !item.IsDealer);
    }
  };

  const filter = (type) => {
    setSelectedType(type);
    if (type === "dealers") {
      const data = users.filter((item) => item.IsDealer);
      return setUsersData(data);
    } else {
      const data = users.filter((item) => !item.IsDealer);
      return setUsersData(data);
    }
  };

  const handleSearch = (word) => {
    setSearchVal(word);
    if (!word) {
      setUsersData(formatUsers(users));
      return;
    }
    const data = users.filter((user) => {
      return Object.values(user).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(word.toLowerCase());
        }
        return false;
      });
    });
    setUsersData(data);
  };

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
              <tr className="bg-[--light-3] h-8">
                <th className="first:pl-4 font-normal first:text-left text-center">
                  Ad Soyad
                </th>
                <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                  Rol
                </th>
                <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                  iletişim
                </th>
                <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                  Il
                </th>
                <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                  Durum
                </th>
                <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                  Onaylı
                </th>
                <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                  Kayıt Tarihi
                </th>
                <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                  İşlem
                </th>
              </tr>
            </thead>

            <tbody>
              {usersData.map((data, index) => (
                <tr
                  key={data.Id}
                  className="odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 last:border-b-0"
                >
                  <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                    {data.FirstName} {data.LastName}
                  </td>
                  <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                    {data.IsDealer ? "Bayi" : "Müşteri"}
                  </td>
                  <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                    {data.PhoneNumber}
                    <p className="text-xs font-light text-[--gr-1]">
                      {data.Email}
                    </p>
                  </td>
                  <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                    {data.City}
                  </td>
                  <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
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
                  <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
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
                  <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                    {formatDateString(data.CreatedDateTime)}
                  </td>
                  <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                    <MenuI className="w-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <div className="w-full self-end flex justify-center pt-4">
        <CustomPagination />
      </div>
    </section>
  );
};

export default Users;

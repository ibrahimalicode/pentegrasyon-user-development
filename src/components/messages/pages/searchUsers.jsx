import { useDispatch } from "react-redux";
import CustomInput from "../../common/customInput";
import CloseI from "../../../assets/icon/close";
import { useState } from "react";
import { getUsers } from "../../../redux/users/getUsersSlice";

const SearchUsers = () => {
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (!searchVal) {
      return;
    }
    dispatch(getUsers({ searchKey: searchVal }));
  }

  return (
    <div className="w-full max-w-lg">
      <form className="w-full" onSubmit={(e) => handleSearch(e)}>
        <CustomInput
          onChange={(e) => setSearchVal(e)}
          value={searchVal}
          placeholder="Search..."
          className2="sm:mt-[0px] mt-[0px]  w-full"
          className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
          icon={<CloseI className="w-4 text-[--red-1]" />}
          className4={`hover:bg-[--light-4] rounded-full px-2 py-1 ${
            searchVal ? "block" : "hidden"
          }`}
          iconClick={() => setSearchVal("")}
        />
      </form>
    </div>
  );
};

export default SearchUsers;

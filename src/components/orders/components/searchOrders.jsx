import { useState } from "react";
import CustomInput from "../../common/customInput";
import { CloseI } from "../../../assets/icon";

const SearchOrders = () => {
  const [searchVal, setSearchVal] = useState("");

  function clearSearch() {}

  return (
    <div className="flex items-center w-full max-w-80">
      <form className="w-full" onSubmit={() => {}}>
        <CustomInput
          onChange={(e) => {
            setSearchVal(e);
            !e && clearSearch();
          }}
          value={searchVal}
          placeholder="Ara...Onay kodu veya Müşteri Adı"
          className2="mt-[0px] w-full"
          className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none text-sm"
          icon={<CloseI className="w-4 text-[--red-1]" />}
          className4={`top-[20px] right-2 hover:bg-[--light-4] rounded-full px-2 py-1 ${
            searchVal ? "block" : "hidden"
          }`}
          iconClick={clearSearch}
        />
      </form>
    </div>
  );
};

export default SearchOrders;

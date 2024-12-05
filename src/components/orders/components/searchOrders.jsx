//MODULES
import { useState } from "react";
import { useDispatch } from "react-redux";

//COMP
import { CloseI } from "../../../assets/icon";
import CustomInput from "../../common/customInput";

//CONTEXT
import { useOrdersContext } from "../../../context/OrdersContext";

//REDUX
import { getOrders } from "../../../redux/orders/getOrdersSlice";

const SearchOrders = () => {
  const dispatch = useDispatch();
  const { itemsPerPage, pageNumber, setPageNumber } = useOrdersContext();

  const [searchVal, setSearchVal] = useState("");

  function clearSearch() {
    setSearchVal("");
    dispatch(getOrders({ pageNumber, pageSize: itemsPerPage.value }));
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!searchVal) return;
    dispatch(
      getOrders({
        pageNumber: 1,
        searchKey: searchVal,
        pageSize: itemsPerPage.value,
      })
    );
    setPageNumber(1);
  }

  return (
    <div className="flex items-center w-full max-w-80">
      <form className="w-full" onSubmit={handleSearch}>
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

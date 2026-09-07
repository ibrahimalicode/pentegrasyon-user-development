//MODULES
import { useState } from "react";
import { useDispatch } from "react-redux";

//COMP
import { CloseI } from "../../../assets/icon";
import { formatDate } from "../../../utils/utils";
import CustomInput from "../../common/customInput";

//CONTEXT
import { useOrdersContext } from "../../../context/OrdersContext";

//REDUX
import { getOrders } from "../../../redux/orders/getOrdersSlice";

const SearchOrders = () => {
  const dispatch = useDispatch();
  const {
    itemsPerPage,
    pageNumber,
    setPageNumber,
    filter,
    searchVal,
    setSearchVal,
  } = useOrdersContext();

  const filterData = {
    dateRange: filter.dateRange,
    startDateTime: filter.endDateTime ? formatDate(filter.startDateTime) : null,
    endDateTime: filter.endDateTime ? formatDate(filter.endDateTime) : null,
    status: filter.statusId,
    marketplaceId: filter.marketplaceId,
  };

  function clearSearch() {
    setSearchVal("");
    dispatch(
      getOrders({ pageNumber, pageSize: itemsPerPage.value, ...filterData })
    );
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!searchVal) return;
    dispatch(
      getOrders({
        pageNumber: 1,
        searchKey: searchVal,
        pageSize: itemsPerPage.value,
        ...filterData,
      })
    );
    setPageNumber(1);
  }

  return (
    // Full width on a phone (it gets its own line), then an inline toolbar
    // control that absorbs the slack up to a readable cap on wider screens.
    <div className="flex items-center w-full sm:w-auto sm:flex-1 sm:min-w-56 sm:max-w-80">
      <form className="w-full" onSubmit={handleSearch}>
        <CustomInput
          onChange={(e) => {
            setSearchVal(e);
            !e && clearSearch();
          }}
          value={searchVal}
          placeholder="Ara...Onay kodu veya Müşteri Adı"
          // sm:mt-0 too: CustomInput reserves a top margin for a form label,
          // which made the search 64px tall next to 44px toolbar controls.
          className2="mt-0 sm:mt-0 w-full"
          className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none text-sm"
          icon={<CloseI className="w-4 text-[--red-1]" />}
          className4={`top-[20px] right-2 hover:bg-[--light-4] rounded-[20px] px-2 py-1 ${
            searchVal ? "block" : "hidden"
          }`}
          iconClick={clearSearch}
        />
      </form>
    </div>
  );
};

export default SearchOrders;

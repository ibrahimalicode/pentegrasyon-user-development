import { useEffect, useRef, useState } from "react";
import { usePopup } from "../../../context/PopupContext";
import CustomSelect from "../../common/customSelector";
import { useDispatch } from "react-redux";
import { getOrders } from "../../../redux/orders/getOrdersSlice";
import { useOrdersContext } from "../../../context/OrdersContext";
import CustomDatePicker from "../../common/customdatePicker";
import MarketPalceIds from "../../../enums/marketPlaceIds";
import { formatDate } from "../../../utils/utils";
import { isEqual } from "lodash";

const FilterOrders = () => {
  const dispatch = useDispatch();
  const filterOrdersRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const { itemsPerPage, pageNumber } = useOrdersContext();

  const filterInitialState = {
    startDateTime: "",
    endDateTime: "",
    statusId: null,
    status: { label: "Hepsi", value: null },
    marketplaceId: null,
    marketplace: { value: null, label: "Hepsi", id: null },
  };
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState(filterInitialState);

  function handleFilter(bool) {
    if (bool) {
      console.log({
        page: pageNumber,
        pageSize: itemsPerPage.value,
        startDateTime: formatDate(filter.startDateTime),
        endDateTime: formatDate(filter.endDateTime),
        status: filter.statusId,
        marketplaceId: filter.marketplaceId,
      });

      dispatch(
        getOrders({
          page: pageNumber,
          pageSize: itemsPerPage.value,
          startDateTime: formatDate(filter.startDateTime),
          endDateTime: formatDate(filter.endDateTime),
          status: filter.statusId,
          marketplaceId: filter.marketplaceId,
        })
      );
    } else {
      if (!isEqual(filterInitialState, filter)) {
        setFilter(filterInitialState);
        dispatch(getOrders({ pageNumber, pageSize: itemsPerPage.value }));
      }
    }
    setOpenFilter(false);
  }

  //HIDE POPUP
  useEffect(() => {
    if (filterOrdersRef) {
      const refs = contentRef.filter((ref) => ref.id !== "ordersFilter");
      setContentRef([
        ...refs,
        {
          id: "ordersFilter",
          outRef: null,
          ref: filterOrdersRef,
          callback: () => setOpenFilter(false),
        },
      ]);
    }
  }, [filterOrdersRef]);

  return (
    <div className="flex justify-end">
      <div className="flex gap-2">
        <div className="w-full relative" ref={filterOrdersRef}>
          <button
            className="w-full h-11 flex items-center justify-center text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
            onClick={() => setOpenFilter(!openFilter)}
          >
            Filtre
          </button>

          <div
            className={`absolute right-0 top-12 px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] border border-solid border-[--light-3] rounded-lg drop-shadow-md -drop-shadow-md z-[999] min-w-max ${
              openFilter ? "visible" : "hidden"
            }`}
          >
            <div className="flex gap-6">
              <div>
                <CustomDatePicker
                  label="Başlangıç Tarihi"
                  className="text-sm sm:mt-1 w-36 py-2"
                  style={{ padding: "0 !important" }}
                  popperClassName="react-datepicker-popper-filter-order-1"
                  value={filter.startDateTime}
                  onChange={(selectedDate) => {
                    setFilter((prev) => {
                      return {
                        ...prev,
                        startDateTime: selectedDate,
                      };
                    });
                  }}
                />
                <style>
                  {`
                  .react-datepicker-popper-filter-order-1 {
                    right: -2rem
                  }
                `}
                </style>
              </div>

              <div>
                <CustomDatePicker
                  label="Bitiş Tarihi"
                  className="text-sm sm:mt-1 w-36 py-2"
                  style={{ padding: "0 !important" }}
                  popperClassName="react-datepicker-popper-filter-order-2"
                  value={filter.endDateTime}
                  onChange={(selectedDate) => {
                    setFilter((prev) => {
                      return {
                        ...prev,
                        endDateTime: selectedDate,
                      };
                    });
                  }}
                />
                <style>
                  {`
                  .react-datepicker-popper-filter-order-2 {
                    right: -22rem
                  }
                `}
                </style>
              </div>
            </div>

            <div className="flex gap-6">
              <CustomSelect
                label="Durum"
                className="text-sm sm:mt-1"
                className2="sm:mt-3"
                style={{ padding: "0 !important" }}
                options={[
                  { label: "Hepsi", value: null },
                  { label: "Bekliyor", value: 0 },
                  { label: "Onaylandı", value: 1 },
                  { label: "Yola Çıktı", value: 2 },
                  { label: "Teslim Edildi", value: 3 },
                  { label: "İptal Edildi", value: 4 },
                ]}
                value={filter.status}
                onChange={(selectedOption) => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      statusId: selectedOption.value,
                      status: selectedOption,
                    };
                  });
                }}
              />
              <CustomSelect
                label="Pazaryeri"
                className="text-sm sm:mt-1"
                className2="sm:mt-3"
                style={{ padding: "0 !important" }}
                options={[
                  { value: null, label: "Hepsi", id: null },
                  ...MarketPalceIds,
                ]}
                value={filter.marketplace}
                onChange={(selectedOption) => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      marketplaceId: selectedOption.id,
                      marketplace: selectedOption,
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
                Filtre
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOrders;

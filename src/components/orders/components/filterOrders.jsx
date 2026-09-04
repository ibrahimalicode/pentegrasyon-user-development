//MODULES
import { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

//UTILS
import { formatDate } from "../../../utils/utils";
import MarketPalceIds from "../../../enums/marketPlaceIds";
import orderFilterDates from "../../../enums/orderFilterDates";

//COMP
import CustomSelect from "../../common/customSelector";
import { cn } from "../../../lib/utils";
import { TOOLBAR_BTN } from "../../common/toolbarStyles";
import CustomDatePicker from "../../common/customdatePicker";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";
import { useOrdersContext } from "../../../context/OrdersContext";

//REDUX
import { getOrders } from "../../../redux/orders/getOrdersSlice";

const FilterOrders = ({ licenses }) => {
  const dispatch = useDispatch();
  const filterOrdersRef = useRef();
  const { registerClickOutside } = usePopup();
  const {
    itemsPerPage,
    setPageNumber,
    filter,
    setFilter,
    filterInitialState,
    searchVal,
  } = useOrdersContext();

  const [openFilter, setOpenFilter] = useState(false);
  const [panelStyle, setPanelStyle] = useState(null);
  const uniqueAndActiveLicenses = [
    ...new Set(licenses?.filter((L) => L.isActive).map((L) => L.licenseTypeId)),
  ];
  const filteredMarketplaces = MarketPalceIds.filter((M) =>
    uniqueAndActiveLicenses.includes(M.id)
  );

  // The toolbar wraps, so the Filtre button can land anywhere; a panel
  // pinned to one viewport corner ends up far from it. Measure the button
  // on open and drop the panel right under it, clamped so it never runs
  // off either edge. Below sm the panel is a full-width sheet via classes,
  // so no inline position there.
  function toggleFilter() {
    if (!openFilter && window.matchMedia("(min-width: 640px)").matches) {
      const rect = filterOrdersRef.current?.getBoundingClientRect();
      if (rect) {
        const panelWidth = 22 * 16; // w-[22rem]
        const left = Math.max(
          8,
          Math.min(rect.left, window.innerWidth - panelWidth - 8)
        );
        setPanelStyle({ left, top: rect.bottom + 8 });
      }
    } else if (!openFilter) {
      setPanelStyle(null);
    }
    setOpenFilter(!openFilter);
  }

  function handleFilter(bool) {
    if (bool) {
      const filterData = {
        page: 1,
        searchKey: searchVal,
        pageSize: itemsPerPage.value,
        dateRange: filter.dateRange,
        startDateTime: filter.endDateTime
          ? formatDate(filter.startDateTime)
          : null,
        endDateTime: filter.endDateTime ? formatDate(filter.endDateTime) : null,
        status: filter.statusId,
        marketplaceId: filter.marketplaceId,
      };
      dispatch(getOrders(filterData));
    } else {
      if (!isEqual(filterInitialState, filter)) {
        setFilter(filterInitialState);
        dispatch(getOrders({ page: 1, pageSize: itemsPerPage.value }));
      }
    }
    setPageNumber(1);
    setOpenFilter(false);
  }

  //HIDE FILTER
  useEffect(() => {
    if (filterOrdersRef) {
      registerClickOutside("ordersFilter", {
        ref: filterOrdersRef,
        outRef: null,
        callback: () => setOpenFilter(false),
      });
    }
  }, [filterOrdersRef]);

  return (
    <div className="flex justify-end">
      <div className="flex gap-2">
        <div className="w-full relative" ref={filterOrdersRef}>
          <button className={cn(TOOLBAR_BTN, "w-full")} onClick={toggleFilter}>
            Filtre
          </button>

          <div
            // Fixed (not absolute) so no ancestor overflow can crop it;
            // sm+ gets the measured under-the-button position from
            // panelStyle, below sm the classes make it a near-full-width
            // sheet. max-h + scroll keeps Uygula reachable on short screens.
            style={panelStyle || undefined}
            className={`fixed top-24 max-sm:inset-x-4 max-sm:w-auto max-h-[calc(100dvh-7rem)] overflow-y-auto px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] max-w-[calc(100vw-2rem)] border border-solid border-[--border-1] rounded-lg shadow-dropdown z-[999] ${
              openFilter ? "visible" : "hidden"
            }`}
          >
            <div className="grid grid-flow-row grid-cols-2 gap-1.5 my-2">
              {orderFilterDates
                .filter((D) => D.show)
                .map((D) => (
                  <div key={D.id} className="text-sm">
                    <button
                      onClick={() => {
                        setFilter((prev) => {
                          return {
                            ...prev,
                            dateRange: D.id,
                            startDateTime: "",
                            endDateTime: "",
                          };
                        });
                      }}
                      className={`p-2 border border-[--border-1] text-[--gr-1] rounded-md w-full text-center ${
                        D.id === filter.dateRange &&
                        "text-white bg-[--primary-1]"
                      }`}
                    >
                      {D.label}
                    </button>
                  </div>
                ))}
            </div>

            {/* 
            <div className="flex gap-6">
              <div>
                <CustomDatePicker
                  label="Başlangıç Tarihi"
                  className="text-sm sm:mt-1 w-36 py-2 sm:py-[0.5rem]"
                  style={{ padding: "0 !important" }}
                  popperClassName="react-datepicker-popper-filter-order-1"
                  value={filter.startDateTime}
                  onChange={(selectedDate) => {
                    setFilter((prev) => {
                      return {
                        ...prev,
                        dateRange: 0,
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
                  className="text-sm sm:mt-1 w-36 py-2 sm:py-[0.5rem]"
                  style={{ padding: "0 !important" }}
                  popperClassName="react-datepicker-popper-filter-order-2"
                  value={filter.endDateTime}
                  onChange={(selectedDate) => {
                    setFilter((prev) => {
                      return {
                        ...prev,
                        dateRange: 0,
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
            */}

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
                  ...filteredMarketplaces,
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
                className="text-white bg-[--red-1] py-2 px-12 rounded-lg hover:opacity-90"
                onClick={() => handleFilter(false)}
              >
                Temizle
              </button>
              <button
                className="text-white bg-[--primary-1] py-2 px-12 rounded-lg hover:opacity-90"
                onClick={() => handleFilter(true)}
              >
                Uygula
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOrders;

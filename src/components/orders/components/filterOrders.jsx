import { useEffect, useRef, useState } from "react";
import { usePopup } from "../../../context/PopupContext";
import CustomSelect from "../../common/customSelector";
import { useDispatch } from "react-redux";
import { getOrders } from "../../../redux/orders/getOrdersSlice";

const FilterOrders = ({ pageNumber, itemsPerPage }) => {
  const dispatch = useDispatch();
  const filterOrdersRef = useRef();
  const { contentRef, setContentRef } = usePopup();

  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState({
    date: null,
    startDateTime: "",
    endDateTime: "",
    status: "",
    marketplaceId: null,
  });

  function handleFilter(bool) {
    if (bool) {
      dispatch(
        getOrders({
          page: pageNumber,
          pageSize: itemsPerPage,
          startDateTime: filter.startDateTime,
          endDateTime: filter.endDateTime,
          status: filter.status,
          marketplaceId: filter.marketplaceId,
        })
      );
    }
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
            className={`absolute right-0 top-12 px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] border border-solid border-[--light-3] rounded-lg drop-shadow-md -drop-shadow-md z-[999] ${
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
                  { label: "Hepsi", value: null, id: null },
                  { label: "Pending", value: true, id: 0 },
                  { label: "Onaylamış", value: true, id: 1 },
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
                label="pazaryeri"
                className="text-sm sm:mt-1"
                className2="sm:mt-3"
                style={{ padding: "0 !important" }}
                options={[
                  { label: "Hepsi", value: null, id: null },
                  { label: "Pending", value: true, id: 0 },
                  { label: "Onaylamış", value: true, id: 1 },
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

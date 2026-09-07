//MODULES
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CouriersTable from "../couriersTable";
import AddCourier from "../actions/addCourier";
import CloseI from "../../../assets/icon/close";
import { CourierI } from "../../../assets/icon";
import NoTableData from "../../common/noTableData";
import CustomInput from "../../common/customInput";
import TableSkeleton from "../../common/tableSkeleton";
import CustomPagination from "../../common/pagination";
import CustomSelect from "../../common/customSelector";

//CONT
import { usePopup } from "../../../context/PopupContext";
import { useFirestore } from "../../../context/FirestoreContext";
import { TOOLBAR_BTN } from "../../../components/common/toolbarStyles";

// REDUX
import {
  getCouriers,
  resetGetCouriersState,
} from "../../../redux/couriers/getCouriersSlice";

const CouriersPage = () => {
  const dispatch = useDispatch();
  const filterCouriers = useRef();
  const { courierStatus } = useFirestore();
  const { registerClickOutside } = usePopup();

  const { loading, success, error, couriers } = useSelector(
    (state) => state.couriers.get
  );

  const [searchVal, setSearchVal] = useState("");
  const [filter, setFilter] = useState({
    online: null,
    active: null,
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [couriersData, setCouriersData] = useState(null);

  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  //HANDLE GET COURIERS
  function handleGetCouriers(number, searchVal) {
    dispatch(
      getCouriers({
        pageNumber: number || pageNumber,
        pageSize: itemsPerPage,
        [searchVal ? "searchKey" : ""]: searchVal || null,
        online: filter?.online?.value,
        active: filter?.active?.value,
      })
    );
  }

  function handleFilter(bool) {
    if (bool) {
      setOpenFilter(false);
      setPageNumber(1);
      handleGetCouriers(1);
    } else {
      if (filter) {
        dispatch(
          getCouriers({
            pageNumber,
            pageSize: itemsPerPage,
          })
        );
      }
      setFilter({
        online: null,
        active: null,
      });
      setOpenFilter(false);
    }
  }

  function clearSearch() {
    setSearchVal("");
    handleGetCouriers();
  }

  // GET COURIERS
  useEffect(() => {
    if (!couriersData) {
      handleGetCouriers();
    }
  }, [couriersData]);

  // TOAST AND SET COURIERS
  useEffect(() => {
    if (error) dispatch(resetGetCouriersState());
    if (success) {
      setCouriersData(couriers.data);
      setTotalItems(couriers.totalCount);
      dispatch(resetGetCouriersState());
    }
  }, [success, error, couriers]);

  //FIREBASE
  useEffect(() => {
    if (!couriersData) return;
    if (!courierStatus) return;
    if (courierStatus.ticketId) return;

    const currentCourier = couriersData.find(
      (C) => C.id === courierStatus.courierId
    );
    const exsitingCouriers = couriersData.filter(
      (C) => C.id !== courierStatus.courierId
    );

    if (!currentCourier) return;

    setCouriersData([
      ...exsitingCouriers,
      {
        ...currentCourier,
        isOnline:
          courierStatus?.status?.toLowerCase() == "offline" ? false : true,
      },
    ]);
  }, [courierStatus]);

  //HIDE POPUP
  useEffect(() => {
    if (filterCouriers) {
      registerClickOutside("couriersFilter", {
        ref: filterCouriers,
        outRef: null,
        callback: () => setOpenFilter(false),
      });
    }
  }, [filterCouriers]);

  return (
    <section className="pt-20 sm:pt-[5.25rem] px-[4%] pb-4 flex flex-col min-h-dvh bg-[--white-1]">
      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2">
        <div className="flex items-center w-full max-w-sm max-sm:order-2">
          <form className="w-full" onSubmit={() => {}}>
            <CustomInput
              onChange={(e) => {
                setSearchVal(e);
                !e && clearSearch();
              }}
              value={searchVal}
              placeholder="Ara..."
              className2="mt-[0px] w-full"
              className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
              icon={<CloseI className="w-4 text-[--red-1]" />}
              className4={`top-[20px] right-2 hover:bg-[--light-4] rounded-lg px-2 py-1 ${
                searchVal ? "block" : "hidden"
              }`}
              iconClick={clearSearch}
            />
          </form>
        </div>

        <div className="max-sm:w-full flex justify-end">
          <div className="flex gap-2 max-sm:order-1 ">
            <div className="w-full relative" ref={filterCouriers}>
              <button
                className={TOOLBAR_BTN}
                onClick={() => setOpenFilter(!openFilter)}
              >
                Filtre
              </button>

              <div
                className={`absolute right-0 top-12 max-sm:fixed max-sm:inset-x-4 max-sm:top-24 max-sm:w-auto px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] max-w-[calc(100vw-2rem)] border border-solid border-[--border-1] rounded-lg shadow-dropdown z-40 ${
                  openFilter ? "visible" : "hidden"
                }`}
              >
                <div className="flex gap-6">
                  <CustomSelect
                    label="Teslimata"
                    className="text-sm sm:mt-1"
                    className2="sm:mt-3"
                    style={{ padding: "0 !important" }}
                    options={[
                      { value: null, label: "Hepsi" },
                      { label: "Uygun", value: true },
                      { label: "Uygun Değil", value: false },
                    ]}
                    value={
                      filter?.online
                        ? filter.online
                        : { value: null, label: "Hepsi" }
                    }
                    onChange={(selectedOption) => {
                      setFilter((prev) => {
                        return {
                          ...prev,
                          online: selectedOption,
                        };
                      });
                    }}
                  />

                  <CustomSelect
                    label="Durum"
                    style={{ padding: "1px 0px" }}
                    className="text-sm"
                    options={[
                      { value: null, label: "Hepsi" },
                      { value: true, label: "Aktif" },
                      { value: false, label: "Pasif" },
                    ]}
                    optionStyle={{ fontSize: ".8rem" }}
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
                    Uygula
                  </button>
                </div>
              </div>
            </div>
            <div>
              <AddCourier onSuccess={() => setCouriersData(null)} />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {couriersData?.length > 0 ? (
        <CouriersTable
          inData={couriersData}
          onSuccess={() => setCouriersData(null)}
        />
      ) : loading ? (
        <TableSkeleton />
      ) : (
        <NoTableData
          Icon={CourierI}
          title="Henüz kuryeniz yok"
          text="Siparişlerinizi teslimata atayabilmek için bir kurye ekleyin."
          action={<AddCourier onSuccess={() => setCouriersData(null)} />}
        />
      )}

      {/* PAGINATION */}
      {couriersData && typeof totalItems === "number" && (
        <div className="w-full mt-auto pt-4 text-[--black-2]">
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handlePageChange={handleGetCouriers}
          />
        </div>
      )}
    </section>
  );
};

export default CouriersPage;

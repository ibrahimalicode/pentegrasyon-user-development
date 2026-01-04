//MODELS
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import PaymentsTable from "../paymentsTable";
import CustomInput from "../../common/customInput";
import NoTableData from "../../common/noTableData";
import TableSkeleton from "../../common/tableSkeleton";
import CustomPagination from "../../common/pagination";

//UTILS
import { CloseI, PaymentI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";

//REDUX
import {
  getPayments,
  resetGetPayments,
} from "../../../redux/payments/getPaymentsSlice";

const PaymentsPage = () => {
  const dispatch = useDispatch();
  const filterPayments = useRef();
  const { contentRef, setContentRef } = usePopup();

  const { loading, success, error, payments } = useSelector(
    (state) => state.payments.get
  );

  const [searchVal, setSearchVal] = useState("");
  const [filter, setFilter] = useState({
    online: null,
    active: null,
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [paymentsData, setPaymentsData] = useState(null);

  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  // GET PAYMENTS HANDLER
  function getPaymentsHandler(number) {
    dispatch(
      getPayments({
        pageNumber: number || pageNumber,
        pageSize: itemsPerPage,
        [searchVal ? "searchKey" : null]: searchVal || null,
        online: filter?.online?.value,
        active: filter?.active?.value,
      })
    );
  }

  function handlePageChange(number) {
    if (number === pageNumber) return;
    getPaymentsHandler(number);
  }

  function handleFilter(bool) {
    if (bool) {
      setOpenFilter(false);
      setPageNumber(1);
      getPaymentsHandler(1);
    } else {
      if (filter) {
        dispatch(
          getPayments({
            pageNumber,
            pageSize: itemsPerPage,
            [searchVal ? "searchKey" : null]: searchVal || null,
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
    dispatch(
      getPayments({
        pageNumber,
        pageSize: itemsPerPage,
      })
    );
  }

  // GET PAYMENTS
  useEffect(() => {
    if (!paymentsData) {
      getPaymentsHandler();
    }
  }, [paymentsData]);

  // TOAST AND SET PAYMENTS
  useEffect(() => {
    if (error) dispatch(resetGetPayments());
    if (success) {
      setTotalItems(payments.totalCount);
      setPaymentsData(payments.data);
      dispatch(resetGetPayments());
    }
  }, [success, error, payments]);

  //HIDE POPUP
  useEffect(() => {
    if (filterPayments) {
      const refs = contentRef.filter((ref) => ref.id !== "paymentsFilter");
      setContentRef([
        ...refs,
        {
          id: "paymentsFilter",
          outRef: null,
          ref: filterPayments,
          callback: () => setOpenFilter(false),
        },
      ]);
    }
  }, [filterPayments]);

  return (
    <section className="lg:ml-[280px] pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h2>Ödemeler</h2>
      </div>

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
              className4={`top-[20px] right-2 hover:bg-[--light-4] rounded-full px-2 py-1 ${
                searchVal ? "block" : "hidden"
              }`}
              iconClick={clearSearch}
            />
          </form>
        </div>

        <div className="max-sm:w-full flex justify-end">
          <div className="flex gap-2 max-sm:order-1 ">
            <div className="w-full relative" ref={filterPayments}>
              <button
                className="w-full h-11 flex items-center justify-center text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
                onClick={() => setOpenFilter(!openFilter)}
              >
                Filtre
              </button>

              {/* <div
                className={`absolute right-[-60px] sm:right-0 top-12 px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] border border-solid border-[--light-3] rounded-lg drop-shadow-md -drop-shadow-md ${
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
              </div> */}
            </div>
            <div>
              {/* <AddCourier onSuccess={() => setPaymentsData(null)} /> */}
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {paymentsData?.length > 0 ? (
        <PaymentsTable inData={paymentsData} />
      ) : loading ? (
        <TableSkeleton />
      ) : (
        <NoTableData
          Icon={PaymentI}
          text="Henüz herhangi bir ödeme kaydınız yok."
        />
      )}

      {/* PAGINATION */}
      {paymentsData && typeof totalItems === "number" && (
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

export default PaymentsPage;

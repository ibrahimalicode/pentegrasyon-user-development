//MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import TableSkeleton from "../../common/tableSkeleton";

// REDUX
import {
  getCouriers,
  resetgetCouriersState,
} from "../../../redux/couriers/getCouriersSlice";
import CouriersTable from "../couriersTable";
import AddCourier from "../actions/addCourier";

const CouriersPage = () => {
  const dispatch = useDispatch();

  const { loading, success, error, couriers } = useSelector(
    (state) => state.couriers.get
  );

  const [searchVal, setSearchVal] = useState("");
  const [couriersData, setCouriersData] = useState(null);

  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  // GET COURIERS
  useEffect(() => {
    if (!couriersData) {
      dispatch(
        getCouriers({
          pageNumber,
          pageSize: itemsPerPage,
        })
      );
    }
  }, [couriersData]);

  // TOAST AND SET COURIERS
  useEffect(() => {
    if (error) dispatch(resetgetCouriersState());
    if (success) {
      setCouriersData(couriers);
      dispatch(resetgetCouriersState());
    }
  }, [success, error, couriers]);

  return (
    <section className="lg:ml-[280px] pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h2>Kuryeler</h2>
      </div>

      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2">
        <div className="flex items-center w-full max-w-sm max-sm:order-2">
          <form className="w-full" onSubmit={() => {}}>
            <CustomInput
              onChange={(e) => {
                setSearchVal(e);
                // !e && clearSearch();
              }}
              value={searchVal}
              placeholder="Search..."
              className2="mt-[0px] w-full"
              className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
              icon={<CloseI className="w-4 text-[--red-1]" />}
              className4={`top-[20px] right-2 hover:bg-[--light-4] rounded-full px-2 py-1 ${
                searchVal ? "block" : "hidden"
              }`}
              // iconClick={clearSearch}
            />
          </form>
        </div>

        <div className="max-sm:w-full flex justify-end">
          <div className="flex gap-2 max-sm:order-1 ">
            <div>
              <AddCourier onSuccess={() => setCouriersData(null)} />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {couriersData ? (
        <CouriersTable
          inData={couriersData}
          onSuccess={() => setCouriersData(null)}
        />
      ) : loading ? (
        <TableSkeleton />
      ) : null}
    </section>
  );
};

export default CouriersPage;

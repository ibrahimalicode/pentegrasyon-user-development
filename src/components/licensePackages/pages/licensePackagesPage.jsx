import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import CustomPagination from "../../common/pagination";
import TableSkeleton from "../../common/tableSkeleton";
import { usePopup } from "../../../context/PopupContext";
import LicensePackagesTable from "../licensePackagesTable";
import AddLicensePackage from "../addLicensePackage";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getLicensePackages,
  resetGetLicensePackages,
  resetGetLicensePackagesState,
} from "../../../redux/licensePackages/getLicensePackagesSlice";
import UpdateLicenseKDV from "../actions/editLicenseKDV";

const LicensePackagesPage = () => {
  const dispatch = useDispatch();

  const { loading, success, error, licensePackages } = useSelector(
    (state) => state.licensePackages.getLicensePackages
  );

  const [licensesPackagesData, setLicensesPackagesData] = useState(null);

  const itemsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [kdvData, setKdvData] = useState(null);

  function handlePageChange(number) {
    dispatch(getLicensePackages());
  }

  // GET LICENSE PACKAGES
  useEffect(() => {
    if (!licensesPackagesData) {
      dispatch(getLicensePackages());
    }
  }, [licensesPackagesData]);

  // TOAST AND SET PACKAGES
  useEffect(() => {
    if (error) {
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetLicensePackages());
    }

    if (success) {
      setLicensesPackagesData(licensePackages.data);
      setTotalItems(licensePackages.totalCount);
      dispatch(resetGetLicensePackagesState());
    }
  }, [loading, success, error, licensePackages]);

  //HIDE POPUP
  const { contentRef, setContentRef } = usePopup();
  const filterLicense = useRef();
  useEffect(() => {
    if (filterLicense) {
      const refs = contentRef.filter((ref) => ref.id !== "licensesFilter");
      setContentRef([
        ...refs,
        {
          id: "licensesFilter",
          outRef: null,
          ref: filterLicense,
          callback: () => {}, //setOpenFilter(false),
        },
      ]);
    }
  }, [filterLicense]);

  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h2>Lisanslar Paketler</h2>
      </div>

      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 pt-10 flex-wrap gap-2">
        <UpdateLicenseKDV kdvData={kdvData} setKdvData={setKdvData} />
        <AddLicensePackage onSuccess={() => setLicensesPackagesData(null)} />
      </div>

      {/* TABLE */}
      {licensesPackagesData ? (
        <LicensePackagesTable
          inData={licensesPackagesData}
          kdvData={kdvData}
          onSuccess={() => setLicensesPackagesData(null)}
        />
      ) : loading ? (
        <TableSkeleton />
      ) : null}

      {/* PAGINATION */}
      {licensesPackagesData && typeof totalItems === "number" && (
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

export default LicensePackagesPage;

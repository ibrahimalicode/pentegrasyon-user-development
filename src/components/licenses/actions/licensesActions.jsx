import { useEffect, useRef, useState } from "react";
import { usePopup } from "../../../context/PopupContext";
import MenuI from "../../../assets/icon/menu";
import DeleteLicense from "./deleteLicense";

const LicensesActions = ({
  index,
  licensePackage,
  itemsPerPage,
  onSuccess,
}) => {
  const licensePackagesMenuRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (licensePackagesMenuRef) {
      const refs = contentRef.filter(
        (ref) => ref.id !== "licensePackagesMenuRef"
      );
      setContentRef([
        ...refs,
        {
          id: "licensePackagesMenuRef",
          outRef: null,
          ref: licensePackagesMenuRef,
          callback: () => setOpenMenu(null),
        },
      ]);
    }
  }, [licensePackagesMenuRef, openMenu]);
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={handleClick}
        ref={licensePackagesMenuRef}
      >
        <MenuI
          className={`w-full ${openMenu === index && "text-[--primary-2]"}`}
        />
      </div>
      <div
        className={`absolute right-14 border-2 border-solid border-[--light-3] rounded-sm z-10 shadow-lg overflow-hidden ${
          index < itemsPerPage / 2 ? "top-5" : "bottom-5"
        } ${openMenu !== index && "invisible"}`}
      >
        <ul className="bg-[--white-1] text-[--gr-1] w-48">
          <DeleteLicense
            licensePackage={licensePackage}
            setOpenMenu={setOpenMenu}
          />
        </ul>
      </div>
    </>
  );
};

export default LicensesActions;

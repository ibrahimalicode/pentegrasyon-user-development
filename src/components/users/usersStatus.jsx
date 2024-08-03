import { useEffect, useRef, useState } from "react";
import { usePopup } from "../../context/PopupContext";

const ChangeUsersStatus = ({ index, isActive }) => {
  const usersStatusRef = useRef();
  const usersStatusOutRef = useRef();

  const { contentRef, setContentRef } = usePopup();
  const [open, setOpen] = useState(null);

  const handleOpen = () => {
    setOpen(open === index ? null : index);
  };

  const handleDeactivate = () => {
    console.log("handleDeactivate");
    setOpen(null);
  };

  const handleActivate = () => {
    console.log("handleActivate");
    setOpen(null);
  };

  useEffect(() => {
    if (usersStatusRef) {
      const refs = contentRef.filter((ref) => ref.id !== "usersStatus");
      setContentRef([
        ...refs,
        {
          id: "usersStatus",
          outRef: usersStatusOutRef.current ? usersStatusOutRef : null,
          ref: usersStatusRef,
          callback: () => setOpen(null),
        },
      ]);
    }
  }, [usersStatusRef, usersStatusOutRef, open]);

  return (
    <>
      <span
        className={`text-xs font-normal px-3 py-1 border border-solid rounded-full cursor-pointer ${
          isActive
            ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
            : "text-[--red-1] bg-[--status-red] border-[--red-1]"
        } `}
        onClick={handleOpen}
        ref={usersStatusRef}
      >
        ● {isActive ? "Aktif" : "Pasif"}
      </span>
      {open === index && (
        <span
          className="absolute top-10 left-0 flex flex-col bg-[--white-1]  p-2 z-10 rounded-full"
          ref={usersStatusOutRef}
        >
          {isActive ? (
            <span
              className="text-xs font-normal px-3 py-1 border border-solid rounded-full cursor-pointer text-[--red-1] bg-[--status-red] border-[--red-1]"
              onClick={handleDeactivate}
            >
              Pasifleştir
            </span>
          ) : (
            <span
              className="text-xs font-normal px-3 py-1 border border-solid rounded-full cursor-pointer text-[--green-1] bg-[--status-green] border-[--green-1]"
              onClick={handleActivate}
            >
              Actifleştir
            </span>
          )}
        </span>
      )}
    </>
  );
};

export default ChangeUsersStatus;

//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import CustomToggle from "../../common/customToggle";
import { cn } from "../../../lib/utils";
import { TOOLBAR_BTN } from "../../common/toolbarStyles";

//REDUX
import {
  resetUpdateTicketAutomationVariable,
  updateTicketAutomationVariable,
} from "../../../redux/orders/updateTicketAutomationVariableSlice";

const AutomaticApproval = ({ automationDatas, setAutomationDatas }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, error } = useSelector(
    (state) => state.orders.updateAutomationVars
  );

  function updateAutomaticApproval() {
    const updatedData = {
      automaticApproval: !automationDatas.automaticApproval,
    };
    dispatch(updateTicketAutomationVariable(updatedData)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setAutomationDatas({ ...automationDatas, ...updatedData });
        toast.dismiss(toastId.current);
        const style = automationDatas?.automaticApproval
          ? "text-[--red-1]"
          : "text-[--green-1]";

        const comp = (
          <div>
            Otomatik Onay{" "}
            {automationDatas?.automaticApproval ? (
              <span className={style}>Kapandı</span>
            ) : (
              <span className={style}>Açıldı</span>
            )}
          </div>
        );
        toast.success(comp, { id: "delivery/ontheway-time" });
        dispatch(resetUpdateTicketAutomationVariable());
        // setPopupContent(null);
      }
    });
  }

  //UPDATE
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...", {
        id: "delivery/ontheway-time-loading",
      });
    }
    if (error) {
      toast.dismiss(toastId.current);
      dispatch(resetUpdateTicketAutomationVariable());
    }
  }, [loading, error]);

  return (
    <div className="flex items-end">
      <button
        onClick={updateAutomaticApproval}
        className={cn(
          TOOLBAR_BTN,
          "pr-1",
          automationDatas?.automaticApproval
            ? "border-[--green-1] text-[--green-1] hover:border-[--green-1] hover:text-[--green-1]"
            : "text-[--gr-1]"
        )}
      >
        <span>Oto Onay </span>
        <CustomToggle
          className1="scale-[.7]"
          id="automatic-approval"
          checked={
            automationDatas?.automaticApproval
              ? automationDatas?.automaticApproval
              : false
          }
          onChange={() => {}}
        />
      </button>
    </div>
  );
};

export default AutomaticApproval;

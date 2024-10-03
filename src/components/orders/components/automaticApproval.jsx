//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import CustomToggle from "../../common/customToggle";

//REDUX
import {
  resetUpdateTicketAutomationVariable,
  updateTicketAutomationVariable,
} from "../../../redux/orders/updateTicketAutomationVariableSlice";
import {
  getAutomaticApprovalVariable,
  resetgetAutomaticApprovalVariable,
} from "../../../redux/orders/getAutomaticApprovalVariableSlice";

const AutomaticApproval = () => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { data, error: getError } = useSelector(
    (state) => state.orders.getAutoApprovalVar
  );
  const { loading, error } = useSelector(
    (state) => state.orders.updateAutomationVars
  );

  const [varData, setVarData] = useState(null);

  function updateAutomaticApproval() {
    const updatedData = { automaticApproval: !varData.automaticApproval };
    dispatch(updateTicketAutomationVariable(updatedData)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setVarData(updatedData);
        toast.dismiss(toastId.current);
        const style = varData?.automaticApproval
          ? "text-[--red-1]"
          : "text-[--green-1]";

        const comp = (
          <div>
            Otomatik Onay{" "}
            {varData?.automaticApproval ? (
              <span className={style}>Kapandı</span>
            ) : (
              <span className={style}>Açıldı</span>
            )}
          </div>
        );
        toast.success(comp, { id: "delivery/ontheway-time" });
        dispatch(resetUpdateTicketAutomationVariable());
        setPopupContent(null);
      }
    });
  }

  //GET DATA
  useEffect(() => {
    if (!varData) {
      dispatch(getAutomaticApprovalVariable());
    }
  }, [varData]);

  //TOAST AND SET DATA
  useEffect(() => {
    if (getError) dispatch(resetgetAutomaticApprovalVariable());

    if (data) {
      setVarData({ automaticApproval: data.data });
      dispatch(resetgetAutomaticApprovalVariable());
    }
  }, [data, getError]);

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
        className={`w-full flex items-center border text-sm py-1.5 pl-4 rounded-md whitespace-nowrap ${
          varData?.automaticApproval
            ? "border-[--green-1] text-[--green-1]"
            : "border-[--red-1] text-[--red-1]"
        }`}
      >
        <span>Otomatik Onay </span>
        <CustomToggle
          className1="scale-[.7]"
          id="automatic-approval"
          checked={
            varData?.automaticApproval ? varData?.automaticApproval : false
          }
          onChange={() => {}}
        />
      </button>
    </div>
  );
};

export default AutomaticApproval;

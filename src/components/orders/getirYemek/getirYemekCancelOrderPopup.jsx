//REDUX
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//REDUX
import {
  getTicketCancelOptions,
  resetGetTicketCancelOptions,
} from "../../../redux/getirYemek/getTicketCancelOptionsSlice";

//COMP
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import CustomSelect from "../../common/customSelector";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//UTILS
import { useGetirYemekOrderActions } from "./useGetirYemekOrderActions";

function GetirYemekCancelOrderPopup({ ticketId, setOrdersData }) {
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { error, options } = useSelector(
    (state) => state.getirYemek.ticketCancelOptions
  );

  const [optionsData, setOptionsData] = useState(null);
  const [selectedData, setSelectedData] = useState({ label: "Sebep Seç" });
  const [cancelOrderData, setCancelOrderData] = useState({
    cancelReasonId: selectedData.cancelReasonId,
    cancelNote: "",
    ticketId,
  });

  const { cancelOrder } = useGetirYemekOrderActions({
    setOrdersData,
    cancelOrderData,
  });

  useEffect(() => {
    if (!optionsData) {
      dispatch(getTicketCancelOptions({ ticketId }));
    }
  }, [optionsData]);

  useEffect(() => {
    if (error) {
      setOptionsData([]);
      dispatch(resetGetTicketCancelOptions());
    }
    if (options) {
      const formattedOptions = options.map((opt) => {
        return {
          label: opt.message,
          value: opt.id,
          cancelReasonId: opt.id,
        };
      });
      // console.log(formattedOptions);
      setOptionsData(formattedOptions);
      dispatch(resetGetTicketCancelOptions());
    }
  }, [options, error]);

  return (
    <main className="w-full  bg-[--white-1] p-5 rounded-md">
      <div className="flex justify-end">
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] border border-[--red-1] p-2 rounded-full"
        >
          <CloseI />
        </button>
      </div>
      <form onSubmit={cancelOrder}>
        <div>
          <CustomSelect
            required
            label="İptal Opsiyonları"
            value={selectedData}
            options={optionsData}
            onChange={(selectedOption) => {
              setSelectedData(selectedOption);
              setCancelOrderData((prev) => {
                return {
                  ...prev,
                  cancelReasonId: selectedOption.cancelReasonId,
                };
              });
            }}
          />
        </div>

        <div>
          <CustomInput
            label="İptal Notu"
            value={cancelOrderData.cancelNote}
            onChange={(e) =>
              setCancelOrderData((pre) => {
                return {
                  ...pre,
                  cancelNote: e,
                };
              })
            }
          />
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className={`text-[--red-1] bg-[--status-red] rounded-md border-[--red-1] py-2 px-1 sm:px-4 border disabled:cursor-not-allowed`}
          >
            İptal Et
          </button>
        </div>
      </form>
    </main>
  );
}

export default GetirYemekCancelOrderPopup;

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
import toast from "react-hot-toast";

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedData?.value) {
      toast.error("Lütfen  İptal Sebepini Seçiniz");
      return;
    }
    cancelOrder();
  }

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
    <main className="w-full bg-[--white-1] text-[--black-1] p-5 rounded-md">
      <div className="flex justify-end">
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] border border-[--red-1] p-2 rounded-full"
        >
          <CloseI />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl font-bold mb-5">
          İptal Opsiyonları Seç
        </h1>
        <div>
          <div className="flex gap-4 flex-wrap">
            {optionsData?.length &&
              optionsData.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => {
                    setSelectedData(opt);
                    setCancelOrderData((prev) => {
                      return {
                        ...prev,
                        cancelReasonId: opt.cancelReasonId,
                      };
                    });
                  }}
                  className={`border bg-[--light-4] py-2 px-3 rounded-sm text-leftm ${
                    opt.value == selectedData.value &&
                    "border-[--green-1] bg-[--light-green] text-[--green-1]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
          </div>
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

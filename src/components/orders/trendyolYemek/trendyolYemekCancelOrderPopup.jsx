//MODULES
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import { CloseI } from "../../../assets/icon";
import CustomInput from "../../common/customInput";

//REDUX
import { useTrendyolYemekOrderActions } from "./useTrendyolYemekOrderActions";
import {
  trendyolYemekGetTicketCancelOptions,
  resetTrendyolYemekGetTicketCancelOptions,
} from "../../../redux/trendyol/trendyolYemekGetTicketCancelOptionsSlice";

const TrendyolYemekCancelOrderPopup = ({ ticketId, order, setOrdersData }) => {
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { error, options } = useSelector(
    (state) => state.trendyol.getTicketCancelOptions,
  );

  const [optionsData, setOptionsData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [cancelOrderData, setCancelOrderData] = useState(null);

  const { cancelOrder } = useTrendyolYemekOrderActions({
    order,
    setOrdersData,
    cancelOrderData,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedData?.reason) {
      toast.error("Lütfen  İptal Sebepini Seçiniz");
      return;
    }

    cancelOrder();
  }

  useEffect(() => {
    if (!optionsData) {
      dispatch(trendyolYemekGetTicketCancelOptions({ ticketId }));
    }
  }, [optionsData]);

  useEffect(() => {
    if (error) {
      setOptionsData([]);
      dispatch(resetTrendyolYemekGetTicketCancelOptions());
    }
    if (options) {
      const formattedOptions = options.map((opt) => {
        return {
          reason: opt.id,
          message: opt.descriptionTR,
        };
      });
      console.log(formattedOptions);
      setOptionsData(formattedOptions);
      dispatch(resetTrendyolYemekGetTicketCancelOptions());
    }
  }, [options, error]);

  return (
    <main className="w-full bg-[--white-1] text-[--black-1] p-5 rounded-md max-h-[90dvh] overflow-y-auto">
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
          <div className="flex flex-col gap-4 max-h-[70dvh] overflow-y-auto">
            {optionsData?.length &&
              optionsData.map((opt) => (
                <button
                  type="button"
                  key={opt.reason}
                  onClick={() => {
                    setSelectedData(opt);
                    setCancelOrderData(() => {
                      return {
                        ticketId,
                        message: opt.message,
                        reason: opt.reason,
                        cancelNote: opt.message,
                      };
                    });
                  }}
                  className={`border bg-[--light-4] py-2 px-3 rounded-sm text-leftm ${
                    opt.reason == selectedData?.reason &&
                    "border-[--green-1] bg-[--light-green] text-[--green-1]"
                  }`}
                >
                  {opt.message}
                </button>
              ))}
          </div>
        </div>

        <div>
          <CustomInput
            label="İptal Notu"
            required
            value={cancelOrderData?.cancelNote || ""}
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
};

export default TrendyolYemekCancelOrderPopup;

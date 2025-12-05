//MODULES
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import ActionButton from "../../common/actionButton";
import CustomSelect from "../../common/customSelector";
import { CancelI, TrendUpI } from "../../../assets/icon";

//UTILS
import { formatSelectorData } from "../../../utils/utils";

//REDUX
import {
  getRestaurants,
  resetGetRestaurants,
} from "../../../redux/restaurants/getRestaurantsSlice";
import { _useStocks } from "../../../redux/stocks/useStocksSlice";

const UseStock = ({ stockData, onSuccess }) => {
  const { setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(
      <UseStockPopup stockData={stockData} onSuccess={onSuccess} />
    );
  };

  return (
    <ActionButton
      element={<TrendUpI className="w-5" strokeWidth="1.8" />}
      element2="Stoğu Kullan"
      onClick={handleClick}
    />
  );
};

export default UseStock;

//
///
function UseStockPopup({ stockData, onSuccess }) {
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();
  const { restaurants, loading } = useSelector(
    (state) => state.restaurants.getRestaurants
  );
  const { success: useStocksSuccess } = useSelector(
    (state) => state.stocks.useStocks
  );

  const [restaurantsData, setRestaurantsData] = useState(null);
  const [restaurantData, setRestaurantData] = useState({
    label: "Restoran Seç",
  });

  // GET RESTAURANTS
  useEffect(() => {
    if (!restaurants && !restaurantsData) {
      dispatch(getRestaurants({}));
    }
  }, [restaurants, restaurantsData]);

  //SET RESTAURANTS
  useEffect(() => {
    if (restaurants) {
      setRestaurantsData(formatSelectorData(restaurants.data, false));
      dispatch(resetGetRestaurants());
    }
  }, [restaurants]);

  //HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      _useStocks({
        licenseStockId: stockData.id,
        restaurantId: restaurantData.value,
      })
    );
  };

  //USE STOCKS TOAST
  useEffect(() => {
    if (useStocksSuccess) {
      setPopupContent(false);
      toast.success("Stoğunuz başarıyla kullanıldı.");
      if (onSuccess) onSuccess();
    }
  }, [useStocksSuccess]);

  return (
    <main>
      <div className="w-full pt-12 px-[4%] pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl">
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-0">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={() => setPopupContent(false)}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">Stoğu Kullan</h1>

          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <CustomSelect
                required={true}
                label={"Restoran seç"}
                className="text-sm mt-[0] sm:mt-[0]"
                className2="mt-[0] sm:mt-[0] max-w-2xl"
                value={restaurantData}
                disabled={!restaurantsData || loading}
                options={restaurantsData}
                onChange={(selectedOption) => {
                  setRestaurantData(selectedOption);
                }}
              />
            </div>

            <div className="flex w-full justify-end mt-10">
              <button
                type="submit"
                className="px-5 py-3 bg-[--primary-1] text-white rounded-md"
              >
                Stoğu Kullan
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

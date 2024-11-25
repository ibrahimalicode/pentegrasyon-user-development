import CloseI from "../../../assets/icon/close";
import { usePopup } from "../../../context/PopupContext";
import GetirYemekRestaurantsStatus from "../getirYemek/getirYemekRestaurantsStatus";
import YemekSepetiRestaurantsStatus from "../yemekSepeti/yemekSepetiRestaurantsStatus";

const RestaurantsStatusPopup = () => {
  const { setPopupContent } = usePopup();

  return (
    <main className="w-full bg-[--white-1] pb-[4%] pt-2 rounded-md">
      <div className="flex justify-end">
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] border border-[--red-1] p-1.5 mr-2 mb-2 rounded-full"
        >
          <CloseI />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <GetirYemekRestaurantsStatus />
        <YemekSepetiRestaurantsStatus />
        {/* <MigrosYemekRestaurantsStatus /> */}
      </div>
    </main>
  );
};

export default RestaurantsStatusPopup;

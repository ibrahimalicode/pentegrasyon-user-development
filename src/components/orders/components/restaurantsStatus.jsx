import CloseI from "../../../assets/icon/close";
import { usePopup } from "../../../context/PopupContext";
import GetirYemekRestaurantsStatus from "../getirYemek/getirYemekRestaurantsStatus";
import MigrosYemekRestaurantsStatus from "../migrosYemek/migrosYemekRestaurantsStatus";
import YemekSepetiRestaurantsStatus from "../yemekSepeti/yemekSepetiRestaurantsStatus";

const RestaurantsStatus = () => {
  const { setPopupContent } = usePopup();

  return (
    <div className="flex items-end">
      <button
        onClick={() => setPopupContent(<RestaurantsStatusPopup />)}
        className="w-full border border-[--primary-2] text-[--primary-2] text-sm py-2.5 px-4 rounded-md"
      >
        Restoran Durumları
      </button>
    </div>
  );
};

export default RestaurantsStatus;

function RestaurantsStatusPopup() {
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
}

//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { CloseI } from "../../../assets/icon";
import DeleteI from "../../../assets/icon/delete";
import { usePopup } from "../../../context/PopupContext";
import licenseTypeIds from "../../../enums/licenseTypeIds";

//REDUX
import {
  deleteRestaurantByMarketplaceRestaurantId,
  resetDeleteRestaurantByMarketplaceRestaurantId,
} from "../../../redux/marketplaceRestaurants/deleteRestaurantByMarketplaceRestaurantIdSlice";
import { useSlideBar } from "../../../context/SlideBarContext";

const DeleteIntegrationInfo = ({ restaurant, onSuccess }) => {
  const { setPopupContent } = usePopup();

  function handleClick() {
    const { marketplaceRestaurantId, marketplaceId: marketplace } = restaurant;
    setPopupContent(
      <DeleteIntegrationInfoPopup
        restaurant={restaurant}
        onSuccess={onSuccess}
        data={{ marketplaceRestaurantId, marketplace }}
      />
    );
  }
  return (
    <main className="flex justify-end items-center text-[--red-1]">
      <button onClick={handleClick}>
        <DeleteI strokeWidth={1.5} />
      </button>
    </main>
  );
};

export default DeleteIntegrationInfo;

function DeleteIntegrationInfoPopup({ data, restaurant, onSuccess }) {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();
  const { setSlideBarContent } = useSlideBar();
  const { loading, success, error } = useSelector(
    (state) => state.marketplaceRestaurants.deleteRestaurant
  );

  function handleDelete() {
    console.log(data);
    dispatch(deleteRestaurantByMarketplaceRestaurantId(data));
  }

  //TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    } else {
      toast.dismiss(toastId.current);
      dispatch(resetDeleteRestaurantByMarketplaceRestaurantId());
      if (success) {
        onSuccess();
        setPopupContent(null);
        setSlideBarContent(null);
        toast.success("Pazaryeri Restoranı Başarıyla Silindi.");
      }
    }
  }, [error, success, loading]);

  return (
    <main className="bg-[--white-1] rounded-md p-5">
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] w-max h-max border border-[--red-1] p-2 rounded-full"
        >
          <CloseI />
        </button>
      </div>
      <p>
        İşletme <span className="text-[--link-1]">{restaurant?.name}</span>{" "}
        {licenseTypeIds[restaurant?.marketplaceId]?.label} Pazaryeri restoranını
        silmek istediğinizden emin misiniz ?
      </p>

      <div className="flex justify-end mt-10 gap-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-8 py-1.5 bg-[--status-red] text-[--red-1] border border-[--red-1] rounded-md"
        >
          Sil
        </button>
        <button
          onClick={() => setPopupContent(null)}
          className="px-2.5 py-1.5 bg-[--status-green] text-[--green-1] border border-[--green-1] rounded-md"
        >
          Vazgeç
        </button>
      </div>
    </main>
  );
}

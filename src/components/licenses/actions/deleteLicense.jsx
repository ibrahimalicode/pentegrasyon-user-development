import { useDispatch, useSelector } from "react-redux";
import { usePopup } from "../../../context/PopupContext";
import { CancelI, DeleteI } from "../../../assets/icon";

// IMAGES
import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";
import CustomCheckbox from "../../common/customCheckbox";
import { useEffect, useRef, useState } from "react";
import Button from "../../common/button";
import toast from "react-hot-toast";

import {
  deleteLicense,
  resetDeleteLicense,
} from "../../../redux/licenses/deleteLicenseSlice";

const imageSRCs = [
  Getiryemek,
  MigrosYemek,
  TrendyolYemek,
  Yemeksepeti,
  GoFody,
  Siparisim,
];

const DeleteLicense = ({ licenseData, setOpenMenu, onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    setShowPopup(true);
    setPopupContent(
      <DeleteLicensePopup data={licenseData} onSuccess={onSuccess} />
    );
  };

  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left text-[--red-1] cursor-pointer"
      onClick={handlePopup}
    >
      <DeleteI className="w-[1.1rem]" />
      Sil
    </button>
  );
};

export default DeleteLicense;

const DeleteLicensePopup = ({ data, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.licenses.deleteLicense
  );
  const { setShowPopup, setPopupContent } = usePopup();

  const [checked, setChecked] = useState(false);

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  function handleDelete() {
    dispatch(deleteLicense({ licenseId: data.id }));
  }

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      toastId.current && toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR + "🙁");
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetDeleteLicense());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      toast.success("Lisans başarıyla silindi 🥳🥳");
      dispatch(resetDeleteLicense());
    }
  }, [loading, success, error]);

  return (
    <div className="flex flex-col items-center w-full text-base">
      <div className="flex flex-col w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] relative max-w-xl">
        <div className="absolute top-4 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-2xl font-bold">Lisansı sil</h1>
        <div className="flex justify-center gap-4 sm:gap-10 px-1 sm:px-14 mt-9 w-full text-center">
          <div className="w-max flex flex-col justify-center gap-3 items-center">
            <p className="">Pazaryeri</p>
            <img
              src={imageSRCs[data.marketplaceId]}
              alt="MarketPlacePhoto"
              className="w-32"
            />
          </div>

          <div className="flex flex-col justify-between">
            <p>Lisans Süresi </p>
            <p className="py-3 text-sm">{data.time} Yıllık</p>
          </div>

          <div className="flex flex-col justify-between">
            <p>Fiyat </p>
            <p className="py-3 text-sm">{data.price}</p>
          </div>
        </div>

        <div className="w-full flex justify-center mt-8 max-sm:px-3">
          <div className="w-max">
            <p className="text-[--red-1]">
              Lisansı silmek istediğinizden emin misiniz ?
            </p>

            <div className="flex justify-start gap-4 mt-4">
              <CustomCheckbox
                label="Eminim sil"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end pr-8">
          <Button
            text="Sil"
            className="px-7 bg-[--status-red] text-[--red-1] border-[--red-1] disabled:cursor-not-allowed"
            disabled={!checked}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

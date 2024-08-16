import { useDispatch, useSelector } from "react-redux";
import { CancelI, EditI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";
import ActionButton from "../../common/actionButton";
import CustomSelector from "../../common/customSelector";
import CustomInput from "../../common/customInput";
import { useEffect, useRef, useState } from "react";
import {
  resetUpdateLicensePackage,
  updateLicensePackage,
} from "../../../redux/licensePackages/updateLicensePackageSlice";
import toast from "react-hot-toast";
import MarketPalceIds from "../../../data/marketPlaceIds";
import isEqual from "lodash/isEqual";

const EditLicensePackage = ({ licensePackage, onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    setShowPopup(true);
    setPopupContent(
      <EditLicensePackagePopup data={licensePackage} onSuccess={onSuccess} />
    );
  };
  return (
    <ActionButton
      element={<EditI className="w-[1.1rem]" />}
      element2="Düzenle"
      onClick={handlePopup}
    />
  );
};

export default EditLicensePackage;

//
///
//// *****EditLicensePackagePopup****** ////
function EditLicensePackagePopup({ data, onSuccess }) {
  const dispatch = useDispatch();
  const toastId = useRef();
  const { setShowPopup, setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.licensePackages.updateLicensePackage
  );

  const [licensePackagesDataBefore, setLicensePackagesDataBefore] = useState({
    marketplaceId: { value: null, label: "Pazaryeri Seç", id: null },
    time: data.time,
    price: data.price,
    description: data.description,
  });
  const [licensePackagesData, setLicensePackagesData] = useState({
    marketplaceId: { value: null, label: "Pazaryeri Seç", id: null },
    time: data.time,
    price: data.price,
    description: data.description,
  });

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEqual(licensePackagesDataBefore, licensePackagesData)) {
      toast.error("Hiç bir değişiklik yapmadınız");
      return;
    }
    dispatch(
      updateLicensePackage({
        ...licensePackagesData,
        marketplaceId: licensePackagesData.marketplaceId.id,
        licensePackageId: data.id,
      })
    );
  };

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
      dispatch(resetUpdateLicensePackage());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      setShowPopup(false);
      setPopupContent(null);
      toast.success("Lisans paketi başarıyla düzenlendı 🥳🥳");
      dispatch(resetUpdateLicensePackage());
    }
  }, [loading, success, error]);

  // SET MARKETPLACES
  useEffect(() => {
    if (MarketPalceIds) {
      const marketplace = MarketPalceIds.filter(
        (place) => place.id === data.marketplaceId
      )[0];
      if (marketplace) {
        setLicensePackagesDataBefore((prev) => {
          return {
            ...prev,
            marketplaceId: marketplace,
          };
        });
        setLicensePackagesData((prev) => {
          return {
            ...prev,
            marketplaceId: marketplace,
          };
        });
      }
    }
  }, [MarketPalceIds]);

  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base overflow-visible relative">
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-2xl font-bold">
          Lisans Paketi EDüzenlekle
        </h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleSubmit}>
            <div className="flex max-sm:flex-col sm:gap-4">
              <CustomSelector
                label="Pazaryeri"
                required={true}
                value={licensePackagesData.marketplaceId}
                options={MarketPalceIds}
                onChange={(selectedOption) => {
                  setLicensePackagesData((prev) => {
                    return {
                      ...prev,
                      marketplaceId: selectedOption,
                    };
                  });
                }}
              />

              <CustomInput
                label="Yıl"
                placeholder="Yıl"
                required={true}
                type="number"
                value={licensePackagesData.time}
                onChange={(e) => {
                  setLicensePackagesData((prev) => {
                    return {
                      ...prev,
                      time: e,
                    };
                  });
                }}
              />
            </div>

            <div className="flex max-sm:flex-col sm:gap-4">
              <CustomInput
                label="Fiyat"
                placeholder="Fiyat"
                required={true}
                type="number"
                value={licensePackagesData.price}
                onChange={(e) => {
                  setLicensePackagesData((prev) => {
                    return {
                      ...prev,
                      price: e,
                    };
                  });
                }}
              />

              <CustomInput
                label="Açıklama"
                placeholder="Açıklama"
                type="text"
                value={licensePackagesData.description}
                onChange={(e) => {
                  setLicensePackagesData((prev) => {
                    return {
                      ...prev,
                      description: e,
                    };
                  });
                }}
              />
            </div>

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={false}
                className={`py-2 px-3 bg-[--primary-1] text-[--white-1] rounded-lg`}
                type="submit"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

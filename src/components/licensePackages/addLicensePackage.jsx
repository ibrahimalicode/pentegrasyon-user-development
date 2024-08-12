import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { usePopup } from "../../context/PopupContext";
import { CancelI } from "../../assets/icon";
import MarketPalceIds from "../../data/marketPlaceIds";
import CustomSelector from "../common/customSelector";
import CustomInput from "../common/customInput";
import Button from "../common/button";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  addLicensePackage,
  resetAddLicensePackage,
} from "../../redux/licensePackages/addLicensePackageSlice";

const AddLicensePackage = ({ onSuccess }) => {
  const params = useParams();
  const userId = params.id;
  const { setShowPopup, setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(
      <AddLicensePackagePopup onSuccess={onSuccess} userId={userId} />
    );
    setShowPopup(true);
  };

  return (
    <div className="max-sm:w-full w-max flex justify-end">
      <Button text="Lisans Ekle" onClick={handleClick} />
    </div>
  );
};

export default AddLicensePackage;

//
///
//// *****AddLicensePackagePopup****** ////
function AddLicensePackagePopup({ onSuccess }) {
  const dispatch = useDispatch();
  const toastId = useRef();

  const { setShowPopup, setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.licensePackages.addLicensePackage
  );

  const [licensePackagesData, setLicensePackagesData] = useState({
    marketplaceId: { value: null, label: "Pazaryeri Seç", id: null },
    time: "",
    price: "",
    description: "",
  });

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(licensePackagesData);
    dispatch(
      addLicensePackage({
        ...licensePackagesData,
        marketplaceId: licensePackagesData.marketplaceId.id,
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
      dispatch(resetAddLicensePackage());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      setShowPopup(false);
      setPopupContent(null);
      toast.success("Lisans paketi başarıyla eklendi 🥳🥳");
      dispatch(resetAddLicensePackage());
    }
  }, [loading, success, error]);

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

        <h1 className="self-center text-2xl font-bold">Lisans Paketi Ekle</h1>
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

//MODULES
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { CancelI } from "../../../../assets/icon";
import CustomInput from "../../../common/customInput";
import { usePopup } from "../../../../context/PopupContext";

//REDUX
import {
  addIntegrationInformation,
  resetAddIntegrationInformation,
} from "../../../../redux/informations/getirYemek/addIntegrationInformationSlice";
import {
  getIntegrationInformationByLicenseId,
  resetGetIntegrationInformationByLicenseId,
} from "../../../../redux/informations/getirYemek/getIntegrationInformationByLicenseIdSlice";

const GetirYemekLicenseSettings = ({ data, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();
  const { loading, success, error } = useSelector(
    (state) => state.integrationInfos.getirYemek.addIntegrationInfo
  );
  const {
    loading: getLoading,
    error: getError,
    infoData,
  } = useSelector(
    (state) => state.integrationInfos.getirYemek.getIntegrationInfo
  );

  const [licenseData, setLicenseData] = useState({
    restaurantSecretKey: data?.restaurantSecretKey || "",
    restaurantId: data.restaurantId,
    licenseId: data.id,
  });
  const [licenseDataBefore, setLicenseDataBefore] = useState({
    restaurantSecretKey: data?.restaurantSecretKey || "",
    restaurantId: data.restaurantId,
    licenseId: data.id,
  });

  const closeForm = () => {
    setPopupContent(null);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(licenseData, licenseDataBefore)) {
      toast.error("Herhangi bir değişiklik yapmadınız.");
      return;
    }
    dispatch(addIntegrationInformation(licenseData));
  }

  useEffect(() => {
    if (data?.isSettingsAdded) {
      dispatch(getIntegrationInformationByLicenseId(data.id));
    }
  }, [data?.isSettingsAdded]);

  // TOAST UPDATE
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      dispatch(resetAddIntegrationInformation());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      toast.success("Lisans ayarları başarıyla eklendi");
      dispatch(resetAddIntegrationInformation());
    }
  }, [loading, success, error]);

  // TOAST GET
  useEffect(() => {
    if (getError) {
      dispatch(resetGetIntegrationInformationByLicenseId());
    }
    if (infoData) {
      console.log(infoData);
      setLicenseData({
        ...licenseData,
        restaurantSecretKey: infoData.restaurantSecretKey,
      });
      setLicenseDataBefore({ ...licenseData, restaurantSecretKey: infoData });
      dispatch(resetGetIntegrationInformationByLicenseId());
    }
  }, [getLoading, infoData, getError]);

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

        <h1 className="self-center text-2xl font-bold">Lisans Ayarları</h1>

        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleSubmit}>
            <div className="flex max-sm:flex-col sm:gap-4">
              <CustomInput
                required
                label="Restauran Secret Key"
                placeholder="Restauran Secret Key"
                className="py-[.45rem] text-sm"
                value={licenseData.restaurantSecretKey}
                onChange={(e) => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      restaurantSecretKey: e,
                    };
                  });
                }}
                disabled={data?.isSettingsAdded || getLoading}
              />
            </div>

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={loading || getLoading || data.isSettingsAdded}
                className="text-sm w-20 py-2 px-3 bg-[--primary-1] text-[--white-1] rounded-md"
                type="submit"
              >
                {data.isSettingsAdded ? "Düzenle" : "Ekle"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetirYemekLicenseSettings;

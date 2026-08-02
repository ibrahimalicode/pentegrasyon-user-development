//MODULES
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { CancelI } from "../../../../assets/icon";
import { usePopup } from "../../../../context/PopupContext";
import licenseTypeIds from "../../../../enums/licenseTypeIds";

// Shared skeleton for the per-marketplace license settings popups.
// Everything marketplace-specific comes in through `config`:
//   stateKey            key under state.integrationInfos
//   actions             { add, resetAdd, update, resetUpdate, get, resetGet }
//   buildInitialData    (data) => initial licenseData
//   fillFromInfo        (infoData, prev) => licenseData after GET
//   parseError          (error) => string to toast, or undefined for silent
//   renderFields        ({ licenseData, setLicenseData, getLoading }) => JSX
//   submitDisabled      optional ({ addLoading, getLoading, data }) => bool
//   submitLabel         optional (data) => button label
//   beforeDispatch      optional (licenseData) => void, runs after the
//                       no-change guard and before the add/update dispatch
//   wide                optional, drop the max-w-xl constraint (Trendyol)
const MarketplaceSettingsForm = ({ data, onSuccess, config }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.integrationInfos[config.stateKey].addIntegrationInfo
  );

  const {
    loading: updateLoad,
    success: updateSucc,
    error: updateErr,
  } = useSelector(
    (state) => state.integrationInfos[config.stateKey].updateIntegrationInfo
  );

  const {
    loading: getLoading,
    error: getError,
    infoData,
  } = useSelector(
    (state) => state.integrationInfos[config.stateKey].getIntegrationInfo
  );

  const [licenseData, setLicenseData] = useState(() =>
    config.buildInitialData(data)
  );
  const [licenseDataBefore, setLicenseDataBefore] = useState(() =>
    config.buildInitialData(data)
  );

  const closeForm = () => {
    setPopupContent(null);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(licenseData, licenseDataBefore)) {
      toast.error("Herhangi bir değişiklik yapmadınız.");
      return;
    }
    if (config.beforeDispatch) config.beforeDispatch(licenseData);
    if (data.isSettingsAdded) {
      dispatch(config.actions.update(licenseData));
    } else {
      dispatch(config.actions.add(licenseData));
    }
  }

  useEffect(() => {
    if (data?.isSettingsAdded) {
      dispatch(config.actions.get(data.id));
    }
  }, [data?.isSettingsAdded]);

  // TOAST GET
  useEffect(() => {
    if (getError) {
      dispatch(config.actions.resetGet());
    }
    if (infoData) {
      const filled = config.fillFromInfo(infoData, licenseData);
      setLicenseData(filled);
      setLicenseDataBefore(filled);
      dispatch(config.actions.resetGet());
    }
  }, [getLoading, infoData, getError]);

  // TOAST ADD
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      const message = config.parseError(error);
      if (message) {
        toast.dismiss();
        toast.error(message);
      }
      dispatch(config.actions.resetAdd());
    } else if (success) {
      toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      toast.success("Lisans ayarları başarıyla eklendi");
      dispatch(config.actions.resetAdd());
    }
  }, [loading, success, error]);

  // TOAST UPDATE
  useEffect(() => {
    if (updateLoad) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (updateErr) {
      const message = config.parseError(updateErr);
      if (message) {
        toast.dismiss();
        toast.error(message);
      }
      dispatch(config.actions.resetUpdate());
    } else if (updateSucc) {
      toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      toast.success("Lisans ayarları başarıyla düzenlendi.");
      dispatch(config.actions.resetUpdate());
    }
  }, [updateLoad, updateSucc, updateErr]);

  const submitDisabled = config.submitDisabled
    ? config.submitDisabled({ addLoading: loading, getLoading, data })
    : loading || getLoading; /* || data.isSettingsAdded */

  const submitLabel = config.submitLabel
    ? config.submitLabel(data)
    : data.isSettingsAdded
      ? "Kaydet"
      : "Ekle";

  return (
    <div className="flex flex-col items-center w-full text-base">
      <div
        className={`flex flex-col w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] relative${
          config.wide ? "" : " max-w-xl"
        }`}
      >
        <div className="absolute top-4 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <div className="text-center text-xl font-bold">
          <p>
            {data.restaurantName} - {licenseTypeIds[data.licenseTypeId].label}
          </p>
          <p className="text-lg">Entegrasyon Parametreleri</p>
        </div>

        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleSubmit}>
            {config.renderFields({ licenseData, setLicenseData, getLoading })}

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={submitDisabled}
                className="text-sm w-20 py-2 px-3 bg-[--primary-1] text-white rounded-md"
                type="submit"
              >
                {submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSettingsForm;

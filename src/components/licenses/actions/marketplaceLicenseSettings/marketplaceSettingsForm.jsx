//MODULES
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import PopupShell from "../../../common/popupShell";
import {
  TOOLBAR_BTN,
  TOOLBAR_BTN_PRIMARY,
} from "../../../common/toolbarStyles";
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
    <div className={`mx-auto w-full${config.wide ? "" : " max-w-xl"}`}>
      <PopupShell
        title={`${data.restaurantName} · ${
          licenseTypeIds[data.licenseTypeId].label
        }`}
        onClose={closeForm}
        footer={
          <>
            <button type="button" onClick={closeForm} className={TOOLBAR_BTN}>
              İptal
            </button>
            <button
              type="submit"
              form="marketplace-settings-form"
              disabled={submitDisabled}
              className={TOOLBAR_BTN_PRIMARY}
            >
              {submitLabel}
            </button>
          </>
        }
      >
        <p className="pt-3 text-xs font-medium uppercase tracking-wide text-[--gr-1]">
          Entegrasyon Parametreleri
        </p>
        <form id="marketplace-settings-form" onSubmit={handleSubmit}>
          {config.renderFields({ licenseData, setLicenseData, getLoading })}
        </form>
      </PopupShell>
    </div>
  );
};

export default MarketplaceSettingsForm;

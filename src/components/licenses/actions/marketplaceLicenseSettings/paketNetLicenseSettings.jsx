//COMP
import CustomInput from "../../../common/customInput";
import MarketplaceSettingsForm from "./marketplaceSettingsForm";

//REDUX
import {
  addIntegrationInformation,
  resetAddIntegrationInformation,
} from "../../../../redux/informations/paketNet/addIntegrationInformationSlice";
import {
  getIntegrationInformationByLicenseId,
  resetGetIntegrationInformationByLicenseId,
} from "../../../../redux/informations/paketNet/getIntegrationInformationByLicenseIdSlice";
import {
  resetUpdateIntegrationInformation,
  updateIntegrationInformation,
} from "../../../../redux/informations/paketNet/updateIntegrationInformationSlice";

const CONFIG = {
  stateKey: "paketNet",
  actions: {
    add: addIntegrationInformation,
    resetAdd: resetAddIntegrationInformation,
    update: updateIntegrationInformation,
    resetUpdate: resetUpdateIntegrationInformation,
    get: getIntegrationInformationByLicenseId,
    resetGet: resetGetIntegrationInformationByLicenseId,
  },
  buildInitialData: (data) => ({
    xRestaurantId: data?.xRestaurantId || "",
    restaurantId: data.restaurantId,
    licenseId: data.id,
    commissionRate: 0,
    PaketNetIntegrationInformationId: "",
  }),
  fillFromInfo: (infoData, prev) => ({
    ...prev,
    commissionRate: infoData.commissionRate,
    xRestaurantId: infoData.xRestaurantId,
    PaketNetIntegrationInformationId: infoData.id,
  }),
  parseError: (error) => {
    let getirError;
    try {
      getirError = JSON.parse(error?.data)?.message;
    } catch (err) {
      /*  */
    }
    return getirError;
  },
  beforeDispatch: (licenseData) => {
    console.log(licenseData);
  },
  renderFields: ({ licenseData, setLicenseData, getLoading }) => (
    <>
      <div className="flex gap-2">
        <p className="w-2 h-3"></p>
        <CustomInput
          required
          label="xRestaurantId"
          placeholder="xRestaurantId"
          className="py-[.45rem] text-sm"
          value={licenseData.xRestaurantId}
          onChange={(e) => {
            setLicenseData((prev) => {
              return {
                ...prev,
                xRestaurantId: e,
              };
            });
          }}
          disabled={/* data?.isSettingsAdded || */ getLoading}
        />
      </div>
      <div className="flex gap-2 mt-6">
        <p className="flex justify-center items-center w-2">%</p>
        <CustomInput
          type="number"
          label="Komisyon Oranı"
          placeholder="Komisyon Oranı"
          className="py-[.45rem] text-sm mt-[0] sm:mt-[0]"
          className2="mt-[0] sm:mt-[0]"
          value={licenseData.commissionRate}
          onChange={(e) => {
            setLicenseData((prev) => {
              return {
                ...prev,
                commissionRate: e,
              };
            });
          }}
          disabled={/* data?.isSettingsAdded || */ getLoading}
        />
      </div>
    </>
  ),
};

const PaketNetLicenseSettings = ({ data, onSuccess }) => {
  return (
    <MarketplaceSettingsForm data={data} onSuccess={onSuccess} config={CONFIG} />
  );
};

export default PaketNetLicenseSettings;

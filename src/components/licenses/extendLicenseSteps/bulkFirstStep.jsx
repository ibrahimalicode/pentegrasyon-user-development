//MOD
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomSelect from "../../common/customSelector";
import ForwardButton from "../stepsAssets/forwardButton";

//FUNC
import licenseTypeIds from "../../../enums/licenseTypeIds";
import {
  formatLisansPackages,
  formatToPrice,
  getPriceWithKDV,
  getRemainingDays,
} from "../../../utils/utils";

// REDUX
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../redux/licensePackages/getLicensePackagesSlice";
import { addItemToCart, clearCart } from "../../../redux/cart/cartSlice";
import {
  getKDVParameters,
  resetGetKDVParameters,
} from "../../../redux/generalVars/KDVParameters/getKDVParametersSlice";

// Step 1 of the bulk-extend flow: one row per selected license with a
// package choice auto-filtered to that license's marketplace, defaulting to
// the 1-year package — the same default the single flow applies. The single
// flow keeps its own FirstStep; this replaces it only when the page is
// opened with a bulkLicenses list.
const BulkFirstStep = ({ setStep, bulkLicenses, paymentMethod, setPaymentMethod }) => {
  const dispatch = useDispatch();

  const { success, error, licensePackages } = useSelector(
    (state) => state.licensePackages.getLicensePackages
  );
  const { KDVParameters, error: kdvError } = useSelector(
    (state) => state.generalVars.getKDVParams
  );

  // licenseId -> { license, options, selectedPkg }
  const [rows, setRows] = useState(null);

  // GET LICENSE PACKAGES
  useEffect(() => {
    if (!rows) {
      dispatch(getLicensePackages());
    }
  }, [rows]);

  useEffect(() => {
    if (error) {
      dispatch(resetGetLicensePackages());
    }
    if (success) {
      dispatch(getKDVParameters());
    }
  }, [success, error]);

  // BUILD THE ROWS once packages + KDV are in
  useEffect(() => {
    if (kdvError) {
      dispatch(resetGetKDVParameters());
    }

    if (KDVParameters && success) {
      const priced = licensePackages.data
        .filter((P) => P.isActive)
        .map((pkg) => ({
          ...pkg,
          price: getPriceWithKDV(pkg.userPrice, KDVParameters),
        }));

      setRows(
        bulkLicenses.map((license) => {
          const options = formatLisansPackages(
            priced.filter((p) => p.licenseTypeId === license.licenseTypeId)
          );
          return {
            license,
            options,
            // Same default as the single flow: the 1-year package.
            selectedPkg: options.find((pkg) => pkg.time === 1) || options[0] || null,
          };
        })
      );

      dispatch(resetGetKDVParameters());
      dispatch(resetGetLicensePackages());
    }
  }, [kdvError, KDVParameters, success]);

  const validRows = rows?.filter((r) => r.selectedPkg) || [];
  const total = validRows.reduce(
    (sum, r) => sum + parseFloat(r.selectedPkg.price),
    0
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!validRows.length) {
      toast.error("Uzatılabilecek lisans yok", { id: "bulk-extend-empty" });
      return;
    }

    dispatch(clearCart());
    validRows.forEach(({ license, selectedPkg }) => {
      dispatch(
        addItemToCart({
          ...selectedPkg,
          restaurantId: license.restaurantId,
          restaurantName: license.restaurantName,
          // Carried through to the payment basket so each cart line extends
          // its own license.
          licenseId: license.id,
        })
      );
    });
    setStep(2);
  }

  return (
    <form className="size-full flex flex-col" onSubmit={handleSubmit}>
      {/* Summary bar mirrors the single flow's: count left, total right. */}
      <div className="px-4 flex justify-between items-center p-2 w-full text-sm bg-[--light-1] border-b border-solid border-[--border-1]">
        <p className="font-medium text-[--black-1]">
          {bulkLicenses.length} lisans uzatılacak
        </p>
        <div className="text-center">
          <p>Toplam (KDV dahil)</p>
          <p className="font-semibold text-[--black-1]">
            {formatToPrice(String(total.toFixed(2)).replace(".", ","))} ₺
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 pt-3 md:px-4 pb-2">
        {!rows && (
          <p className="text-sm text-[--gr-1] py-6 text-center">
            Paketler yükleniyor...
          </p>
        )}

        {rows?.map(({ license, options, selectedPkg }) => {
          const remaining = getRemainingDays(license.endDateTime);
          return (
            <div
              key={license.id}
              className="flex flex-col gap-1.5 rounded-lg border border-solid border-[--border-1] px-3 py-2.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="text-sm font-medium text-[--black-1]">
                  {licenseTypeIds[license.licenseTypeId]?.value} ·{" "}
                  <span className="font-normal text-[--black-2]">
                    {license.restaurantName}
                  </span>
                </p>
                <p
                  className={`text-xs ${
                    remaining <= 0
                      ? "text-[--red-1] font-medium"
                      : remaining < 30
                        ? "text-[--red-1]"
                        : "text-[--gr-1]"
                  }`}
                >
                  {remaining > 0 ? `${remaining} gün kaldı` : "Süresi bitmiş"}
                </p>
              </div>

              {options.length ? (
                <CustomSelect
                  required={true}
                  isSearchable={false}
                  className="text-sm"
                  className2="mt-[0] sm:mt-[0]"
                  value={selectedPkg}
                  options={options}
                  onChange={(selectedOption) => {
                    setRows((prev) =>
                      prev.map((r) =>
                        r.license.id === license.id
                          ? { ...r, selectedPkg: selectedOption }
                          : r
                      )
                    );
                  }}
                />
              ) : (
                <p className="text-xs text-[--red-1]">
                  Bu pazaryeri için aktif paket bulunamadı — bu lisans sepete
                  eklenmeyecek.
                </p>
              )}
            </div>
          );
        })}

        <CustomSelect
          required={true}
          label="Ödeme Yöntemi"
          className="text-sm max-w-[28rem]"
          className2="mt-1 sm:mt-1"
          value={paymentMethod.selectedOption}
          options={paymentMethod.options}
          onChange={(selectedOption) => {
            setPaymentMethod((prev) => ({ ...prev, selectedOption }));
          }}
        />
      </div>

      <div className="flex justify-end items-end relative">
        <ForwardButton
          text="Devam"
          letIcon={true}
          type="submit"
          className="absolute -bottom-16 -right-1"
        />
      </div>
    </form>
  );
};

export default BulkFirstStep;

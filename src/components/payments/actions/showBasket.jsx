//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import { EyeI } from "../../../assets/icon";
import PopupShell from "../../common/popupShell";
import ActionButton from "../../common/actionButton";
import { formatToPrice } from "../../../utils/utils";

const ShowBasket = ({ payment }) => {
  const { setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(<ShowBasketPopup payment={payment} />);
  };

  return (
    <ActionButton
      element={<EyeI className="w-5" strokeWidth="1.8" />}
      element2="Sip İçeriği"
      onClick={handleClick}
    />
  );
};

export default ShowBasket;

// The payments table stores two generations of basket JSON side by side:
// records before 2026-08-12 hold ONE OBJECT whose Licenses is also one
// object; newer records hold an ARRAY of restaurant groups whose Licenses
// is an array (and admin-initiated extends still write the old shape).
// Normalise both into [{...group, Licenses: [...]}] so every record renders
// — the old parser did JSON.parse(...)?.[0], which returned undefined for
// every legacy extend record and silently showed an empty popup, and
// dropped all but the first restaurant of a multi-restaurant purchase.
function normalizeBasket(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return [];
  }
  const groups = Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];
  return groups.map((group) => ({
    ...group,
    Licenses: Array.isArray(group.Licenses)
      ? group.Licenses
      : group.Licenses
        ? [group.Licenses]
        : [],
  }));
}

const priceText = (price) =>
  formatToPrice(
    Number(price || 0)
      .toFixed(2)
      .replace(".", ","),
  );

function ShowBasketPopup({ payment }) {
  const { setPopupContent } = usePopup();
  const groups = normalizeBasket(payment.basket);
  const total = groups.reduce(
    (sum, g) =>
      sum + g.Licenses.reduce((s, l) => s + (l.LicensePackagePrice || 0), 0),
    0,
  );

  return (
    <div className="mx-auto max-w-xl">
      <PopupShell
        title="Sipariş İçeriği"
        onClose={() => setPopupContent(null)}
        footer={
          groups.length > 0 && (
            <p className="text-sm text-[--black-1]">
              Toplam{" "}
              <span className="font-semibold">{priceText(total)} ₺</span>
            </p>
          )
        }
      >
        {groups.length === 0 ? (
          <p className="pt-4 text-sm text-[--gr-1]">
            Sepet içeriği okunamadı.
          </p>
        ) : (
          <div className="flex flex-col gap-4 pt-4">
            {groups.map((group, i) => (
              <div key={`${group.RestaurantId}-${i}`}>
                <p className="mb-2 text-sm font-medium text-[--black-1]">
                  {group.RestaurantName || "Restoran"}
                </p>

                <div className="overflow-x-auto rounded-lg border border-solid border-[--border-1]">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-[--light-3] text-xs uppercase tracking-wide text-[--gr-1]">
                        <th className="px-3 py-2 font-medium">Lisans</th>
                        <th className="px-3 py-2 font-medium">Süre (Yıl)</th>
                        <th className="px-3 py-2 font-medium">Fiyat (₺)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[--border-1]">
                      {group.Licenses.map((license, j) => (
                        <tr key={license.LicenseId || j}>
                          <td className="px-3 py-2">
                            {license.LicensePackageName}
                          </td>
                          <td className="px-3 py-2">
                            {license.LicensePackageTime}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            {priceText(license.LicensePackagePrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </PopupShell>
    </div>
  );
}

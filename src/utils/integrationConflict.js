// The integration-conflict 400 (backend deploy of 2026-08-20) carries a
// detail object in the envelope's `data`:
//   { conflictField, conflictValue, licenseId, restaurantId, restaurantName,
//     userId, userFullName, userEmail, userPhoneNumber }
//
// Privacy rule from the backend team: the conflicting record can belong to
// ANOTHER customer, and this panel must never surface that customer's name
// or contact details — the raw message_TR embeds their e-mail, so it must
// not be toasted verbatim either. Only when the record belongs to the
// logged-in user do we name the restaurant.

const FIELD_LABELS = {
  StoreId: "Restoran ID (StoreId)",
  APIKey: "API anahtarı",
  SellerId: "Satıcı ID (SellerId)",
  RestaurantSecretKey: "Restoran gizli anahtarı",
  "X-Restaurant-Id": "Restoran ID",
};

const ownUserId = () => {
  // Read the stored login response directly (not via api.js's getAuth — the
  // interceptor imports this module, and that would be a circular import).
  try {
    const auth = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCAL_KEY) || "null",
    );
    // The login response shape has varied; accept the usual spellings.
    return auth?.userId ?? auth?.id ?? auth?.user?.id ?? null;
  } catch (err) {
    return null;
  }
};

// Returns the user-safe toast text for a conflict envelope, or null when the
// response is not an integration conflict (callers fall through to their
// existing handling — also what happens until the backend deploy lands,
// since `data` arrives null until then).
export function integrationConflictMessage(envelope) {
  const detail = envelope?.data;
  if (!detail?.conflictField) return null;

  const label = FIELD_LABELS[detail.conflictField] || detail.conflictField;
  const own = ownUserId();

  if (own && detail.userId && String(detail.userId) === String(own)) {
    return `Bu ${label} zaten ${
      detail.restaurantName ? `"${detail.restaurantName}" restoranınızda` : "başka bir restoranınızda"
    } kullanılıyor. Aynı bilgiyi iki lisansta kullanamazsınız.`;
  }

  return `Bu ${label} başka bir müşterinin restoranında kullanılıyor. Bilgilerinizi kontrol edin; size ait olduğundan eminseniz destek ile iletişime geçin.`;
}

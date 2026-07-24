# User Frontend Improvement Plan

Result of a full audit of the Redux layer, components, and project structure (2026-07-16),
mirroring the structure of `../admin/IMPROVEMENT_PLAN.md` so the two panels stay in step.
Implementation is phased; each phase is independently shippable and verified with
`npm run lint` + `npm run build` + manual smoke test in the dev server before moving on.

**Inventory (verified):** 469 JS/JSX files in `src/` (plus root-level `hooks/`, `middlewares/`),
127 Redux slice files across 24 feature folders (116 call `privateApi()` at module top level),
258 `console.log` calls, 15 `params: data` occurrences in slices, 0 usages of the configured
`@` alias, 0 tests, 0 memoized components, 0 lazy routes, 80 inline `style={{}}`.

---

## Phase 0 — Key rotation (manual, do immediately — if not already done with admin)

`.env` was committed to git in the past (same commits as the admin repo: `9864331`, `fec191e`, …).
The file is untracked now, but the values live in git history. If the admin Phase 0 rotation
already replaced these keys (they appear to be shared), just update this repo's `.env`;
otherwise rotate:

- [ ] Google Maps API key (+ HTTP-referrer restriction)
- [ ] Cloudflare Turnstile site/secret keys
- [ ] `VITE_SECRET_KEY` (and its backend pair)

**This is a user action, not a code phase.**

---

## Backend prerequisites ✅ ANSWERED & DEPLOYED 2026-07-24 (backend PR #170, prod)

> Binding table delivered (see corrections below), GET→POST conversions live (dual-verb,
> old GETs preserved), `message_TR` confirmed on all controller `ResponseBase` responses.
> **Phase 3 factory must treat "no parseable `message_TR`" as a generic error** — three
> response classes lack it: middleware plain-text rejections (404/423/401/403), framework
> 401 (empty body) / automatic 400 `ProblemDetails`, and two raw PayTR returns.
>
> **Endpoint-name corrections vs the original list:** `Couriers/UpdateCouriers` →
> `UpdateCourier`; `Couriers/GenerateLoginCode` → `CreateLoginCode` (parameterless);
> `Messages/UpdateMessageStatus` → `UpdateMessageRecipientIsRead`. The frontend already
> used the correct routes.
>
> **Discrepancies surfaced by the audit — resolved 2026-07-24:**
> - ✅ `UpdateRestaurantCourierStatus`: unauthenticated probes confirmed only the
>   GetirYemek route exists (401); YemekSepeti/Migros/Trendyol 404. Only **Migros**
>   actually rendered the "Kurye Durumu" toggle (broken on click); YemekSepeti/Trendyol
>   had it as dead code. Fixed frontend-side: toggle removed from Migros, dead courier
>   code removed from all three, the 3 slices deleted and unwired from their `index.js`.
>   GetirYemek untouched. If Migros/YS/Trendyol courier control is ever wanted, that's a
>   backend feature request first.
> - ✅ Trendyol prepare route: probes show **both** `Trendyol/TicketShipped` (401 = exists)
>   and `TicketPrepared` exist; `TicketPrepare` 404s. Frontend's `TicketShipped` call is
>   valid — no change needed.
> - ⚠️ Still relevant for Phase 3: `ActivityLog/DeleteActivityLogsByIds` binds
>   `[FromBody] List<Guid>` (unlike other DELETEs) — remember when migrating that slice.

The July backend binding audit covered the **admin** panel's endpoints. This panel needs:

1. **Binding table for user-panel endpoints** — which of these bind from body vs query:
   body+query duplicated today: `<MP>/UpdateRestaurantStatus` + `UpdateRestaurantCourierStatus`
   (×4), `Tickets/UpdateTicketCourier`, `Restaurants/UpdateRestaurant`, `Couriers/UpdateCouriers`,
   `Users/UpdateUserLock`, `Messages/UpdateMessageStatus`; all-query with empty body today
   (assume query stays): 16× `<MP>/TicketVerify|Prepare|Deliver|Cancel`,
   `LicenseStock/UseLicenseStock`, `Licenses/UpdateLicenseDate`, `Licenses/UpdateLicenseDay`.
2. **Convert side-effectful GETs to POST** (dual-verb for one release, like the PayTR pair):
   `SMS/SendSMSUserLockPasswordReset` + email twin, forgot-password (recipient in URL),
   user-verification (phoneNumber in query).
3. Confirm all error responses carry `message_TR` (Phase 3 factory assumes it).

Note: `Tickets/UpdateTicketStatus` (mutating GET) needs **no** backend change — the slice is
unused by any component and broken (params in axios's ignored 3rd arg); delete it in Phase 1.

---

## Phase 1 — Critical correctness & security fixes (small diff, high value) ✅ DONE 2026-07-24

> Implemented in two passes (backend-independent 2026-07-24 AM, remainder after backend
> PR #170 deployed). Item 3 final state per the binding table: integration updates send
> body + id-only query; `UpdateUserLock` body-only; `UpdateCourier` body + `courierId`
> query; `UpdateRestaurant` was already correct; all-query endpoints (16 ticket actions,
> restaurant-status, license stock/date/day, courier login-code) left untouched as required.
> GET→POST consumed: forgot-password and SMS user-verify send JSON bodies; user-lock
> SMS/email resets POST with no body (email `SendEmailUserVerify` was not converted —
> its GET branch kept, no caller passes `isEmail` today). Also removed dead
> `updateTicketStatusSlice` + store key and `SignalRContext.jsx`.
> Verified: build passes, prod bundle has 0 console.log, login page clean; live probe of
> POST `SMS/SendSMSPasswordReset` against production returned the endpoint's own
> `ResponseBase` (`Kullanıcı bulunamadı` for a dummy number) — routing + body binding
> confirmed. Lint's 76 errors are pre-existing (72 = privacyPolicy unescaped entities;
> Phase 2). Remaining manual check: save one marketplace's integration settings while
> logged in and confirm the request query carries only the id.

1. **`src/redux/api.js` — interceptor stacking.** `privateApi()` registers a new
   request+response interceptor pair on every call, and 116 slices call it at module top
   level. Each API error runs through up to ~116 stacked response handlers (duplicate toasts
   only masked by `toast.dismiss()`/ids). Fix: register interceptors once at module scope;
   `privateApi()` just returns the instance. (Same fix already shipped in admin — port it.)
2. **`src/redux/api.js` — `getAuth()` crash.** `JSON.parse(localStorage.getItem(KEY))` with
   no try/catch; corrupted storage crashes every private request. Wrap in try/catch, clear
   auth on parse failure.
3. **Credentials leaking into URLs — apply the backend binding table.** The backend audit
   (2026-07) confirmed: `[FromBody]` DTOs never read the query, but required `...Id` params
   on Update endpoints bind from query. Of the 15 `params: data` occurrences here:
   - The 5 `informations/*/updateIntegrationInformationSlice.js` (YemekSepeti, GetirYemek,
     MigrosYemek, TrendyolYemek, PaketNet) send the whole DTO as body **and** query — API
     keys/secrets end up in server logs. Strip the query down to only the required id param
     (`yemekSepetiIntegrationInformationId`, `getirYemekIntegrationInformationId`,
     `migrosYemekIntegrationInformationId`, `trendyolYemekIntegrationInformationId`,
     `PaketNetIntegrationInformationId` — query names are case-insensitive).
   - The 5 `addIntegrationInformationSlice.js` are already body-only — nothing to do
     (the optional `userId` query param is admin-panel-only).
   - GET and DELETE slices (`getOrders`, `getPayments`, `getLicenses`, `getLogs`, `getStocks`,
     `getTicketById`, `getCourierById`, `getRestaurantLicenses`,
     `deleteRestaurantByMarketplaceRestaurantId`) correctly use query — leave them.
   - `user/updateUserLockSlice.js` (PUT with `{ params: data }`) is not in the backend
     table — confirm its binding with backend before touching it.
4. **Strip `console.log` from production builds.** Add `esbuild: { drop: ["console", "debugger"] }`
   (build-only) to `vite.config.js`. The 258 call sites keep working in dev; production stops
   logging tokens/payloads.
5. **Dead code (verify unused first, then delete):** `note.txt`, root `liwamenu.js` (37 kB,
   unreferenced), `src/pages/test.jsx` + its `/test` route in `src/pages/home.jsx`,
   `src/assets/anim/test.jsx`, `src/enums/orderTest.js`, `src/assets/dummy/`, and
   `src/context/SignalRContext.jsx` if it is truly unmounted (it is not in the provider tree;
   Firestore is the real-time channel).

**Verification:** lint, build, login + one CRUD flow per major page; confirm a single error
toast on a failing request; confirm integration-info update sends body + id-only query.

---

## Phase 2 — Project structure & tooling ✅ DONE 2026-07-24

> Implemented. Notes: `hooks/`+`middlewares/` moved into `src/` (unused `useTypingEffect`
> deleted); `jsconfig.json` added, moved/touched files use `@`; renames done incl. 22
> malformed redux action names (`reset[a-z]*` + 2 `restSend*` variants); ESLint 0 errors
> (was 76) with 343 warnings surfaced for Phases 3–4, `--max-warnings 0` dropped (errors
> still fail); junk deps removed (`react-i18next`, `install`, `npm`); route chunks split —
> main entry 4,018 kB → 1,620 kB, dashboard/apexcharts (549 kB) and orders (1,216 kB) now
> lazy. Dead `NotFound` route in home.jsx (shadowed by the `/*` catch-all) removed.
> Verified: build 25 chunks, lint exit 0, login page + module resolution clean in dev.

1. **Move `hooks/` and `middlewares/` into `src/`** and fix the deep relative imports that
   reach out of `src/`.
2. **Make the `@` alias real:** add `jsconfig.json` with `paths`; adopt in files touched from
   now on (no big-bang rewrite).
3. **Typo/name fixes (mechanical renames + import updates):**
   - `src/components/common/customGeneralLloader.jsx` → `customGeneralLoader.jsx`
   - `src/pages/restourants.jsx` → `restaurants.jsx`
   - Redux action typos: `resetaddCourier`, `resetaddUserInvoice` (sweep for more `reseta*`
     variants while migrating in Phase 3).
4. **ESLint:** re-enable `react-hooks/exhaustive-deps` and `no-unused-vars` as `"warn"`
   (currently `"off"`, hiding real bugs). Match the admin config: errors fail the lint
   script, warnings don't; disable `react/no-unescaped-entities` (static Turkish copy).
5. **Remove junk dependencies:** `react-i18next` (one commented import), and the accidental
   `install` and `npm` packages in `dependencies`.
6. **Route-level code splitting:** `React.lazy` + `Suspense` for the page imports in
   `src/pages/home.jsx`. Priority chunk: the dashboard (`src/components/dashboard/chart.js`
   pulls apexcharts — ~0.5 MB in admin's measurement). Also review the `/*` →
   `Navigate("/orders")` catch-all vs the named routes for unreachable entries.

**Verification:** lint (triage new warnings), build produces split chunks, full click-through
of sidebar sections, dashboard charts still render.

---

## Phase 3 — Redux standardization ✅ DONE 2026-07-24

> 97 of 122 slices migrated to `createApiSlice` (net −4,700 lines). Factory ported from
> admin with two deliberate extensions: default rejected payload always carries BOTH
> `message` and `message_TR` (components here read either), and an optional
> `mapRejected(payload, arg)` for the 16 ticket-action slices that stamp `ticketId` onto
> errors. loadingMiddleware replaced by matcher counting in loadingSlice; 401 clears auth
> and redirects once (skips when already on /login).
>
> **25 deliberately preserved** (non-conforming; reasons in file-level detail): auth
> login/verifyCode/userVerification (localStorage writes); updateLicenseDateSlice
> (two thunks); the 4 bank/online pay slices (non-template reducers); 6 slices with
> data-only resets (getCities, getLocation, getKDVParameters, getSMSParameters,
> getCouriers, getLicenses, getRestaurants, getRestaurant, getStocks); 5 no-data-field
> delete slices; getDistricts/getNeighs (store `action.error`); getUserAddress
> (missing-return bug would change behavior).
>
> **Latent pre-existing bugs surfaced (preserved, not fixed — bugfix-pass candidates):**
> - `getUserAddressSlice`: missing `return` before `rejectWithValue` in 4 catch branches —
>   geolocation failures fulfill with `undefined`.
> - `getDistricts`/`getNeighs`: rejected stores `action.error`, discarding the payload.
> - `yemekSepeti`/`trendyol` UpdateRestaurantStatus: error gate checks
>   `err?.response?.data?.data` (extra `.data`) so most backend errors show generic text.
> - `migrosYemekGetTicketCancelOptions`: triple unwrap `res.data.data.data`.
> - `addByOnlinePay`/`extendByOnlinePay`: `throw new Error(object)` → "[object Object]".
> - `getStocksSlice`: initialState declares `licenses` but handlers write `state.stocks`.
> - Action-type/endpoint mismatches preserved verbatim: `Users/addUserInvoice` →
>   `Invoices/AddUserInvoiceAddress` (and update twin); `getOrderStatistics` →
>   `Statistics/GetTicketStatistics`; `Tickets/UpdateOrderCourier` →
>   `Tickets/UpdateTicketCourier`; garbled `"Tickets/GetTicGetTicket...ket"` compensation
>   type; migros informations types prefixed `Licenses/`.
> - `sendEmailUserLockPasswordReset` stores its data under `smsParameters` (copy-paste).
> - Body+query duplication remains on addCourier, updateCourierLoginCode,
>   updateOrderCourier, updateTicketAutomationVariable (endpoints not in the backend
>   binding table — ask backend before stripping).
> - `getCourierById` stored a phantom `resetGetCourierByIdState` export (destructured
>   `undefined`, zero importers — dropped during migration) and keeps the courier under
>   state key `ticket`.
>
> Verified: build green, lint 0 errors (337 warnings), store hydrates with all 25 keys and
> historical sub-keys in dev, login page console clean. Runtime CRUD flows need an
> authenticated click-through (per-feature list/add/edit/delete) as final acceptance.

All 127 slices are hand-copied variants of one 70–100 line template with drift
(`error: false` vs `null`, `throw` vs `rejectWithValue`, redundant `${baseURL}` prefixes —
the axios instance already has `baseURL`).

1. **Port `src/redux/createApiSlice.js` from the admin repo verbatim** — same factory, same
   `{ loading, success, error: null, data }` shape and `{ message_TR, message }` rejection.
   Keeping the two panels on an identical factory means fixes propagate by copy.
2. **Migrate feature-by-feature** (one PR-sized commit per feature; simple ones first —
   activityLogs, stocks, sms, email — auth/cart last). Keep store keys and selector paths
   **unchanged** so components need no edits. Skip non-conforming slices deliberately
   (login/verify localStorage writes, multi-thunk slices) and list them here, as admin did.
3. **Replace `middlewares/loadingMiddleware.js`** module-level counter with matcher-based
   counting inside the loading slice (immune to ordering races).
4. **401 flow:** interceptor stops hard-redirecting mid-flight (`window.location.href` today);
   clear auth + redirect once.
5. **Log latent bugs surfaced during migration in this file** (admin's migration surfaced 6);
   preserve behavior, fix in a separate bugfix pass.

Expected outcome: ~120 near-identical files collapse to factory calls, one consistent error
shape, no user-visible behavioral change.

**Verification:** per-feature manual test of list/add/edit/delete after each migration; global
loader still behaves with overlapping requests; new-order flow (Firestore event → list refresh)
still works.

---

## Phase 4 — Component-layer deduplication (the marketplace ×4 problem)

This panel's biggest duplication is unique to it: **every marketplace is implemented 4–6×
in parallel.** `src/components/orders/` alone is ~9,600 lines:

| Per-marketplace file | GetirYemek | YemekSepeti | MigrosYemek | TrendyolYemek |
|---|---|---|---|---|
| OrderDetails | 348 | 381 | 361 | 405 |
| PrintOrder | 253 | 296 | 266 | 279 |
| StatusButtons | 270 | 261 | 261 | 285 |
| TableBody | 225 | 216 | 323 | 223 |
| RestaurantsStatus | 252 | 298 | 247 | 265 |
| useXOrderActions | 248 | 250 | 250 | 249 |

1. **Config-driven marketplace order components.** Extract shared skeletons
   (`OrderDetailsBase`, `PrintOrderBase`, `StatusButtonsBase`, `TableRowBase`) that take a
   per-marketplace config (status enum, action thunks, field mapping, branding). Start with
   the four `use<Marketplace>OrderActions` hooks — they are ~250 near-identical lines each
   and pure logic (easiest, highest confidence). Migrate one marketplace at a time and
   diff-test print output pixel-for-pixel (`react-to-print` layouts are business-critical
   for kitchens).
2. **Generic `MarketplaceSettingsForm`:** the 5 license-settings forms
   (`yemekSepetiLicenseSettings` 404 lines, trendyol 330, migros 297, getirYemek 252,
   paketNet 238) share state/submit/toast logic — same item as admin Phase 4.3; reuse
   admin's extraction if done there first.
3. **`useAsyncActionToast` hook** replacing the copy-pasted
   `useEffect([loading, success, error])` toast/close/reset chains across action components.
4. **PopupContext click-outside rework:** registry in a `useRef`, one document listener,
   `registerClickOutside(id, ref, cb)` — same as admin.
5. **List-page skeleton (`useListPage`)** for the search/filter/pagination plumbing in
   `licensesPage` (356), `restaurantsPage` (442), `restaurantLicensesPage` (446),
   `ordersPage` + `filterOrders`.
6. **Split the worst god-components** where they resist the abstractions above:
   `restaurants/actions/edit.jsx` (578), `restaurants/actions/addRestaurant.jsx` (554),
   `orders/components/chooseCourier.jsx` (426) — extract map picker and address cascade
   into reusable pieces (share with admin if possible).

**Verification:** each refactored screen smoke-tested against previous behavior; for each
marketplace: receive test order → verify → prepare → print → deliver/cancel, sounds fire,
print layout unchanged.

---

## Phase 5 — Quality polish (ongoing / lower priority)

1. **Remove `dangerouslySetInnerHTML`** (5 files: customSelector/checkbox/radiobox pattern) —
   accept ReactNode instead; closes an XSS hole.
2. **Real-time/audio cleanup:** `FirestoreContext` creates 6 module-level `Audio` objects and
   `OrdersContext` builds `new Audio(...)` inside a `useRef` initializer on every render
   (only the first is kept, the rest are garbage); centralize a small sound manager,
   remove the `console.log("Sound played")`-style debug lines.
3. **Accessibility:** `role="dialog"` + `aria-modal` + focus trap in the popup; label/`htmlFor`
   in customInput; `aria-current` in pagination.
4. **Memoize table rows** (`React.memo`) and heavy derived data (`useMemo`) on the orders
   table — it re-renders on every poll/Firestore event.
5. **Replace the 80 inline `style={{}}`** usages with Tailwind classes as files get touched.
6. **index.html:** meta description; audit `public/` and root `dist/` (stale build committed?).
7. Standardize lodash imports (`lodash/isEqual` form), delete commented-out code and leftover
   `console.log`s as files get touched.

Not planned (would discuss separately): TypeScript migration, test suite, RTK Query.

---

## Suggested order & sizing

| Phase | Scope | Risk | Size |
|-------|-------|------|------|
| 0 | Rotate leaked keys (user; may be done via admin) | — | minutes |
| 1 | api.js fixes, params leak (per backend table), console-drop, dead files | Low | small |
| 2 | Structure, ESLint, renames, junk deps, lazy routes | Low-med | medium |
| 3 | Port admin's slice factory + 127-slice migration | Medium | large, incremental |
| 4 | Marketplace ×4 dedup, settings forms, toast hook, popup ctx | Medium-high | large, incremental |
| 5 | A11y, memo, audio cleanup, styling polish | Low | ongoing |

**Cross-repo rule:** wherever admin already shipped the equivalent phase, port its
implementation (api.js interceptors, `createApiSlice.js`, ESLint config, toast hook) instead
of re-deriving it — the two panels should stay copy-paste compatible.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

User-facing web panel of **Pentegrasyon** — a platform that integrates restaurants with Turkish food-delivery marketplaces (GetirYemek, YemekSepeti, MigrosYemek, TrendyolYemek, GoFody, SiparişimPlus). Restaurant owners manage incoming orders, couriers, licenses, stocks, and payments here. All UI text is Turkish.

## Commands

```bash
npm start          # dev server (Vite, port 9006, host 0.0.0.0)
npm run build      # production build
npm run preview    # preview production build
npm run lint       # eslint . --ext js,jsx --max-warnings 0
```

There are no tests. Plain JavaScript/JSX (no TypeScript). Requires a `.env` with `VITE_BASE_URL`, `VITE_LOCAL_KEY`, `VITE_GOOGLE_MAPS_API_KEY`, `VITE_PAYTR_URL`, `VITE_SITE_KEY`, etc. Path alias: `@` → `./src`.

## Architecture

### Redux state (the dominant pattern)

Every backend interaction is a Redux Toolkit slice following a strict convention — copy an existing slice when adding one:

- `src/redux/<feature>/<action>Slice.js` — one file per API call. Each holds `{ loading, success, error, <data> }`, one `createAsyncThunk` (named after the backend endpoint, e.g. `"Tickets/GetTickets"`), pending/fulfilled/rejected handlers, and `reset...State` reducers that components dispatch after consuming success/error.
- `src/redux/<feature>/index.js` — `combineReducers` mapping slices to short keys (e.g. `state.orders.get`, `state.orders.update`).
- `src/store.js` — registers every feature reducer. New features must be added here.
- `src/redux/api.js` — axios instances. `privateApi()` attaches the Bearer token from localStorage (key = `VITE_LOCAL_KEY`) and handles 401 (clears auth, redirects to `/login`). Use it for all authenticated calls.
- `middlewares/loadingMiddleware.js` (note: `middlewares/` and `hooks/` live at the repo root, not in `src/`) feeds the global `isLoading` slice from pending/fulfilled/rejected action types.

Components typically: dispatch a thunk → `useSelector` the slice → react to `success`/`error` in a `useEffect` (toast, close popup) → dispatch the reset action.

### Routing & providers

- `src/main.jsx` wraps the app: Redux Provider → BrowserRouter → PopupProvider → ProtectPagesProvider → FirestoreProvider → MessagesContextProvider. It also injects the Google Maps script.
- `src/App.jsx` defines public routes (login, register, payment result pages) and routes everything else through `ProtectedRoute` (`src/components/protect.jsx`) into `src/pages/home.jsx`, which renders Header + Sidebar and the nested page routes (`/orders`, `/dashboard`, `/couriers`, ...).

### Contexts (`src/context/`)

Cross-cutting concerns live in React contexts, not Redux:

- `FirestoreContext` — listens to Firebase Firestore for real-time new-order / status-change events and plays a per-marketplace notification sound.
- `OrdersContext` — order list filters, polling/refresh, unverified-order alerts. Wraps only the protected routes.
- `PopupContext` — global popup; components render dialogs by calling `setPopupContent(<Component/>)`.
- `SlideBarContext`, `ProtectPagesContext` (page-lock feature), `MessagesContext`, `SignalRContext` (SignalR is available but Firestore is the primary real-time channel).

### Per-marketplace structure

Each marketplace is implemented three times in parallel — keep them consistent when changing one:

- `src/enums/<marketplace>OrderStatuses.js` — status ids/labels (plus `marketPlaceIds.js` mapping marketplace ids).
- `src/redux/<marketplace>/` — marketplace-specific thunks (verify/prepare/deliver/cancel ticket, restaurant status).
- `src/components/orders/<marketplace>/` — order details popup, print layout (`<marketplace>PrintOrder.jsx`, printed via `react-to-print`), status buttons, table body, and a `use<Marketplace>OrderActions.js` hook that wires status transitions to the thunks.

Shared order UI is in `src/components/orders/components/` and `ordersTable.jsx`; page-level tabs in `src/components/orders/pages/`.

### Styling

Tailwind with CSS-variable color tokens (e.g. `bg-[--white-1]`, `text-[--primary-1]`) defined in `src/index.css`. Icons are custom components in `src/assets/icon`.

## Conventions

- Imports are grouped with comment headers (`//MODULES`, `//COMP`, `//REDUX`, `//UTILS`, `//CONTEXT`) — follow this in existing files.
- ESLint has `no-unused-vars`, `react-hooks/exhaustive-deps`, and `react/prop-types` turned off; don't "fix" these patterns in unrelated code.
- Dates/formatting helpers live in `src/utils/utils.js`; user-visible feedback goes through `react-hot-toast` (configured in `src/config/toast.js`).

# Technical Requirements Document (TRD)

## Project: Sunglobalimpex B2B Distributor Admin Portal
Tech Stack: Next.js 16.3.5, React 19.2.8, Tailwind CSS v4, TypeScript 5

---

## 1. Architecture
```
app/
  layout.tsx              (root layout: fonts + metadata)
  page.tsx                (redirects to /admin)
  admin/
    layout.tsx            (renders AdminShell)
    page.tsx              (dashboard: stats + chart + products + orders)
    products/page.tsx     (product inventory CRUD, client-side mock state)
    categories|cities|shops|orders|reports|settings/page.tsx  (ComingSoon stubs)
components/
  AdminShell.tsx          (client: sidebar open state + responsive shell)
  Sidebar.tsx             (dark sidebar, nav links, counts, mobile overlay)
  AdminHeader.tsx         (B2B banner, logo, server status, Admin Panel btn, hamburger)
  ComingSoon.tsx          (placeholder for unbuilt sections)
```

---

## 2. Styling (Tailwind v4 — Updated)
- Sidebar: `bg-[#1a1b2f]`, text white, active link `bg-[#4CAF50]/20` with left green border.
- Page: `bg-[#f4f5f8]` light gray.
- Cards: `bg-white rounded-2xl shadow-sm border border-gray-100/50`.
- Green accent: `text-[#4CAF50]`, `bg-[#4CAF50]` for badges/buttons.
- Font: `Geist Sans` (already configured).

---

## 3. Component Specs (Exact from Images)

### AdminHeader (`components/AdminHeader.tsx`)
- Dark top strip: `h-10 bg-[#1a1b2f]` with "B2B VERIFIED DEALER PORTAL" green pill (`rounded-full bg-[#4CAF50]/20 text-[#4CAF50]`), subtitle text.
- Main header row: white/light bg, logo area (`Sunglobalimpex` + green icon + DISTRIBUTOR tag + subtitle), server status (`flex items-center gap-2` with green dot), right buttons (`Admin Panel` green button, `Shop User View` outlined).

### Sidebar (`components/Sidebar.tsx`)
- Fixed left, `w-64`, `bg-[#1a1b2f]`, full height.
- Logo area at top: green square icon + "Sunglobalimpex" bold + subtitle.
- Nav links: `flex items-center gap-3 px-4 py-3 rounded-lg` with icon. Active: green left border + green text + green bg tint.
- Counts: small gray pill with number (`Products: 14`, `Orders: 1` with orange bg).
- Bottom card: `bg-[#23233a] rounded-xl p-4` with "ACTIVE NETWORK" title, two rows (6 Cities, 8 Shops) with small icons.

### Stat Cards (inline in `app/admin/page.tsx`)
- White card, `rounded-2xl`, padding `p-6`.
- Top row: label (`text-xs font-semibold uppercase tracking-wide text-gray-500`) + icon (circle bg with icon).
- Main value: large bold INR (`text-3xl font-bold text-[#1a1b2f]`), e.g., `₹5,01,323`.
- Sub: small muted text (`+18.4% from last month` or `Real-time daily log`).

### SalesChart (inline SVG in `app/admin/page.tsx`)
- White card. Title: "Wholesale Sales Trend" bold, subtitle muted.
- Line chart: green line `#4CAF50`, light green fill gradient (`#4CAF50` to transparent).
- X-axis: Jan, Feb, Mar, Apr, May, Jun, Jul.
- Y-axis: ₹0.0, ₹7.0L, ₹14.0L, ₹21.0L, ₹28.0L.
- Right top pill: "FY 2026-27" green outline.

### ProductCard (inline in `app/admin/page.tsx`)
- Horizontal card: image left (`w-16 h-16 rounded-lg`), middle info (`name bold`, `location muted`, `stock` muted), right price (`text-[#2e7d32] font-bold`).

### OrdersTable (inline in `app/admin/page.tsx`)
- Table header: `Order Number`, `Shop Name`, `City`, `Date`, `Total Amount`, `Status`, `Action`.
- Rows: order number bold (`ORD-89241`), shop + owner name below (`Apex Hardware & Sanitaryware` / `Rajesh Kumar`), city, date-time, amount green, status pill (`Delivered` green, `Confirmed` blue, `Pending` orange), action button (`View Invoice` dark rounded).

---

## 4. Routing
- `/admin` → Dashboard (stat cards, chart, products, orders)
- `/admin/products` → Product list (future)
- `/admin/orders` → Orders detail (future)
- `/admin/settings` → Settings (future)

---

## 5. Data (Mock from Images)
Stat cards, chart values, products list, and orders table should use the exact values shown in the images for initial render.

---

## 6. Responsive Rules
- `< lg`: sidebar hidden, opens as slide-in overlay via hamburger; cards stack; tables scroll horizontally (`overflow-x-auto`).
- `>= lg`: sidebar fixed, main content has `lg:ml-64` padding.
- Chart: responsive width, fixed aspect ratio (`viewBox` + `h-auto`).

---

## 7. Build & Deploy
- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- Deploy: Vercel

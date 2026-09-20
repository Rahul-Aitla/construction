# Product Requirements Document (PRD)

## Project: BuildPro B2B Distributor Admin Portal
Reference: Image 1, Image 2, Image 3 (provided screenshots)
Theme: Dark sidebar with green accents, white cards, light gray background.

---

## 1. Overview
Build an admin dashboard that exactly matches the BuildPro Distributor Portal screenshots. Dark left sidebar with green logo, stat cards showing INR values, sales trend chart, product listings, and wholesale orders table.

---

## 2. Goals
- Replicate the 3 provided screenshots exactly (layout, colors, content structure).
- Start with admin dashboard page only.
- Use INR currency format (₹) for all monetary values.

---

## 3. Admin Layout Requirements (Image 1)
### 3.1 Top Banner
- Black/dark bar with "B2B VERIFIED DEALER PORTAL" (green badge) on left.
- Center/subtitle: "Wholesale Construction & Interior Materials Distribution Network"
- Right buttons: "Shop User View" and "Admin Panel" (green button)

### 3.2 Header Area
- Logo: "BuildPro" + green icon, "DISTRIBUTOR" label, subtitle "Wholesale Materials & Supplies"
- Right status: Green dot "Distributor Server Live", "Admin HQ", "National Distribution Center"

### 3.3 Sidebar (Dark)
- Navigation items with icons and counts:
  - Dashboard (active/green highlight)
  - Products (14)
  - Categories
  - Cities (6)
  - Shops (8)
  - Orders (1, orange badge)
  - Reports
  - Settings
- Bottom card: "ACTIVE NETWORK" — "6 Cities Covered", "8 Partner Shops"

---

## 4. Dashboard Content (Image 1 + 2)
### 4.1 Stat Cards Grid (6 cards)
1. TOTAL SALES — ₹5,01,323 (+18.4% from last month), $ icon
2. TODAY'S SALES — ₹1,51,217 (Real-time daily log), chart-up icon
3. TOTAL ORDERS — 5 (Wholesale fulfillments), cart icon
4. PENDING ORDERS — 1 (Requires approval), clock icon (orange)
5. COMPLETED ORDERS — 3 (Delivered & cleared), check icon
6. TOTAL SHOPS — 8 (Registered dealers), store icon
7. TOTAL CITIES — 6 (Active hubs), building icon

### 4.2 Chart Section (Image 2)
- Title: "Wholesale Sales Trend" — subtitle "Monthly revenue volume in INR"
- Line chart with green line, fill gradient, Y-axis labels (₹0.0, ₹7.0L, ₹14.0L, ₹21.0L, ₹28.0L), X-axis months (Jan–Jul)
- Right card: "FY 2026-27"

### 4.3 Top Selling Products (Image 2)
- Title: "Top Selling Products" — subtitle "Highest wholesale demand items"
- 5 product cards with image, name, location, stock count, price in green:
  1. Jaquar Ceramic Disc Basin... — Jaquar · Stock: 140 — ₹3,450
  2. Kohler Artifacts Wall Moun... — Kohler · Stock: 45 — ₹8,900
  3. Greenlam 1mm Textured Su... — Greenlam · Stock: 320 — ₹1,850
  4. CenturyPly Club Prime BW... — CenturyPly · Stock: 210 — ₹4,600
  5. Godrej Stainless Steel Morti... — Godrej · Stock: 180 — ₹2,750

---

## 5. Orders Table (Image 3)
### 5.1 Recent Wholesale Orders
- Columns: Order Number, Shop Name (with owner name below), City, Date, Total Amount (green), Status (badge), Action (View Invoice button)
- Rows:
  - ORD-89241 | Apex Hardware & Sanitaryware / Rajesh Kumar | Mumbai | 2026-07-28 14:30 | ₹62,422 | Delivered | View Invoice
  - ORD-89238 | National Timber & Plywood Depot / Suresh Patel | Mumbai | 2026-07-27 11:15 | ₹1,74,050 | Confirmed | View Invoice
  - ORD-89220 | Royal Bath Fittings & Tiles / Anil Sharma | Delhi NCR | 2026-07-25 09:45 | ₹84,016 | Delivered | View Invoice
  - ORD-89215 | Capital Construction Supplies / Vikas Gupta | Delhi NCR | 2026-07-24 16:20 | ₹92,040 | Pending (orange) | View Invoice
  - ORD-89210 | Deccan Interior Hardware / Karthik Reddy | Bangalore | 2026-07-28 17:10 | ₹88,795 | Pending (orange) | View Invoice

---

## 6. Design Tokens (Updated from Images)
| Token | Value |
|-------|-------|
| Sidebar BG | `#1a1b2f` |
| Accent Green | `#4CAF50` |
| Card BG | `#ffffff` |
| Page BG | `#f4f5f8` |
| Text Primary | `#1a1a2e` |
| Text Muted | `#6b6b7b` |
| Status Delivered | `#e8f5e9` / `#2e7d32` |
| Status Confirmed | `#e3f2fd` / `#1565c0` |
| Status Pending | `#fff3e0` / `#e65100` |

---

## 7. Success Criteria
- Admin page renders with exact layout from images (sidebar, stat cards, chart, products, orders table).
- All monetary values use INR (₹) format.
- Sidebar navigation matches image exactly (items + counts + active state).
- Charts and tables visible without errors.

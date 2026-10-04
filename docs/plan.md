# Build Plan — Sunglobalimpex B2B Distributor Admin Portal

Reference Images: Sunglobalimpex Distributor Portal (3 screenshots)
Theme: Dark sidebar (#1a1a2e / near-black), green accent (#4CAF50), white cards on light gray bg.

---

## Phase 1: Admin Page (First Milestone)
| # | Task | File(s) | Status |
|---|------|---------|--------|
| 1.1 | Update docs (plan, PRD, TRD) to match images | docs/ | Done |
| 1.2 | Create admin layout (dark sidebar + header) | app/admin/layout.tsx | Done |
| 1.3 | Build Dashboard with stat cards (INR) | app/admin/page.tsx | Done |
| 1.4 | Add sidebar navigation (Dashboard, Products, Categories, Cities, Shops, Orders, Reports, Settings) | components/Sidebar.tsx | Done |
| 1.5 | Add chart component (Wholesale Sales Trend) | app/admin/page.tsx | Done |
| 1.6 | Add products list + orders table | app/admin/page.tsx, app/admin/products/page.tsx | Done |

---

## Phase 2: Full Admin Features
| # | Task | File(s) | Status |
|---|------|---------|--------|
| 2.1 | Recent Wholesale Orders table | app/admin/page.tsx | Done |
| 2.2 | Top Selling Products cards | app/admin/page.tsx | Done |
| 2.3 | Admin header (B2B banner + Admin Panel button) | components/AdminHeader.tsx | Done |
| 2.4 | Product CRUD (search, filter, add/edit modal, delete) | app/admin/products/page.tsx | Done |
| 2.5 | Stub pages for remaining nav sections | app/admin/{categories,cities,shops,orders,reports,settings}/ | Done |

---

## Design System (From Images)
- Sidebar BG: `#18182f` (dark navy/black)
- Accent: `#4CAF50` (green)
- Card BG: `#ffffff`
- Main BG: `#f6f7fa` (light gray)
- Font: Geist (clean sans-serif)
- Logo: Sunglobalimpex + DISTRIBUTOR label

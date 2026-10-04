"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Grid3X3, Building2, Store, ShoppingCart, Wallet, FileBarChart, Settings, X } from "lucide-react";
import { useAdminData } from "./AdminDataProvider";

export default function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { products, cities, shops, orders, expenses } = useAdminData();
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, count: null as number | null },
    { label: "Products", href: "/admin/products", icon: Package, count: products.length },
    { label: "Categories", href: "/admin/categories", icon: Grid3X3, count: null },
    { label: "Cities", href: "/admin/cities", icon: Building2, count: cities.length },
    { label: "Shops", href: "/admin/shops", icon: Store, count: shops.length },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart, count: pendingCount },
    { label: "Expenses", href: "/admin/expenses", icon: Wallet, count: expenses.length },
    { label: "Reports", href: "/admin/reports", icon: FileBarChart, count: null },
    { label: "Settings", href: "/admin/settings", icon: Settings, count: null },
  ];
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#1a1b2f] text-white flex flex-col z-50 transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#4CAF50] flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg leading-tight">Sunglobalimpex</h2>
              <p className="text-xs text-gray-400">DISTRIBUTOR</p>
            </div>
            {onClose && (
              <button onClick={onClose} className="lg:hidden p-1.5 text-gray-400 hover:text-white transition-colors" aria-label="Close menu">
                <X size={18} />
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">Wholesale Materials & Supplies</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2 px-3">Distributor Portal</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/admin" ? pathname === "/admin" : (pathname === item.href || pathname?.startsWith(item.href + "/"));
            return (
              <Link key={item.label} href={item.href} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-[#4CAF50]/10 text-[#4CAF50] font-medium border-l-2 border-[#4CAF50]" : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}>
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.count !== null && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.count > 0 && item.label === "Orders" ? "bg-orange-500/20 text-orange-400" : "bg-white/10 text-gray-300"}`}>
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mx-3 mb-4 bg-[#23233a] rounded-xl border border-white/5">
          <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-3">Active Network</h4>
          <div className="flex items-center gap-2 text-sm text-white mb-1">
            <Building2 size={16} className="text-[#4CAF50]" />
            <span className="font-bold">{cities.length}</span>
            <span className="text-xs text-gray-400">Cities Covered</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white">
            <Store size={16} className="text-[#4CAF50]" />
            <span className="font-bold">{shops.length}</span>
            <span className="text-xs text-gray-400">Partner Shops</span>
          </div>
        </div>
      </aside>
    </>
  );
}

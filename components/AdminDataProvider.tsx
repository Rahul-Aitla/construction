"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { Category, City, Order, OrderStatus, PortalSettings, Product, Shop, Toast } from "@/lib/types";
import { seedCategories, seedCities, seedOrders, seedProducts, seedShops, defaultSettings } from "@/lib/data";

interface AdminData {
  products: Product[];
  categories: Category[];
  cities: City[];
  shops: Shop[];
  orders: Order[];
  settings: PortalSettings;
  toasts: Toast[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: number) => void;
  addCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateShopDetails: (s: Shop) => void;
  saveSettings: (s: PortalSettings) => void;
  addToast: (title: string, message?: string, variant?: Toast["variant"]) => void;
  removeToast: (id: number) => void;
}

interface PersistedData {
  products: Product[];
  categories: Category[];
  shops: Shop[];
  orders: Order[];
  settings: PortalSettings;
}

const AdminDataContext = createContext<AdminData | null>(null);

const STORAGE_KEYS: Record<keyof PersistedData, string> = {
  products: "sunglobalimpex_products",
  categories: "sunglobalimpex_categories",
  shops: "sunglobalimpex_shops",
  orders: "sunglobalimpex_orders",
  settings: "sunglobalimpex_settings",
};

const seedData: PersistedData = {
  products: seedProducts,
  categories: seedCategories,
  shops: seedShops,
  orders: seedOrders,
  settings: defaultSettings,
};

function loadPersisted(): PersistedData {
  const out = { ...seedData };
  if (typeof window === "undefined") return out;
  for (const key of Object.keys(STORAGE_KEYS) as (keyof PersistedData)[]) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS[key]);
      if (raw) (out as Record<string, unknown>)[key] = JSON.parse(raw);
    } catch { /* corrupted entry — fall back to seed */ }
  }
  return out;
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used inside AdminDataProvider");
  return ctx;
}

export default function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PersistedData>(seedData);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Hydrate persisted state from localStorage once on mount (post-SSR to avoid mismatch).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hydration
    setData(loadPersisted());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    for (const key of Object.keys(STORAGE_KEYS) as (keyof PersistedData)[]) {
      localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data[key]));
    }
  }, [hydrated, data]);

  const patch = <K extends keyof PersistedData>(key: K, fn: (prev: PersistedData[K]) => PersistedData[K]) =>
    setData((d) => ({ ...d, [key]: fn(d[key]) }));

  const addToast = (title: string, message?: string, variant: Toast["variant"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, message, variant }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const value: AdminData = {
    ...data,
    cities: seedCities,
    toasts,
    addProduct: (p) => patch("products", (prev) => [...prev, p]),
    updateProduct: (p) => patch("products", (prev) => prev.map((x) => (x.id === p.id ? p : x))),
    deleteProduct: (id) => patch("products", (prev) => prev.filter((x) => x.id !== id)),
    addCategory: (c) => patch("categories", (prev) => [...prev, c]),
    deleteCategory: (id) => patch("categories", (prev) => prev.filter((x) => x.id !== id)),
    updateOrderStatus: (id, status) => patch("orders", (prev) => prev.map((o) => (o.id === id ? { ...o, status } : o))),
    updateShopDetails: (s) => patch("shops", (prev) => prev.map((x) => (x.id === s.id ? s : x))),
    saveSettings: (s) => patch("settings", () => s),
    addToast,
    removeToast: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
  };

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

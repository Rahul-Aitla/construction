"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Store, ShoppingCart, TrendingUp, MapPin, Phone, Mail } from "lucide-react";
import { useAdminData } from "@/components/AdminDataProvider";
import type { City } from "@/lib/types";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function CitiesPage() {
  const { cities, shops, orders } = useAdminData();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const cityStats = (cityId: string) => {
    const cityShops = shops.filter((s) => s.cityId === cityId);
    const cityOrders = orders.filter((o) => o.cityId === cityId);
    return {
      shopCount: cityShops.length,
      orderCount: cityOrders.length,
      sales: cityOrders.reduce((s, o) => s + o.grandTotal, 0) + cityShops.reduce((s, x) => s + x.totalSales, 0),
    };
  };

  if (selectedCity) {
    const cityShops = shops.filter((s) => s.cityId === selectedCity.id);
    const stats = cityStats(selectedCity.id);
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedCity(null)} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">
          <ArrowLeft size={16} /> All Cities
        </button>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="relative h-40">
            <Image src={selectedCity.image} alt={selectedCity.name} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span className="text-[10px] bg-[#4CAF50] text-white px-2 py-0.5 rounded font-bold tracking-wider">{selectedCity.code}</span>
              <h1 className="text-2xl font-extrabold text-white mt-1">{selectedCity.name}</h1>
              <p className="text-xs text-gray-200">{selectedCity.state} · Assigned Logistics City Hub</p>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            <div className="p-4 text-center"><div className="text-xl font-extrabold text-[#1a1b2f]">{stats.shopCount}</div><div className="text-[11px] text-gray-400 uppercase tracking-wide">Shops</div></div>
            <div className="p-4 text-center"><div className="text-xl font-extrabold text-[#1a1b2f]">{stats.orderCount}</div><div className="text-[11px] text-gray-400 uppercase tracking-wide">Total City Orders</div></div>
            <div className="p-4 text-center"><div className="text-xl font-extrabold text-[#2e7d32]">{inr(stats.sales)}</div><div className="text-[11px] text-gray-400 uppercase tracking-wide">Total Sales</div></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-[#1a1b2f] text-lg">Registered Partner Shops</h3>
            <p className="text-xs text-gray-400">Dealers operating in {selectedCity.name}</p>
          </div>
          {cityShops.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No registered shops found in this city yet.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cityShops.map((s) => (
                <div key={s.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                    <Store size={18} className="text-[#4CAF50]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#1a1b2f]">{s.name}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> {s.address}</div>
                  </div>
                  <div className="hidden md:block text-xs text-gray-500">
                    <div className="flex items-center gap-1.5"><Phone size={10} /> {s.phone}</div>
                    <div className="flex items-center gap-1.5"><Mail size={10} /> {s.email}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-[#2e7d32]">{inr(s.totalSales)}</div>
                    <div className="text-[11px] text-gray-400">{s.totalOrders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Distribution Cities</h1>
        <p className="text-sm text-gray-500">Registered wholesale shops & local logistics overview ({cities.length} cities).</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((c) => {
          const stats = cityStats(c.id);
          return (
            <button key={c.id} onClick={() => setSelectedCity(c)} className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden text-left hover:shadow-md hover:border-[#4CAF50]/30 transition-all group">
              <div className="relative h-32">
                <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 1024px) 50vw, 33vw" />
                <span className="absolute top-3 right-3 text-[10px] bg-[#1a1b2f]/80 text-white px-2 py-0.5 rounded font-bold tracking-wider">{c.code}</span>
              </div>
              <div className="p-4">
                <div className="font-bold text-[#1a1b2f]">{c.name}</div>
                <div className="text-xs text-gray-400 mb-3">{c.state}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-500"><Store size={12} className="text-[#4CAF50]" /> {stats.shopCount} shops</span>
                  <span className="flex items-center gap-1.5 text-gray-500"><ShoppingCart size={12} className="text-[#4CAF50]" /> {stats.orderCount} orders</span>
                  <span className="flex items-center gap-1.5 font-semibold text-[#2e7d32]"><TrendingUp size={12} /> {inr(stats.sales)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

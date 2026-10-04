"use client";
import { useState } from "react";
import { ArrowLeft, Pencil, X, Check, ShieldCheck, History, MapPin, Phone, Mail, CreditCard, AlertTriangle } from "lucide-react";
import { useAdminData } from "@/components/AdminDataProvider";
import type { Shop } from "@/lib/types";

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Confirmed: "bg-blue-50 text-blue-700",
  Pending: "bg-orange-50 text-orange-700",
  Cancelled: "bg-red-50 text-red-600",
};
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]";

export default function ShopsPage() {
  const { shops, cities, orders, updateShopDetails, addToast } = useAdminData();
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [editShop, setEditShop] = useState<Shop | null>(null);
  const [form, setForm] = useState({ name: "", ownerName: "", phone: "", email: "", address: "", cityId: "", creditLimit: "" });

  const shop = selectedShopId ? shops.find((s) => s.id === selectedShopId) ?? null : null;
  const shopOrders = shop ? orders.filter((o) => o.shopId === shop.id) : [];

  const openEdit = (s: Shop) => {
    setForm({ name: s.name, ownerName: s.ownerName, phone: s.phone, email: s.email, address: s.address, cityId: s.cityId, creditLimit: String(s.creditLimit) });
    setEditShop(s);
  };

  const handleSave = () => {
    if (!editShop) return;
    if (!form.name.trim() || !form.ownerName.trim()) { alert("Shop name and owner name are required."); return; }
    const city = cities.find((c) => c.id === form.cityId);
    updateShopDetails({ ...editShop, name: form.name.trim(), ownerName: form.ownerName.trim(), phone: form.phone.trim(), email: form.email.trim(), address: form.address.trim(), cityId: form.cityId, cityName: city?.name ?? editShop.cityName, creditLimit: Number(form.creditLimit) || 0 });
    addToast("Shop Details Updated", "Registered shop profile updated successfully.");
    setEditShop(null);
  };

  const creditBar = (s: Shop) => {
    const pct = Math.min(100, Math.round((s.creditUsed / s.creditLimit) * 100));
    return (
      <div className="min-w-[120px]">
        <div className="flex justify-between text-[11px] mb-1">
          <span className="text-gray-500">{inr(s.creditUsed)} / {inr(s.creditLimit)}</span>
          <span className={pct > 80 ? "text-orange-600 font-semibold" : "text-gray-400"}>{pct}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${pct > 80 ? "bg-orange-500" : "bg-[#4CAF50]"}`} style={{ width: `${pct}%` }} />
        </div>
        {pct > 80 && <div className="flex items-center gap-1 text-[10px] text-orange-600 font-semibold mt-1"><AlertTriangle size={10} /> Credit Limit Exceeded</div>}
      </div>
    );
  };

  if (shop) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedShopId(null)} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#4CAF50] transition-colors">
          <ArrowLeft size={16} /> All Shops
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#4CAF50] flex items-center justify-center shadow-lg shadow-[#4CAF50]/20">
                <ShieldCheck size={26} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-[#1a1b2f]">{shop.name}</h1>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Verified B2B Dealer</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Registered B2B Partner Dealer Profile & Full Order Ledger · Member Since: {shop.registeredDate}</p>
              </div>
            </div>
            <button onClick={() => openEdit(shop)} className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-gray-200 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors">
              <Pencil size={14} /> Shop Details
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#f8fafc] rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1"><Phone size={10} /> Owner & Phone</div><div className="text-sm font-semibold text-[#1a1b2f] mt-1">{shop.ownerName}</div><div className="text-xs text-gray-500">{shop.phone}</div></div>
            <div className="bg-[#f8fafc] rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1"><Mail size={10} /> Email & GSTIN</div><div className="text-sm font-semibold text-[#1a1b2f] mt-1 truncate" title={shop.email}>{shop.email}</div><div className="text-xs text-gray-500 font-mono">{shop.gstin}</div></div>
            <div className="bg-[#f8fafc] rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1"><MapPin size={10} /> Address</div><div className="text-xs text-gray-500 mt-1">{shop.address}, {shop.cityName}</div></div>
            <div className="bg-[#f8fafc] rounded-xl p-4"><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1"><CreditCard size={10} /> Available Credit</div><div className="mt-1">{creditBar(shop)}</div></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="rounded-xl border border-gray-100 p-4"><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Lifetime Orders</div><div className="text-2xl font-extrabold text-[#1a1b2f]">{shop.totalOrders}</div></div>
            <div className="rounded-xl border border-gray-100 p-4"><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Lifetime Spend</div><div className="text-2xl font-extrabold text-[#2e7d32]">{inr(shop.totalSales)}</div></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-[#1a1b2f] text-lg">Order history for {shop.name}</h3>
            <p className="text-xs text-gray-400">{shopOrders.length} orders on record</p>
          </div>
          {shopOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No orders recorded for this shop yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm text-left">
                <thead className="text-xs uppercase text-gray-400 bg-gray-50/50 font-semibold">
                  <tr><th className="px-6 py-3">Order #</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Items</th><th className="px-6 py-3">Total</th><th className="px-6 py-3">Payment</th><th className="px-6 py-3">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {shopOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#1a1b2f]">{o.orderNumber}</td>
                      <td className="px-6 py-4 text-xs text-gray-400">{o.createdAt}</td>
                      <td className="px-6 py-4 text-gray-600">{o.items.length}</td>
                      <td className="px-6 py-4 font-bold text-[#2e7d32]">{inr(o.grandTotal)}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">{o.paymentMethod}</td>
                      <td className="px-6 py-4"><span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[o.status]}`}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Registered Partner Shops</h1>
        <p className="text-sm text-gray-500">Directory of registered construction & interior material retail shops ({shops.length} dealers).</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-sm text-left">
            <thead className="text-xs uppercase text-gray-400 bg-gray-50/50 font-semibold">
              <tr>
                <th className="px-5 py-3">Shop Name</th>
                <th className="px-5 py-3">Owner & Phone</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">Credit Line</th>
                <th className="px-5 py-3">Lifetime Orders</th>
                <th className="px-5 py-3">Lifetime Spend</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {shops.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-[#1a1b2f]">{s.name}</div>
                    <div className="text-[11px] text-gray-400 font-mono">{s.gstin}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-[#1a1b2f]">{s.ownerName}</div>
                    <div className="text-xs text-gray-400">{s.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{s.cityName}</td>
                  <td className="px-5 py-4">{creditBar(s)}</td>
                  <td className="px-5 py-4 font-semibold text-[#1a1b2f]">{s.totalOrders}</td>
                  <td className="px-5 py-4 font-bold text-[#2e7d32]">{inr(s.totalSales)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelectedShopId(s.id)} className="inline-flex items-center gap-1.5 bg-[#1a1b2f] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#23233a] transition-colors whitespace-nowrap">
                        <History size={12} /> View Orders
                      </button>
                      <button onClick={() => openEdit(s)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-[#1a1b2f] transition-colors" title="Edit"><Pencil size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editShop && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditShop(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-xl font-extrabold text-[#1a1b2f]">Shop Details</h2>
              <button onClick={() => setEditShop(null)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Shop Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Shop Owner Name</label><input value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} className={inputCls} /></div>
                <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Contact Phone Number</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} /></div>
              </div>
              <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Email Address</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} /></div>
              <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Full Street & Shop Address</label><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputCls} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Assigned Logistics City Hub</label>
                  <select value={form.cityId} onChange={(e) => setForm({ ...form, cityId: e.target.value })} className={inputCls + " cursor-pointer"}>
                    {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Credit Limit (₹)</label><input type="number" min="0" value={form.creditLimit} onChange={(e) => setForm({ ...form, creditLimit: e.target.value })} className={inputCls} /></div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-[#f8fafc] flex justify-end gap-3">
              <button onClick={() => setEditShop(null)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors shadow-lg shadow-[#4CAF50]/20 flex items-center gap-1.5"><Check size={16} /> Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

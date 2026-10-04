"use client";
import { useState } from "react";
import { Save, Building2, CreditCard, BellRing, BadgeCheck } from "lucide-react";
import { useAdminData } from "@/components/AdminDataProvider";

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-[#4CAF50]" : "bg-gray-200"}`} aria-pressed={checked}>
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { settings, saveSettings, addToast } = useAdminData();
  const [form, setForm] = useState({ ...settings, deliveryCharge: String(settings.deliveryCharge) });

  const handleSave = () => {
    const deliveryCharge = Number(form.deliveryCharge);
    if (Number.isNaN(deliveryCharge) || deliveryCharge < 0) { alert("Delivery charge must be a valid non-negative number."); return; }
    saveSettings({ ...form, deliveryCharge });
    addToast("Settings Saved", "Distributor portal settings updated successfully.");
  };

  const toggleRow = (label: string, description: string, key: "codEnabled" | "creditEnabled" | "notificationsEnabled", icon: typeof BellRing) => {
    const Icon = icon;
    return (
      <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0"><Icon size={16} className="text-gray-500" /></div>
          <div>
            <div className="text-sm font-semibold text-[#1a1b2f]">{label}</div>
            <div className="text-xs text-gray-400">{description}</div>
          </div>
        </div>
        <Toggle checked={form[key]} onChange={(v) => setForm({ ...form, [key]: v })} />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Admin Management</h1>
        <p className="text-sm text-gray-500">Portal configuration & distributor account preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Profile */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6">
          <h3 className="font-bold text-[#1a1b2f] text-lg mb-1 flex items-center gap-2"><Building2 size={18} className="text-[#4CAF50]" /> Business Profile</h3>
          <p className="text-xs text-gray-400 mb-5">Contact & warehouse address shown to partner shops.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Distributor Business Name</label>
              <input value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Distributor GSTIN</label>
                <input value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value })} className={inputCls + " font-mono"} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Registered Phone Number</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Official Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Warehouse / Shop Address</label>
              <textarea value={form.warehouseAddress} onChange={(e) => setForm({ ...form, warehouseAddress: e.target.value })} rows={2} className={inputCls + " resize-none"} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Distributor Delivery Charge (₹)</label>
              <input type="number" min="0" value={form.deliveryCharge} onChange={(e) => setForm({ ...form, deliveryCharge: e.target.value })} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Payment & Notifications */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6">
            <h3 className="font-bold text-[#1a1b2f] text-lg mb-1 flex items-center gap-2"><CreditCard size={18} className="text-[#4CAF50]" /> Payment Options</h3>
            <p className="text-xs text-gray-400 mb-2">Methods offered to shops at checkout.</p>
            {toggleRow("Enable Cash on Delivery (COD) Payment Option", "Verified COD collection on delivery", "codEnabled", BadgeCheck)}
            {toggleRow("Enable Dealer Line of Credit (Net 30) Billing", "Shops bill against approved credit limit", "creditEnabled", CreditCard)}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6">
            <h3 className="font-bold text-[#1a1b2f] text-lg mb-1 flex items-center gap-2"><BellRing size={18} className="text-[#4CAF50]" /> Notifications</h3>
            <p className="text-xs text-gray-400 mb-2">Admin alerting preferences.</p>
            {toggleRow("Send Instant SMS / Email Notifications to Admin on New Orders", "Immediate alerts for wholesale placements", "notificationsEnabled", BellRing)}
          </div>

          <button onClick={handleSave} className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#43a047] transition-colors shadow-lg shadow-[#4CAF50]/20">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

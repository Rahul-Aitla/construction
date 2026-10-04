"use client";
import { useState } from "react";
import { Search, Plus, Pencil, Trash2, X, Check, Download, Wallet, TrendingDown, PieChart as PieIcon, Scale } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAdminData } from "@/components/AdminDataProvider";
import { expenseCategories } from "@/lib/data";
import { inr, inrShort } from "@/lib/format";
import type { Expense } from "@/lib/types";

const PIE_COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", "#00BCD4", "#795548"];
const paymentModes = ["Cash", "UPI", "Bank Transfer", "Credit Card", "Cheque"];
const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]";
const defaultForm = { date: new Date().toISOString().slice(0, 10), category: "Logistics", vendor: "", amount: "", paymentMode: "UPI", notes: "" };

export default function ExpensesPage() {
  const { expenses, orders, addExpense, updateExpense, deleteExpense, addToast } = useAdminData();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [form, setForm] = useState({ ...defaultForm });

  const filtered = expenses
    .filter((e) => {
      const s = search.toLowerCase();
      const matchSearch = e.vendor.toLowerCase().includes(s) || (e.notes ?? "").toLowerCase().includes(s) || e.category.toLowerCase().includes(s);
      const matchCat = categoryFilter === "All Categories" || e.category === categoryFilter;
      return matchSearch && matchCat;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthTotal = expenses.filter((e) => e.date.startsWith(thisMonth)).reduce((s, e) => s + e.amount, 0);
  const revenue = orders.reduce((s, o) => s + o.grandTotal, 0);
  const profit = revenue - totalExpenses;
  const topCategory = expenseCategories
    .map((c) => ({ c, total: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0) }))
    .sort((a, b) => b.total - a.total)[0];

  const categoryData = expenseCategories
    .map((c) => ({ name: c, value: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0) }))
    .filter((d) => d.value > 0);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyData = monthNames.map((m, i) => ({
    name: m,
    amount: expenses.filter((e) => Number(e.date.slice(5, 7)) === i + 1).reduce((s, e) => s + e.amount, 0),
  }));

  const openAdd = () => { setEditing(null); setForm({ ...defaultForm }); setShowModal(true); };
  const openEdit = (e: Expense) => {
    setEditing(e);
    setForm({ date: e.date, category: e.category, vendor: e.vendor, amount: String(e.amount), paymentMode: e.paymentMode, notes: e.notes ?? "" });
    setShowModal(true);
  };

  const handleSave = () => {
    const amount = Number(form.amount);
    if (!form.vendor.trim()) { alert("Vendor / payee name is required."); return; }
    if (Number.isNaN(amount) || amount <= 0) { alert("Amount must be a valid positive number."); return; }
    const record = { date: form.date, category: form.category, vendor: form.vendor.trim(), amount, paymentMode: form.paymentMode, notes: form.notes.trim() || undefined };
    if (editing) {
      updateExpense({ ...record, id: editing.id });
      addToast("Expense Updated", `${record.vendor} — ${inr(amount)}`);
    } else {
      addExpense({ ...record, id: `exp-${Date.now()}` });
      addToast("Expense Added", `${record.vendor} — ${inr(amount)}`);
    }
    setShowModal(false);
  };

  const handleDelete = (e: Expense) => {
    if (confirm(`Delete expense "${e.vendor}" (${inr(e.amount)})?`)) {
      deleteExpense(e.id);
      addToast("Expense Deleted", `${e.vendor} removed.`);
    }
  };

  const exportCsv = () => {
    const header = "Date,Category,Vendor,Amount,Payment Mode,Notes\n";
    const rows = filtered.map((e) => [e.date, `"${e.category}"`, `"${e.vendor}"`, e.amount, `"${e.paymentMode}"`, `"${e.notes ?? ""}"`].join(",")).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sunglobalimpex-expenses-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast("Report Exported", "Expenses CSV exported successfully.");
  };

  const stats = [
    { label: "THIS MONTH'S EXPENSES", value: inr(monthTotal), sub: `${expenses.filter((e) => e.date.startsWith(thisMonth)).length} entries this month`, icon: Wallet },
    { label: "TOTAL EXPENSES", value: inr(totalExpenses), sub: "All recorded outflows", icon: TrendingDown },
    { label: "TOP CATEGORY", value: topCategory?.c ?? "—", sub: topCategory ? `${inr(topCategory.total)} spent` : "—", icon: PieIcon },
    { label: "ESTIMATED PROFIT", value: inr(profit), sub: `Revenue ${inr(revenue)} − expenses`, icon: Scale, highlight: profit < 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Business Expenses</h1>
          <p className="text-sm text-gray-500">Track warehouse, logistics & operational outflows ({expenses.length} entries).</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCsv} className="bg-white border border-gray-200 text-[#1a1b2f] px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={openAdd} className="bg-[#4CAF50] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#43a047] transition-colors shadow-lg shadow-[#4CAF50]/20 text-sm">
            <Plus size={16} /> Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50 ${s.highlight ? "ring-1 ring-red-200" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{s.label}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.highlight ? "bg-red-50" : "bg-gray-50"}`}><Icon size={16} className={s.highlight ? "text-red-500" : "text-gray-400"} /></div>
              </div>
              <div className="text-3xl font-extrabold text-[#1a1b2f]">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
          <h3 className="font-bold text-[#1a1b2f] text-lg">Expenses by Category</h3>
          <p className="text-xs text-gray-400 mb-4">Where the money is going</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3} strokeWidth={0}>
                  {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => [inr(Number(v)), "Spent"]} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
          <h3 className="font-bold text-[#1a1b2f] text-lg">Monthly Expense Trend</h3>
          <p className="text-xs text-gray-400 mb-4">Outflows per month</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={inrShort} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={56} />
                <Tooltip formatter={(v) => [inr(Number(v)), "Expenses"]} cursor={{ fill: "#f4f5f8" }} />
                <Bar dataKey="amount" fill="#F44336" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendor, notes, category..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] transition-all" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="sm:w-64 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] cursor-pointer">
          <option>All Categories</option>
          {expenseCategories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-sm text-left">
            <thead className="text-xs uppercase text-gray-400 bg-gray-50/50 font-semibold">
              <tr>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Vendor / Payee</th>
                <th className="px-5 py-3">Payment Mode</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">{e.date}</td>
                  <td className="px-5 py-4"><span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">{e.category}</span></td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-[#1a1b2f]">{e.vendor}</div>
                    {e.notes && <div className="text-xs text-gray-400">{e.notes}</div>}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{e.paymentMode}</td>
                  <td className="px-5 py-4 font-bold text-red-600">{inr(e.amount)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(e)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-[#1a1b2f] transition-colors" title="Edit"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(e)} className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No expenses found.</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-xl font-extrabold text-[#1a1b2f]">{editing ? "Edit Expense" : "Add Expense"}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Date</label><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} /></div>
                <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Amount (₹)</label><input type="number" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="5000" className={inputCls} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls + " cursor-pointer"}>
                    {expenseCategories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Payment Mode</label>
                  <select value={form.paymentMode} onChange={(e) => setForm({ ...form, paymentMode: e.target.value })} className={inputCls + " cursor-pointer"}>
                    {paymentModes.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Vendor / Payee</label><input value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} placeholder="e.g. Sharma Transport Co." className={inputCls} /></div>
              <div><label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Notes (Optional)</label><input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="e.g. Mumbai dispatch fuel" className={inputCls} /></div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-[#f8fafc] flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors shadow-lg shadow-[#4CAF50]/20 flex items-center gap-1.5"><Check size={16} /> {editing ? "Update Expense" : "Save Expense"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

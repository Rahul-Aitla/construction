"use client";
import { Download, TrendingUp, ShoppingCart, Receipt, Store } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useAdminData } from "@/components/AdminDataProvider";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const inrShort = (n: number) => (n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`);
const PIE_COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", "#00BCD4", "#795548", "#607D8B", "#E91E63", "#3F51B5"];

export default function ReportsPage() {
  const { orders, cities, categories, shops, addToast } = useAdminData();

  const totalRevenue = orders.reduce((s, o) => s + o.grandTotal, 0);
  const aov = orders.length ? totalRevenue / orders.length : 0;

  const cityData = cities.map((c) => ({
    name: c.name,
    sales: orders.filter((o) => o.cityId === c.id).reduce((s, o) => s + o.grandTotal, 0),
  })).sort((a, b) => b.sales - a.sales);

  const categoryData = categories.map((c) => ({
    name: c.name,
    value: orders.flatMap((o) => o.items).filter((i) => i.category === c.name).reduce((s, i) => s + i.totalPrice, 0),
  })).filter((c) => c.value > 0).sort((a, b) => b.value - a.value);

  const stats = [
    { label: "TOTAL REVENUE", value: inr(totalRevenue), sub: "All confirmed network sales", icon: TrendingUp },
    { label: "TOTAL ORDERS", value: String(orders.length), sub: "Total network volume", icon: ShoppingCart },
    { label: "AVERAGE ORDER VALUE (AOV)", value: inr(Math.round(aov)), sub: "Per wholesale fulfillment", icon: Receipt },
    { label: "PARTNER SHOPS", value: String(shops.length), sub: "Across " + cities.length + " city hubs", icon: Store },
  ];

  const exportCsv = () => {
    const header = "Order Number,Shop,Owner,City,Date,Subtotal,GST,Grand Total,Payment Method,Status\n";
    const rows = orders.map((o) =>
      [o.orderNumber, `"${o.shopName}"`, `"${o.ownerName}"`, o.cityName, o.createdAt, o.subtotal, o.gstAmount, o.grandTotal, `"${o.paymentMethod}"`, o.status].join(",")
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `buildpro-wholesale-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast("Report Exported", "Wholesale Sales Report CSV exported successfully.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Distribution Reports</h1>
          <p className="text-sm text-gray-500">Sales analytics & tax compliance log ready.</p>
        </div>
        <button onClick={exportCsv} className="bg-[#4CAF50] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#43a047] transition-colors shadow-lg shadow-[#4CAF50]/20">
          <Download size={16} /> Export CSV Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{s.label}</span>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center"><Icon size={16} className="text-gray-400" /></div>
              </div>
              <div className="text-3xl font-extrabold text-[#1a1b2f]">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
          <h3 className="font-bold text-[#1a1b2f] text-lg">Regional Sales Volume by City</h3>
          <p className="text-xs text-gray-400 mb-4">Wholesale revenue per logistics hub</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={inrShort} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={56} />
                <Tooltip formatter={(v) => [inr(Number(v)), "Sales"]} cursor={{ fill: "#f4f5f8" }} />
                <Bar dataKey="sales" fill="#4CAF50" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
          <h3 className="font-bold text-[#1a1b2f] text-lg">Category Revenue Share</h3>
          <p className="text-xs text-gray-400 mb-4">Order value split by department</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3} strokeWidth={0}>
                  {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => [inr(Number(v)), "Revenue"]} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

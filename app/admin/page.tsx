import { DollarSign, TrendingUp, ShoppingCart, Clock, CheckCircle, Store, Building2, Eye } from "lucide-react";

const stats = [
  { label: "TOTAL SALES", value: "₹5,01,323", sub: "+18.4% from last month", icon: DollarSign },
  { label: "TODAY'S SALES", value: "₹1,51,217", sub: "Real-time daily log", icon: TrendingUp },
  { label: "TOTAL ORDERS", value: "5", sub: "Wholesale fulfillments", icon: ShoppingCart },
  { label: "PENDING ORDERS", value: "1", sub: "Requires approval", icon: Clock, highlight: true },
  { label: "COMPLETED ORDERS", value: "3", sub: "Delivered & cleared", icon: CheckCircle },
  { label: "TOTAL SHOPS", value: "8", sub: "Registered dealers", icon: Store },
  { label: "TOTAL CITIES", value: "6", sub: "Active hubs", icon: Building2 },
];

const products = [
  { rank: "#1", name: "Jaquar Ceramic Disc Basin ...", location: "Jaquar · Stock: 140", price: "₹3,450", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=100&q=80" },
  { rank: "#2", name: "Kohler Artifacts Wall Moun...", location: "Kohler · Stock: 45", price: "₹8,900", img: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=100&q=80" },
  { rank: "#3", name: "Greenlam 1mm Textured Su...", location: "Greenlam · Stock: 320", price: "₹1,850", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&q=80" },
  { rank: "#4", name: "CenturyPly Club Prime BW...", location: "CenturyPly · Stock: 210", price: "₹4,600", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&q=80" },
  { rank: "#5", name: "Godrej Stainless Steel Morti...", location: "Godrej · Stock: 180", price: "₹2,750", img: "https://images.unsplash.com/photo-1567225557596-e4f46b1f7e1f?w=100&q=80" },
];

const orders = [
  { id: "ORD-89241", shop: "Apex Hardware & Sanitaryware", owner: "Rajesh Kumar", city: "Mumbai", date: "2026-07-28 14:30", amount: "₹62,422", status: "Delivered", statusStyle: "bg-emerald-50 text-emerald-700" },
  { id: "ORD-89238", shop: "National Timber & Plywood Depot", owner: "Suresh Patel", city: "Mumbai", date: "2026-07-27 11:15", amount: "₹1,74,050", status: "Confirmed", statusStyle: "bg-blue-50 text-blue-700" },
  { id: "ORD-89220", shop: "Royal Bath Fittings & Tiles", owner: "Anil Sharma", city: "Delhi NCR", date: "2026-07-25 09:45", amount: "₹84,016", status: "Delivered", statusStyle: "bg-emerald-50 text-emerald-700" },
  { id: "ORD-89215", shop: "Capital Construction Supplies", owner: "Vikas Gupta", city: "Delhi NCR", date: "2026-07-24 16:20", amount: "₹92,040", status: "Pending", statusStyle: "bg-orange-50 text-orange-700" },
  { id: "ORD-89210", shop: "Deccan Interior Hardware", owner: "Karthik Reddy", city: "Bangalore", date: "2026-07-28 17:10", amount: "₹88,795", status: "Pending", statusStyle: "bg-orange-50 text-orange-700" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Distributor Overview</h1>
        <p className="text-sm text-gray-500">Wholesale materials distribution performance & active partner metrics.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50 relative overflow-hidden ${s.highlight ? "ring-1 ring-orange-200" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{s.label}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.highlight ? "bg-orange-50" : "bg-gray-50"}`}>
                  <Icon size={16} className={`${s.highlight ? "text-orange-500" : "text-gray-400"}`} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#1a1b2f]">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Chart + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[#1a1b2f] text-lg">Wholesale Sales Trend</h3>
              <p className="text-xs text-gray-400">Monthly revenue volume in INR</p>
            </div>
            <span className="text-xs font-semibold text-[#4CAF50] border border-[#4CAF50]/20 bg-[#4CAF50]/5 px-3 py-1 rounded-full">FY 2026-27</span>
          </div>
          <div className="relative h-64">
            <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#4CAF50" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M40 160 Q120 150 200 100 T360 60 T520 120 L520 200 L40 200 Z" fill="url(#grad)" />
              <path d="M40 160 Q120 150 200 100 T360 60 T520 120" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
              <circle cx="40" cy="160" r="4" fill="#4CAF50" />
              <circle cx="200" cy="100" r="4" fill="#4CAF50" />
              <circle cx="360" cy="60" r="4" fill="#4CAF50" />
              <circle cx="520" cy="120" r="4" fill="#4CAF50" />
              <text x="40" y="195" fontSize="8" fill="#888">Jan</text>
              <text x="120" y="195" fontSize="8" fill="#888">Feb</text>
              <text x="200" y="195" fontSize="8" fill="#888">Mar</text>
              <text x="280" y="195" fontSize="8" fill="#888">Apr</text>
              <text x="360" y="195" fontSize="8" fill="#888">May</text>
              <text x="440" y="195" fontSize="8" fill="#888">Jun</text>
              <text x="520" y="195" fontSize="8" fill="#888">Jul</text>
            </svg>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
          <h3 className="font-bold text-[#1a1b2f] text-lg mb-1">Top Selling Products</h3>
          <p className="text-xs text-gray-400 mb-4">Highest wholesale demand items</p>
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.rank} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <img src={p.img} alt={p.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-[#1a1b2f] truncate">{p.name}</h4>
                  <p className="text-[11px] text-gray-400">{p.location}</p>
                </div>
                <span className="text-sm font-bold text-[#2e7d32] whitespace-nowrap">{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-[#1a1b2f] text-lg">Recent Wholesale Orders</h3>
          <p className="text-xs text-gray-400">Latest shop orders placed in system</p>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase text-gray-400 bg-gray-50/50 font-semibold">
            <tr>
              <th className="px-6 py-3">Order Number</th>
              <th className="px-6 py-3">Shop Name</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-[#1a1b2f]">{o.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-[#1a1b2f]">{o.shop}</div>
                  <div className="text-xs text-gray-400">{o.owner}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{o.city}</td>
                <td className="px-6 py-4 text-xs text-gray-400">{o.date}</td>
                <td className="px-6 py-4 font-bold text-[#2e7d32]">{o.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${o.statusStyle}`}>{o.status}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="inline-flex items-center gap-1.5 bg-[#1a1b2f] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#23233a] transition-colors">
                    <Eye size={12} /> View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

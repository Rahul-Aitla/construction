"use client";
import { useState } from "react";
import Image from "next/image";
import { DollarSign, TrendingUp, ShoppingCart, Clock, CheckCircle, Store, Building2, Eye } from "lucide-react";
import { useAdminData } from "@/components/AdminDataProvider";
import InvoiceModal from "@/components/InvoiceModal";
import type { Order } from "@/lib/types";

const products = [
  { rank: "#1", name: "Jaquar Ceramic Disc Basin ...", location: "Jaquar · Stock: 140", price: "₹3,450", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=100&q=80" },
  { rank: "#2", name: "Kohler Artifacts Wall Moun...", location: "Kohler · Stock: 45", price: "₹8,900", img: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=100&q=80" },
  { rank: "#3", name: "Greenlam 1mm Textured Su...", location: "Greenlam · Stock: 320", price: "₹1,850", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&q=80" },
  { rank: "#4", name: "CenturyPly Club Prime BW...", location: "CenturyPly · Stock: 210", price: "₹4,600", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&q=80" },
  { rank: "#5", name: "Godrej Stainless Steel Morti...", location: "Godrej · Stock: 180", price: "₹2,750", img: "https://images.unsplash.com/photo-1567225557596-e4f46b1f7e1f?w=100&q=80" },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Confirmed: "bg-blue-50 text-blue-700",
  Pending: "bg-orange-50 text-orange-700",
  Cancelled: "bg-red-50 text-red-600",
};

const salesTrend = [
  { month: "Jan", lakhs: 4.2 },
  { month: "Feb", lakhs: 8.1 },
  { month: "Mar", lakhs: 12.3 },
  { month: "Apr", lakhs: 10.8 },
  { month: "May", lakhs: 18.6 },
  { month: "Jun", lakhs: 24.2 },
  { month: "Jul", lakhs: 27.5 },
];
const yTicks = [0, 7, 14, 21, 28];
const CHART = { w: 640, h: 220, padL: 48, padR: 16, padT: 10, padB: 30 };
const px = (i: number) => CHART.padL + (i * (CHART.w - CHART.padL - CHART.padR)) / (salesTrend.length - 1);
const py = (v: number) => CHART.padT + (1 - v / yTicks[yTicks.length - 1]) * (CHART.h - CHART.padT - CHART.padB);
const pts = salesTrend.map((d, i) => [px(i), py(d.lakhs)] as const);
const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
const baseY = py(0);
const areaPath = `${linePath} L${pts[pts.length - 1][0].toFixed(1)} ${baseY} L${pts[0][0].toFixed(1)} ${baseY} Z`;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function AdminDashboard() {
  const { orders, shops, cities } = useAdminData();
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const totalSales = orders.reduce((s, o) => s + o.grandTotal, 0);
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const completedCount = orders.filter((o) => o.status === "Delivered").length;

  const stats = [
    { label: "TOTAL SALES", value: inr(totalSales), sub: "+18.4% from last month", icon: DollarSign },
    { label: "TODAY'S SALES", value: inr(151217), sub: "Real-time daily log", icon: TrendingUp },
    { label: "TOTAL ORDERS", value: String(orders.length), sub: "Wholesale fulfillments", icon: ShoppingCart },
    { label: "PENDING ORDERS", value: String(pendingCount), sub: "Requires approval", icon: Clock, highlight: pendingCount > 0 },
    { label: "COMPLETED ORDERS", value: String(completedCount), sub: "Delivered & cleared", icon: CheckCircle },
    { label: "TOTAL SHOPS", value: String(shops.length), sub: "Registered dealers", icon: Store },
    { label: "TOTAL CITIES", value: String(cities.length), sub: "Active hubs", icon: Building2 },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Distributor Overview</h1>
        <p className="text-sm text-gray-500">Wholesale materials distribution performance & active partner metrics.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <svg viewBox={`0 0 ${CHART.w} ${CHART.h}`} className="w-full h-auto">
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#4CAF50" stopOpacity="0" />
              </linearGradient>
            </defs>
            {yTicks.map((t) => (
              <g key={t}>
                <line x1={CHART.padL} x2={CHART.w - CHART.padR} y1={py(t)} y2={py(t)} stroke="#eef0f4" strokeWidth="1" />
                <text x={CHART.padL - 8} y={py(t) + 3} fontSize="9" fill="#9ca3af" textAnchor="end">
                  {t === 0 ? "₹0.0" : `₹${t.toFixed(1)}L`}
                </text>
              </g>
            ))}
            <path d={areaPath} fill="url(#salesGrad)" />
            <path d={linePath} fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map((p, i) => (
              <circle key={salesTrend[i].month} cx={p[0]} cy={p[1]} r="4" fill="#4CAF50" stroke="#fff" strokeWidth="1.5" />
            ))}
            {salesTrend.map((d, i) => (
              <text key={d.month} x={px(i)} y={CHART.h - 8} fontSize="9" fill="#9ca3af" textAnchor="middle">
                {d.month}
              </text>
            ))}
          </svg>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
          <h3 className="font-bold text-[#1a1b2f] text-lg mb-1">Top Selling Products</h3>
          <p className="text-xs text-gray-400 mb-4">Highest wholesale demand items</p>
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.rank} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Image src={p.img} alt={p.name} width={48} height={48} className="w-12 h-12 rounded-lg object-cover shrink-0" />
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm text-left">
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
                  <td className="px-6 py-4 font-bold text-[#1a1b2f]">{o.orderNumber}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1a1b2f]">{o.shopName}</div>
                    <div className="text-xs text-gray-400">{o.ownerName}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{o.cityName}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">{o.createdAt}</td>
                  <td className="px-6 py-4 font-bold text-[#2e7d32]">{inr(o.grandTotal)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setInvoiceOrder(o)} className="inline-flex items-center gap-1.5 bg-[#1a1b2f] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#23233a] transition-colors whitespace-nowrap">
                      <Eye size={12} /> View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {invoiceOrder && <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />}
    </div>
  );
}

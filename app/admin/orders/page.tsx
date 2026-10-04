"use client";
import { useState } from "react";
import { Eye } from "lucide-react";
import { useAdminData } from "@/components/AdminDataProvider";
import InvoiceModal from "@/components/InvoiceModal";
import { inr } from "@/lib/format";
import type { Order, OrderStatus } from "@/lib/types";

const statuses: OrderStatus[] = ["Pending", "Confirmed", "Delivered", "Cancelled"];
const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-orange-50 text-orange-700",
  Confirmed: "bg-blue-50 text-blue-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-600",
};

export default function OrdersPage() {
  const { orders, updateOrderStatus, addToast } = useAdminData();
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => statusFilter === "All Statuses" || o.status === statusFilter);
  const unpaidTotal = orders.filter((o) => (o.paidStatus ?? "Unpaid") === "Unpaid" && o.status !== "Cancelled").reduce((s, o) => s + o.grandTotal, 0);

  const handleStatus = (o: Order, status: OrderStatus) => {
    updateOrderStatus(o.id, status);
    addToast("Order Updated", `${o.orderNumber} marked as ${status}.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Active Wholesale Transactions</h1>
          <p className="text-sm text-gray-500">Change order status in real time ({orders.length} total).</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-xl border border-gray-100/50 shadow-sm px-4 py-2">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Receivables</div>
            <div className="text-sm font-extrabold text-orange-600">{inr(unpaidTotal)} unpaid</div>
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] cursor-pointer">
            <option>All Statuses</option>
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-sm text-left">
            <thead className="text-xs uppercase text-gray-400 bg-gray-50/50 font-semibold">
              <tr>
                <th className="px-5 py-3">Order Number</th>
                <th className="px-5 py-3">Shop Name</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Total Amount</th>
                <th className="px-5 py-3">Payment</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Status Quick Update</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((o) => {
                const paid = (o.paidStatus ?? "Unpaid") === "Paid";
                return (
                  <tr key={o.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-5 py-4 font-bold text-[#1a1b2f]">{o.orderNumber}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-[#1a1b2f]">{o.shopName}</div>
                      <div className="text-xs text-gray-400">{o.ownerName}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{o.cityName}</td>
                    <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">{o.createdAt}</td>
                    <td className="px-5 py-4 font-bold text-[#2e7d32]">{inr(o.grandTotal)}</td>
                    <td className="px-5 py-4">
                      <div className={`text-xs font-semibold ${paid ? "text-emerald-600" : "text-orange-600"}`}>{o.paidStatus ?? "Unpaid"}</div>
                      {!paid && o.dueDate && <div className="text-[10px] text-gray-400">Due {o.dueDate}</div>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <select value={o.status} onChange={(e) => handleStatus(o, e.target.value as OrderStatus)} className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] cursor-pointer">
                        {statuses.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => setInvoiceOrder(o)} className="inline-flex items-center gap-1.5 bg-[#1a1b2f] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#23233a] transition-colors whitespace-nowrap">
                        <Eye size={12} /> View Invoice
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No Orders Found</div>}
      </div>

      {invoiceOrder && <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />}
    </div>
  );
}

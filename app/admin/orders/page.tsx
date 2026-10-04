"use client";
import { useState } from "react";
import { Eye, X, Truck, CreditCard, MapPin, StickyNote } from "lucide-react";
import { useAdminData } from "@/components/AdminDataProvider";
import type { Order, OrderStatus } from "@/lib/types";

const statuses: OrderStatus[] = ["Pending", "Confirmed", "Delivered", "Cancelled"];
const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-orange-50 text-orange-700",
  Confirmed: "bg-blue-50 text-blue-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-600",
};

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function OrdersPage() {
  const { orders, updateOrderStatus, addToast } = useAdminData();
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [drawerOrder, setDrawerOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => statusFilter === "All Statuses" || o.status === statusFilter);
  const active = drawerOrder ? orders.find((o) => o.id === drawerOrder.id) ?? null : null;

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
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] cursor-pointer">
          <option>All Statuses</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm text-left">
            <thead className="text-xs uppercase text-gray-400 bg-gray-50/50 font-semibold">
              <tr>
                <th className="px-5 py-3">Order Number</th>
                <th className="px-5 py-3">Shop Name</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Total Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Status Quick Update</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((o) => (
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
                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <select value={o.status} onChange={(e) => handleStatus(o, e.target.value as OrderStatus)} className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] cursor-pointer">
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => setDrawerOrder(o)} className="inline-flex items-center gap-1.5 bg-[#1a1b2f] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#23233a] transition-colors whitespace-nowrap">
                      <Eye size={12} /> View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No Orders Found</div>}
      </div>

      {/* Invoice Drawer */}
      {active && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" onClick={() => setDrawerOrder(null)} />
          <aside className="fixed top-0 right-0 h-screen w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#f8fafc] sticky top-0">
              <div>
                <h2 className="text-lg font-extrabold text-[#1a1b2f]">{active.orderNumber}</h2>
                <p className="text-xs text-gray-400">Order Reference · {active.createdAt}</p>
              </div>
              <button onClick={() => setDrawerOrder(null)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><X size={18} /></button>
            </div>

            <div className="p-6 space-y-5 flex-1">
              <div className="flex items-center justify-between">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[active.status]}`}>{active.status}</span>
                <span className="text-xs text-gray-400">Est. Delivery: {active.estimatedDeliveryDate}</span>
              </div>

              <div className="bg-[#f8fafc] rounded-xl p-4 space-y-1.5">
                <div className="font-semibold text-sm text-[#1a1b2f]">{active.shopName}</div>
                <div className="text-xs text-gray-500">{active.ownerName} · {active.phone}</div>
                <div className="text-xs text-gray-500 flex items-start gap-1.5"><MapPin size={12} className="mt-0.5 shrink-0" /> {active.deliveryAddress}</div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Wholesale Order Summary ({active.items.length} items)</h3>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                  {active.items.map((item) => (
                    <div key={item.productId} className="p-3.5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#1a1b2f] truncate">{item.productName}</div>
                        <div className="text-[11px] text-gray-400">{item.sku} · {item.brand} · {item.unit}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{inr(item.unitPrice)} × {item.quantity}</div>
                      </div>
                      <div className="text-sm font-bold text-[#1a1b2f] whitespace-nowrap">{inr(item.totalPrice)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{inr(active.subtotal)}</span></div>
                <div className="flex justify-between text-gray-500"><span>GST (18%)</span><span>{inr(active.gstAmount)}</span></div>
                <div className="flex justify-between font-extrabold text-[#1a1b2f] text-base pt-1"><span>Grand Total (incl GST)</span><span className="text-[#2e7d32]">{inr(active.grandTotal)}</span></div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CreditCard size={14} className="text-[#4CAF50]" />
                <span>Payment Method: <span className="font-semibold text-[#1a1b2f]">{active.paymentMethod}</span></span>
              </div>

              {active.notes && (
                <div className="flex items-start gap-2 text-xs text-gray-500 bg-amber-50 rounded-xl p-3">
                  <StickyNote size={14} className="text-amber-500 mt-0.5 shrink-0" />
                  <span><span className="font-semibold text-amber-700">Special Order Notes:</span> {active.notes}</span>
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Update Order Status</h3>
                <div className="grid grid-cols-4 gap-2">
                  {statuses.map((s) => (
                    <button key={s} onClick={() => handleStatus(active, s)} className={`text-xs font-semibold px-2 py-2 rounded-lg border transition-colors ${active.status === s ? "bg-[#1a1b2f] text-white border-[#1a1b2f]" : "border-gray-200 text-gray-600 hover:border-[#4CAF50] hover:text-[#4CAF50]"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-[#f8fafc]">
              <button onClick={() => setDrawerOrder(null)} className="w-full py-2.5 rounded-lg bg-[#1a1b2f] text-white text-sm font-semibold hover:bg-[#23233a] transition-colors flex items-center justify-center gap-2">
                <Truck size={16} /> Close Invoice
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

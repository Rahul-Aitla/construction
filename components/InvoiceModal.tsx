"use client";
import { Printer, X, CheckCircle, ShieldCheck } from "lucide-react";
import { useAdminData } from "./AdminDataProvider";
import { hsnCodes } from "@/lib/data";
import { inr, amountInWords } from "@/lib/format";
import type { Order, OrderStatus } from "@/lib/types";

const statuses: OrderStatus[] = ["Pending", "Confirmed", "Delivered", "Cancelled"];
const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-orange-50 text-orange-700 border-orange-200",
  Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
};

export default function InvoiceModal({ order: initial, onClose }: { order: Order; onClose: () => void }) {
  const { orders, cities, shops, settings, updateOrderStatus, markOrderPaid, addToast } = useAdminData();
  const order = orders.find((o) => o.id === initial.id) ?? initial;

  const shop = shops.find((s) => s.id === order.shopId);
  const city = cities.find((c) => c.id === order.cityId);
  const hqState = cities.find((c) => settings.warehouseAddress.includes(c.state))?.state ?? "Maharashtra";
  const interState = (city?.state ?? "") !== hqState;
  const halfGst = order.gstAmount / 2;
  const invoiceNo = `INV-${order.orderNumber.replace("ORD-", "")}`;
  const paid = (order.paidStatus ?? "Unpaid") === "Paid";

  const handlePrint = () => window.print();
  const handlePaid = () => {
    markOrderPaid(order.id);
    addToast("Payment Recorded", `${order.orderNumber} marked as Paid.`);
  };
  const handleStatus = (s: OrderStatus) => {
    updateOrderStatus(order.id, s);
    addToast("Order Updated", `${order.orderNumber} marked as ${s}.`);
  };

  return (
    <div id="invoice-print" className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm overflow-y-auto print:bg-white print:overflow-visible">
      {/* Action bar — hidden in print */}
      <div className="print:hidden sticky top-0 z-10 bg-[#1a1b2f]/95 backdrop-blur px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {statuses.map((s) => (
            <button key={s} onClick={() => handleStatus(s)} className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-colors ${order.status === s ? "bg-[#4CAF50] border-[#4CAF50] text-white" : "border-white/20 text-gray-300 hover:border-[#4CAF50] hover:text-white"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {!paid && (
            <button onClick={handlePaid} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
              <CheckCircle size={13} /> Mark as Paid
            </button>
          )}
          <button onClick={handlePrint} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white text-[#1a1b2f] hover:bg-gray-100 transition-colors">
            <Printer size={13} /> Print Invoice
          </button>
          <button onClick={onClose} className="p-1.5 text-gray-300 hover:text-white transition-colors" aria-label="Close invoice"><X size={18} /></button>
        </div>
      </div>

      {/* Invoice document */}
      <div className="max-w-3xl mx-auto my-6 print:my-0 print:max-w-none px-4 sm:px-0 print:px-0">
        <div className="bg-white rounded-2xl print:rounded-none shadow-2xl print:shadow-none overflow-hidden">
          {/* Letterhead */}
          <div className="bg-[#1a1b2f] text-white px-8 py-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#4CAF50] flex items-center justify-center shrink-0">
                <ShieldCheck size={22} className="text-white" />
              </div>
              <div>
                <div className="font-extrabold text-xl tracking-tight">{settings.businessName}</div>
                <div className="text-[11px] text-gray-300 mt-0.5">{settings.warehouseAddress}</div>
                <div className="text-[11px] text-gray-300">GSTIN: {settings.gstin} · {settings.email} · {settings.phone}</div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[#4CAF50] font-extrabold text-2xl tracking-wide">TAX INVOICE</div>
              <div className="text-xs text-gray-300 mt-1">{invoiceNo}</div>
              <div className="text-xs text-gray-400">Order Ref: {order.orderNumber}</div>
            </div>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100 border-b border-gray-200 text-center">
            <div className="px-3 py-3"><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Invoice Date</div><div className="text-xs font-bold text-[#1a1b2f] mt-0.5">{order.createdAt}</div></div>
            <div className="px-3 py-3"><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Est. Delivery</div><div className="text-xs font-bold text-[#1a1b2f] mt-0.5">{order.estimatedDeliveryDate}</div></div>
            <div className="px-3 py-3"><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Payment Terms</div><div className="text-xs font-bold text-[#1a1b2f] mt-0.5">{order.paymentMethod}</div></div>
            <div className="px-3 py-3">
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Payment Status</div>
              <div className={`text-xs font-bold mt-0.5 ${paid ? "text-emerald-600" : "text-orange-600"}`}>{paid ? "Paid" : `Unpaid${order.dueDate ? ` · Due ${order.dueDate}` : ""}`}</div>
            </div>
          </div>

          {/* Billed to / Ship to */}
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border-b border-gray-200">
            <div className="px-8 py-5">
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">Billed To</div>
              <div className="font-bold text-sm text-[#1a1b2f]">{order.shopName}</div>
              <div className="text-xs text-gray-500 mt-0.5">{order.ownerName} · {order.phone}</div>
              {shop?.gstin && <div className="text-xs text-gray-500 font-mono">GSTIN: {shop.gstin}</div>}
              <div className="text-xs text-gray-500 mt-0.5">{order.deliveryAddress}</div>
            </div>
            <div className="px-8 py-5">
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">Place of Supply</div>
              <div className="font-bold text-sm text-[#1a1b2f]">{order.cityName}{city ? `, ${city.state}` : ""}</div>
              <div className="text-xs text-gray-500 mt-0.5">{interState ? "Inter-state supply — IGST applicable" : "Intra-state supply — CGST + SGST applicable"}</div>
              <div className={`mt-2 inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyles[order.status]}`}>{order.status}</div>
            </div>
          </div>

          {/* Line items */}
          <div className="px-8 py-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-200">
                  <th className="text-left py-2 font-semibold">#</th>
                  <th className="text-left py-2 font-semibold">Item Description</th>
                  <th className="text-left py-2 font-semibold">HSN</th>
                  <th className="text-right py-2 font-semibold">Qty</th>
                  <th className="text-left py-2 font-semibold">Unit</th>
                  <th className="text-right py-2 font-semibold">Rate</th>
                  <th className="text-right py-2 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item, i) => (
                  <tr key={item.productId}>
                    <td className="py-3 text-gray-400 text-xs">{i + 1}</td>
                    <td className="py-3">
                      <div className="font-semibold text-[#1a1b2f]">{item.productName}</div>
                      <div className="text-[11px] text-gray-400">{item.sku} · {item.brand} · {item.category}</div>
                    </td>
                    <td className="py-3 text-xs text-gray-500 font-mono">{hsnCodes[item.category] ?? "—"}</td>
                    <td className="py-3 text-right font-medium">{item.quantity}</td>
                    <td className="py-3 text-xs text-gray-500">{item.unit}</td>
                    <td className="py-3 text-right">{inr(item.unitPrice)}</td>
                    <td className="py-3 text-right font-semibold">{inr(item.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-8 pb-5 flex justify-end">
            <div className="w-full sm:w-72 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500"><span>Taxable Amount</span><span>{inr(order.subtotal)}</span></div>
              {interState ? (
                <div className="flex justify-between text-gray-500"><span>IGST (18%)</span><span>{inr(order.gstAmount)}</span></div>
              ) : (
                <>
                  <div className="flex justify-between text-gray-500"><span>CGST (9%)</span><span>{inr(halfGst)}</span></div>
                  <div className="flex justify-between text-gray-500"><span>SGST (9%)</span><span>{inr(halfGst)}</span></div>
                </>
              )}
              <div className="flex justify-between font-extrabold text-[#1a1b2f] text-lg border-t border-gray-200 pt-2">
                <span>Grand Total</span><span className="text-[#2e7d32]">{inr(order.grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="px-8 pb-5">
            <div className="bg-[#f8fafc] rounded-lg px-4 py-2.5 text-xs text-gray-600">
              <span className="font-semibold">Amount in Words:</span> {amountInWords(order.grandTotal)}
            </div>
          </div>

          {order.notes && (
            <div className="px-8 pb-5">
              <div className="text-xs text-gray-500"><span className="font-semibold text-[#1a1b2f]">Special Order Notes:</span> {order.notes}</div>
            </div>
          )}

          {/* Footer */}
          <div className="px-8 py-5 border-t border-gray-200 flex items-end justify-between gap-6">
            <div className="text-[11px] text-gray-400 leading-relaxed max-w-sm">
              <span className="font-semibold text-gray-500">Terms & Conditions:</span> Goods once sold will not be taken back. Subject to {hqState} jurisdiction. Payment due as per agreed terms. This is a computer generated invoice and does not require a signature.
            </div>
            <div className="text-center shrink-0">
              <div className="w-36 border-b border-gray-300 mb-1.5 h-10" />
              <div className="text-[10px] text-gray-400">For {settings.businessName}</div>
              <div className="text-[10px] text-gray-500 font-semibold">Authorised Signatory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

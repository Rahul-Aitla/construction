"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { useAdminData } from "@/components/AdminDataProvider";
import type { Product } from "@/lib/types";

const defaultForm = { name: "", category: "Taps", brand: "", sku: "", price: "2500", packaging: "Piece", stock: "100", moq: "2", img: "", description: "" };
const FALLBACK_IMG = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120&q=80";

export default function ProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct, addToast } = useAdminData();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...defaultForm });
  const [editingId, setEditingId] = useState<number | null>(null);

  const categoryOptions = ["All Categories", ...categories.map((c) => c.name)];

  const filtered = products.filter((item) => {
    const s = search.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(s) || item.sku.toLowerCase().includes(s) || item.brand.toLowerCase().includes(s);
    const matchesCat = categoryFilter === "All Categories" || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      addToast("Product Deleted", "The SKU was removed from the wholesale catalog.");
    }
  };

  const handleAddOrEdit = () => {
    if (!form.name.trim() || !form.sku.trim()) { alert("Product name and SKU code are required."); return; }
    const price = Number(form.price), stock = Number(form.stock), moq = Number(form.moq);
    if ([price, stock, moq].some((n) => Number.isNaN(n) || n < 0)) { alert("Price, stock, and MOQ must be valid non-negative numbers."); return; }
    const record = { ...form, img: form.img.trim() || FALLBACK_IMG, price, stock, moq };
    if (editingId !== null) {
      updateProduct({ ...record, id: editingId });
      addToast("Product Updated", `${form.name} saved successfully.`);
      setEditingId(null);
    } else {
      addProduct({ ...record, id: Date.now() });
      addToast("Product Added", `${form.name} added to the catalog.`);
    }
    setShowModal(false);
    setForm({ ...defaultForm });
  };

  const openEdit = (item: Product) => {
    setForm({ name: item.name, category: item.category, brand: item.brand, sku: item.sku, price: String(item.price), packaging: item.packaging, stock: String(item.stock), moq: String(item.moq), img: item.img, description: item.description });
    setEditingId(item.id);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Product Inventory Management</h1>
          <p className="text-sm text-gray-500">Add, update, or remove wholesale SKUs ({products.length} total).</p>
        </div>
        <button onClick={() => { setEditingId(null); setForm({ ...defaultForm }); setShowModal(true); }} className="bg-[#4CAF50] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#43a047] transition-colors shadow-lg shadow-[#4CAF50]/20">
          <Plus size={18} /> Add New Product
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by product name, brand, SKU..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] transition-all" />
        </div>
        <div className="relative sm:w-72">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap shrink-0">Category:</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] transition-all cursor-pointer [&>option]:text-[#1a1b2f]">
              {categoryOptions.map((c) => <option key={c} value={c}>{c} {c !== "All Categories" ? `(${products.filter((i) => i.category === c).length})` : `(${products.length})`}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm text-left">
            <thead className="text-xs uppercase text-gray-400 bg-gray-50/50 font-semibold">
              <tr><th className="px-5 py-3">Product Details</th><th className="px-5 py-3">SKU</th><th className="px-5 py-3">Category & Brand</th><th className="px-5 py-3">Wholesale Price</th><th className="px-5 py-3">Stock Quantity</th><th className="px-5 py-3">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Image src={item.img} alt={item.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0"><div className="font-semibold text-[#1a1b2f] truncate" title={item.name}>{item.name}</div><div className="text-[11px] text-gray-400">MOQ: {item.moq} {item.packaging}</div></div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500 font-mono">{item.sku}</td>
                  <td className="px-5 py-4"><div className="text-sm font-medium text-[#1a1b2f]">{item.category}</div><div className="text-xs text-gray-400">{item.brand}</div></td>
                  <td className="px-5 py-4"><div className="font-bold text-[#2e7d32]">₹{item.price.toLocaleString("en-IN")}</div><div className="text-[11px] text-gray-400">/ {item.packaging}</div></td>
                  <td className="px-5 py-4"><span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">{item.stock} Pcs</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(item)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-[#1a1b2f] transition-colors" title="Edit"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No products found.</div>}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-xl font-extrabold text-[#1a1b2f]">{editingId ? "Edit Product SKU" : "Add New Product SKU"}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Product Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jaquar Single Lever Brass Tap" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]">
                      {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Brand</label>
                    <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="e.g. Jaquar" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">SKU Code</label>
                  <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="SKU-NEW-461" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Wholesale Price (₹)</label>
                  <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="2500" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Unit Packaging</label>
                  <input value={form.packaging} onChange={(e) => setForm({ ...form, packaging: e.target.value })} placeholder="Piece" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Stock Qty</label>
                  <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="100" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">MOQ</label>
                  <input type="number" min="0" value={form.moq} onChange={(e) => setForm({ ...form, moq: e.target.value })} placeholder="2" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Image URL</label>
                <input value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="High quality distributor product." rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-[#f8fafc] flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleAddOrEdit} className="px-4 py-2 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors shadow-lg shadow-[#4CAF50]/20 flex items-center gap-1.5"><Check size={16} /> {editingId ? "Update Product" : "Save Product"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, X, Check, Droplet, Bath, DoorClosed, Layers, Grid, Building2, Wrench, Sparkles, Package } from "lucide-react";
import { useAdminData } from "@/components/AdminDataProvider";
import type { Category } from "@/lib/types";

const iconMap: Record<string, typeof Package> = { Droplet, Bath, DoorClosed, Layers, Grid, Building2, Wrench, Sparkles, Package };
const iconOptions = Object.keys(iconMap);
const FALLBACK_IMG = "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=600&q=80";
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function CategoriesPage() {
  const { categories, products, addCategory, deleteCategory, addToast } = useAdminData();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", iconName: "Package", image: "" });

  const handleAdd = () => {
    if (!form.name.trim()) { alert("Category name is required."); return; }
    addCategory({ id: `cat-${Date.now()}`, name: form.name.trim(), description: form.description.trim(), iconName: form.iconName, image: form.image.trim() || FALLBACK_IMG });
    addToast("Category Added", `${form.name} added to the catalog.`);
    setShowModal(false);
    setForm({ name: "", description: "", iconName: "Package", image: "" });
  };

  const handleDelete = (c: Category) => {
    if (confirm(`Delete category "${c.name}"?`)) {
      deleteCategory(c.id);
      addToast("Category Deleted", `${c.name} removed.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1b2f]">Product Categories</h1>
          <p className="text-sm text-gray-500">Wholesale construction & interior material department catalog ({categories.length} departments).</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#4CAF50] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#43a047] transition-colors shadow-lg shadow-[#4CAF50]/20">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => {
          const Icon = iconMap[c.iconName] ?? Package;
          const count = products.filter((p) => p.category === c.name).length;
          const sales = products.filter((p) => p.category === c.name).reduce((s, p) => s + p.price * p.stock, 0);
          return (
            <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden group">
              <div className="relative h-28">
                <Image src={c.image} alt={c.name} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#4CAF50] flex items-center justify-center">
                    <Icon size={14} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-sm drop-shadow">{c.name}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 leading-relaxed min-h-[3rem]">{c.description}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-sm font-bold text-[#1a1b2f]">{count} SKUs</div>
                    <div className="text-[11px] text-gray-400">Stock value {inr(sales)}</div>
                  </div>
                  <button onClick={() => handleDelete(c)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors" title="Delete category">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-xl font-extrabold text-[#1a1b2f]">Add New Category</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Category Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sanitaryware" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description of products in this department." rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((name) => {
                    const Icon = iconMap[name];
                    return (
                      <button key={name} onClick={() => setForm({ ...form, iconName: name })} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${form.iconName === name ? "bg-[#4CAF50] border-[#4CAF50] text-white" : "border-gray-200 text-gray-500 hover:border-[#4CAF50]"}`} title={name}>
                        <Icon size={17} />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Image URL</label>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1a1b2f] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50]" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-[#f8fafc] flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-[#4CAF50] text-white text-sm font-semibold hover:bg-[#43a047] transition-colors shadow-lg shadow-[#4CAF50]/20 flex items-center gap-1.5"><Check size={16} /> Add Category</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

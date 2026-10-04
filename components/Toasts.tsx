"use client";
import { CheckCircle, Info, XCircle, X } from "lucide-react";
import { useAdminData } from "./AdminDataProvider";

const icons = { success: CheckCircle, info: Info, error: XCircle };
const colors = { success: "text-[#4CAF50]", info: "text-blue-500", error: "text-red-500" };

export default function Toasts() {
  const { toasts, removeToast } = useAdminData();
  return (
    <div className="fixed bottom-4 right-4 z-[80] space-y-2 w-80">
      {toasts.map((t) => {
        const Icon = icons[t.variant];
        return (
          <div key={t.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex items-start gap-3 animate-in slide-in-from-right">
            <Icon size={20} className={`${colors[t.variant]} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-[#1a1b2f]">{t.title}</div>
              {t.message && <div className="text-xs text-gray-500 mt-0.5">{t.message}</div>}
            </div>
            <button onClick={() => removeToast(t.id)} className="text-gray-400 hover:text-gray-600 shrink-0">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

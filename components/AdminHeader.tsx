import { ShieldCheck, Wifi, Building2, User } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/60">
      {/* Top Banner */}
      <div className="bg-[#1a1b2f] h-10 flex items-center px-6 justify-between text-xs">
        <div className="flex items-center gap-3 text-gray-300">
          <span className="inline-flex items-center gap-1.5 bg-[#4CAF50]/20 text-[#4CAF50] px-2.5 py-0.5 rounded-full font-semibold">
            <ShieldCheck size={12} /> B2B VERIFIED DEALER PORTAL
          </span>
          <span className="hidden md:inline text-gray-400">Wholesale Construction & Interior Materials Distribution Network</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-300 hover:text-white transition-colors">Shop User View</button>
          <button className="bg-[#4CAF50] text-white px-3 py-1 rounded-md font-medium hover:bg-[#43a047] transition-colors flex items-center gap-1.5">
            <User size={14} /> Admin Panel
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="h-16 px-6 flex items-center justify-between bg-white/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#4CAF50] flex items-center justify-center shadow-lg shadow-[#4CAF50]/20">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl leading-none text-[#1a1b2f] tracking-tight">BuildPro</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] bg-[#1a1b2f] text-white px-1.5 py-0.5 rounded font-semibold">DISTRIBUTOR</span>
              <span className="text-xs text-gray-500">Wholesale Materials & Supplies</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
            <span className="font-medium">Distributor Server Live</span>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-bold text-[#1a1b2f]">Admin HQ</div>
            <div className="text-xs text-gray-400">National Distribution Center</div>
          </div>
        </div>
      </div>
    </header>
  );
}

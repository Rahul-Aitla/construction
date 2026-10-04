"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AdminHeader from "@/components/AdminHeader";
import AdminDataProvider from "@/components/AdminDataProvider";
import Toasts from "@/components/Toasts";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <AdminDataProvider>
      <div className="min-h-screen bg-[#f4f5f8]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-4 sm:p-6 max-w-7xl">{children}</main>
        </div>
        <Toasts />
      </div>
    </AdminDataProvider>
  );
}

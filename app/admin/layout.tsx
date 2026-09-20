import Sidebar from "@/components/Sidebar";
import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f5f8]">
      <Sidebar />
      <div className="ml-64">
        <AdminHeader />
        <main className="p-6 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}

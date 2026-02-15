import AdminSidebar from "@/components/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-panel flex h-screen bg-[#0B0F14] overflow-hidden">
      {/* Sidebar */}
      <div className="h-full">
        <AdminSidebar />
      </div>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <AdminHeader />

        {/* Content Area - Pages control their own scroll/padding */}
        <main className="flex-1 overflow-y-auto bg-[#0B0F14] scrollbar-thin scrollbar-thumb-white/10">
          <div className="py-8 px-6 md:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

import AdminSidebar from "@/components/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-[#0B0F14] overflow-hidden">
      {/* Sidebar */}
      <div className="h-full">
        <AdminSidebar />
      </div>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64 relative">
        <AdminHeader />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

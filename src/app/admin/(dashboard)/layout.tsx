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

        {/* Content Area - Pages control their own scroll/padding */}
        <main className="flex-1 overflow-hidden flex flex-col bg-[#0B0F14]">
          {children}
        </main>
      </div>
    </div>
  );
}

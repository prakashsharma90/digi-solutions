"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  Settings,
  FileText,
  Briefcase,
  Tag,
  Layout,
  PieChart,
  LogOut,
  Layers,
  FileEdit,
  Menu,
  X,
  Mail,
  Navigation
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/leads", label: "Leads & Inquiries", icon: Users },
  { href: "/admin/newsletter", label: "Newsletter Subscribers", icon: Mail },
  { href: "/admin/services", label: "Services Management", icon: Layers },
  { href: "/admin/mega-menu", label: "Mega Menu", icon: Navigation },
  { href: "/admin/pricing", label: "Pricing Plans", icon: Tag },
  { href: "/admin/blogs", label: "Blogs & Content", icon: FileEdit },
  { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/users", label: "Users & Roles", icon: Layout },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/analytics", label: "Analytics", icon: PieChart },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-primary text-black rounded-lg md:hidden shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "w-64 bg-[#0A0E14] border-r border-white/5 h-screen flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
              <span className="text-black font-bold text-sm">D</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                DIGIHUB
              </h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto no-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                      isActive
                        ? "bg-teal-500/90 text-white font-medium shadow-lg shadow-teal-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon size={18} className={cn(
                      "transition-colors shrink-0",
                      isActive ? "text-white" : "group-hover:text-teal-400"
                    )} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all group"
          >
            <LogOut size={18} className="group-hover:text-red-400" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}

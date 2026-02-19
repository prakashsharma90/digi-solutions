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
  PieChart,
  LogOut,
  Layers,
  FileEdit,
  Menu,
  X,
  Mail,
  Navigation,
  Shield,
  ChevronRight,
  TrendingUp,
  Bot,
} from "lucide-react";
import { useState, useEffect } from "react";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role_name: string;
  permissions: string[];
};

const allNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3, permissions: ["analytics.view"] },
  { href: "/admin/leads", label: "Leads & Inquiries", icon: Users, permissions: ["users.view"] },
  { href: "/admin/chatbot-leads", label: "Chatbot Leads", icon: Bot, permissions: ["users.view"] },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail, permissions: ["users.view"] },
  { href: "/admin/services", label: "Services", icon: Layers, permissions: ["content.edit"] },
  { href: "/admin/mega-menu", label: "Mega Menu", icon: Navigation, permissions: ["settings.general"] },
  { href: "/admin/pricing", label: "Pricing Plans", icon: Tag, permissions: ["settings.general"] },
  { href: "/admin/blogs", label: "Blogs & Content", icon: FileEdit, permissions: ["content.create", "content.edit"] },
  { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase, permissions: ["content.create", "content.edit"] },
  { href: "/admin/pages", label: "Pages", icon: FileText, permissions: ["content.create", "content.edit"] },
  { href: "/admin/settings", label: "Settings", icon: Settings, permissions: ["settings.general", "settings.security"] },
  { href: "/admin/marketing/analytics", label: "Marketing", icon: TrendingUp, permissions: ["settings.general", "analytics.view"] },
  { href: "/admin/analytics", label: "Analytics", icon: PieChart, permissions: ["analytics.view"] },
  { href: "/admin/users", label: "Users & Roles", icon: Shield, permissions: ["users.view", "users.create"] },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          setUser(data.user);
        }
      })
      .catch(err => console.error("Sidebar: auth/me error:", err));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/admin/login");
  };

  // Filter nav items based on user permissions
  const navItems = allNavItems.filter(item => {
    if (!user) return true; // Show all while loading
    if (user.role_name === "Super Admin") return true; // Super Admin sees everything

    // User needs ANY of the item's listed permissions
    return item.permissions.some(permission => user.permissions.includes(permission));
  });

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
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

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

        {/* User Profile + Logout */}
        <div className="border-t border-white/5">
          {/* User Profile */}
          {user && (
            <div className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{user.role_name}</p>
                </div>
                <ChevronRight size={14} className="text-gray-600 shrink-0" />
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div className="px-3 pb-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all group"
            >
              <LogOut size={18} className="group-hover:text-red-400" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

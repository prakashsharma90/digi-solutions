"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  Users,
  MousePointer2,
  TrendingUp,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (error) {
      console.error('Failed to fetch leads', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Stats
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  // Mock conversion rate for now as we don't have traffic data
  const conversionRate = "2.4%";

  const stats = [
    { label: "Total Leads", value: totalLeads.toString(), change: "+12.5%", trending: "up", icon: Users, color: "text-primary" },
    { label: "New Inquiries", value: newLeads.toString(), change: "+0.8%", trending: "up", icon: MousePointer2, color: "text-secondary" },
    { label: "Total Traffic", value: "4,592", change: "-2.4%", trending: "down", icon: Globe, color: "text-accent" },
    { label: "Conversion Rate", value: conversionRate, change: "+18.2%", trending: "up", icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="max-w-7xl mx-auto pt-6">
      {/* Stats Grid */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0F141A] border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className={cn(
                "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                stat.trending === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
              )}>
                {stat.trending === "up" ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-white mt-1 font-poppins">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Table Preview (Placeholders for now) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0F141A] border border-white/5 rounded-2xl p-6 h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Conversion & Traffic</h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-primary" /> Conversion
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-secondary" /> Traffic
              </span>
            </div>
          </div>
          <div className="h-full w-full flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5">
            <p className="text-gray-500">Analytics Charts - Will be implemented with Recharts</p>
          </div>
        </div>

        <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent inquiries</h2>
          <div className="space-y-6">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading leads...</p>
            ) : leads.length === 0 ? (
              <p className="text-gray-500 text-sm">No inquiries yet.</p>
            ) : (
              leads.slice(0, 5).map((lead: any) => (
                <div key={lead.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold uppercase">
                    {lead.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate">{lead.message}</p>
                  </div>
                  <p className="text-[10px] text-gray-600">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
          <Button variant="link" className="w-full mt-6 text-primary hover:text-white transition-colors text-sm">
            View All Leads
          </Button>
        </div>
      </div>
    </div>
  );
}

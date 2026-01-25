"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [leadsRes, blogsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/blogs')
      ]);

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData);
      }

      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        setBlogs(blogsData);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Stats
  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => l.status === 'New' || l.status === 'Contacted').length;
  const totalBlogs = blogs.length;
  const conversionRate = totalLeads > 0 ? ((activeLeads / totalLeads) * 100).toFixed(0) : 0;

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads.toString(),
      change: "+2.0%",
      subtext: "Last month",
      icon: Users,
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-500/10 to-cyan-600/10"
    },
    {
      label: "Active Inquiries",
      value: activeLeads.toString(),
      change: "+3.0%",
      subtext: "Last month",
      icon: BarChart3,
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-500/10 to-indigo-600/10"
    },
    {
      label: "Total Content",
      value: totalBlogs.toString(),
      change: "+4.0%",
      subtext: "Last month",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-500/10 to-red-600/10"
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      change: "+12%",
      subtext: "Last month",
      icon: DollarSign,
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-500/10 to-rose-600/10"
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; icon: any }> = {
      'New': { label: 'Active', color: 'bg-teal-500/10 text-teal-400 border-teal-500/20', icon: CheckCircle2 },
      'Contacted': { label: 'Active', color: 'bg-teal-500/10 text-teal-400 border-teal-500/20', icon: CheckCircle2 },
      'Qualified': { label: 'Active', color: 'bg-teal-500/10 text-teal-400 border-teal-500/20', icon: CheckCircle2 },
      'published': { label: 'Validated', color: 'bg-teal-500/10 text-teal-400 border-teal-500/20', icon: CheckCircle2 },
      'draft': { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: Clock },
      'Closed': { label: 'In Active', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: XCircle },
    };

    const config = statusMap[status] || statusMap['New'];
    const Icon = config.icon;

    return (
      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", config.color)}>
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors">
            Overview
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative rounded-2xl p-6 overflow-hidden border border-white/5",
              `bg-gradient-to-br ${stat.bgGradient}`
            )}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "p-2.5 rounded-xl bg-gradient-to-br",
                  stat.gradient
                )}>
                  <stat.icon size={20} className="text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-teal-400">{stat.change}</div>
                  <div className="text-[10px] text-gray-500">{stat.subtext}</div>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Leads */}
        <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Recent Leads</h2>
          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : leads.length === 0 ? (
              <p className="text-gray-500 text-sm">No leads yet.</p>
            ) : (
              leads.slice(0, 3).map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between group">
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                    {lead.name}
                  </span>
                  {getStatusBadge(lead.status || 'New')}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Recent Blogs</h2>
          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : blogs.length === 0 ? (
              <p className="text-gray-500 text-sm">No blogs yet.</p>
            ) : (
              blogs.slice(0, 3).map((blog: any) => (
                <div key={blog.id} className="flex items-center justify-between group">
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                    {blog.title}
                  </span>
                  {getStatusBadge(blog.status || 'draft')}
                </div>
              ))
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between group">
              <span className="text-sm text-gray-300">Database</span>
              {getStatusBadge('published')}
            </div>
            <div className="flex items-center justify-between group">
              <span className="text-sm text-gray-300">API Services</span>
              {getStatusBadge('published')}
            </div>
            <div className="flex items-center justify-between group">
              <span className="text-sm text-gray-300">Email Service</span>
              {getStatusBadge('draft')}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">All Inquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading inquiries...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No inquiries yet.</td>
                </tr>
              ) : (
                leads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {lead.company || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {lead.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {lead.service || 'General'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(lead.status || 'New')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

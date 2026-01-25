"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Mail,
    Search,
    Filter,
    Download,
    Upload,
    RefreshCw,
    MoreVertical,
    Eye,
    Tag,
    Trash2,
    FileDown,
    X,
    Calendar,
    MapPin,
    Activity,
    TrendingUp,
    Users,
    UserPlus,
    UserMinus,
    AlertCircle,
    CheckCircle2,
    Clock,
    ExternalLink,
    Settings,
    Zap,
    Target,
    Flame,
    Snowflake,
    Sun,
    Loader2
} from "lucide-react";

export default function NewsletterLeadsPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedSource, setSelectedSource] = useState("all");
    const [selectedEngagement, setSelectedEngagement] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState<any>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Fetch subscribers on mount
    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/newsletter");
            if (response.ok) {
                const data = await response.json();
                setSubscribers(data.subscribers || []);
            }
        } catch (error) {
            console.error("Failed to fetch subscribers:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter subscribers
    const filteredSubscribers = subscribers.filter(sub => {
        const matchesSearch = sub.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === "all" || sub.status === selectedStatus;
        const matchesSource = selectedSource === "all" || sub.source === selectedSource;
        const matchesEngagement = selectedEngagement === "all" || sub.engagement === selectedEngagement;

        return matchesSearch && matchesStatus && matchesSource && matchesEngagement;
    });

    // Stats
    const activeCount = subscribers.filter(s => s.status === "active").length;
    const weekGrowth = Math.floor(activeCount * 0.01);
    const unsubscribedCount = subscribers.filter(s => s.status === "unsubscribed").length;
    const bouncedCount = subscribers.filter(s => s.status === "bounced").length;

    const getEngagementBadge = (engagement: string) => {
        const config = {
            hot: { icon: Flame, color: "bg-red-500/10 text-red-400 border-red-500/20", label: "Hot" },
            warm: { icon: Sun, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", label: "Warm" },
            cold: { icon: Snowflake, color: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Cold" }
        };

        const { icon: Icon, color, label } = config[engagement as keyof typeof config];

        return (
            <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", color)}>
                <Icon size={12} />
                {label}
            </span>
        );
    };

    const getStatusBadge = (status: string) => {
        const config = {
            active: { icon: CheckCircle2, color: "bg-teal-500/10 text-teal-400 border-teal-500/20", label: "Active" },
            unsubscribed: { icon: UserMinus, color: "bg-gray-500/10 text-gray-400 border-gray-500/20", label: "Unsubscribed" },
            bounced: { icon: AlertCircle, color: "bg-red-500/10 text-red-400 border-red-500/20", label: "Bounced" }
        };

        const { icon: Icon, color, label } = config[status as keyof typeof config];

        return (
            <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", color)}>
                <Icon size={12} />
                {label}
            </span>
        );
    };


    const handleExport = () => {
        const csvContent = [
            ["Email", "Name", "Status", "Source", "First Seen", "Last Activity", "Tags", "Country", "Lead Score"].join(","),
            ...filteredSubscribers.map(sub => [
                sub.email,
                sub.name || "",
                sub.status,
                sub.source,
                new Date(sub.first_seen).toLocaleDateString(),
                new Date(sub.last_activity).toLocaleDateString(),
                sub.tags?.join(";") || "",
                sub.country || "",
                sub.lead_score
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `newsletter-subscribers-${Date.now()}.csv`;
        link.click();
    };

    const handleDelete = async (subscriberId: string) => {
        if (!confirm("Are you sure you want to delete this subscriber? This action cannot be undone.")) {
            return;
        }

        try {
            const response = await fetch(`/api/newsletter/${subscriberId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete subscriber");
            }

            // Refresh the list
            await fetchSubscribers();
            setSelectedSubscriber(null);
            alert("Subscriber deleted successfully");
        } catch (error) {
            console.error("Error deleting subscriber:", error);
            alert("Failed to delete subscriber. Please try again.");
        }
    };

    const handleBulkDelete = async () => {
        if (selectedRows.length === 0) return;

        if (!confirm(`Are you sure you want to delete ${selectedRows.length} subscriber(s)? This action cannot be undone.`)) {
            return;
        }

        try {
            const deletePromises = selectedRows.map(id =>
                fetch(`/api/newsletter/${id}`, { method: "DELETE" })
            );

            await Promise.all(deletePromises);

            // Refresh the list
            await fetchSubscribers();
            setSelectedRows([]);
            alert(`${selectedRows.length} subscriber(s) deleted successfully`);
        } catch (error) {
            console.error("Error deleting subscribers:", error);
            alert("Failed to delete some subscribers. Please try again.");
        }
    };

    const handleBulkAction = (action: string) => {
        if (action === 'delete') {
            handleBulkDelete();
        } else {
            console.log(`Bulk action: ${action} on ${selectedRows.length} subscribers`);
            // Implement other bulk actions
        }
    };


    return (
        <div className="max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-3xl font-bold text-white">Newsletter Subscribers</h1>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1.5 bg-teal-500/10 text-teal-400 rounded-full text-sm font-semibold border border-teal-500/20">
                                    {activeCount.toLocaleString()} Active
                                </span>
                                <span className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20 flex items-center gap-1">
                                    <TrendingUp size={14} />
                                    +{weekGrowth} this week
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">Manage subscribers, track engagement, and export to CRM</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm text-gray-300">
                            <Upload size={16} />
                            Import
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm text-gray-300"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>
                        <button
                            onClick={fetchSubscribers}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors text-sm text-white font-medium disabled:opacity-50"
                        >
                            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                            {loading ? "Refreshing..." : "Refresh Data"}
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#0F141A] border border-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Total Subscribers</span>
                            <Users size={16} className="text-gray-500" />
                        </div>
                        <p className="text-2xl font-bold text-white">{subscribers.length.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#0F141A] border border-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Active</span>
                            <CheckCircle2 size={16} className="text-teal-500" />
                        </div>
                        <p className="text-2xl font-bold text-white">{activeCount.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#0F141A] border border-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Unsubscribed</span>
                            <UserMinus size={16} className="text-gray-500" />
                        </div>
                        <p className="text-2xl font-bold text-white">{unsubscribedCount.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#0F141A] border border-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Bounced</span>
                            <AlertCircle size={16} className="text-red-500" />
                        </div>
                        <p className="text-2xl font-bold text-white">{bouncedCount.toLocaleString()}</p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-[#0F141A] border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* Search */}
                        <div className="relative flex-1 min-w-[300px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search by email or name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-teal-500/50"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="unsubscribed">Unsubscribed</option>
                            <option value="bounced">Bounced</option>
                        </select>

                        {/* Source Filter */}
                        <select
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-teal-500/50"
                        >
                            <option value="all">All Sources</option>
                            <option value="Blog Popup">Blog Popup</option>
                            <option value="Footer Form">Footer Form</option>
                            <option value="Webinar">Webinar</option>
                            <option value="Landing Page">Landing Page</option>
                            <option value="Social Media">Social Media</option>
                        </select>

                        {/* Engagement Filter */}
                        <select
                            value={selectedEngagement}
                            onChange={(e) => setSelectedEngagement(e.target.value)}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-teal-500/50"
                        >
                            <option value="all">All Engagement</option>
                            <option value="hot">🔥 Hot</option>
                            <option value="warm">🟡 Warm</option>
                            <option value="cold">🔵 Cold</option>
                        </select>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm text-gray-300"
                        >
                            <Filter size={16} />
                            More Filters
                        </button>
                    </div>

                    {/* Bulk Actions */}
                    {selectedRows.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
                            <span className="text-sm text-gray-400">{selectedRows.length} selected</span>
                            <button
                                onClick={() => handleBulkAction('tag')}
                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300"
                            >
                                Add Tags
                            </button>
                            <button
                                onClick={() => handleBulkAction('export')}
                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300"
                            >
                                Export Selected
                            </button>
                            <button
                                onClick={() => handleBulkAction('delete')}
                                className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-xs text-red-400"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRows(filteredSubscribers.map(s => s.id));
                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                        className="rounded border-white/20 bg-white/5"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Engagement</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Lead Score</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tags</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Activity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={10} className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto mb-3" />
                                        <p className="text-gray-400">Loading subscribers...</p>
                                    </td>
                                </tr>
                            ) : filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-6 py-12 text-center">
                                        <Mail className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400 text-lg font-medium mb-1">No subscribers yet</p>
                                        <p className="text-gray-500 text-sm">Subscribers will appear here when they sign up via your newsletter forms.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((subscriber, index) => (
                                    <motion.tr
                                        key={subscriber.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.02 }}
                                        className="hover:bg-white/5 transition-colors cursor-pointer"
                                        onClick={() => setSelectedSubscriber(subscriber)}
                                    >
                                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(subscriber.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedRows([...selectedRows, subscriber.id]);
                                                    } else {
                                                        setSelectedRows(selectedRows.filter(id => id !== subscriber.id));
                                                    }
                                                }}
                                                className="rounded border-white/20 bg-white/5"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-gray-500" />
                                                <span className="text-sm text-white">{subscriber.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{subscriber.name || "-"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(subscriber.status)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{subscriber.source}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{getEngagementBadge(subscriber.engagement)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden w-20">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full",
                                                            subscriber.lead_score >= 70 ? "bg-green-500" :
                                                                subscriber.lead_score >= 40 ? "bg-yellow-500" : "bg-red-500"
                                                        )}
                                                        style={{ width: `${subscriber.lead_score}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-400 w-8">{subscriber.lead_score}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {subscriber.tags?.slice(0, 2).map((tag: string, i: number) => (
                                                    <span key={i} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/20">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {subscriber.tags?.length > 2 && (
                                                    <span className="px-2 py-0.5 bg-white/5 text-gray-400 rounded text-xs">
                                                        +{subscriber.tags.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {new Date(subscriber.last_activity).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                            <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                                                <MoreVertical size={16} className="text-gray-400" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                        Showing {filteredSubscribers.length} of {subscribers.length} subscribers
                    </span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300">
                            Previous
                        </button>
                        <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Subscriber Detail Drawer */}
            <AnimatePresence>
                {selectedSubscriber && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setSelectedSubscriber(null)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25 }}
                            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#0B0F14] border-l border-white/5 z-50 overflow-y-auto"
                        >
                            {/* Drawer Header */}
                            <div className="sticky top-0 bg-[#0B0F14] border-b border-white/5 p-6 z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">{selectedSubscriber.name}</h2>
                                        <p className="text-gray-400">{selectedSubscriber.email}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedSubscriber(null)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X size={20} className="text-gray-400" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    {getStatusBadge(selectedSubscriber.status)}
                                    {getEngagementBadge(selectedSubscriber.engagement)}
                                    <span className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-xs flex items-center gap-1.5">
                                        <Target size={12} />
                                        Score: {selectedSubscriber.leadScore}
                                    </span>
                                </div>
                            </div>

                            {/* Drawer Content */}
                            <div className="p-6 space-y-6">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <p className="text-xs text-gray-400 mb-1">Opens</p>
                                        <p className="text-2xl font-bold text-white">{selectedSubscriber.opens}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <p className="text-xs text-gray-400 mb-1">Clicks</p>
                                        <p className="text-2xl font-bold text-white">{selectedSubscriber.clicks}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <p className="text-xs text-gray-400 mb-1">Page Visits</p>
                                        <p className="text-2xl font-bold text-white">{selectedSubscriber.pageVisits}</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white">Subscriber Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                                            <span className="text-sm text-gray-400">Source</span>
                                            <span className="text-sm text-white">{selectedSubscriber.source}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                                            <span className="text-sm text-gray-400">First Seen</span>
                                            <span className="text-sm text-white">{new Date(selectedSubscriber.firstSeen).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                                            <span className="text-sm text-gray-400">Last Activity</span>
                                            <span className="text-sm text-white">{new Date(selectedSubscriber.lastActivity).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                                            <span className="text-sm text-gray-400">Country</span>
                                            <span className="text-sm text-white flex items-center gap-2">
                                                <MapPin size={14} />
                                                {selectedSubscriber.country}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                                            <span className="text-sm text-gray-400">Double Opt-In</span>
                                            <span className="text-sm text-white">
                                                {selectedSubscriber.doubleOptIn ? "✓ Yes" : "✗ No"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-sm text-gray-400">Consent</span>
                                            <span className="text-sm text-green-400">✓ Given</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSubscriber.tags.map((tag: string, i: number) => (
                                            <span key={i} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-sm border border-blue-500/20 flex items-center gap-2">
                                                <Tag size={12} />
                                                {tag}
                                            </span>
                                        ))}
                                        <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg text-sm border border-white/10">
                                            + Add Tag
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors">
                                        <FileDown size={16} />
                                        GDPR Data Export
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors">
                                        <ExternalLink size={16} />
                                        Sync to CRM
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedSubscriber.id)}
                                        className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-sm text-red-400 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        Delete Subscriber
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

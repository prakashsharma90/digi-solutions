"use client";

import { useState, useEffect } from "react";
import {
    MessageSquare,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    Download,
    CheckCircle2,
    Clock,
    AlertCircle,
    Trash2,
    Bot,
    UserCircle,
    Briefcase,
    X,
    Eye,
    RefreshCw,
    Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type ChatbotLead = {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    service_type: string;
    query_message: string;
    session_id: string;
    status: string;
    notes: string | null;
    created_at: string;
};

export default function ChatbotLeadsPage() {
    const [leads, setLeads] = useState<ChatbotLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterService, setFilterService] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [selectedLead, setSelectedLead] = useState<ChatbotLead | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editStatus, setEditStatus] = useState("");
    const [editNotes, setEditNotes] = useState("");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/chatbot-leads");
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (error) {
            console.error("Failed to fetch chatbot leads:", error);
        } finally {
            setLoading(false);
        }
    };

    const openDetail = (lead: ChatbotLead) => {
        setSelectedLead(lead);
        setEditStatus(lead.status);
        setEditNotes(lead.notes || "");
        setIsDetailOpen(true);
    };

    const handleSave = async () => {
        if (!selectedLead) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/chatbot-leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedLead.id, status: editStatus, notes: editNotes })
            });
            if (res.ok) {
                setLeads(leads.map(l =>
                    l.id === selectedLead.id ? { ...l, status: editStatus, notes: editNotes } : l
                ));
                setIsDetailOpen(false);
            }
        } catch (error) {
            console.error("Failed to save:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;
        try {
            const res = await fetch(`/api/admin/chatbot-leads?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setLeads(leads.filter(l => l.id !== id));
                if (selectedLead?.id === id) setIsDetailOpen(false);
            }
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    // Client-side filtering
    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || lead.status === filterStatus;
        const matchesService = !filterService || lead.service_type?.toLowerCase().includes(filterService.toLowerCase());

        let matchesDate = true;
        if (startDate || endDate) {
            const leadDate = new Date(lead.created_at);
            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                if (leadDate < start) matchesDate = false;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                if (leadDate > end) matchesDate = false;
            }
        }
        return matchesSearch && matchesStatus && matchesService && matchesDate;
    });

    // CSV Export
    const handleExport = () => {
        if (filteredLeads.length === 0) {
            alert("No leads to export");
            return;
        }

        const headers = ["Full Name", "Email", "Phone", "Service Type", "Query", "Status", "Date", "Notes"];
        const csvRows = [headers.join(",")];

        filteredLeads.forEach(lead => {
            const row = [
                `"${lead.full_name || ''}"`,
                `"${lead.email || ''}"`,
                `"${lead.phone || ''}"`,
                `"${lead.service_type || ''}"`,
                `"${(lead.query_message || '').replace(/"/g, '""')}"`,
                `"${lead.status || ''}"`,
                `"${new Date(lead.created_at).toLocaleDateString()}"`,
                `"${(lead.notes || '').replace(/"/g, '""')}"`
            ];
            csvRows.push(row.join(","));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `chatbot_leads_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "New": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "Contacted": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "Qualified": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
            case "Closed": return "bg-green-500/10 text-green-400 border-green-500/20";
            default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "New": return <AlertCircle size={12} />;
            case "Contacted": return <Clock size={12} />;
            case "Qualified": return <Eye size={12} />;
            case "Closed": return <CheckCircle2 size={12} />;
            default: return <Clock size={12} />;
        }
    };

    const getStatusCount = (status: string) => {
        if (status === "All") return leads.length;
        return leads.filter(l => l.status === status).length;
    };

    // Unique service types for filtering
    const serviceTypes = [...new Set(leads.map(l => l.service_type).filter(Boolean))];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/20">
                        <Bot size={22} className="text-violet-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Chatbot Leads</h1>
                        <p className="text-xs text-gray-500">Leads captured from AI chatbot conversations</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div> */}

            {/* Toolbar & Filters */}
            <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md w-full">
                        <label htmlFor="search-chatbot-leads" className="sr-only">Search leads</label>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            id="search-chatbot-leads"
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder:text-gray-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center gap-2 w-full md:w-auto bg-white/5 p-1 rounded-xl border border-white/10">
                        <div className="relative">
                            <label htmlFor="chatbot-start-date" className="sr-only">Start Date</label>
                            <input
                                id="chatbot-start-date"
                                type="date"
                                className="px-3 py-1.5 bg-transparent text-white text-sm focus:outline-none w-32"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <span className="text-gray-500 text-sm">to</span>
                        <div className="relative">
                            <label htmlFor="chatbot-end-date" className="sr-only">End Date</label>
                            <input
                                id="chatbot-end-date"
                                type="date"
                                className="px-3 py-1.5 bg-transparent text-white text-sm focus:outline-none w-32"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Service Type Filter */}
                        {serviceTypes.length > 0 && (
                            <select
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer"
                                value={filterService}
                                onChange={(e) => setFilterService(e.target.value)}
                            >
                                <option value="">All Services</option>
                                {serviceTypes.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        )}

                        <Button
                            variant="outline"
                            className="gap-2 border-violet-500/20 hover:border-violet-500/50 text-white"
                            onClick={fetchLeads}
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </Button>
                        <Button
                            className="gap-2 bg-[#01A998] hover:bg-[#01A998]/80 shadow-lg shadow-[#01A998]/20"
                            onClick={handleExport}
                        >
                            <Download size={16} />
                            Export CSV
                        </Button>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 border-t border-white/5 pt-4 no-scrollbar">
                    {["All", "New", "Contacted", "Qualified", "Closed"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 border",
                                filterStatus === status
                                    ? "bg-[#01A998]/10 text-[#01A998] border-[#01A998]/50"
                                    : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-gray-300"
                            )}
                        >
                            {status !== "All" && getStatusIcon(status)}
                            {status}
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-full text-[10px]",
                                filterStatus === status ? "bg-[#01A998]/10 text-[#01A998]" : "bg-white/10 text-gray-500"
                            )}>
                                {getStatusCount(status)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02] text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                <th className="px-6 py-5">Contact Info</th>
                                <th className="px-6 py-5">Service</th>
                                <th className="px-6 py-5 hidden lg:table-cell">Query</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 hidden md:table-cell">Date</th>
                                <th className="px-6 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <RefreshCw size={16} className="animate-spin" />
                                            Loading chatbot leads...
                                        </div>
                                    </td></tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <Bot size={32} className="text-gray-700" />
                                            <p>No chatbot leads found.</p>
                                            <p className="text-xs text-gray-600">Leads will appear here once users interact with the chatbot.</p>
                                        </div>
                                    </td></tr>
                                ) : filteredLeads.map((lead) => (
                                    <motion.tr
                                        layout
                                        key={lead.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                                        onClick={() => openDetail(lead)}
                                    >
                                        {/* Contact Info */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <UserCircle size={16} className="text-violet-400 shrink-0" />
                                                    <span className="text-white font-medium capitalize">{lead.full_name}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 pl-6">
                                                    <span className="flex items-center gap-1">
                                                        <Mail size={10} /> {lead.email}
                                                    </span>
                                                    {lead.phone && (
                                                        <span className="flex items-center gap-1">
                                                            <Phone size={10} /> {lead.phone}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Service */}
                                        <td className="px-6 py-4">
                                            <span className="text-xs bg-violet-500/10 text-violet-300 px-2.5 py-1 rounded-full border border-violet-500/20 capitalize">
                                                {lead.service_type || "—"}
                                            </span>
                                        </td>

                                        {/* Query */}
                                        <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-400 max-w-[200px]">
                                            <div className="truncate" title={lead.query_message}>
                                                {lead.query_message || <span className="text-white/10 italic">No query</span>}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider flex items-center gap-1 w-fit",
                                                getStatusColor(lead.status)
                                            )}>
                                                {getStatusIcon(lead.status)}
                                                {lead.status}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-4 hidden md:table-cell text-xs text-gray-500 font-mono">
                                            {new Date(lead.created_at).toLocaleDateString('en-GB', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                            <br />
                                            <span className="text-[10px] text-gray-600">
                                                {new Date(lead.created_at).toLocaleTimeString('en-GB', {
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Slide-over Modal */}
            <AnimatePresence>
                {isDetailOpen && selectedLead && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setIsDetailOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0F141A] border-l border-white/5 shadow-2xl z-50 overflow-y-auto"
                        >
                            <div className="p-6 space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Bot size={20} className="text-violet-400" />
                                        <h2 className="text-xl font-bold text-white">Lead Details</h2>
                                    </div>
                                    <button onClick={() => setIsDetailOpen(false)} className="text-gray-400 hover:text-white transition-transform hover:rotate-90">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-white/5 p-4 rounded-xl space-y-3 border border-white/5">
                                    <h3 className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Contact Information</h3>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-gray-400 text-sm flex items-center gap-2">
                                            <UserCircle size={14} /> Name
                                        </span>
                                        <span className="text-white text-sm font-medium capitalize">{selectedLead.full_name}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-gray-400 text-sm flex items-center gap-2">
                                            <Mail size={14} /> Email
                                        </span>
                                        <span className="text-white text-sm">{selectedLead.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-gray-400 text-sm flex items-center gap-2">
                                            <Phone size={14} /> Phone
                                        </span>
                                        <span className="text-white text-sm">{selectedLead.phone || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-gray-400 text-sm flex items-center gap-2">
                                            <Briefcase size={14} /> Service
                                        </span>
                                        <span className="text-violet-400 text-xs uppercase bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20 capitalize">
                                            {selectedLead.service_type || "—"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm flex items-center gap-2">
                                            <Calendar size={14} /> Date
                                        </span>
                                        <span className="text-white text-xs font-mono">
                                            {new Date(selectedLead.created_at).toLocaleString('en-GB', {
                                                day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold flex items-center gap-1">
                                            <MessageSquare size={12} /> Original Query
                                        </p>
                                        <p className="text-gray-300 text-sm italic border-l-2 border-violet-500/30 pl-3 py-1">
                                            &ldquo;{selectedLead.query_message}&rdquo;
                                        </p>
                                    </div>
                                </div>

                                {/* Status & Notes */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                        <Filter size={16} className="text-violet-400" /> Lead Management
                                    </h3>

                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase font-semibold">Status</label>
                                        <select
                                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-violet-500 outline-none transition-all cursor-pointer hover:border-white/20"
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                        >
                                            {["New", "Contacted", "Qualified", "Closed"].map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase font-semibold">Internal Notes</label>
                                        <textarea
                                            rows={5}
                                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-violet-500 outline-none focus:border-violet-500/50 transition-all resize-none"
                                            value={editNotes}
                                            onChange={(e) => setEditNotes(e.target.value)}
                                            placeholder="Call notes, follow-up actions, meeting summary..."
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-6 border-t border-white/10">
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(selectedLead.id)}
                                        className="flex-1 hover:bg-red-900/50"
                                    >
                                        <Trash2 size={16} className="mr-2" /> Delete
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-[2] bg-violet-600 hover:bg-violet-700 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_-2px_rgba(139,92,246,0.5)] transition-all"
                                    >
                                        {saving ? (
                                            <>
                                                <Clock size={16} className="mr-2 animate-spin" /> Saving...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={16} className="mr-2" /> Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

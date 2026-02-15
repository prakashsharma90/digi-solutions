"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    MessageSquare,
    ChevronRight,
    Download,
    CheckCircle2,
    Clock,
    AlertCircle,
    Trash2,
    RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [selectedLead, setSelectedLead] = useState<any | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [syncing, setSyncing] = useState(false);

    // CRM Fields State
    const [editForm, setEditForm] = useState({
        company_name: "",
        budget_range: "",
        business_size: "",
        timeline: "",
        notes: "",
        status: ""
    });

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/leads");
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (lead: any) => {
        setSelectedLead(lead);
        setEditForm({
            company_name: lead.company_name || "",
            budget_range: lead.budget_range || "",
            business_size: lead.business_size || "",
            timeline: lead.timeline || "",
            notes: lead.notes || "",
            status: lead.status || "New"
        });
        setIsEditOpen(true);
    };

    const handleSaveLead = async () => {
        if (!selectedLead) return;
        setSaving(true);
        try {
            const res = await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedLead.id, ...editForm })
            });
            if (res.ok) {
                // Update local state
                setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, ...editForm } : l));
                setIsEditOpen(false);
            }
        } catch (error) {
            console.error("Failed to save lead", error);
        } finally {
            setSaving(false);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const res = await fetch("/api/admin/sync-leads");
            const data = await res.json();
            if (res.ok) {
                alert(data.message || "Sync successful!");
                fetchLeads();
            } else {
                alert(`Sync failed: ${data.error}`);
            }
        } catch (error) {
            console.error("Sync error:", error);
            alert("Failed to sync leads.");
        } finally {
            setSyncing(false);
        }
    };

    const deleteLead = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;
        try {
            const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setLeads(leads.filter(l => l.id !== id));
                if (selectedLead?.id === id) setIsEditOpen(false);
            }
        } catch (error) {
            console.error("Failed to delete lead", error);
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || lead.status === filterStatus;

        let matchesDate = true;
        if (startDate || endDate) {
            const leadDate = new Date(lead.createdAt);
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
        return matchesSearch && matchesStatus && matchesDate;
    });

    const handleExport = () => {
        if (filteredLeads.length === 0) {
            alert("No leads to export");
            return;
        }

        const headers = ["Name", "Email", "Phone", "Service", "Company", "Budget", "Status", "Date", "Notes"];
        const csvRows = [headers.join(",")];

        filteredLeads.forEach(lead => {
            const row = [
                `"${lead.name}"`,
                `"${lead.email}"`,
                `"${lead.phone || ''}"`,
                `"${lead.service}"`,
                `"${lead.company_name || ''}"`,
                `"${lead.budget_range || ''}"`,
                `"${lead.status}"`,
                `"${new Date(lead.createdAt).toLocaleDateString()}"`,
                `"${(lead.notes || '').replace(/"/g, '""')}"`
            ];
            csvRows.push(row.join(","));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `leads_export.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "New": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "Contacted": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "Qualified": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
            case "Proposal Sent": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
            case "Closed Won": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "Closed Lost": return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    // Calculate counts for badges
    const getStatusCount = (status: string) => {
        if (status === "All") return leads.length;
        return leads.filter(l => l.status === status).length;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Toolbar & Filters */}
            <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md w-full">
                        <label htmlFor="search-leads" className="sr-only">Search leads</label>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            id="search-leads"
                            type="text"
                            placeholder="Search by name, email, or company..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto bg-white/5 p-1 rounded-xl border border-white/10">
                        <div className="relative">
                            <label htmlFor="start-date" className="sr-only">Start Date</label>
                            <input
                                id="start-date"
                                type="date"
                                className="px-3 py-1.5 bg-transparent text-white text-sm focus:outline-none w-32"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <span className="text-gray-500 text-sm">to</span>
                        <div className="relative">
                            <label htmlFor="end-date" className="sr-only">End Date</label>
                            <input
                                id="end-date"
                                type="date"
                                className="px-3 py-1.5 bg-transparent text-white text-sm focus:outline-none w-32"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="gap-2 border-primary/20 hover:border-primary/50 text-primary-foreground"
                            onClick={handleSync}
                            disabled={syncing}
                        >
                            <RefreshCw size={18} className={cn(syncing && "animate-spin")} />
                            {syncing ? "Syncing..." : "Sync Local"}
                        </Button>
                        <Button className="gap-2 shadow-lg shadow-primary/20" onClick={handleExport}>
                            <Download size={18} />
                            Export CSV
                        </Button>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 border-t border-white/5 pt-4 no-scrollbar">
                    {["All", "New", "Contacted", "Qualified", "Proposal Sent", "Closed Won", "Closed Lost"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 border",
                                filterStatus === status
                                    ? "bg-primary/10 text-primary border-primary/50"
                                    : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-gray-300"
                            )}
                        >
                            {status}
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-full text-[10px]",
                                filterStatus === status ? "bg-primary text-black" : "bg-white/10 text-gray-500"
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
                                <th className="px-6 py-5">Lead Name</th>
                                <th className="px-6 py-5">Service</th>
                                <th className="px-6 py-5 hidden lg:table-cell">Notes</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 hidden md:table-cell">Date</th>
                                <th className="px-6 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">Loading pipeline...</td></tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No leads found matching your criteria.</td></tr>
                                ) : filteredLeads.map((lead) => (
                                    <motion.tr
                                        layout
                                        key={lead.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                                        onClick={() => openEditModal(lead)}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-white font-medium capitalize">{lead.name}</span>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Mail size={12} /> {lead.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300 capitalize">
                                            {lead.service?.replace(/-/g, ' ')}
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-400 max-w-[200px]" title={lead.notes}>
                                            <div className="truncate cursor-help">
                                                {lead.notes || <span className="text-white/10 italic">No notes</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider", getStatusColor(lead.status))}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell text-xs text-gray-500 font-mono">
                                            {new Date(lead.createdAt).toLocaleDateString('en-GB', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end relative group/action">
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                                    <MoreVertical size={16} />
                                                </Button>
                                                <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/90 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/action:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    View Details
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Slide-over Modal */}
            <AnimatePresence>
                {isEditOpen && selectedLead && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setIsEditOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0F141A] border-l border-white/5 shadow-2xl z-50 overflow-y-auto"
                        >
                            <div className="p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-white">Lead Details</h2>
                                    <button onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-white transition-transform hover:rotate-90">
                                        <CheckCircle2 size={24} className="rotate-45" /> {/* Use as close icon */}
                                    </button>
                                </div>

                                {/* Static Info */}
                                <div className="bg-white/5 p-4 rounded-xl space-y-3 border border-white/5">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-gray-400 text-sm">Name</span>
                                        <span className="text-white text-sm font-medium capitalize">{selectedLead.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-gray-400 text-sm">Email</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white text-sm">{selectedLead.email}</span>
                                            <button className="text-primary hover:text-white" title="Copy Email">
                                                <Mail size={12} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-gray-400 text-sm">Phone</span>
                                        <span className="text-white text-sm">{selectedLead.phone || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Source</span>
                                        <span className="text-primary text-xs uppercase bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                                            {selectedLead.source || "Website"}
                                        </span>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Initial Message</p>
                                        <p className="text-gray-300 text-sm italic border-l-2 border-primary/30 pl-3 py-1">
                                            "{selectedLead.message}"
                                        </p>
                                    </div>
                                </div>

                                {/* CRM Fields */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Filter size={18} className="text-primary" /> Pipeline Management
                                    </h3>

                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase font-semibold">Status</label>
                                        <select
                                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer hover:border-white/20"
                                            value={editForm.status}
                                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                        >
                                            {["New", "Contacted", "Qualified", "Proposal Sent", "Closed Won", "Closed Lost"].map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold">Company Name</label>
                                            <input
                                                type="text"
                                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none focus:border-primary/50 transition-all"
                                                value={editForm.company_name}
                                                onChange={(e) => setEditForm({ ...editForm, company_name: e.target.value })}
                                                placeholder="ACME Corp"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold">Business Size</label>
                                            <select
                                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none focus:border-primary/50 transition-all cursor-pointer"
                                                value={editForm.business_size}
                                                onChange={(e) => setEditForm({ ...editForm, business_size: e.target.value })}
                                            >
                                                <option value="">Select...</option>
                                                <option value="Startup">Startup (1-10)</option>
                                                <option value="Small">Small (11-50)</option>
                                                <option value="Medium">Medium (51-200)</option>
                                                <option value="Enterprise">Enterprise (200+)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold">Budget Range</label>
                                            <input
                                                type="text"
                                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none focus:border-primary/50 transition-all"
                                                value={editForm.budget_range}
                                                onChange={(e) => setEditForm({ ...editForm, budget_range: e.target.value })}
                                                placeholder="$1k - $5k"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold">Timeline</label>
                                            <input
                                                type="text"
                                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none focus:border-primary/50 transition-all"
                                                value={editForm.timeline}
                                                onChange={(e) => setEditForm({ ...editForm, timeline: e.target.value })}
                                                placeholder="ASAP / 1 Month"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase font-semibold">Internal Notes</label>
                                        <textarea
                                            rows={5}
                                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none focus:border-primary/50 transition-all resize-none"
                                            value={editForm.notes}
                                            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                                            placeholder="Call notes, requirements, meeting summary..."
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-6 border-t border-white/10">
                                    <Button
                                        variant="destructive"
                                        onClick={() => deleteLead(selectedLead.id)}
                                        className="flex-1 hover:bg-red-900/50"
                                    >
                                        <Trash2 size={16} className="mr-2" /> Delete
                                    </Button>
                                    <Button
                                        onClick={handleSaveLead}
                                        disabled={saving}
                                        className="flex-[2] shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-[0_0_25px_-2px_var(--color-primary)] transition-all"
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

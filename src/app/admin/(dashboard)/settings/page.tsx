"use client";

import { useState } from "react";
import {
    Settings, User, Lock, Users, Bell, CreditCard, Palette,
    BarChart, Plug, HardDrive, Cpu, Scale, Search, Save,
    CheckCircle2, AlertTriangle, RefreshCw, ChevronRight,
    Shield, Globe, Database, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Configuration ---

const SETTINGS_GROUPS = [
    {
        title: "Identity & Access",
        items: [
            { id: "account", label: "Account Profile", icon: User },
            { id: "security", label: "Security & MFA", icon: Lock, restricted: true },
            { id: "users", label: "Users & Roles", icon: Users },
        ]
    },
    {
        title: "Billing & Finance",
        items: [
            { id: "billing", label: "Billing & Plans", icon: CreditCard, restricted: true },
            { id: "invoices", label: "Invoices", icon: FileTextIcon, restricted: true }, // Placeholder icon
        ]
    },
    {
        title: "System & Config",
        items: [
            { id: "general", label: "General Settings", icon: Settings },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "appearance", label: "Appearance", icon: Palette },
            { id: "storage", label: "Storage & CDN", icon: HardDrive },
            { id: "system", label: "System Status", icon: Cpu },
        ]
    },
    {
        title: "Marketing & Growth",
        items: [
            { id: "seo", label: "SEO & Metadata", icon: BarChart },
            { id: "integrations", label: "Integrations", icon: Plug },
        ]
    },
    {
        title: "Legal & Compliance",
        items: [
            { id: "compliance", label: "Compliance Center", icon: Scale, restricted: true },
        ]
    }
];

// Mock icon for Invoices since it wasn't imported
function FileTextIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [searchTerm, setSearchTerm] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Flatten items for search
    const allItems = SETTINGS_GROUPS.flatMap(g => g.items.map(i => ({ ...i, group: g.title })));

    const filteredGroups = searchTerm
        ? [{
            title: "Search Results",
            items: allItems.filter(i => i.label.toLowerCase().includes(searchTerm.toLowerCase()))
        }]
        : SETTINGS_GROUPS;

    const handleSave = (section: string) => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
            {/* Top Navigation Bar */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div>
                        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                            <ChevronRight size={14} />
                            <span className="text-white font-medium">Settings</span>
                            {activeTab && (
                                <>
                                    <ChevronRight size={14} />
                                    <span className="text-primary capitalize">{allItems.find(i => i.id === activeTab)?.label || activeTab}</span>
                                </>
                            )}
                        </nav>
                        <h1 className="text-2xl font-bold text-white font-poppins flex items-center gap-3">
                            Settings
                            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-mono border border-green-500/20 uppercase tracking-wide">
                                Production
                            </span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 px-3 py-1.5 bg-white/5 rounded-full">
                        <Shield size={12} className="text-primary" />
                        <span>Admin Access</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-9 gap-2 text-gray-400 border-white/10 hover:bg-white/5 hover:text-white">
                        <HelpCircle size={14} /> Help
                    </Button>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Settings Navigation */}
                <nav className="lg:col-span-3 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input
                            type="text"
                            placeholder="Search settings..."
                            className="w-full bg-[#0F141A] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="space-y-6">
                        {filteredGroups.map((group, idx) => (
                            (group.items.length > 0) && (
                                <div key={idx}>
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                                        {group.title}
                                    </h3>
                                    <div className="space-y-0.5">
                                        {group.items.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id)}
                                                className={cn(
                                                    "w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-sm transition-all duration-200 group",
                                                    activeTab === item.id
                                                        ? "bg-primary/10 text-primary font-medium"
                                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon size={16} className={activeTab === item.id ? "text-primary" : "text-gray-500 group-hover:text-gray-300"} />
                                                    {item.label}
                                                </div>
                                                {item.restricted && (
                                                    <Lock size={12} className="text-gray-600 group-hover:text-gray-500" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}

                        {filteredGroups.length === 0 && (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                No settings found.
                            </div>
                        )}
                    </div>
                </nav>

                {/* Content Panel */}
                <main className="lg:col-span-9 bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden flex flex-col relative">
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-4xl"
                            >
                                {renderSection(activeTab, isSaving, handleSave)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}

// --- Section Renderers ---

function renderSection(id: string, isSaving: boolean, onSave: (id: string) => void) {
    const commonProps = { isSaving, onSave };

    switch (id) {
        case 'general':
            return <GeneralSettings {...commonProps} />;
        case 'appearance':
            return <AppearanceSettings {...commonProps} />;
        case 'system':
            return <SystemStatus />;
        case 'billing':
        case 'security':
        case 'compliance':
            return <RestrictedSection id={id} />;
        default:
            return <ComingSoonSection id={id} />;
    }
}

// --- Sub-Components ---

function GeneralSettings({ isSaving, onSave }: { isSaving: boolean, onSave: (id: string) => void }) {
    return (
        <div className="space-y-8">
            <SectionHeader
                title="General Settings"
                description="Manage your workspace identity, regional preferences, and public visibility."
            />

            <div className="grid gap-8">
                {/* Identity */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-white border-b border-white/5 pb-2">Workspace Identity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Workspace Name</Label>
                            <Input defaultValue="Digihub Solutions" />
                        </div>
                        <div className="space-y-2">
                            <Label>Public Tagline</Label>
                            <Input defaultValue="Leading Data-Driven Marketing Agency" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea defaultValue="We help businesses grow using AI-powered marketing strategies." />
                    </div>
                </div>

                {/* Regional */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-white border-b border-white/5 pb-2">Regional Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Contact Email</Label>
                            <Input defaultValue="admin@digihub.com" />
                        </div>
                        <div className="space-y-2">
                            <Label>Timezone</Label>
                            <select className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm">
                                <option>UTC (GMT+00:00)</option>
                                <option>EST (GMT-05:00)</option>
                                <option>IST (GMT+05:30)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-4">
                    <div className="border border-red-500/20 bg-red-500/5 p-5 rounded-xl flex items-start justify-between">
                        <div>
                            <h3 className="text-red-400 font-medium mb-1 flex items-center gap-2">
                                <AlertTriangle size={16} /> Maintenance Mode
                            </h3>
                            <p className="text-xs text-red-400/60 max-w-sm">
                                Enable maintenance mode to disable public access to the landing pages. Admins can still log in.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-red-400 uppercase">Off</span>
                            <div className="relative inline-block w-10 align-middle select-none">
                                <input type="checkbox" className="absolute block w-5 h-5 rounded-full bg-red-900 border-2 border-red-500/50 appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex justify-end pt-4 border-t border-white/5">
                    <Button onClick={() => onSave('general')} disabled={isSaving} className="min-w-[120px]">
                        {isSaving ? <RefreshCw className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

function AppearanceSettings({ isSaving, onSave }: { isSaving: boolean, onSave: (id: string) => void }) {
    return (
        <div className="space-y-8">
            <SectionHeader
                title="Appearance"
                description="Customize the look and feel of your admin dashboard."
            />

            <div className="grid gap-8">
                <div className="space-y-4">
                    <Label>Theme Preference</Label>
                    <div className="grid grid-cols-3 gap-4">
                        {['Dark', 'Light', 'System'].map(theme => (
                            <button key={theme} className={cn(
                                "p-4 border rounded-xl text-center transition-all text-sm font-medium",
                                theme === 'Dark' ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-[#0B0F14] text-gray-400 hover:border-white/30"
                            )}>
                                {theme}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>Accent Color</Label>
                    <div className="flex gap-4">
                        {['#00E5C0', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'].map(color => (
                            <button
                                key={color}
                                className="w-12 h-12 rounded-full border-2 border-transparent hover:border-white transition-all ring-2 ring-transparent hover:ring-white/20"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                    <Button onClick={() => onSave('appearance')} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Update Preferences"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

function RestrictedSection({ id }: { id: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <Lock className="text-red-500" size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 capitalize">{id} Settings Restricted</h2>
            <p className="text-gray-400 max-w-md mb-8">
                You do not have the required permissions to access the {id} configuration. Please contact the workspace owner.
            </p>
            <Button variant="outline" className="border-white/10 text-gray-400 hover:text-white">
                Request Access
            </Button>
        </div>
    )
}

function ComingSoonSection({ id }: { id: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Cpu className="text-gray-500" size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 capitalize">{id} Module</h2>
            <p className="text-gray-400 max-w-md mb-6">
                This module is currently being provisioned for your environment. Check back soon.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                <RefreshCw size={12} className="animate-spin" /> Provisioning...
            </div>
        </div>
    )
}

function SystemStatus() {
    return (
        <div className="space-y-6">
            <SectionHeader
                title="System Status"
                description="Real-time monitor of infrastructure services."
            />

            <div className="grid gap-4">
                {[
                    { name: "Database Cluster", status: "Operational", color: "text-green-400", bg: "bg-green-500/20" },
                    { name: "API Gateway", status: "Operational", color: "text-green-400", bg: "bg-green-500/20" },
                    { name: "Search Index", status: "Degraded", color: "text-yellow-400", bg: "bg-yellow-500/20" },
                    { name: "Storage Service", status: "Operational", color: "text-green-400", bg: "bg-green-500/20" },
                ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#0B0F14] border border-white/5 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Database size={16} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-200">{s.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={cn("inline-block w-2 h-2 rounded-full", s.bg.replace('/20', ''))} />
                            <span className={cn("text-xs font-semibold", s.color)}>{s.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// --- Helpers ---

function SectionHeader({ title, description }: { title: string, description: string }) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    );
}

function Label({ children }: { children: React.ReactNode }) {
    return <label className="block text-xs uppercase text-gray-500 font-bold mb-2 tracking-wide">{children}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm transition-colors focus:ring-1 focus:ring-primary/50" {...props} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return <textarea className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm transition-colors focus:ring-1 focus:ring-primary/50 min-h-[100px]" {...props} />;
}

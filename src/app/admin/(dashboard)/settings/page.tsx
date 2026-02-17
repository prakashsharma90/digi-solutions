"use client";

import { useState, useEffect } from "react";
import {
    Settings, User, Lock, Palette, BarChart, Bell,
    Shield, Globe, Database, Plug, FileText, Layers,
    Save, Search, RefreshCw, ChevronRight, HelpCircle,
    LayoutDashboard, Key, Mail, Smartphone, Clock,
    AlertTriangle, CheckCircle2, Upload, Trash2,
    Monitor, Moon, Image as ImageIcon, MapPin, Users,
    Plus, Edit3, UserPlus, UserX, ShieldCheck, Eye, EyeOff,
    Check, X, Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Configuration ---

const SETTINGS_CATEGORIES = [
    { id: "general", label: "General", icon: Settings, description: "Basic website information" },
    { id: "users", label: "Users & Roles", icon: Users, description: "Manage team access" },
    { id: "appearance", label: "Appearance", icon: Palette, description: "Theme & branding" },
    { id: "seo", label: "SEO", icon: Search, description: "Search engine optimization" },
    { id: "marketing", label: "Marketing", icon: BarChart, description: "Tracking & analytics" },
    { id: "security", label: "Security", icon: Shield, description: "Protection & access" },
    { id: "backup", label: "Backup", icon: Database, description: "Data management" },
    { id: "integrations", label: "Integrations", icon: Plug, description: "API & third-party tools" },
    { id: "content", label: "Content", icon: FileText, description: "Blog & page settings" },
    { id: "notifications", label: "Notifications", icon: Bell, description: "Alert preferences" },
    { id: "analytics", label: "Analytics", icon: Layers, description: "Dashboard configuration" },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [searchTerm, setSearchTerm] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const filteredCategories = searchTerm
        ? SETTINGS_CATEGORIES.filter(c => c.label.toLowerCase().includes(searchTerm.toLowerCase()))
        : SETTINGS_CATEGORIES;

    const handleSave = (section: string) => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => setIsSaving(false), 1500);
    };

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">


            {/* Main Layout */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Sidebar Navigation */}
                <nav className="lg:col-span-3 flex flex-col h-full bg-[#0B0F14] border border-white/5 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                    <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                            <input
                                type="text"
                                placeholder="Search settings..."
                                className="w-full bg-[#0F141A] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-300 placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {filteredCategories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={cn(
                                    "w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-4 text-sm transition-all duration-300 group relative border border-transparent",
                                    activeTab === category.id
                                        ? "bg-white/[0.08] text-white border-l-4 border-l-primary shadow-lg shadow-black/20"
                                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                                )}
                            >
                                <category.icon
                                    size={20}
                                    className={cn(
                                        "transition-colors duration-300",
                                        activeTab === category.id ? "text-primary drop-shadow-[0_0_8px_rgba(0,217,195,0.5)]" : "text-gray-500 group-hover:text-gray-300"
                                    )}
                                />
                                <div className="flex flex-col">
                                    <span className={cn("font-medium", activeTab === category.id ? "text-white" : "text-gray-400")}>
                                        {category.label}
                                    </span>
                                    {activeTab !== category.id && (
                                        <span className="text-[10px] text-gray-600 font-normal group-hover:text-gray-500 transition-colors">
                                            {category.description}
                                        </span>
                                    )}
                                </div>
                                {activeTab === category.id && (
                                    <motion.div
                                        layoutId="active-nav-indicator"
                                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary"
                                    />
                                )}
                            </button>
                        ))}

                        {filteredCategories.length === 0 && (
                            <div className="text-center py-10 px-4 text-gray-500 text-sm">
                                <Search size={24} className="mx-auto mb-2 opacity-20" />
                                No settings found matching "{searchTerm}"
                            </div>
                        )}
                    </div>


                    <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            System Operational
                            <span className="ml-auto opacity-50">v2.4.0</span>
                        </div>
                    </div>
                </nav>

                {/* Content Panel */}
                <main className="lg:col-span-9 bg-[#0B0F14] border border-white/5 rounded-2xl overflow-hidden flex flex-col relative shadow-2xl shadow-black/40">
                    <div className="flex-1 overflow-y-auto p-8 md:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-4xl mx-auto"
                            >
                                {renderSection(activeTab, isSaving, handleSave)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div >
        </div >
    );
}

// --- Section Renderers ---

function renderSection(id: string, isSaving: boolean, onSave: (id: string) => void) {
    const commonProps = { isSaving, onSave };

    switch (id) {
        case 'general':
            return <GeneralSettings {...commonProps} />;
        case 'users':
            return <UsersRolesSettings />;
        default:
            return <PlaceholderSection id={id} />;
    }
}

// --- Sub-Components ---

function GeneralSettings({ isSaving, onSave }: { isSaving: boolean, onSave: (id: string) => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    // Form state
    const [siteName, setSiteName] = useState("Digihub Solutions");
    const [tagline, setTagline] = useState("Leading Data-Driven Marketing Agency");
    const [adminEmail, setAdminEmail] = useState("admin@digihub.com");
    const [contactNumber, setContactNumber] = useState("+1 (555) 000-0000");
    const [websiteUrl, setWebsiteUrl] = useState("digihub.agency");
    const [language, setLanguage] = useState("English (US)");
    const [timezone, setTimezone] = useState("UTC (GMT+00:00)");
    const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");
    const [faviconUrl, setFaviconUrl] = useState("");

    // Original values for discard
    const [originalValues, setOriginalValues] = useState<Record<string, string>>({});

    // Load settings
    const loadSettings = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data.success && data.settings) {
                const s = data.settings;
                if (s.site_name) setSiteName(s.site_name);
                if (s.tagline) setTagline(s.tagline);
                if (s.admin_email) setAdminEmail(s.admin_email);
                if (s.contact_number) setContactNumber(s.contact_number);
                if (s.website_url) setWebsiteUrl(s.website_url);
                if (s.language) setLanguage(s.language);
                if (s.timezone) setTimezone(s.timezone);
                if (s.date_format) setDateFormat(s.date_format);
                if (s.maintenance_mode) setMaintenanceMode(s.maintenance_mode === "true");
                if (s.logo_url) setLogoUrl(s.logo_url);
                if (s.favicon_url) setFaviconUrl(s.favicon_url);
                setOriginalValues(s);
            }
        } catch (err) {
            console.error("Failed to load settings:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { loadSettings(); }, []);

    // Track changes
    const markChanged = () => setHasChanges(true);

    // Save all settings
    const handleSave = async () => {
        try {
            const settings: Record<string, string> = {
                site_name: siteName,
                tagline: tagline,
                admin_email: adminEmail,
                contact_number: contactNumber,
                website_url: websiteUrl,
                language: language,
                timezone: timezone,
                date_format: dateFormat,
                maintenance_mode: String(maintenanceMode),
                logo_url: logoUrl,
                favicon_url: faviconUrl,
            };

            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ settings }),
            });

            const data = await res.json();
            if (data.success) {
                setOriginalValues(settings);
                setHasChanges(false);
                setLastSaved(new Date().toLocaleTimeString());
                onSave("general");
            } else {
                alert("Failed to save: " + data.error);
            }
        } catch (err) {
            console.error("Save error:", err);
            alert("Failed to save settings. Check console for details.");
        }
    };

    // Discard changes
    const handleDiscard = () => {
        const s = originalValues;
        setSiteName(s.site_name || "Digihub Solutions");
        setTagline(s.tagline || "Leading Data-Driven Marketing Agency");
        setAdminEmail(s.admin_email || "admin@digihub.com");
        setContactNumber(s.contact_number || "+1 (555) 000-0000");
        setWebsiteUrl(s.website_url || "digihub.agency");
        setLanguage(s.language || "English (US)");
        setTimezone(s.timezone || "UTC (GMT+00:00)");
        setDateFormat(s.date_format || "MM/DD/YYYY");
        setMaintenanceMode(s.maintenance_mode === "true");
        setLogoUrl(s.logo_url || "");
        setFaviconUrl(s.favicon_url || "");
        setHasChanges(false);
    };

    // Handle file upload (logo or favicon)
    const handleFileUpload = async (type: "logo" | "favicon") => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/png,image/jpeg,image/svg+xml,image/x-icon,image/webp";
        input.onchange = async (e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("/api/upload", { method: "POST", body: formData });
                const data = await res.json();
                if (data.success && data.url) {
                    if (type === "logo") {
                        setLogoUrl(data.url);
                    } else {
                        setFaviconUrl(data.url);
                    }
                    markChanged();
                } else {
                    alert("Upload failed: " + (data.error || "Unknown error"));
                }
            } catch (err) {
                console.error("Upload error:", err);
                alert("Upload failed. Check console.");
            }
        };
        input.click();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <RefreshCw className="animate-spin text-primary" size={32} />
                <p className="text-gray-400 text-sm">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <SectionHeader
                title="General Settings"
                description="Manage your website's core identity, contact information, and operating preferences."
            />

            {/* 1. Identity Section */}
            <div className="space-y-6">
                <SectionGroupTitle icon={<LayoutDashboard size={18} />} title="Website Identity" />

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Website Name / Brand Name</Label>
                            <Input value={siteName} onChange={(e) => { setSiteName(e.target.value); markChanged(); }} placeholder="e.g. My Agency" />
                            <p className="text-xs text-gray-500">Appears in browser title and emails.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Tagline / Description</Label>
                            <Input value={tagline} onChange={(e) => { setTagline(e.target.value); markChanged(); }} placeholder="e.g. We grow businesses" />
                            <p className="text-xs text-gray-500">Short description used for SEO and footer.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Logo Upload */}
                        <div className="space-y-3">
                            <Label>Brand Logo</Label>
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-16 h-16 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden"
                                    onClick={() => handleFileUpload("logo")}
                                >
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-primary font-bold text-xl">DS</div>
                                    )}
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Upload size={16} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Button variant="outline" size="sm" className="w-full text-xs h-8 border-white/10 hover:bg-white/5" onClick={() => handleFileUpload("logo")}>
                                        <Upload size={14} className="mr-2" /> Upload New
                                    </Button>
                                    {logoUrl && (
                                        <Button variant="ghost" size="sm" className="w-full text-xs h-7 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => { setLogoUrl(""); markChanged(); }}>
                                            <Trash2 size={12} className="mr-1" /> Remove
                                        </Button>
                                    )}
                                    <p className="text-[10px] text-gray-500">Rec: 512x512px PNG/SVG</p>
                                </div>
                            </div>
                        </div>

                        {/* Favicon Upload */}
                        <div className="space-y-3">
                            <Label>Favicon</Label>
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden"
                                    onClick={() => handleFileUpload("favicon")}
                                >
                                    {faviconUrl ? (
                                        <img src={faviconUrl} alt="Favicon" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-6 h-6 bg-primary rounded-full"></div>
                                    )}
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Upload size={14} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Button variant="outline" size="sm" className="w-full text-xs h-8 border-white/10 hover:bg-white/5" onClick={() => handleFileUpload("favicon")}>
                                        <Upload size={14} className="mr-2" /> Upload Icon
                                    </Button>
                                    {faviconUrl && (
                                        <Button variant="ghost" size="sm" className="w-full text-xs h-7 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => { setFaviconUrl(""); markChanged(); }}>
                                            <Trash2 size={12} className="mr-1" /> Remove
                                        </Button>
                                    )}
                                    <p className="text-[10px] text-gray-500">Rec: 32x32px ICO/PNG</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Contact & Location */}
            <div className="space-y-6">
                <SectionGroupTitle icon={<MapPin size={18} />} title="Contact & Location" />

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Admin Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                <Input value={adminEmail} onChange={(e) => { setAdminEmail(e.target.value); markChanged(); }} className="pl-9" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Contact Number</Label>
                            <div className="relative">
                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                <Input value={contactNumber} onChange={(e) => { setContactNumber(e.target.value); markChanged(); }} className="pl-9" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Website URL</Label>
                        <div className="flex items-center gap-2 bg-[#0F141A] border border-white/10 rounded-lg p-1 pl-3">
                            <span className="text-gray-500 text-sm">https://</span>
                            <input
                                className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm h-8"
                                value={websiteUrl}
                                onChange={(e) => { setWebsiteUrl(e.target.value); markChanged(); }}
                            />
                            <a href={`https://${websiteUrl}`} target="_blank" className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                                <Globe size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Regional & System */}
            <div className="space-y-6">
                <SectionGroupTitle icon={<Globe size={18} />} title="Regional Preferences" />

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Language</Label>
                            <select
                                className="w-full bg-[#0F141A] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                                value={language}
                                onChange={(e) => { setLanguage(e.target.value); markChanged(); }}
                            >
                                <option>English (US)</option>
                                <option>English (UK)</option>
                                <option>Spanish</option>
                                <option>French</option>
                                <option>German</option>
                                <option>Hindi</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Timezone</Label>
                            <select
                                className="w-full bg-[#0F141A] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                                value={timezone}
                                onChange={(e) => { setTimezone(e.target.value); markChanged(); }}
                            >
                                <option>UTC (GMT+00:00)</option>
                                <option>EST (GMT-05:00)</option>
                                <option>CST (GMT-06:00)</option>
                                <option>PST (GMT-08:00)</option>
                                <option>IST (GMT+05:30)</option>
                                <option>JST (GMT+09:00)</option>
                                <option>AEST (GMT+10:00)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Date Format</Label>
                            <select
                                className="w-full bg-[#0F141A] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                                value={dateFormat}
                                onChange={(e) => { setDateFormat(e.target.value); markChanged(); }}
                            >
                                <option>MM/DD/YYYY</option>
                                <option>DD/MM/YYYY</option>
                                <option>YYYY-MM-DD</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Maintenance Mode */}
            <div className="space-y-6">
                <SectionGroupTitle icon={<AlertTriangle size={18} className="text-yellow-500" />} title="Maintenance" />

                <div className={cn(
                    "border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300",
                    maintenanceMode
                        ? "bg-yellow-500/[0.08] border-yellow-500/20"
                        : "bg-yellow-500/[0.03] border-yellow-500/10"
                )}>
                    <div>
                        <h3 className="text-white font-medium mb-1">Maintenance Mode</h3>
                        <p className="text-sm text-gray-400 max-w-lg">
                            When enabled, your website will show a &quot;Under Maintenance&quot; page to all visitors. Admins can still access this dashboard.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={cn("text-xs font-bold uppercase tracking-widest", maintenanceMode ? "text-yellow-500" : "text-gray-500")}>
                            {maintenanceMode ? "ON" : "OFF"}
                        </span>
                        <button
                            onClick={() => { setMaintenanceMode(!maintenanceMode); markChanged(); }}
                            className={cn(
                                "w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300",
                                maintenanceMode ? "bg-yellow-500" : "bg-white/10 hover:bg-white/20"
                            )}
                        >
                            <div className={cn(
                                "w-4 h-4 rounded-full absolute top-1 transition-all duration-300",
                                maintenanceMode ? "left-7 bg-black" : "left-1 bg-gray-400"
                            )}></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Action */}
            <div className="sticky bottom-0 bg-[#0B0F14]/80 backdrop-blur-xl border-t border-white/5 -mx-8 -mb-8 p-6 flex items-center justify-between z-10">
                <div className="text-sm text-gray-500">
                    {lastSaved ? (
                        <>Last saved: <span className="text-gray-300">{lastSaved}</span></>
                    ) : (
                        <span className="text-gray-600">Not saved yet</span>
                    )}
                    {hasChanges && <span className="ml-3 text-yellow-500 text-xs font-medium">● Unsaved changes</span>}
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white hover:bg-white/5"
                        onClick={handleDiscard}
                        disabled={!hasChanges || isSaving}
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving || !hasChanges}
                        className={cn(
                            "font-bold min-w-[140px] transition-all",
                            hasChanges
                                ? "bg-primary text-black hover:bg-primary/90"
                                : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        )}
                    >
                        {isSaving ? <RefreshCw className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ============================
// USERS & ROLES SETTINGS
// ============================

type AdminUser = {
    id: string;
    name: string;
    email: string;
    role_id: string | null;
    status: string;
    avatar_url: string;
    last_login: string | null;
    created_at: string;
    role: { id: string; role_name: string } | null;
};

type AdminRole = {
    id: string;
    role_name: string;
    description: string;
    is_system: boolean;
    created_at: string;
    permissions: string[];
};

type Permission = {
    id: string;
    permission_key: string;
    permission_name: string;
    category: string;
    description: string;
};

function UsersRolesSettings() {
    const [subTab, setSubTab] = useState<"users" | "roles">("users");
    const [isLoading, setIsLoading] = useState(true);

    // Users state
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role_id: "" });
    const [editPassword, setEditPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showEditPassword, setShowEditPassword] = useState(false);
    const [confirmEditPassword, setConfirmEditPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    // Roles state
    const [roles, setRoles] = useState<AdminRole[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [showAddRole, setShowAddRole] = useState(false);
    const [editingRole, setEditingRole] = useState<AdminRole | null>(null);
    const [newRole, setNewRole] = useState({ role_name: "", description: "", permissions: [] as string[] });

    // Load data
    const loadData = async () => {
        setIsLoading(true);
        try {
            const [usersRes, rolesRes] = await Promise.all([
                fetch("/api/admin/users").then(r => r.json()),
                fetch("/api/admin/roles").then(r => r.json()),
            ]);
            if (usersRes.success) setUsers(usersRes.users);
            if (rolesRes.success) {
                setRoles(rolesRes.roles);
                setPermissions(rolesRes.permissions);
            }
        } catch (err) {
            console.error("Load error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    // --- User Actions ---
    const handleAddUser = async () => {
        if (!newUser.name || !newUser.email || !newUser.password) return alert("Name, email, and password are required");
        if (newUser.password.length < 6) return alert("Password must be at least 6 characters");
        if (newUser.password !== confirmNewPassword) return alert("Passwords do not match");
        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });
            const data = await res.json();
            if (data.success) {
                setUsers(prev => [data.user, ...prev]);
                setNewUser({ name: "", email: "", password: "", role_id: "" });
                setConfirmNewPassword("");
                setShowAddUser(false);
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) { console.error(err); }
    };

    const handleUpdateUser = async (user: any) => {
        try {
            const payload: any = {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id,
                status: user.status,
            };
            if (user.password) payload.password = user.password;

            const res = await fetch("/api/admin/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                setUsers(prev => prev.map(u => u.id === user.id ? data.user : u));
                setEditingUser(null);
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) { console.error(err); }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            const res = await fetch("/api/admin/users", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                setUsers(prev => prev.filter(u => u.id !== id));
            }
        } catch (err) { console.error(err); }
    };

    const handleToggleStatus = async (user: AdminUser) => {
        const newStatus = user.status === "active" ? "inactive" : "active";
        await handleUpdateUser({ ...user, status: newStatus });
    };

    // --- Role Actions ---
    const handleAddRole = async () => {
        if (!newRole.role_name) return alert("Role name required");
        try {
            const res = await fetch("/api/admin/roles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRole),
            });
            const data = await res.json();
            if (data.success) {
                await loadData();
                setNewRole({ role_name: "", description: "", permissions: [] });
                setShowAddRole(false);
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) { console.error(err); }
    };

    const handleUpdateRole = async () => {
        if (!editingRole) return;
        try {
            const res = await fetch("/api/admin/roles", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editingRole.id,
                    role_name: editingRole.role_name,
                    description: editingRole.description,
                    permissions: editingRole.permissions,
                }),
            });
            const data = await res.json();
            if (data.success) {
                await loadData();
                setEditingRole(null);
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) { console.error(err); }
    };

    const handleDeleteRole = async (id: string) => {
        if (!confirm("Are you sure? Users with this role will lose their role assignment.")) return;
        try {
            const res = await fetch("/api/admin/roles", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                setRoles(prev => prev.filter(r => r.id !== id));
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) { console.error(err); }
    };

    // Group permissions by category
    const permissionsByCategory = permissions.reduce((acc, perm) => {
        if (!acc[perm.category]) acc[perm.category] = [];
        acc[perm.category].push(perm);
        return acc;
    }, {} as Record<string, Permission[]>);

    const togglePermission = (permId: string, list: string[], setList: (l: string[]) => void) => {
        if (list.includes(permId)) {
            setList(list.filter(p => p !== permId));
        } else {
            setList([...list, permId]);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <RefreshCw className="animate-spin text-primary" size={32} />
                <p className="text-gray-400 text-sm">Loading users & roles...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <SectionHeader
                title="Users & Roles"
                description="Manage who can access your admin panel and define what each person is allowed to do."
            />

            {/* Sub-tabs */}
            <div className="flex gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-1.5">
                <button
                    onClick={() => setSubTab("users")}
                    className={cn(
                        "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
                        subTab === "users"
                            ? "bg-primary text-black shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                >
                    <Users size={16} /> Users ({users.length})
                </button>
                <button
                    onClick={() => setSubTab("roles")}
                    className={cn(
                        "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
                        subTab === "roles"
                            ? "bg-primary text-black shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                >
                    <ShieldCheck size={16} /> Roles ({roles.length})
                </button>
            </div>

            {/* =================== USERS TAB =================== */}
            {subTab === "users" && (
                <div className="space-y-6">
                    {/* Add User Button */}
                    <div className="flex justify-end">
                        <Button
                            onClick={() => setShowAddUser(!showAddUser)}
                            className="bg-primary text-black hover:bg-primary/90 font-bold gap-2"
                        >
                            <UserPlus size={16} /> Add User
                        </Button>
                    </div>

                    {/* Add User Form */}
                    {showAddUser && (
                        <div className="bg-white/[0.03] border border-primary/20 rounded-2xl p-6 space-y-4">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <UserPlus className="text-primary" size={18} /> New Team Member
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label>Full Name</Label>
                                    <Input
                                        value={newUser.name}
                                        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                        placeholder="e.g. Rahul Sharma"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Email Address</Label>
                                    <Input
                                        value={newUser.email}
                                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                        placeholder="e.g. rahul@email.com"
                                        type="email"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Password</Label>
                                    <div className="relative">
                                        <Input
                                            value={newUser.password}
                                            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                            placeholder="Min 6 characters"
                                            type={showNewPassword ? "text" : "password"}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                        >
                                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-600">Used to login at /admin/login</p>
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Confirm Password</Label>
                                    <Input
                                        value={confirmNewPassword}
                                        onChange={e => setConfirmNewPassword(e.target.value)}
                                        placeholder="Re-enter password"
                                        type={showNewPassword ? "text" : "password"}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Assign Role</Label>
                                    <select
                                        className="w-full bg-[#0F141A] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                                        value={newUser.role_id}
                                        onChange={e => setNewUser({ ...newUser, role_id: e.target.value })}
                                    >
                                        <option value="">Select role...</option>
                                        {roles.map(r => (
                                            <option key={r.id} value={r.id}>{r.role_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end pt-2">
                                <Button variant="ghost" className="text-gray-400" onClick={() => { setShowAddUser(false); setNewUser({ name: "", email: "", password: "", role_id: "" }); }}>
                                    Cancel
                                </Button>
                                <Button className="bg-primary text-black font-bold" onClick={handleAddUser}>
                                    <Check size={16} className="mr-1" /> Create User
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Users List */}
                    <div className="space-y-3">
                        {users.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">
                                <Users size={40} className="mx-auto mb-3 text-gray-700" />
                                <p>No team members yet. Click &quot;Add User&quot; above.</p>
                            </div>
                        ) : (
                            users.map(user => (
                                <div key={user.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-white/10 transition-all group">
                                    {editingUser?.id === user.id ? (
                                        /* Edit Mode — Card Form */
                                        <div className="flex-1 bg-[#0F141A] border border-primary/20 rounded-xl p-6 space-y-5">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-white font-bold text-sm flex items-center gap-2">
                                                    <Edit3 size={16} className="text-primary" /> Edit Team Member
                                                </h4>
                                                <button onClick={() => { setEditingUser(null); setEditPassword(""); setConfirmEditPassword(""); }} className="text-gray-500 hover:text-white transition-colors">
                                                    <X size={18} />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <Label>Full Name</Label>
                                                    <Input value={editingUser.name} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} placeholder="Enter name" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label>Email Address</Label>
                                                    <Input type="email" value={editingUser.email} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} placeholder="Enter email" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label>New Password</Label>
                                                    <div className="relative">
                                                        <Input
                                                            value={editPassword}
                                                            onChange={e => setEditPassword(e.target.value)}
                                                            placeholder="Leave blank to keep current"
                                                            type={showEditPassword ? "text" : "password"}
                                                            className="pr-10"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowEditPassword(!showEditPassword)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                                        >
                                                            {showEditPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </button>
                                                    </div>
                                                    <p className="text-[9px] text-gray-600">Leave blank to keep current password</p>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label>Confirm Password</Label>
                                                    <Input
                                                        value={confirmEditPassword}
                                                        onChange={e => setConfirmEditPassword(e.target.value)}
                                                        placeholder="Re-enter password"
                                                        type={showEditPassword ? "text" : "password"}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label>Role</Label>
                                                    <select
                                                        className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                                                        value={editingUser.role_id || ""}
                                                        onChange={e => setEditingUser({ ...editingUser, role_id: e.target.value })}
                                                    >
                                                        <option value="">Select role...</option>
                                                        {roles.map(r => <option key={r.id} value={r.id}>{r.role_name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label>Status</Label>
                                                    <select
                                                        className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary focus:outline-none"
                                                        value={editingUser.status}
                                                        onChange={e => setEditingUser({ ...editingUser, status: e.target.value })}
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                        <option value="suspended">Suspended</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 justify-end pt-2 border-t border-white/5">
                                                <Button variant="ghost" className="text-gray-400" onClick={() => { setEditingUser(null); setEditPassword(""); setConfirmEditPassword(""); }}>
                                                    Cancel
                                                </Button>
                                                <Button className="bg-primary text-black font-bold gap-2" onClick={() => {
                                                    if (editPassword && editPassword !== confirmEditPassword) {
                                                        return alert("Passwords do not match");
                                                    }
                                                    if (editPassword && editPassword.length < 6) {
                                                        return alert("Password must be at least 6 characters");
                                                    }
                                                    const payload: any = { ...editingUser };
                                                    if (editPassword.length >= 6) payload.password = editPassword;
                                                    handleUpdateUser(payload);
                                                    setEditPassword("");
                                                    setConfirmEditPassword("");
                                                }}>
                                                    <Check size={16} /> Save Changes
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* View Mode */
                                        <>
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white font-medium text-sm truncate">{user.name}</span>
                                                        <span className={cn(
                                                            "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                                                            user.status === "active" ? "bg-green-500/10 text-green-400" :
                                                                user.status === "suspended" ? "bg-red-500/10 text-red-400" :
                                                                    "bg-gray-500/10 text-gray-400"
                                                        )}>
                                                            {user.status}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 truncate">{user.email}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0">
                                                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium">
                                                    {user.role?.role_name || "No Role"}
                                                </span>

                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleToggleStatus(user)}
                                                        className={cn("p-1.5 rounded-lg transition-colors", user.status === "active" ? "hover:bg-yellow-500/10 text-gray-500 hover:text-yellow-500" : "hover:bg-green-500/10 text-gray-500 hover:text-green-500")}
                                                        title={user.status === "active" ? "Deactivate" : "Activate"}
                                                    >
                                                        {user.status === "active" ? <EyeOff size={14} /> : <Eye size={14} />}
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingUser(user)}
                                                        className="p-1.5 rounded-lg hover:bg-blue-500/10 text-gray-500 hover:text-blue-400 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit3 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* =================== ROLES TAB =================== */}
            {subTab === "roles" && (
                <div className="space-y-6">
                    {/* Add Role Button */}
                    <div className="flex justify-end">
                        <Button
                            onClick={() => setShowAddRole(!showAddRole)}
                            className="bg-primary text-black hover:bg-primary/90 font-bold gap-2"
                        >
                            <Plus size={16} /> Create Role
                        </Button>
                    </div>

                    {/* Add Role Form */}
                    {showAddRole && (
                        <div className="bg-white/[0.03] border border-primary/20 rounded-2xl p-6 space-y-6">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <ShieldCheck className="text-primary" size={18} /> New Role
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label>Role Name</Label>
                                    <Input
                                        value={newRole.role_name}
                                        onChange={e => setNewRole({ ...newRole, role_name: e.target.value })}
                                        placeholder="e.g. Marketing Lead"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Description</Label>
                                    <Input
                                        value={newRole.description}
                                        onChange={e => setNewRole({ ...newRole, description: e.target.value })}
                                        placeholder="e.g. Manages marketing campaigns"
                                    />
                                </div>
                            </div>

                            {/* Permissions Grid */}
                            <div className="space-y-4">
                                <Label>Permissions</Label>
                                {Object.entries(permissionsByCategory).map(([category, perms]) => (
                                    <div key={category} className="space-y-2">
                                        <h4 className="text-xs text-primary uppercase tracking-widest font-bold">{category}</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {perms.map(perm => (
                                                <label
                                                    key={perm.id}
                                                    className={cn(
                                                        "flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-xs",
                                                        newRole.permissions.includes(perm.id)
                                                            ? "bg-primary/10 border-primary/30 text-white"
                                                            : "bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/10"
                                                    )}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={newRole.permissions.includes(perm.id)}
                                                        onChange={() => togglePermission(perm.id, newRole.permissions, (l) => setNewRole({ ...newRole, permissions: l }))}
                                                    />
                                                    <div className={cn(
                                                        "w-4 h-4 rounded border flex items-center justify-center shrink-0",
                                                        newRole.permissions.includes(perm.id)
                                                            ? "bg-primary border-primary"
                                                            : "border-white/20"
                                                    )}>
                                                        {newRole.permissions.includes(perm.id) && <Check size={10} className="text-black" />}
                                                    </div>
                                                    {perm.permission_name}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 justify-end pt-2">
                                <Button variant="ghost" className="text-gray-400" onClick={() => { setShowAddRole(false); setNewRole({ role_name: "", description: "", permissions: [] }); }}>
                                    Cancel
                                </Button>
                                <Button className="bg-primary text-black font-bold" onClick={handleAddRole}>
                                    <Check size={16} className="mr-1" /> Create Role
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Edit Role Modal */}
                    {editingRole && (
                        <div className="bg-white/[0.03] border border-blue-500/20 rounded-2xl p-6 space-y-6">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <Edit3 className="text-blue-400" size={18} /> Editing: {editingRole.role_name}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label>Role Name</Label>
                                    <Input
                                        value={editingRole.role_name}
                                        onChange={e => setEditingRole({ ...editingRole, role_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Description</Label>
                                    <Input
                                        value={editingRole.description}
                                        onChange={e => setEditingRole({ ...editingRole, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label>Permissions</Label>
                                {Object.entries(permissionsByCategory).map(([category, perms]) => (
                                    <div key={category} className="space-y-2">
                                        <h4 className="text-xs text-primary uppercase tracking-widest font-bold">{category}</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {perms.map(perm => (
                                                <label
                                                    key={perm.id}
                                                    className={cn(
                                                        "flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-xs",
                                                        editingRole.permissions.includes(perm.id)
                                                            ? "bg-primary/10 border-primary/30 text-white"
                                                            : "bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/10"
                                                    )}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={editingRole.permissions.includes(perm.id)}
                                                        onChange={() => {
                                                            const perms = editingRole.permissions.includes(perm.id)
                                                                ? editingRole.permissions.filter(p => p !== perm.id)
                                                                : [...editingRole.permissions, perm.id];
                                                            setEditingRole({ ...editingRole, permissions: perms });
                                                        }}
                                                    />
                                                    <div className={cn(
                                                        "w-4 h-4 rounded border flex items-center justify-center shrink-0",
                                                        editingRole.permissions.includes(perm.id)
                                                            ? "bg-primary border-primary"
                                                            : "border-white/20"
                                                    )}>
                                                        {editingRole.permissions.includes(perm.id) && <Check size={10} className="text-black" />}
                                                    </div>
                                                    {perm.permission_name}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 justify-end pt-2">
                                <Button variant="ghost" className="text-gray-400" onClick={() => setEditingRole(null)}>
                                    Cancel
                                </Button>
                                <Button className="bg-primary text-black font-bold" onClick={handleUpdateRole}>
                                    <Save size={16} className="mr-1" /> Save Changes
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Roles List */}
                    <div className="space-y-3">
                        {roles.map(role => (
                            <div key={role.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-9 h-9 rounded-lg flex items-center justify-center",
                                            role.is_system ? "bg-yellow-500/10 text-yellow-500" : "bg-primary/10 text-primary"
                                        )}>
                                            <ShieldCheck size={18} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-medium text-sm">{role.role_name}</span>
                                                {role.is_system && (
                                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 uppercase font-bold tracking-wider">System</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500">{role.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-600 mr-2">
                                            {role.permissions.length} permission{role.permissions.length !== 1 ? "s" : ""}
                                        </span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setEditingRole(role)}
                                                className="p-1.5 rounded-lg hover:bg-blue-500/10 text-gray-500 hover:text-blue-400 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            {!role.is_system && (
                                                <button
                                                    onClick={() => handleDeleteRole(role.id)}
                                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Permission tags */}
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {permissions
                                        .filter(p => role.permissions.includes(p.id))
                                        .map(perm => (
                                            <span key={perm.id} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                                                {perm.permission_name}
                                            </span>
                                        ))
                                    }
                                    {role.permissions.length === 0 && (
                                        <span className="text-[10px] text-gray-600 italic">No permissions assigned</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function PlaceholderSection({ id }: { id: string }) {
    const category = SETTINGS_CATEGORIES.find(c => c.id === id);
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center">
                {category?.icon && <category.icon size={32} className="text-gray-600" />}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">{category?.label} Settings</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    This module is currently under development. You will be able to configure {category?.description?.toLowerCase()} here soon.
                </p>
            </div>
            <Button variant="outline" className="border-white/10 text-gray-400 hover:text-white">
                <RefreshCw size={14} className="mr-2" /> Check for Updates
            </Button>
        </div>
    );
}



// --- Helpers ---

function SectionHeader({ title, description }: { title: string, description: string }) {
    return (
        <div className="mb-8 pb-6 border-b border-white/5">
            <h2 className="text-3xl font-bold text-white mb-2 font-poppins">{title}</h2>
            <p className="text-gray-400 text-base max-w-2xl">{description}</p>
        </div>
    );
}

function SectionGroupTitle({ icon, title }: { icon: any, title: string }) {
    return (
        <div className="flex items-center gap-3 mb-2 text-primary">
            {icon}
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
    )
}

function Label({ children }: { children: React.ReactNode }) {
    return <label className="block text-xs uppercase text-gray-500 font-bold mb-2 tracking-wide">{children}</label>;
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className={cn("w-full bg-[#0F141A] border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm transition-all focus:ring-1 focus:ring-primary/50 placeholder:text-gray-700", className)} {...props} />;
}


"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import {
    Save, ArrowLeft, Layout, Search, Globe, DollarSign,
    BarChart, Image as ImageIcon, Eye, Trash2, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ServiceEditor() {
    const params = useParams();
    const router = useRouter();
    const id = params.id === 'new' ? '' : params.id;
    const isNew = !id;

    const [activeTab, setActiveTab] = useState("general");
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "Marketing",
        shortDescription: "",
        content: "",
        status: "Draft",
        visible: false,
        display_tags: [] as string[],
        icon: "",
        metaTitle: "",
        metaDescription: "",
        pricingType: "custom",
        price: "",
        ctaText: "Get Started",
        ctaAction: "contact",
    });

    useEffect(() => {
        if (!isNew && id) {
            fetchService();
        }
    }, [id]);

    const fetchService = async () => {
        try {
            const res = await fetch(`/api/services/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({ ...prev, ...data }));
            }
        } catch (error) {
            console.error("Failed to fetch service", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const method = isNew ? "POST" : "PATCH";
            const url = isNew ? "/api/services" : `/api/services/${id}`;

            // Auto-generate ID from name if new
            const payload = { ...formData };
            if (isNew && !payload.id) {
                payload.id = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push("/admin/services");
            } else {
                alert("Failed to save service");
            }
        } catch (error) {
            console.error("Error saving:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        try {
            const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
            if (res.ok) router.push("/admin/services");
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    return (
        <div className="flex h-screen bg-[#0B0F14]">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto pb-20">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0B0F14] z-10 py-4 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                                <ArrowLeft size={20} />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-white font-poppins">
                                    {isNew ? "Add New Service" : "Edit Service"}
                                </h1>
                                <p className="text-sm text-gray-400">
                                    {isNew ? "Create a new service offering" : `Editing: ${formData.name}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {!isNew && (
                                <Button variant="destructive" size="icon" onClick={handleDelete} title="Delete Service">
                                    <Trash2 size={18} />
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                className="border-white/10 hover:bg-white/5 gap-2"
                                onClick={() => window.open(`/services/${formData.id}`, '_blank')}
                                disabled={isNew}
                            >
                                <Eye size={16} /> Preview
                            </Button>
                            <Button className="gap-2" onClick={handleSave} disabled={saving}>
                                {saving ? <Layout className="animate-spin" size={16} /> : <Save size={16} />}
                                {isNew ? "Publish Service" : "Save Changes"}
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-[#0F141A] p-1 rounded-xl mb-8 w-fit border border-white/5">
                        {[
                            { id: "general", label: "General", icon: Layout },
                            { id: "seo", label: "SEO", icon: Search },
                            { id: "pricing", label: "Pricing", icon: DollarSign },
                            { id: "analytics", label: "Analytics", icon: BarChart },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    activeTab === tab.id
                                        ? "bg-white/10 text-white shadow-sm"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6">

                        {/* GENERAL TAB */}
                        {activeTab === "general" && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-[#0F141A] p-6 rounded-2xl border border-white/5 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">Core Info</h3>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Service Name</label>
                                            <input
                                                type="text"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                                placeholder="e.g. AI Marketing Automation"
                                                value={formData.name}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Category</label>
                                                <select
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                                    value={formData.category}
                                                    onChange={(e) => handleChange("category", e.target.value)}
                                                >
                                                    <option>Marketing</option>
                                                    <option>Development</option>
                                                    <option>SEO</option>
                                                    <option>Design</option>
                                                    <option>AI Solutions</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Slug (URL)</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                                    placeholder="auto-generated"
                                                    value={formData.id}
                                                    onChange={(e) => handleChange("id", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#0F141A] p-6 rounded-2xl border border-white/5 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">Content</h3>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Short Description</label>
                                            <textarea
                                                rows={3}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none"
                                                placeholder="Brief summary for the service card..."
                                                value={formData.shortDescription}
                                                onChange={(e) => handleChange("shortDescription", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Full Details</label>
                                            <textarea
                                                rows={15}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                                placeholder="# Service Details..."
                                                value={formData.content}
                                                onChange={(e) => handleChange("content", e.target.value)}
                                            />
                                            <p className="text-[10px] text-gray-500 text-right">Markdown supported</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-[#0F141A] p-6 rounded-2xl border border-white/5 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">Visibility</h3>
                                        <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
                                            <span className="text-sm font-medium text-white">Visible on site</span>
                                            <div
                                                className={cn(
                                                    "w-12 h-6 rounded-full p-1 cursor-pointer transition-colors relative",
                                                    formData.visible ? "bg-primary" : "bg-gray-700"
                                                )}
                                                onClick={() => handleChange("visible", !formData.visible)}
                                            >
                                                <div className={cn(
                                                    "w-4 h-4 rounded-full bg-white transition-transform",
                                                    formData.visible ? "translate-x-6" : "translate-x-0"
                                                )} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Status</label>
                                            <select
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                                value={formData.status}
                                                onChange={(e) => handleChange("status", e.target.value)}
                                            >
                                                <option>Draft</option>
                                                <option>Published</option>
                                                <option>Archived</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Display On</label>
                                            <div className="space-y-2">
                                                {[
                                                    { id: 'home', label: 'Home Page' },
                                                    { id: 'services', label: 'Services Page' },
                                                    { id: 'navbar', label: 'Navigation Bar' }
                                                ].map(tag => (
                                                    <div
                                                        key={tag.id}
                                                        className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/5 cursor-pointer hover:border-primary/30 transition-colors"
                                                        onClick={() => {
                                                            const current = formData.display_tags || [];
                                                            const newTags = current.includes(tag.id)
                                                                ? current.filter(t => t !== tag.id)
                                                                : [...current, tag.id];
                                                            handleChange("display_tags", newTags);
                                                        }}
                                                    >
                                                        <div className={cn(
                                                            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                                                            (formData.display_tags || []).includes(tag.id)
                                                                ? "bg-primary border-primary"
                                                                : "border-white/20"
                                                        )}>
                                                            {(formData.display_tags || []).includes(tag.id) && (
                                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-white">{tag.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">Select where this service should appear on the website</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#0F141A] p-6 rounded-2xl border border-white/5 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">Media</h3>
                                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/30 hover:bg-white/5 transition-all">
                                            <ImageIcon className="text-gray-500 mb-2" size={32} />
                                            <p className="text-sm text-gray-400">Click to upload icon/cover</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SEO TAB */}
                        {activeTab === "seo" && (
                            <div className="bg-[#0F141A] p-6 rounded-2xl border border-white/5 space-y-6 max-w-3xl">
                                <h3 className="text-lg font-bold text-white">Search Engine Optimization</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Meta Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 text-blue-400"
                                            placeholder="Service Name | Agency Name"
                                            value={formData.metaTitle}
                                            onChange={(e) => handleChange("metaTitle", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Meta Description</label>
                                        <textarea
                                            rows={3}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none"
                                            placeholder="A compelling description for search results..."
                                            value={formData.metaDescription}
                                            onChange={(e) => handleChange("metaDescription", e.target.value)}
                                        />
                                    </div>
                                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                                        <p className="text-xs text-gray-500 mb-2 uppercase font-bold">Search Preview</p>
                                        <div className="font-sans">
                                            <p className="text-[#8ab4f8] text-xl truncate mb-1 cursor-pointer hover:underline">
                                                {formData.metaTitle || formData.name || "Service Title"}
                                            </p>
                                            <p className="text-[#006621] text-sm mb-1">
                                                https://digihub.com/services/{formData.id || "service-slug"}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {formData.metaDescription || "This is how your service page will appear in Google search results. Add a good description to improve click-through rates."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PRICING TAB */}
                        {activeTab === "pricing" && (
                            <div className="bg-[#0F141A] p-6 rounded-2xl border border-white/5 space-y-6 max-w-3xl">
                                <h3 className="text-lg font-bold text-white">Pricing & CTA</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Pricing Model</label>
                                        <select
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                            value={formData.pricingType}
                                            onChange={(e) => handleChange("pricingType", e.target.value)}
                                        >
                                            <option value="custom">Custom Quote</option>
                                            <option value="fixed">Fixed Price</option>
                                            <option value="starting">Starting From</option>
                                        </select>
                                    </div>
                                    {formData.pricingType !== 'custom' && (
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Price Amount</label>
                                            <input
                                                type="text"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                                placeholder="$999"
                                                value={formData.price}
                                                onChange={(e) => handleChange("price", e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="h-px bg-white/5 my-4" />
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase font-semibold pl-1">CTA Button Text</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                            value={formData.ctaText}
                                            onChange={(e) => handleChange("ctaText", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 uppercase font-semibold pl-1">Action</label>
                                        <select
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                            value={formData.ctaAction}
                                            onChange={(e) => handleChange("ctaAction", e.target.value)}
                                        >
                                            <option value="contact">Go to Contact Form</option>
                                            <option value="calendly">Open Calendly</option>
                                            <option value="whatsapp">Open WhatsApp</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ANALYTICS TAB */}
                        {activeTab === "analytics" && (
                            <div className="bg-[#0F141A] p-6 rounded-2xl border border-white/5 space-y-6">
                                <div className="text-center py-12">
                                    <BarChart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-white">Analytics Not Connected</h3>
                                    <p className="text-gray-400 max-w-md mx-auto mt-2">
                                        Once published, this service's performance metrics including page views, leads generated, and conversion rates will appear here.
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
// Update imports to include HelpCircle for tooltips (simulated) or just Info icon
import {
    X, Check, Plus, Trash2, GripVertical, AlertCircle,
    DollarSign, Calendar, Star, Zap, Info, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface PricingPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string;
    serviceName?: string; // Added prop for context
    planToEdit?: any;
    onSuccess: () => void;
}

export default function PricingPlanModal({
    isOpen,
    onClose,
    serviceId,
    serviceName = "Service", // Default fallback
    planToEdit,
    onSuccess
}: PricingPlanModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        currency: "INR",
        billing_cycle: "monthly",
        is_popular: false,
        is_active: false,
        is_custom: false, // New field
        features: [] as string[]
    });

    // Load data for edit mode
    useEffect(() => {
        if (planToEdit) {
            setFormData({
                title: planToEdit.title,
                price: planToEdit.price,
                currency: planToEdit.currency || "INR",
                billing_cycle: planToEdit.billing_cycle || "monthly",
                is_popular: planToEdit.is_popular,
                is_active: planToEdit.is_active,
                is_custom: planToEdit.is_custom || planToEdit.price === 0 || planToEdit.title.toLowerCase() === 'custom',
                features: planToEdit.features
                    ? planToEdit.features.map((f: any) => typeof f === 'string' ? f : f.feature_text)
                    : []
            });
        } else {
            setFormData({
                title: "",
                price: "",
                currency: "INR",
                billing_cycle: "monthly",
                is_popular: false,
                is_active: false,
                is_custom: false,
                features: [""]
            });
        }
    }, [planToEdit, isOpen]);

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (!formData.title) {
            alert("Title is required.");
            setLoading(false);
            return;
        }

        if (!formData.is_custom && (!formData.price || isNaN(Number(formData.price)))) {
            alert("Price is required for standard plans.");
            setLoading(false);
            return;
        }

        const payload = {
            ...formData,
            price: formData.is_custom ? 0 : parseFloat(formData.price),
            service_id: serviceId,
            features: formData.features.filter(f => f.trim() !== "")
        };

        try {
            let res;
            if (planToEdit) {
                // Update
                res = await fetch("/api/admin/pricing", {
                    method: "PUT",
                    body: JSON.stringify({ id: planToEdit.id, ...payload })
                });
            } else {
                // Create
                res = await fetch("/api/admin/pricing", {
                    method: "POST",
                    body: JSON.stringify(payload)
                });
            }

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                const error = await res.json();
                alert("Error: " + error.error);
            }
        } catch (err: any) {
            console.error(err);
            alert("Failed to save plan: " + (err.message || JSON.stringify(err)));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#0F141A] border-l border-white/5 shadow-2xl z-50 overflow-y-auto flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0F141A] sticky top-0 z-10">
                            <div>
                                <span className="text-xs font-mono text-primary mb-1 block uppercase tracking-wider">
                                    {serviceName}
                                </span>
                                <h2 className="text-xl font-bold text-white">
                                    {planToEdit ? "Edit Plan" : "Create New Plan"}
                                </h2>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-8 overflow-y-auto">

                            {/* Section: Core Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-white/50 border-b border-white/5 pb-2">CORE DETAILS</h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-medium">Plan Title <span className="text-red-400">*</span></label>
                                        <input
                                            list="plan-titles"
                                            type="text"
                                            placeholder="e.g. Starter, Growth, Enterprise"
                                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-primary/50"
                                            value={formData.title}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Auto-detect custom
                                                const isCustom = val.toLowerCase() === 'custom' || val.toLowerCase() === 'enterprise';

                                                setFormData({
                                                    ...formData,
                                                    title: val,
                                                    is_popular: val.toLowerCase() === 'growth' ? true : formData.is_popular,
                                                });
                                            }}
                                        />
                                        <datalist id="plan-titles">
                                            <option value="Starter" />
                                            <option value="Growth" />
                                            <option value="Scale" />
                                            <option value="Enterprise" />
                                            <option value="Custom" />
                                        </datalist>
                                    </div>

                                    {/* Custom Pricing Toggle */}
                                    <label className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-lg cursor-pointer hover:bg-white/[0.04] transition-colors">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-offset-0 focus:ring-primary bg-transparent"
                                            checked={formData.is_custom}
                                            onChange={(e) => setFormData({ ...formData, is_custom: e.target.checked })}
                                        />
                                        <div>
                                            <span className="text-sm text-gray-200 font-medium block">Contact Sales / Custom Pricing</span>
                                            <span className="text-xs text-gray-500">Enable this for Enterprise plans without fixed pricing.</span>
                                        </div>
                                    </label>

                                    {!formData.is_custom && (
                                        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400 font-medium">Price <span className="text-red-400">*</span></label>
                                                <div className="relative group">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">
                                                        {formData.currency === 'INR' ? '₹' : formData.currency === 'USD' ? '$' : ''}
                                                    </span>
                                                    <input
                                                        type="number"
                                                        placeholder="0.00"
                                                        className="w-full bg-[#0B0F14] border border-white/10 rounded-lg pl-8 pr-3 py-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-primary/50"
                                                        value={formData.price}
                                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-400 font-medium">Currency</label>
                                                <select
                                                    className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary/50 transition-all focus:ring-1 focus:ring-primary/50"
                                                    value={formData.currency}
                                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                                >
                                                    <option value="INR">INR (₹)</option>
                                                    <option value="USD">USD ($)</option>
                                                    <option value="AED">AED (د.إ)</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Billing Cycle (Hidden if Custom) */}
                            {!formData.is_custom && (
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-white/50 border-b border-white/5 pb-2">BILLING</h3>
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-medium">Billing Cycle</label>
                                        <select
                                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary/50 transition-all focus:ring-1 focus:ring-primary/50"
                                            value={formData.billing_cycle}
                                            onChange={(e) => setFormData({ ...formData, billing_cycle: e.target.value })}
                                        >
                                            <option value="monthly">Monthly</option>
                                            <option value="yearly">Yearly</option>
                                            <option value="one-time">One Time</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Section: Status & Highlights */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-white/50 border-b border-white/5 pb-2">VISIBILITY & STATUS</h3>
                                <div className="flex flex-col gap-3">
                                    <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-lg cursor-pointer hover:bg-white/[0.04] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${formData.is_popular ? 'bg-primary' : 'bg-gray-700'}`}>
                                                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${formData.is_popular ? 'translate-x-4' : 'translate-x-0'}`} />
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-200 font-medium block">Highlight as Popular</span>
                                                <span className="text-xs text-gray-500">Adds a "Most Popular" badge to the card.</span>
                                            </div>
                                        </div>
                                        <input type="checkbox" className="hidden" checked={formData.is_popular} onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })} />
                                    </label>

                                    <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-lg cursor-pointer hover:bg-white/[0.04] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${formData.is_active ? 'bg-green-500' : 'bg-gray-700'}`}>
                                                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${formData.is_active ? 'translate-x-4' : 'translate-x-0'}`} />
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-200 font-medium block">Active Status</span>
                                                <span className="text-xs text-gray-500">Visible to customers immediately if saved.</span>
                                            </div>
                                        </div>
                                        <input type="checkbox" className="hidden" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
                                    </label>
                                </div>
                            </div>

                            {/* Section: Features */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <label className="text-sm font-semibold text-white/50 uppercase">Features</label>
                                    <button type="button" onClick={addFeature} className="text-xs text-primary font-medium hover:text-white flex items-center gap-1 p-1 hover:bg-primary/10 rounded transition-colors">
                                        <Plus size={14} /> Add Feature
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2 items-center group">
                                            <GripVertical size={16} className="text-gray-700 cursor-grab hover:text-gray-400" />
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                placeholder="e.g. 5 Social Media Accounts"
                                                className="flex-1 bg-[#0B0F14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-700 hover:border-white/20"
                                            />
                                            <button type="button" onClick={() => removeFeature(index)} className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-500/10 rounded">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.features.length === 0 && (
                                        <div className="text-center py-6 text-gray-500 text-sm border border-dashed border-white/10 rounded-lg bg-white/[0.01]">
                                            No features added yet. Click "+ Add Feature" to start.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-[#0F141A] flex gap-3">
                            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} disabled={loading} className="flex-[2] gap-2 text-black font-bold">
                                {loading ? <Zap size={16} className="animate-spin" /> : <Save size={16} />}
                                {planToEdit ? "Save Changes" : "Create Plan"}
                            </Button>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

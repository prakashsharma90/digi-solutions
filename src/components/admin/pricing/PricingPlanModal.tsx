"use client";

import { useState, useEffect } from "react";
import {
    X, Check, Plus, Trash2, GripVertical, AlertCircle,
    DollarSign, Calendar, Star, Zap, Info, Save, Percent, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface PricingPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string;
    serviceName?: string;
    planToEdit?: any;
    existingPlans?: any[]; // For validation
    onSuccess: () => void;
}

export default function PricingPlanModal({
    isOpen,
    onClose,
    serviceId,
    serviceName = "Service",
    planToEdit,
    existingPlans = [],
    onSuccess
}: PricingPlanModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "", // Scope Summary
        price: "", // Monthly Price
        discount_percent: "", // Yearly Discount %
        currency: "INR",
        billing_cycle: "monthly",
        is_popular: false,
        is_active: false,
        is_custom: false,
        cta_text: "Get Started",
        features: [] as string[]
    });

    const [yearlyPreview, setYearlyPreview] = useState(0);

    // Load data for edit mode
    useEffect(() => {
        if (planToEdit) {
            setFormData({
                title: planToEdit.title,
                description: planToEdit.description || "",
                price: planToEdit.price,
                discount_percent: planToEdit.discount_percent || "20", // Default to 20 if missing
                currency: planToEdit.currency || "INR",
                billing_cycle: planToEdit.billing_cycle || "monthly",
                is_popular: planToEdit.is_popular,
                is_active: planToEdit.is_active,
                is_custom: planToEdit.is_custom || planToEdit.price === 0 || planToEdit.title.toLowerCase() === 'custom',
                cta_text: planToEdit.cta_text || "Get Started",
                features: planToEdit.features
                    ? planToEdit.features.map((f: any) => typeof f === 'string' ? f : f.feature_text)
                    : []
            });
        } else {
            setFormData({
                title: "",
                description: "",
                price: "",
                discount_percent: "20", // Default 20%
                currency: "INR",
                billing_cycle: "monthly",
                is_popular: false,
                is_active: false,
                is_custom: false,
                cta_text: "Get Started",
                features: [""]
            });
        }
    }, [planToEdit, isOpen]);

    // Calculate Yearly Price Preview
    useEffect(() => {
        const monthly = parseFloat(formData.price) || 0;
        const discount = parseFloat(formData.discount_percent) || 0;
        if (monthly > 0) {
            const yearlyTotal = monthly * 12;
            const savings = yearlyTotal * (discount / 100);
            setYearlyPreview(yearlyTotal - savings);
        } else {
            setYearlyPreview(0);
        }
    }, [formData.price, formData.discount_percent]);

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

    const formatCurrency = (amount: number) => {
        try {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: formData.currency,
                maximumFractionDigits: 0
            }).format(amount);
        } catch (e) {
            return amount.toString();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // --- VALIDATIONS ---

        // 1. Title Required
        if (!formData.title) {
            alert("Please enter a Plan Title.");
            setLoading(false);
            return;
        }

        // 1.5. Description Required
        if (!formData.description || formData.description.trim() === "") {
            alert("Please enter a Monthly Scope Summary.");
            setLoading(false);
            return;
        }

        // 2. High Price Check for Starter
        if (formData.title.toLowerCase().includes("starter")) {
            const priceVal = parseFloat(formData.price);
            if (priceVal > 50000 && formData.currency === 'INR') {
                if (!confirm(`Warning: ₹${priceVal} seems extremely high for a "Starter" plan. Are you sure?`)) {
                    setLoading(false);
                    return;
                }
            }
        }

        // 3. Price Validation
        if (!formData.is_custom) {
            if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) < 0) {
                alert("Please enter a valid monthly price.");
                setLoading(false);
                return;
            }
        }

        // 4. Popular Flag Check
        if (formData.is_popular) {
            const otherPopular = existingPlans.find(p => p.is_popular && p.id !== planToEdit?.id);
            if (otherPopular) {
                if (!confirm(`Plan "${otherPopular.title}" is already marked as Popular. This will switch the popular tag to the current plan. Continue?`)) {
                    setLoading(false);
                    return;
                }
            }
        }

        const payload = {
            ...formData,
            price: formData.is_custom ? 0 : parseFloat(formData.price),
            discount_percent: parseFloat(formData.discount_percent) || 0,
            yearly_price: yearlyPreview, // Send calculated yearly price
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[700px] bg-[#0F141A] border-l border-white/10 shadow-2xl z-[70] overflow-y-auto flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0F141A] sticky top-0 z-10">
                            <div>
                                <span className="text-xs font-mono text-primary mb-1 block uppercase tracking-wider">
                                    {serviceName}
                                </span>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {planToEdit ? <><ArrowRight className="w-5 h-5" /> Edit Plan</> : <><Plus className="w-5 h-5" /> Create Plan</>}
                                </h2>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex-1 p-8 space-y-10 overflow-y-auto">

                            {/* Section 1: Review & Scope */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Star className="w-4 h-4 text-primary" /> Core Information
                                </h3>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-300 font-medium">Plan Title <span className="text-red-400">*</span></label>
                                        <input
                                            list="plan-titles"
                                            type="text"
                                            placeholder="e.g. Starter, Growth"
                                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-primary/50"
                                            value={formData.title}
                                            onChange={(e) => {
                                                const val = e.target.value;
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
                                        </datalist>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-300 font-medium">Monthly Scope Summary <span className="text-red-400">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 10 Posts + Analytics"
                                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-600"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-300 font-medium">Button Text (CTA)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Get Started"
                                        className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-600"
                                        value={formData.cta_text}
                                        onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                                    />
                                </div>


                                {/* Custom/Enterprise Toggle */}
                                <label className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-offset-0 focus:ring-primary bg-transparent"
                                        checked={formData.is_custom}
                                        onChange={(e) => setFormData({ ...formData, is_custom: e.target.checked })}
                                    />
                                    <div>
                                        <span className="text-sm text-white font-bold block">Enterprise / Custom Pricing</span>
                                        <span className="text-xs text-gray-500">Enable this for high-ticket plans requiring sales consultation. Pricing fields will be disabled.</span>
                                    </div>
                                </label>
                            </div>

                            {/* Section 2: Pricing Logic */}
                            {!formData.is_custom && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-primary" /> Pricing & Discounts
                                    </h3>

                                    <div className="p-6 bg-[#0B0F14] rounded-xl border border-white/10 space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-300 font-medium">Monthly Price <span className="text-red-400">*</span></label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                                                        {formData.currency === 'INR' ? '₹' : '$'}
                                                    </span>
                                                    <input
                                                        type="number"
                                                        placeholder="45000"
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-3 text-white focus:border-primary outline-none transition-all font-mono text-lg"
                                                        value={formData.price}
                                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    />
                                                </div>
                                                {/* Text Formatter Preview */}
                                                {formData.price && (
                                                    <div className="text-[10px] text-gray-500 text-right">
                                                        Reads as: <span className="text-gray-300">{formatCurrency(parseFloat(formData.price))} /mo</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-300 font-medium">Currency</label>
                                                <select
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary transition-all"
                                                    value={formData.currency}
                                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                                >
                                                    <option value="INR">INR (₹)</option>
                                                    <option value="USD">USD ($)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Yearly Discount Logic */}
                                        <div className="pt-4 border-t border-white/10">
                                            <div className="flex items-center justify-between mb-4">
                                                <label className="text-xs text-blue-400 font-bold uppercase">Yearly Plan Settings</label>
                                                <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20">Auto-calculated</span>
                                            </div>

                                            <div className="grid grid-cols-12 gap-4 items-end">
                                                <div className="col-span-4 space-y-2">
                                                    <label className="text-xs text-gray-400">Discount %</label>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none text-right pr-8"
                                                            value={formData.discount_percent}
                                                            onChange={(e) => setFormData({ ...formData, discount_percent: e.target.value })}
                                                        />
                                                        <Percent className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
                                                    </div>
                                                </div>

                                                <div className="col-span-8 p-4 bg-primary/5 border border-primary/20 rounded-lg flex justify-between items-center">
                                                    <div>
                                                        <div className="text-xs text-gray-400 mb-1">Yearly Price (Billed Annually)</div>
                                                        <div className="text-xl font-bold text-white font-mono">{formatCurrency(yearlyPreview)}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xs text-green-400 font-bold mb-1">Save {formData.discount_percent || 0}%</div>
                                                        <div className="text-[10px] text-gray-500">
                                                            {formatCurrency(((parseFloat(formData.price) || 0) * 12) - yearlyPreview)} saved
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section 3: Configuration */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-primary" /> Configuration
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.is_popular ? 'bg-primary/10 border-primary' : 'bg-[#0B0F14] border-white/10 hover:border-white/20'}`}>
                                        <input type="checkbox" className="hidden" checked={formData.is_popular} onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })} />
                                        <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
                                            {formData.is_popular && <div className="w-3 h-3 bg-primary rounded-full" />}
                                        </div>
                                        <div>
                                            <span className={`text-sm font-bold block ${formData.is_popular ? 'text-white' : 'text-gray-400'}`}>Most Popular</span>
                                            <span className="text-[10px] text-gray-500">Highlight this plan</span>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.is_active ? 'bg-green-500/10 border-green-500' : 'bg-[#0B0F14] border-white/10 hover:border-white/20'}`}>
                                        <input type="checkbox" className="hidden" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
                                        <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
                                            {formData.is_active && <div className="w-3 h-3 bg-green-500 rounded-full" />}
                                        </div>
                                        <div>
                                            <span className={`text-sm font-bold block ${formData.is_active ? 'text-white' : 'text-gray-400'}`}>Active Status</span>
                                            <span className="text-[10px] text-gray-500">Make visible to users</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Section 4: Features */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <Check className="w-4 h-4 text-primary" /> Deliverables & SCOPE
                                    </h3>
                                    <button type="button" onClick={addFeature} className="text-xs text-primary font-bold hover:text-white flex items-center gap-1 p-2 hover:bg-primary/10 rounded transition-colors">
                                        <Plus size={14} /> ADD ITEM
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex gap-3 items-center group animate-in slide-in-from-left-2 duration-300">
                                            <GripVertical size={16} className="text-gray-700 cursor-grab hover:text-gray-400" />
                                            <div className="flex-1 relative">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                    placeholder="e.g. 5 Social Media Accounts"
                                                    className="w-full bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-700 hover:border-white/20"
                                                />
                                            </div>
                                            <button type="button" onClick={() => removeFeature(index)} className="text-gray-600 hover:text-red-400 bg-white/5 hover:bg-red-500/10 p-2 rounded-lg transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.features.length === 0 && (
                                        <div className="text-center py-8 text-gray-500 text-sm border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                                            <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            No deliverables added. Listing plans without features reduces conversion.
                                        </div>
                                    )}
                                </div>
                            </div>

                        </form>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-[#0F141A] flex gap-3 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                            <Button variant="outline" onClick={onClose} className="flex-1 h-12 bg-transparent border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} disabled={loading} className="flex-[2] h-12 gap-2 text-black font-bold bg-primary hover:bg-primary/90 text-base">
                                {loading ? <Zap size={18} className="animate-spin" /> : <Save size={18} />}
                                {planToEdit ? "Save Changes" : "Create Plan"}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    );
}

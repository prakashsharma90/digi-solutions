"use client";

import { useState, useEffect } from "react";
import {
    Plus, Edit, Trash2, Check, DollarSign, Star, Copy, LayoutGrid, Tag,
    AlertTriangle, Archive, Eye, EyeOff, ArrowLeft, ChevronDown, MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import PricingPlanModal from "@/components/admin/pricing/PricingPlanModal";
import { motion } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminPricing() {
    const [services, setServices] = useState<any[]>([]);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<any | null>(null);

    const supabase = createClient();

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (selectedService) {
            fetchPlans(selectedService);
        }
    }, [selectedService]);

    const fetchServices = async () => {
        const { data } = await supabase.from("services").select("id, name, slug").order("name");
        if (data && data.length > 0) {
            const uniqueServices = Array.from(new Map(data.map(item => [item.slug, item])).values());
            setServices(uniqueServices);
            if (!selectedService) setSelectedService(uniqueServices[0].id);
        }
        setLoading(false);
    };

    const fetchPlans = async (serviceId: string) => {
        setLoading(true);
        const res = await fetch(`/api/admin/pricing?serviceId=${serviceId}`);
        if (res.ok) {
            const data = await res.json();
            // Sort by price (mock sort)
            setPlans(data.sort((a: any, b: any) => a.price - b.price));
        }
        setLoading(false);
    };

    const handleCreate = () => {
        if (plans.length >= 3) {
            alert("Maximum 3 pricing plans allowed per service.");
            return;
        }
        setEditingPlan(null);
        setModalOpen(true);
    };

    const handleEdit = (plan: any) => {
        setEditingPlan(plan);
        setModalOpen(true);
    };

    const handleDuplicate = async (plan: any) => {
        if (plans.length >= 3) {
            alert("Cannot duplicate. Maximum 3 pricing plans allowed per service.");
            return;
        }

        if (!confirm(`Duplicate "${plan.title}"?`)) return;

        const newPlan = {
            ...plan,
            title: `${plan.title} (Copy)`,
            id: undefined,
            is_active: false // Safety: Duplicate as draft
        };

        try {
            const res = await fetch("/api/admin/pricing", {
                method: "POST",
                body: JSON.stringify({ ...newPlan, service_id: selectedService })
            });
            if (res.ok) fetchPlans(selectedService!);
        } catch (e) {
            alert("Failed to duplicate");
        }
    };

    const handleDelete = async (id: string, title: string) => {
        const confirmed = prompt(`TYPE "DELETE" to confirm deleting plan: ${title}`);
        if (confirmed !== "DELETE") return;

        const res = await fetch(`/api/admin/pricing?id=${id}`, { method: "DELETE" });
        if (res.ok) {
            fetchPlans(selectedService!);
        } else {
            alert("Failed to delete plan");
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        if (currency === 'INR') {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
        }
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 0 }).format(amount);
    };

    const selectedServiceData = services.find(s => s.id === selectedService);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">

            {/* Header with Breadcrumbs */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                    <span>Admin</span>
                    <span>/</span>
                    <span className="text-gray-300">Pricing</span>
                    {selectedServiceData && (
                        <>
                            <span>/</span>
                            <span className="text-primary">{selectedServiceData.name}</span>
                        </>
                    )}
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-poppins">Pricing Plans</h1>
                        <p className="text-gray-400 mt-1">Manage pricing tiers for your services.</p>
                    </div>
                </div>
            </div>

            {/* Service Selection Dropdown */}
            <div className="bg-[#0F141A] p-6 rounded-2xl border border-white/5 space-y-4">
                <label className="text-sm text-gray-400 uppercase tracking-widest font-bold">Select Service to Manage</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="w-full sm:w-[300px] flex items-center justify-between px-4 py-3 bg-[#0B0F14] border border-white/10 rounded-xl text-white hover:border-primary/50 transition-all group">
                                <span className="font-medium">{selectedServiceData?.name || "Select Service"}</span>
                                <ChevronDown className="text-gray-500 group-hover:text-primary transition-colors" size={18} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[300px] bg-[#0B0F14] border border-white/10 text-white max-h-[300px] overflow-y-auto">
                            {services.map((service) => (
                                <DropdownMenuItem
                                    key={service.id}
                                    onClick={() => setSelectedService(service.id)}
                                    className="cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-primary"
                                >
                                    {service.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Add New Plan Button (Max 3 Rule) */}
                    {selectedService && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500 font-mono">
                                {plans.length} / 3 Plans Created
                            </span>
                            <Button
                                onClick={handleCreate}
                                disabled={plans.length >= 3}
                                className={cn(
                                    "gap-2 shadow-[0_0_20px_-5px_var(--color-primary)] text-black font-bold transition-all",
                                    plans.length >= 3
                                        ? "bg-gray-800 text-gray-500 cursor-not-allowed shadow-none hover:bg-gray-800"
                                        : "bg-primary hover:bg-primary/90"
                                )}
                            >
                                <Plus size={18} />
                                {plans.length >= 3 ? "Limit Reached" : "Add New Plan"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 animate-pulse">Loading plans...</p>
                </div>
            ) : !selectedService ? (
                <div className="text-center py-20 text-gray-500">Select a service above to manage pricing</div>
            ) : plans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-[#0F141A] border border-white/5 rounded-2xl dashed">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <LayoutGrid size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">No plans configured</h3>
                    <p className="text-gray-400 text-sm mt-2 mb-8 max-w-md text-center">
                        This service has no active pricing tiers. Create up to 3 tiers (Starter, Pro, Enterprise).
                    </p>
                    <Button onClick={handleCreate} size="lg" className="bg-primary text-black hover:bg-primary/90">
                        <Plus size={18} className="mr-2" /> Add First Plan
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={cn(
                                "group flex flex-col relative bg-[#0F141A] border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 overflow-hidden",
                                plan.is_active ? "border-white/10 hover:border-white/20" : "border-red-900/30 opacity-75 grayscale-[0.5] hover:opacity-100 hover:grayscale-0",
                                plan.is_popular && plan.is_active && "border-primary/50 shadow-[0_0_20px_-10px_var(--color-primary)]"
                            )}
                        >
                            {/* Status Bar */}
                            <div className={cn(
                                "h-1 w-full",
                                plan.is_active ? "bg-green-500" : "bg-red-500"
                            )} />

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    {plan.is_popular ? (
                                        <div className="px-2 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded border border-primary/20 flex items-center gap-1">
                                            <Star size={10} fill="currentColor" /> Popular
                                        </div>
                                    ) : <div></div>}

                                    <div className={cn(
                                        "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border",
                                        plan.is_active
                                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                                            : "bg-red-500/10 text-red-500 border-red-500/20"
                                    )}>
                                        {plan.is_active ? "Live" : "Draft"}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>

                                {/* Short Description */}
                                <p className="text-sm text-gray-400 mb-6 line-clamp-2 min-h-[40px]">
                                    {plan.description || "No description provided."}
                                </p>

                                <div className="mb-6 pb-6 border-b border-white/5">
                                    {(plan.price === 0 || plan.title.toLowerCase() === 'custom' || plan.is_custom) ? (
                                        <div className="text-2xl font-bold text-white leading-tight py-2">Contact Sales</div>
                                    ) : (
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-white tracking-tight">
                                                {formatCurrency(plan.price, plan.currency || 'INR')}
                                            </span>
                                            {plan.billing_cycle !== 'one-time' && (
                                                <span className="text-xs text-gray-500 font-medium uppercase">/{plan.billing_cycle}</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 flex-1">
                                    <div className="text-xs font-semibold text-gray-500 uppercase flex justify-between">
                                        <span>Features Included</span>
                                        <span className="text-gray-700">{plan.features?.length || 0}</span>
                                    </div>
                                    {plan.features?.slice(0, 5).map((f: any, i: number) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                            <Check size={14} className="mt-1 text-primary shrink-0 opacity-70" />
                                            <span className="line-clamp-1">{typeof f === 'string' ? f : f.feature_text}</span>
                                        </div>
                                    ))}
                                    {(plan.features?.length || 0) > 5 && (
                                        <p className="text-xs text-gray-600 italic pl-7">
                                            + {plan.features.length - 5} more...
                                        </p>
                                    )}
                                </div>

                                {/* CTA Button Preview */}
                                <div className="mt-6 pt-4 border-t border-white/5">
                                    <div className="w-full py-2 bg-white/5 rounded text-center text-xs text-gray-400 font-medium border border-white/10">
                                        Btn: {plan.cta_text || "Get Started"}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 text-gray-500 hover:text-white"
                                    onClick={() => handleDuplicate(plan)}
                                    title="Duplicate Plan"
                                >
                                    <Copy size={14} />
                                </Button>

                                <div className="h-4 w-px bg-white/10" />

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 flex-1 text-gray-300 hover:text-white hover:bg-white/5"
                                    onClick={() => handleEdit(plan)}
                                >
                                    <Edit size={14} className="mr-2" /> Edit Details
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-red-500/60 hover:text-red-400 hover:bg-red-500/10"
                                    onClick={() => handleDelete(plan.id, plan.title)}
                                    title="Delete Plan"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedService && (
                <PricingPlanModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    serviceId={selectedService}
                    serviceName={selectedServiceData?.name}
                    planToEdit={editingPlan}
                    existingPlans={plans}
                    onSuccess={() => fetchPlans(selectedService)}
                />
            )}
        </div>
    );
}

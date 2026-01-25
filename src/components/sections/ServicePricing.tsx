"use client";

import { useState } from "react";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PricingPlan {
    id: string;
    title: string;
    price: number | string;
    currency: string;
    billing_cycle: string;
    is_popular: boolean;
    features: { feature_text: string; is_included: boolean }[] | string[];
}

interface ServicePricingProps {
    serviceName: string;
    plans: PricingPlan[];
}

export function ServicePricing({ serviceName, plans }: ServicePricingProps) {

    // State for billing cycle toggle
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    // Sort plans in the correct order: Starter → Growth → Custom/Enterprise
    const sortedPlans = [...plans].sort((a, b) => {
        const getOrder = (plan: PricingPlan) => {
            const title = plan.title.toLowerCase();
            const isCustom = (plan as any).is_custom || plan.price === 0 || title === 'custom' || title.includes('enterprise');

            // Starter plans first (order: 0)
            if (title.includes('starter') || title.includes('basic')) return 0;

            // Growth/Pro plans second (order: 1) - these should be highlighted
            if (title.includes('growth') || title.includes('pro') || title.includes('scale')) return 1;

            // Custom/Enterprise plans last (order: 2)
            if (isCustom) return 2;

            // Fallback: sort by price (lower first)
            return plan.price === 0 ? 2 : 1;
        };

        return getOrder(a) - getOrder(b);
    });

    // Determine if this service requires ad spend (performance marketing services)
    const requiresAdSpend = serviceName && (
        serviceName.toLowerCase().includes('seo') ||
        serviceName.toLowerCase().includes('social') ||
        serviceName.toLowerCase().includes('ppc') ||
        serviceName.toLowerCase().includes('performance') ||
        serviceName.toLowerCase().includes('paid')
    );

    // Helper to get the small uppercase label
    const getPlanLabel = (title: string, index: number) => {
        const t = title.toLowerCase();
        if (t.includes("starter") || t.includes("basic")) return "STARTER";
        if (t.includes("growth") || t.includes("pro") || t.includes("scale")) return "GROWTH";
        if (t.includes("enterprise") || t.includes("custom")) return "ENTERPRISE";
        if (index === 0) return "STARTER";
        if (index === 1) return "GROWTH";
        return "SCALE";
    };

    const formatCurrency = (amount: number | string, currency: string) => {
        const value = Number(amount);
        if (isNaN(value)) return amount;

        if (currency === 'INR') {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
        }
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 0 }).format(value);
    };

    // Calculate price based on billing cycle
    const calculatePrice = (basePrice: number | string, isCustom: boolean) => {
        if (isCustom) return "Custom";

        const price = Number(basePrice);
        if (isNaN(price)) return basePrice;

        // If yearly, apply 20% discount (or multiply by 10 for 2 months free)
        if (billingCycle === 'yearly') {
            return price * 10; // 10 months price for 12 months
        }

        return price;
    };

    return (
        <section className="py-24 bg-[#0B0F14] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">Transparent Pricing</h2>
                    <p className="text-gray-400 text-lg mb-6">No hidden fees. No surprises.</p>

                    {/* Billing Cycle Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="inline-flex items-center bg-white/5 p-1 rounded-full border border-white/10">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    billingCycle === 'monthly'
                                        ? "bg-primary text-black shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                )}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                                    billingCycle === 'yearly'
                                        ? "bg-primary text-black shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                )}
                            >
                                Annual
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    Save 20%
                                </span>
                            </button>
                        </div>
                    </div>

                    {requiresAdSpend && (
                        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300">
                            <Info className="w-4 h-4 text-yellow-400" />
                            <span>Ad spend is paid directly to platforms</span>
                        </div>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {sortedPlans.map((plan, index) => {
                        const isPopular = plan.is_popular;
                        const label = getPlanLabel(plan.title, index);
                        // Enhanced custom detection logic matches Admin Panel
                        const isCustom = (plan as any).is_custom || plan.price === 0 || plan.title.toLowerCase() === 'custom' || plan.title.toLowerCase().includes('enterprise');

                        const displayPrice = calculatePrice(plan.price, isCustom);
                        const monthlyEquivalent = billingCycle === 'yearly' && !isCustom
                            ? Number(plan.price)
                            : null;

                        return (
                            <div
                                key={plan.id}
                                className={cn(
                                    "relative rounded-2xl p-8 bg-[#111111] border transition-all duration-300 flex flex-col h-full",
                                    isPopular
                                        ? "border-primary shadow-[0_0_30px_-10px_var(--color-primary)] scale-105 z-10"
                                        : "border-white/10 hover:border-white/20"
                                )}
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="bg-primary text-black font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-lg tracking-wider">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</h4>
                                    <h3 className="text-2xl font-bold text-white mb-6 font-poppins">{plan.title}</h3>

                                    <div className="flex items-end gap-1">
                                        <span className="text-5xl font-bold text-white tracking-tight transition-all duration-300">
                                            {isCustom ? "Custom" : formatCurrency(displayPrice, plan.currency)}
                                        </span>
                                        {!isCustom && (
                                            <div className="flex flex-col mb-1.5">
                                                <span className="text-xs text-gray-400 font-medium">
                                                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                                </span>
                                                {requiresAdSpend && (
                                                    <span className="text-[10px] text-gray-500 font-medium">+ ad spend</span>
                                                )}
                                            </div>
                                        )}
                                        {isCustom && (
                                            <div className="flex flex-col mb-1.5">
                                                <span className="text-xs text-gray-400 font-medium">High volume</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Monthly equivalent for annual billing */}
                                    {monthlyEquivalent && billingCycle === 'yearly' && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            {formatCurrency(monthlyEquivalent, plan.currency)}/month billed annually
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {Array.isArray(plan.features) && plan.features.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)).map((f: any, i: number) => {
                                        // Handle both object (from join) and string (fallback) feature formats
                                        const text = typeof f === 'string' ? f : f.feature_text;
                                        return (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                <Check className="w-5 h-5 text-primary shrink-0" />
                                                <span className="leading-relaxed">{text}</span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <Link href="/contact" className="block mt-auto">
                                    <Button
                                        className={cn(
                                            "w-full h-12 text-base font-bold transition-all",
                                            isPopular
                                                ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_-5px_var(--color-primary)]"
                                                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                        )}
                                    >
                                        {isPopular ? "Talk to Expert" : (isCustom ? "Request Quote" : "Get Started")}
                                    </Button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

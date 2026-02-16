"use client";

import { useState } from "react";
import { Check, Info, ArrowRight, Book, Award, Building2, LayoutGrid } from "lucide-react";
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
    const [showAllFeatures, setShowAllFeatures] = useState(false);

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

    const formatCurrency = (amount: number | string) => {
        const value = Number(amount);
        if (isNaN(value)) return amount;
        // User requested replacing Dollar with Rupee
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
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

    const getPlanIcon = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes("starter") || t.includes("basic") || t.includes("beginner")) return <Book className="w-5 h-5" />;
        if (t.includes("growth") || t.includes("pro") || t.includes("scale") || t.includes("professional")) return <Award className="w-5 h-5" />;
        return <Building2 className="w-5 h-5" />;
    };

    return (
        <section className="py-24 bg-black relative overflow-hidden font-sans selection:bg-primary/30">
            {/* 1. Background Typography (Big Text) */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 overflow-hidden w-full flex justify-center px-4">
                <h2 className="text-[12rem] sm:text-[20rem] md:text-[35rem] font-black text-white/[0.02] tracking-tighter leading-none whitespace-nowrap">
                    Our Pricing
                </h2>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-6">
                    <div className="flex flex-col items-center gap-2 py-9">
                        {/* 2. Toggle Design (Glassmorphism Segmented Control) */}
                        <div className="bg-[#111] p-1.5 rounded-full border border-white/10 inline-flex relative shadow-inner">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={cn(
                                    "relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 z-10",
                                    billingCycle === 'monthly'
                                        ? "text-white"
                                        : "text-gray-500 hover:text-gray-300"
                                )}
                            >
                                Monthly
                                {billingCycle === 'monthly' && (
                                    <span className="absolute inset-0 bg-white/[0.08] rounded-full -z-10 border border-white/5 shadow-sm" />
                                )}
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={cn(
                                    "relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 z-10",
                                    billingCycle === 'yearly'
                                        ? "text-white"
                                        : "text-gray-500 hover:text-gray-300"
                                )}
                            >
                                Yearly
                                {billingCycle === 'yearly' && (
                                    <span className="absolute inset-0 bg-white/[0.08] rounded-full -z-10 border border-white/5 shadow-sm" />
                                )}
                            </button>
                        </div>

                        <div className="flex flex-col items-center gap-1 mt-2">
                            {/* Savings Badge */}
                            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">
                                Save 20% on Yearly
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Pricing Cards Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {sortedPlans.map((plan, index) => {
                        const isPopular = plan.is_popular;
                        const isCustom = (plan as any).is_custom || plan.price === 0 || plan.title.toLowerCase() === 'custom' || plan.title.toLowerCase().includes('enterprise');

                        const displayPrice = calculatePrice(plan.price, isCustom);

                        const features = Array.isArray(plan.features) ? plan.features.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)) : [];
                        const displayedFeatures = showAllFeatures ? features : features.slice(0, 5);

                        return (
                            <div
                                key={plan.id}
                                className={cn(
                                    "group relative rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 flex flex-col h-full transition-all duration-500",
                                    // Glassmorphism & Borders
                                    "bg-[#0a0a0a] backdrop-blur-xl border",
                                    isPopular
                                        ? "border-primary/30 shadow-[0_0_50px_-20px_rgba(0,217,195,0.15)] bg-[#0c0c0c]"
                                        : "border-white/5 hover:border-white/10 hover:bg-[#0c0c0c]"
                                )}
                            >
                                {/* Active Glow (Popular only) */}
                                {isPopular && (
                                    <div className="absolute inset-x-0 -top-px h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                )}

                                {/* Card Header: Icon & Price */}
                                <div className="flex justify-between items-start mb-10">
                                    {/* Icon Box */}
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors",
                                        isPopular
                                            ? "bg-[#1A1A1A] border-primary/30 text-primary"
                                            : "bg-[#111] border-white/5 text-gray-400 group-hover:text-white group-hover:border-white/10"
                                    )}>
                                        {getPlanIcon(plan.title)}
                                    </div>

                                    {/* Link Price */}
                                    <div className="text-right">
                                        <div className="flex items-baseline justify-end gap-1">
                                            <span className={cn("text-4xl font-bold tracking-tight", isPopular ? "text-white" : "text-gray-200")}>
                                                {isCustom ? "Custom" : formatCurrency(displayPrice)}
                                            </span>
                                        </div>
                                        {!isCustom && (
                                            <div className="text-[12px] font-medium text-gray-500 uppercase tracking-wide mt-1">
                                                / Per {billingCycle === 'monthly' ? 'Month' : 'Year'}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <div className="mb-10 space-y-3">
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                                    <p className="text-[15px] text-gray-400 font-medium leading-relaxed">
                                        {isCustom
                                            ? "Enterprise-grade power for large scale operations."
                                            : (index === 0
                                                ? "Perfect for small businesses starting their journey."
                                                : "Advanced tools for growing businesses needing speed.")}
                                    </p>
                                </div>

                                {/* CTA Button - Centered & Styled */}
                                <div className="mb-10">
                                    <Link href="/contact" className="block w-full">
                                        <Button
                                            className={cn(
                                                "w-full h-12 sm:h-14 rounded-full text-base font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3",
                                                isPopular
                                                    ? "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]"
                                                    : "bg-[#151515] text-white border border-white/10 hover:bg-[#202020] hover:border-white/20"
                                            )}
                                        >
                                            Get Started
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>

                                {/* Features List */}
                                <div className="space-y-6 flex-1 border-t border-white/5 pt-8">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Features</h4>
                                    <ul className="space-y-4">
                                        {displayedFeatures.map((f: any, i: number) => {
                                            const text = typeof f === 'string' ? f : f.feature_text;
                                            return (
                                                <li key={i} className="flex items-start gap-3 text-[15px] text-gray-300/90 group/item">
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors mt-0.5",
                                                        isPopular
                                                            ? "bg-primary/10 border-primary/20 text-primary"
                                                            : "bg-white/5 border-white/10 text-gray-500 group-hover/item:text-gray-300"
                                                    )}>
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                    <span className="leading-snug font-medium">{text}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom View More Action */}
                <div className="mt-20 text-center">
                    <button
                        onClick={() => setShowAllFeatures(!showAllFeatures)}
                        className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#111] border border-white/10 text-white text-sm font-semibold hover:bg-[#1A1A1A] hover:border-white/20 transition-all shadow-lg hover:shadow-xl"
                    >
                        <span>{showAllFeatures ? "Collapse details" : "View full feature breakdown"}</span>
                        <ArrowRight className={cn("w-4 h-4 transition-transform duration-300", showAllFeatures ? "-rotate-90" : "group-hover:translate-x-1")} />
                    </button>
                </div>
            </div>
        </section>
    );
}

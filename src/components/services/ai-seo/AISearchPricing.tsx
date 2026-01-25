"use client";

import { Container, Section } from "@/components/ui/container";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PricingPlan {
    id: string;
    service_id: string;
    name: string;
    price: number;
    currency: string;
    billing_cycle: string;
    features: string[];
    is_popular: boolean;
    is_active: boolean;
    is_custom: boolean;
    description?: string;
}

interface AISearchPricingProps {
    plans: PricingPlan[];
}

// Fallback plans if database is empty
const fallbackPlans: PricingPlan[] = [
    {
        id: "fallback-1",
        service_id: "ai-seo",
        name: "Starter",
        price: 30000,
        currency: "INR",
        billing_cycle: "monthly",
        features: [
            "AI SERP audit & entity analysis",
            "Basic schema markup implementation",
            "5 optimized content pieces/month",
            "Monthly performance reports",
            "Email support",
        ],
        is_popular: false,
        is_active: true,
        is_custom: false,
        description: "Small businesses, startups testing AI search",
    },
    {
        id: "fallback-2",
        service_id: "ai-seo",
        name: "Growth",
        price: 75000,
        currency: "INR",
        billing_cycle: "monthly",
        features: [
            "Full framework implementation",
            "Advanced knowledge graph engineering",
            "15 optimized content pieces/month",
            "Authority & citation campaigns",
            "Bi-weekly performance reports",
            "Dedicated account manager",
            "Slack/WhatsApp support",
        ],
        is_popular: true,
        is_active: true,
        is_custom: false,
        description: "Growing brands, e-commerce, SaaS",
    },
    {
        id: "fallback-3",
        service_id: "ai-seo",
        name: "Authority",
        price: 0,
        currency: "INR",
        billing_cycle: "monthly",
        features: [
            "Custom AI search strategy",
            "Multi-brand entity optimization",
            "Unlimited content optimization",
            "White-label reporting available",
            "Weekly strategy calls",
            "Priority support (24/7)",
            "Custom integrations & APIs",
        ],
        is_popular: false,
        is_active: true,
        is_custom: true,
        description: "Enterprise, multi-brand, agency partnerships",
    },
];

export function AISearchPricing({ plans }: AISearchPricingProps) {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

    // Use provided plans or fallback
    const activePlans = plans.length > 0 ? plans : fallbackPlans;

    // Filter and sort plans
    const sortedPlans = activePlans
        .filter((plan) => plan.is_active)
        .sort((a, b) => {
            // Custom plans go last
            if (a.is_custom && !b.is_custom) return 1;
            if (!a.is_custom && b.is_custom) return -1;
            // Otherwise sort by price
            return a.price - b.price;
        });

    // Format currency
    const formatCurrency = (amount: number, currency: string) => {
        if (currency === "INR") {
            return `₹${amount.toLocaleString("en-IN")}`;
        }
        return `$${amount.toLocaleString("en-US")}`;
    };

    // Calculate price based on billing cycle
    const getDisplayPrice = (plan: PricingPlan) => {
        if (plan.is_custom) return "Custom";

        const basePrice = plan.price;
        if (billingCycle === "annual") {
            // 20% discount for annual
            const annualPrice = Math.round(basePrice * 0.8);
            return formatCurrency(annualPrice, plan.currency);
        }
        return formatCurrency(basePrice, plan.currency);
    };

    // Get minimum engagement based on plan name
    const getMinimumEngagement = (planName: string) => {
        if (planName.toLowerCase().includes("starter")) return "3 months";
        if (planName.toLowerCase().includes("growth")) return "6 months";
        if (planName.toLowerCase().includes("authority") || planName.toLowerCase().includes("enterprise")) return "12 months";
        return "3 months";
    };

    // Get reporting cadence based on plan name
    const getReportingCadence = (planName: string) => {
        if (planName.toLowerCase().includes("starter")) return "Monthly";
        if (planName.toLowerCase().includes("growth")) return "Bi-weekly";
        if (planName.toLowerCase().includes("authority") || planName.toLowerCase().includes("enterprise")) return "Weekly + real-time dashboard";
        return "Monthly";
    };

    return (
        <Section id="pricing" className="bg-gradient-to-b from-background to-[#0B0F14]">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Transparent{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Pricing
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-8">
                            No hidden fees. No surprises. Just clear, value-driven pricing.
                        </p>

                        {/* Billing Toggle */}
                        <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-full p-1.5 border border-white/10">
                            <button
                                onClick={() => setBillingCycle("monthly")}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${billingCycle === "monthly"
                                        ? "bg-primary text-black shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle("annual")}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all relative ${billingCycle === "annual"
                                        ? "bg-primary text-black shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Annual
                                <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                    -20%
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {sortedPlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`
                relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm
                rounded-2xl border p-8 hover:scale-[1.02] transition-all
                ${plan.is_popular ? "border-primary ring-2 ring-primary/20" : "border-white/10"}
              `}
                        >
                            {plan.is_popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="bg-primary text-black font-bold text-xs uppercase px-4 py-1.5 rounded-full flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-end gap-1 mb-4">
                                    <span className="text-5xl font-bold text-white">{getDisplayPrice(plan)}</span>
                                    {!plan.is_custom && (
                                        <span className="text-gray-400 mb-2">
                                            /{billingCycle === "monthly" ? "month" : "year"}
                                        </span>
                                    )}
                                </div>
                                {plan.description && (
                                    <p className="text-sm text-gray-400">{plan.description}</p>
                                )}
                                {billingCycle === "annual" && !plan.is_custom && (
                                    <div className="mt-2 text-xs text-green-400 font-semibold">
                                        Save {formatCurrency(Math.round(plan.price * 0.2 * 12), plan.currency)} per year
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="text-xs font-semibold text-gray-500 uppercase">
                                    {plan.is_custom ? "Includes" : "Deliverables"}
                                </div>
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 mb-8 pt-6 border-t border-white/10">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Minimum engagement</span>
                                    <span className="text-white font-semibold">{getMinimumEngagement(plan.name)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Reporting cadence</span>
                                    <span className="text-white font-semibold">{getReportingCadence(plan.name)}</span>
                                </div>
                            </div>

                            <Link href="/contact">
                                <Button
                                    className={`
                    w-full h-12 font-bold
                    ${plan.is_popular
                                            ? "bg-primary text-black hover:bg-primary/90"
                                            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                        }
                  `}
                                >
                                    {plan.is_custom ? "Contact Sales" : plan.is_popular ? "Most Popular" : "Get Started"}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl border border-white/10 p-8"
                >
                    <p className="text-gray-400 mb-4">Need a custom package? Have specific requirements?</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                        Get a Custom Quote →
                    </Link>
                </motion.div>
            </Container>
        </Section>
    );
}

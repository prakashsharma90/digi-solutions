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
    name?: string;
    title?: string;
    price: number;
    currency: string;
    billing_cycle: string;
    features: any;
    is_popular: boolean;
    is_active: boolean;
    is_custom: boolean;
    description?: string;
}

interface SocialPricingProps {
    plans: PricingPlan[];
}

const fallbackPlans: PricingPlan[] = [
    {
        id: "fallback-1",
        service_id: "social-media-marketing",
        name: "Starter",
        price: 45000,
        currency: "INR",
        billing_cycle: "monthly",
        features: [
            "12 posts per month",
            "4 Reels/Shorts",
            "2 platforms (Instagram + LinkedIn)",
            "Basic community management",
            "Monthly performance reports",
            "Content calendar",
        ],
        is_popular: false,
        is_active: true,
        is_custom: false,
        description: "Perfect for small businesses testing social media",
    },
    {
        id: "fallback-2",
        service_id: "social-media-marketing",
        name: "Growth",
        price: 75000,
        currency: "INR",
        billing_cycle: "monthly",
        features: [
            "20 posts per month",
            "8 Reels/Shorts",
            "3 platforms (Instagram + LinkedIn + YouTube)",
            "Full community management",
            "Weekly performance reports",
            "Content calendar + strategy",
            "Dedicated account manager",
        ],
        is_popular: true,
        is_active: true,
        is_custom: false,
        description: "For growing brands ready to scale",
    },
    {
        id: "fallback-3",
        service_id: "social-media-marketing",
        name: "Authority",
        price: 0,
        currency: "INR",
        billing_cycle: "monthly",
        features: [
            "Custom posting schedule",
            "Unlimited Reels/Shorts",
            "All platforms",
            "24/7 community management",
            "Real-time analytics dashboard",
            "Custom content strategy",
            "Dedicated creative team",
            "Priority support",
        ],
        is_popular: false,
        is_active: true,
        is_custom: true,
        description: "Enterprise-level social media dominance",
    },
];

export function SocialPricing({ plans }: SocialPricingProps) {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

    const activePlans = plans.length > 0 ? plans : fallbackPlans;

    // Debug: Log what we received
    console.log('Social Pricing - Received plans:', plans);
    console.log('Social Pricing - Using plans:', activePlans);

    const sortedPlans = activePlans
        .filter((plan) => plan.is_active)
        .sort((a, b) => {
            if (a.is_custom && !b.is_custom) return 1;
            if (!a.is_custom && b.is_custom) return -1;
            return a.price - b.price;
        });

    // Helper function to normalize features (handle both string and array)
    const normalizeFeatures = (features: any): string[] => {
        if (!features) return [];
        if (Array.isArray(features)) {
            return features.map(f => {
                if (typeof f === 'string') return f;
                if (typeof f === 'object' && f && 'feature_text' in f) return f.feature_text;
                return '';
            }).filter(Boolean);
        }
        if (typeof features === 'string') {
            // Try to parse as JSON first
            try {
                const parsed = JSON.parse(features);
                if (Array.isArray(parsed)) return normalizeFeatures(parsed);
            } catch (e) {
                // If not JSON, split by comma or newline
                return features.split(/[,\n]/).map(f => f.trim()).filter(f => f);
            }
        }
        return [];
    };

    const formatCurrency = (amount: number, currency: string) => {
        if (currency === "INR") {
            return `₹${amount.toLocaleString("en-IN")}`;
        }
        return `$${amount.toLocaleString("en-US")}`;
    };

    const getDisplayPrice = (plan: PricingPlan) => {
        if (plan.is_custom) return "Custom";

        const basePrice = plan.price;
        if (billingCycle === "annual") {
            const annualPrice = Math.round(basePrice * 0.8);
            return formatCurrency(annualPrice, plan.currency);
        }
        return formatCurrency(basePrice, plan.currency);
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
                            No hidden fees. Clear deliverables. Flexible terms.
                        </p>

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
                                <h3 className="text-2xl font-bold text-white mb-4">{plan.title || plan.name || 'Plan'}</h3>
                                <div className="flex items-end gap-1 mb-4">
                                    <span className="text-5xl font-bold text-white">{getDisplayPrice(plan)}</span>
                                    {!plan.is_custom && (
                                        <span className="text-gray-400 mb-2">
                                            /{billingCycle === "monthly" ? "mo" : "yr"}
                                        </span>
                                    )}
                                </div>
                                {plan.description && (
                                    <p className="text-sm text-gray-400 leading-relaxed">{plan.description}</p>
                                )}
                                {billingCycle === "annual" && !plan.is_custom && (
                                    <div className="mt-3 text-xs text-green-400 font-semibold">
                                        💰 Save {formatCurrency(Math.round(plan.price * 0.2 * 12), plan.currency)} per year
                                    </div>
                                )}
                            </div>



                            <div className="space-y-4 mb-8 pt-6 border-t border-white/10">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                    What's Included
                                </div>
                                {normalizeFeatures(plan.features).map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                                {normalizeFeatures(plan.features).length === 0 && (
                                    <p className="text-sm text-gray-500 italic">No features listed</p>
                                )}
                            </div>



                            <Link href="#lead-capture">
                                <Button
                                    className={`
                    w-full h-12 font-bold
                    ${plan.is_popular
                                            ? "bg-primary text-black hover:bg-primary/90"
                                            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                        }
                  `}
                                >
                                    {plan.is_custom ? "Contact Sales" : "Get Started"}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

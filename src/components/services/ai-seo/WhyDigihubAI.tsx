"use client";

import { Container, Section } from "@/components/ui/container";
import { Brain, BarChart3, Shield, Zap, CheckCircle2, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Brain,
        title: "AI-First SEO Engineers",
        description: "Our team specializes in LLM optimization, not just traditional SEO. We understand how AI engines think.",
        proof: "Certified in OpenAI, Google AI, Perplexity APIs",
    },
    {
        icon: BarChart3,
        title: "Proprietary Audit Tools",
        description: "Custom-built AI citation tracking and entity analysis tools you won't find anywhere else.",
        proof: "Track 50+ AI search platforms in real-time",
    },
    {
        icon: Shield,
        title: "Transparent Reporting",
        description: "Live dashboards showing exactly where you appear in AI search results. No smoke and mirrors.",
        proof: "100% client dashboard access, updated daily",
    },
    {
        icon: Zap,
        title: "No Black-Hat Tactics",
        description: "We build sustainable authority that lasts. No shortcuts, no penalties, just long-term growth.",
        proof: "Zero client penalties in 3+ years",
    },
];

const stats = [
    { value: "50+", label: "Brands Served" },
    { value: "3.2x", label: "Avg Traffic Lift" },
    { value: "214%", label: "Avg AI Citation Growth" },
    { value: "₹2.5Cr+", label: "Ad Spend Saved" },
];

export function WhyDigihubAI() {
    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]" />

            <Container className="relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Why <span className="text-primary">Digihub</span>?
                        </h2>
                        <p className="text-lg text-gray-400">
                            We're not just another SEO agency. We're AI search specialists.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{feature.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-green-400">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="font-semibold">{feature.proof}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

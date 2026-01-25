"use client";

import { Container, Section } from "@/components/ui/container";
import { Brain, BarChart3, Layers, Zap, CheckCircle2, TrendingUp, Users, Target } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: Brain,
        title: "AI-Driven Decisions",
        description: "Proprietary machine learning models predict market trends and optimize campaigns 24/7.",
        proof: "15% better performance vs manual optimization",
    },
    {
        icon: BarChart3,
        title: "Transparent Reporting",
        description: "Live dashboards with real-time ROI visibility. No smoke and mirrors, just facts.",
        proof: "100% client dashboard access",
    },
    {
        icon: Layers,
        title: "Scalable Systems",
        description: "Infrastructure built to handle 10x growth. Scale from ₹1L to ₹1Cr monthly spend seamlessly.",
        proof: "Managed ₹2.5Cr+ in ad spend",
    },
    {
        icon: Zap,
        title: "Performance Execution",
        description: "Obsessed with speed and efficiency. Every campaign optimized for maximum ROI.",
        proof: "Average 4.2x ROAS across clients",
    },
];

const stats = [
    { value: "350%", label: "Avg Revenue Growth", sublabel: "in 6 months" },
    { value: "₹2.5Cr+", label: "Ad Spend Managed", sublabel: "across 50+ clients" },
    { value: "4.2x", label: "Average ROAS", sublabel: "vs 2.5x industry avg" },
    { value: "42%", label: "CAC Reduction", sublabel: "through AI optimization" },
];

const testimonials = [
    {
        quote: "Digihub transformed our paid ads from a cost center to our #1 revenue driver.",
        author: "Priya Sharma",
        role: "CMO, TechFlow SaaS",
        metric: "+280% ROAS in 90 days",
    },
    {
        quote: "Finally, a marketing partner that speaks in revenue, not vanity metrics.",
        author: "Rahul Mehta",
        role: "Founder, EcomGrowth",
        metric: "₹12L → ₹42L monthly revenue",
    },
];

export function WhyUsRedesign() {
    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background relative overflow-hidden">
            {/* Background Elements */}
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
                            We bridge the gap between creative marketing and hard data.
                            While others guess, we engineer growth.
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
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center hover:border-primary/30 transition-all"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
                            <div className="text-xs text-gray-500">{stat.sublabel}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                        {/* Dashboard Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                            <div>
                                <h3 className="text-lg font-bold text-white">Live Campaign Dashboard</h3>
                                <p className="text-sm text-gray-400">Real-time performance metrics</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-gray-400">Live</span>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {[
                                { label: "Impressions", value: "2.4M", change: "+12%" },
                                { label: "Clicks", value: "48.2K", change: "+18%" },
                                { label: "Conversions", value: "1,247", change: "+24%" },
                                { label: "Revenue", value: "₹12.5L", change: "+35%" },
                            ].map((metric, i) => (
                                <div key={i} className="bg-black/40 rounded-xl p-4 border border-white/5">
                                    <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                                    <div className="flex items-center gap-1 text-green-400 text-xs">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>{metric.change}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="h-40 flex items-end justify-between gap-2">
                            {[30, 45, 35, 60, 50, 75, 65, 85, 70, 90, 80, 95].map((height, i) => (
                                <div key={i} className="flex-1 group relative">
                                    <div
                                        className="w-full bg-gradient-to-t from-primary/40 to-primary/20 rounded-t-lg hover:from-primary/60 hover:to-primary/40 transition-all duration-300"
                                        style={{ height: `${height}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all"
                        >
                            <div className="flex items-start gap-1 mb-4 text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-white text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-white">{testimonial.author}</div>
                                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-green-400">{testimonial.metric}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </Container>
        </Section>
    );
}

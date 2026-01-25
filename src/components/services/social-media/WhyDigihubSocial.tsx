"use client";

import { Container, Section } from "@/components/ui/container";
import { Target, Users, BarChart3, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const differentiators = [
    {
        icon: Target,
        title: "Strategy-First Approach",
        description: "We don't just post. We build comprehensive social strategies aligned with your business goals.",
        proof: "Every client gets a custom 90-day roadmap",
    },
    {
        icon: Users,
        title: "In-House Creatives + Analysts",
        description: "Full team of designers, copywriters, and data analysts working on your account.",
        proof: "No outsourcing, no freelancers",
    },
    {
        icon: BarChart3,
        title: "Weekly Reporting",
        description: "Transparent, real-time dashboards showing what matters: engagement, reach, and conversions.",
        proof: "Live analytics access 24/7",
    },
    {
        icon: Shield,
        title: "No Vanity Metrics",
        description: "We focus on business outcomes, not just likes and followers.",
        proof: "Track ROI, leads, and revenue",
    },
    {
        icon: Zap,
        title: "Conversion-Focused",
        description: "Every post is designed to move your audience closer to becoming customers.",
        proof: "Avg 2.5x engagement lift",
    },
];

export function WhyDigihubSocial() {
    return (
        <Section className="bg-gradient-to-b from-background to-[#0B0F14]">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Why{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Digihub?
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            We're not your typical social media agency
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {[
                        { value: "50+", label: "Brands Scaled" },
                        { value: "2.5x", label: "Avg Engagement Lift" },
                        { value: "210%", label: "Avg Reach Growth" },
                        { value: "₹12L+", label: "Social Revenue Generated" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center"
                        >
                            <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Differentiators */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {differentiators.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-primary/30 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                            <div className="text-xs text-primary font-semibold">✓ {item.proof}</div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

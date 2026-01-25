"use client";

import { Container, Section } from "@/components/ui/container";
import { Search, FileEdit, TrendingUp, BarChart3, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "AI SERP Mapping & Entity Audit",
        description: "We analyze how AI engines currently see your brand",
        deliverables: [
            "AI citation gap analysis",
            "Entity presence audit",
            "Competitor AI visibility benchmarking",
            "Knowledge graph mapping",
        ],
        timeline: "Week 1-2",
    },
    {
        number: "02",
        icon: FileEdit,
        title: "Content & Knowledge Graph Engineering",
        description: "Restructure content for maximum AI understanding",
        deliverables: [
            "Schema markup implementation",
            "Entity-optimized content",
            "Structured data enhancement",
            "Internal linking architecture",
        ],
        timeline: "Week 3-6",
    },
    {
        number: "03",
        icon: TrendingUp,
        title: "Authority & Citation Growth",
        description: "Build signals that make AI engines trust and cite you",
        deliverables: [
            "High-authority backlink acquisition",
            "Brand mention campaigns",
            "E-E-A-T optimization",
            "Citation-worthy content creation",
        ],
        timeline: "Week 7-10",
    },
    {
        number: "04",
        icon: BarChart3,
        title: "Monitoring & Optimization",
        description: "Track AI citations and continuously improve",
        deliverables: [
            "AI search performance dashboard",
            "Citation tracking & alerts",
            "Monthly optimization reports",
            "Ongoing content refinement",
        ],
        timeline: "Ongoing",
    },
];

export function ProvenFramework() {
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
                            Our Proven{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Framework
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            A systematic, data-driven approach. Not guesswork, not vibes—just results.
                        </p>
                    </motion.div>
                </div>

                {/* Steps */}
                <div className="max-w-6xl mx-auto space-y-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Connector Line (except last) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute left-[60px] top-[100px] w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent" />
                            )}

                            {/* Card */}
                            <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all group">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Left: Icon & Number */}
                                    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2 shrink-0">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors relative z-10">
                                            <step.icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="text-5xl font-bold text-white/5 md:mt-2">{step.number}</div>
                                    </div>

                                    {/* Right: Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                                <p className="text-gray-400">{step.description}</p>
                                            </div>
                                            <div className="shrink-0 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-semibold text-primary">
                                                {step.timeline}
                                            </div>
                                        </div>

                                        {/* Deliverables */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {step.deliverables.map((deliverable, i) => (
                                                <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                                    <span>{deliverable}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center mt-12 bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-primary/20 p-8"
                >
                    <p className="text-lg text-white font-semibold mb-4">
                        Want to see this framework in action?
                    </p>
                    <a
                        href="#case-studies"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                        View Case Studies Below →
                    </a>
                </motion.div>
            </Container>
        </Section>
    );
}

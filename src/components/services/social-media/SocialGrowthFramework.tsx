"use client";

import { Container, Section } from "@/components/ui/container";
import { Target, Zap, Users, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
    {
        icon: Target,
        title: "Brand Voice & Audience Research",
        description: "Deep-dive into your brand positioning, competitor analysis, and audience personas",
        deliverables: [
            "Brand voice guidelines",
            "Audience persona mapping",
            "Competitor content audit",
            "Platform strategy document",
        ],
        timeline: "Week 1-2",
    },
    {
        icon: Zap,
        title: "Content Engine Creation",
        description: "Build a scalable content system that produces high-performing posts consistently",
        deliverables: [
            "30-day content calendar",
            "Content templates & frameworks",
            "Visual brand guidelines",
            "Copywriting formulas",
        ],
        timeline: "Week 2-3",
    },
    {
        icon: Users,
        title: "Distribution & Engagement Loops",
        description: "Strategic posting schedule and community management to maximize reach and engagement",
        deliverables: [
            "Optimal posting schedule",
            "Engagement playbook",
            "Community management SOPs",
            "Influencer outreach strategy",
        ],
        timeline: "Week 3-4",
    },
    {
        icon: BarChart3,
        title: "Analytics & Conversion Tracking",
        description: "Measure what matters and continuously optimize for business results",
        deliverables: [
            "Custom analytics dashboard",
            "Weekly performance reports",
            "Conversion tracking setup",
            "Monthly strategy calls",
        ],
        timeline: "Ongoing",
    },
];

export function SocialGrowthFramework() {
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
                            Our Proven{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Growth Framework
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            A systematic approach to building your brand on social media
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto space-y-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all">
                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <step.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                                <p className="text-gray-400">{step.description}</p>
                                            </div>
                                            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                                                {step.timeline}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                            {step.deliverables.map((deliverable, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                                                    <span>{deliverable}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="flex justify-center my-4">
                                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="#case-studies"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                        See This Framework in Action →
                    </Link>
                </motion.div>
            </Container>
        </Section>
    );
}

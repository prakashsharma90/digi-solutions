"use client";

import { Container, Section } from "@/components/ui/container";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, DollarSign, Target, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const caseStudies = [
    {
        title: "FinTech Scale-Up",
        industry: "Financial Technology",
        challenge: "High CAC, low conversion rates",
        solution: "AI-powered funnel optimization + retargeting",
        results: [
            { icon: TrendingUp, label: "Revenue Growth", value: "+350%", context: "in 6 months" },
            { icon: DollarSign, label: "CAC Reduction", value: "-42%", context: "vs previous quarter" },
            { icon: Users, label: "Lead Quality", value: "+85%", context: "SQL conversion rate" },
        ],
        timeframe: "6 months",
        investment: "₹8L ad spend",
        roi: "₹5L → ₹17.5L monthly revenue",
        gradient: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-500/30",
    },
    {
        title: "E-Commerce Fashion Brand",
        industry: "Retail & E-Commerce",
        challenge: "Low ROAS, high cart abandonment",
        solution: "Dynamic retargeting + conversion rate optimization",
        results: [
            { icon: TrendingUp, label: "ROAS", value: "6.2x", context: "vs 2.1x baseline" },
            { icon: DollarSign, label: "Revenue", value: "+280%", context: "in 4 months" },
            { icon: Target, label: "Conversion Rate", value: "+127%", context: "checkout completion" },
        ],
        timeframe: "4 months",
        investment: "₹12L ad spend",
        roi: "₹8L → ₹30L monthly revenue",
        gradient: "from-pink-500/20 to-rose-500/20",
        borderColor: "border-pink-500/30",
    },
    {
        title: "B2B SaaS Platform",
        industry: "Software as a Service",
        challenge: "Long sales cycles, expensive leads",
        solution: "LinkedIn + content marketing automation",
        results: [
            { icon: Users, label: "SQLs Generated", value: "+420%", context: "qualified leads" },
            { icon: DollarSign, label: "Cost per SQL", value: "-58%", context: "vs cold outreach" },
            { icon: TrendingUp, label: "Pipeline Value", value: "+₹2.4Cr", context: "in 5 months" },
        ],
        timeframe: "5 months",
        investment: "₹6L ad spend",
        roi: "₹15L → ₹48L ARR",
        gradient: "from-purple-500/20 to-violet-500/20",
        borderColor: "border-purple-500/30",
    },
];

export function CaseStudiesRedesign() {
    return (
        <Section className="bg-gradient-to-b from-background to-[#0B0F14] border-y border-primary/20">
            <Container>
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Real Results,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Real Clients
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            See how we've helped businesses like yours achieve predictable, scalable growth.
                        </p>
                    </motion.div>
                </div>

                {/* Case Studies Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className={`
                                bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm
                                rounded-2xl border ${study.borderColor} p-6 sm:p-8
                                hover:scale-[1.02] transition-all duration-300
                                h-full flex flex-col
                            `}>
                                {/* Header */}
                                <div className="mb-6">
                                    <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 mb-3">
                                        {study.industry}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 font-poppins">
                                        {study.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span>{study.timeframe} campaign</span>
                                    </div>
                                </div>

                                {/* Challenge & Solution */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Challenge</div>
                                        <div className="text-sm text-gray-300">{study.challenge}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Solution</div>
                                        <div className="text-sm text-gray-300">{study.solution}</div>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="space-y-3 mb-6 flex-1">
                                    {study.results.map((result, i) => (
                                        <div key={i} className="bg-black/40 rounded-xl p-4 border border-white/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <result.icon className="w-4 h-4 text-primary" />
                                                <div className="text-xs text-gray-400">{result.label}</div>
                                            </div>
                                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                                {result.value}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">{result.context}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* ROI Summary */}
                                <div className={`
                                    bg-gradient-to-br ${study.gradient}
                                    rounded-xl p-4 border border-white/10
                                `}>
                                    <div className="text-xs text-gray-400 mb-1">ROI Impact</div>
                                    <div className="text-sm font-bold text-white">{study.roi}</div>
                                    <div className="text-xs text-gray-500 mt-1">Investment: {study.investment}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                >
                    <Link href="/case-studies">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-black font-bold h-14 px-8 shadow-[0_0_30px_-5px_var(--color-primary)]"
                        >
                            View All Case Studies
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <p className="text-sm text-gray-500 mt-4">
                        See detailed breakdowns, strategies, and results from 50+ successful campaigns
                    </p>
                </motion.div>
            </Container>
        </Section>
    );
}

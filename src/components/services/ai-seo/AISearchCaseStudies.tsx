"use client";

import { Container, Section } from "@/components/ui/container";
import { TrendingUp, DollarSign, Users, Target, Calendar, ArrowRight, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const caseStudies = [
    {
        title: "SaaS Platform",
        industry: "B2B Software",
        logo: "💼",
        challenge: "Zero AI search visibility despite strong traditional SEO",
        solution: "Entity optimization + knowledge graph engineering + authority building",
        results: [
            { icon: TrendingUp, label: "AI Citations", value: "+214%", context: "in 90 days" },
            { icon: Users, label: "Organic Traffic", value: "+156%", context: "from AI sources" },
            { icon: DollarSign, label: "Pipeline", value: "+₹2.4Cr", context: "attributed to AI search" },
        ],
        timeframe: "90 days",
        investment: "₹2.25L",
        gradient: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-500/30",
    },
    {
        title: "E-Commerce Fashion",
        industry: "Retail",
        logo: "🛍️",
        challenge: "Products not appearing in AI shopping recommendations",
        solution: "Product schema + brand entity building + citation campaigns",
        results: [
            { icon: Target, label: "AI Product Mentions", value: "+340%", context: "across platforms" },
            { icon: DollarSign, label: "Revenue", value: "+₹8.2L/mo", context: "from AI traffic" },
            { icon: TrendingUp, label: "Brand Searches", value: "+127%", context: "via AI engines" },
        ],
        timeframe: "4 months",
        investment: "₹3L",
        gradient: "from-pink-500/20 to-rose-500/20",
        borderColor: "border-pink-500/30",
    },
    {
        title: "FinTech Startup",
        industry: "Financial Services",
        logo: "💳",
        challenge: "Competitors dominating AI-powered financial advice queries",
        solution: "E-E-A-T optimization + expert content + citation network",
        results: [
            { icon: Award, label: "Authority Score", value: "+89%", context: "in AI rankings" },
            { icon: Users, label: "Qualified Leads", value: "+420%", context: "from AI search" },
            { icon: DollarSign, label: "CAC Reduction", value: "-58%", context: "vs paid ads" },
        ],
        timeframe: "5 months",
        investment: "₹4.5L",
        gradient: "from-purple-500/20 to-violet-500/20",
        borderColor: "border-purple-500/30",
    },
];

export function AISearchCaseStudies() {
    return (
        <Section id="case-studies" className="bg-gradient-to-b from-background to-[#0B0F14]">
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
                            See how we've helped brands dominate AI search and drive measurable growth.
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
                                rounded-2xl border ${study.borderColor} p-8
                                hover:scale-[1.02] transition-all duration-300
                                h-full flex flex-col
                            `}>
                                {/* Header */}
                                <div className="mb-6">
                                    <div className="text-4xl mb-3">{study.logo}</div>
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

                                {/* Investment */}
                                <div className={`
                                    bg-gradient-to-br ${study.gradient}
                                    rounded-xl p-4 border border-white/10
                                `}>
                                    <div className="text-xs text-gray-400 mb-1">Total Investment</div>
                                    <div className="text-lg font-bold text-white">{study.investment}</div>
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
                    <Link href="/contact">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-black font-bold h-14 px-8"
                        >
                            Get Your Free AI Visibility Audit
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <p className="text-sm text-gray-500 mt-4">
                        See where you're losing visibility in AI search • Free 48-hour turnaround
                    </p>
                </motion.div>
            </Container>
        </Section>
    );
}

"use client";

import { Container, Section } from "@/components/ui/container";
import { TrendingUp, Users, DollarSign, Calendar, ArrowRight, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const caseStudies = [
    {
        industry: "E-Commerce Fashion Brand",
        challenge: "Low Instagram engagement and no social commerce sales",
        solution: "Implemented Reels-first strategy with UGC campaigns and shoppable posts",
        results: [
            { icon: TrendingUp, label: "Reach Growth", value: "+210%" },
            { icon: Users, label: "Followers", value: "+45K" },
            { icon: DollarSign, label: "Social Revenue", value: "₹8.5L/mo" },
        ],
        timeframe: "90 days",
        investment: "Growth Plan",
    },
    {
        industry: "B2B SaaS Platform",
        challenge: "LinkedIn presence but zero inbound leads",
        solution: "Thought leadership content + employee advocacy program",
        results: [
            { icon: Users, label: "LinkedIn Followers", value: "+12K" },
            { icon: TrendingUp, label: "Engagement Rate", value: "3x" },
            { icon: DollarSign, label: "Qualified Leads", value: "+180/mo" },
        ],
        timeframe: "4 months",
        investment: "Growth Plan",
    },
    {
        industry: "Tech Creator/Founder",
        challenge: "Inconsistent posting, no brand positioning",
        solution: "Personal brand strategy + content engine + community building",
        results: [
            { icon: Users, label: "Total Followers", value: "+150K" },
            { icon: TrendingUp, label: "Avg Engagement", value: "8.5%" },
            { icon: Award, label: "Speaking Invites", value: "25+" },
        ],
        timeframe: "6 months",
        investment: "Authority Plan",
    },
];

export function SocialProofSection() {
    return (
        <Section id="case-studies" className="bg-gradient-to-b from-[#0B0F14] to-background">
            <Container>
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
                                Real Brands
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            See how we've helped brands grow their social presence and revenue
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-primary/30 transition-all"
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">{study.industry}</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-gray-500">Challenge:</span>
                                        <p className="text-gray-300 mt-1">{study.challenge}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Solution:</span>
                                        <p className="text-gray-300 mt-1">{study.solution}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6 pt-6 border-t border-white/10">
                                {study.results.map((result, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <result.icon className="w-4 h-4 text-primary" />
                                            <span className="text-sm text-gray-400">{result.label}</span>
                                        </div>
                                        <span className="text-lg font-bold text-primary">{result.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Calendar className="w-3 h-3" />
                                    <span>{study.timeframe}</span>
                                </div>
                                <span className="text-primary font-semibold">{study.investment}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                >
                    <Link href="#lead-capture">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold">
                            Get Your Free Audit
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </Container>
        </Section>
    );
}

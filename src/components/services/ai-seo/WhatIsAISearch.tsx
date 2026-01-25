"use client";

import { Container, Section } from "@/components/ui/container";
import { Brain, Search, FileText, Award } from "lucide-react";
import { motion } from "framer-motion";

export function WhatIsAISearch() {
    return (
        <Section className="bg-gradient-to-b from-background to-[#0B0F14]">
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
                            What Is{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                AI Search Optimization?
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            AI Search Optimization focuses on structuring content, entities, authority signals,
                            and technical SEO so <span className="text-white font-semibold">LLM-powered engines</span> surface and cite your brand.
                        </p>
                    </motion.div>
                </div>

                {/* Visual Diagram */}
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12"
                    >
                        {/* Flow Diagram */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: Search,
                                    title: "Traditional SEO",
                                    description: "Optimizes for Google's algorithm",
                                    focus: "Keywords, backlinks, technical",
                                },
                                {
                                    icon: Brain,
                                    title: "AI Search",
                                    description: "Optimizes for LLM understanding",
                                    focus: "Entities, context, authority",
                                },
                                {
                                    icon: FileText,
                                    title: "Content Structure",
                                    description: "Machine-readable formats",
                                    focus: "Schema, knowledge graphs",
                                },
                                {
                                    icon: Award,
                                    title: "Authority Signals",
                                    description: "Trust & citation-worthiness",
                                    focus: "E-E-A-T, brand mentions",
                                },
                            ].map((item, index) => (
                                <div key={index} className="relative">
                                    {/* Card */}
                                    <div className="bg-black/40 rounded-2xl border border-white/10 p-6 h-full hover:border-primary/30 transition-all">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                                        <div className="text-xs text-gray-500">
                                            <span className="font-semibold text-primary">Focus:</span> {item.focus}
                                        </div>
                                    </div>

                                    {/* Arrow (except last) */}
                                    {index < 3 && (
                                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                            <div className="w-6 h-6 border-t-2 border-r-2 border-primary/30 transform rotate-45" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Key Difference */}
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                                    <div className="text-sm font-semibold text-red-400 mb-2">❌ Traditional SEO Alone</div>
                                    <p className="text-sm text-gray-400">
                                        Ranks pages but doesn't guarantee AI citations.
                                        Your content may be invisible to ChatGPT, Perplexity, and AI Overviews.
                                    </p>
                                </div>
                                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                                    <div className="text-sm font-semibold text-green-400 mb-2">✅ AI Search Optimization</div>
                                    <p className="text-sm text-gray-400">
                                        Ensures your brand is cited, referenced, and recommended by AI engines.
                                        Captures traffic at the research stage.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
                >
                    {[
                        { stat: "100M+", label: "Daily ChatGPT users" },
                        { stat: "40%", label: "Searches now use AI" },
                        { stat: "3.2x", label: "Avg traffic lift we deliver" },
                    ].map((item, index) => (
                        <div key={index} className="text-center bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                                {item.stat}
                            </div>
                            <div className="text-sm text-gray-400">{item.label}</div>
                        </div>
                    ))}
                </motion.div>
            </Container>
        </Section>
    );
}

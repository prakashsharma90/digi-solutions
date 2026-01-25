"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";

export function WhatIsStrategicSocial() {
    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background">
            <Container>
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
                                Strategic Social Media?
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            Social media marketing today is about <span className="text-white font-semibold">positioning, storytelling, distribution and data</span> — not random posting.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Diagram */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-8"
                    >
                        <div className="space-y-6">
                            {[
                                { step: "1", title: "Positioning", desc: "Define your unique voice & audience" },
                                { step: "2", title: "Storytelling", desc: "Create content that resonates" },
                                { step: "3", title: "Distribution", desc: "Reach the right people at the right time" },
                                { step: "4", title: "Data", desc: "Measure, optimize, and scale" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                    {i < 3 && <div className="ml-5 h-6 w-0.5 bg-primary/20" />}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Comparison */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-red-400 mb-3">❌ Random Posting</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>• No clear strategy</li>
                                <li>• Inconsistent messaging</li>
                                <li>• Vanity metrics focus</li>
                                <li>• No audience research</li>
                            </ul>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-green-400 mb-3">✓ Strategic Marketing</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>• Data-driven content calendar</li>
                                <li>• Cohesive brand narrative</li>
                                <li>• Conversion-focused metrics</li>
                                <li>• Deep audience insights</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}

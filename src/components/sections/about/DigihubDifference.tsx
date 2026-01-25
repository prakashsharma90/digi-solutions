"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Cpu, Layers, GitMerge, TrendingUp } from "lucide-react";

export function DigihubDifference() {
    return (
        <Section className="bg-background relative">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            What Makes <br />
                            <span className="text-primary">Digihub Different</span>
                        </h2>
                        <div className="w-full h-[1px] bg-white/10 mb-8" />

                        {/* Visual Loop Diagram (Simplified with CSS) */}
                        <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-8">
                            <div className="absolute left-9 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent opacity-30" />

                            {[
                                { title: "Funnel-First Strategy", icon: Cpu, desc: "We optimize the entire customer journey, not just clicks." },
                                { title: "Multi-Channel Execution", icon: Layers, desc: "Seamless campaigns across Google, Meta, and LinkedIn." },
                                { title: "CRO & Testing", icon: GitMerge, desc: "Continuous A/B testing to maximize conversions." },
                                { title: "Predictable Scale", icon: TrendingUp, desc: "Turning ad spend into profit." }
                            ].map((item, i) => (
                                <div key={i} className="relative flex items-start space-x-4">
                                    <div className="relative z-10 w-10 h-10 rounded-full bg-[#0B0F14] border border-primary/20 flex items-center justify-center shrink-0">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                                        <p className="text-text-muted text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content - Abstract Representation of "The Difference" */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-full min-h-[400px] flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl" />

                        {/* Central Node */}
                        <div className="relative z-10">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary p-[1px] shadow-[0_0_50px_-10px_var(--color-primary)] animate-pulse">
                                <div className="w-full h-full rounded-full bg-[#0B0F14] flex items-center justify-center">
                                    <span className="font-bold text-2xl text-white tracking-tighter">DIGI<span className="text-primary">HUB</span></span>
                                </div>
                            </div>

                            {/* Satellites */}
                            {[0, 90, 180, 270].map((deg, i) => (
                                <div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_white]"
                                    style={{
                                        transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(120px) rotate(-${deg}deg)`
                                    }}
                                />
                            ))}

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] border border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed" />
                        </div>
                    </motion.div>

                </div>
            </Container>
        </Section>
    );
}

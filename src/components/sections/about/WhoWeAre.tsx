"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function WhoWeAre() {
    return (
        <Section className="bg-background relative overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Who We Are</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6" />

                        <div className="space-y-6 text-text-muted text-lg leading-relaxed">
                            <p>
                                Digihub Solutions is built for modern businesses that demand <span className="text-white font-medium">clarity, intelligence, and results</span>.
                            </p>
                            <p>
                                We combine AI-powered analytics, creative storytelling, and precision targeting to lower CAC and increase LTV. Unlike traditional agencies that focus on likes, we focus on leads.
                            </p>
                            <p>
                                We don’t chase vanity metrics — <span className="text-primary font-medium">we build predictable revenue pipelines</span>.
                            </p>
                        </div>

                        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {["Performance Marketing", "SEO & Content", "Paid Media (PPC)", "Conversion Optimization"].map((item, i) => (
                                <div key={i} className="flex items-center space-x-2 text-white/80">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Visual - Abstract Dashboard/Data */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 rounded-full blur-[80px]" />

                        {/* Card Container */}
                        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
                            {/* Mock Dashboard UI */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <div className="h-4 w-24 bg-white/10 rounded" />
                                    <div className="h-4 w-8 bg-primary/20 rounded" />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white/5 p-3 rounded-lg space-y-2">
                                        <div className="h-2 w-12 bg-white/10 rounded" />
                                        <div className="h-6 w-16 bg-primary/40 rounded" />
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg space-y-2">
                                        <div className="h-2 w-12 bg-white/10 rounded" />
                                        <div className="h-6 w-16 bg-secondary/40 rounded" />
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg space-y-2">
                                        <div className="h-2 w-12 bg-white/10 rounded" />
                                        <div className="h-6 w-16 bg-white/20 rounded" />
                                    </div>
                                </div>

                                {/* Chart Area */}
                                <div className="h-32 bg-gradient-to-t from-primary/10 to-transparent rounded-lg border border-white/5 flex items-end justify-around pb-2 px-2">
                                    {[40, 60, 45, 70, 50, 80, 90].map((h, i) => (
                                        <div key={i} className="w-1/12 bg-primary/50 rounded-t-sm" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -right-6 -bottom-6 bg-[#0B0F14] border border-white/10 p-4 rounded-xl shadow-xl flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted">ROAS Increase</div>
                                    <div className="text-lg font-bold text-white">4.5x</div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </Container>
        </Section>
    );
}

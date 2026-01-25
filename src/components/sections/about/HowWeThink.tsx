"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Database, Cpu, Search, TrendingUp } from "lucide-react";

const pillars = [
    {
        principle: "Paid Media (PPC)",
        desc: "Precision targeting on Google, Meta, & LinkedIn to drive instant traffic and leads.",
        icon: TrendingUp,
    },
    {
        principle: "SEO & Content",
        desc: "Long-term organic growth that positions your brand as the market authority.",
        icon: Search,
    },
    {
        principle: "Marketing Automation",
        desc: "Nurture leads 24/7 with intelligent email and SMS workflows that close deals.",
        icon: Cpu,
    },
    {
        principle: "Data & Analytics",
        desc: "Crystal clear reporting. We track every dollar so you know exactly what works.",
        icon: Database,
    },
];

export function HowWeThink() {
    return (
        <Section className="bg-background relative py-32 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14] via-primary/5 to-[#0B0F14]" />

            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Core <span className="text-primary">Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-muted max-w-2xl mx-auto"
                    >
                        High-performance engines designed to scale your business.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-full min-h-[250px] p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/50 transition-all duration-300 hover:bg-white/[0.05] flex flex-col justify-between"
                        >
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-center text-white/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_4px_20px_-5px_var(--color-primary)]">
                                    <item.icon className="w-6 h-6" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">{item.principle}</h3>
                                <p className="text-text-muted text-sm leading-relaxed border-t border-white/5 pt-4">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

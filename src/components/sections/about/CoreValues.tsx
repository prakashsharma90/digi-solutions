"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { BrainCircuit, Zap, ShieldCheck, BarChart3 } from "lucide-react";

const values = [
    {
        title: "Intelligence First",
        desc: "Data-backed decisions, not guesswork.",
        icon: BrainCircuit,
        color: "text-primary",
    },
    {
        title: "Innovation",
        desc: "Always building smarter systems.",
        icon: Zap,
        color: "text-secondary",
    },
    {
        title: "Transparency",
        desc: "Clear communication & reporting.",
        icon: ShieldCheck,
        color: "text-green-400",
    },
    {
        title: "Performance",
        desc: "Results over promises.",
        icon: BarChart3,
        color: "text-purple-400",
    },
];

export function CoreValues() {
    return (
        <Section className="bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                        Core Values
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-muted text-lg"
                    >
                        The principles that drive our intelligence engine.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all hover:border-white/10 flex items-start space-x-6"
                        >
                            <div className={`p-4 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${value.color}`}>
                                <value.icon className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-text-muted">
                                    {value.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

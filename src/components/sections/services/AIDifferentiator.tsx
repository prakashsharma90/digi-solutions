"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { BrainCircuit, LineChart, MessageSquare, Zap } from "lucide-react";

const features = [
    {
        title: "AI-Driven Decisions",
        desc: "We don't audit manually. Our algorithms analyze 10,000+ data points instantly.",
        icon: BrainCircuit,
    },
    {
        title: "Predictive Optimization",
        desc: "Our models predict ad fatigue and conversion drops before they happen.",
        icon: LineChart,
    },
    {
        title: "Automated Reporting",
        desc: "Real-time dashboards. No more waiting for end-of-month PDFs.",
        icon: MessageSquare,
    },
    {
        title: "Scalable Systems",
        desc: "Workflows that handle 10x growth without breaking.",
        icon: Zap,
    },
];

export function AIDifferentiator() {
    return (
        <Section className="bg-[#050608] relative py-10 overflow-hidden">
            {/* Background Radial Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[100px]" />

            <Container className="relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-mono tracking-widest uppercase mb-6"
                    >
                        The Digihub Intelligence Layer
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Why We Are Different
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Most agencies guess. We engineer. Our proprietary AI layer sits on top of every service we provide.
                    </p>
                </div>

                {/* Visual Flow Diagram */}
                <div className="relative mb-20 hidden md:block">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

                    <div className="flex justify-between items-center max-w-4xl mx-auto relative z-10">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center gap-4 group cursor-default">
                            <div className="w-4 h-4 rounded-full bg-[#0B0F14] border-2 border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300 shadow-[0_0_0_4px_rgba(0,0,0,1)]" />
                            <span className="text-sm font-mono text-white/40 group-hover:text-white transition-colors">STRATEGY</span>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center gap-4 group cursor-default">
                            <div className="w-6 h-6 rounded-full bg-[#0B0F14] border-2 border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300 shadow-[0_0_0_4px_rgba(0,0,0,1)] flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary rounded-full absolute animate-ping opacity-0 group-hover:opacity-100" />
                            </div>
                            <span className="text-sm font-mono text-white/40 group-hover:text-white transition-colors font-bold">EXECUTION</span>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center gap-4 group cursor-default">
                            <div className="w-4 h-4 rounded-full bg-[#0B0F14] border-2 border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300 shadow-[0_0_0_4px_rgba(0,0,0,1)]" />
                            <span className="text-sm font-mono text-white/40 group-hover:text-white transition-colors">OPTIMIZATION</span>
                        </div>
                    </div>

                    {/* Flow Arrows */}
                    <motion.div
                        className="absolute top-1/2 left-[20%] w-[10%] h-[2px] bg-gradient-to-r from-transparent to-primary -translate-y-1/2"
                        animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute top-1/2 right-[20%] w-[10%] h-[2px] bg-gradient-to-l from-transparent to-primary -translate-y-1/2"
                        animate={{ x: [0, -100, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </Container>
        </Section>
    );
}

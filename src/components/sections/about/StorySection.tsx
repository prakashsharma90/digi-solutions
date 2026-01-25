"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Flag, TrendingUp, Cpu, Globe } from "lucide-react";

const timeline = [
    {
        title: "How It Started",
        desc: "Digihub began as a small collective of data scientists and strategists with one mission — to replace guesswork with undeniable intelligence.",
        icon: Flag,
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    {
        title: "The Early Challenge",
        desc: "The digital landscape was noisy. Businesses were drowning in vanity metrics. We realized the market didn't need more agencies; it needed better systems.",
        icon: TrendingUp,
        color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    },
    {
        title: "The Breakthrough",
        desc: "We developed our proprietary 'Growth Engine' framework — combining AI automation with human creativity. This hybrid approach delivered 3x ROI for our first clients.",
        icon: Cpu,
        color: "bg-primary/20 text-primary border-primary/30",
    },
    {
        title: "Where We Stand Today",
        desc: "Serving fast-growing businesses globally, Digihub Solutions is now a trusted intelligence hub known for precision, performance, and proven results.",
        icon: Globe,
        color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
];

export function StorySection() {
    return (
        <Section className="bg-background relative overflow-hidden pt-12 pb-24">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Content - Timeline */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                The Story of <br />
                                <span className="text-primary">Digihub Solutions</span>
                            </h2>
                            <p className="text-lg text-text-muted leading-relaxed mb-12">
                                Built from <span className="text-white font-medium">passion</span>, driven by <span className="text-white font-medium">intelligence</span>, and fueled by <span className="text-white font-medium">results</span> — the journey of Digihub began with a vision to redefine digital growth.
                            </p>
                        </motion.div>

                        <div className="relative space-y-12 pl-4">
                            {/* Vertical Line */}
                            <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-white/10 to-transparent" />

                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-16"
                                >
                                    {/* Dot */}
                                    <div className={`absolute left-0 top-1 w-14 h-14 rounded-full border ${item.color} flex items-center justify-center backdrop-blur-md z-10`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-text-muted leading-relaxed text-base">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Visual - Abstract Connection Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="sticky top-24 hidden md:block"
                    >
                        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl border border-white/10 p-8 flex items-center justify-center overflow-hidden backdrop-blur-sm">

                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[80px]" />

                            {/* Abstract Connected Nodes Visual */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                {/* Central Hub */}
                                <div className="absolute w-24 h-24 bg-[#0B0F14] border-2 border-primary rounded-full flex items-center justify-center z-20 shadow-[0_0_30px_-5px_var(--color-primary)]">
                                    <Cpu className="w-10 h-10 text-primary animate-pulse" />
                                </div>

                                {/* Orbiting Elements */}
                                {[0, 72, 144, 216, 288].map((deg, i) => (
                                    <div key={i} className="absolute w-full h-full animate-[spin_20s_linear_infinite]" style={{ animationDelay: `-${i * 2}s` }}>
                                        <div
                                            className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                transform: `rotate(${deg}deg) translateY(-140px) rotate(-${deg}deg)`
                                            }}
                                        >
                                            <div className="w-2 h-2 bg-white/50 rounded-full" />
                                        </div>
                                        {/* Connector Lines */}
                                        <div
                                            className="absolute top-1/2 left-1/2 w-[140px] h-[1px] bg-gradient-to-r from-primary to-transparent origin-left"
                                            style={{
                                                transform: `rotate(${deg}deg)`
                                            }}
                                        />
                                    </div>
                                ))}

                                <div className="absolute w-[360px] h-[360px] border border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
                                <div className="absolute w-[280px] h-[280px] border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </Container>
        </Section>
    );
}

"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
    {
        title: "Data-Driven Strategy",
        description:
            "Every decision is backed by analytics, market research, and performance insights to ensure consistent growth.",
    },
    {
        title: "Transparent Reporting",
        description:
            "Real-time tracking and clear performance reports so you always know where your budget goes and how campaigns perform.",
    },
    {
        title: "Scalable Growth Systems",
        description:
            "We build strong marketing foundations designed to scale — whether you're a startup or an established brand.",
    },
    {
        title: "Performance-Focused Execution",
        description:
            "Our campaigns are built for results — more traffic, better leads, higher conversions, and stronger ROI.",
    },
];

export function WhyUsRedesign() {
    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background relative overflow-hidden py-12 md:py-16 border-y border-primary/20">
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* ── Left Column: Image ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Main image */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08]">
                            <Image
                                src="/why-choose-us.png"
                                alt="Digihub team analyzing marketing data and campaign performance"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            {/* Overlay gradient for blending */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/60 via-transparent to-transparent" />
                        </div>

                        {/* Decorative cross element */}
                        <div className="absolute -bottom-6 -left-6 w-20 h-20 hidden lg:block">
                            <div className="absolute top-1/2 left-0 w-full h-3 bg-primary/30 -translate-y-1/2 rounded-full" />
                            <div className="absolute left-1/2 top-0 h-full w-3 bg-primary/30 -translate-x-1/2 rounded-full" />
                        </div>
                    </motion.div>

                    {/* ── Right Column: Content ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Label */}
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-3 h-3 rounded-sm bg-primary" />
                            <span className="text-sm font-semibold text-primary">
                                Why Choose Us?
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins leading-[1.15] mb-4 text-white">
                            When You{" "}
                            <span className="bg-primary text-black px-2 py-0.5 rounded-md inline-block">
                                Need
                            </span>{" "}
                            Real Results, We Deliver{" "}
                            <span className="bg-primary text-black px-2 py-0.5 rounded-md inline-block mt-1">
                                Growth.
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg">
                            We combine strategy, creativity, and performance marketing to help
                            brands grow faster. No guesswork — only data-driven execution, clear
                            reporting, and continuous improvement.
                        </p>

                        {/* Features 2x2 Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.2 + index * 0.1,
                                    }}
                                >
                                    <h3 className="text-sm font-bold text-white mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}

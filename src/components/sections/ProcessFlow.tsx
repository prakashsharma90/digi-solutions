"use client";

import { Container, Section } from "@/components/ui/container";
import { CheckCircle2, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Discovery & Strategy Call",
        description:
            "We start by understanding your business, goals, competitors, and target audience. This helps us create a customized growth strategy instead of using generic marketing tactics.",
    },
    {
        number: "02",
        title: "Research & Planning",
        description:
            "Our team conducts deep market research, keyword analysis, competitor audits, and audience profiling. Based on data, we create a performance-driven roadmap tailored to your brand.",
    },
    {
        number: "03",
        title: "Campaign Setup & Execution",
        description:
            "We implement SEO, paid ads, social media marketing, content marketing, or web optimization strategies. Everything is built with conversion tracking, proper analytics, and measurable KPIs.",
    },
    {
        number: "04",
        title: "Optimization & Scaling",
        description:
            "We continuously monitor performance, analyze data, and optimize campaigns for better ROI. Winning strategies are scaled. Underperforming areas are improved.",
    },
    {
        number: "05",
        title: "Reporting & Growth Insights",
        description:
            "You receive transparent reports with clear metrics — traffic, leads, sales, and ROI. We don't just show numbers — we explain what they mean and what's next.",
    },
];

const highlights = [
    "Transparent performance tracking",
    "Weekly optimization & strategy reviews",
    "Data-backed decision making",
];

export function ProcessFlow() {
    return (
        <Section className="bg-gradient-to-b from-background to-[#0B0F14] relative overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* ── Left Column ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:sticky lg:top-32"
                    >
                        {/* Label */}
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-5 inline-block">
                            Our Process
                        </span>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-poppins leading-[1.1] mb-6 text-white">
                            How We Drive{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Digital Growth.
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md mb-10">
                            We follow a performance-driven framework that turns strategy into
                            measurable results — built on data, creativity, and continuous
                            optimization.
                        </p>

                        {/* Highlights Card */}
                        <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 pr-20 overflow-hidden">
                            <ul className="space-y-4">
                                {highlights.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span className="text-sm font-semibold text-white">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Rocket icon decoration */}
                            <div className="absolute right-4 bottom-4 opacity-[0.12]">
                                <Rocket className="w-20 h-20 text-primary" strokeWidth={1} />
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Right Column: Timeline ── */}
                    <div className="relative">
                        {/* Vertical connecting line */}
                        <div className="absolute left-[23px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent hidden md:block" />

                        <div className="space-y-2">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                    }}
                                    className="group relative flex items-start gap-6 py-6 rounded-xl hover:bg-white/[0.02] px-2 transition-colors"
                                >
                                    {/* Step Number Badge */}
                                    <div
                                        className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${index === 0
                                                ? "bg-primary text-black shadow-[0_0_20px_rgba(0,217,195,0.4)]"
                                                : "bg-white/[0.06] border border-white/10 text-gray-500 group-hover:border-primary/40 group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(0,217,195,0.15)]"
                                            }`}
                                    >
                                        {step.number}
                                    </div>

                                    {/* Content */}
                                    <div className="pt-1">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm group-hover:text-gray-400 transition-colors">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

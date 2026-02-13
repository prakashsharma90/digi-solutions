"use client";

import React from "react";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const stats = [
    { value: "50+", label: "Brands Scaled" },
    { value: "₹2.5Cr+", label: "Revenue Generated" },
    { value: "4.2x", label: "Avg. ROAS" },
];

export function HeroRedesign() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#060910]">
            {/* Subtle grain texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Single subtle accent light — top center */}
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[150px] pointer-events-none" />

            <Container className="relative z-10 pt-32 pb-20">
                {/* === Top Section === */}
                <div className="max-w-5xl">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="w-8 h-px bg-primary" />
                        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.25em]">
                            Performance Marketing Agency
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold font-poppins leading-[1.05] tracking-[-0.02em] text-white mb-8"
                    >
                        We turn marketing spend
                        <br className="hidden md:block" />
                        into{" "}
                        <span className="relative inline-block">
                            predictable growth
                            {/* Hand-drawn style underline accent */}
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 300 12"
                                fill="none"
                                preserveAspectRatio="none"
                            >
                                <motion.path
                                    d="M2 8.5C52 2.5 98 3.5 148 6C198 8.5 248 4.5 298 7"
                                    stroke="oklch(var(--primary))"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.8,
                                        ease: "easeOut",
                                    }}
                                />
                            </svg>
                        </span>
                        <span className="text-gray-500">.</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg md:text-xl text-gray-400 max-w-xl leading-[1.7] mb-10"
                    >
                        SEO, paid ads, content, and strategy — designed around
                        your business goals. No vanity metrics. Just results you
                        can measure.
                    </motion.p>

                    {/* CTA Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-start gap-4 mb-20"
                    >
                        <NextLink href="/contact" className="group">
                            <Button className="h-13 px-8 text-sm font-semibold bg-primary hover:bg-primary/90 text-black rounded-full shadow-[0_0_40px_-12px_oklch(var(--primary))] hover:shadow-[0_0_50px_-8px_oklch(var(--primary))] transition-all duration-300">
                                Get a Free Growth Audit
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </NextLink>
                        <NextLink href="/case-studies">
                            <Button
                                variant="ghost"
                                className="h-13 px-6 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                            >
                                View case studies
                                <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                            </Button>
                        </NextLink>
                    </motion.div>
                </div>

                {/* === Stats Bar === */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {/* Thin divider */}
                    <div className="w-full h-px bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent mb-10" />

                    <div className="flex flex-wrap items-center gap-x-16 gap-y-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-baseline gap-3">
                                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight font-poppins">
                                    {stat.value}
                                </span>
                                <span className="text-xs text-gray-600 uppercase tracking-[0.15em] font-medium">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Container>

            {/* Bottom gradient transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
}

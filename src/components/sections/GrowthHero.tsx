"use client";

import React from "react";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

export function GrowthHero() {
    return (
        <section className="relative py-16 md:py-24 overflow-hidden bg-[#060910] ">
            {/* Organic background shape — like the arch in the reference */}
            <div className="absolute top-0 right-0 w-[55%] h-full hidden lg:block pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 100% at 70% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)",
                    }}
                />
            </div>

            <Container className="relative z-10 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left — Text Content */}
                    <div className="max-w-xl">
                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold font-poppins leading-[1.08] tracking-[-0.02em] text-white mb-6"
                        >
                            Grow Your Brand.
                            <br />
                            Maximize Your
                            <br />
                            Reach<span className="text-primary">.</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="text-base text-gray-400 leading-[1.8] mb-8 max-w-md"
                        >
                            We help digital-first companies scale through
                            performance marketing, creative strategy, and
                            data-driven growth.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="flex flex-wrap items-center gap-4 mb-12"
                        >
                            <NextLink href="/contact" className="group">
                                <Button className="h-12 px-7 text-sm font-semibold bg-primary hover:bg-primary/90 text-black rounded-full transition-all">
                                    Let&apos;s Talk Strategy
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </NextLink>
                            <NextLink href="/case-studies">
                                <Button
                                    variant="outline"
                                    className="h-12 px-7 text-sm font-semibold border border-white/15 hover:border-white/30 hover:bg-white/5 rounded-full transition-all"
                                >
                                    View Works
                                </Button>
                            </NextLink>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex items-start gap-10"
                        >
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight font-poppins">
                                    +350%
                                </div>
                                <div className="text-xs text-gray-500 mt-1 font-medium">
                                    avg. increase in ROI
                                </div>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight font-poppins">
                                    92%
                                </div>
                                <div className="text-xs text-gray-500 mt-1 font-medium">
                                    client retention rate
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — Vector Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative flex items-center justify-center lg:justify-end"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/586439f1c0116a15748b12465c57f33d.png"
                            alt="Team collaborating on digital marketing strategy"
                            className="w-full max-w-lg lg:max-w-none lg:w-[110%] h-auto drop-shadow-2xl"
                        />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

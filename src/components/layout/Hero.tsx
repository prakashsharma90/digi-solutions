"use client";

import React from "react";
import { Link } from "lucide-react"; // Importing Icon, not Next Link to avoid conflict if I use both.
// Actually I need Next Link for navigation and Lucide icon for UI.
import NextLink from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BrainCircuit } from "./BrainCircuit";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
            {/* Background Gradients/Patterns */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
                <div className="absolute bottom-0 right-0 w-full h-[500px] bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background opacity-30" />
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
                {/* Left Column: Content */}
                <div className="flex flex-col gap-6 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-primary font-bold tracking-wider uppercase text-sm bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                            Performance Marketing Agency
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Turn Ad Spend Into{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Predictable Revenue
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        AI-powered marketing that scales profitably. No guesswork. No wasted budget. Just data-driven campaigns that deliver real ROI.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <NextLink href="/contact">
                            <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 shadow-[0_0_20px_-5px_var(--color-primary)]">
                                Book Free Strategy Call
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </NextLink>
                        <NextLink href="/case-studies">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                                View Case Studies
                                <ChevronRight className="ml-2 w-4 h-4" />
                            </Button>
                        </NextLink>
                    </motion.div>
                </div>

                {/* Right Column: Visual */}
                <motion.div
                    className="relative flex items-center justify-center lg:h-full min-h-[300px] md:min-h-[400px] mt-8 lg:mt-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <BrainCircuit />
                </motion.div>
            </Container>
        </section>
    );
}

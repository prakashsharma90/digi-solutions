"use client";

import React from "react";
import NextLink from "next/link";
import { ArrowRight, Play, CheckCircle2, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HeroRedesign() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#0B0F14] via-[#0F1419] to-background">
            {/* Subtle Background Pattern - Performance Optimized */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.08),transparent_50%)]" />
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Content - 7 cols */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2"
                        >
                            <Award className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">Trusted by 50+ Growing Brands</span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-4"
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-poppins leading-[1.1] tracking-tight">
                                Turn Ad Spend Into{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                                    Predictable Revenue
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                                AI-powered performance marketing that scales profitably.
                                <span className="text-white font-medium"> No guesswork. No wasted budget.</span>
                                {" "}Just data-driven campaigns that deliver real ROI.
                            </p>
                        </motion.div>

                        {/* Social Proof Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-wrap gap-8 py-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-background flex items-center justify-center text-xs font-bold">
                                            {i}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold text-white">50+ Clients</div>
                                    <div className="text-gray-500">Active Campaigns</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold text-white">₹2.5Cr+</div>
                                    <div className="text-gray-500">Ad Spend Managed</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Award className="w-5 h-5 text-primary" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold text-white">4.9/5</div>
                                    <div className="text-gray-500">Client Rating</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <NextLink href="/contact" className="group">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto h-14 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-black shadow-[0_0_30px_-5px_var(--color-primary)] hover:shadow-[0_0_40px_-5px_var(--color-primary)] transition-all"
                                >
                                    Book Free Strategy Call
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </NextLink>
                            <NextLink href="/case-studies">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-2 border-white/20 hover:border-primary/50 hover:bg-primary/5"
                                >
                                    <Play className="mr-2 w-5 h-5" />
                                    View Case Studies
                                </Button>
                            </NextLink>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-500"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>No long-term contracts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>ROI guarantee</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual - 5 cols */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Dashboard Preview Card */}
                        <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-[100px] rounded-full" />

                            {/* Card */}
                            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Campaign Performance</h3>
                                        <p className="text-sm text-gray-400">Last 30 days</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                                        <div className="text-2xl font-bold text-white">350%</div>
                                        <div className="text-xs text-gray-400 mt-1">Revenue Growth</div>
                                        <div className="flex items-center gap-1 mt-2 text-green-400 text-xs">
                                            <TrendingUp className="w-3 h-3" />
                                            <span>+42% vs last month</span>
                                        </div>
                                    </div>
                                    <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                                        <div className="text-2xl font-bold text-white">₹12.5L</div>
                                        <div className="text-xs text-gray-400 mt-1">Monthly Revenue</div>
                                        <div className="flex items-center gap-1 mt-2 text-green-400 text-xs">
                                            <TrendingUp className="w-3 h-3" />
                                            <span>+28% vs last month</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chart Visualization */}
                                <div className="h-32 flex items-end justify-between gap-2">
                                    {[40, 55, 45, 70, 60, 85, 75, 90].map((height, i) => (
                                        <div key={i} className="flex-1 group relative">
                                            <div
                                                className="w-full bg-gradient-to-t from-primary/40 to-primary/20 rounded-t-lg hover:from-primary/60 hover:to-primary/40 transition-all duration-300 relative"
                                                style={{ height: `${height}%` }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    ₹{(height * 1000).toLocaleString('en-IN')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom Label */}
                                <div className="flex justify-between mt-4 text-xs text-gray-500">
                                    <span>Week 1</span>
                                    <span>Week 4</span>
                                </div>
                            </div>

                            {/* Floating Metric Card */}
                            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-xl rounded-xl border border-green-500/20 p-4 shadow-xl hidden lg:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400">ROAS</div>
                                        <div className="text-xl font-bold text-green-400">4.2x</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

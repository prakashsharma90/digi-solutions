"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, Award, Users, Sparkles, Play } from "lucide-react";
import { motion } from "framer-motion";

export function SocialMediaHero() {
    return (
        <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#0B0F14] via-[#0F1419] to-background">
            {/* Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.1),transparent_50%)]" />
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Content - 7 cols */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">Social Media Marketing & Brand Growth</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-poppins leading-[1.1] tracking-tight mb-6">
                                Social Media Marketing That{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                                    Builds Brands
                                </span>
                                <br />
                                Not Just Posts
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                                Grow your audience, engagement & revenue with strategic social media.
                                We design and manage high-impact strategies for{" "}
                                <span className="text-white font-semibold">Instagram, LinkedIn, YouTube & X</span>{" "}
                                that convert followers into customers.
                            </p>
                        </motion.div>

                        {/* Trust Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-wrap gap-8 py-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-primary" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold text-white">50+ Brands</div>
                                    <div className="text-gray-500">Scaled</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold text-white">Avg 2.5x</div>
                                    <div className="text-gray-500">Engagement Lift</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                    <Award className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold text-white">Data-Driven</div>
                                    <div className="text-gray-500">Content Systems</div>
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
                            <Link href="#lead-capture" className="group">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto h-14 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-black shadow-[0_0_30px_-5px_var(--color-primary)] transition-all"
                                >
                                    Get Free Social Media Audit
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="#case-studies">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-2 border-white/20 hover:border-primary/50"
                                >
                                    <Play className="mr-2 w-5 h-5" />
                                    See Case Studies
                                </Button>
                            </Link>
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
                                <span>No vanity metrics</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>Conversion-focused</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>Weekly reporting</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Social Metrics Dashboard - 5 cols */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-[100px]" />

                            {/* Dashboard Card */}
                            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Social Performance</h3>
                                        <p className="text-sm text-gray-400">Last 90 days</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs text-gray-400">Live</span>
                                    </div>
                                </div>

                                {/* Platform Metrics */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 mb-1">📸 Instagram</div>
                                        <div className="text-2xl font-bold text-white">+210%</div>
                                        <div className="flex items-center gap-1 mt-2 text-green-400 text-xs">
                                            <TrendingUp className="w-3 h-3" />
                                            <span>Reach growth</span>
                                        </div>
                                    </div>
                                    <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                                        <div className="text-xs text-gray-400 mb-1">💼 LinkedIn</div>
                                        <div className="text-2xl font-bold text-white">3x</div>
                                        <div className="flex items-center gap-1 mt-2 text-green-400 text-xs">
                                            <TrendingUp className="w-3 h-3" />
                                            <span>Lead generation</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Engagement Chart */}
                                <div className="h-32 flex items-end justify-between gap-2 mb-4">
                                    {[30, 45, 55, 50, 70, 85, 95, 100].map((height, i) => (
                                        <div key={i} className="flex-1 group relative">
                                            <div
                                                className="w-full bg-gradient-to-t from-primary/40 to-primary/20 rounded-t-lg transition-all duration-300"
                                                style={{ height: `${height}%` }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Labels */}
                                <div className="flex justify-between text-xs text-gray-500 mb-6">
                                    <span>Month 1</span>
                                    <span>Month 3</span>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-primary">2.5x</div>
                                        <div className="text-xs text-gray-500">Engagement</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-primary">50K+</div>
                                        <div className="text-xs text-gray-500">Followers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-primary">₹12L</div>
                                        <div className="text-xs text-gray-500">Revenue</div>
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

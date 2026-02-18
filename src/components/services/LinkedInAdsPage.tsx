"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Linkedin,
    Target,
    Users,
    TrendingUp,
    ArrowUpRight,
    ShieldCheck,
    Cpu,
    Check,
    ChevronDown,
    Plus,
    X,
    Layers,
    BarChart,
    MousePointer2,
    Zap,
    Briefcase,
    Globe,
    Lock
} from "lucide-react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";

export function LinkedInAdsPage({ plans }: { plans?: any[] }) {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Default plans if none provided from DB
    const displayPlans = (plans && plans.length > 0) ? plans : [
        {
            title: "Executive Starter",
            price: "19,999",
            desc: "Ideal for startups needing high-quality lead generation.",
            features: [
                "Targeted Audience Matrix",
                "2 High-Impact Campaign Setup",
                "Advanced Lead Gen Forms",
                "Monthly ROI Reporting",
                "Creative Asset Optimization"
            ]
        },
        {
            title: "Corporate Growth",
            price: "44,999",
            desc: "Designed for scaling B2B agencies and product companies.",
            is_popular: true,
            features: [
                "Everything in Starter",
                "Account-Based Marketing (ABM)",
                "Retargeting Funnel Setup",
                "Direct Message Ad Streams",
                "Custom API Integrations",
                "Fortnightly Strategy Calls"
            ]
        },
        {
            title: "Enterprise Dominance",
            price: "Custom",
            desc: "Full-scale market dominance for industry leaders.",
            features: [
                "Full-Funnel Management",
                "Omni-channel B2B Sync",
                "Executive Ghostwriting Ads",
                "Private Beta Feature Access",
                "Dedicated Account Architect",
                "Real-time Data Dashboard"
            ]
        }
    ];

    return (
        <main className="bg-[#080A0D] text-white selection:bg-[#00D9C3]/30 overflow-hidden">
            {/* ══════════════════════════════════════════════
                1. HERO: THE B2B COMMAND CENTER
            ══════════════════════════════════════════════ */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#080A0D]">
                {/* ── Background Architecture ── */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Atmospheric Gradients */}
                    <div className="absolute top-0 right-[-10%] w-[80vw] h-[80vw] bg-gradient-radial from-[#0077B5]/15 to-transparent blur-[140px] opacity-60" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-radial from-[#00D9C3]/10 to-transparent blur-[120px] opacity-40" />

                    {/* Background Typography */}
                    <div className="absolute top-[15%] left-[-2%] select-none">
                        <span className="text-[25vw] font-black leading-none text-white/[0.02] tracking-[-0.08em] whitespace-nowrap">
                            INFILTRATE
                        </span>
                    </div>

                    {/* SVG Grid Overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
                </div>

                <Container className="relative z-10">
                    <div className="grid grid-cols-12 gap-6 items-center">
                        {/* ── Left Content (8 Columns) ── */}
                        <div className="col-span-12 lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-3 mb-8"
                            >
                                <div className="w-12 h-px bg-[#00D9C3]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00D9C3]">Protocol: LinkedIn Alpha</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[clamp(3.5rem,8vw,7.5rem)] font-black leading-[0.88] tracking-tighter uppercase mb-10"
                            >
                                Own the <br />
                                <span className="text-[#00D9C3]">Strategy</span> <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>That Controls</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl mb-14"
                            >
                                We don't just run ads. We architect intelligence-driven systems that navigate directly into the boardrooms of the world's most valuable prospects.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="flex flex-wrap items-center gap-8"
                            >
                                <Link href="/contact">
                                    <button className="group relative px-14 py-7 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-[#00D9C3] transition-all duration-700 shadow-[0_20px_40px_-5px_rgba(255,255,255,0.1)] overflow-hidden">
                                        <span className="relative z-10 flex items-center gap-4">
                                            Request Engagement <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500" />
                                        </span>
                                        <div className="absolute inset-0 bg-[#00D9C3] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    </button>
                                </Link>

                                <div className="flex items-center gap-4 group cursor-help">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-[#080A0D] overflow-hidden bg-gray-900 group-hover:scale-110 transition-transform duration-500">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="client" className="grayscale group-hover:grayscale-0 transition-all duration-700" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-tight">
                                        Verified by <br /> <span className="text-white">Fortune 500 Ops</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Right Dashboard (4 Columns) ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="hidden lg:block lg:col-span-4 relative"
                        >
                            <div className="relative p-8 rounded-[3rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-3xl overflow-hidden group">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9C3]/10 blur-3xl rounded-full" />
                                <Linkedin className="absolute -bottom-8 -right-8 w-40 h-40 text-white/[0.02] -rotate-12" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-[#00D9C3] uppercase tracking-widest mb-1">Targeting Status</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#00D9C3] animate-pulse" />
                                                <span className="text-sm font-bold text-white uppercase italic">Active Sync</span>
                                            </div>
                                        </div>
                                        <ShieldCheck className="text-white/20" size={24} />
                                    </div>

                                    <div className="space-y-6 mb-10">
                                        {[
                                            { label: "Pipeline Velocity", val: "84.2%", color: "#00D9C3" },
                                            { label: "C-Suite Match", val: "91.8%", color: "#0077B5" },
                                            { label: "Market Resonance", val: "Elite", color: "#fff" },
                                        ].map((stat, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter mb-2 opacity-60">
                                                    <span>{stat.label}</span>
                                                    <span>{stat.val}</span>
                                                </div>
                                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: '100%' }}
                                                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                                                        className="h-full rounded-full"
                                                        style={{ backgroundColor: stat.color, width: stat.val }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-[#00D9C3]/30 transition-colors duration-500">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-40">Next Objective</h4>
                                        <p className="text-xs font-bold text-white/80 leading-relaxed italic">
                                            "Infiltrate the series-B cohort in the Fintech vertical across APAC regions."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Tag */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-12 px-6 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-[9px] shadow-2xl z-20 flex items-center gap-3"
                            >
                                <Zap size={14} className="fill-[#00D9C3] text-[#00D9C3]" />
                                Real-time Optimization
                            </motion.div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ══════════════════════════════════════════════
                2. THE BOARDROOM MATRIX (Value Prop)
            ══════════════════════════════════════════════ */}
            <Section className="py-32 bg-[#080A0D] border-y border-white/5 relative overflow-hidden">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white leading-none tracking-[-0.1em]">
                        META
                    </span>
                </div>

                <Container>
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Left Content: High-Impact Quote (5 Columns) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-5 lg:sticky lg:top-32"
                        >
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-2 h-2 rounded-full bg-[#00D9C3]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00D9C3]">Philosophical Core</span>
                            </div>

                            <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-12">
                                Why <br /> LinkedIn <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px #00D9C3" }}>Is The Meta</span>
                            </h2>

                            <div className="relative p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                                <Quote size={40} className="text-[#00D9C3] mb-6 opacity-40" />
                                <p className="text-2xl md:text-3xl font-black text-white leading-[1.2] mb-0">
                                    "While others scroll for <span className="text-gray-500">entertainment</span>, LinkedIn users scroll for <span className="text-[#00D9C3]">investment</span>. We catch them in the investment mindset."
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Content: Strategic Pillars (7 Columns) */}
                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 pt-12 lg:pt-0">
                            {[
                                {
                                    icon: Target,
                                    title: "Surgical Targeting",
                                    desc: "Reach people by Decision Maker status, Job Title, or exact Company Domain. No more shouting into the void.",
                                    tag: "Precision"
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "High-Value Trust",
                                    desc: "Ads on LinkedIn receive 2x more trust than other social platforms. Your brand is elevated by association.",
                                    tag: "Authority"
                                },
                                {
                                    icon: BarChart,
                                    title: "Quality Over Quantity",
                                    desc: "A single LinkedIn lead is often worth 10x more than a standard social lead in terms of Lifetime Value.",
                                    tag: "LTV"
                                },
                                {
                                    icon: Globe,
                                    title: "Global Professional Reach",
                                    desc: "Scale into new markets by targeting international professional networks with localized messaging.",
                                    tag: "Scaling"
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.15 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className={`p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 group transition-all duration-500 ${i % 2 !== 0 ? 'sm:mt-12' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="w-16 h-16 rounded-2xl bg-[#00D9C3]/10 border border-[#00D9C3]/20 flex items-center justify-center text-[#00D9C3] group-hover:bg-[#00D9C3] group-hover:text-black transition-all duration-500">
                                            <item.icon size={30} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover:text-[#00D9C3] transition-colors">{item.tag}</span>
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{item.title}</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed text-sm group-hover:text-gray-400 transition-colors">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                3. THE GROWTH BLUEPRINT (Schematic Section)
            ══════════════════════════════════════════════ */}
            <Section className="py-48 relative overflow-hidden bg-[#05070A]">
                {/* ── Blueprint Background Architecture ── */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    {/* Technical Grid */}
                    <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
                    <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px', opacity: 0.3 }} />

                    {/* Drafting Ornaments */}
                    <div className="absolute top-10 left-10 w-40 h-40 border-l border-t border-white/20" />
                    <div className="absolute bottom-10 right-10 w-40 h-40 border-r border-b border-white/20" />

                    {/* Massive Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] select-none">
                        <span className="text-[30vw] font-black text-white/5 uppercase tracking-[-0.05em] whitespace-nowrap">
                            CALIBRATED
                        </span>
                    </div>
                </div>

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* ── Left Control Header (Col 7) ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-7 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl flex flex-col justify-between overflow-hidden relative group min-h-[500px]"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-3 h-3 rounded-full bg-[#00D9C3] animate-ping" />
                                    <span className="text-[#00D9C3] text-[10px] font-black uppercase tracking-[0.5em]">System: Live Deployment</span>
                                </div>

                                <h2 className="text-7xl md:text-[9.5rem] font-black tracking-tighter uppercase leading-[0.78] mb-12">
                                    Growth <br />
                                    <span className="text-transparent" style={{ WebkitTextStroke: "1px #fff" }}>Blueprint</span>
                                </h2>

                                <div className="max-w-md">
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed mb-10">
                                        A clinical 4-phase protocol engineered for maximum market penetration and pipeline acceleration.
                                    </p>

                                    <div className="flex gap-16">
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">Clearance</div>
                                            <div className="text-2xl font-black text-white">LEVEL-7</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">Execution</div>
                                            <div className="text-2xl font-black text-white italic">REALTIME</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Waveform */}
                            <div className="absolute bottom-0 right-0 w-full overflow-hidden opacity-10 flex items-end gap-1 px-12 pb-12">
                                {[...Array(30)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [20, 60, 20] }}
                                        transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                                        className="w-1 bg-white"
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* ── Phase 1 (Col 5) ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="md:col-span-5 p-12 rounded-[3.5rem] bg-gradient-to-br from-[#00D9C3] to-[#00A896] text-black relative group overflow-hidden min-h-[400px]"
                        >
                            <div className="absolute top-10 right-10 text-[6rem] font-black opacity-10">01</div>
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="w-16 h-16 rounded-3xl bg-black flex items-center justify-center mb-12">
                                    <Cpu size={32} className="text-[#00D9C3]" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest mb-4">Phase: Acquisition</div>
                                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-6">Signal Audit</h3>
                                    <p className="font-bold text-black/60 leading-relaxed text-sm">
                                        Deep-tissue extraction of decision-maker intent using exact professional data clusters.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Phase 2 (Col 4) ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="md:col-span-4 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:border-[#00D9C3]/30 transition-all duration-500 overflow-hidden relative min-h-[350px]"
                        >
                            <div className="absolute -bottom-10 -right-10 text-[8rem] font-black text-white/[0.02]">02</div>
                            <div className="text-[10px] font-black text-[#00D9C3] uppercase tracking-[0.3em] mb-10 italic">SYNTHESIS_ENGINE</div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Asset Forge</h3>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-12">
                                Architecting narrative disruption layers that bypass executive defense patterns.
                            </p>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '85%' }}
                                    transition={{ duration: 1.5 }}
                                    className="h-full bg-[#00D9C3]"
                                />
                            </div>
                        </motion.div>

                        {/* ── Phase 3 (Col 4) ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="md:col-span-4 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:border-[#00D9C3]/30 transition-all duration-500 relative min-h-[350px]"
                        >
                            <div className="absolute top-10 right-10 flex gap-1">
                                <div className="w-1.5 h-6 bg-[#00D9C3]/40 rounded-full" />
                                <div className="w-1.5 h-6 bg-[#00D9C3] rounded-full animate-bounce" />
                                <div className="w-1.5 h-6 bg-[#00D9C3]/20 rounded-full" />
                            </div>
                            <div className="text-[10px] font-black text-[#00D9C3] uppercase tracking-[0.3em] mb-10">DEPLOYMENT_NODE</div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Launch Matrix</h3>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed">
                                Surgical infiltration of target boardrooms with high-resonance lead capture systems.
                            </p>
                        </motion.div>

                        {/* ── Phase 4 (Col 4) ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="md:col-span-4 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group hover:bg-[#00D9C3] hover:text-black transition-all duration-700 relative min-h-[350px]"
                        >
                            <div className="absolute top-10 right-10">
                                <ArrowUpRight size={40} className="text-[#00D9C3] group-hover:text-black transition-colors" />
                            </div>
                            <div className="text-[10px] font-black text-[#00D9C3] group-hover:text-black uppercase tracking-[0.3em] mb-10">OPTIMIZATION_GRID</div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Scale Protocol</h3>
                            <p className="text-gray-500 group-hover:text-black/70 font-medium text-sm leading-relaxed">
                                Hyper-recursive optimization loops to maximize penetration across all vertical silos.
                            </p>
                        </motion.div>
                    </div>

                    {/* ── Drafting Scale Element (Bottom) ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                        className="mt-32 pt-12 border-t border-white/5 flex flex-wrap justify-between items-center gap-8"
                    >
                        <div className="flex items-center gap-12">
                            <div className="flex items-end gap-1 overflow-hidden h-8">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className={`w-0.5 bg-white/10 ${i % 5 === 0 ? 'h-full' : 'h-1/2'}`} />
                                ))}
                            </div>
                            <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                Scale: 1:1 Executive Resonance
                            </div>
                        </div>
                        <div className="text-[9px] font-bold text-[#00D9C3]/40 uppercase tracking-[0.4em]">
                            Proprietary Architectural Node // DigiHub Global © 2024
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                4. THE INTENT LAYER (Campaign Types)
            ══════════════════════════════════════════════ */}
            <Section className="py-40 bg-[#080A0D] relative overflow-hidden">
                {/* Background Large Text */}
                <div className="absolute top-[10%] right-[-5%] opacity-[0.02] pointer-events-none select-none">
                    <span className="text-[30vw] font-black text-white leading-none tracking-[-0.08em]">
                        TACTICAL
                    </span>
                </div>

                <Container>
                    <div className="grid lg:grid-cols-12 gap-20 items-center">
                        {/* Left Column: Tactical Visual (5 Columns) */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="lg:col-span-5 relative order-2 lg:order-1"
                        >
                            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 group">
                                <img
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000"
                                    alt="Tactical Intelligence"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-transparent opacity-90" />

                                {/* Overlapping Info Shield */}
                                <div className="absolute bottom-10 left-10 right-10 p-10 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[2.5rem]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#00D9C3]/20 flex items-center justify-center text-[#00D9C3]">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Security Clearing</div>
                                    </div>
                                    <p className="text-xl font-black text-white uppercase leading-tight tracking-tight">
                                        Infiltrating the <br /> <span className="text-[#00D9C3]">Series B-C</span> cohort
                                    </p>
                                </div>
                            </div>

                            {/* Floating Signal Widget */}
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 p-8 rounded-3xl bg-white text-black shadow-[0_40px_80px_-15px_rgba(255,255,255,0.2)] z-20"
                            >
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Decision Signal</div>
                                <div className="text-4xl font-black tabular-nums">94.2%</div>
                                <div className="h-1 w-full bg-gray-100 rounded-full mt-4 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '94.2%' }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="h-full bg-[#00D9C3]"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Content: Deployment Modules (7 Columns) */}
                        <div className="lg:col-span-7 order-1 lg:order-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <div className="w-10 h-px bg-[#00D9C3]" />
                                <span className="text-[#00D9C3] text-[10px] font-black uppercase tracking-[0.5em]">Intel Layers</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-20"
                            >
                                Multi-Channel <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px #fff" }}>Strategic Strike</span>
                            </motion.h2>

                            <div className="space-y-6">
                                {[
                                    {
                                        num: "01",
                                        title: "Account-Based (ABM)",
                                        desc: "Lock onto specific high-value companies and nurture their entire decision-making committee.",
                                        impact: "Lead Quality: Executive"
                                    },
                                    {
                                        num: "02",
                                        title: "Direct Pipeline (Lead Gen)",
                                        desc: "Surgical lead-capture forms that integrate directly with your CRM. Zero friction, total intent.",
                                        impact: "LTV Projection: High"
                                    },
                                    {
                                        num: "03",
                                        title: "Thought Leadership",
                                        desc: "Project authority through long-form content that establishes your brand as the market leader.",
                                        impact: "Brand Authority: Dominant"
                                    },
                                    {
                                        num: "04",
                                        title: "In-Mail Infiltration",
                                        desc: "Direct, personalized delivery of high-value offers into the private inboxes of decision-makers.",
                                        impact: "Conversion Depth: 3x"
                                    }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.15 }}
                                        className="group flex items-start gap-10 p-8 rounded-[2rem] hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-500"
                                    >
                                        <div className="text-4xl font-black text-white/5 group-hover:text-[#00D9C3] transition-colors leading-none pt-1">
                                            {item.num}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-white transition-colors">
                                                    {item.title}
                                                </h3>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-[#00D9C3]/40 group-hover:text-[#00D9C3] transition-colors">
                                                    {item.impact}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-400 transition-colors">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                5. DESIGNED PRICING (Triad Layout)
            ══════════════════════════════════════════════ */}
            <Section className="py-32 bg-black relative">
                {/* Background Large Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none w-full text-center">
                    <span className="text-[25vw] font-black uppercase tracking-tighter">PRICING</span>
                </div>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-24"
                    >
                        <span className="text-[#00D9C3] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Investment Packages</span>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                            Select Your <br /> <span className="text-transparent" style={{ WebkitTextStroke: "1px #fff" }}>Leverage</span>
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                        {displayPlans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative flex flex-col p-10 rounded-[3rem] border transition-all duration-700 ${plan.is_popular
                                    ? "bg-[#0C121A] border-[#00D9C3]/30 shadow-[0_40px_100px_-20px_rgba(0,217,195,0.1)] scale-105 z-10"
                                    : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
                                    }`}
                            >
                                {plan.is_popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00D9C3] text-black text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full">
                                        Most Strategic
                                    </div>
                                )}

                                <div className="mb-10">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{plan.title}</h3>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-5xl font-black text-white">
                                            {plan.price === "Custom" ? "CUSTOM" : `₹${plan.price}`}
                                        </span>
                                        {plan.price !== "Custom" && <span className="text-gray-500 font-bold uppercase text-[10px]">/ month</span>}
                                    </div>
                                    <p className="text-gray-500 font-medium text-sm leading-relaxed">{plan.desc}</p>
                                </div>

                                <div className="flex-1 space-y-5 mb-12">
                                    {plan.features.map((feature: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-[#00D9C3]/10 border border-[#00D9C3]/30 flex items-center justify-center shrink-0">
                                                <Check size={12} className="text-[#00D9C3]" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-400">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/contact" className="block mt-auto">
                                    <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-500 ${plan.is_popular
                                        ? "bg-[#00D9C3] text-black hover:scale-105"
                                        : "bg-white/5 text-white hover:bg-white/10"
                                        }`}>
                                        Deploy Campaign
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                6. B2B FAQ SECTION (High-End Design)
            ══════════════════════════════════════════════ */}
            <Section className="bg-gradient-to-b from-[#0B0F14] to-[#080A0D] relative overflow-hidden border-y border-[#00D9C3]/20 py-32">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:sticky lg:top-32"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full bg-[#00D9C3]" />
                                <span className="text-sm font-black uppercase tracking-[0.3em] text-[#00D9C3]">Boardroom Intelligence</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-black leading-[1.1] mb-12 text-white uppercase tracking-tighter">
                                Strategic <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9C3] to-[#00F5E0]">Clarification</span>
                            </h2>

                            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-10">
                                <div className="w-16 h-16 rounded-2xl bg-[#0077B5]/20 border border-[#0077B5]/30 flex items-center justify-center mb-6">
                                    <Linkedin className="w-8 h-8 text-[#0077B5]" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">Need a Custom Audit?</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
                                    We offer a complimentary executive audit of your current LinkedIn presence to identify immediate growth leaks.
                                </p>
                                <Link href="/contact" className="block text-center px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] hover:bg-[#00D9C3] hover:scale-105 transition-all duration-500">
                                    Book Executive Audit
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Column: Accordion */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-4"
                        >
                            {[
                                {
                                    q: "How do LinkedIn Ads differ from Meta/Google Ads?",
                                    a: "On LinkedIn, we target professional intent. While Meta targets interests/behaviors, LinkedIn allows us to target exact professional traits: Job Title, Seniority, and Company. This results in significantly higher lead quality for B2B."
                                },
                                {
                                    q: "What is the recommended minimum ad budget?",
                                    a: "LinkedIn is a premium platform. We generally recommend a minimum ad spend of ₹50,000/month to see meaningful data and lead volume, though we can architect strategies for smaller test phases."
                                },
                                {
                                    q: "How soon do we see qualified pipeline?",
                                    a: "Typically, the 'discovery' and 'calibration' phase takes 14-21 days. By the end of Month 1, we expect to see consistent lead flow, with peak optimization occurring around Month 3."
                                },
                                {
                                    q: "Do you handle the creative and copy as well?",
                                    a: "Yes. Our 'Executive Forge' team handles everything from professional copywriting to custom visual design, ensuring your ads match the prestige of your brand."
                                }
                            ].map((faq, index) => {
                                const isOpen = activeFaq === index;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.1 * index }}
                                        className={`rounded-3xl border transition-all duration-500 ${isOpen
                                            ? "bg-white/[0.04] border-[#00D9C3]/40"
                                            : "bg-white/[0.01] border-white/5 hover:border-white/10"
                                            }`}
                                    >
                                        <button
                                            onClick={() => setActiveFaq(isOpen ? null : index)}
                                            className="w-full flex items-center justify-between p-8 text-left"
                                        >
                                            <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${isOpen ? "text-white" : "text-gray-400"}`}>
                                                {faq.q}
                                            </span>
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen
                                                ? "bg-[#00D9C3] text-black rotate-0"
                                                : "bg-white/5 text-gray-500"
                                                }`}>
                                                {isOpen ? <X size={20} /> : <Plus size={20} />}
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-8 pb-8 text-gray-500 font-medium leading-relaxed leading-[1.8] border-l-2 border-[#00D9C3] ml-8 mb-4">
                                                        {faq.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                7. FINAL CONVERSION: THE LEAD ENGINE
            ══════════════════════════════════════════════ */}
            <ConsultationFormSection
                source="linkedin-ads-page"
                title="Ready to Scale Your B2B Pipeline?"
                subtitle="Deploy our surgical LinkedIn targeting system for your brand today. Our experts are standing by."
            />
        </main >
    );
}

const Quote = ({ size, className }: { size: number, className: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.34315 15.3602 2 17.017 2H20.017C21.6739 2 23.017 3.34315 23.017 5V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1 21L1 18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C1.89543 8 1 7.10457 1 6V5C1 3.34315 2.34315 2 4 2H7C8.65685 2 10 3.34315 10 5V15C10 18.3137 7.31371 21 4 21H1Z" />
    </svg>
);

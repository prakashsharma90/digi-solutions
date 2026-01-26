'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
    Check, ArrowRight, Star, BarChart3, Users, Zap, Shield,
    Mail, LayoutTemplate, Globe, MessageSquare, ChevronDown,
    PlayCircle, Code2, Smartphone, Megaphone, Calendar, Settings, Monitor, Rocket, Bot, Send, ChevronLeft, ChevronRight, IndianRupee, HelpCircle, Plus, Minus
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Components ---

const Section = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <section className={cn("py-20 md:py-32", className)}>
        {children}
    </section>
);

const CheckItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3 text-slate-600">
        <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <Check className="w-3 h-3" />
        </div>
        <span className="text-sm font-medium">{text}</span>
    </div>
);

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 group">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
            <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </div>
);

const PricingCard = ({ plan, highlight = false }: { plan: any, highlight?: boolean }) => (
    <div className={cn(
        "p-8 rounded-3xl border flex flex-col h-full transition-all duration-300",
        highlight
            ? "bg-[#0B0F14] border-slate-800 text-white shadow-2xl shadow-orange-500/10 scale-105 relative z-10"
            : "bg-white border-slate-100 text-slate-900 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5"
    )}>
        {highlight && (
            <div className="absolute top-0 right-0 p-4">
                <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
            </div>
        )}
        <div className="mb-8">
            <h3 className={cn("text-lg font-bold mb-2", highlight ? "text-slate-200" : "text-slate-800")}>{plan.name}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">${plan.price}</span>
                <span className={cn("text-sm", highlight ? "text-slate-400" : "text-slate-500")}>/month</span>
            </div>
            <p className={cn("mt-4 text-sm leading-relaxed", highlight ? "text-slate-400" : "text-slate-500")}>{plan.desc}</p>
        </div>
        <div className="space-y-4 mb-8 flex-1">
            {plan.features.map((feat: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                    <Check className={cn("w-4 h-4 shrink-0", highlight ? "text-orange-500" : "text-green-500")} />
                    <span className={cn("text-sm", highlight ? "text-slate-300" : "text-slate-600")}>{feat}</span>
                </div>
            ))}
        </div>
        <Button
            className={cn(
                "w-full h-12 rounded-xl font-bold transition-all",
                highlight
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
            )}
        >
            Get Started
        </Button>
    </div>
);

const FaqItem = ({ q, a, defaultOpen = false }: { q: string, a?: string, defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className={cn(
            "rounded-3xl transition-all duration-300 overflow-hidden",
            isOpen ? "bg-black text-white p-8" : "bg-slate-50 hover:bg-slate-100 p-6 flex items-center justify-between cursor-pointer"
        )} onClick={() => !isOpen && setIsOpen(true)}>

            {isOpen ? (
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-xl leading-snug pr-8">{q}</h3>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                            <Minus size={16} className="text-black" strokeWidth={3} />
                        </div>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        {a}
                    </p>
                </div>
            ) : (
                <>
                    <h3 className="font-bold text-slate-900 text-lg">{q}</h3>
                    <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center shrink-0">
                        <Plus size={16} className="text-slate-400" />
                    </div>
                </>
            )}
        </div>
    );
}

export function EmailMarketingPage() {
    return (
        <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">

            {/* 1. HERO SECTION */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-slate-50/30">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <Container className="relative z-10 text-center max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-slate-100 text-slate-800 text-sm font-semibold mb-8 shadow-sm hover:shadow-md transition-all cursor-default">
                        <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                            <Mail size={12} fill="currentColor" />
                        </div>
                        Email Marketing Services
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-8">
                        Done-For-You Email Campaigns <br />
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white mx-2 align-middle -mt-2 rotate-12 shadow-lg shadow-orange-500/30">
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/hand-holding-heart.png" className="w-6 h-6 invert brightness-0" alt="icon" style={{ filter: 'brightness(0) invert(1)' }} />
                        </span>
                        That Turn Subscribers
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 text-white mx-3 align-middle -mt-2 -rotate-6 shadow-lg shadow-yellow-400/30">
                            <Megaphone className="w-6 h-6 fill-white" />
                        </span>
                        Into Customers
                    </h1>

                    <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Digihub is a performance-driven marketing agency helping brands generate predictable revenue through high-converting email strategies, automation, and lifecycle marketing.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Button size="lg" className="h-14 px-8 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold text-base shadow-xl shadow-orange-500/20 transition-all hover:scale-105">
                            Book a Free Strategy Call
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-base hover:bg-slate-50 transition-all shadow-sm">
                            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center mr-3">
                                <Check size={12} strokeWidth={3} />
                            </div>
                            Request Email Audit
                        </Button>
                    </div>

                    {/* Placeholder for Dashboard UI */}
                    <div className="relative mx-auto max-w-5xl rounded-[2.5rem] p-4 bg-slate-900/5 shadow-2xl">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative bg-white rounded-[2rem] overflow-hidden border border-slate-200/50 shadow-inner">
                            {/* Fake Dashboard UI */}
                            <div className="h-12 border-b border-slate-100 flex items-center px-6 gap-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="ml-4 h-6 w-96 bg-slate-50 rounded-lg" />
                            </div>
                            <div className="p-8 grid grid-cols-12 gap-8 bg-slate-50/50 aspect-[16/9] md:aspect-[21/9]">
                                <div className="col-span-3 space-y-4">
                                    <div className="h-32 bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                                        <div className="h-8 w-8 bg-orange-100 rounded-lg mb-4" />
                                        <div className="h-4 w-24 bg-slate-100 rounded mb-2" />
                                        <div className="h-8 w-16 bg-slate-200 rounded" />
                                    </div>
                                    <div className="h-32 bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                                        <div className="h-8 w-8 bg-blue-100 rounded-lg mb-4" />
                                        <div className="h-4 w-24 bg-slate-100 rounded mb-2" />
                                        <div className="h-8 w-16 bg-slate-200 rounded" />
                                    </div>
                                </div>
                                <div className="col-span-9 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                                    <div className="flex justify-between mb-8">
                                        <div className="h-8 w-48 bg-slate-100 rounded" />
                                        <div className="h-8 w-24 bg-slate-100 rounded" />
                                    </div>
                                    <div className="flex items-end gap-4 h-64">
                                        {[40, 60, 45, 80, 55, 70, 90, 65, 85].map((h, i) => (
                                            <div key={i} className="flex-1 bg-orange-100 rounded-t-lg relative group overflow-hidden">
                                                <div
                                                    className="absolute bottom-0 w-full bg-orange-500 rounded-t-lg transition-all duration-1000 group-hover:bg-orange-600"
                                                    style={{ height: `${h}%` }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 2. SOCIAL PROOF */}
            <section className="py-20 border-b border-slate-100 bg-white">
                <Container className="text-center">
                    <h3 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Trusted by 80+ Growing Brands</h3>
                    <p className="text-slate-500 mb-16 max-w-2xl mx-auto text-base leading-relaxed">
                        From startups to enterprises — businesses choose Digihub to design, manage, and scale email marketing that actually delivers ROI.
                    </p>

                    <div className="flex flex-col gap-12 items-center opacity-90">
                        {/* Row 1 */}
                        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
                            {/* Ephemeral - Chain Link */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">Ephemeral</span>
                            </div>

                            {/* Wildcrafted - Abstract W/Leaf */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700">
                                    <path d="M11.5 2C11.5 2 7 10 7 10L2 10L9 22H14L21 10L16 10C16 10 11.5 2 11.5 2Z" />
                                </svg>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">Wildcrafted</span>
                            </div>

                            {/* Codecraft_ - Connected Squares */}
                            <div className="flex items-center gap-1 group cursor-default">
                                <div className="relative w-8 h-8">
                                    <div className="absolute top-0 left-0 w-4 h-4 bg-slate-800 rounded-sm" />
                                    <div className="absolute top-3 left-3 w-4 h-4 bg-slate-800 rounded-sm" />
                                </div>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">Codecraft_</span>
                            </div>

                            {/* Convergence - 8pt Star/Spark */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-800">
                                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                                </svg>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">Convergence</span>
                            </div>

                            {/* ImgCompress - 4pt Star */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700">
                                    <path d="M12 2C12 2 14 9 14 9C14 9 21 11 21 11C21 11 14 13 14 13C14 13 12 20 12 20C12 20 10 13 10 13C10 13 3 11 3 11C3 11 10 9 10 9C10 9 12 2 12 2Z" />
                                </svg>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">ImgCompress</span>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
                            {/* Epicurious - Stacked S-shape */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700">
                                    <path d="M4 6h16v3H7c-1.1 0-2 .9-2 2s.9 2 2 2h13v3H4v-3h13c1.1 0 2-.9 2-2s-.9-2-2-2H4V6z" />
                                </svg>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">Epicurious</span>
                            </div>

                            {/* Watchtower - Spiral/Eye */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-800">
                                    <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z" />
                                    <path d="M12 8a4 4 0 1 0 4 4" />
                                </svg>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">Watchtower</span>
                            </div>

                            {/* Renaissance - R Logo */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-800">
                                    <path d="M4 22V2h7a6 6 0 0 1 0 12H4" />
                                    <path d="M10 14l5 8" />
                                </svg>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">Renaissance</span>
                            </div>

                            {/* ContrastAI - Split Circle */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-800" />
                                </div>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">ContrastAI</span>
                            </div>

                            {/* Nietzsche - Burst */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-800">
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                                </svg>
                                <span className="text-2xl font-bold text-slate-700 tracking-tight">Nietzsche</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 3. HOW IT WORKS GRID */}
            <Section className="bg-white">
                <Container>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-slate-800 text-xs font-bold mb-6 border border-orange-100">
                                <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-white">
                                    <Check size={10} strokeWidth={3} />
                                </div>
                                End-to-End Email Growth System
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                                We don’t sell tools. <br />
                                We build revenue engines.
                            </h2>
                            <p className="text-slate-500 text-lg max-w-lg leading-relaxed">
                                Our team handles everything: Strategy & funnel mapping, Copywriting & design, Automation flows, and ESP setup.
                            </p>
                        </div>
                        <div className="mb-4">
                            <Button className="rounded-full bg-black text-white px-8 h-12 hover:bg-slate-800 shadow-lg font-semibold">
                                Get Started
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="p-10 rounded-[2.5rem] bg-slate-50/80 hover:bg-slate-50 transition-colors duration-300">
                            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-orange-500/20">
                                <BarChart3 className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Performance Tracking & Optimization</h3>
                            <p className="text-slate-500 leading-relaxed mb-4">We monitor open rates, CTRs, revenue per subscriber, and deliverability health.</p>
                            <p className="text-slate-500 leading-relaxed">…and continuously optimize campaigns using A/B testing.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-10 rounded-[2.5rem] bg-slate-50/80 hover:bg-slate-50 transition-colors duration-300">
                            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-orange-500/20">
                                <LayoutTemplate className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">High-Converting Copy & Design</h3>
                            <p className="text-slate-500 leading-relaxed mb-2">Our copywriters and designers craft emails that get opened, read, and clicked.</p>
                            <p className="text-slate-500 leading-relaxed">Always fully aligned with your brand voice.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-10 rounded-[2.5rem] bg-slate-50/80 hover:bg-slate-50 transition-colors duration-300">
                            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-orange-500/20">
                                <Settings className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Automation & Lifecycle Campaigns</h3>
                            <p className="text-slate-500 leading-relaxed mb-4">
                                We build comprehensive flows:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Welcome sequences", "Abandoned cart flows", "Lead-nurturing drips", "Re-engagement series"].map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-white border border-slate-100 text-xs font-semibold text-slate-600">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="p-10 rounded-[2.5rem] bg-slate-50/80 hover:bg-slate-50 transition-colors duration-300">
                            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-orange-500/20">
                                <Globe className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Global Sending, Inbox-Ready</h3>
                            <p className="text-slate-500 leading-relaxed mb-2">We optimize technical setup, warming, and authentication.</p>
                            <p className="text-slate-500 leading-relaxed">SPF, DKIM, DMARC, and list hygiene to maximize inbox placement worldwide.</p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4. OUR PRODUCTS FEATURES */}
            <Section className="bg-white">
                <Container>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-slate-800 text-xs font-bold mb-6 border border-orange-100">
                            <Monitor size={12} className="text-orange-600" />
                            Features
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">What’s Included in Our Service</h2>
                        <p className="text-slate-500">Everything you need to scale your email revenue.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* FEATURE 1: Complete Management */}
                        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Complete Email Marketing Management</h3>
                            <ul className="space-y-4">
                                {["Monthly campaign planning", "Email design & copywriting", "ESP management", "Automation workflows", "CRM syncing", "Segmentation strategy", "A/B testing", "Reporting dashboards", "Revenue attribution"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-orange-500 shrink-0">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* FEATURE 2: Security */}
                        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 flex flex-col">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Enterprise-Grade Security & Compliance</h3>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                We follow industry best practices for GDPR-aligned processes, data protection, and secure access controls.
                            </p>
                            <div className="bg-white rounded-2xl p-6 border border-slate-100 flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 mx-auto">
                                        <Shield size={32} />
                                    </div>
                                    <div className="font-bold text-slate-900">100% Secure</div>
                                    <div className="text-xs text-slate-400">GDPR & CCPA Ready</div>
                                </div>
                            </div>
                        </div>

                        {/* FEATURE 3: Strategies (Col 1) */}
                        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Email Strategies We Execute</h3>
                            <ul className="space-y-4">
                                {["Ecommerce Revenue Flows", "SaaS User Onboarding", "Lead Nurture Funnels", "Newsletter Growth Systems"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-slate-600">
                                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                            <Zap size={16} fill="currentColor" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* FEATURE 4: Strategies (Col 2) */}
                        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">More Strategies</h3>
                            <ul className="space-y-4">
                                {["Webinar Promotions", "Membership Retention", "Product Launch Campaigns", "Event Marketing Emails"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-slate-600">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                            <LayoutTemplate size={16} />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 5. TESTIMONIALS */}
            <Section className="bg-white">
                <Container>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-slate-800 text-xs font-bold mb-6 border border-orange-100">
                                <MessageSquare size={12} className="text-orange-600" />
                                Client Results
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                                Real Results from <br /> Real Brands
                            </h2>
                            <p className="text-slate-500 text-lg max-w-xl">
                                See how we help businesses grow faster and connect better with their audience.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-orange-500 hover:text-orange-500 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-orange-500 hover:text-orange-500 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Case Study Card */}
                        <div className="relative rounded-[2.5rem] overflow-hidden min-h-[500px] group bg-slate-900">
                            <div className="absolute inset-0 opacity-70 group-hover:opacity-60 transition-opacity">
                                <img
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                                    className="w-full h-full object-cover grayscale"
                                    alt="Case Study"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            <div className="relative z-10 p-10 h-full flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 opacity-80">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <div className="text-xs font-bold tracking-widest uppercase flex items-center gap-1 cursor-pointer hover:text-orange-400 transition-colors">
                                        Read The Case Study <ChevronRight size={12} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold mb-4 leading-tight">
                                        “Digihub helped us scale email revenue by <br /> 47% in 90 days.”
                                    </h3>
                                    <p className="text-white/60 text-sm">CEO, Scaling Brand</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Reviews */}
                        <div className="flex flex-col gap-6">
                            {/* Review 1 */}
                            <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Max" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-lg">Sarah Jenkins</div>
                                        <div className="text-slate-500 text-sm">Marketing Director</div>
                                    </div>
                                </div>
                                <div className="flex gap-1 text-orange-500 mb-4">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    “Our deliverability issues vanished after onboarding. The team is incredibly technical and strategic.”
                                </p>
                            </div>

                            {/* Review 2 */}
                            <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                                        <img src="https://i.pravatar.cc/150?u=a04258114e29026302d" alt="Jake" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-lg">Mike Ross</div>
                                        <div className="text-slate-500 text-sm">Founder, EcomStore</div>
                                    </div>
                                </div>
                                <div className="flex gap-1 text-orange-500 mb-4">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    “Open rates increased dramatically within weeks. Best investment we've made this year.”
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 6. PRICING */}
            <Section className="bg-white">
                <Container>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-slate-800 text-xs font-bold mb-6 border border-orange-100">
                            <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-white font-serif italic text-[10px]">$</div>
                            Service Packages
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            Email Marketing Pricing
                        </h2>
                        <p className="text-slate-500 text-lg">Monthly Retainers Based on Growth Stage</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Starter Plan */}
                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Starter</h3>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                For small teams testing email marketing seriously.
                            </p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <IndianRupee size={32} className="text-slate-900" strokeWidth={3} />
                                <span className="text-5xl font-bold text-slate-900 tracking-tight">15,000</span>
                                <span className="text-slate-400 text-lg">/Month</span>
                            </div>

                            <Button className="w-full h-12 rounded-full bg-black text-white font-bold mb-10 hover:bg-slate-800">
                                Start a Project
                            </Button>

                            <ul className="space-y-4">
                                {["Strategy setup", "2 campaigns / month", "Basic automations", "Reporting", "Email support"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                                        <Check size={16} className="text-slate-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Growth Plan */}
                        <div className="bg-black rounded-[2.5rem] p-10 border border-black text-white relative shadow-2xl shadow-orange-500/10 transform md:scale-105 z-10">
                            <h3 className="text-2xl font-bold text-white mb-4">Growth</h3>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                For scaling brands.
                            </p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <IndianRupee size={32} className="text-white" strokeWidth={3} />
                                <span className="text-5xl font-bold tracking-tight">35,000</span>
                                <span className="text-slate-400 text-lg">/Month</span>
                            </div>

                            <Button className="w-full h-12 rounded-full bg-orange-600 text-white font-bold mb-10 hover:bg-orange-500 shadow-lg shadow-orange-500/25 border-0">
                                Start a Project
                            </Button>

                            <ul className="space-y-4">
                                {["Weekly campaigns", "Advanced automations", "CRO copywriting", "Deliverability optimization", "A/B testing", "Monthly performance calls"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-white">
                                        <div className="w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center text-white shrink-0"><Check size={10} strokeWidth={4} /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Enterprise</h3>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                For high-volume senders & complex funnels.
                            </p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold text-slate-900 tracking-tight">Custom</span>
                            </div>

                            <Button className="w-full h-12 rounded-full bg-black text-white font-bold mb-10 hover:bg-slate-800">
                                Start a Project
                            </Button>

                            <ul className="space-y-4">
                                {["Dedicated strategist", "Full lifecycle marketing", "ESP migrations", "Compliance setup", "Revenue forecasting", "Executive reporting"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                                        <Check size={16} className="text-slate-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 7. FAQ */}
            <Section className="bg-white">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 align-top">
                        {/* Left Column */}
                        <div className="md:col-span-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-slate-800 text-xs font-bold mb-6 border border-orange-100">
                                <HelpCircle size={12} className="text-orange-600" />
                                FAQ
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tiht">
                                Frequent Questions. <br /> Clear Answers.
                            </h2>
                            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                                Everything you need to know about our services and process.
                            </p>
                            <Button className="rounded-full bg-black text-white px-8 h-12 hover:bg-slate-800 shadow-lg font-semibold">
                                Request a Free Audit
                            </Button>
                        </div>

                        {/* Right Column */}
                        <div className="md:col-span-7 space-y-4">
                            <FaqItem
                                q="Do you work with our existing ESP?"
                                a="Yes — HubSpot, Klaviyo, Mailchimp, Zoho, SendGrid, and more."
                                defaultOpen={true}
                            />
                            <FaqItem q="Do you offer a free audit?" a="Yes. We analyze your current email setup and growth opportunities." />
                            <FaqItem q="Who creates the emails?" a="Digihub handles copy, design, QA, deployment, and optimization." />
                            <FaqItem q="Is there a minimum contract period?" a="Typically 3 months to see meaningful results." />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 8. CTA / Global Stats */}
            <Section className="bg-[#0B0F14] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-[0.03] bg-center bg-no-repeat bg-cover" />
                <Container className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block bg-orange-500/20 text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-orange-500/30">
                                GLOBAL REACH
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Global Brands. <br /> <span className="text-orange-500">Proven Systems.</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 max-w-md">
                                Join thousands of companies using our platform to drive growth and maintain brand consistency across the globe.
                            </p>

                            <div className="flex gap-12">
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">1500+</div>
                                    <div className="text-slate-500 text-sm">Clients</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">1000+</div>
                                    <div className="text-slate-500 text-sm">Integrations</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">100+</div>
                                    <div className="text-slate-500 text-sm">Countries</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Map Dots Mockup */}
                            <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
                                <Globe className="w-full h-full text-slate-700 opacity-20" />
                                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-orange-500 rounded-full animate-ping" />
                                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-orange-500 rounded-full" />

                                <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-orange-500 rounded-full animate-ping delay-700" />
                                <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-orange-500 rounded-full" />

                                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-orange-500 rounded-full animate-ping delay-300" />
                                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-orange-500 rounded-full" />
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 9. FINAL CTA */}
            <div className="bg-slate-50 py-32 rounded-b-[3rem]">
                <Container className="text-center max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight">
                        Ready to Turn Email Into Your <br /> Top Revenue Channel?
                    </h2>
                    <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
                        Book a free consultation with Digihub’s email marketing experts today.
                    </p>
                    <div className="flex justify-center">
                        <Button className="h-16 px-10 rounded-full bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/30 flex items-center justify-center transition-all hover:scale-105 group text-lg font-bold">
                            Schedule Free Strategy Call <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </Container>
            </div>
        </div>
    );
}

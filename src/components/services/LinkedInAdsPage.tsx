"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Linkedin,
    Target,
    Users,
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    BarChart3,
    MessageSquare,
    Globe,
    Briefcase,
    Building2,
    PieChart,
    Plus,
    X
} from "lucide-react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";
import Image from "next/image";

export function LinkedInAdsPage({ plans }: { plans?: any[] }) {
    const [activeFaq, setActiveFaq] = useState<number | null>(0);

    const displayPlans = (plans && plans.length > 0) ? plans : [
        {
            title: "Starter Growth",
            price: "19,999",
            desc: "Perfect for businesses starting their LinkedIn journey.",
            features: [
                "Audience Research & Strategy",
                "2 Campaign Setups",
                "Lead Gen Form Integration",
                "Monthly Performance Report",
                "Basic Creative Support"
            ]
        },
        {
            title: "Professional Scale",
            price: "44,999",
            desc: "For aggressive growth and rapid market expansion.",
            is_popular: true,
            features: [
                "Everything in Starter",
                "Account-Based Marketing (ABM)",
                "Retargeting Campaigns",
                "InMail Strategy",
                "Weekly Optimization Calls",
                "Advanced CRM Integration"
            ]
        },
        {
            title: "Enterprise Suite",
            price: "Custom",
            desc: "Full-service partnership for market leaders.",
            features: [
                "Dedicated Account Manager",
                "Full-Funnel Management",
                "Executive Personal Branding Ads",
                "Custom API Reporting",
                "Global Market Strategy",
                "24/7 Priority Support"
            ]
        }
    ];

    return (
        <main className="bg-[#0B0F14] text-white font-sans selection:bg-[#00D9C3]/20">
            {/* ══════════════════════════════════════════════
                1. HERO: HUMAN CONNECTION
            ══════════════════════════════════════════════ */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#0B0F14]">
                {/* Full Width Background Image with Overlay */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
                        alt="Executive Meeting"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-[#0B0F14]/80 to-transparent" />
                </div>

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#00D9C3] font-semibold text-sm mb-8">
                                <Linkedin size={16} />
                                <span>Premier B2B Growth Partner</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-8">
                                Turn Connections into <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9C3] to-[#00F5E0]">Contracts.</span>
                            </h1>

                            <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl font-medium">
                                We specialize in high-ticket B2B lead generation. No vanity metrics—just qualified meetings with the decision-makers who actually sign the checks.
                            </p>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button className="px-10 py-5 bg-[#00D9C3] text-black font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(0,217,195,0.3)] hover:bg-[#00F5E0] hover:scale-105 transition-all duration-300">
                                        Launch Your Strategy
                                    </button>
                                </Link>

                                <div className="hidden sm:flex items-center gap-4 ml-6 px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0B0F14] overflow-hidden bg-white/10">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="user" className="w-full h-full object-cover opacity-80" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-white text-xs font-medium">
                                        <div className="font-bold text-lg text-[#00D9C3]">500+</div>
                                        <div className="text-gray-400">Deals Closed</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ══════════════════════════════════════════════
                2. WHY LINKEDIN (Human-Centric Approach)
            ══════════════════════════════════════════════ */}
            <Section className="py-24 bg-[#0B0F14]">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl font-bold text-white mb-6">Real Professionals. Real Business.</h2>
                        <p className="text-lg text-gray-400">
                            LinkedIn isn't just another social network. It's the world's largest professional gathering.
                            We help you walk into that room with confidence and start the right conversations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: Target,
                                title: "Precision, Not Noise",
                                desc: "Don't waste budget on 'broad' audiences. Target by Job Title, Company Size, Industry, and even Seniority level."
                            },
                            {
                                icon: MessageSquare,
                                title: "Meaningful Conversations",
                                desc: "Ads on LinkedIn garner 2x the trust of other platforms. We create messaging that respects the professional context."
                            },
                            {
                                icon: Briefcase,
                                title: "High-Value Deals",
                                desc: "The average B2B deal size from LinkedIn is significantly higher. Focus on quality leads that actually convert to revenue."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00D9C3]/50 hover:bg-white/[0.05] transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-[#00D9C3] mb-6 group-hover:scale-110 group-hover:bg-[#00D9C3] group-hover:text-black transition-all">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                3. OUR PROCESS (Clean & Clear)
            ══════════════════════════════════════════════ */}
            <Section id="process" className="py-24 bg-[#080A0D] border-y border-white/5">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-bold mb-6 leading-tight text-white">
                                A Simple Path to <br />
                                <span className="text-[#00D9C3]">B2B Success</span>
                            </h2>
                            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                                We've stripped away the complexity. Our 4-step framework ensures your budget is spent efficiently and your brand is represented professionally.
                            </p>

                            <Link href="/contact">
                                <button className="flex items-center gap-2 font-bold text-[#00D9C3] hover:text-white transition-colors group">
                                    Schedule a Strategy Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>

                        <div className="lg:w-1/2 grid gap-6">
                            {[
                                { step: "01", title: "Discovery & Audit", desc: "We study your ideal customer profile (ICP) and audit past performance." },
                                { step: "02", title: "Strategy & Creative", desc: "We distinguish your brand with professional copy and design assets." },
                                { step: "03", title: "Targeted Launch", desc: "Campaigns go live, targeting only those who match your buyer persona." },
                                { step: "04", title: "Optimize & Scale", desc: "We analyze data weekly to cut waste and double down on what wins." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-6 p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00D9C3]/30 hover:bg-white/[0.04] transition-colors"
                                >
                                    <span className="text-2xl font-bold text-[#00D9C3] font-mono">{item.step}</span>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                4. CAMPAIGN TYPES (Visual Cards)
            ══════════════════════════════════════════════ */}
            <Section className="py-24 bg-[#0B0F14]">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Tailored Campaigns for Every Goal</h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">Whether you need brand awareness or direct calendar bookings, we have a strategy for you.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Sponsored Content", icon: Globe, desc: "Native feed ads that educate and engage your audience." },
                            { title: "InMail Campaigns", icon: MessageSquare, desc: "Direct, personalized messages sent to key decision makers." },
                            { title: "Lead Gen Forms", icon: CheckCircle2, desc: "Collect leads instantly without users ever leaving LinkedIn." },
                            { title: "Dynamic Ads", icon: Users, desc: "Personalized ads featuring your prospect's profile data." },
                        ].map((camp, i) => (
                            <div key={i} className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-[#00D9C3]/50 transition-all duration-300 text-center hover:-translate-y-1">
                                <div className="w-12 h-12 bg-[#00D9C3]/10 text-[#00D9C3] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <camp.icon size={24} />
                                </div>
                                <h3 className="font-bold text-white mb-3">{camp.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{camp.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                5. PRICING (Clean & Transparent)
            ══════════════════════════════════════════════ */}
            <Section className="py-24 bg-[#080A0D] border-t border-white/5">
                <Container>
                    <div className="text-center mb-16">
                        <span className="text-[#00D9C3] font-bold tracking-wider uppercase text-sm">Invest in Growth</span>
                        <h2 className="text-4xl font-bold text-white mt-2">Transparent Pricing Plans</h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                        {displayPlans.map((plan, i) => (
                            <div
                                key={i}
                                className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${plan.is_popular
                                    ? "bg-[#0C121A] text-white border-[#00D9C3]/40 shadow-[0_0_40px_rgba(0,217,195,0.1)] scale-105 z-10"
                                    : "bg-white/[0.02] text-white border-white/5 hover:bg-white/[0.04]"
                                    }`}
                            >
                                {plan.is_popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00D9C3] text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price === "Custom" ? "Custom" : `₹${plan.price}`}</span>
                                    {plan.price !== "Custom" && <span className="text-sm font-medium text-gray-500">/month</span>}
                                </div>
                                <p className="text-sm mb-8 leading-relaxed text-gray-400">
                                    {plan.desc}
                                </p>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${plan.is_popular ? "text-[#00D9C3]" : "text-gray-500"}`} />
                                            <span className="text-sm font-medium text-gray-300">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact" className="mt-auto">
                                    <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.is_popular
                                        ? "bg-[#00D9C3] hover:bg-[#00F5E0] text-black"
                                        : "bg-white/10 hover:bg-white/20 text-white"
                                        }`}>
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                6. FAQ (Home Page Style)
            ══════════════════════════════════════════════ */}
            <Section className="py-24 bg-gradient-to-b from-[#0B0F14] to-black relative overflow-hidden border-t border-white/5">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                        {/* ── Left Column ── */}
                        <div className="lg:sticky lg:top-32">
                            {/* Label */}
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-2 h-2 rounded-full bg-[#00D9C3]" />
                                <span className="text-sm font-semibold text-[#00D9C3]">
                                    FAQs
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-4xl md:text-5xl font-bold font-poppins leading-[1.1] mb-12 text-white">
                                Frequently Asked{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9C3] to-[#00F5E0]">
                                    Questions
                                </span>
                            </h2>

                            {/* Book a Call Card */}
                            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D9C3]/30 to-[#00F5E0]/20 border-2 border-[#00D9C3]/30 flex items-center justify-center mb-5 overflow-hidden text-white">
                                    <MessageSquare size={24} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Still have questions?
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                    Can't find the answer you're looking for? Book a 15-minute call with our LinkedIn experts.
                                </p>

                                <Link href="/contact">
                                    <button className="w-full py-4 bg-[#00D9C3] hover:bg-[#00D9C3]/90 text-black font-bold text-sm shadow-[0_0_30px_-5px_#00D9C3] transition-all rounded-lg">
                                        Book a Free Strategy Call
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* ── Right Column: Accordion ── */}
                        <div>
                            <div className="space-y-4">
                                {[
                                    { q: "What is the minimum budget for LinkedIn Ads?", a: "To see meaningful results and gather enough data for optimization, we typically recommend a minimum ad spend of ₹50,000 per month, excluding our management fee." },
                                    { q: "How is LinkedIn better than Facebook Ads?", a: "LinkedIn targeting is professional-grade. We target by job title, company size, and industry. While leads might cost more than Facebook, the conversion rate to closed deals is often significantly higher for B2B." },
                                    { q: "Do you create the ad creatives?", a: "Yes! Our team includes copywriters and designers who craft professional ad creatives that align with your brand voice." },
                                    { q: "How long does it take to see results?", a: "We usually see initial lead flow within the first 2-3 weeks. However, campaign maturity and peak ROI typically happen around month 3 as we refine the audience data." }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-xl border transition-all duration-300 ${activeFaq === i
                                            ? "bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-[#00D9C3]/40"
                                            : "bg-white/[0.02] border-white/[0.06] hover:border-white/15"
                                            }`}
                                    >
                                        <button
                                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                            className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer"
                                        >
                                            <span
                                                className={`text-base md:text-lg font-semibold pr-4 transition-colors ${activeFaq === i
                                                    ? "text-white"
                                                    : "text-gray-300"
                                                    }`}
                                            >
                                                {item.q}
                                            </span>
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === i
                                                    ? "bg-[#00D9C3]/20 text-[#00D9C3] rotate-45"
                                                    : "bg-white/[0.06] text-gray-500"
                                                    }`}
                                            >
                                                <Plus className={`w-4 h-4 transition-transform duration-300 ${activeFaq === i ? "rotate-45" : ""}`} />
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {activeFaq === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 mt-0 pt-4">
                                                        {item.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ══════════════════════════════════════════════
                7. FINAL CTA
            ══════════════════════════════════════════════ */}
            <ConsultationFormSection
                source="linkedin-ads-page"
                title="Ready to Scale Your B2B Sales?"
                subtitle="Book a free 30-minute discovery call. We'll audit your current strategy and show you exactly how we can help."
            />
        </main>
    );
}

"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Heart, XCircle, Share2, MessageCircle, Users, Zap, TrendingUp, Instagram, Linkedin, Twitter, Youtube, Video, Image, Type, Hash, Play, UserPlus, BarChart3 } from "lucide-react";
import Link from "next/link";

import { ServicePricing } from "@/components/sections/ServicePricing";

export function SocialMediaMarketingPage({ plans }: { plans?: any[] }) {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden selection:bg-primary/30">

            {/* 1. CINEMATIC HERO SECTION */}
            <Section className="pt-32 pb-24 relative">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                </div>

                <Container className="relative z-10 py-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 ring-1 ring-white/20">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-300">Stop shouting into the void</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            Posting Isn't Marketing.<br />
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-teal-400">
                                Building a Brand Is.
                                {/* Underline Glow */}
                                <div className="absolute -bottom-2 left-0 w-full h-[6px] bg-gradient-to-r from-primary to-teal-400 blur-sm opacity-50 rounded-full" />
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Stop treating social media like a bulletin board. Start building a loyal community that actually buys from you.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/contact" className="group">
                                <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-[0_0_40px_-5px_var(--color-primary)] hover:shadow-[0_0_60px_-5px_var(--color-primary)] transition-all duration-500 bg-primary text-black hover:bg-cyan-400 border-none hover:scale-105">
                                    <Instagram className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Transform My Brand
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 2. THE DIAGNOSIS (Why Most Fail) */}
            <Section className="py-24 bg-white/[0.02] border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Why Your Posts Get <span className="text-red-400">Zero</span> Engagement
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Most businesses mistake "activity" for "marketing." Posting daily meaningless content is the fastest way to kill your brand.
                            </p>

                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <XCircle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">The "Bulletin Board" Syndrome</h4>
                                        <p className="text-gray-400">
                                            Treating your feed like an ad board ("Buy this!", "Offer!") makes people unfollow. People come for value, not commercials.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Diagnosis Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { title: "Vanity Metrics Trap", desc: "Chasing likes instead of conversations. Likes don't pay bills.", icon: Heart },
                                { title: "Inconsistent Voice", desc: "Looking professional one day, amateur the next. Confuses customers.", icon: MessageCircle },
                                { title: "No Conversion Path", desc: "Engagement goes nowhere. No funnel to turn followers into leads.", icon: TrendingUp },
                            ].map((item, i) => (
                                <div key={i} className="group flex items-center gap-6 p-6 rounded-2xl bg-[#0B0F14] border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg">
                                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                                        <item.icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 2.5. OUR PLAYGROUND (Platforms) - NEW SECTION */}
            <Section className="py-24 relative">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Where We Build Your Empire</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We don't just crosspost. We tailor your message to the psychology of each platform.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "Instagram",
                                icon: Instagram,
                                goal: "Visual Authority",
                                strategy: "High-aesthetics, Reels for reach, Stories for depth.",
                                color: "text-pink-500",
                                bg: "group-hover:bg-pink-500/10",
                                border: "group-hover:border-pink-500/50"
                            },
                            {
                                name: "LinkedIn",
                                icon: Linkedin,
                                goal: "B2B Trust",
                                strategy: "Thought leadership, founder stories, company culture.",
                                color: "text-blue-500",
                                bg: "group-hover:bg-blue-500/10",
                                border: "group-hover:border-blue-500/50"
                            },
                            {
                                name: "YouTube",
                                icon: Youtube,
                                goal: "Deep Connection",
                                strategy: "Long-form education, vlogs, search-optimized video.",
                                color: "text-red-500",
                                bg: "group-hover:bg-red-500/10",
                                border: "group-hover:border-red-500/50"
                            },
                            {
                                name: "X (Twitter)",
                                icon: Twitter,
                                goal: "Real-time Pulse",
                                strategy: "Trends, rapid engagement, direct conversations.",
                                color: "text-white",
                                bg: "group-hover:bg-white/10",
                                border: "group-hover:border-white/50"
                            }
                        ].map((platform, i) => (
                            <div key={i} className={`group p-6 rounded-2xl bg-[#0B0F14] border border-white/10 transition-all duration-300 ${platform.border}`}>
                                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 transition-colors ${platform.bg}`}>
                                    <platform.icon className={`w-6 h-6 transition-colors ${platform.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{platform.goal}</div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {platform.strategy}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 3. OUR STRATEGY (3 Pillars) */}
            <Section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14] via-cyan-900/10 to-[#0B0F14]" />
                <Container className="relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            How We Engineer <span className="text-primary">Cult Followings</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We don't just "post." We build a brand ecosystem using a 3-pillar framework.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Visual Identity",
                                desc: "We craft a premium aesthetic that makes your brand instantly recognizable and trustworthy.",
                                icon: Zap,
                                color: "from-primary/20 to-cyan-500/5",
                                accent: "text-primary"
                            },
                            {
                                step: "02",
                                title: "Value-First Content",
                                desc: "Content that educates, entertains, or inspires. We give value before we ask for a sale.",
                                icon: Share2,
                                color: "from-cyan-500/20 to-teal-500/5",
                                accent: "text-cyan-400"
                            },
                            {
                                step: "03",
                                title: "Community Growth",
                                desc: "Active engagement strategies to turn passive viewers into raving fans.",
                                icon: Users,
                                color: "from-teal-500/20 to-emerald-500/5",
                                accent: "text-teal-400"
                            }
                        ].map((card, i) => (
                            <div key={i} className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all duration-500 overflow-hidden">
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className={`text-6xl font-bold opacity-10 mb-4 ${card.accent}`}>{card.step}</div>
                                    <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                        <card.icon className={`w-7 h-7 ${card.accent}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 3.5. CONTENT ARSENAL (Deliverables) - NEW SECTION */}
            <Section className="py-24 bg-white/[0.02] border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                                The Content Engine
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                What We Actually <br /><span className="text-primary">Create For You</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8">
                                A mix of viral, educational, and sales assets. We handle the entire production pipeline.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: "Trending Reels / Shorts", desc: "High-energy vertical video to hijack attention & drive reach.", icon: Play },
                                    { title: "Carousel Decks", desc: "Swipeable value-bombs that get saved and shared.", icon: Image },
                                    { title: "Story Sequences", desc: "Authentic, raw behind-the-scenes to nurture super-fans.", icon: UserPlus },
                                    { title: "Performance Reports", desc: "Monthly deep-dives into what's working (and what's not).", icon: BarChart3 }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <item.icon className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Representation */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-20" />
                            <div className="relative grid grid-cols-2 gap-4">
                                <div className="space-y-4 mt-8">
                                    <div className="p-4 rounded-xl bg-[#0B0F14] border border-white/10 opacity-60 scale-95">
                                        <div className="h-32 bg-white/5 rounded-lg mb-3" />
                                        <div className="h-2 w-2/3 bg-white/10 rounded mb-2" />
                                        <div className="h-2 w-1/2 bg-white/10 rounded" />
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#1A1F26] border border-primary/30 shadow-xl shadow-primary/10">
                                        <div className="flex items-center justify-center h-40 bg-gradient-to-br from-gray-800 to-black rounded-lg mb-3 overflow-hidden relative">
                                            <Play className="w-10 h-10 text-white fill-white/20" />
                                            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/50 text-[10px] rounded text-white">0:59</div>
                                        </div>
                                        <div className="h-3 w-3/4 bg-white/20 rounded mb-2" />
                                        <div className="flex gap-2">
                                            <div className="h-2 w-1/3 bg-primary/40 rounded" />
                                            <div className="h-2 w-1/4 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-[#1A1F26] border border-white/10">
                                        <div className="h-32 bg-gradient-to-br from-cyan-900/20 to-teal-900/20 rounded-lg mb-3 border border-white/5" />
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-white/10 rounded" />
                                            <div className="h-2 w-5/6 bg-white/10 rounded" />
                                            <div className="h-2 w-4/6 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#0B0F14] border border-white/10 opacity-60 scale-95">
                                        <div className="h-24 bg-white/5 rounded-lg mb-3" />
                                        <div className="h-2 w-1/2 bg-white/10 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4. THE ROADMAP */}
            <Section className="py-24 bg-white/[0.02]">
                <Container className="max-w-4xl">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            The Brand Building Journey
                        </h2>
                        <p className="text-gray-400">
                            Building a brand takes time. Here is the blueprint.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-cyan-500 to-transparent opacity-30" />

                        <div className="space-y-16">
                            {[
                                {
                                    month: "Month 1",
                                    title: "Identity & Foundation",
                                    items: ["Brand Voice & Tone Guide", "Visual Style Audit", "Profile Optimization"],
                                    icon: Zap
                                },
                                {
                                    month: "Month 2",
                                    title: "Content Engine",
                                    items: ["Content Calendar Setup", "Template Creation", "First 12 High-Value Posts"],
                                    icon: Share2
                                },
                                {
                                    month: "Month 3-4",
                                    title: "Engagement & Growth",
                                    items: ["Community Engagement Protocol", "Hashtag Strategy", "Collaborations"],
                                    icon: Users
                                },
                                {
                                    month: "Month 5+",
                                    title: "Conversion & Scale",
                                    items: ["Lead Magnet Promotion", "Viral Campaigns", "Sales Funnel Integration"],
                                    icon: TrendingUp
                                }
                            ].map((phase, i) => (
                                <div key={i} className="relative flex gap-8 items-start group">
                                    {/* Node */}
                                    <div className="z-10 w-14 h-14 rounded-full bg-[#0B0F14] border-2 border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:shadow-[0_0_20px_var(--color-primary)] transition-all duration-300">
                                        <phase.icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                                {phase.month}
                                            </span>
                                        </div>
                                        <ul className="grid sm:grid-cols-3 gap-4">
                                            {phase.items.map((item, j) => (
                                                <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 5. REALITY CHECK */}
            <Section className="py-24">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Is This For You?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We build premium brands. We don't sell instant viral miracles.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/20 backdrop-blur-sm shadow-lg shadow-green-900/10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-green-500/20">
                                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Perfect Fit For</h3>
                            </div>
                            <ul className="space-y-4">
                                {["Brands wanting a premium look", "Businesses focused on long-term loyalty", "Ready to provide value, not just ads", "Wants to build a real community"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 backdrop-blur-sm shadow-lg shadow-red-900/10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-red-500/20">
                                    <XCircle className="w-6 h-6 text-red-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Not a Fit For</h3>
                            </div>
                            <ul className="space-y-4">
                                {["Needs 10,000 followers overnight", "Buying bot likes/followers", "Wanting just 'one viral video'", "Unwilling to engage with comments"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 6. PRICING PLANS */}
            <ServicePricing serviceName="Social Media Marketing" plans={plans || []} />

            {/* 7. FINAL CTA */}
            <Section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-900/5" />
                <Container className="relative text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Build a Brand, Not Just a Feed?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Stop being ignored. Start becoming unforgettable.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-12 text-lg rounded-full bg-white text-black hover:bg-gray-100 border-none">
                            Book Free Brand Audit <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </Container>
            </Section>

        </main>
    );
}

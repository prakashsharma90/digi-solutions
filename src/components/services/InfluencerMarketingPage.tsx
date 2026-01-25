"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
    Users, Verified, TrendingUp, DollarSign,
    ArrowRight, MessageCircle, BarChart3,
    Globe, Zap, Megaphone, Smartphone, Star
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function InfluencerMarketingPage() {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden selection:bg-purple-500/30 font-sans">

            {/* 1. HERO SECTION: "Social Currency" */}
            <Section className="pt-32 pb-20 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
                </div>

                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 ring-1 ring-white/20">
                                <Users className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium text-gray-300">Access 500+ Vetted Creators</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                                Turn "Views"<br />
                                Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-primary">Trust.</span>
                            </h1>

                            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                People don't trust ads. They trust people. We build campaigns with creators that your customers actually listen to.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                                <Link href="/contact" className="group">
                                    <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_-10px_rgba(168,85,247,0.6)] transition-all duration-500 bg-white text-black hover:bg-gray-200 border-none hover:scale-105">
                                        <Megaphone className="mr-2 w-5 h-5" />
                                        Launch Campaign
                                    </Button>
                                </Link>
                                <Link href="/services/social">
                                    <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-white/10 hover:bg-white/5">
                                        View Social Stats
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Hero Visual: The "Trust Transfer" */}
                        <div className="relative h-[600px] w-full hidden lg:block">
                            {/* Central Brand */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#0B0F14] border-2 border-primary shadow-[0_0_50px_rgba(0,239,214,0.3)] flex items-center justify-center z-20">
                                <span className="font-bold text-xl">YOU</span>
                            </div>

                            {/* Orbiting Creators */}
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i}
                                    className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center animate-orbit"
                                    style={{
                                        animationDuration: `${15 + i * 2}s`,
                                        transformOrigin: `${180 + i * 30}px`
                                    }}
                                >
                                    <Verified className="w-6 h-6 text-purple-400" />
                                </div>
                            ))}

                            {/* Connection Lines (Abstract) */}
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-75" />
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-100" />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 2. REALITY CHECK - The Problem */}
            <Section className="py-24 bg-white/[0.02]">
                <Container>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-[2.5rem] blur-xl" />
                            <div className="relative p-10 rounded-3xl bg-[#0F1419] border border-white/10 overflow-hidden">
                                <div className="space-y-6 opacity-50">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-white/10 rounded-full" />
                                        <div className="flex-1 h-4 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="h-32 bg-white/10 rounded-2xl" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                    <div className="text-center p-6 border border-red-500/30 bg-red-500/10 rounded-xl">
                                        <h3 className="text-2xl font-bold text-red-500 mb-2">Ad Fatigue is Real</h3>
                                        <p className="text-gray-400">CTR on display ads is &lt;0.1%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Stop Buying Impressions.<br />Start Buying <span className="text-purple-400">Influence.</span></h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Consumers are blind to banners and skeptical of sponsored posts. To win, your brand needs to be part of the conversation, not an interruption.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "92% trust influencer recommendations over ads.",
                                    "Ad-blocker usage is at an all-time high.",
                                    "CAC (Customer Acquisition Cost) is skyrocketing."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* EXPANSION 1: THE VETTING SHIELD */}
            <Section className="py-24 bg-[#0B0F14] relative overflow-hidden">
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <Container>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider mb-4 border border-green-500/20">
                            <Verified className="w-3 h-3" /> Safety First
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The "No-Fake" Vetting Standard</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The industry is full of bots and engagement pods. We use enterprise-grade tools to audit every single creator before they even see your brand name.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: Users, label: "Audience Quality", desc: "We distinguish real humans from bot farms." },
                            { icon: TrendingUp, label: "Growth History", desc: "Spikes in followers? Red flag. We look for organic curves." },
                            { icon: MessageCircle, label: "Engagement Check", desc: "Is the comment section generic emojis or real conversation?" },
                            { icon: Globe, label: "Brand Safety", desc: "Scanning past content for controversial topics or conflicts." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-colors">
                                <item.icon className="w-8 h-8 text-purple-400 mb-4" />
                                <h3 className="font-bold text-white mb-2">{item.label}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* EXPANSION 2: CAMPAIGN STRATEGY MIX */}
            <Section className="py-24 bg-white/[0.02]">
                <Container>
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="w-full md:w-1/3">
                            <h3 className="text-sm font-mono text-purple-400 mb-2">THE PLAYBOOK</h3>
                            <h2 className="text-4xl font-bold text-white mb-6">Not One-Size-Fits-All</h2>
                            <p className="text-gray-400 mb-8">
                                Different goals require different mechanics. We don't just "post and pray". We architect specific campaign types for your objectives.
                            </p>
                            <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                                View Case Studies
                            </Button>
                        </div>
                        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl bg-[#13171F] border border-white/10 hover:border-purple-500/30 transition-colors">
                                <div className="text-purple-400 font-bold mb-2 text-lg">Product Seeding</div>
                                <p className="text-sm text-gray-400">High-volume gifting to micro-influencers to generate massive UGC wave and initial buzz.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-[#13171F] border border-white/10 hover:border-purple-500/30 transition-colors">
                                <div className="text-blue-400 font-bold mb-2 text-lg">Performance Affiliates</div>
                                <p className="text-sm text-gray-400">Commission-based partnerships where creators are incentivized to drive direct sales.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-[#13171F] border border-white/10 hover:border-purple-500/30 transition-colors">
                                <div className="text-pink-400 font-bold mb-2 text-lg">Brand Ambassadors</div>
                                <p className="text-sm text-gray-400">Long-term faces of the brand who create consistent touchpoints and deep trust.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-[#13171F] border border-white/10 hover:border-purple-500/30 transition-colors">
                                <div className="text-green-400 font-bold mb-2 text-lg">Event Activation</div>
                                <p className="text-sm text-gray-400">Inviting creators to physical or digital events to create FOMO and real-time coverage.</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* EXPANSION 3: PLATFORM MASTERY */}
            <Section className="py-24 bg-[#0B0F14]">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Platform Mastery</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Where does your audience live? We speak the native language of every major platform.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Instagram */}
                        <div className="p-1 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 hover:scale-[1.02] transition-transform">
                            <div className="h-full bg-[#13171F] rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 blur-2xl rounded-full" />
                                <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
                                <div className="text-xs font-mono text-gray-500 mb-4">AESTHETIC & LIFESTYLE</div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Best for visual storytelling, fashion, beauty, and premium products. Reels for reach, Stories for conversion.
                                </p>
                            </div>
                        </div>
                        {/* TikTok */}
                        <div className="p-1 rounded-2xl bg-gradient-to-br from-[#00f2ea] to-[#ff0050] hover:scale-[1.02] transition-transform">
                            <div className="h-full bg-[#13171F] rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#00f2ea]/20 blur-2xl rounded-full" />
                                <h3 className="text-xl font-bold text-white mb-2">TikTok</h3>
                                <div className="text-xs font-mono text-gray-500 mb-4">VIRALITY & TRENDS</div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Raw, unfiltered, and potential for massive organic explosion. Best for Gen Z, gadgets, and impulse buys.
                                </p>
                            </div>
                        </div>
                        {/* YouTube */}
                        <div className="p-1 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 hover:scale-[1.02] transition-transform">
                            <div className="h-full bg-[#13171F] rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 blur-2xl rounded-full" />
                                <h3 className="text-xl font-bold text-white mb-2">YouTube</h3>
                                <div className="text-xs font-mono text-gray-500 mb-4">DEPTH & TRUST</div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Long-form reviews and deep dives. The highest conversion rate for high-ticket items and extensive education.
                                </p>
                            </div>
                        </div>
                        {/* LinkedIn */}
                        <div className="p-1 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 hover:scale-[1.02] transition-transform">
                            <div className="h-full bg-[#13171F] rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 blur-2xl rounded-full" />
                                <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
                                <div className="text-xs font-mono text-gray-500 mb-4">B2B AUTHORITY</div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Thought leadership and B2B influence. Perfect for SaaS, agencies, and enterprise solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 3. OUR NETWORK - The Solution */}
            <Section className="py-24 relative overflow-hidden">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">The Creator Ecosystem</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">We categorize influencers by <span className="text-white font-bold">impact</span>, not just follower count.</p>
                </div>

                <Container>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Micro-Influencers */}
                        <div className="group p-8 rounded-3xl bg-[#13171F] border border-white/10 hover:border-primary/50 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">The "Tastemakers"</h3>
                            <div className="text-sm font-mono text-primary mb-4">[10k - 100k Followers]</div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                High trust, hyper-engaged niche audiences. Perfect for conversion and community building.
                            </p>
                            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mb-2">
                                <div className="bg-primary h-full w-[90%]" />
                            </div>
                            <div className="text-xs text-gray-500 flex justify-between">
                                <span>Engagement</span>
                                <span className="text-primary">Very High</span>
                            </div>
                        </div>

                        {/* Macro-Influencers */}
                        <div className="group p-8 rounded-3xl bg-[#13171F] border border-white/10 hover:border-purple-400/50 transition-all duration-300 scale-105 z-10 shadow-2xl">
                            <div className="absolute top-0 right-0 p-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Globe className="w-7 h-7 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">The "Icons"</h3>
                            <div className="text-sm font-mono text-purple-400 mb-4">[100k - 1M+ Followers]</div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Massive reach and brand awareness. Perfect for product launches and shifting mass perception.
                            </p>
                            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mb-2">
                                <div className="bg-purple-400 h-full w-[95%]" />
                            </div>
                            <div className="text-xs text-gray-500 flex justify-between">
                                <span>Reach</span>
                                <span className="text-purple-400">Massive</span>
                            </div>
                        </div>

                        {/* UGC Creators */}
                        <div className="group p-8 rounded-3xl bg-[#13171F] border border-white/10 hover:border-pink-400/50 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Smartphone className="w-7 h-7 text-pink-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">UGC Creators</h3>
                            <div className="text-sm font-mono text-pink-400 mb-4">[Content Specialists]</div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                They don't post, they creates assets for YOUR ads. Authentic, raw content that performs on TikTok/Reels.
                            </p>
                            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mb-2">
                                <div className="bg-pink-400 h-full w-[100%]" />
                            </div>
                            <div className="text-xs text-gray-500 flex justify-between">
                                <span>Usability</span>
                                <span className="text-pink-400">Versatile</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4. PROCESS STEPS */}
            <Section className="py-24 bg-white/[0.02] border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 space-y-8">
                            {[
                                { title: "Vetting & Selection", desc: "We filter out fake followers and engagement pods. You only get authentic voices." },
                                { title: "Creative Briefing", desc: "We handle the contracts, rights, and creative direction so the content stays on-brand." },
                                { title: "Live Campaign Management", desc: "Real-time tracking of posts, stories, and links." },
                                { title: "ROI Reporting", desc: "Detailed breakdown of CPM, CPE, and CPA (Cost Per Acquisition)." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex-col items-center hidden sm:flex">
                                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {i + 1}
                                        </div>
                                        {i !== 3 && <div className="w-[1px] h-full bg-white/10 my-2" />}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                        <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl font-bold text-white mb-6">Execution is <span className="text-purple-400">Everything.</span></h2>
                            <p className="text-lg text-gray-400 mb-8">
                                Influencer marketing fails when it's disorganized. We treat it like a media buy—calculated, tracked, and scalable.
                            </p>
                            <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="font-mono text-xs text-gray-500">CAMPAIGN STATUS</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs text-green-500 font-bold uppercase">Active</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                        <span className="text-gray-400">Total Reach</span>
                                        <span className="text-white font-bold">1,240,000</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                        <span className="text-gray-400">Engagement Rate</span>
                                        <span className="text-white font-bold">8.4%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Sales Generated</span>
                                        <span className="text-primary font-bold">$42,500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* EXPANSION 4: THE ROI ENGINE */}
            <Section className="py-24 bg-white/[0.02] border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="text-sm font-mono text-green-400 mb-2">METRICS THAT MATTER</h3>
                            <h2 className="text-4xl font-bold text-white mb-6">Beyond "Vanity Metrics"</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Likes are nice, but they don't pay the bills. We track deep-funnel metrics to prove exactly how much revenue every creator is generating for your brand.
                            </p>

                            <div className="space-y-6">
                                <div className="p-4 bg-[#13171F] rounded-xl border border-white/5 flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                                        <DollarSign className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">EMV (Earned Media Value)</h4>
                                        <p className="text-sm text-gray-400">We calculate what the exposure would have cost if you bought it via paid ads.</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#13171F] rounded-xl border border-white/5 flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">ROAS (Return on Ad Spend)</h4>
                                        <p className="text-sm text-gray-400">Direct revenue tracking via unique discount codes and UTM links.</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#13171F] rounded-xl border border-white/5 flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">CPA (Cost Per Acquisition)</h4>
                                        <p className="text-sm text-gray-400">Optimizing creator selection to lower the cost of acquiring a new customer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Dashboard Mockup */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500/10 blur-[100px] rounded-full opacity-20" />
                            <div className="relative bg-[#0B0F14] border border-white/10 rounded-2xl p-6 shadow-2xl">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="font-bold text-white">Campaign Performance</h3>
                                    <div className="text-xs text-gray-500 px-3 py-1 bg-white/5 rounded-full">Last 30 Days</div>
                                </div>

                                {/* Chart Area (Visual only) */}
                                <div className="flex items-end gap-2 h-40 mb-8 px-2">
                                    {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100].map((h, i) => (
                                        <div key={i} className="flex-1 bg-white/5 rounded-t-sm hover:bg-green-500/50 transition-colors relative group" style={{ height: `${h}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-bold px-2 py-1 rounded transition-opacity">
                                                ${h * 120}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <div className="text-xs text-gray-500 mb-1">Total Revenue</div>
                                        <div className="text-2xl font-bold text-white">$124,500</div>
                                        <div className="text-xs text-green-400 flex items-center mt-1">
                                            <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <div className="text-xs text-gray-500 mb-1">Avg. ROAS</div>
                                        <div className="text-2xl font-bold text-white">4.2x</div>
                                        <div className="text-xs text-green-400 flex items-center mt-1">
                                            <TrendingUp className="w-3 h-3 mr-1" /> Best in class
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 5. PRICING */}
            <Section className="py-24 relative overflow-hidden">
                <Container className="relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6">Simple, Flat Compliance Fees</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We charge a management fee. You pay creators directly (or through us). No hidden markups.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        {/* Starter */}
                        <div className="p-8 rounded-3xl bg-[#0B0F14] border border-white/10 hover:border-white/20 transition-all duration-300">
                            <h3 className="text-2xl font-bold text-white mb-2">Seeding</h3>
                            <p className="text-sm text-gray-500 mb-6 h-10">Product gifting campaigns.</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-bold text-white">₹25k</span>
                                <span className="text-gray-500">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Up to 10 Micro-Influencers",
                                    "Product Seeding Strategy",
                                    "Shipping Logistics",
                                    "Content Usage Rights (3 Months)"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact" className="w-full">
                                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Start Seeding</Button>
                            </Link>
                        </div>

                        {/* Growth - Featured */}
                        <div className="relative p-8 rounded-3xl bg-white/5 border border-purple-500/50 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] scale-105 z-10">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Most Popular
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Viral Growth</h3>
                            <p className="text-sm text-gray-400 mb-6 h-10">Full-scale paid partnerships.</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-bold text-white">₹55k</span>
                                <span className="text-gray-500">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Up to 25 Creators (Mix)",
                                    "Contract Negotiation",
                                    "Brief Creation & Approval",
                                    "Whitelisting Setup (Ads)",
                                    "Full Usage Rights"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact" className="w-full">
                                <Button className="w-full bg-purple-500 hover:bg-purple-600 border-none text-white">Get Viral</Button>
                            </Link>
                        </div>

                        {/* Enterprise */}
                        <div className="p-8 rounded-3xl bg-[#0B0F14] border border-white/10 hover:border-white/20 transition-all duration-300">
                            <h3 className="text-2xl font-bold text-white mb-2">Ambassador</h3>
                            <p className="text-sm text-gray-500 mb-6 h-10">Long-term brand faces.</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-bold text-white">Custom</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Unlimited Creator Management",
                                    "Year-long Partnerships",
                                    "Event Activations",
                                    "Co-Product Creation",
                                    "Dedicated Talent Manager"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact" className="w-full">
                                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Contact Us</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 6. FINAL CTA */}
            <Section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-900/10" />
                <Container className="relative text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Go Viral?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        The internet is noisy. We hand you the megaphone.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-12 text-lg rounded-full bg-white text-black hover:bg-gray-100 border-none">
                            Book Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </Container>
            </Section>

        </main>
    );
}

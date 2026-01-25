"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Search, XCircle, BarChart, Layers, Globe, ShieldCheck, AlertCircle, Zap } from "lucide-react";
import Link from "next/link";

import { ServicePricing } from "@/components/sections/ServicePricing";

export function SEOPage({ plans }: { plans?: any[] }) {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden selection:bg-primary/30">

            {/* 1. CINEMATIC HERO SECTION */}
            <Section className="pt-32 pb-24 relative">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                </div>

                <Container className="relative z-10 py-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 ring-1 ring-white/20">
                            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-300">Start treating your website like an asset</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            Your Website Exists.<br />
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-blue-500">
                                Google Just Doesn't Trust It Yet.
                                {/* Underline Glow */}
                                <div className="absolute -bottom-2 left-0 w-full h-[6px] bg-gradient-to-r from-primary to-blue-500 blur-sm opacity-50 rounded-full" />
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Stop chasing "hacks." If your site isn't getting traffic, it's because the foundation is broken. We fix the trust signal.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/contact" className="group">
                                <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-[0_0_40px_-5px_var(--color-primary)] hover:shadow-[0_0_60px_-5px_var(--color-primary)] transition-all duration-500">
                                    <Search className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Check My Website's Health
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 2. THE DIAGNOSIS (What's Going Wrong) - Visual Grid */}
            <Section className="py-24 bg-white/[0.02] border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Why Most Websites <span className="text-red-400">Fail</span> in Search
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Most agencies sell you a "checklist" of fixes. But SEO isn't about fixing typos—it's about fixing <strong>relevance</strong> and <strong>authority</strong>.
                            </p>

                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <AlertCircle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">The "Checklist Trap"</h4>
                                        <p className="text-gray-400">
                                            Fixing meta tags won't help if your content has no authority. You need a strategy, not just a cleanup.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Diagnosis Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { title: "Keyword Mismatch", desc: "Pages targeting words users don't actually search for.", icon: Search },
                                { title: "Thin Content", desc: "Articles written for robots, offering zero value to humans.", icon: Layers },
                                { title: "Ghost Authority", desc: "No reputable sites linking back to you.", icon: Globe },
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

            {/* 3. OUR STRATEGY (3 Pillars) - Featured Cards */}
            <Section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14] via-blue-900/10 to-[#0B0F14]" />
                <Container className="relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            How We Build <span className="text-primary">Unshakeable</span> Rankings
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We don't guess. We engineer authority using a 3-pillar framework that Google rewards.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Search Intent First",
                                desc: "We map keywords to problems your customers are actually trying to solve.",
                                icon: Zap,
                                color: "from-yellow-500/20 to-orange-500/5",
                                accent: "text-yellow-500"
                            },
                            {
                                step: "02",
                                title: "Structure & Silos",
                                desc: "We organize your site so Google clearly understands exactly what you do.",
                                icon: Layers,
                                color: "from-primary/20 to-cyan-500/5",
                                accent: "text-primary"
                            },
                            {
                                step: "03",
                                title: "Authority Building",
                                desc: "We earn high-quality backlinks that signal trust to search engines.",
                                icon: ShieldCheck,
                                color: "from-purple-500/20 to-pink-500/5",
                                accent: "text-purple-500"
                            }
                        ].map((card, i) => (
                            <div key={i} className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
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

            {/* 4. THE ROADMAP (Timeline) - Vertical Journey */}
            <Section className="py-24 bg-white/[0.02]">
                <Container className="max-w-4xl">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            The Roadmap to Page 1
                        </h2>
                        <p className="text-gray-400">
                            SEO isn't magic. It's a predictable process.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-blue-500 to-transparent opacity-30" />

                        <div className="space-y-16">
                            {[
                                {
                                    month: "Month 1",
                                    title: "The Foundation",
                                    items: ["Deep Technical Audit", "Keyword Strategy Mapping", "Fixing Indexing Errors"],
                                    icon: Search
                                },
                                {
                                    month: "Month 2",
                                    title: "Content & Structure",
                                    items: ["Creating 'Power Pages'", "Optimizing Internal Links", "Improving Site Speed"],
                                    icon: Layers
                                },
                                {
                                    month: "Month 3-4",
                                    title: "Authority Injection",
                                    items: ["High-Quality Backlinks", "Digital PR Outreach", "Social Signals"],
                                    icon: Globe
                                },
                                {
                                    month: "Month 5+",
                                    title: "Dominance & Scale",
                                    items: ["Ranking #1-3", "Scaling Traffic", "Conversion Optimization"],
                                    icon: BarChart
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
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
                        <h2 className="text-3xl font-bold text-white mb-6">Who This Service Is For</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We're honest about who we can help. SEO is an investment, not a quick fix.
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
                                {["Business building a long-term brand", "Willing to invest 6 months for ROI", "Has a clear, proven offer", "Ready to dominate their niche"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
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
                                {["Needs sales by tomorrow", "Cannot wait for Google indexing", "Hoping for a $100 marketing miracle", "Frequent pivot of business model"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-400">
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
            <ServicePricing serviceName="SEO" plans={plans || []} />

            {/* 7. FINAL CTA - Minimal & Clean */}
            <Section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/5" />
                <Container className="relative text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Stop Being Invisible.
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Let's check if your website has what it takes to rank #1.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-12 text-lg rounded-full">
                            Request Free SEO Audit <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </Container>
            </Section>

        </main>
    );
}

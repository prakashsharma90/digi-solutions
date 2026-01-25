"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check, X, Target, TrendingUp, Zap, BarChart3, ArrowRight, Play, DollarSign, Users, Clock } from "lucide-react";
import Link from "next/link";

import { ServicePricing } from "@/components/sections/ServicePricing";

export function PerformanceMarketingPage({ plans }: { plans?: any[] }) {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden ">

            {/* 1. PREMIUM HERO SECTION */}
            <Section className="pt-28 pb-16 relative mb:py-16">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
                </div>

                <Container className="relative z-10 py-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Professional Copy */}
                        <div>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-sm font-medium text-primary">Performance Marketing</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold text-white leading-[1.1] mb-6">
                                Performance Marketing That Brings{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                                    Leads
                                </span>
                                {" "}— Not Just Clicks
                            </h1>

                            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-xl">
                                We run data-driven Google & Meta ad campaigns focused on <span className="text-white font-semibold">ROI</span>, not vanity metrics.
                            </p>

                            {/* Premium Trust Signals */}
                            <div className="grid grid-cols-3 gap-4 mb-10">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-primary mb-1">3-5x</div>
                                    <div className="text-xs text-gray-400">Avg. ROAS</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-primary mb-1">₹10Cr+</div>
                                    <div className="text-xs text-gray-400">Ad Spend Managed</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-primary mb-1">50+</div>
                                    <div className="text-xs text-gray-400">Active Clients</div>
                                </div>
                            </div>

                            {/* Premium CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/contact" className="group">
                                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-[0_0_40px_-10px_var(--color-primary)] hover:shadow-[0_0_60px_-5px_var(--color-primary)] transition-all">
                                        Get Free Audit
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="#case-studies">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-white/20 hover:bg-white/5 hover:border-primary/50 transition-all">
                                        View Case Studies
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Premium Dashboard Mockup */}
                        <div className="relative">
                            <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 backdrop-blur-xl shadow-2xl">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <BarChart3 className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-sm font-semibold text-white">Campaign Dashboard</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs text-green-400">Live</span>
                                    </div>
                                </div>

                                {/* Main Metric */}
                                <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/10 border border-primary/30">
                                    <div className="text-sm text-gray-400 mb-2">Return on Ad Spend</div>
                                    <div className="flex items-end gap-3">
                                        <div className="text-5xl font-bold text-white">4.2x</div>
                                        <div className="flex items-center gap-1 text-green-400 text-sm mb-2">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>+18%</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-4">
                                        <div className="bg-gradient-to-r from-primary to-cyan-400 h-full w-[84%] rounded-full" />
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                                        <span>Ad Spend: ₹50,000</span>
                                        <span>Revenue: ₹2,10,000</span>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-white mb-1">450</div>
                                        <div className="text-xs text-gray-400">Qualified Leads</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-white mb-1">₹12</div>
                                        <div className="text-xs text-gray-400">Cost Per Lead</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-white mb-1">23%</div>
                                        <div className="text-xs text-gray-400">Conversion Rate</div>
                                    </div>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-cyan-500/20 blur-3xl -z-10 opacity-50" />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 2. WHAT WE ACTUALLY DO - Enhanced */}
            <Section className="py-12 bg-gradient-to-b from-transparent to-white/[0.02]">
                <Container>
                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        {/* Left Text - Sticky */}
                        <div className="lg:col-span-2 lg:sticky lg:top-32">
                            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                                What We Actually Do
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed mb-6">
                                No buzzwords. No fluff. Just results-driven campaigns that convert traffic into paying customers.
                            </p>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                                <p className="text-white font-medium italic">
                                    "If it doesn't convert, we don't scale it."
                                </p>
                                <p className="text-sm text-gray-400 mt-2">Our commitment to performance</p>
                            </div>
                        </div>

                        {/* Right Cards */}
                        <div className="lg:col-span-3 space-y-4">
                            {[
                                { icon: Target, title: "Google Search & Display Ads", desc: "Capture high-intent searches when buyers are ready" },
                                { icon: Users, title: "Meta (Facebook & Instagram) Ads", desc: "Reach your audience where they spend time" },
                                { icon: Zap, title: "Landing Page Funnel Setup", desc: "Conversion-optimized pages that turn clicks into customers" },
                                { icon: BarChart3, title: "Conversion Tracking (GA4, Pixel, GTM)", desc: "Track every dollar and optimize based on data" },
                                { icon: TrendingUp, title: "Weekly Optimization & Scaling", desc: "Continuous testing and improvement for better results" }
                            ].map((service, i) => (
                                <div key={i} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 group-hover:scale-110 transition-all">
                                            <service.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {service.desc}
                                            </p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 3. PLATFORMS - Refined */}
            <Section className="py-12">
                <Container>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Platforms We Run Paid Campaigns On
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Platform selection depends on your business model — not trends.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {[
                            { name: "Google Ads", desc: "Search & Display" },
                            { name: "Meta Ads", desc: "Facebook & Instagram" },
                            { name: "YouTube Ads", desc: "Video Marketing" },
                            { name: "LinkedIn Ads", desc: "B2B Targeting" }
                        ].map((platform, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-center group">
                                <div className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                    {platform.name}
                                </div>
                                <div className="text-xs text-gray-400">{platform.desc}</div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 4. PROCESS - Premium Design */}
            <Section className="py-12 bg-gradient-to-b from-white/[0.02] to-transparent relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <Container className="relative">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Our Proven Process
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Simple. Measurable. Repeatable.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {[
                            { num: "01", title: "Audit & Goal Mapping", desc: "Deep dive into your business, competitors, and current performance", icon: Target },
                            { num: "02", title: "Funnel & Offer Setup", desc: "Build conversion-optimized landing pages and compelling offers", icon: Zap },
                            { num: "03", title: "Campaign Launch", desc: "Launch targeted campaigns with proper tracking and optimization", icon: TrendingUp },
                            { num: "04", title: "Daily Optimization", desc: "Monitor performance and make data-driven improvements daily", icon: BarChart3 },
                            { num: "05", title: "Scaling What Works", desc: "Increase budget on winning campaigns while cutting losers", icon: DollarSign }
                        ].map((step, i) => (
                            <div key={i} className="relative">
                                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-primary/30 transition-all group h-full">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
                                        <step.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-6xl font-bold text-white/5 mb-4 group-hover:text-primary/20 transition-colors">
                                        {step.num}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                                {i < 4 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-sm text-gray-500">
                            💡 No long-term contracts. Performance decides continuation.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* 5. RESULTS - Premium Stats */}
            <Section className="py-12">
                <Container>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Real Results, Not Promises
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Metrics that matter for your bottom line
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                metric: "₹12 → ₹3",
                                label: "CPL",
                                desc: "Reduced cost per lead by 75% in 21 days",
                                icon: TrendingUp,
                                color: "from-green-500/20 to-emerald-500/5"
                            },
                            {
                                metric: "4.2x",
                                label: "ROAS",
                                desc: "Average return on ad spend for eCommerce clients",
                                icon: BarChart3,
                                color: "from-primary/20 to-cyan-500/5"
                            },
                            {
                                metric: "350+",
                                label: "Qualified Leads",
                                desc: "Generated in 30 days for B2B service business",
                                icon: Target,
                                color: "from-purple-500/20 to-pink-500/5"
                            }
                        ].map((result, i) => (
                            <div key={i} className="group">
                                <div className={`p-8 rounded-3xl bg-gradient-to-br ${result.color} border border-white/10 hover:border-primary/30 transition-all text-center relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                                    <result.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                                    <div className="text-5xl font-bold text-white mb-2">
                                        {result.metric}
                                    </div>
                                    <div className="text-lg font-semibold text-primary mb-4">
                                        {result.label}
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {result.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 6. WHO THIS IS FOR - Enhanced Design */}
            <Section className="py-12 bg-gradient-to-b from-transparent to-white/[0.02]">
                <Container className="max-w-6xl">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Who This Service Is For
                        </h2>
                        <p className="text-gray-400 text-lg">
                            We're honest about who we can help best
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Good Fit */}
                        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                        <Check className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        Perfect Fit For
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Service-based businesses with clear offers",
                                        "Local brands ready to scale digitally",
                                        "E-commerce stores with proven products",
                                        "Coaches & consultants with high-ticket offers"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 group">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-green-400" />
                                            </div>
                                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Not a Fit */}
                        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                                        <X className="w-6 h-6 text-red-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        Not a Fit For
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Budgets under ₹10,000/month for ads",
                                        "Expecting instant results in 48 hours",
                                        "No landing page or clear offer",
                                        "Unwilling to test and iterate"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 group">
                                            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <X className="w-4 h-4 text-red-400" />
                                            </div>
                                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-12">
                        🎯 This filter saves both your time and ours. We only take clients we can genuinely help.
                    </p>
                </Container>
            </Section>

            {/* 7. PRICING - Premium Cards */}
            <ServicePricing serviceName="Performance Marketing" plans={plans || []} />

            {/* 8. PREMIUM FINAL CTA */}
            <Section className="py-16 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-cyan-500/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[150px]" />

                <Container className="relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Limited slots available this month</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Ready to Turn Ads Into{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                                Revenue?
                            </span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Get a free performance audit before you spend another rupee. No sales pitch. Just honest analysis.
                        </p>

                        <Link href="/contact" className="inline-block group">
                            <Button size="lg" className="h-16 px-12 text-lg shadow-[0_0_60px_-10px_var(--color-primary)] hover:shadow-[0_0_80px_-5px_var(--color-primary)] transition-all">
                                👉 Book Free Strategy Call
                                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>

                        <p className="text-sm text-gray-500 mt-8">
                            ⚡ Response within 24 hours • 📞 30-minute consultation • 🎯 Custom strategy roadmap
                        </p>
                    </div>
                </Container>
            </Section>

        </main>
    );
}

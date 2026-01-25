"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, XCircle, Zap, PenTool, BookOpen, Mic, Search, Layers, BarChart3, TrendingUp, FileText, BrainCircuit, Share2, MessageCircle, Repeat, Target, Microscope, Dna, Sparkles, Fingerprint } from "lucide-react";
import Link from "next/link";

import { ServicePricing } from "@/components/sections/ServicePricing";

export function ContentMarketingPage({ plans }: { plans?: any[] }) {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden selection:bg-primary/30 font-sans">

            {/* 1. CINEMATIC WRITER HERO */}
            <Section className="pt-32 pb-24 relative">
                {/* Background: Abstract "Paper" meets "Digital" */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
                    {/* Floating Letters Effect */}
                    <div className="absolute top-1/4 left-10 text-9xl font-serif text-white/5 font-bold rotate-12 select-none">Aa</div>
                    <div className="absolute bottom-1/3 right-10 text-9xl font-serif text-white/5 font-bold -rotate-12 select-none">¶</div>
                </div>

                <Container className="relative z-10 py-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 ring-1 ring-white/20">
                            <PenTool className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-gray-300">Human Writers. Zero AI Slop.</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            We Don&apos;t Just "Generate".<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-teal-400">
                                We Write.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                            In a world of ChatGPT noise, <span className="text-white font-serif italic">storytelling</span> is your only competitive advantage. We craft words that hook, persuade, and sell.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/contact" className="group">
                                <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-[0_0_40px_-5px_var(--color-primary)] hover:shadow-[0_0_60px_-5px_var(--color-primary)] transition-all duration-500 bg-primary text-black hover:bg-cyan-400 border-none hover:scale-105">
                                    <FileText className="mr-2 w-5 h-5" />
                                    Start A Project
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 2. THE EDITING ROOM (Visual Transformation) */}
            <Section className="py-24 bg-white/[0.02] border-y border-white/5">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">The "Red Pen" Difference</h2>
                        <p className="text-gray-400">See the difference between "Content" and "Copywriting".</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* The "Before" - AI Slop */}
                        <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 relative overflow-hidden group">
                            <div className="absolute top-4 right-4 text-red-500/20 rotate-12">
                                <XCircle className="w-24 h-24" />
                            </div>
                            <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                                <BrainCircuit className="w-5 h-5" /> The AI "Draft"
                            </h3>
                            <p className="text-gray-500 font-mono text-sm leading-relaxed line-through decoration-red-500/50 decoration-2">
                                "Unlock your potential with our cutting-edge solutions. We leverage synergies to drive innovation and maximize your ROI in the dynamic landscape of tomorrow."
                            </p>
                            <div className="mt-4 text-xs text-red-400 font-bold uppercase tracking-widest">
                                ❌ Generic. Boring. Ignore-able.
                            </div>
                        </div>

                        {/* The "After" - Human Craft */}
                        <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 relative overflow-hidden shadow-[0_0_50px_-20px_rgba(0,239,214,0.1)]">
                            <div className="absolute top-4 right-4 text-primary/20 -rotate-12">
                                <CheckCircle2 className="w-24 h-24" />
                            </div>
                            <h3 className="text-primary font-bold mb-4 flex items-center gap-2">
                                <PenTool className="w-5 h-5" /> The Human Rewrite
                            </h3>
                            <p className="text-white font-serif text-lg leading-relaxed">
                                "Stop guessing. Start growing. We build the tools that turn your chaotic data into clear, actionable profit strategies—today, not next year."
                            </p>
                            <div className="mt-4 text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-3 h-3" /> Punchy. Clear. Profitable.
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 3. OUR NEWSROOM PROCESS */}
            <Section className="py-24 relative">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Wordsmiths, Journalists, <span className="text-primary">& Strategists.</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                We operate like a high-end newsroom. No fluff. No filler. Just deep research and compelling narratives.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { title: "Deep-Dive Research", desc: "We don't just Google it. We interview SMEs, read whitepapers, and dig for unique angles.", icon: Search },
                                    { title: "The 'Hook' Strategy", desc: "If the headline doesn't stop the scroll, the article doesn't exist. We obsess over hooks.", icon: Zap },
                                    { title: "Editorial Polish", desc: "Every piece goes through a 3-step review: Tone check, Fact check, and Conversion check.", icon: FileText }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <step.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                            <p className="text-gray-500">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual: The Document Stack */}
                        <div className="relative h-[500px] w-full flex items-center justify-center">
                            {/* Back Paper */}
                            <div className="absolute bg-white/5 border border-white/10 w-64 h-80 rounded-sm -rotate-6 transform scale-90" />
                            {/* Middle Paper */}
                            <div className="absolute bg-white/10 border border-white/20 w-64 h-80 rounded-sm -rotate-3 transform scale-95" />
                            {/* Front Paper (Active) */}
                            <div className="absolute bg-[#0B0F14] border border-primary/50 w-64 h-80 rounded-sm shadow-2xl shadow-primary/20 p-6 flex flex-col gap-4 rotate-0 hover:rotate-2 transition-transform duration-500">
                                <div className="w-12 h-2 bg-primary/20 rounded-full" />
                                <div className="space-y-2">
                                    <div className="w-full h-3 bg-white/10 rounded-sm" />
                                    <div className="w-full h-3 bg-white/10 rounded-sm" />
                                    <div className="w-2/3 h-3 bg-white/10 rounded-sm" />
                                </div>
                                <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                                    <div className="text-primary text-xs font-bold uppercase mb-2">Editor's Note</div>
                                    <div className="w-full h-2 bg-primary/20 rounded-sm mb-1" />
                                    <div className="w-3/4 h-2 bg-primary/20 rounded-sm" />
                                </div>
                                <div className="mt-auto flex justify-end">
                                    <PenTool className="w-6 h-6 text-primary animate-bounce" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4. THE CONTENT LAB (Creative Types) - REIMAGINED */}
            <Section className="py-24 bg-[#0B0F14]">
                <Container>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                            <Microscope className="w-3 h-3" /> The Lab
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6">Formats That <span className="text-primary italic">Stick</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We don't just write blogs. We engineer assets for every attention span.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Major Feature Card */}
                        <div className="col-span-1 md:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="p-10 h-full flex flex-col justify-between relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-[#0B0F14] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-black/20">
                                    <Mic className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Thought Leadership</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                        Bold, opinionated essays that challenge industry status quos. This is how you get invited to speak at conferences.
                                    </p>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 rounded-md bg-white/10 text-xs text-gray-300">Executive Branding</span>
                                        <span className="px-3 py-1 rounded-md bg-white/10 text-xs text-gray-300">Viral LinkedIn Posts</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Standard Cards */}
                        {[
                            { name: "SEO Deep Dives", desc: "2,000+ word guides that rank.", icon: Search, color: "text-cyan-400" },
                            { name: "Case Studies", desc: "Proof that you actually deliver.", icon: Target, color: "text-emerald-400" },
                        ].map((item, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all">
                                <item.icon className={`w-10 h-10 ${item.color} mb-6`} />
                                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                        ))}

                        {/* Wide Card */}
                        <div className="md:col-start-3 md:row-start-2 group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all">
                            <Sparkles className="w-10 h-10 text-purple-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2">Newsletters</h3>
                            <p className="text-sm text-gray-400">The only asset you truly own.</p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4.1. THE ANATOMY OF A VIRAL PIECE */}
            <Section className="py-24 relative bg-cyan-950/10 border-y border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-8">
                                Anatomy of a <span className="text-primary">Perfect Piece</span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { label: "The Hook", val: "20%", desc: "Stops the doom-scroll instantly." },
                                    { label: "The Story", val: "40%", desc: "Emotional connection that holds attention." },
                                    { label: "The Value", val: "30%", desc: "Actionable surplus the user can use." },
                                    { label: "The CTA", val: "10%", desc: "The 'Ask' that feels earned, not forced." },
                                ].map((stat, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-bold text-white text-lg flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                {stat.label}
                                            </span>
                                            <span className="font-mono text-primary">{stat.val}</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                                            <div style={{ width: stat.val }} className="h-full bg-gradient-to-r from-primary to-cyan-400" />
                                        </div>
                                        <p className="text-sm text-gray-500">{stat.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual DNA */}
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-64 h-80 border-2 border-white/10 rounded-2xl p-6 bg-[#0B0F14] flex flex-col items-center justify-between shadow-2xl">
                                <div className="absolute -right-12 top-10 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                                    <Fingerprint className="w-4 h-4 text-primary" />
                                    <span className="text-xs text-white font-bold">Unique Voice</span>
                                </div>
                                <div className="absolute -left-12 bottom-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                                    <Dna className="w-4 h-4 text-cyan-400" />
                                    <span className="text-xs text-white font-bold">Data Backed</span>
                                </div>

                                <div className="w-full h-32 bg-white/5 rounded-lg mb-4 animate-pulse" />
                                <div className="w-full space-y-2">
                                    <div className="w-full h-2 bg-white/10 rounded-full" />
                                    <div className="w-2/3 h-2 bg-white/10 rounded-full" />
                                    <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                                </div>
                                <Button size="sm" className="w-full mt-4 bg-primary text-black hover:bg-white">Read More</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4.5. THE CONTENT MULTIPLIER (Repurposing Strategy) */}
            <Section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-cyan-900/5 to-[#0B0F14]" />
                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Abstract Diagram */}
                            <div className="relative aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-[80px] animate-pulse" />
                                <div className="absolute inset-0 border border-white/10 rounded-full" />
                                <div className="absolute inset-[20%] border border-primary/30 rounded-full" />

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#0B0F14] border border-primary text-white rounded-xl flex flex-col items-center justify-center shadow-[0_0_30px_var(--color-primary)] z-20">
                                    <FileText className="w-8 h-8 text-primary mb-1" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Blog Post</span>
                                </div>

                                {[
                                    { name: "LinkedIn", icon: MessageCircle, pos: "top-0 left-1/2 -translate-x-1/2" },
                                    { name: "Newsletter", icon: Share2, pos: "bottom-0 left-1/2 -translate-x-1/2" },
                                    { name: "Shorts Script", icon: Mic, pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2" },
                                    { name: "Carousel", icon: Layers, pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" }
                                ].map((item, i) => (
                                    <div key={i} className={`absolute ${item.pos} w-16 h-16 bg-[#1A1F26] border border-white/20 rounded-full flex items-center justify-center z-10`}>
                                        <item.icon className="w-6 h-6 text-gray-400" />
                                    </div>
                                ))}

                                {/* Connecting Lines */}
                                <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-primary/20 -translate-x-1/2 -translate-y-1/2 rotate-0" />
                                <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-primary/20 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                                <Repeat className="w-3 h-3" /> The Multiplier Effect
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Write Once. <br /><span className="text-primary">Distribute Everywhere.</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Most companies write a blog post and let it die. We turn one deep-dive article into 10+ assets for every platform.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Turn 1 Article → 5 LinkedIn Posts",
                                    "Turn 1 Guide → 1 Newsletter Blast",
                                    "Turn 1 Case Study → 3 Video Scripts",
                                    "Turn 1 Whitepaper → 10 Tweet Threads"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4.6. SEO MEETS STORYTELLING */}
            <Section className="py-24 bg-white/[0.02] border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Rank Like a Robot.<br />Read Like a Human.</h2>
                            <p className="text-gray-400 mb-8">
                                We bridge the gap between technical SEO and engaging narrative.
                            </p>

                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-white">Semantic Richness</h4>
                                        <div className="text-primary text-sm font-bold">High</div>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[90%]" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Natural NLP optimization that Google loves.</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-white">Engagement Rate</h4>
                                        <div className="text-cyan-400 text-sm font-bold">12x Avg</div>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-400 w-[85%]" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Hooks that modify bounce rate into dwell time.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {[
                                { title: "Search Intent Mapping", desc: "We map every paragraph to user questions.", icon: Target },
                                { title: "Featured Snippet Optimization", desc: "Structuring data to steal 'Position 0'.", icon: BarChart3 },
                                { title: "Internal Link Architecture", desc: "Building topic clusters that boost domain authority.", icon: BrainCircuit }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 5. PRICING PLANS */}
            <ServicePricing serviceName="Content Marketing" plans={plans || []} />

            {/* 6. FINAL CTA */}
            <Section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-900/5" />
                <Container className="relative text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Find Your Voice?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Stop sounding like everyone else. Start sounding like the leader you are.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-12 text-lg rounded-full bg-white text-black hover:bg-gray-100 border-none">
                            Book Content Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </Container>
            </Section>

        </main>
    );
}

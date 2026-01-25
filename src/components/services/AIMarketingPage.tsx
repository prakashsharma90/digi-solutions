"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
    Bot, Cpu, Network, Zap,
    ArrowRight, Database, LineChart,
    Sparkles, Lock, Layers, BarChart3,
    BrainCircuit, Code
} from "lucide-react";
import Link from "next/link";

import { ServicePricing } from "@/components/sections/ServicePricing";

export function AIMarketingPage({ plans }: { plans?: any[] }) {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden font-sans selection:bg-cyan-500/30">

            {/* 1. HERO SECTION: "The Neural Edge" */}
            <Section className="pt-32 pb-20 relative overflow-hidden">
                {/* Background Grid & Neurons */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                </div>

                <Container className="relative z-10 transition-all duration-700 ease-out py-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/30 backdrop-blur-md mb-8 animate-fade-in-up">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-medium text-cyan-200">Marketing 2.0 is Here</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            Replace "Guesswork" with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Neural Intelligence.</span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                            Transform your marketing stack into a self-learning engine. We deploy AI agents that predict trends, personalize content, and optimize ads 24/7.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/contact" className="group">
                                <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.6)] transition-all duration-500 bg-cyan-500 hover:bg-cyan-400 text-black border-none hover:scale-105">
                                    <Bot className="mr-2 w-5 h-5" />
                                    Deploy AI Agents
                                </Button>
                            </Link>
                            <Link href="/case-studies">
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-white/10 hover:bg-white/5">
                                    View Performance
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Visual: Abstract Data Flow */}
                    <div className="mt-20 relative h-[400px] w-full max-w-5xl mx-auto border border-white/10 rounded-3xl bg-black/40 backdrop-blur-sm overflow-hidden flex items-center justify-center group">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>

                        {/* Central Brain */}
                        <div className="relative z-10 p-8 rounded-full bg-[#0B0F14] border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                            <BrainCircuit className="w-16 h-16 text-cyan-400" />
                        </div>

                        {/* Orbiting Nodes (Data) */}
                        <div className="absolute w-[600px] h-[300px] border border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute w-[450px] h-[200px] border border-dashed border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                        {/* Connecting Lines (Simulated with absolute positions) */}
                        <div className="absolute left-10 top-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50" />
                        <div className="absolute right-10 top-1/2 w-40 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50" />

                        <div className="absolute bottom-8 left-8 text-xs font-mono text-cyan-500/60">
                            PROCESSING... 42TB DATA
                        </div>
                        <div className="absolute top-8 right-8 text-xs font-mono text-cyan-500/60 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> SYSTEM ONLINE
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 2. THE PROBLEM: SCALE VS HUMANITY */}
            <Section className="py-24 bg-white/[0.02]">
                <Container>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Humans Sleep.<br />AI <span className="text-cyan-400">Never Stops.</span></h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Traditional marketing is reactive. You wait for data, analyze it, and make changes next week. AI marketing is predictive and instantaneous.
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4 p-4 border border-white/5 rounded-xl bg-white/[0.01]">
                                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Manual Scaling Cap</h4>
                                        <p className="text-sm text-gray-500">You can't write 1,000 personalized emails per hour. AI can.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 border border-cyan-500/20 rounded-xl bg-cyan-950/10 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 relative z-10">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="font-bold text-white">Infinite Velocity</h4>
                                        <p className="text-sm text-gray-400">Real-time bid adjustments and copy iterations based on live user behavior.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Graphic: Man vs Machine Efficiency Curve */}
                            <div className="bg-[#13171F] border border-white/10 rounded-3xl p-8 h-[400px] flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

                                <div>
                                    <h3 className="font-bold text-white mb-2">Efficiency Over Time</h3>
                                    <div className="flex items-center gap-4 text-xs">
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-500 rounded-full" /> AI-Driven</div>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-500 rounded-full" /> Traditional</div>
                                    </div>
                                </div>

                                <div className="relative h-48 w-full mt-4">
                                    {/* Traditional Line */}
                                    <div className="absolute bottom-0 left-0 w-full h-[50%] border-t-2 border-dashed border-gray-600" />
                                    {/* AI Line (Exponential) */}
                                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                        <path d="M0,190 C100,180 200,150 400,20" fill="none" stroke="#06b6d4" strokeWidth="3" />
                                        <circle cx="400" cy="20" r="4" fill="#06b6d4" className="animate-ping" />
                                        <circle cx="400" cy="20" r="4" fill="#06b6d4" />
                                    </svg>
                                </div>
                                <div className="flex justify-between text-xs font-mono text-gray-500 mt-2">
                                    <span>Day 1</span>
                                    <span>Day 90</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 3. CAPABILITIES GRID */}
            <Section className="py-24 bg-[#0B0F14]">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">The Automation Suite</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">We don't just use ChatGPT. We build proprietary workflows using specialized agents.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Predictive Analytics", icon: LineChart, desc: "Forecasting revenue and churn probability before they happen." },
                            { title: "Hyper-Personalization", icon: Users, desc: "Dynamic website content changes based on who is visiting." },
                            { title: "Automated Creative", icon: Code, desc: "Generating 100s of ad variations (image + copy) to test winners." },
                            { title: "Conversational Sales", icon: MessageCircle, desc: "AI chatbots that actually qualify leads and book meetings." },
                            { title: "Process Mining", icon: Network, desc: "Finding bottlenecks in your funnel effectively automatically." },
                            { title: "Smart Bidding", icon: DollarSign, desc: "Algorithmic ad spend management to maximize ROAS." }
                        ].map((item, i) => (
                            <div key={i} className="group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-cyan-950/20 hover:border-cyan-500/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* EXPANSION 1: WORKFLOW ANATOMY */}
            <Section className="py-24 bg-white/[0.02] border-t border-white/5">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Anatomy of an AI Workflow</h2>
                        <p className="text-gray-400">Example: The <span className="text-cyan-400 font-mono">"Autonomous Content Engine"</span></p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 hidden md:block" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                            {[
                                { step: "1. Ingestion", desc: "AI scrapes industry news & your past blogs.", icon: Database },
                                { step: "2. Synthesis", desc: "LLM Identifies 5 trending topics & drafts outlines.", icon: BrainCircuit },
                                { step: "3. Creation", desc: "Drafts usage-ready articles + generated Midjourney art.", icon: Sparkles },
                                { step: "4. Distribution", desc: "Auto-posts to LinkedIn, Twitter & Webflow via API.", icon: Network }
                            ].map((item, i) => (
                                <div key={i} className="bg-[#0B0F14] border border-white/10 p-6 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-10 h-10 rounded-full bg-cyan-900/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 mx-auto md:mx-0 z-20 relative">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-white mb-2 text-center md:text-left">{item.step}</h3>
                                    <p className="text-sm text-gray-400 text-center md:text-left">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4. THE STACK */}
            <Section className="py-24 bg-[#0B0F14] overflow-hidden">
                <Container>
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="w-full md:w-1/2">
                            <h3 className="text-sm font-mono text-cyan-400 mb-2">POWERED BY</h3>
                            <h2 className="text-4xl font-bold text-white mb-6">Best-in-Class Models</h2>
                            <p className="text-gray-400 mb-8">
                                We stay platform-agnostic, routing your data to the best model for the job—whether it's GPT-4 for logic, Claude for writing, or Midjourney for visuals.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-center text-gray-300 font-mono text-sm">OpenAI GPT-4o</div>
                                <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-center text-gray-300 font-mono text-sm">Anthropic Claude</div>
                                <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-center text-gray-300 font-mono text-sm">Midjourney v6</div>
                                <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-center text-gray-300 font-mono text-sm">perplexilty.ai</div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 relative">
                            <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full opacity-30" />
                            {/* Visual Representation of Routing */}
                            <div className="relative p-8 bg-[#13171F]/80 backdrop-blur-xl border border-white/10 rounded-3xl">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-xs text-gray-500 font-mono">REQUEST ROUTER</span>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                        <div className="w-2 h-2 rounded-full bg-green-400" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="w-20 font-mono text-cyan-400">INPUT</div>
                                        <div className="flex-1 bg-black/50 p-2 rounded">"Analyze Q3 Sales Data"</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 rotate-90 mx-auto" />
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="w-20 font-mono text-cyan-400">MODEL</div>
                                        <div className="flex-1 bg-cyan-900/20 border border-cyan-500/30 p-2 rounded text-cyan-200">GPT-4-Turbo (Analysis Mode)</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 rotate-90 mx-auto" />
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="w-20 font-mono text-cyan-400">OUTPUT</div>
                                        <div className="flex-1 bg-black/50 p-2 rounded text-green-400">Insight: Churn Risk +15%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* EXPANSION 2: CONNECTED ECOSYSTEM */}
            <Section className="py-20 bg-white/[0.02] border-t border-white/5">
                <Container>
                    <p className="text-center text-sm font-mono text-gray-500 mb-8">SEAMLESS INTEGRATION WITH</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {["Salesforce", "HubSpot", "Shopify", "WordPress", "Slack", "Zapier"].map((brand, i) => (
                            <div key={i} className="text-xl font-bold text-white flex items-center gap-2">
                                <div className="w-2 h-2 bg-white/20 rounded-full" /> {brand}
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* EXPANSION 3: ENTERPRISE SECURITY */}
            <Section className="py-24 bg-[#0B0F14]">
                <Container>
                    <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-3xl p-8 md:p-12 border border-cyan-500/20 flex flex-col md:flex-row items-center gap-8">
                        <div className="p-6 bg-cyan-500/10 rounded-full border border-cyan-500/30 shrink-0">
                            <Lock className="w-12 h-12 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-white mb-4">Your Data Stays Yours.</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                We deploy private instances of LLMs. Your customer data is never used to train public models. Enterprise-grade encryption and SOC2 compliant workflows come standard.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-sm text-cyan-200 bg-cyan-500/10 px-3 py-1 rounded-full">
                                    <Check className="w-4 h-4" /> HIPAA Compliant
                                </div>
                                <div className="flex items-center gap-2 text-sm text-cyan-200 bg-cyan-500/10 px-3 py-1 rounded-full">
                                    <Check className="w-4 h-4" /> GDPR Ready
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 h-12 px-6">
                                View Security Policy
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 5. PRICING */}
            <ServicePricing serviceName="AI Marketing" plans={plans || []} />

            {/* 6. FINAL CTA */}
            <Section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-900/20" />
                <Container className="relative text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Future-Proof Your Brand
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        The competition is still guessing. Start knowing.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="h-14 px-12 text-lg rounded-full bg-white text-black hover:bg-gray-100 border-none">
                            Schedule AI Demo <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </Container>
            </Section>

        </main>
    );
}

// Icon components for lists
function Check({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
import { Users, MessageCircle, DollarSign } from "lucide-react";

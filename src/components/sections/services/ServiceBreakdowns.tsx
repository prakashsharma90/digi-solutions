"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
    {
        id: "ai-marketing",
        title: "AI-Powered Marketing",
        headline: "Future-Proof Your Brand with AI-Driven Growth",
        description: "We combine machine learning and creative strategy to deliver hyper-personalized marketing campaigns. Replace manual overhead with intelligent systems that convert at scale.",
        problems: ["High manual overhead", "Inaccurate targeting", "Rising ad costs", "Slow reaction to trends"],
        approach: ["AI Automation Audit", "Model Selection", "Campaign Deployment", "Continuous Feedback"],
        tools: "OpenAI, Midjourney, AdCreative.ai",
        outcomes: ["Lower CPA", "Increased Efficiency", "Predictable Scale"],
    },
    {
        id: "performance",
        title: "Performance Marketing",
        headline: "High-ROAS Campaigns Across Search and Social",
        description: "Our performance marketing focus is on high ROAS and scalable growth. Pay for results, not just promises, with data-driven audience targeting and optimization.",
        problems: ["Low ROI", "High acquisition costs", "Unclear attribution", "Stagnant growth"],
        approach: ["KPI Mapping", "Full-Funnel Build", "Controlled Testing", "Aggressive Scaling"],
        tools: "Google Ads, Meta Ads, TikTok Ads",
        outcomes: ["Increased ROAS", "Lower CAC", "Daily Lead Flow"],
    },
    {
        id: "seo",
        title: "Search Engine Optimization",
        headline: "Dominate Search Results with Technical Authority",
        description: "Sustainable, technical, and content-driven SEO that stands the test of algorithm updates. We build SEO foundations that drive compounding organic traffic.",
        problems: ["Low organic visibility", "Poor keyword rankings", "Technical site errors", "High ad dependency"],
        approach: ["Technical SEO Audit", "Keyword Intent Mapping", "Authority Link Building", "On-Page Optimization"],
        tools: "Semrush, Ahrefs, GSC, SurferSEO",
        outcomes: ["Top Rankings", "Compounding Traffic", "Lower Overall Costs"],
    },
    {
        id: "ai-seo",
        title: "AI Search & SGE",
        headline: "Be the Answer in the Future of AI-First Search",
        description: "Optimize for Google's SGE and generative platforms like ChatGPT. We help your brand appear in AI-generated answers and LLM citations to stay ahead of the curve.",
        problems: ["Loss of CTR to AI answers", "Poor brand LLM presence", "Outdated SEO tactics", "Decreased visibility"],
        approach: ["LLM Source Mapping", "Entity Optimization", "AI-Ready Structuring", "Authority Building"],
        tools: "Perplexity, Gemini, Claude, Vertex AI",
        outcomes: ["SGE Inclusion", "Better LLM Sentiment", "Answer Citations"],
    },
];

export function ServiceBreakdowns() {
    return (
        <div className="bg-[#0B0F14] space-y-20 py-20">
            {services.map((service, i) => (
                <Section key={i} id={service.id} className="relative overflow-hidden">

                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

                    <Container>
                        <div className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>

                            {/* Content Side */}
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="w-full lg:w-1/2"
                            >
                                <span className="text-primary font-mono text-sm uppercase tracking-widest mb-4 block">
                                    0{i + 1} / {service.title}
                                </span>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    {service.headline}
                                </h2>

                                <p className="text-text-muted text-lg mb-8 leading-relaxed border-l-2 border-primary/30 pl-6">
                                    {service.description}
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-white font-semibold mb-3">Problems We Solve:</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {service.problems.map((prob, idx) => (
                                                <div key={idx} className="flex items-center text-sm text-text-muted/80">
                                                    <span className="w-1.5 h-1.5 bg-red-500/50 rounded-full mr-2" />
                                                    {prob}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-semibold mb-3">Our Approach:</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {service.approach.map((step, idx) => (
                                                <div key={idx} className="flex items-center text-sm text-white/90">
                                                    <Check className="w-4 h-4 text-primary mr-2" />
                                                    {step}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-wrap gap-4 items-center">
                                    <Link href="/contact" className="w-full sm:w-auto">
                                        <Button variant="neon" className="w-full sm:w-auto px-8 transition-all">
                                            Talk to an Expert <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <div className="text-xs text-text-muted font-mono px-4 py-2 border border-white/10 rounded overflow-hidden relative">
                                        <span className="relative z-10">Stack: {service.tools}</span>
                                        <div className="absolute inset-0 bg-white/5" />
                                    </div>
                                </div>

                            </motion.div>

                            {/* Visual Side (Placeholder for Phase 4 or custom graphic) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-full lg:w-1/2"
                            >
                                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#0B0F14] group">
                                    {/* Gradient Blob */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[80px] group-hover:blur-[60px] transition-all duration-700" />

                                    {/* Mock UI/Graphic Content */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-[80%] h-[70%] bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-2xl relative">
                                            <div className="h-4 w-1/3 bg-white/10 rounded mb-4" />
                                            <div className="space-y-3">
                                                <div className="h-2 w-full bg-white/5 rounded" />
                                                <div className="h-2 w-5/6 bg-white/5 rounded" />
                                                <div className="h-2 w-4/6 bg-white/5 rounded" />
                                            </div>

                                            {/* Animated chart bars */}
                                            <div className="absolute bottom-6 left-6 right-6 h-20 flex items-end justify-between gap-2">
                                                {[40, 70, 50, 90, 60, 80].map((h, k) => (
                                                    <div key={k} className="w-full bg-primary/40 rounded-t-sm" style={{ height: `${h}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Outcomes Overlay */}
                                    <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
                                        {service.outcomes.map((outcome, k) => (
                                            <div key={k} className="px-3 py-1 bg-[#0B0F14]/80 backdrop-blur border border-primary/30 rounded text-xs font-bold text-primary shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ transitionDelay: `${k * 100}ms` }}>
                                                {outcome}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </Container>
                </Section>
            ))}
        </div>
    );
}

"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, TrendingUp, Users, Target, CheckCircle, ArrowRight, BarChart3, Lightbulb, Heart, Zap, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            <HeroSection />
            <CompanyOverview />
            <JourneyTimeline />
            <WhyChooseUs />
            <ResultsSection />
            <TeamSection />
            <CTASection />
        </main>
    );
}

// Hero Section
function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

    return (
        <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] py-40">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,217,195,0.1)_0%,transparent_70%)]" />

            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-[#00D9C3]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-[#00F5E0]/5 rounded-full blur-[150px]" />
            </div>

            <Container className="relative z-10 text-center">
                <motion.div style={{ y }} className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-8 bg-[#00D9C3]/10 border border-[#00D9C3]/20 px-5 py-2 rounded-full"
                    >
                        <Award className="w-4 h-4 text-[#00D9C3]" />
                        <span className="text-[10px] font-black text-[#00D9C3] tracking-[0.2em] uppercase">
                            Digihub Solutions: Established 2018
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-hero mb-10"
                    >
                        Your Strategic <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9C3] via-[#00F5E0] to-[#00D9C3]">
                            Growth Partner.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-body text-gray-400 max-w-3xl mx-auto mb-12 font-medium"
                    >
                        We're not just another agency. We're a performance-driven elite team dedicated to turning
                        <span className="text-white font-bold"> vision into measurable digital dominance.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-10 mt-16"
                    >
                        {[
                            { label: "Founded", val: "2018" },
                            { label: "Active Clients", val: "150+" },
                            { label: "Market Reach", val: "Global" }
                        ].map((stat, i) => (
                            <div key={stat.label} className="text-center group">
                                <div className="text-[40px] font-black text-white mb-2 group-hover:text-[#00D9C3] transition-colors leading-none">{stat.val}</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}

// Company Overview
function CompanyOverview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <Section ref={ref} className="bg-[#0f0f0f] border-y border-white/5">
            <Container>
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] bg-[#1a1a1a] border border-white/10 overflow-hidden relative group shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
                                alt="Digihub Solutions Team Collaborating"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-10 left-10 text-left">
                                <div className="text-[#00D9C3] font-black tracking-widest uppercase text-[10px] mb-3">Est. 2018</div>
                                <div className="text-white text-[32px] font-black leading-tight">Driven by Human <br /> Intelligence.</div>
                            </div>
                        </div>

                        {/* Floating Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.4 }}
                            className="absolute -bottom-10 -right-10 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-[#00D9C3]/30 rounded-[2rem] p-8 shadow-2xl backdrop-blur-xl"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-[#00D9C3]/20 flex items-center justify-center border border-[#00D9C3]/30">
                                    <TrendingUp className="w-8 h-8 text-[#00D9C3]" />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[32px] font-black text-white leading-none">98%</div>
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Client Satisfaction</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <h2 className="text-section">
                                Who We Are
                            </h2>
                            <div className="w-24 h-2 bg-gradient-to-r from-[#00D9C3] to-[#00F5E0] rounded-full" />
                        </div>

                        <div className="space-y-6 text-body text-gray-400 font-medium">
                            <p>
                                <span className="text-white font-bold">Digihub Solutions</span> is a premium full-service digital agency built for the modern era of performance marketing and AI-search dominance.
                            </p>

                            <p>
                                We partner with ambitious leaders who refuse to settle for "average" digital presence. Our mission is to engineer high-growth engines that deliver undeniable ROI.
                            </p>

                            <p>
                                By merging <span className="text-white">creative disruption</span> with <span className="text-white">deep data analytics</span>, we create campaigns that don't just gain attention—they capture market share.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                            {[
                                "ROI-Driven Performance",
                                "AI Search Optimization",
                                "Strategic Brand Scaling",
                                "Conversion Optimization"
                            ].map((service, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-6 h-6 rounded-full bg-[#00D9C3]/10 border border-[#00D9C3]/30 flex items-center justify-center group-hover:bg-[#00D9C3]/20 transition-all">
                                        <CheckCircle className="w-4 h-4 text-[#00D9C3]" />
                                    </div>
                                    <span className="text-gray-300 font-bold group-hover:text-white transition-colors text-[15px]">{service}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}

// Journey Timeline
function JourneyTimeline() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const milestones = [
        {
            year: "2018",
            title: "Foundation",
            description: "Started with a core team of elite strategists focused on pure ROI-driven results.",
            color: "from-blue-500 to-blue-600"
        },
        {
            year: "2020",
            title: "Scaling",
            description: "Rapidly expanded our capabilities to help brands survive and thrive in a digital-first world.",
            color: "from-purple-500 to-purple-600"
        },
        {
            year: "2022",
            title: "Excellence",
            description: "Established our performance frameworks as industry standards for profitable growth.",
            color: "from-[#00D9C3] to-[#00F5E0]"
        },
        {
            year: "2024",
            title: "The Future",
            description: "Pioneering the next era of AI-Search dominance and multi-channel performance.",
            color: "from-emerald-500 to-emerald-600"
        }
    ];

    return (
        <Section ref={ref} className="bg-[#0a0a0a] relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-[#00D9C3]/[0.02] -z-10" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-24 space-y-4"
                >
                    <h2 className="text-section">Our Evolution</h2>
                    <p className="text-body text-gray-500 max-w-2xl mx-auto font-medium">
                        From a small elite collective to a global growth partner.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00D9C3] via-white/10 to-transparent" />

                        <div className="space-y-24">
                            {milestones.map((milestone, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: i * 0.15 }}
                                    className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-20 h-20 rounded-[2rem] bg-[#0a0a0a] border-4 border-[#00D9C3] flex items-center justify-center z-10 shadow-[0_0_30px_rgba(0,217,195,0.3)]">
                                        <span className="text-[20px] font-black text-[#00D9C3]">{milestone.year}</span>
                                    </div>

                                    <div className={`ml-36 md:ml-0 md:w-[42%] ${i % 2 === 0 ? 'md:mr-auto md:pr-16 text-left md:text-right' : 'md:ml-auto md:pl-16 text-left'}`}>
                                        <div className="space-y-4">
                                            <h3 className="text-[28px] font-black text-white leading-tight">{milestone.title}</h3>
                                            <p className="text-[16px] text-gray-500 leading-relaxed font-medium">{milestone.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

// Why Choose Us
function WhyChooseUs() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const reasons = [
        {
            icon: Target,
            title: "Performance Priority",
            description: "We focus on revenue and profit, not just traffic and vanity metrics. Every move is strategic."
        },
        {
            icon: BarChart3,
            title: "Data Intelligence",
            description: "Proprietary analytics and optimization loops that refine your campaigns in real-time."
        },
        {
            icon: Zap,
            title: "Rapid Execution",
            description: "Fast-moving agile teams that ship high-impact campaigns and iterations without the fluff."
        },
        {
            icon: Heart,
            title: "Elite Partnership",
            description: "Direct access to top-tier strategists who treat your business growth like their own."
        }
    ];

    return (
        <Section ref={ref} className="bg-[#0f0f0f] border-y border-white/5 py-32">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-24 space-y-4"
                >
                    <h2 className="text-section">
                        The <span className="text-[#00D9C3]">Digihub Advantage</span>
                    </h2>
                    <p className="text-body text-gray-500 max-w-2xl mx-auto font-medium">
                        Why high-growth brands trust our specialized frameworks.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-[#00D9C3]/40 hover:bg-white/[0.04] transition-all duration-500"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#00D9C3]/10 border border-[#00D9C3]/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <reason.icon className="w-8 h-8 text-[#00D9C3]" />
                            </div>
                            <h3 className="text-[22px] font-black mb-4 tracking-tight leading-tight">{reason.title}</h3>
                            <p className="text-[15px] text-gray-500 leading-relaxed font-medium">{reason.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

// Results Section
function ResultsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const stats = [
        { val: "$500M+", label: "Generated Revenue", icon: TrendingUp },
        { val: "4.2x", label: "Average ROAS", icon: BarChart3 },
        { val: "98%", label: "Retention Rate", icon: Heart },
        { val: "150+", label: "Elite Campaigns", icon: Award }
    ];

    return (
        <Section ref={ref} className="relative py-40 overflow-hidden bg-[#0a0a0a]">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,195,0.05),transparent_70%)]" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-20 space-y-4"
                >
                    <h2 className="text-section">Impact That Scales.</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center group hover:bg-white/[0.08] transition-all"
                        >
                            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#00D9C3]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <s.icon className="w-10 h-10 text-[#00D9C3]" />
                            </div>
                            <div className="text-[40px] font-black text-white mb-3 group-hover:text-[#00D9C3] transition-colors leading-none">{s.val}</div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

// Team Section
function TeamSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Section ref={ref} className="bg-[#0f0f0f] border-y border-white/5">
            <Container>
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="space-y-8"
                    >
                        <h2 className="text-section">
                            The Expertise Behind Your Success.
                        </h2>
                        <p className="text-body text-gray-500 leading-relaxed max-w-3xl mx-auto font-medium">
                            Our team is a fusion of elite performance marketers, radical creatives, and veteran data architects. We live at the intersection of psychology, algorithms, and code.
                        </p>

                        <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden my-20 border border-white/10 group shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
                                alt="Digihub Solutions Team Collaborating"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-12 left-12 text-left space-y-2">
                                <div className="text-[#00D9C3] font-black tracking-widest uppercase text-[10px]">Human Intelligence</div>
                                <div className="text-white text-[28px] font-black">Driven by Purpose. Built for Performance.</div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
                            {[
                                { title: "Strategy Elite", desc: "Crafting multi-channel roadmaps that ensure profitable scalability." },
                                { title: "Creative Radicals", desc: "Producing high-impact assets that capture psychological triggers." },
                                { title: "Data Architects", desc: "Ensuring every cent of ad spend is optimized via deep intelligence." }
                            ].map((role, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-[#00D9C3]/30 transition-all"
                                >
                                    <h3 className="text-[22px] font-black mb-4 tracking-tight text-white">{role.title}</h3>
                                    <p className="text-[15px] text-gray-500 font-medium leading-relaxed">{role.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}

// CTA Section
function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Section ref={ref} className="py-40 relative overflow-hidden bg-[#0a0a0a]">
            {/* Decorative Pulse Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D9C3]/5 rounded-full blur-[150px] -z-10 animate-pulse" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="max-w-5xl mx-auto text-center space-y-12"
                >
                    <h2 className="text-hero leading-tight">
                        Ready to Join the <br />
                        <span className="text-[#00D9C3]">High-Growth Club?</span>
                    </h2>

                    <p className="text-[22px] text-gray-500 max-w-2xl mx-auto font-bold">
                        Stop experimenting. Start executing. Let's discuss how your business can achieve its primary growth objectives.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                        <Link
                            href="/contact"
                            className="group flex items-center justify-center gap-4 px-10 py-5 bg-[#00D9C3] text-black btn-text rounded-full hover:shadow-[0_0_50px_rgba(0,217,195,0.4)] transition-all duration-300"
                        >
                            Scale My Brand
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>

                        <Link
                            href="/services"
                            className="px-10 py-5 border-2 border-white/20 text-white btn-text rounded-full hover:bg-white/5 transition-all"
                        >
                            View Frameworks
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Send,
    Users,
    TrendingUp,
    ShieldCheck,
    Zap,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    PieChart,
    Sparkles,
    MousePointerClick,
    Globe,
    Lock,
    X
} from "lucide-react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";
import { ServicePricing } from "@/components/sections/ServicePricing";

/* ─── FLOATING NOTIFICATIONS BACKGROUND ─────────────────────────────────── */
const FloatingNotifications = () => {
    const notifs = [
        { text: "Campaign Sent 🚀", icon: Send, delay: 0, x: "10%", y: "20%" },
        { text: "Revenue +$12,400", icon: TrendingUp, delay: 2, x: "70%", y: "15%" },
        { text: "Open Rate: 42%", icon: Users, delay: 4, x: "20%", y: "60%" },
        { text: "New Subscriber", icon: Sparkles, delay: 6, x: "80%", y: "70%" },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {notifs.map((n, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        y: [0, -40],
                        scale: [0.8, 1, 1, 0.9]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: n.delay,
                        repeatDelay: 2
                    }}
                    className="absolute flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-[#0B0F14]/80 backdrop-blur-md shadow-xl"
                    style={{ left: n.x, top: n.y }}
                >
                    <div className="w-2 h-2 rounded-full bg-[#00D9C3] animate-pulse" />
                    <n.icon size={14} className="text-[#00D9C3]" />
                    <span className="text-xs font-mono font-medium text-white">{n.text}</span>
                </motion.div>
            ))}
        </div>
    );
};

/* ─── MAIN COMPONENT ───────────────────────────────────────────────────── */
export function EmailMarketingPage({ plans }: { plans?: any[] }) {

    // Updated Pricing Data adapter for ServicePricing component
    const pricingPlans = [
        {
            id: "starter",
            title: "Starter",
            price: 499,
            currency: "USD",
            billing_cycle: "monthly",
            is_popular: false,
            desc: "For early-stage businesses ready to build a professional email program from scratch.",
            features: [
                "2 campaign sends/month",
                "Welcome automation flow",
                "Basic segmentation (3 segments)",
                "Monthly performance report",
                "Deliverability monitoring"
            ]
        },
        {
            id: "growth",
            title: "Growth",
            price: 1299,
            currency: "USD",
            billing_cycle: "monthly",
            is_popular: true,
            desc: "The complete email program for scaling brands that need results, not just sends.",
            features: [
                "8 campaigns/month",
                "6 automation flows built",
                "Advanced segmentation (unlimited)",
                "Weekly A/B testing program",
                "Dedicated copywriter",
                "Abandoned cart + win-back",
                "Revenue attribution dashboard",
                "Bi-weekly strategy calls"
            ]
        },
        {
            id: "enterprise",
            title: "Enterprise",
            price: "Custom",
            currency: "USD",
            billing_cycle: "monthly",
            is_popular: false,
            desc: "For high-volume senders, enterprise e-commerce, and multi-brand businesses.",
            features: [
                "Unlimited campaigns",
                "Full automation architecture",
                "Multi-brand / multi-ESP mgmt",
                "Dedicated email strategist",
                "Custom integrations & API work",
                "SLA & priority support",
                "Quarterly business reviews"
            ]
        }
    ];

    return (
        <main className="bg-[#0B0F14] text-white min-h-screen selection:bg-[#00D9C3] selection:text-black font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <FloatingNotifications />

                <Container className="relative z-10 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Left Content */}
                        <div className="lg:w-1/2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D9C3]/10 border border-[#00D9C3]/20 text-[#00D9C3] text-sm font-bold tracking-wide uppercase"
                            >
                                <span className="animate-pulse w-2 h-2 rounded-full bg-[#00D9C3]" />
                                Campaigns live in 72 hours · No lock-in
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl lg:text-[5rem] font-black leading-[0.95] tracking-tight text-white"
                            >
                                Email that actually <br />
                                <span className="text-[#00D9C3]">drives revenue.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-gray-400 max-w-lg leading-relaxed lg:mx-0 mx-auto"
                            >
                                DigiHub's email marketing engine combines precision audience segmentation, AI-powered personalization, and obsessive analytics — so every send turns subscribers into customers.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                            >
                                <Link href="/contact">
                                    <button className="px-8 py-4 bg-[#00D9C3] hover:bg-[#00c0ad] text-black font-bold text-lg rounded-full transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(0,217,195,0.4)] flex items-center gap-2">
                                        Start Free Audit <ArrowRight size={20} />
                                    </button>
                                </Link>
                                <Link href="#services">
                                    <button className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold text-lg rounded-full transition-all">
                                        Explore Services
                                    </button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right: Abstract Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="bg-[#0F161E] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
                                <div className="absolute top-0 right-0 w-full h-full bg-[#00D9C3]/5 blur-[80px]" />
                                <div className="grid grid-cols-2 gap-4 relative z-10">
                                    {[
                                        { label: "Avg. ROI", val: "42x", sub: "Benchmark" },
                                        { label: "Emails Sent", val: "3.8M+", sub: "Monthly" },
                                        { label: "Retention", val: "94%", sub: "Client Rate" },
                                        { label: "Expertise", val: "10+", sub: "Years" },
                                    ].map((s, i) => (
                                        <div key={i} className="p-6 bg-[#0B0F14] rounded-2xl border border-white/5 text-center">
                                            <div className="text-3xl font-black text-white mb-1">{s.val}</div>
                                            <div className="text-sm font-bold text-[#00D9C3] uppercase">{s.label}</div>
                                            <div className="text-xs text-gray-500 mt-1">{s.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* 1.5 TECH STACK SLIDER */}
            <div className="border-y border-white/5 bg-[#0B0F14]/50 backdrop-blur-sm overflow-hidden py-8">
                <Container>
                    <p className="text-center text-gray-500 text-xs font-mono uppercase tracking-widest mb-6">Powering campaigns across all major platforms</p>
                    <div className="relative flex overflow-hidden group">
                        <div className="flex animate-marquee whitespace-nowrap gap-16 px-8 min-w-full">
                            {[
                                "Klaviyo", "Mailchimp", "HubSpot", "ActiveCampaign", "Salesforce Marketing Cloud", "Braze", "Omnisend", "Customer.io", "Drip", "ConvertKit",
                                "Klaviyo", "Mailchimp", "HubSpot", "ActiveCampaign", "Salesforce Marketing Cloud", "Braze", "Omnisend", "Customer.io", "Drip", "ConvertKit"
                            ].map((tool, i) => (
                                <span key={i} className="text-xl font-bold text-gray-600 hover:text-[#00D9C3] transition-colors cursor-default select-none">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>

            {/* 2. ROI COMPARISON CHART */}
            <Section className="py-24 bg-[#080A0D] border-t border-white/5">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2"
                        >
                            <SectionHeading
                                title="The Channel That Wins"
                                subtitle="While brands chase vanity metrics on social, email quietly delivers the highest ROI of any digital channel."
                            />
                            <ul className="space-y-6 mt-8">
                                {[
                                    { icon: Mail, text: "Email reaches 4.3 billion daily users — more than any social platform." },
                                    { icon: Zap, text: "Segmented campaigns see 760% higher revenue than batch-and-blast sends." },
                                    { icon: Sparkles, text: "Automated flows work 24/7, turning your list into a revenue engine on autopilot." },
                                    { icon: BarChart3, text: "Every metric is trackable — open rates, clicks, revenue per email, LTV." }
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 + 0.5 }}
                                        className="flex gap-4 items-start"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#00D9C3]/10 flex items-center justify-center shrink-0 text-[#00D9C3]">
                                            <item.icon size={20} />
                                        </div>
                                        <p className="text-gray-300 leading-relaxed">{item.text}</p>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Bar Chart Visualization */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 w-full"
                        >
                            <div className="bg-[#0B0F14] border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">Average ROI by Channel (Per $1 Spent)</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: "Email Marketing", val: 42, color: "#00D9C3" },
                                        { label: "SEO", val: 22, color: "#34d399" },
                                        { label: "Paid Search (PPC)", val: 17, color: "#60a5fa" },
                                        { label: "Social Media Ads", val: 10, color: "#a78bfa" },
                                        { label: "Display Advertising", val: 3, color: "#f472b6" },
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-400 font-medium">{item.label}</span>
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    transition={{ delay: 1 + i * 0.1 }}
                                                    className="text-white font-bold"
                                                >
                                                    ${item.val}
                                                </motion.span>
                                            </div>
                                            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(item.val / 42) * 100}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: i * 0.1 + 0.2, type: "spring", stiffness: 50 }}
                                                    className="h-full rounded-full relative"
                                                    style={{ backgroundColor: item.color }}
                                                >
                                                    <motion.div
                                                        className="absolute inset-0 bg-white/20"
                                                        initial={{ x: "-100%" }}
                                                        animate={{ x: "100%" }}
                                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: i * 0.2 }}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-6 text-right">Source: DMA, Litmus, HubSpot 2024</p>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* 3. WHAT WE DO (Services Grid) */}
            <Section id="services" className="py-24 bg-[#0B0F14] border-t border-white/5">
                <Container>
                    <div className="text-center mb-16">
                        <SectionHeading title="Everything Your Email Program Needs" subtitle="From list growth to revenue attribution — we own the entire email lifecycle." />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Strategy & Audit", icon: ArrowRight, desc: "Deep-dive into your current email program, deliverability health, and funnel gaps. We map a revenue-first roadmap.", stat: "72h to first insights" },
                            { title: "Campaign Management", icon: Mail, desc: "We craft, schedule, A/B test, and optimize every newsletter and product launch broadcast for maximum conversions.", stat: "+38% avg open rate lift" },
                            { title: "Automation Flows", icon: Zap, desc: "Welcome sequences, abandoned cart recovery, win-back campaigns. Intelligent triggers firing 24/7.", stat: "$6.4 avg revenue per email" },
                            { title: "Segmentation", icon: Users, desc: "Behavioral and purchase-based segmentation. Dynamic content that makes subscribers feel understood.", stat: "3.2x higher conversion" },
                            { title: "List Growth", icon: TrendingUp, desc: "High-converting opt-in strategies, pop-up design, and lead magnets that systematically turn cold leads into prospects.", stat: "-70% acquisition cost" },
                            { title: "Deliverability", icon: ShieldCheck, desc: "Domain warming, DKIM/SPF/DMARC setup, and spam score monitoring. We ensure you land in the Inbox.", stat: "98% placement rate" },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="group p-8 rounded-2xl bg-[#080A0D] border border-white/5 hover:border-[#00D9C3]/40 transition-colors shadow-lg hover:shadow-[#00D9C3]/10"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#00D9C3]/10 flex items-center justify-center text-[#00D9C3] mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <s.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D9C3] transition-colors">{s.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 h-20">{s.desc}</p>
                                <div className="py-2 px-3 bg-white/5 rounded-lg border border-white/5 inline-block text-xs font-mono text-[#00D9C3]">
                                    {s.stat}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 4. HOW IT WORKS */}
            <Section className="py-24 bg-[#080A0D] border-y border-white/5 relative overflow-hidden">
                {/* Background decorative line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00D9C3]/20 to-transparent hidden lg:block" />

                <Container className="relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:w-1/3 lg:sticky lg:top-32 self-start"
                        >
                            <h2 className="text-4xl font-black text-white mb-6">From Audit to <br /><span className="text-[#00D9C3]">Revenue.</span></h2>
                            <p className="text-gray-400 text-lg">A clear, accountable 5-step process that gets campaigns live within 72 hours.</p>

                            <Link href="/contact" className="mt-8 inline-block">
                                <button className="px-6 py-3 rounded-full border border-[#00D9C3]/50 text-[#00D9C3] font-bold text-sm hover:bg-[#00D9C3]/10 transition-colors">
                                    Book Strategy Call
                                </button>
                            </Link>
                        </motion.div>

                        <div className="lg:w-2/3 grid gap-12">
                            {[
                                { step: "01", title: "Discovery Call", desc: "We learn your goals, audience, tech stack, and existing results in a 45-min deep-dive." },
                                { step: "02", title: "Full ESP Audit", desc: "We analyse your list health, deliverability, past campaigns, and automation gaps." },
                                { step: "03", title: "Strategy Blueprint", desc: "Custom email calendar, segmentation map, automation flow architecture, and KPI targets." },
                                { step: "04", title: "Build & Launch", desc: "We design, copy-write, code, and deploy campaigns and flows — live within 72 hours." },
                                { step: "05", title: "Optimise & Scale", desc: "Weekly reporting, A/B testing cadence, and monthly strategy reviews." },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex gap-6 items-start group relative"
                                >
                                    <div className="text-5xl font-black text-white/5 group-hover:text-[#00D9C3]/20 transition-colors font-mono mt-[-10px] absolute -left-4 -top-4 -z-10 select-none">
                                        {item.step}
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-[#00D9C3]/30 bg-[#0B0F14] flex items-center justify-center shrink-0 text-[#00D9C3] font-bold z-10 shadow-[0_0_20px_-5px_rgba(0,217,195,0.3)]">
                                        {i + 1}
                                    </div>
                                    <div className="pt-2">
                                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#00D9C3] transition-colors">{item.title}</h4>
                                        <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 5. PRICING (Using ServicePricing Component) */}
            <ServicePricing serviceName="Email Marketing" plans={pricingPlans} />

            {/* 6. TESTIMONIALS */}
            <Section className="py-24 bg-[#080A0D] border-t border-white/5">
                <Container>
                    <div className="text-center mb-16">
                        <SectionHeading title="Proven Results" subtitle="Numbers our clients actually brag about." />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Roth", role: "CMO · Luminary Beauty Co.", text: "DigiHub rebuilt our entire email program. Within 60 days, open rates jumped from 14% to 41% and revenue tripled.", start: 5 },
                            { name: "Mark Alderton", role: "CEO · Verve Athletic Gear", text: "We had no strategy. DigiHub rebuilt our segments and launched 6 flows in 3 weeks. Our abandoned cart now generates $18k/month.", start: 5 },
                            { name: "Priya Lakhani", role: "Founder · NutraCore", text: "Professional, data-driven, and truly invested. They helped us build a 6-figure recurring revenue stream from our list.", start: 5 },
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="bg-[#0B0F14] border border-white/5 p-8 rounded-2xl relative shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex gap-1 mb-6 text-[#00D9C3]">
                                    {[...Array(5)].map((_, i) => <Sparkles key={i} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-300 mb-8 italic leading-relaxed">"{t.text}"</p>
                                <div>
                                    <div className="font-bold text-white">{t.name}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{t.role}</div>
                                </div>
                                <div className="absolute top-8 right-8 text-[#00D9C3]/10">
                                    <Sparkles size={40} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 7. WHY DIGIHUB (Trust Badges) */}
            <Section className="py-24 bg-[#0B0F14] border-t border-white/5">
                <Container>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { title: "10+ Years Experience", desc: "A decade of hands-on results across global markets.", icon: Sparkles },
                            { title: "No Lock-in Contracts", desc: "We earn your business every single month.", icon: Lock },
                            { title: "Revenue Reporting", desc: "See exactly what each email earns — tied to your bottom line.", icon: BarChart3 },
                            { title: "GDPR & CAN-SPAM", desc: "Full compliance management built into every campaign.", icon: ShieldCheck },
                            { title: "72-Hour Launch", desc: "From signed brief to live campaign in 3 business days.", icon: Zap },
                            { title: "Global Client Base", desc: "Serving brands across 18 countries with localized strategy.", icon: Globe },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[#00D9C3] border border-white/10 group-hover:bg-[#00D9C3] group-hover:text-black transition-colors duration-300 shadow-lg group-hover:shadow-[#00D9C3]/50">
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2 group-hover:text-[#00D9C3] transition-colors">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 8. CTA */}
            <div className="mb-[-1px] bg-[#0B0F14] border-t border-white/5">
                <div className="py-24">
                    <ConsultationFormSection
                        source="email-page-v2"
                        title="Ready to Monetize Your List?"
                        subtitle="Book a free 30-minute email audit. We'll show you exactly where the money is being left on the table."
                    />
                </div>
            </div>
        </main>
    );
}

const SectionHeading = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">{title}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">{subtitle}</p>
    </>
);

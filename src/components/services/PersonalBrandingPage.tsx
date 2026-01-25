"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
    ArrowRight, CheckCircle2, AlertTriangle, TrendingUp, Users,
    Award, Mic, PenTool, Linkedin, Twitter, Globe,
    Briefcase, Building2, User, Star, Rocket, Target, Zap, BarChart3,
    Newspaper, MessageSquare, Layout, Share2, XCircle
} from "lucide-react";
import Link from "next/link";
import { ServicePricing } from "@/components/sections/ServicePricing";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";

export function PersonalBrandingPage({ plans }: { plans?: any[] }) {

    const faqs = [
        { q: "How long until I see leads from my personal brand?", a: "Typically, clients see increased engagement within 30 days and qualified inbound inquiries within 60-90 days of consistent execution. True industry authority takes 6-12 months of sustained output." },
        { q: "Do you write all the content for me?", a: "Yes. Our 'Executive Ghostwriting' service handles strategy, drafting, and optimization. We interview you to capture your unique voice, then turn your insights into high-performing content. You just review and approve." },
        { q: "Who owns the content and the account?", a: "You own everything. 100%. We work on your behalf, but the IP, the followers, and the account assets remain your property forever." },
        { q: "Do I have to sign a long-term contract?", a: "Our standard engagements start with a 3-month anchor period to ensure we gather enough data to prove ROI. After that, we move to a flexible month-to-month model." },
        { q: "What about media placements and PR?", a: "Our Authority and Custom tiers include active PR pitching to get you featured in industry podcasts, guest blogs, and digital publications." },
        { q: "How much time does this require from me?", a: "About 60-90 minutes per month. We schedule a monthly strategy call to download your thoughts, and you spend a few minutes weekly reviewing drafts." },
        { q: "What platforms do you specialize in?", a: "We primarily build authority on LinkedIn (for B2B/Corporate) and X/Twitter (for tech/startups). We also repurpose content for newsletters and personal websites." },
        { q: "Can you help me get verified?", a: "While we cannot 'buy' verification, our PR and press strategies are designed to build the notability requirements that platforms look for when granting verification." }
    ];

    // Fallback/Specific Pricing for Personal Branding if not passed or needed override
    const brandingPlans = [
        {
            id: 'branding-starter',
            title: 'Starter',
            price: "24999",
            currency: 'INR',
            billing_cycle: 'month',
            is_popular: false,
            description: "For founders just getting started with LinkedIn.",
            features: [
                "LinkedIn Profile Optimization",
                "8 High-Impact Posts / Month",
                "Weekly Analytics Report",
                "Strategy Call (Monthly)",
                "Social Selling Playbook"
            ]
        },
        {
            id: 'branding-growth',
            title: 'Growth',
            price: "69999",
            currency: 'INR',
            billing_cycle: 'month',
            is_popular: true,
            description: "For executives ready to dominate their niche.",
            features: [
                "LinkedIn + X (Twitter) Management",
                "15 High-Impact Posts / Month",
                "Carousel & Visual Content Design",
                "Daily Community Engagement (30 mins)",
                "Newsletter Strategy & Writing",
                "Quarterly Content Roadmap"
            ]
        },
        {
            id: 'branding-authority',
            title: 'Authority',
            price: "Custom",
            currency: 'INR',
            billing_cycle: 'month',
            is_popular: false,
            description: "Full-service reputation management & PR.",
            features: [
                "Omnichannel (LI, X, YT Scripts)",
                "Daily Content & Engagement",
                "Active PR & Podcast Pitching",
                "Lead Magnet Creation",
                "Personal Website Optimization",
                "Crisis Management Support"
            ]
        }
    ];

    const displayPlans = (plans && plans.length > 0) ? plans : brandingPlans;

    return (
        <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden selection:bg-blue-500/30 font-sans">

            {/* 1. HERO SECTION - Outcome Driven */}
            <Section className="pt-32 pb-20 relative">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-60" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] opacity-60" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
                </div>

                <Container className="relative z-10 py-25">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            Build a Personal Brand That Attracts 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Clients, Media & Opportunities
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                            We help founders, executives, and creators grow real influence on LinkedIn, media, and search—with strategy, content, and PR-driven positioning.
                        </p>

                        {/* Trust Strip in Hero */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 100+ Leaders Scaled
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <TrendingUp className="w-4 h-4 text-green-500" /> 3x Engagement Growth
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <Newspaper className="w-4 h-4 text-blue-400" /> Featured in Industry Media
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Link href="/contact">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_-5px_var(--color-blue-500)] transition-all hover:scale-105 font-bold">
                                    Get Free Brand Audit
                                </Button>
                            </Link>
                            <Link href="#case-studies">
                                <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 text-gray-300 transition-all">
                                    See Case Studies
                                </Button>
                            </Link>
                        </div>

                        {/* Mini Dashboard Visual */}
                        <div className="mt-16 relative mx-auto max-w-3xl transform hover:scale-[1.01] transition-transform duration-500">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20" />
                            <div className="relative rounded-2xl bg-[#0f141a] border border-white/10 p-4 shadow-2xl">
                                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono">digihub_authority_dashboard.exe</div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Profile Views</div>
                                        <div className="text-2xl font-bold text-white">12,450</div>
                                        <div className="text-green-400 text-xs flex justify-center items-center gap-1"><TrendingUp className="w-3 h-3" /> +124%</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Inbound Leads</div>
                                        <div className="text-2xl font-bold text-white">48</div>
                                        <div className="text-green-400 text-xs flex justify-center items-center gap-1"><TrendingUp className="w-3 h-3" /> +3x</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/10">
                                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Media Mentions</div>
                                        <div className="text-2xl font-bold text-white">7</div>
                                        <div className="text-green-400 text-xs flex justify-center items-center gap-1"><TrendingUp className="w-3 h-3" /> <Star className="w-3 h-3 inline" /> New</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 2. WHO THIS IS FOR (Buyer Qualification) */}
            <Section className="py-20 bg-white/[0.02] border-y border-white/5">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Who This Is For</h2>
                        <p className="text-gray-400">We specialize in building authority for specific high-stakes roles.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { title: "Startup Founders", desc: "Attract investors & talent.", icon: Rocket },
                            { title: "CXOs & Consultants", desc: "Command higher fees.", icon: Briefcase },
                            { title: "Coaches & Creators", desc: "Monetize audience.", icon: User },
                            { title: "Agency Owners", desc: "Stop chasing leads.", icon: Building2 }
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-xl bg-[#0B0F14] border border-white/10 hover:border-blue-500/50 transition-all text-center group">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/5 group-hover:bg-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-500 transition-colors">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 3. PROBLEMS YOU'RE FACING */}
            <Section className="py-24 bg-[#0B0F14]">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">
                                The Cost of Being Invisible
                            </h2>
                            <p className="text-gray-400 mb-8">
                                Your expertise is real, but your digital presence is silent.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Invisible on LinkedIn?",
                                    "Zero inbound leads?",
                                    "Weak narrative?",
                                    "Inconsistent posting?"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">What Is Personal Branding?</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                It is the strategic positioning of YOU as a category leader across social platforms, media, and search. It's not about vanity metrics—it's about revenue, trust, and leverage.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 5. OUR PROPRIETARY FRAMEWORK */}
            <Section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/5" />
                <Container className="relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            The Digihub <span className="text-blue-500">Authority Engine™</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4">
                        {[
                            { step: "01", title: "Narrative Design", desc: "Positioning Strategy", time: "Week 1-2" },
                            { step: "02", title: "Platform Setup", desc: "Profile Optimization", time: "Week 2" },
                            { step: "03", title: "Content Engine", desc: "Production & Systems", time: "Ongoing" },
                            { step: "04", title: "PR & Outreach", desc: "Media Placements", time: "Month 2+" },
                            { step: "05", title: "Monetization", desc: "Funnel Conversion", time: "Month 3+" }
                        ].map((item, i) => (
                            <div key={i} className="group p-6 rounded-2xl bg-[#0B0F14] border border-white/10 hover:border-blue-500/40 hover:bg-white/5 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-2xl font-bold text-white/10 group-hover:text-blue-500/50 transition-colors">{item.step}</div>
                                    <div className="text-[10px] uppercase font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">{item.time}</div>
                                </div>
                                <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 6. CASE STUDIES & PROOF */}
            <Section id="case-studies" className="py-24 bg-white/[0.02]">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Real Results. Real ROI.</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">S</div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">SaaS Founder</h4>
                                    <p className="text-xs text-gray-500">Series A Tech</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-6 italic">"Went from 0 to 15k followers. 4.2x increase in inbound investor leads."</p>
                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                                <div>
                                    <div className="text-xl font-bold text-white">4.2x</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Lead Vol</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">15k</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Followers</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white">M</div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Marketing Consultant</h4>
                                    <p className="text-xs text-gray-500">Agency Owner</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-6 italic">"Booked 3 keynote speeches and doubled my retainer fee within 90 days."</p>
                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                                <div>
                                    <div className="text-xl font-bold text-white">3</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Keynotes</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">2x</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Revenue</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold text-white">F</div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Fintech CEO</h4>
                                    <p className="text-xs text-gray-500">Enterprise B2B</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-6 italic">"Digihub's ghostwriting is flawless. Hits my voice perfectly. Saves 10hrs/week."</p>
                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                                <div>
                                    <div className="text-xl font-bold text-white">10h</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Saved/Wk</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">Top 1%</div>
                                    <div className="text-[10px] text-gray-500 uppercase">SSI Score</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 7. WHAT YOU GET EVERY MONTH (Deliverables) */}
            <Section className="py-24 bg-[#0B0F14]">
                <Container>
                    <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-3xl border border-white/10 p-8 md:p-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-white mb-2">What You Get Every Month</h2>
                            <p className="text-gray-400">Consistent execution is the secret to authority.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-400"><Layout className="w-6 h-6" /></div>
                                <h4 className="font-bold text-white mb-1">8-15 Posts</h4>
                                <p className="text-xs text-gray-500">Optimized for LinkedIn & X</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center mb-4 text-purple-400"><Share2 className="w-6 h-6" /></div>
                                <div className="font-bold text-white mb-1">Daily Engagement</div>
                                <p className="text-xs text-gray-500">30 mins community building</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400"><BarChart3 className="w-6 h-6" /></div>
                                <div className="font-bold text-white mb-1">Analytics Report</div>
                                <p className="text-xs text-gray-500">Growth & Lead Tracking</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 text-yellow-400"><Mic className="w-6 h-6" /></div>
                                <div className="font-bold text-white mb-1">Strategy Call</div>
                                <p className="text-xs text-gray-500">Monthly deep-dive</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 8. PROJECTED OUTCOMES */}
            <Section className="py-20 bg-white/[0.02]">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center justify-center p-8 border border-white/5 rounded-2xl bg-[#0B0F14]">
                            <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">200%</div>
                            <div className="text-gray-400 font-medium">Avg. Engagement Growth</div>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 border border-white/5 rounded-2xl bg-[#0B0F14]">
                            <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">3-5x</div>
                            <div className="text-gray-400 font-medium">Increase in Inbound Leads</div>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 border border-white/5 rounded-2xl bg-[#0B0F14]">
                            <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">6-12</div>
                            <div className="text-gray-400 font-medium">Months to Industry Authority</div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 9. PRICING WITH ANCHORS */}
            <Section id="pricing" className="py-24 bg-[#0B0F14]">
                <ServicePricing serviceName="Personal Branding" plans={displayPlans} />
                <div className="text-center mt-12">
                    <p className="text-gray-400 mb-4 text-sm">All plans include a 3-month anchor agreement, then month-to-month flexibility.</p>
                </div>
            </Section>

            {/* 10. MID-PAGE LEAD CAPTURE - SLIM BANNER */}
            <div className="bg-blue-600 py-12">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">Get a Free LinkedIn Authority Scorecard</h3>
                            <p className="text-blue-100">See exactly where you stand against the top 1% of creators.</p>
                        </div>
                        <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 h-12 rounded-full shadow-xl">
                            Get My Scorecard
                        </Button>
                    </div>
                </Container>
            </div>

            {/* 11. FAQ */}
            <Section id="faq" className="py-24 bg-white/[0.01]">
                <Container className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group border border-white/10 rounded-lg bg-white/[0.02] px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-white hover:text-blue-400 transition-colors font-medium text-lg">
                                    {faq.q}
                                    <span className="shrink-0 rounded-full border border-white/20 p-1.5 text-white group-open:rotate-45 group-open:bg-white/10 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-400 leading-relaxed group-open:animate-in group-open:fade-in group-open:slide-in-from-top-1 text-sm">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 12. FINAL CLOSE */}
            <Section className="py-32 relative overflow-hidden text-center border-t border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[160px]" />
                <Container className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to become the <br /> go-to expert in your industry?</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Don't let another month go by being the "best kept secret."</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg" className="h-14 px-12 text-lg shadow-[0_0_20px_-5px_var(--color-blue-500)] bg-blue-600 hover:bg-blue-500 text-white transition-all font-bold rounded-full">Book Your Strategy Call</Button>
                        </Link>
                    </div>
                </Container>
            </Section>

            {/* FOOTER AUTHORITY SIGNALS (Placeholder) */}
            <Section className="py-12 border-t border-white/10 bg-[#080a0e] text-center md:text-left">
                <Container>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h4 className="font-bold text-white mb-2">Digihub Solutions</h4>
                            <p className="text-sm text-gray-500 mb-4">Premium Digital Growth Agency.</p>
                            <div className="text-xs text-gray-600">
                                Registered Office: 123 Startup Hub, Bangalore, KA, India<br />
                                GST: 29ABCDE1234F1Z5
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Certifications</h4>
                            <div className="flex gap-2 justify-center md:justify-start">
                                <div className="h-8 px-3 bg-white/5 rounded border border-white/10 flex items-center text-[10px] text-gray-400">LinkedIn Certified</div>
                                <div className="h-8 px-3 bg-white/5 rounded border border-white/10 flex items-center text-[10px] text-gray-400">HubSpot Partner</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Featured In</h4>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start text-gray-500 text-xs">
                                <span>Forbes</span> • <span>Inc42</span> • <span>YourStory</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 13. STICKY BOTTOM CTA */}
            <div className="fixed bottom-0 left-0 w-full bg-[#0B0F14]/90 backdrop-blur-md border-t border-white/10 py-4 z-50">
                <Container>
                    <div className="flex justify-between items-center gap-4">
                        <div className="hidden md:block">
                            <h4 className="text-white font-bold text-sm">Free LinkedIn Authority Scorecard</h4>
                            <p className="text-[10px] text-gray-400">Limited slots available for this week.</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <Link href="#pricing" className="flex-1 md:flex-none">
                                <Button size="sm" variant="outline" className="w-full border-white/10 text-gray-300 hover:bg-white/5 rounded-full">
                                    See Pricing
                                </Button>
                            </Link>
                            <Link href="/contact" className="flex-1 md:flex-none">
                                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg shadow-blue-500/20">
                                    Get Scorecard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

        </main>
    );
}

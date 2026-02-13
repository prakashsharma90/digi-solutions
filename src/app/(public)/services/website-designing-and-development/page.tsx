"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
    Code2,
    Smartphone,
    Zap,
    Layout,
    Rocket,
    ShieldCheck,
    Search,
    BarChart,
    Globe,
    Monitor,
    CheckCircle2,
    ArrowRight,
    ShoppingBag,
    RefreshCw,
    Settings,
    Plus,
    Minus,
    Star,
    Quote,
    Clock,
    HelpCircle,
    Mail,
    Phone,
    Layers,
    MousePointerClick,
    ChevronDown,
    Award,
    TrendingUp,
    BarChart3,
    Heart,
    MessageCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export default function WebDevPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-manrope">
            <Hero />
            <ServicesBreakdown />
            <ProcessSection />
            <Differentiators />
            <PortfolioSection />
            <TechStack />
            <PricingSection />
            <Testimonials />
            <FAQSection />
            <FinalCTA />
        </main>
    );
}

// 1. HERO SECTION
function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

    return (
        <section ref={containerRef} className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#0a0a0a]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,217,195,0.15)_0%,transparent_70%)]" />

            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 right-[10%] w-[600px] h-[600px] bg-[#00D9C3]/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-20 left-[10%] w-[500px] h-[500px] bg-[#00F5E0]/5 rounded-full blur-[150px]" />
            </div>

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div style={{ y }} className="text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-[#00D9C3]/10 border border-[#00D9C3]/20 rounded-full px-4 py-2 mb-8"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#00D9C3] animate-ping" />
                            <span className="text-[10px] font-black text-[#00D9C3] tracking-[0.2em] uppercase">High Performance Web Solutions</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-hero mb-8"
                        >
                            Your Website Should <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9C3] via-[#00F5E0] to-[#00D9C3]">
                                Work as Hard as You Do
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-body mb-12 max-w-xl text-gray-400"
                        >
                            We build websites that actually bring in customers—not just sit there looking pretty.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-wrap gap-6"
                        >
                            <Link href="/contact" className="group px-8 py-4 bg-[#00D9C3] text-black btn-text rounded-full hover:shadow-[0_0_40px_rgba(0,217,195,0.4)] transition-all duration-300 flex items-center gap-2">
                                Let's Talk About Your Project
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#portfolio" className="px-8 py-4 border-2 border-white/10 rounded-full btn-text hover:bg-white/5 transition-all text-white backdrop-blur-sm">
                                See What We've Built
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2026"
                                alt="Modern Web Analytics Dashboard"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/40 to-transparent" />
                        </div>
                        {/* Floating Metric */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-8 -left-8 bg-white/5 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-2xl z-20"
                        >
                            <div className="text-[#00D9C3] text-3xl font-black mb-1">99.9%</div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Page Speed Score</div>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

// 2. SERVICES OVERVIEW
function ServicesBreakdown() {
    const services = [
        {
            title: "Custom Website Design",
            icon: Layout,
            desc: "We create custom websites that reflect your brand, engage your audience, and drive results—no templates, just truly yours.",
            for: "Anyone tired of looking like everyone else online"
        },
        {
            title: "Website Development",
            icon: Code2,
            desc: "Clean code, lightning-fast loading, and a strong foundation—built to perform, whether your site is simple or complex.",
            for: "Businesses that want a site that actually works properly"
        },
        {
            title: "E-commerce Setup",
            icon: ShoppingBag,
            desc: "We set up your online store with secure payments, inventory tracking, and smooth checkout—easy to buy, easy to manage.",
            for: "Anyone ready to start selling products or services online"
        },
        {
            title: "Mobile-Friendly Design",
            icon: Smartphone,
            desc: "We ensure your site looks perfect on phones, tablets, and desktops—so you never lose customers on mobile.",
            for: "Pretty much everyone (seriously, check your site on your phone right now)"
        },
        {
            title: "Website Makeover",
            icon: RefreshCw,
            desc: "Got an old site that's making you cringe? We'll bring it into 2026. Fresh design, better speed, easier to use—and we'll make sure you don't lose your Google rankings in the process.",
            for: "Anyone whose website still looks like it's from 2015"
        },
        {
            title: "Easy Content Updates",
            icon: Layers,
            desc: "We'll set you up with a system where you can update your own content—add blog posts, change text, upload images. No need to call a developer every time you want to change something.",
            for: "Teams who want to manage their own content"
        },
        {
            title: "Landing Pages",
            icon: MousePointerClick,
            desc: "Need a page for a specific campaign or product? We create focused pages designed to get people to take action—sign up, buy, download, whatever your goal is.",
            for: "Marketing campaigns, new product launches, special promotions"
        },
        {
            title: "Website Support",
            icon: ShieldCheck,
            desc: "Websites need regular care—updates, backups, fixing things that break. We handle all of that so you don't have to worry about it.",
            for: "Anyone who doesn't want to deal with technical headaches"
        }
    ];

    return (
        <Section className="bg-[#0f0f0f]">
            <Container>
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-section mb-6">What We Can Do For You</h2>
                    <p className="text-body max-w-3xl mx-auto text-gray-400">Standard-setting solutions for businesses that mean business.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#00D9C3]/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#00D9C3]/10 flex items-center justify-center mb-6">
                                <s.icon className="w-6 h-6 text-[#00D9C3]" />
                            </div>
                            <h4 className="text-[18px] font-black mb-3 tracking-tight">{s.title}</h4>
                            <p className="text-[14px] leading-relaxed mb-6 flex-grow text-gray-500">{s.desc}</p>

                            <div className="pt-4 border-t border-white/5">
                                <div className="text-[10px] text-[#00D9C3] uppercase tracking-[0.2em] font-black mb-1">
                                    WHO NEEDS THIS:
                                </div>
                                <div className="text-[13px] text-gray-500 font-bold leading-tight">
                                    {s.for}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

// 3. PROCESS SECTION
function ProcessSection() {
    const steps = [
        { num: "01", week: "Week 1", title: "Getting to Know You", desc: "We start with a proper conversation. What's your business about? Who are your customers? What do you actually need? We also look at what your competitors are doing and figure out how to make you stand out.", get: "A clear plan for your project" },
        { num: "02", week: "Week 2-3", title: "Design Time", desc: "Our designers create a few different looks for your site. You tell us what you like, what you don't, and we refine it until it's exactly what you want. No surprises later.", get: "Visual designs showing exactly how your site will look" },
        { num: "03", week: "Week 3-4", title: "Content", desc: "Either you give us your text and images, or we help you create them. We make sure everything's written well and optimized so Google can find you.", get: "All your content ready to go" },
        { num: "04", week: "Week 4-6", title: "Building It", desc: "This is where we actually build the site. All the clicking, scrolling, forms, and features get coded and connected. We keep you updated on progress.", get: "A working website (not live yet, but functional)" },
        { num: "05", week: "Week 7", title: "Testing Everything", desc: "We test on different phones, tablets, browsers—making sure nothing breaks and everything loads fast. We fix any bugs and double-check that all the features work.", get: "Confidence that everything actually works" },
        { num: "06", week: "Week 8", title: "Launch Day & Beyond", desc: "We put your site live, show you how to use it, and stick around to make sure everything runs smoothly. Plus we're here if you need help later.", get: "Your new website, training, and ongoing support" }
    ];

    return (
        <Section id="process" className="bg-[#0a0a0a] relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9C3]/20 to-transparent -z-10 hidden lg:block" />
            <Container>
                <div className="text-center mb-24">
                    <h2 className="text-section mb-6">Here's How It Actually Works</h2>
                    <p className="text-body text-gray-400">A systematic timeline to ship your digital excellence.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#00D9C3]/50 transition-all flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-[#00D9C3] flex items-center justify-center shadow-[0_0_15px_rgba(0,217,195,0.2)]">
                                    <span className="text-[18px] font-black text-white">{step.num}</span>
                                </div>
                                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-[0.2em] text-[#00D9C3] uppercase">
                                    {step.week}
                                </div>
                            </div>
                            <h3 className="text-[20px] font-black mb-4">{step.title}</h3>
                            <p className="text-[15px] leading-relaxed mb-6 flex-grow text-gray-500">{step.desc}</p>
                            <div className="mt-auto p-4 bg-[#00D9C3]/5 border border-[#00D9C3]/20 rounded-2xl">
                                <div className="text-[10px] font-black text-[#00D9C3] uppercase tracking-[0.1em] mb-1">WHAT YOU GET:</div>
                                <div className="text-[13px] text-white font-bold">{step.get}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

// 4. WHY WORK WITH US
function Differentiators() {
    const diffs = [
        { title: "We Focus on What Actually Matters", icon: TrendingUp, desc: "Pretty designs are nice, but what really matters is whether your website brings in business. We focus on making sites that convert visitors into customers." },
        { title: "We Know What We're Doing", icon: Zap, desc: "Fast loading times, clean code, proper security, shows up on Google—we handle all the technical stuff that makes a real difference." },
        { title: "No Confusing Tech Jargon", icon: MessageCircle, desc: "We explain things in plain language. You'll always know what's happening with your project, no decoder ring needed." },
        { title: "Your Site Will Work on Any Device", icon: Smartphone, desc: "More than half your visitors are probably on their phones. We design for mobile first, then make it work everywhere else." },
        { title: "We Don't Disappear After Launch", icon: Heart, desc: "Lots of companies build your site and vanish. We stick around. Need updates? Having issues? We're here." },
        { title: "We've Done This Before", icon: Award, desc: "6+ years doing this, 200+ websites built. We've probably solved whatever challenge you're facing." }
    ];

    return (
        <Section className="bg-[#0f0f0f] border-y border-white/5">
            <Container>
                <div className="text-center mb-24">
                    <h2 className="text-section mb-6">Why Choose Us? Fair Question.</h2>
                    <p className="text-body text-gray-400 font-medium">We aren't just developers; we're your technical partners in growth.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {diffs.map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#00D9C3]/10 border border-[#00D9C3]/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <d.icon size={32} className="text-[#00D9C3]" />
                            </div>
                            <h3 className="text-[22px] font-black mb-4 leading-tight">{d.title}</h3>
                            <p className="text-[15px] text-gray-500 font-medium leading-relaxed">{d.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

// 5. PORTFOLIO SECTION
function PortfolioSection() {
    const projects = [
        {
            title: "FinTech Hub Redesign",
            industry: "Financial Services",
            results: "+240% Lead Gen",
            tech: "Next.js / Tailwind",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
        },
        {
            title: "EcoShop E-com",
            industry: "Sustainable Retail",
            results: "4s to 0.8s Load Speed",
            tech: "Shopify / Custom Liquid",
            img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=2070"
        },
        {
            title: "Aura Luxury Real Estate",
            industry: "Real Estate",
            results: "Digital Brand of the Year",
            tech: "React / Three.js",
            img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2073"
        }
    ];

    return (
        <Section id="portfolio" className="bg-[#0a0a0a]">
            <Container>
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-section">Selected Work.</h2>
                        <p className="text-body text-gray-500 font-medium">Results achieved for industry leaders.</p>
                    </div>
                    <Link href="/portfolio" className="flex items-center gap-2 font-bold text-[#00D9C3] group text-nav">
                        VIEW ALL PROJECTS
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5"
                        >
                            <div className="aspect-[4/3] relative">
                                <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="text-[10px] font-black text-[#00D9C3] tracking-[0.3em] uppercase">{p.industry}</div>
                                <h3 className="text-[24px] font-black">{p.title}</h3>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <div className="text-[13px] text-gray-400">Impact: <span className="text-white font-bold">{p.results}</span></div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{p.tech}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

// 6. TECH STACK (INFINITE SLIDER)
function TechStack() {
    const techs = [
        "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
        "Shopify", "WordPress", "AWS", "Vercel", "Figma",
        "Supabase", "PostgreSQL", "Framer Motion", "Stripe",
        "Algolia", "Sanity", "Three.js", "Python", "Google Cloud",
        "Redux", "Prisma", "Drizzle", "Adobe CC", "MongoDB"
    ];

    const scrollingTechs = [...techs, ...techs];

    return (
        <div className="py-24 bg-[#0f0f0f] border-y border-white/5 overflow-hidden">
            <div className="text-center mb-16 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">
                Built With World-Class Technology
            </div>

            <div className="relative flex">
                <motion.div
                    className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
                    animate={{ x: [0, -2000] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {scrollingTechs.map((t, i) => (
                        <span
                            key={i}
                            className="text-3xl md:text-5xl font-black tracking-tighter text-white/10 hover:text-[#00D9C3] transition-colors cursor-default"
                        >
                            {t}
                        </span>
                    ))}
                </motion.div>

                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10" />
            </div>
        </div>
    );
}

// 7. PRICING SECTION
function PricingSection() {
    const tiers = [
        {
            name: "Basic Package",
            price: "₹60,000",
            desc: "Good for small businesses just getting started.",
            features: ["5 pages", "Works on all devices", "Contact form", "Basic Google optimization", "1 month support after launch", "Done in 2-3 weeks"]
        },
        {
            name: "Business Package",
            price: "₹1,50,000",
            desc: "Most popular—for growing businesses.",
            features: ["10 pages", "Custom design", "Blog setup", "Google Analytics tracking", "Easy content management system", "Social media links", "Better SEO optimization", "3 months support", "Done in 4-6 weeks"],
            featured: true
        },
        {
            name: "Premium Package",
            price: "₹3,50,000+",
            desc: "For established businesses with bigger needs.",
            features: ["As many pages as you need", "Online store if needed", "Custom features", "Connects with your other tools", "Premium hosting", "6 months priority support", "Done in 6-8 weeks"]
        }
    ];

    return (
        <Section className="bg-[#0a0a0a]">
            <Container>
                <div className="text-center mb-20">
                    <h2 className="text-section mb-6">What Does It Cost?</h2>
                    <p className="text-body text-gray-500 font-medium">Simple, transparent pricing. No hidden fees.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {tiers.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: t.featured ? 1.05 : 1 }}
                            className={cn(
                                "p-12 rounded-[3rem] relative overflow-hidden transition-all duration-500 flex flex-col",
                                t.featured ? "bg-gradient-to-br from-[#00D9C3]/20 to-[#0a0a0a] border-2 border-[#00D9C3]" : "bg-white/[0.02] border border-white/5"
                            )}
                        >
                            {t.featured && (
                                <div className="absolute top-8 right-8 bg-[#00D9C3] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Most Popular</div>
                            )}
                            <h3 className="text-[24px] font-black mb-2">{t.name}</h3>
                            <div className="text-[48px] font-black mb-6 text-[#00D9C3] leading-none">{t.price}</div>
                            <p className="text-[15px] text-gray-400 mb-10 leading-relaxed font-bold">{t.desc}</p>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {t.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-4 text-[15px] font-bold text-gray-300">
                                        <CheckCircle2 size={18} className="text-[#00D9C3] shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/contact" className={cn(
                                "w-full py-5 rounded-full btn-text text-center block transition-all",
                                t.featured ? "bg-[#00D9C3] text-black hover:shadow-[0_0_40px_rgba(0,217,195,0.5)]" : "bg-white/10 text-white hover:bg-white/20"
                            )}>
                                Choose {t.name}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 text-center">
                    <h3 className="text-[28px] font-black mb-4">Need Something Different?</h3>
                    <p className="text-[16px] text-gray-400 font-medium mb-8">Every business is different. If none of these fit, let's talk and figure out what makes sense for you.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-nav font-black text-[#00D9C3] group">
                        LET'S BUILD YOUR DREAM SITE
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </Container>
        </Section>
    );
}

// 8. TESTIMONIALS — Auto-playing Multi-item Carousel
function Testimonials() {
    const reviews = [
        { name: "Sarah Jenkins", company: "TechPulse Solutions", text: "Within 3 months of launching our new site, we got 145% more inquiries. Plus it actually looks professional now instead of like something from 2012.", stars: 5 },
        { name: "James Wilson", company: "Growth Group", text: "They took our messy ideas and made them make sense. The site looks great and we can actually update it ourselves now.", stars: 5 },
        { name: "Emily Chen", company: "Luxe Retail", text: "Best money we've spent on the business. Our online sales doubled. The team was patient with all our questions and actually delivered on time.", stars: 5 },
        { name: "Michael Ross", company: "Nexus Fintech", text: "The page speed improvements alone were worth the investment. Our search rankings jumped significantly after the redesign.", stars: 5 },
        { name: "Sophia Martinez", company: "Veridian Creative", text: "Extremely professional team. They understood our brand voice perfectly and translated it into a stunning digital experience.", stars: 5 },
        { name: "David Wright", company: "Wright Logistics", text: "Finally a developer team that actually understands business goals. Our conversion rate tripled in the first month.", stars: 5 },
        { name: "Lisa Thompson", company: "Thompson Law", text: "I was skeptical about the ROI, but the results speak for themselves. This site is far ahead of our competitors.", stars: 5 }
    ];

    const totalSlides = reviews.length;
    const gap = 32; // gap-8 = 32px

    // Clone first 3 at the end for seamless loop
    const extendedReviews = [...reviews, ...reviews.slice(0, 3)];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Measure container width on mount and resize
    useEffect(() => {
        const measure = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // Responsive visible count
    const getVisibleCount = () => {
        if (typeof window === "undefined") return 3;
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    const visibleCount = typeof window !== "undefined" ? getVisibleCount() : 3;

    // Card width = (container - gaps) / visibleCount
    const cardWidth = containerWidth > 0
        ? (containerWidth - gap * (visibleCount - 1)) / visibleCount
        : 0;

    // Each slide step moves by exactly: cardWidth + gap
    const slideStep = cardWidth + gap;
    const translateX = -(currentIndex * slideStep);

    // Auto-play timer: 4 seconds, pauses on hover/focus
    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        }, 4000);

        return () => clearInterval(timer);
    }, [isHovered, currentIndex]);

    // Infinite loop: silently reset when reaching cloned slides
    useEffect(() => {
        if (currentIndex >= totalSlides) {
            const resetTimer = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 700);
            return () => clearTimeout(resetTimer);
        }
    }, [currentIndex, totalSlides]);

    return (
        <Section className="bg-[#0f0f0f] relative overflow-hidden py-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,195,0.03),transparent_70%)]" />
            <Container>
                <div className="text-center mb-24 space-y-4">
                    <h2 className="text-section">Here&apos;s What People Actually Think</h2>
                    <p className="text-body text-gray-400 font-medium">Real feedback from real partners we&apos;ve worked with.</p>
                </div>

                {/* Slider */}
                <div
                    ref={containerRef}
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onFocus={() => setIsHovered(true)}
                    onBlur={() => setIsHovered(false)}
                >
                    <div
                        className="flex"
                        style={{
                            gap: `${gap}px`,
                            transform: `translateX(${translateX}px)`,
                            transition: isTransitioning ? "transform 700ms ease-in-out" : "none",
                        }}
                    >
                        {extendedReviews.map((r, i) => (
                            <div
                                key={i}
                                className="shrink-0 p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 relative backdrop-blur-sm group hover:bg-white/[0.05] transition-colors duration-300"
                                style={{ width: `${cardWidth}px` }}
                            >
                                <Quote className="absolute top-10 right-10 text-[#00D9C3]/5 w-16 h-16 group-hover:text-[#00D9C3]/15 transition-colors" />
                                <div className="flex gap-1 mb-6">
                                    {[...Array(r.stars)].map((_, j) => <Star key={j} size={14} className="fill-[#00D9C3] text-[#00D9C3]" />)}
                                </div>
                                <p className="text-[18px] text-gray-200 font-bold italic mb-8 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9C3] to-[#00F5E0] flex items-center justify-center text-black font-black text-[14px] shadow-lg shadow-[#00D9C3]/20">
                                        {r.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-black text-white text-[17px]">{r.name}</div>
                                        <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{r.company}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-3 mt-16">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setIsTransitioning(true);
                                setCurrentIndex(i);
                            }}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                (currentIndex % totalSlides) === i
                                    ? "bg-[#00D9C3] w-12"
                                    : "bg-white/10 w-4 hover:bg-white/20"
                            )}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    );
}


// 9. FAQ SECTION
function FAQSection() {
    const faqs = [
        { q: "How long will it take?", a: "Usually 4-8 weeks. Simple sites are faster, complex ones take longer. We'll give you a timeline based on what you actually need." },
        { q: "What do you need from me?", a: "Your logo, brand colors, any text or images you have, and examples of sites you like. Don't have all of that? No problem—we'll help you figure it out." },
        { q: "Will it work on phones?", a: "Yes. Every single site we build works properly on phones, tablets, and computers. That's not optional anymore." },
        { q: "Can I update it myself?", a: "Absolutely. We'll set you up with an easy system to change text, add photos, write blog posts—whatever you need. And we'll show you how." },
        { q: "Do you handle hosting?", a: "We can set everything up for you, or work with whoever you're already using. Whatever makes sense for you." },
        { q: "What if I need changes later?", a: "All our packages include some support after launch. For ongoing stuff, we have monthly plans or you can just pay as you go." },
        { q: "Will people be able to find me on Google?", a: "We build in the basics—good code, fast loading, proper structure. For serious SEO work, that's a separate thing we can talk about." },
        { q: "I already have a website, can you redo it?", a: "That's actually what we do most often. We'll keep anything that's working and fix everything else." },
        { q: "Can I pay in installments?", a: "Yes—usually half upfront, then split the rest. For bigger projects we can work out a payment plan." },
        { q: "Why not just use Wix or Squarespace?", a: "Those are fine for some people. But if you want something custom that you actually own, and that's built for growth, that's where we come in." }
    ];

    return (
        <Section className="bg-[#0a0a0a]">
            <Container className="max-w-4xl">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-section mb-6 uppercase tracking-widest">QUESTIONS PEOPLE ASK</h2>
                    <p className="text-body text-gray-500 font-medium">Clear answers to your most common concerns.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <FAQItem key={i} question={f.q} answer={f.a} />
                    ))}
                </div>
            </Container>
        </Section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-white/5 rounded-[2rem] overflow-hidden bg-white/5 transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-white/[0.05] transition-colors"
            >
                <span className="text-[18px] font-black">{question}</span>
                <div className={cn("transition-transform duration-300", isOpen ? "rotate-x-180" : "")}>
                    <ChevronDown size={22} className="text-[#00D9C3]" />
                </div>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <div className="px-8 pb-8 text-[15px] text-gray-500 font-bold leading-relaxed">
                    {answer}
                </div>
            </motion.div>
        </div>
    );
}

// 10. FINAL CTA
function FinalCTA() {
    return (
        <Section className="relative py-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#00D9C3]/5 to-transparent -z-10" />
            <Container>
                <div className="max-w-6xl mx-auto rounded-[4rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-20 md:p-32 text-center backdrop-blur-3xl overflow-hidden group relative">
                    <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#00D9C3]/10 rounded-full blur-[150px] group-hover:scale-125 transition-transform duration-1000" />

                    <div className="relative z-10 space-y-12">
                        <h2 className="text-hero leading-tight">
                            Ready to Get Started?
                        </h2>

                        <p className="text-[22px] text-gray-400 max-w-4xl mx-auto font-bold leading-relaxed">
                            Book a free call and we'll figure out exactly what you need
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto text-left py-8 border-y border-white/10">
                            {[
                                "Free consultation—no sales pressure",
                                "Clear pricing—no hidden costs",
                                "Honest timeline—we tell you how long it'll actually take",
                                "Straight answers to your questions"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 text-[13px] font-black text-gray-300 leading-snug">
                                    <CheckCircle2 size={16} className="text-[#00D9C3] shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center pt-8">
                            <Link href="/contact" className="px-10 py-5 bg-[#00D9C3] text-black btn-text rounded-full hover:shadow-[0_0_50px_rgba(0,217,195,0.6)] transition-all flex items-center gap-3">
                                Schedule a Call
                                <ArrowRight size={24} />
                            </Link>

                            <div className="flex flex-col gap-3 text-left">
                                <div className="flex items-center gap-4 text-white font-black text-[18px] hover:text-[#00D9C3] transition-colors cursor-pointer">
                                    <Phone className="text-[#00D9C3] w-5 h-5" />
                                    +91-XXXXX-XXXXX
                                </div>
                                <div className="flex items-center gap-4 text-white font-black text-[18px] hover:text-[#00D9C3] transition-colors cursor-pointer">
                                    <Mail className="text-[#00D9C3] w-5 h-5" />
                                    hello@digihub.agency
                                </div>
                                <div className="flex items-center gap-4 text-white font-black text-[18px] hover:text-[#00D9C3] transition-colors cursor-pointer">
                                    <MessageCircle className="text-[#00D9C3] w-5 h-5" />
                                    WhatsApp Us
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 text-gray-600 text-[12px] font-black uppercase tracking-[0.3em]">
                            We've helped 200+ businesses get their websites sorted. Let's sort yours out too.
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

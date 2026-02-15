"use client";

import { useState, useEffect, useRef } from "react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Search, XCircle, BarChart, Layers, Globe, ShieldCheck, AlertCircle, Zap, TrendingUp, MousePointerClick, FileText, Share2, Code, Mail, Wrench, ShoppingCart, MapPin, Layout, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { ServicePricing } from "@/components/sections/ServicePricing";

export function SEOPage({ plans }: { plans?: any[] }) {
    const [activeSolution, setActiveSolution] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [activeFAQ, setActiveFAQ] = useState(0);

    // Newsletter State
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: "SEO Page"
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to subscribe");
            }

            setSuccess(true);
            setEmail("");

            // Reset success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const testimonials = [
        {
            title: "SEO Strategies Recommend",
            review: "Since implementing the SEO strategies recommended by this website, we've seen a significant increase in our organic traffic. Our website now ranks higher for relevant keywords, leading to more inquiries and ultimately, more customers.",
            name: "Catherine Jone",
            role: "Founder",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
            active: false
        },
        {
            title: "I highly Recommend",
            review: "The step-by-step guides and practical advice have been instrumental in improving our website's performance. I highly recommend this site to anyone serious about boosting their search engine rankings.",
            name: "Michael David",
            role: "Founder",
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
            active: true
        },
        {
            title: "Game-changer for Our Business",
            review: "We've experienced a noticeable improvement in our website's visibility and a positive impact on our overall marketing efforts. This SEO website has been a game-changer for our business and i wish it will be grow day by day.",
            name: "Nathalie Kett",
            role: "Founder",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
            active: false
        },
        {
            title: "SEO Strategies Recommend",
            review: "Since implementing the SEO strategies recommended by this website, we've seen a significant increase in our organic traffic. Our website now ranks higher for relevant keywords, leading to more inquiries and ultimately, more customers.",
            name: "Catherine Jone",
            role: "Founder",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
            active: false
        },
        {
            title: "I highly Recommend",
            review: "The step-by-step guides and practical advice have been instrumental in improving our website's performance. I highly recommend this site to anyone serious about boosting their search engine rankings.",
            name: "Michael David",
            role: "Founder",
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
            active: true
        },
        {
            title: "Game-changer for Our Business",
            review: "We've experienced a noticeable improvement in our website's visibility and a positive impact on our overall marketing efforts. This SEO website has been a game-changer for our business and i wish it will be grow day by day.",
            name: "Nathalie Kett",
            role: "Founder",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
            active: false
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTestimonialIndex((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const displayedTestimonials = testimonials.slice(testimonialIndex, testimonialIndex + 3);

    return (
        <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden selection:bg-primary/30">

            <Section className="py-24 md:py-32 bg-[#0B0F14] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Text Content */}
                        <div className="text-left space-y-8">
                            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.2]">
                                Drive results with our <br className="hidden lg:block" />
                                white label SEO and <br className="hidden lg:block" />
                                direct response digital <br className="hidden lg:block" />
                                marketing
                            </h1>
                            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                                We are an army of experts that specialize in modern digital marketing techniques that help you to grow your business with cutting-edge.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact">
                                    <Button className="h-14 px-8 text-sm font-bold uppercase tracking-wider rounded-md bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105">
                                        CONTACT US
                                    </Button>
                                </Link>
                                <Link href="/services">
                                    <Button variant="outline" className="h-14 px-8 text-sm font-bold uppercase tracking-wider rounded-md bg-white border-white text-black hover:bg-gray-100 hover:text-black transition-all hover:scale-105">
                                        DISCOVER MORE
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Illustration */}
                        <div className="relative hidden lg:block">
                            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                                {/* Illustration */}
                                <Image
                                    src="/quintype-website2022-0885aab0bd.png"
                                    alt="SEO Vector Illustration"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto relative z-10"
                                />

                                {/* Decorative Elements */}
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-60" />
                                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-60" />

                                {/* Floating Badge simulating the illustration's elements */}
                                <div className="absolute -bottom-6 -right-6 bg-[#111] border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20 animate-bounce-slow">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Search className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-bold uppercase">Search Volume</div>
                                        <div className="text-lg font-bold text-white">2.5M+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* NEW: Specialization Section */}
            <Section className="py-24 bg-white/[0.02] border-y border-primary/20">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Specializing in cutting-edge digital <br className="hidden md:block" /> marketing strategies
                        </h2>
                        <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            We are a dedicated digital marketing agency committed to your business growth and success where your success and growth is our focus.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1: SEO */}
                        <div className="bg-[#0B0F14] p-10 rounded-2xl text-center border border-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                                <TrendingUp className="w-10 h-10 text-gray-800" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">White Hat SEO</h3>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed px-4">
                                By carefully researching keywords and utilizing white-hat techniques, we deliver the best SEO solutions to solve.
                            </p>

                        </div>

                        {/* Card 2: SEM (Active) */}
                        <div className="bg-[#0B0F14] p-10 rounded-2xl text-center border border-primary shadow-lg shadow-primary/10 relative transform md:-translate-y-4">
                            <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
                                <BarChart className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Search Engine Marketing</h3>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed px-4">
                                By carefully researching keywords and utilizing white-hat techniques, we deliver the best SEO solutions to solve.
                            </p>

                        </div>

                        {/* Card 3: Social Media */}
                        <div className="bg-[#0B0F14] p-10 rounded-2xl text-center border border-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                                <TrendingUp className="w-10 h-10 text-gray-800" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Social Media Marketing</h3>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed px-4">
                                By carefully researching keywords and utilizing white-hat techniques, we deliver the best SEO solutions to solve.
                            </p>

                        </div>
                    </div>
                </Container>
            </Section>

            {/* NEW: Boost and Grow Traffic (SEOFix) */}
            <Section className="py-24 bg-[#0B0F14] relative overflow-hidden border-b border-primary/20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text Content */}
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                Boost and grow your website <br />
                                traffic with <span className="text-primary">SEOFix</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Unlock the full potential of your online presence and witness a significant surge in website traffic with SEOFix. Our tailored strategies are designed to not only increase the volume of visitors to your site but also to attract a more qualified audience genuinely interested in your offerings.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Experience sustainable growth your online reach & engagement, transforming website traffic into tangible business results.
                            </p>
                            <div className="pt-4">
                                <Link href="/about">
                                    <Button className="h-14 px-10 text-sm font-bold uppercase tracking-wider rounded-md bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
                                        ABOUT US
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Illustration */}
                        <div className="relative">
                            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                                <Image
                                    src="/seo-advertisement-flat-style-des.png"
                                    alt="Boost Traffic Analytics"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto relative z-10"
                                />
                                {/* Decorative Glow */}
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] opacity-60" />
                                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] opacity-60" />
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* NEW: Services We Offer (Grid Section) */}
            <Section className="py-24 bg-white/[0.02] border-b border-primary/20">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Service We offer</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We are a dedicated digital marketing agency committed to your business growth and success where your success and growth is our focus.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "SEO Audit",
                                desc: "Complete website analysis to identify SEO issues, improve performance, and unlock ranking opportunities.",
                                icon: Search,
                                active: false
                            },
                            {
                                title: "Keyword Research & Strategy",
                                desc: "Find the right keywords your audience searches for to drive targeted traffic and improve rankings.",
                                icon: TrendingUp,
                                active: false
                            },
                            {
                                title: "On-Page SEO",
                                desc: "Optimize page content, headings, meta tags, and structure to improve visibility on search engines.",
                                icon: FileText,
                                active: true
                            },
                            {
                                title: "Technical SEO",
                                desc: "Improve website speed, indexing, mobile performance, and technical structure for better SEO results.",
                                icon: Wrench,
                                active: false
                            },
                            {
                                title: "Off-Page SEO (Link Building)",
                                desc: "Build strong authority through quality backlinks, brand mentions, and strategic outreach.",
                                icon: Share2,
                                active: false
                            },
                            {
                                title: "Local SEO",
                                desc: "Increase local visibility and attract nearby customers through location-based optimization.",
                                icon: MapPin,
                                active: false
                            },
                            {
                                title: "Content SEO",
                                desc: "Create and optimize SEO-friendly content that drives traffic and improves search rankings.",
                                icon: Layout,
                                active: false
                            },
                            {
                                title: "E-Commerce SEO",
                                desc: "Optimize product and category pages to increase online store visibility and conversions.",
                                icon: ShoppingCart,
                                active: false
                            },
                            {
                                title: "SEO Reporting & Analytics",
                                desc: "Track rankings, traffic, and performance with clear SEO reports and data insights.",
                                icon: BarChart,
                                active: false
                            }
                        ].map((service, i) => (
                            <div
                                key={i}
                                className={`
                                    p-10 rounded-2xl text-center transition-all duration-300 group
                                    ${service.active
                                        ? 'bg-[#0B0F14] border border-primary shadow-lg shadow-primary/15 transform md:-translate-y-2 z-10'
                                        : 'bg-white/[0.02] border border-white/5 hover:border-white/20 hover:-translate-y-2 hover:bg-[#0B0F14]'
                                    }
                                `}
                            >
                                <div className={`
                                    w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-8 transition-colors
                                    ${service.active
                                        ? 'bg-primary shadow-lg shadow-primary/30'
                                        : 'bg-gray-100/10 group-hover:bg-gray-100 group-hover:text-black'
                                    }
                                `}>
                                    <service.icon className={`
                                        w-8 h-8 
                                        ${service.active ? 'text-white' : 'text-gray-400 group-hover:text-black'}
                                    `} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>

                                <p className="text-gray-400 text-sm mb-8 leading-relaxed px-2">
                                    {service.desc}
                                </p>


                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* NEW: SEO Consulting / Solutions Section */}
            <Section className="py-24 bg-[#0B0F14] relative overflow-hidden border-b border-primary/20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Illustration */}
                        <div className="relative order-2 lg:order-1">
                            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                                <Image
                                    src="/FTn4bZsiBu8WRK_kdk-QXJ176hNR7Ksb.png"
                                    alt="SEO Solutions Rocket"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-3xl border border-white/10 shadow-2xl relative z-10"
                                />
                                {/* Decorative Glow */}
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-50" />
                                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-50" />
                            </div>
                        </div>

                        {/* Right: Content & Accordion */}
                        <div className="space-y-10 order-1 lg:order-2">
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                    Affordable and customized <br className="hidden md:block" />
                                    SEO solutions for all.
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    One of the best aspects of the template is not the template itself, but the support that comes along with it. Don't take our word for it. Hundreds of reviews from our customers say so.
                                </p>
                            </div>

                            {/* Accordion */}
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "SEO Consulting",
                                        content: "SEO consulting services provide you strategic guidance on keyword research, technical SEO audits, content optimization, link building strategy, performance analysis."
                                    },
                                    {
                                        title: "Keyword Ranking",
                                        content: "Our advanced keyword ranking strategies ensure your business dominates search results for high-value terms, driving qualified traffic and increasing visibility."
                                    },
                                    {
                                        title: "Web and Mobile Optimization",
                                        content: "We optimize your website for lightning-fast performance across all devices, ensuring a seamless user experience that Google rewards with higher rankings."
                                    }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveSolution(index)}
                                        className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                                            ${activeSolution === index
                                                ? 'border-primary bg-[#0B0F14]'
                                                : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                                            }
                                        `}
                                    >
                                        <div className="p-6 flex justify-between items-center">
                                            <h3 className={`text-xl font-bold transition-colors ${activeSolution === index ? 'text-white' : 'text-white group-hover:text-primary'}`}>
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className={`px-6 text-gray-400 text-sm leading-relaxed border-white/5 transition-all duration-300 ${activeSolution === index ? 'pb-6 pt-4 border-t block opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                                            {item.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* NEW: What Customer Says (Testimonial Section) */}
            <Section className="py-24 bg-white/[0.02] border-b border-primary/20">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What Customer Says</h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            What stands out most is their genuine commitment to our success; they feel like a true partner invested in our growth within the local market.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {displayedTestimonials.map((item, i) => (
                            <div
                                key={`${testimonialIndex}-${i}`}
                                className={`
                                    p-8 rounded-xl text-center transition-all duration-500 group relative animate-in fade-in slide-in-from-right-4
                                    ${i === 1
                                        ? 'bg-[#0B0F14] border border-primary shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.15)] transform md:-translate-y-4 z-10 scale-105'
                                        : 'bg-white/[0.02] border border-white/5 hover:border-white/10 hover:-translate-y-2 opacity-80 hover:opacity-100'
                                    }
                                `}
                            >
                                <h3 className="text-xl font-bold text-white mb-6">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                    {item.review}
                                </p>

                                <div className="mt-auto">
                                    <div className="font-bold text-white mb-1">
                                        {item.name} <span className="text-gray-500 font-normal">/ {item.role}</span>
                                    </div>
                                    <div className="flex justify-center gap-1 mb-6 text-yellow-400">
                                        {[...Array(5)].map((_, star) => (
                                            <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white/10">
                                        <Image src={item.img} alt={item.name} fill className="object-cover" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center items-center gap-3">
                        {[0, 1, 2, 3, 4].map((dot, i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-300
                                    ${i === (testimonialIndex + 2) % 5 ? 'w-4 h-4 border-2 border-primary bg-primary ring-4 ring-primary/20' : 'w-3 h-3 border border-white/30'}
                                `}
                            />
                        ))}
                    </div>
                </Container>
            </Section>


            {/* 6. PRICING PLANS */}
            <ServicePricing serviceName="SEO" plans={plans || []} />

            {/* NEW: FAQ & Newsletter Section */}
            <Section className="py-24 bg-[#0B0F14] relative overflow-hidden border-y border-primary/20">
                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        {/* FAQ Accordion */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    FAQ About SEO & Services
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    They consider various factors, including website content, structure, and user experience, to determine which sites are most relevant to a user's search query.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        question: "What are the key factors that influence SEO?",
                                        answer: "Ensuring website is technically sound, with fast loading speeds, mobile-friendliness, and proper site architecture."
                                    },
                                    {
                                        question: "How long does it take to see SEO results?",
                                        answer: "SEO is a long-term strategy. Typically, you can expect to see significant results within 3 to 6 months depending on competition and strategy."
                                    },
                                    {
                                        question: "How much do your SEO services cost?",
                                        answer: "Our pricing is customized based on your business needs, goals, and the competitive landscape. We offer flexible packages to suit different budgets."
                                    },
                                    {
                                        question: "Why should I choose your company for SEO services?",
                                        answer: "We focus on data-driven strategies, transparency, and ROI. Our team of experts stays updated with the latest algorithms to ensure sustainable growth."
                                    }
                                ].map((faq, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveFAQ(index)}
                                        className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                                            ${activeFAQ === index
                                                ? 'border-primary bg-white/[0.02]'
                                                : 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03]'
                                            }
                                        `}
                                    >
                                        <div className="p-5 flex justify-between items-center">
                                            <h3 className={`text-base font-semibold transition-colors ${activeFAQ === index ? 'text-white' : 'text-gray-300'}`}>
                                                {faq.question}
                                            </h3>
                                            <div className={`transition-transform duration-300 ${activeFAQ === index ? 'rotate-180' : ''}`}>
                                                {activeFAQ === index ? (
                                                    <span className="text-primary text-xl font-bold">-</span>
                                                ) : (
                                                    <span className="text-gray-400 text-xl font-bold">+</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`px-5 text-gray-400 text-sm leading-relaxed border-white/5 transition-all duration-300 ease-in-out ${activeFAQ === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            {faq.answer}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Illustration */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-md aspect-square">
                                <Image
                                    src="/flat-vector-faq-faqs-concept-ill.png"
                                    alt="SEO FAQ Illustration"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                                {/* Decorative elements */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50" />
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Box */}
                    <div className="rounded-2xl bg-primary p-10 md:p-12 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] animate-[shimmer_3s_infinite] z-0" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-white text-center lg:text-left leading-tight">
                                {success ? "Thanks for subscribing!" : "Sign up for our newsletter"} <br className="hidden lg:block" />
                                {success ? "Check your inbox for updates." : "to get update"}
                            </h3>

                            <div className="w-full max-w-lg">
                                {success ? (
                                    <div className="flex items-center justify-center lg:justify-start gap-2 text-white h-14 bg-white/10 rounded-md px-6 border border-white/20">
                                        <CheckCircle2 className="text-green-400 w-6 h-6" />
                                        <span className="font-medium">Subscription successful!</span>
                                    </div>
                                ) : (
                                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <input
                                                type="email"
                                                placeholder="Enter your email here"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={loading}
                                                className="w-full h-14 rounded-md bg-[#1F2937] text-white px-6 focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-gray-400 border border-white/5 shadow-inner disabled:opacity-50"
                                            />
                                            {error && <p className="absolute -bottom-6 left-0 text-xs text-red-200 font-medium bg-red-500/10 px-2 py-0.5 rounded">{error}</p>}
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="h-14 px-8 bg-black hover:bg-gray-900 text-white font-bold rounded-md shadow-lg transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 min-w-[120px]"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit"}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>

                </Container>
            </Section>



        </main>
    );
}

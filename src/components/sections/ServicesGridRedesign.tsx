"use client";

import { Container, Section } from "@/components/ui/container";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Megaphone, PenTool, Sparkles, Target, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
    {
        icon: TrendingUp,
        title: "SEO & Organic Growth",
        slug: "seo",
        description: "Rank higher. Drive organic traffic that converts. No black-hat tactics, just sustainable growth.",
        metrics: ["First page rankings", "Organic traffic", "Quality backlinks"],
        color: "from-blue-500/20 to-cyan-500/20",
        borderColor: "hover:border-blue-500/50",
    },
    {
        icon: Target,
        title: "PPC & Paid Advertising",
        slug: "ppc",
        description: "Profitable paid ads. Lower CAC. Higher ROAS. Real-time optimization that maximizes every rupee.",
        metrics: ["ROAS optimization", "Ad spend efficiency", "Conversion tracking"],
        color: "from-primary/20 to-purple-500/20",
        borderColor: "hover:border-primary/50",
        featured: true,
    },
    {
        icon: Users,
        title: "Social Media Marketing",
        slug: "social",
        description: "Build engaged communities. Turn followers into customers. Platform-native strategies that work.",
        metrics: ["Engagement rate", "Community growth", "Brand awareness"],
        color: "from-pink-500/20 to-rose-500/20",
        borderColor: "hover:border-pink-500/50",
    },
    {
        icon: PenTool,
        title: "Content Marketing",
        slug: "content-marketing",
        description: "Content that ranks, educates, and sells. SEO-optimized. Conversion-focused. Results-driven.",
        metrics: ["SEO content", "Thought leadership", "Lead magnets"],
        color: "from-orange-500/20 to-amber-500/20",
        borderColor: "hover:border-orange-500/50",
    },
    {
        icon: Megaphone,
        title: "Influencer Marketing",
        slug: "influencer",
        description: "Partner with the right voices. Authentic campaigns. Measurable ROI. Real influence, real results.",
        metrics: ["Influencer vetting", "Campaign ROI", "Brand partnerships"],
        color: "from-purple-500/20 to-violet-500/20",
        borderColor: "hover:border-purple-500/50",
    },
    {
        icon: Code2,
        title: "Web Design & Development",
        slug: "website-designing-and-development",
        description: "High-performance, SEO-optimized websites built to convert. Clean code. Fast load times. Better ROI.",
        metrics: ["Page speed optimization", "Conversion-focused UI", "Next.js & React"],
        color: "from-cyan-500/20 to-teal-500/20",
        borderColor: "hover:border-cyan-500/50",
    },
    {
        icon: Sparkles,
        title: "AI Marketing Automation",
        slug: "ai-marketing",
        description: "Automate, optimize, scale. AI-powered campaigns that learn and improve. Work smarter, not harder.",
        metrics: ["Workflow automation", "Predictive analytics", "Smart optimization"],
        color: "from-emerald-500/20 to-teal-500/20",
        borderColor: "hover:border-emerald-500/50",
    },
];

export function ServicesGridRedesign() {
    return (
        <Section className="bg-gradient-to-b from-background to-[#0B0F14]">
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
                >
                    <div>
                        <span className="text-sm font-semibold text-primary mb-2 block">
                            What We Do
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white">
                            Our Services
                        </h2>
                    </div>

                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-primary hover:bg-primary/90 px-6 py-2.5 rounded-full transition-all group w-fit"
                    >
                        VIEW ALL
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={`/services/${service.slug}`}
                                className={cn(
                                    "group block h-full",
                                    "bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm",
                                    "rounded-2xl border border-white/10 p-8",
                                    "transition-all duration-300",
                                    "hover:scale-[1.02] hover:shadow-2xl",
                                    service.borderColor,
                                    service.featured && "ring-2 ring-primary/20"
                                )}
                            >
                                {/* Featured Badge */}
                                {service.featured && (
                                    <div className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4">
                                        <Sparkles className="w-3 h-3 text-primary" />
                                        <span className="text-xs font-semibold text-primary">Most Popular</span>
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={cn(
                                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                                    "bg-gradient-to-br",
                                    service.color,
                                    "border border-white/10",
                                    "group-hover:scale-110 transition-transform duration-300"
                                )}>
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-3 font-poppins group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                {/* Metrics */}
                                <div className="space-y-2 mb-6">
                                    {service.metrics.map((metric, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                                            <div className="w-1 h-1 rounded-full bg-primary" />
                                            <span>{metric}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                                    <span>Learn More</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    {/* <p className="text-gray-400 mb-4">
                        Not sure which service is right for you?
                    </p>
                    <Link href="/contact">
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-full transition-all text-sm font-semibold">
                            Book a Free Strategy Call
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link> */}
                </motion.div>
            </Container>
        </Section>
    );
}

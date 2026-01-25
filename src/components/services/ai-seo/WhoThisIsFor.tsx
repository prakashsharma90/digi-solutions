"use client";

import { Container, Section } from "@/components/ui/container";
import { Building2, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const audiences = [
    {
        icon: Building2,
        title: "SaaS & B2B Companies",
        description: "Long sales cycles need visibility at every research stage",
        ideal: "ARR > ₹50L, content-driven growth",
    },
    {
        icon: ShoppingCart,
        title: "Ecommerce Brands",
        description: "Product discovery is shifting to AI search engines",
        ideal: "SKU count > 100, organic traffic focus",
    },
    {
        icon: TrendingUp,
        title: "FinTech & Startups",
        description: "Build authority in competitive, trust-sensitive markets",
        ideal: "Funded startups, growth-stage companies",
    },
    {
        icon: Users,
        title: "Enterprise SEO Teams",
        description: "Scale AI search optimization across multiple brands",
        ideal: "In-house teams, agency partnerships",
    },
];

export function WhoThisIsFor() {
    return (
        <Section className="bg-gradient-to-b from-background to-[#0B0F14]">
            <Container>
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Who This Is{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Perfect For
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            AI search optimization works best for brands with established content and authority goals.
                        </p>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <audience.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{audience.title}</h3>
                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">{audience.description}</p>
                            <div className="text-xs text-gray-500 bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                <span className="font-semibold text-primary">Ideal:</span> {audience.ideal}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl border border-white/10 p-8"
                >
                    <p className="text-gray-400 mb-4">
                        Not sure if this fits your business?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                        Book a quick strategy call →
                    </Link>
                </motion.div>
            </Container>
        </Section>
    );
}

"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const proofs = [
    {
        metric: "+500%",
        label: "Traffic Growth",
        desc: "Achieved for a Fintech Startup via SEO & Content.",
        tags: ["SEO", "Fintech"],
    },
    {
        metric: "3.8x",
        label: "ROAS",
        desc: "Scaled Facebook Ads for a D2C Fashion Brand.",
        tags: ["Paid Media", "E-commerce"],
    },
    {
        metric: "-60%",
        label: "CAC Reduction",
        desc: "Optimized lead funnel for a SaaS Platform.",
        tags: ["CRO", "SaaS"],
    },
];

export function ServicesProof() {
    return (
        <Section className="bg-[#0B0F14] relative py-32 border-t border-white/5">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Results-Backed Intelligence</h2>
                        <p className="text-text-muted text-lg">We don't just speak about performance. We engineer it.</p>
                    </div>
                    <Link href="/blog">
                        <Button variant="outline">
                            View Full Case Studies <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {proofs.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden group hover:border-primary/50 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors" />

                            <div className="relative z-10">
                                <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {item.metric}
                                </div>
                                <div className="text-xl font-medium text-white/80 mb-4">{item.label}</div>
                                <p className="text-text-muted mb-6 h-12">{item.desc}</p>

                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag, k) => (
                                        <span key={k} className="text-xs font-mono uppercase px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </Container>
        </Section>
    );
}

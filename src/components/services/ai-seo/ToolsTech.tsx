"use client";

import { Container, Section } from "@/components/ui/container";
import Image from "next/image";
import { motion } from "framer-motion";

const tools = [
    { name: "Google Search Console", category: "Search Analytics" },
    { name: "OpenAI APIs", category: "AI Integration" },
    { name: "Perplexity API", category: "AI Search" },
    { name: "Screaming Frog", category: "Technical SEO" },
    { name: "Ahrefs", category: "Backlink Analysis" },
    { name: "Semrush", category: "Competitive Intelligence" },
    { name: "Schema.org", category: "Structured Data" },
    { name: "Custom AI Tools", category: "Proprietary" },
];

export function ToolsTech() {
    return (
        <Section className="bg-gradient-to-b from-background to-[#0B0F14]">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Tools & <span className="text-primary">Technology</span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            Enterprise-grade tools + proprietary AI systems
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center hover:border-primary/30 transition-all"
                        >
                            <div className="text-2xl mb-2">🔧</div>
                            <div className="font-semibold text-white text-sm mb-1">{tool.name}</div>
                            <div className="text-xs text-gray-500">{tool.category}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12 text-sm text-gray-500"
                >
                    <p>+ Custom proprietary tools for AI citation tracking and entity analysis</p>
                </motion.div>
            </Container>
        </Section>
    );
}

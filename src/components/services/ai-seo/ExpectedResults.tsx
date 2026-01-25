"use client";

import { Container, Section } from "@/components/ui/container";
import { TrendingUp, Target, Award, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const results = [
    {
        icon: TrendingUp,
        metric: "2–4x",
        label: "Increase in AI Citations",
        description: "Your brand mentioned and cited across ChatGPT, Perplexity, and Google AI Overviews",
    },
    {
        icon: Target,
        metric: "30–120%",
        label: "Organic Traffic Lift",
        description: "From AI-powered search engines and traditional search combined",
    },
    {
        icon: Award,
        metric: "Stronger",
        label: "Entity Authority",
        description: "Improved knowledge graph presence and brand recognition by AI engines",
    },
];

export function ExpectedResults() {
    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            What Results{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Can You Expect?
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            Based on 50+ client campaigns and 3+ years of AI search optimization
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {results.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center hover:border-primary/30 transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <result.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                                {result.metric}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{result.label}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{result.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-8"
                >
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">Important Disclaimer</h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Results depend on your market, competition, existing authority, and content quality.
                                We provide realistic ranges based on historical data, not guarantees.
                                Most clients see meaningful results within 60-90 days.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}

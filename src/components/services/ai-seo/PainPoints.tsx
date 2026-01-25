"use client";

import { Container, Section } from "@/components/ui/container";
import { AlertCircle, TrendingDown, XCircle, Target, Award } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
    {
        icon: TrendingDown,
        text: "Losing traffic after AI Overviews rollout?",
        impact: "Up to 40% traffic drop reported",
    },
    {
        icon: XCircle,
        text: "Content not cited by ChatGPT?",
        impact: "Missing out on 100M+ daily users",
    },
    {
        icon: AlertCircle,
        text: "SEO plateaued despite consistent effort?",
        impact: "Traditional tactics losing effectiveness",
    },
    {
        icon: Target,
        text: "No entity presence in knowledge graphs?",
        impact: "Invisible to AI search engines",
    },
    {
        icon: Award,
        text: "Authority sites outranking you?",
        impact: "Losing market share to competitors",
    },
];

export function PainPoints() {
    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent_70%)]" />

            <Container className="relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Sound{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                                Familiar?
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            If you're experiencing any of these, AI search optimization can help.
                        </p>
                    </motion.div>
                </div>

                {/* Problems Grid */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-red-500/30 transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                                    <problem.icon className="w-6 h-6 text-red-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{problem.text}</h3>
                                    <p className="text-sm text-gray-400">{problem.impact}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-12 bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-primary/20 p-8"
                >
                    <p className="text-lg text-white font-semibold mb-2">
                        We've helped 50+ brands solve these exact problems.
                    </p>
                    <p className="text-gray-400 text-sm">
                        Get a free audit to see where you're losing visibility.
                    </p>
                </motion.div>
            </Container>
        </Section>
    );
}

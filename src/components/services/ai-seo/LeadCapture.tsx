"use client";

import { Container, Section } from "@/components/ui/container";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LeadForm } from "@/components/forms/LeadForm";

export function LeadCapture() {
    return (
        <Section className="bg-gradient-to-b from-background to-[#0B0F14]">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">Free AI Visibility Report</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
                            Get Your Free AI Visibility Report
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            See exactly where you appear (or don't appear) in AI search results.
                            <span className="text-white font-semibold"> Delivered in 48 hours.</span>
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-3xl border border-primary/20 p-8 md:p-10 shadow-2xl">
                        <LeadForm
                            source="AI-SEO Service Page - Lead Capture"
                            defaultService="ai-seo"
                        />
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>48-hour delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Worth ₹25,000</span>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}

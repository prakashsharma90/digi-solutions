"use client";

import { Container, Section } from "@/components/ui/container";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LeadForm } from "@/components/forms/LeadForm";

export function SocialLeadCapture() {
    return (
        <Section id="lead-capture" className="bg-gradient-to-b from-background to-[#0B0F14]">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">Free 7-Day Content Audit</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
                            Get a Free 7-Day Content Audit
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            We'll analyze your current social media presence and show you exactly what's working,
                            what's not, and how to <span className="text-white font-semibold">grow faster</span>.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-3xl border border-primary/20 p-8 md:p-10 shadow-2xl">
                        <LeadForm
                            source="Social Media Service Page - Lead Capture"
                            defaultService="social-media-marketing"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>7-day detailed analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Actionable recommendations</span>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}

"use client";

import { Container, Section } from "@/components/ui/container";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SocialFinalConversion() {
    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 p-12 md:p-16 shadow-2xl">
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">Ready to Get Started?</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
                            Ready to Turn{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Attention Into Revenue?
                            </span>
                        </h2>

                        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Join 50+ brands already growing their social presence and revenue.
                            Get your free 7-day content audit and see exactly how to grow faster.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {[
                                { label: "Free 7-day audit", icon: "🎯" },
                                { label: "No obligations", icon: "✅" },
                                { label: "48-hour response", icon: "⚡" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-center gap-2 text-sm text-gray-300">
                                    <span className="text-xl">{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="#lead-capture">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black font-bold h-16 px-10 text-lg shadow-[0_0_40px_-5px_var(--color-primary)] group"
                                >
                                    <Sparkles className="mr-2 w-5 h-5" />
                                    Get Free Audit
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto h-16 px-10 text-lg font-semibold border-2 border-white/20 hover:border-primary/50"
                                >
                                    <Calendar className="mr-2 w-5 h-5" />
                                    Talk to Expert
                                </Button>
                            </Link>
                        </div>

                        <p className="text-sm text-gray-500 mt-8">
                            Avg response time: Under 2 hours • 50+ brands trust us • 2.5x avg engagement lift
                        </p>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}

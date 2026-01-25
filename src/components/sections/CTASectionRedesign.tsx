"use client";

import { Container, Section } from "@/components/ui/container";
import Link from "next/link";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function CTASectionRedesign() {
    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Main Content */}
                    <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-12 md:p-16 shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
                            Ready to Scale Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Revenue?
                            </span>
                        </h2>

                        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Book a free 30-minute strategy call. We'll audit your current marketing,
                            identify growth opportunities, and show you exactly how we can help.
                        </p>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {[
                                { label: "Free audit worth ₹25,000", icon: "💰" },
                                { label: "No obligations, no pressure", icon: "✅" },
                                { label: "Actionable insights you can use", icon: "🎯" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-center gap-2 text-sm text-gray-300">
                                    <span className="text-xl">{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-black font-bold h-16 px-10 text-lg shadow-[0_0_40px_-5px_var(--color-primary)] hover:shadow-[0_0_50px_-5px_var(--color-primary)] transition-all group"
                            >
                                <Calendar className="mr-2 w-5 h-5" />
                                Book Your Free Strategy Call
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <p className="text-sm text-gray-500 mt-6">
                            Typical response time: Under 2 hours • 50+ brands trust us
                        </p>
                    </div>

                    {/* Alternative Contact */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-sm mb-4">Prefer to chat first?</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-semibold"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Send us a message
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}

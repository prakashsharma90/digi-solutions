"use client";

import { Container, Section } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const faqs = [
    {
        question: "What digital marketing services do you offer?",
        answer: "We provide complete digital marketing solutions including SEO, social media marketing, paid advertising, website development, content marketing, email marketing, and performance marketing.",
    },
    {
        question: "How long does it take to see results from digital marketing?",
        answer: "Results depend on the strategy. Paid ads can generate results quickly, while SEO and organic marketing typically take 3–6 months for sustainable growth.",
    },
    {
        question: "How do you create a marketing strategy for my business?",
        answer: "We analyze your industry, competitors, audience, and goals to create a customized, data-driven strategy focused on measurable results.",
    },
    {
        question: "Do you work with small businesses or startups?",
        answer: "Yes. We work with startups, small businesses, and growing brands, creating strategies based on your budget and growth stage.",
    },
    {
        question: "How do you measure campaign success?",
        answer: "We track key metrics like traffic, leads, conversion rate, ROI, engagement, and sales using analytics and transparent reporting dashboards.",
    },
    {
        question: "Do you guarantee results?",
        answer: "We don't promise unrealistic overnight results, but we focus on proven strategies, continuous optimization, and measurable growth.",
    },
    {
        question: "How do we get started?",
        answer: "Simply contact us for a consultation. We'll understand your goals and recommend the best strategy to grow your business online.",
    },
];

export function HomeFAQ() {
    const [openIndex, setOpenIndex] = useState<number>(0);

    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background relative overflow-hidden border-y border-primary/20">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                    {/* ── Left Column ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:sticky lg:top-32"
                    >
                        {/* Label */}
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm font-semibold text-primary">
                                FAQs
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl font-bold font-poppins leading-[1.1] mb-12 text-white">
                            Frequently Asked{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Questions
                            </span>
                        </h2>

                        {/* Book a Call Card */}
                        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 border-2 border-primary/30 flex items-center justify-center mb-5 overflow-hidden">
                                <svg
                                    className="w-10 h-10 text-gray-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">
                                Book a 15 min call
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                If you have any questions, just book a 15-minute call with us before subscribing
                            </p>

                            <Link href="/contact">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12 text-sm shadow-[0_0_30px_-5px_var(--color-primary)] transition-all">
                                    Book a Free Call
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* ── Right Column: Accordion ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-3">
                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <div
                                        key={index}
                                        className={`rounded-xl border transition-all duration-300 ${isOpen
                                            ? "bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-primary/20"
                                            : "bg-white/[0.02] border-white/[0.06] hover:border-white/15"
                                            }`}
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenIndex(isOpen ? -1 : index)
                                            }
                                            className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer"
                                        >
                                            <span
                                                className={`text-base md:text-lg font-semibold pr-4 transition-colors ${isOpen
                                                    ? "text-white"
                                                    : "text-gray-300"
                                                    }`}
                                            >
                                                {faq.question}
                                            </span>
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                                                    ? "bg-primary/20 text-primary rotate-0"
                                                    : "bg-white/[0.06] text-gray-500"
                                                    }`}
                                            >
                                                {isOpen ? (
                                                    <X className="w-4 h-4" />
                                                ) : (
                                                    <Plus className="w-4 h-4" />
                                                )}
                                            </div>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeInOut",
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-gray-400 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}

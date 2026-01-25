"use client";

import { Container, Section } from "@/components/ui/container";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const faqs = [
    {
        question: "How long until we see results?",
        answer: "Most clients see improved engagement within 2-4 weeks. Significant follower growth and lead generation typically occur within 60-90 days. Social media is a long-term strategy, not a quick fix.",
    },
    {
        question: "Do you run paid ads?",
        answer: "We focus on organic social media growth. However, we can integrate with your paid social strategy and recommend our performance marketing team for ad campaigns.",
    },
    {
        question: "Who owns the content you create?",
        answer: "You own all content, designs, and assets we create. We provide full rights and source files upon request.",
    },
    {
        question: "How do content approvals work?",
        answer: "We share a monthly content calendar for your approval. You can request revisions before posting. Growth and Authority plans include real-time collaboration via Slack/WhatsApp.",
    },
    {
        question: "What are your contract terms?",
        answer: "Starter: 3-month minimum. Growth: 6-month minimum. Authority: 12-month minimum. We offer month-to-month after the initial term.",
    },
    {
        question: "How often do you report?",
        answer: "Starter: Monthly reports. Growth: Weekly reports + monthly strategy calls. Authority: Real-time dashboard access + weekly calls.",
    },
    {
        question: "Can we request revisions?",
        answer: "Yes! Starter plan includes 2 revision rounds per month. Growth and Authority plans include unlimited revisions.",
    },
    {
        question: "Which platforms do you support?",
        answer: "We specialize in Instagram, LinkedIn, YouTube, and X (Twitter). We can also manage Facebook, TikTok, and Pinterest based on your needs.",
    },
    {
        question: "Do you provide analytics?",
        answer: "Yes. All plans include detailed performance reports. Growth and Authority plans get access to our custom analytics dashboard with real-time metrics.",
    },
    {
        question: "Can we cancel anytime?",
        answer: "After your minimum term, you can cancel with 30 days notice. We don't lock you into long-term contracts you don't want.",
    },
];

export function SocialFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

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
                            Frequently Asked{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Questions
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            Everything you need to know about our social media services
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <span className="text-lg font-semibold text-white pr-8">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-primary shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400 mb-4">Still have questions?</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                        Talk to a Social Media Expert →
                    </Link>
                </motion.div>
            </Container>
        </Section>
    );
}

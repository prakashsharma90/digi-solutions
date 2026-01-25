"use client";

import { Container, Section } from "@/components/ui/container";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
    {
        question: "How is AI Search Optimization different from traditional SEO?",
        answer: "Traditional SEO optimizes for Google's algorithm to rank pages. AI Search Optimization ensures your brand is cited and recommended by LLM-powered engines like ChatGPT, Perplexity, and Google AI Overviews. It focuses on entity recognition, knowledge graphs, and authority signals that AI engines trust.",
    },
    {
        question: "How long does it take to see results?",
        answer: "Most clients see initial AI citations within 60-90 days. Significant traffic lift typically occurs within 4-6 months. AI search optimization is a long-term strategy that builds sustainable authority.",
    },
    {
        question: "Do you work with US/India clients?",
        answer: "Yes! We work with clients globally, including US, India, UK, UAE, and other markets. Our strategies are adapted for regional AI search patterns and language nuances.",
    },
    {
        question: "Do you guarantee ranking or citations?",
        answer: "We don't guarantee specific rankings because AI engines are constantly evolving. However, we guarantee our proven process, transparent reporting, and dedicated effort. Our average client sees 2-4x increase in AI citations within 6 months.",
    },
    {
        question: "What are your contract terms?",
        answer: "Starter: 3 months minimum. Growth: 6 months minimum. Authority: 12 months minimum. All plans are month-to-month after the minimum period. You can cancel anytime with 30 days notice.",
    },
    {
        question: "What tools do you use?",
        answer: "We use enterprise tools like Google Search Console, Ahrefs, Screaming Frog, plus proprietary AI citation tracking tools. We also have direct API access to OpenAI, Perplexity, and other AI platforms for real-time monitoring.",
    },
    {
        question: "How often do you report?",
        answer: "Starter: Monthly reports. Growth: Bi-weekly reports + live dashboard access. Authority: Weekly reports + real-time dashboard + dedicated Slack channel.",
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes, after your minimum commitment period, you can cancel with 30 days notice. No long-term lock-ins.",
    },
    {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day satisfaction guarantee. If you're not happy with our process or communication in the first month, we'll refund your payment. After 30 days, no refunds, but you can cancel as per contract terms.",
    },
    {
        question: "How do you measure AI citations?",
        answer: "We use proprietary tools to track when and where your brand appears in ChatGPT responses, Perplexity answers, Google AI Overviews, and other AI platforms. You get a live dashboard showing citation frequency, context, and sentiment.",
    },
];

export function AISearchFAQ() {
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
                            Everything you need to know about AI Search Optimization
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left p-6 flex items-center justify-between gap-4"
                            >
                                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                                <ChevronDown
                                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-6">
                                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
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
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                        Talk to an AI Search Expert →
                    </a>
                </motion.div>
            </Container>
        </Section>
    );
}

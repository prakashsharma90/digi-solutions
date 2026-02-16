"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Mail, Plus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadForm } from "@/components/forms/LeadForm";
import Link from "next/link";

// FAQ DATA
const faqs = [
    {
        question: "What services does Digihub offer?",
        answer: "We offer a comprehensive suite of digital services including SEO optimization, custom web development, paid advertising (PPC), social media management, and AI-driven content marketing strategies."
    },
    {
        question: "How much does a typical project cost?",
        answer: "Our pricing is tailored to your specific goals and scale. We offer customized packages for startups and enterprise solutions for large corporations. Contact us for a free quote."
    },
    {
        question: "How long does it take to see results?",
        answer: "Timelines vary by service. SEO typically shows significant traction in 3-6 months, while PPC and social media campaigns can generate immediate traffic. Web development timelines depend on complexity."
    },
    {
        question: "Do you work with startups?",
        answer: "Absolutely! We love helping ambitious startups scale. We have specialized growth packages designed to maximize ROI for early-stage companies."
    }
];

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <main className="min-h-screen bg-[#0B0F14] text-white pt-20">

            {/* 1. TOP SECTION: INFO & FORM */}
            <Section className="pt-12 md:pt-20 pb-12 md:pb-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                        {/* LEFT: Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Contact Us</h1>
                                <p className="text-xl text-text-muted max-w-md leading-relaxed">
                                    Email, call, or complete the form to learn how Digihub can solve your growth challenges.
                                </p>
                                <div className="space-y-2 text-lg">
                                    <a href="mailto:contact@digihub.solutions" className="block text-white hover:text-primary transition-colors">contact@digihub.solutions</a>
                                    <a href="tel:+911244567890" className="block text-white hover:text-primary transition-colors">+91 124 456 7890</a>
                                    <a href="mailto:contact@digihub.solutions" className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors underline decoration-border/30 underline-offset-4">
                                        Customer Support
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div className="space-y-3">
                                    <h3 className="font-bold text-white">Sales & Support</h3>
                                    <p className="text-sm text-text-muted leading-relaxed">
                                        Our support team is available around the clock to address any concerns or queries you may have.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-bold text-white">Partnerships</h3>
                                    <p className="text-sm text-text-muted leading-relaxed">
                                        Interested in co-marketing or strategic alliances? Let&apos;s discuss how we can grow together.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-bold text-white">Media Inquiries</h3>
                                    <p className="text-sm text-text-muted leading-relaxed">
                                        For media-related questions or press inquiries, please contact us at media@digihub.solutions.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT: Floating Form Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="bg-[#13181F] border border-white/5 rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                                {/* Subtle background glow for the card */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <LeadForm source="Contact Page" className="relative z-10" />
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* 2. MAP SECTION */}
            <Section className="py-12 md:py-20 bg-white/[0.02]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Map (Right in simplified view, Left in correct order) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-[#13181F] rounded-3xl p-3 border border-white/5 shadow-xl order-2 lg:order-1"
                        >
                            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden grayscale invert-[0.9]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2945478251744!2d77.08773631508076!3d28.459497982484447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18c9f0f0f0f1%3A0x1234567890abcdef!2sCyber%20City%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    title="Digihub Office Location"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                                {/* Location Pin Overlay */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full mt-[-10px] bg-white text-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="font-bold text-xs">Digihub HQ</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-1 lg:order-2"
                        >
                            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Our Location</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">Connecting Near and Far</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Global Headquarters</h3>
                                    <address className="not-italic text-text-muted leading-relaxed">
                                        Digihub Solutions Pvt. Ltd.<br />
                                        Innovation Hub, Cyber City<br />
                                        Gurugram, Haryana, 122002<br />
                                        India
                                    </address>
                                </div>
                                <div>
                                    <a href="https://maps.google.com" target="_blank" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                                        Open Google Maps <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* 3. FAQ SECTION */}
            <Section className="py-12 md:py-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        <div className="space-y-6">
                            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">FAQ</span>
                            <h2 className="text-3xl md:text-5xl font-bold">Do you have any questions for us?</h2>
                            <p className="text-text-muted text-lg">
                                If you have questions you want to ask, check our FAQ or contact us directly. We will answer all your questions.
                            </p>
                            <div className="pt-4 flex items-center gap-3">
                                <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-text-muted flex items-center gap-2">
                                    <Mail size={14} />
                                    Enter your email
                                </div>
                                <Button size="sm" className="rounded-full px-6">Submit</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border-b border-white/10 pb-4"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between py-4 text-left group"
                                    >
                                        <span className={`text-lg font-medium transition-colors ${openFaq === index ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`p-1 rounded-full border transition-all ${openFaq === index ? 'border-primary text-primary rotate-45' : 'border-white/20 text-gray-400 rotate-0'}`}>
                                            <Plus size={16} />
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-text-muted pb-4 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4. CTA BANNER */}
            <Section className="py-12 pb-24 md:pb-32">
                <Container>
                    <div className="relative rounded-[40px] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-600/80 z-10" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay opacity-50 z-0" />

                        <div className="relative z-20 py-20 px-8 md:px-20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Ready to experience the speed and<br /> simplicity of Digihub?
                            </h2>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                                <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-lg font-semibold">
                                    Get Started
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-12 text-lg">
                                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

        </main>
    );
}

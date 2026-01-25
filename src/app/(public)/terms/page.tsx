"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Shield } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-white pt-20">
            {/* HERO */}
            <Section className="relative overflow-hidden pt-24 md:pt-32 pb-12">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
                <Container className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-mono tracking-widest uppercase mb-6">
                            <Scale size={16} />
                            Terms of Service
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Terms of <span className="text-primary">Service</span>
                        </h1>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                            Last updated: January 25, 2026
                        </p>
                    </motion.div>
                </Container>
            </Section>

            {/* CONTENT */}
            <Section className="py-12 md:py-24">
                <Container className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="prose prose-invert prose-lg max-w-none"
                    >
                        <div className="space-y-12">
                            {/* Introduction */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Agreement to Terms</h2>
                                        <p className="text-text-muted leading-relaxed">
                                            By accessing or using the services provided by Digihub Solutions Pvt. Ltd., you agree to be
                                            bound by these Terms of Service. If you disagree with any part of these terms, you may not
                                            access our services.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">Our Services</h2>
                                        <p className="text-text-muted leading-relaxed mb-4">
                                            Digihub Solutions provides digital marketing, SEO, web development, and related services.
                                            We reserve the right to:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-4 text-text-muted">
                                            <li>Modify or discontinue services at any time</li>
                                            <li>Refuse service to anyone for any reason</li>
                                            <li>Update pricing and service offerings</li>
                                            <li>Change these terms with reasonable notice</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* User Obligations */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <AlertCircle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">Your Obligations</h2>
                                        <p className="text-text-muted leading-relaxed mb-4">
                                            When using our services, you agree to:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-4 text-text-muted">
                                            <li>Provide accurate and complete information</li>
                                            <li>Maintain the confidentiality of your account credentials</li>
                                            <li>Comply with all applicable laws and regulations</li>
                                            <li>Not use our services for illegal or unauthorized purposes</li>
                                            <li>Not interfere with or disrupt our services</li>
                                            <li>Respect intellectual property rights</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Terms */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <FileText size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
                                        <ul className="list-disc list-inside space-y-2 ml-4 text-text-muted">
                                            <li>Payment terms are specified in individual service agreements</li>
                                            <li>All fees are in Indian Rupees (INR) unless otherwise stated</li>
                                            <li>Late payments may incur additional charges</li>
                                            <li>Refunds are subject to our refund policy</li>
                                            <li>We reserve the right to suspend services for non-payment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Intellectual Property */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <Shield size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                                        <p className="text-text-muted leading-relaxed mb-4">
                                            All content, features, and functionality on our website are owned by Digihub Solutions
                                            and are protected by international copyright, trademark, and other intellectual property laws.
                                        </p>
                                        <p className="text-text-muted leading-relaxed">
                                            Work products created for clients are subject to the terms of individual service agreements.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Limitation of Liability */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <XCircle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                                        <p className="text-text-muted leading-relaxed mb-4">
                                            To the maximum extent permitted by law, Digihub Solutions shall not be liable for:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-4 text-text-muted">
                                            <li>Indirect, incidental, or consequential damages</li>
                                            <li>Loss of profits, data, or business opportunities</li>
                                            <li>Service interruptions or errors</li>
                                            <li>Third-party actions or content</li>
                                        </ul>
                                        <p className="text-text-muted leading-relaxed mt-4">
                                            Our total liability shall not exceed the amount paid by you for services in the
                                            12 months preceding the claim.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Governing Law */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <Scale size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                                        <p className="text-text-muted leading-relaxed">
                                            These Terms shall be governed by and construed in accordance with the laws of India.
                                            Any disputes shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
                                <h2 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
                                <p className="text-text-muted mb-6">
                                    If you have any questions about these Terms of Service, please contact us:
                                </p>
                                <div className="space-y-2 text-primary">
                                    <p>Email: <a href="mailto:legal@digihub.solutions" className="hover:underline font-medium">legal@digihub.solutions</a></p>
                                    <p>Phone: <a href="tel:+911244567890" className="hover:underline font-medium">+91 124 456 7890</a></p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </Section>
        </main>
    );
}

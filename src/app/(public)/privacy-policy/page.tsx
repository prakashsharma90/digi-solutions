"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                            <Shield size={16} />
                            Privacy Policy
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Your Privacy <span className="text-primary">Matters</span>
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
                                        <h2 className="text-2xl font-bold text-white mb-2">Introduction</h2>
                                        <p className="text-text-muted leading-relaxed">
                                            Digihub Solutions Pvt. Ltd. ("we," "our," or "us") is committed to protecting your privacy.
                                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                                            you visit our website or use our services.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Information We Collect */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <Database size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                                        <div className="space-y-4 text-text-muted">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>Name and contact information (email, phone number)</li>
                                                    <li>Company name and business information</li>
                                                    <li>Communication preferences</li>
                                                    <li>Any other information you provide in forms or communications</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    <li>IP address and browser type</li>
                                                    <li>Device information and operating system</li>
                                                    <li>Pages visited and time spent on our site</li>
                                                    <li>Referring website addresses</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* How We Use Your Information */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <UserCheck size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                                        <ul className="list-disc list-inside space-y-2 ml-4 text-text-muted">
                                            <li>To respond to your inquiries and provide customer support</li>
                                            <li>To send you marketing communications (with your consent)</li>
                                            <li>To improve our website and services</li>
                                            <li>To analyze usage patterns and optimize user experience</li>
                                            <li>To comply with legal obligations</li>
                                            <li>To prevent fraud and enhance security</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Data Security */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <Lock size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                                        <p className="text-text-muted leading-relaxed mb-4">
                                            We implement industry-standard security measures to protect your personal information:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-4 text-text-muted">
                                            <li>SSL/TLS encryption for data transmission</li>
                                            <li>Secure database storage with encryption at rest</li>
                                            <li>Regular security audits and vulnerability assessments</li>
                                            <li>Access controls and authentication mechanisms</li>
                                            <li>ISO 27001 certified data protection practices</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Your Rights */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <Eye size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                                        <p className="text-text-muted leading-relaxed mb-4">
                                            You have the right to:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-4 text-text-muted">
                                            <li>Access your personal data</li>
                                            <li>Request correction of inaccurate data</li>
                                            <li>Request deletion of your data</li>
                                            <li>Opt-out of marketing communications</li>
                                            <li>Object to processing of your data</li>
                                            <li>Request data portability</li>
                                        </ul>
                                        <p className="text-text-muted leading-relaxed mt-4">
                                            To exercise these rights, contact us at{" "}
                                            <a href="mailto:privacy@digihub.solutions" className="text-primary hover:underline">
                                                privacy@digihub.solutions
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
                                <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
                                <p className="text-text-muted mb-6">
                                    If you have any questions about this Privacy Policy, please contact us:
                                </p>
                                <div className="space-y-2 text-primary">
                                    <p>Email: <a href="mailto:privacy@digihub.solutions" className="hover:underline font-medium">privacy@digihub.solutions</a></p>
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

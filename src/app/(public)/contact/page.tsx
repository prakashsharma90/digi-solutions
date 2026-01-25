"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { LeadForm } from "@/components/forms/LeadForm";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-white pt-20">
            {/* HERO */}
            <Section className="relative overflow-hidden pt-24 md:pt-32 pb-12">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
                <Container className="relative z-10 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-mono tracking-widest uppercase mb-6">
                            Contact Us
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Let’s Build Something <span className="text-primary">Extraordinary</span>
                        </h1>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                            Have a project in mind? We'd love to help you scale. Reach out to our team and let's discuss your growth strategy.
                        </p>
                    </motion.div>
                </Container>
            </Section>

            {/* CONTACT GRID */}
            <Section className="py-12 md:py-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">

                        {/* LEFT: INFO */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold">Get in Touch</h2>
                                <p className="text-text-muted text-lg">
                                    Fill out the form or contact us directly. We usually respond within 24 hours.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-primary">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-white">Chat with us</h3>
                                        <p className="text-text-muted mb-1">Our friendly team is here to help.</p>
                                        <a href="mailto:hello@digihub.com" className="text-primary hover:underline">hello@digihub.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-primary">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-white">Visit us</h3>
                                        <p className="text-text-muted mb-1">Come say hello at our office HQ.</p>
                                        <p className="text-white">100 Digital Drive, Tech City, TC 90210</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-primary">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-white">Call us</h3>
                                        <p className="text-text-muted mb-1">Mon-Fri from 8am to 5pm.</p>
                                        <a href="tel:+15550000000" className="text-primary hover:underline">+1 (555) 000-0000</a>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <h3 className="text-lg font-bold mb-4">Follow our socials</h3>
                                <div className="flex gap-4">
                                    {[Twitter, Linkedin, Github].map((Icon, i) => (
                                        <a key={i} href="#" className="p-3 bg-white/5 rounded-full border border-white/10 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all">
                                            <Icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT: FORM */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10"
                        >
                            <LeadForm source="Contact Page" />
                        </motion.div>

                    </div>
                </Container>
            </Section>
        </main>
    );
}

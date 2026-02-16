"use client";

import { useRef, useState, useEffect } from "react";
import { Container, Section } from "@/components/ui/container";
import { motion, useScroll, useSpring } from "framer-motion";
import { Shield, Mail, Share2, ArrowRight } from "lucide-react";

const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "info-collect", title: "2. Information We Collect" },
    { id: "how-use", title: "3. How We Use Information" },
    { id: "security", title: "4. Data Security" },
    { id: "cookies", title: "5. Cookies & Tracking" },
    { id: "sharing", title: "6. Sharing of Information" },
    { id: "rights", title: "7. Your Rights" },
    { id: "links", title: "8. External Links" },
    { id: "changes", title: "9. Policy Changes" },
    { id: "contact", title: "10. Contact Us" },
];

export default function PrivacyPolicyPage() {
    const [activeSection, setActiveSection] = useState("introduction");

    // Scroll progress bar
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Handle scroll spy
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200; // Offset

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Header height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <main className="min-h-screen bg-[#0B0F14] text-white pt-20">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
                style={{ scaleX }}
            />

            {/* HERO */}
            <Section className="relative overflow-hidden pt-24 md:pt-32 pb-12 bg-background/50 border-b border-white/5">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
                <Container className="relative z-10 max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-mono tracking-widest uppercase mb-6">
                            <Shield size={16} />
                            Legal
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
                            Privacy <span className="text-primary">Policy</span>
                        </h1>
                        <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
                            Last updated: February 16, 2026
                        </p>
                    </motion.div>
                </Container>
            </Section>

            {/* CONTENT LAYOUT */}
            <Section className="py-12 md:py-20">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

                        {/* LEFT SIDEBAR (STICKY) */}
                        <aside className="hidden lg:block w-72 shrink-0">
                            <div className="sticky top-32 space-y-1">
                                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4 px-4">Contents</h3>
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${activeSection === section.id
                                            ? "bg-primary/10 text-primary border-primary"
                                            : "text-text-muted hover:text-white border-transparent hover:bg-white/5"
                                            }`}
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* RIGHT CONTENT */}
                        <div className="flex-1 max-w-3xl">
                            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-poppins prose-headings:font-bold prose-headings:text-white prose-p:text-text-muted prose-li:text-text-muted prose-strong:text-white prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

                                <section id="introduction" className="scroll-mt-32 mb-16 border-b border-white/5 pb-12">
                                    <h2 className="text-3xl font-bold text-white mb-6">1. Introduction</h2>
                                    <p className="text-text-muted leading-relaxed mb-6">
                                        Digihub Solutions Pvt. Ltd. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                                        you visit our website or use our services.
                                    </p>
                                    <p className="text-text-muted leading-relaxed">
                                        We respect your privacy and are committed to protecting details you provide to us through forms, emails, or other digital channels.
                                    </p>
                                </section>

                                <section id="info-collect" className="scroll-mt-32 mb-16 border-b border-white/5 pb-12">
                                    <h2 className="text-3xl font-bold text-white mb-6">2. Information We Collect</h2>

                                    <h3 className="text-xl font-semibold text-white mt-8 mb-4">2.1 Personal Information</h3>
                                    <p className="text-text-muted leading-relaxed mb-4">We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                                    <ul className="list-disc pl-6 space-y-3 mb-8 text-text-muted marker:text-primary">
                                        <li className="pl-2">Name and contact information (email, phone number)</li>
                                        <li className="pl-2">Company name and business information</li>
                                        <li className="pl-2">Communication preferences</li>
                                        <li className="pl-2">Any other information you provide in forms or communications</li>
                                    </ul>

                                    <h3 className="text-xl font-semibold text-white mt-8 mb-4">2.2 Automatically Collected Information</h3>
                                    <p className="text-text-muted leading-relaxed mb-4">We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information.</p>
                                    <ul className="list-disc pl-6 space-y-3 text-text-muted marker:text-primary">
                                        <li className="pl-2">IP address and browser type</li>
                                        <li className="pl-2">Device information and operating system</li>
                                        <li className="pl-2">Pages visited and referring website addresses</li>
                                        <li className="pl-2">Timestamps of visits</li>
                                    </ul>
                                </section>

                                <section id="how-use" className="scroll-mt-32 mb-16 border-b border-white/5 pb-12">
                                    <h2 className="text-3xl font-bold text-white mb-6">3. How We Use Your Information</h2>
                                    <p className="text-text-muted leading-relaxed mb-4">We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                                    <ul className="list-disc pl-6 space-y-3 text-text-muted marker:text-primary">
                                        <li className="pl-2">To respond to your inquiries and provide customer support</li>
                                        <li className="pl-2">To send you marketing communications (with your consent)</li>
                                        <li className="pl-2">To improve our website, services, and user experience</li>
                                        <li className="pl-2">To comply with legal obligations and prevent fraud</li>
                                        <li className="pl-2">To monitor and analyze trends, usage, and activities</li>
                                    </ul>
                                </section>

                                <section id="security" className="scroll-mt-32 mb-16 border-b border-white/5 pb-12">
                                    <h2 className="text-3xl font-bold text-white mb-6">4. Data Security</h2>
                                    <p className="text-text-muted leading-relaxed mb-6">
                                        We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                                    </p>
                                    <p className="text-text-muted leading-relaxed mb-4">Our security measures include:</p>
                                    <ul className="list-disc pl-6 space-y-3 text-text-muted marker:text-primary">
                                        <li className="pl-2">SSL/TLS encryption for data transmission</li>
                                        <li className="pl-2">Secure database storage with encryption at rest</li>
                                        <li className="pl-2">Regular security audits and access controls</li>
                                    </ul>
                                </section>

                                <section id="cookies" className="scroll-mt-32 mb-16 border-b border-white/5 pb-12">
                                    <h2 className="text-3xl font-bold text-white mb-6">5. Cookies & Tracking</h2>
                                    <p className="text-text-muted leading-relaxed mb-6">
                                        We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                                    </p>
                                    <p className="text-text-muted leading-relaxed">
                                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                                    </p>
                                </section>

                                <section id="sharing" className="scroll-mt-32 mb-16 border-b border-white/5 pb-12">
                                    <h2 className="text-3xl font-bold text-white mb-6">6. Sharing of Information</h2>
                                    <p className="text-text-muted leading-relaxed mb-6">
                                        We do not sell, rent, or trade your personal information to third parties for their promotional purposes. We may share data only when:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-4 text-text-muted marker:text-primary">
                                        <li className="pl-2"><strong className="text-white">Required by law:</strong> We may disclose information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                                        <li className="pl-2"><strong className="text-white">Necessary to provide services:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.</li>
                                        <li className="pl-2"><strong className="text-white">Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                                    </ul>
                                </section>

                                <section id="rights" className="scroll-mt-32 mb-16 border-b border-white/5 pb-12">
                                    <h2 className="text-3xl font-bold text-white mb-6">7. Your Rights</h2>
                                    <p className="text-text-muted leading-relaxed mb-6">
                                        Depending on your region, you may have the right to request access to and receive details about the personal information we maintain about you, update and correct inaccuracies in your personal data, restrict or object to the processing of your personal data, have the information anonymized or deleted, as appropriate, or exercise your right to data portability.
                                    </p>
                                    <ul className="list-disc pl-6 space-y-3 mb-6 text-text-muted marker:text-primary">
                                        <li className="pl-2">Request access to your data</li>
                                        <li className="pl-2">Request correction or deletion of your data</li>
                                        <li className="pl-2">Opt-out of marketing communications</li>
                                    </ul>
                                    <p className="text-text-muted leading-relaxed">
                                        To exercise these rights, please contact us through the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
                                    </p>
                                </section>

                                <section id="links" className="scroll-mt-32 mb-16 border-b border-white/5 pb-12">
                                    <h2 className="text-3xl font-bold text-white mb-6">8. External Links</h2>
                                    <p className="text-text-muted leading-relaxed">
                                        Our website may contain links to third-party websites. We are not responsible for their content or privacy practices. We encourage you to review the privacy policies of these third-party sites before providing any personal information to them.
                                    </p>
                                </section>

                                <section id="changes" className="scroll-mt-32 mb-16 border-b border-white/5 pb-12">
                                    <h2 className="text-3xl font-bold text-white mb-6">9. Changes to This Privacy Policy</h2>
                                    <p className="text-text-muted leading-relaxed">
                                        We may update this Privacy Policy from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
                                    </p>
                                </section>

                                <section id="contact" className="scroll-mt-32 mb-8">
                                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 not-prose">
                                        <h2 className="text-2xl font-bold font-poppins text-white mb-6">10. Contact Us</h2>
                                        <p className="text-text-muted mb-6">
                                            If you have any questions about this Privacy Policy, please contact us:
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Mail className="w-5 h-5 text-primary" />
                                                    <span className="font-semibold text-white">Email Us</span>
                                                </div>
                                                <a href="mailto:contact.digihubsolutions@gmail.com" className="text-sm text-text-muted group-hover:text-primary transition-colors">
                                                    contact.digihubsolutions@gmail.com
                                                </a>
                                            </div>

                                            <div className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Share2 className="w-5 h-5 text-primary" />
                                                    <span className="font-semibold text-white">Visit Website</span>
                                                </div>
                                                <a href="https://digihubsolution.tech" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted group-hover:text-primary transition-colors">
                                                    digihubsolution.tech
                                                </a>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/5 text-center sm:text-left">
                                            <span className="text-white font-semibold">Digihub Solutions</span>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}

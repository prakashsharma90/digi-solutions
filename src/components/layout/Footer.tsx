import { Container } from "@/components/ui/container";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

const footerLinks = {
    services: [
        { label: "SEO & Growth", href: "/services/seo" },
        { label: "Paid Advertising", href: "/services/ads" },
        { label: "Social Media", href: "/services/social" },
        { label: "AI Automation", href: "/services/automation" },
        { label: "Content Marketing", href: "/services/content-marketing" },
        { label: "Web Development", href: "/services/web-dev" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Case Studies", href: "/blog" },
        { label: "Careers", href: "/contact" },
        { label: "Contact", href: "/contact" },
    ],
    contact: [
        { label: "contact@digihub.com", href: "mailto:contact@digihub.com" },
        { label: "+91 98765 43210", href: "tel:+919876543210" },
        { label: "Remote-First Team • India", href: "/contact" },
    ],
};

const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold font-poppins tracking-tight text-white hover:text-primary transition-colors">
                            Digi<span className="text-primary">hub</span>
                        </Link>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Performance marketing agency helping businesses turn ad spend into predictable revenue since 2024.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {socialLinks.map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="text-text-muted hover:text-primary transition-colors"
                                >
                                    <social.icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="font-semibold text-lg mb-6">Services</h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-text-muted text-sm hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="font-semibold text-lg mb-6">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-text-muted text-sm hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="font-semibold text-lg mb-6">Contact</h3>
                        <ul className="space-y-3">
                            {footerLinks.contact.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-text-muted text-sm hover:text-primary transition-colors block">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
                    <div>
                        &copy; {new Date().getFullYear()} Digihub Solutions. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

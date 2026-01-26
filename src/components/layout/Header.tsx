"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Rocket, User, LogOut, LayoutDashboard, Phone } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { servicesData } from "@/data/services";
import { ServicesMegaMenu } from "./ServicesMegaMenu";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
];

export function Header() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesHovered, setServicesHovered] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Refs for mega menu
    const megaMenuRef = useRef<HTMLDivElement>(null);
    const servicesLinkRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Only show profile icon on admin routes
    const isAdminRoute = pathname?.startsWith('/admin');

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/auth/session");
            const data = await res.json();
            setIsLoggedIn(data.isAuthenticated);
        };
        checkAuth();
    }, []);

    // Keyboard navigation for mega menu
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && servicesHovered) {
                setServicesHovered(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [servicesHovered]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setIsLoggedIn(false);
        setProfileOpen(false);
        router.refresh();
        router.push("/admin/login");
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    // Mega menu hover handlers with delay
    const handleServicesMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        hoverTimeoutRef.current = setTimeout(() => {
            setServicesHovered(true);
        }, 150); // 150ms delay before opening
    };

    const handleServicesMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        hoverTimeoutRef.current = setTimeout(() => {
            setServicesHovered(false);
        }, 200); // 200ms delay before closing
    };

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "py-3" : "py-4"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container className="flex items-center justify-between">
                {/* Logo - Left */}
                <Link href="/" className="flex items-center gap-2 z-50 group">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-black font-black text-xl">D</span>
                    </div>
                    <span className="text-xl font-bold font-poppins tracking-tight text-white group-hover:text-primary transition-colors">
                        Digihub
                    </span>
                </Link>

                {/* Center Navigation - Pill Container */}
                <nav className="hidden lg:flex items-center">
                    <div className={cn(
                        "flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-300",
                        scrolled ? "bg-[#0F141A]/95 backdrop-blur-md border border-white/10" : "bg-[#0F141A]/80 backdrop-blur-sm border border-white/5"
                    )}>
                        {navLinks.map((item, index) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

                            if (item.hasDropdown) {
                                return (
                                    <div
                                        key={item.name}
                                        ref={servicesLinkRef}
                                        className="relative"
                                        onMouseEnter={handleServicesMouseEnter}
                                        onMouseLeave={handleServicesMouseLeave}
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-1 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-primary text-black"
                                                    : "text-gray-300 hover:text-white hover:bg-white/5"
                                            )}
                                            aria-haspopup="true"
                                            aria-expanded={servicesHovered}
                                        >
                                            {item.name}
                                            <ChevronDown size={14} className={cn("transition-transform duration-300", servicesHovered ? "rotate-180" : "")} />
                                        </Link>

                                        {/* Mega Menu */}
                                        <AnimatePresence>
                                            {servicesHovered && (
                                                <div
                                                    ref={megaMenuRef}
                                                    onMouseEnter={handleServicesMouseEnter}
                                                    onMouseLeave={handleServicesMouseLeave}
                                                >
                                                    <ServicesMegaMenu onClose={() => setServicesHovered(false)} />
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-primary text-black"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Right Side - Auth Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                    {isAdminRoute && isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                            >
                                <User size={18} />
                            </button>

                            {profileOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#0F141A] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                                    <Link
                                        href="/admin/dashboard"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <LayoutDashboard size={16} />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors w-full text-left"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <a
                                href="https://wa.me/919105436322"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-full font-medium shadow-lg hover:shadow-green-500/20 transition-all flex items-center gap-2"
                                >
                                    <Phone size={18} />
                                    Call Now
                                </Button>
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden z-50 p-2 text-white hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </Container>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[40] w-full h-dvh bg-background/95 backdrop-blur-xl flex flex-col items-center justify-start gap-8 md:hidden overflow-y-auto pt-24 pb-10"
                    >
                        <nav className="flex flex-col items-center gap-6 text-center w-full px-6">
                            {navLinks.map((item) => {
                                if (item.hasDropdown) {
                                    return (
                                        <div key={item.name} className="flex flex-col items-center gap-2">
                                            <button
                                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                                className="text-2xl font-bold text-white hover:text-primary transition-colors flex items-center gap-2"
                                            >
                                                {item.name}
                                                <ChevronDown size={20} className={cn("transition-transform", mobileServicesOpen ? "rotate-180" : "")} />
                                            </button>

                                            <AnimatePresence>
                                                {mobileServicesOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="flex flex-col gap-4 pl-4 border-l border-white/10"
                                                    >
                                                        {Object.entries(servicesData).map(([slug, service]) => (
                                                            <Link
                                                                key={slug}
                                                                href={`/services/${slug}`}
                                                                className="text-lg text-gray-400 hover:text-primary"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {service.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )
                                }
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-2xl font-bold text-white hover:text-primary transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                        <Button
                            className="mt-4 w-64 shadow-[0_0_20px_-5px_var(--color-primary)]"
                            size="lg"
                        >
                            Get Started
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

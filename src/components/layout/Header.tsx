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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "py-4 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-primary/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    : "py-6 bg-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container className="flex items-center h-full">
                {/* Logo - Left (Flexible container to balance center) */}
                <div className="flex-1 flex items-center">
                    <Link href="/" className="flex items-center gap-2 z-50 group">
                        <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden">
                            <Image
                                src="/Digihub Solution (1).png"
                                alt="Digihub Logo"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                        <span className="text-lg md:text-2xl font-bold font-poppins tracking-tight text-white group-hover:text-primary transition-colors whitespace-nowrap">
                            Digihub Solution
                        </span>
                    </Link>
                </div>

                {/* Center Navigation - Unified & Spacious */}
                <nav className="hidden lg:flex items-center justify-center">
                    <div className="flex items-center gap-8">
                        {navLinks.map((item, index) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

                            if (item.hasDropdown) {
                                return (
                                    <div
                                        key={item.name}
                                        ref={servicesLinkRef}
                                        className="relative group/menu"
                                        onMouseEnter={handleServicesMouseEnter}
                                        onMouseLeave={handleServicesMouseLeave}
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-1.5 text-sm font-medium transition-all duration-300 relative py-2",
                                                isActive
                                                    ? "text-white"
                                                    : "text-gray-400 hover:text-white"
                                            )}
                                            aria-haspopup="true"
                                            aria-expanded={servicesHovered}
                                        >
                                            {item.name}
                                            <ChevronDown
                                                size={12}
                                                className={cn(
                                                    "transition-transform duration-300 opacity-70 group-hover/menu:opacity-100",
                                                    servicesHovered ? "rotate-180" : ""
                                                )}
                                            />

                                            {/* Active Indicator Dot */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-active"
                                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_oklch(var(--primary))]"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
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
                                        "text-sm font-medium transition-all duration-300 relative py-2",
                                        isActive
                                            ? "text-white"
                                            : "text-gray-400 hover:text-white"
                                    )}
                                >
                                    {item.name}

                                    {/* Active Indicator Dot - Animated */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_oklch(var(--primary))]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Right Side - Auth/CTA Buttons (Flexible container to balance center) */}
                <div className="flex-1 flex items-center justify-end gap-3">
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
                                className="hidden sm:block"
                            >
                                <Button
                                    size="sm"
                                    className="bg-primary hover:bg-primary/90 text-black rounded-full font-bold shadow-[0_0_20px_-5px_#00D9C3] transition-all flex items-center gap-2 px-4"
                                >
                                    <Phone size={14} />
                                    <span className="hidden md:inline">Call Now</span>
                                    <span className="md:hidden">Call</span>
                                </Button>
                            </a>

                            {/* Mobile Menu Toggle Button remains here but only visible on mobile */}
                            <button
                                className="lg:hidden z-50 p-2 text-white hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </>
                    )}
                </div>
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
        </motion.header >
    );
}

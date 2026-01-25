"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Rocket, User, LogOut, LayoutDashboard } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { servicesData } from "@/data/services";

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

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-[#0B0F14]/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1 z-50 group">
                    <span className="text-2xl font-bold font-poppins tracking-tight text-white group-hover:text-primary transition-colors">
                        Digi<span className="text-primary">hub</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((item) => {
                        if (item.hasDropdown) {
                            return (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => setServicesHovered(true)}
                                    onMouseLeave={() => setServicesHovered(false)}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-primary transition-colors py-4"
                                    >
                                        {item.name}
                                        <ChevronDown size={14} className={cn("transition-transform duration-300", servicesHovered ? "rotate-180" : "")} />
                                    </Link>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {servicesHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[#0F141A] border border-white/10 rounded-xl shadow-xl overflow-hidden p-6"
                                            >
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    {Object.entries(servicesData).slice(0, 6).map(([slug, service]) => (
                                                        <Link
                                                            key={slug}
                                                            href={`/services/${slug}`}
                                                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            <div className="p-2 bg-primary/10 rounded-md text-primary group-hover/item:bg-primary group-hover/item:text-black transition-colors">
                                                                <Rocket size={16} />
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-white group-hover/item:text-primary transition-colors text-sm">
                                                                    {service.name}
                                                                </div>
                                                                <div className="text-[10px] text-gray-400 line-clamp-1 mt-1">
                                                                    {service.metaDesc.substring(0, 40)}...
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                                <Link
                                                    href="/services"
                                                    className="flex items-center justify-center py-2 text-sm text-primary hover:text-white transition-colors border-t border-white/5 mt-2 pt-4"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    View All 20+ Services
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-gray-300 hover:text-primary transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    {isLoggedIn && isAdminRoute ? (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/30 transition-all shadow-[0_0_15px_-5px_var(--color-primary)]"
                                aria-label="User profile menu"
                            >
                                <User size={20} aria-hidden="true" />
                            </button>

                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute top-full right-0 mt-3 w-48 bg-[#0F141A] border border-white/10 rounded-xl shadow-2xl p-2 z-[60]"
                                    >
                                        <Link
                                            href="/admin/dashboard"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <LayoutDashboard size={16} aria-hidden="true" />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <LogOut size={16} aria-hidden="true" />
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link href="/contact" className="hidden md:flex">
                            <Button className="shadow-[0_0_20px_-10px_var(--color-primary)] hover:shadow-[0_0_25px_-5px_var(--color-primary)] transition-all">
                                Get Started
                            </Button>
                        </Link>
                    )}

                    <button
                        className="md:hidden z-50 p-2 text-white hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
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
        </motion.header>
    );
}

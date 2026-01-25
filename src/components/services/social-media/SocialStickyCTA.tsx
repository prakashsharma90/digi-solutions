"use client";

import { useState, useEffect } from "react";
import { Sparkles, Calendar, DollarSign, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function SocialStickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500 && !isDismissed) {
                setIsVisible(true);
            } else if (window.scrollY <= 500) {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDismissed]);

    if (isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0B0F14]/95 to-[#0F1419]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
                >
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-sm md:text-base">
                                        Ready to grow your social presence?
                                    </div>
                                    <div className="text-gray-400 text-xs md:text-sm">
                                        Get your free 7-day content audit • No obligations
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href="#lead-capture"
                                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold px-6 py-3 rounded-full transition-all text-sm whitespace-nowrap"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Free Audit
                                </Link>
                                <Link
                                    href="/contact"
                                    className="hidden sm:inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full border border-white/10 transition-all text-sm whitespace-nowrap"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Talk to Expert
                                </Link>
                                <Link
                                    href="#pricing"
                                    className="hidden md:inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full border border-white/10 transition-all text-sm whitespace-nowrap"
                                >
                                    <DollarSign className="w-4 h-4" />
                                    View Pricing
                                </Link>
                                <button
                                    onClick={() => setIsDismissed(true)}
                                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                                    aria-label="Dismiss"
                                >
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Minimum load time for a smooth experience
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Cleaned up, perfectly minimal
    // Design: Central spinning ring. 4 Distinct lines "floating" outside.
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                >
                    <div className="relative flex items-center justify-center w-24 h-24">

                        {/* 1. The Central Spinning Ring */}
                        {/* It's a ring border, but only 25% or 50% visible to show rotation clearly */}
                        <motion.div
                            className="w-12 h-12 rounded-full border-[3px] border-primary/20 border-t-primary"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />

                        {/* 2. Four surrounding lines */}
                        {/* They are positioned absolutely relative to the center */}

                        {/* Top Line */}
                        <motion.div
                            className="absolute top-2 w-[2px] h-[6px] bg-primary/80 rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0, ease: "easeInOut" }}
                        />

                        {/* Right Line */}
                        <motion.div
                            className="absolute right-2 w-[6px] h-[2px] bg-primary/80 rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.375, ease: "easeInOut" }}
                        />

                        {/* Bottom Line */}
                        <motion.div
                            className="absolute bottom-2 w-[2px] h-[6px] bg-primary/80 rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75, ease: "easeInOut" }}
                        />

                        {/* Left Line */}
                        <motion.div
                            className="absolute left-2 w-[6px] h-[2px] bg-primary/80 rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 1.125, ease: "easeInOut" }}
                        />

                    </div>
                    {/* Subtle Back Glow */}
                    <div className="absolute w-[200px] h-[200px] bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

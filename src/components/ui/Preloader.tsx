"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading time (e.g., 2 seconds) or wait for window load
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0F14]"
                >
                    <div className="relative flex items-center justify-center w-64 h-64">
                        {/* Ring 1 - Outer vertical rotation */}
                        <motion.div
                            className="absolute w-24 h-24 border-2 border-primary/40 rounded-full"
                            style={{ borderTopColor: "transparent", borderBottomColor: "transparent" }}
                            animate={{ rotateX: 360, rotateY: 180, rotateZ: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Ring 2 - Horizontal/Diagonal rotation */}
                        <motion.div
                            className="absolute w-24 h-24 border-2 border-secondary/60 rounded-full"
                            style={{ borderLeftColor: "transparent", borderRightColor: "transparent" }}
                            animate={{ rotateX: 180, rotateY: 360, rotateZ: 180 }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Ring 3 - The chaotic inner ring */}
                        <motion.div
                            className="absolute w-16 h-16 border-[3px] border-primary rounded-full shadow-[0_0_15px_rgba(0,217,195,0.5)]"
                            style={{ borderRightColor: "transparent", borderTopColor: "transparent" }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Central Glow Point */}
                        <motion.div
                            className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

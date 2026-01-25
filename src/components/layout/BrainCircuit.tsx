"use client";

import { motion } from "framer-motion";

export function BrainCircuit() {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full" />

            <svg
                viewBox="0 0 800 600"
                className="w-full h-full max-w-[800px] opacity-90"
            >
                {/* Neural Paths */}
                <motion.path
                    d="M400,300 L200,150 L150,300 L200,450 L400,300"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                <motion.path
                    d="M400,300 L600,150 L650,300 L600,450 L400,300"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                <motion.path
                    d="M400,300 L400,100 M400,300 L400,500"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />

                {/* Floating Nodes */}
                <Node cx={400} cy={300} delay={0} />
                <Node cx={200} cy={150} delay={0.2} />
                <Node cx={150} cy={300} delay={0.4} />
                <Node cx={200} cy={450} delay={0.6} fail />
                <Node cx={600} cy={150} delay={0.8} />
                <Node cx={650} cy={300} delay={1.0} />
                <Node cx={600} cy={450} delay={1.2} />
                <Node cx={400} cy={100} delay={1.4} />
                <Node cx={400} cy={500} delay={1.6} />

                {/* Definitions for Gradients */}
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="1" />
                        <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

const Node = ({ cx, cy, delay, fail }: { cx: number; cy: number; delay: number; fail?: boolean }) => (
    <motion.circle
        cx={cx}
        cy={cy}
        r="6"
        fill="var(--background)"
        stroke="var(--color-primary)"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: 1 }}
        transition={{ duration: 2, delay, repeat: Infinity }}
    />
);

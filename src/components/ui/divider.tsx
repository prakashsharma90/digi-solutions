"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedDividerProps {
    className?: string
}

export function AnimatedDivider({ className }: AnimatedDividerProps) {
    return (
        <div className={cn("relative w-full h-[1px] my-8", className)}>
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent blur-sm"
            />
        </div>
    )
}

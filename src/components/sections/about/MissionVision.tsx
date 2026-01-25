"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb } from "lucide-react";

const cards = [
    {
        title: "Our Mission",
        icon: Target,
        text: "To empower businesses with marketing strategies that generate measurable ROI, reducing wasted ad spend and maximizing impact.",
    },
    {
        title: "Our Vision",
        icon: Eye,
        text: "To be the growth engine behind the world's most innovative brands, setting a new standard for performance marketing.",
    },
    {
        title: "Our Purpose",
        icon: Lightbulb,
        text: "Turn intelligence into impact and strategy into sustainable growth.",
    },
];

export function MissionVision() {
    return (
        <Section className="bg-background relative">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors"
                        >
                            {/* Hover Glow Background */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

                            <div className="relative z-10 space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <card.icon className="w-6 h-6 text-primary" />
                                </div>

                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                    {card.title}
                                </h3>

                                <p className="text-text-muted leading-relaxed">
                                    {card.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

"use client";

import { Container, Section } from "@/components/ui/container";
import { Building2, ShoppingCart, User, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const audiences = [
    {
        icon: Building2,
        title: "SaaS & Startups",
        description: "Build thought leadership and generate qualified leads",
    },
    {
        icon: ShoppingCart,
        title: "Ecommerce Brands",
        description: "Drive product discovery and social commerce sales",
    },
    {
        icon: User,
        title: "Founders & Creators",
        description: "Grow your personal brand and audience authority",
    },
    {
        icon: Briefcase,
        title: "B2B Companies",
        description: "Position as industry leaders and attract enterprise clients",
    },
];

export function SocialWhoThisIsFor() {
    return (
        <Section className="bg-gradient-to-b from-background to-[#0B0F14]">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Who This Is{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Perfect For
                            </span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-primary/30 transition-all group text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors mx-auto">
                                <audience.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{audience.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{audience.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

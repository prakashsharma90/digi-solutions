"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Users, Code2, LineChart, ServerCog } from "lucide-react";

const roles = [
    {
        title: "Strategy & Growth",
        desc: "Architects of scalable digital ecosystems.",
        icon: Users,
    },
    {
        title: "Performance Marketing",
        desc: "Data-obsessed campaign optimizers.",
        icon: LineChart,
    },
    {
        title: "Web & Automation",
        desc: "Builders of high-converting interfaces.",
        icon: Code2,
    },
    {
        title: "AI & Data Solutions",
        desc: "Engineers of intelligent workflows.",
        icon: ServerCog,
    },
];

export function TeamExpertise() {
    return (
        <Section className="bg-background relative">
            <Container>
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                        Capabilities Over Titles
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-muted"
                    >
                        Our team is a collective of specialized experts.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roles.map((role, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/50 text-center transition-all"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0B0F14] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_-10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_-10px_var(--color-primary)]">
                                <role.icon className="w-7 h-7 text-white/80 group-hover:text-primary transition-colors" />
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2">{role.title}</h3>
                            <p className="text-sm text-text-muted">{role.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

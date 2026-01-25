"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";

const steps = [
    {
        phase: "01",
        title: "Discovery & Audit",
        desc: "We analyze your current infrastructure, competitors, and market gaps using deep data scraping.",
    },
    {
        phase: "02",
        title: "Strategy Blueprint",
        desc: "We build a custom roadmap aligned with revenue goals, not just vanity metrics.",
    },
    {
        phase: "03",
        title: "Execution & Launch",
        desc: "Deploying campaigns, automations, and content with precision timing.",
    },
    {
        phase: "04",
        title: "Optimization & Learning",
        desc: "Continuous A/B testing and AI-driven adjustments to maximize ROAS.",
    },
    {
        phase: "05",
        title: "Scale & Automation",
        desc: "Expanding successful channels and automating workflows for hands-off growth.",
    },
];

export function ServicesProcess() {
    return (
        <Section className="bg-[#0B0F14] relative py-10 overflow-hidden">
            <Container>
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How We Work</h2>
                    <p className="text-text-muted text-lg">Our proven framework for predictable growth.</p>
                </div>

                {/* Timeline Desktop */}
                <div className="relative hidden md:grid grid-cols-5 gap-4">
                    {/* Connector Line */}
                    <div className="absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="relative pt-16 text-center group"
                        >
                            {/* Dot */}
                            <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0B0F14] border-2 border-primary rounded-full z-10 group-hover:bg-primary transition-colors duration-300 shadow-[0_0_0_4px_#0B0F14]" />

                            <span className="text-6xl font-bold text-white/5 absolute top-0 left-1/2 -translate-x-1/2 -z-10 font-poppins select-none">
                                {step.phase}
                            </span>

                            <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-sm text-text-muted">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Timeline Mobile (Vertical) */}
                <div className="md:hidden space-y-12 relative border-l border-white/10 ml-4 pl-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative">
                            <div className="absolute top-0 -left-[39px] w-4 h-4 bg-[#0B0F14] border-2 border-primary rounded-full z-10" />
                            <span className="text-xs font-mono text-primary mb-2 block tracking-widest">PHASE {step.phase}</span>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-text-muted">{step.desc}</p>
                        </div>
                    ))}
                </div>

            </Container>
        </Section>
    );
}

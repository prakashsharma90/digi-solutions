"use client";

import { Container, Section } from "@/components/ui/container";
import { LeadForm } from "@/components/forms/LeadForm";
import { motion } from "framer-motion";

interface ConsultationFormSectionProps {
    title?: string;
    subtitle?: string;
    source: string;
}

export function ConsultationFormSection({
    title = "Ready to Supercharge Your Growth?",
    subtitle = "Fill out the form below and our AI-strategy experts will get back to you with a custom growth plan.",
    source
}: ConsultationFormSectionProps) {
    return (
        <Section className="py-24 bg-[#0F141A] relative overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {title}
                            </h2>
                            <p className="text-xl text-text-muted mb-8 leading-relaxed max-w-xl">
                                {subtitle}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold">1</div>
                                    <p className="text-white/80 font-medium">Free 30-minute strategy call</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold">2</div>
                                    <p className="text-white/80 font-medium">Custom AI audit of your current digital presence</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold">3</div>
                                    <p className="text-white/80 font-medium">Predictable growth roadmap & pricing</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative z-10 backdrop-blur-sm"
                    >
                        <LeadForm source={source} />
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}

"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";

export function AboutHero() {
    return (
        <Section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(11,15,20,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(11,15,20,0.8)_2px,transparent_2px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] opacity-20 pointer-events-none" />
            </div>

            <Container className="relative z-10 pt-10 pb-3">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <span className="inline-block px-4 py-2 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                            About Digihub Solutions
                        </span>
                    </motion.div>

                    {/* H1 */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
                    >
                        Building Intelligent <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Marketing & Growth Engines
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed"
                    >
                        Digihub Solutions is a performance-first digital marketing agency helping businesses scale through SEO, paid media, and data-driven strategy.
                    </motion.p>
                </div>
            </Container>

            {/* Decorative Particle Overlay (Simulated with simple dots for now, can be upgraded to Canvas later) */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-75" />
                <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
            </div>
        </Section>
    );
}

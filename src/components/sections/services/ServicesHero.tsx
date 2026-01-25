"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";

export function ServicesHero() {
  return (
    <Section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#0B0F14]">

      {/* Background Ambience */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mt-18 mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">Our Services</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
        >
          AI-Powered Digital Services <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Built to Scale
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          From strategy to execution, Digihub Solutions delivers data-driven digital services designed for measurable growth.
        </motion.p>

        {/* Abstract Abstract Graphic / Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute md:top-1/2 md:-right-20 lg:-right-0 w-64 h-64 border border-white/5 rounded-full border-dashed animate-spin-slow opacity-20 hidden md:block pointer-events-none"
        />

      </Container>
    </Section>
  );
}

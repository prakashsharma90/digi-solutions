"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

export function ServicesCTA() {
    return (
        <Section className="relative bg-[#0B0F14] py-32 overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

            <Container className="relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                    Let’s Build the Right <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Growth System</span> for You
                </h2>

                <p className="text-xl text-text-muted max-w-2xl mx-auto mb-12">
                    No generic packages. No guesswork. Just intelligent execution designed to scale your revenue.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/contact" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full h-14 px-10 text-lg shadow-[0_0_30px_-5px_var(--color-primary)] transition-all">
                            Start Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/contact" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="w-full h-14 px-10 text-lg border-white/10 hover:bg-white/5 transition-all text-white">
                            View Pricing
                        </Button>
                    </Link>
                </div>

                <div className="mt-12 text-sm text-text-muted/60 font-mono">
                    Trusted by 50+ High-Growth Companies
                </div>
            </Container>
        </Section>
    );
}

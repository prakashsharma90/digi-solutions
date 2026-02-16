"use client";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

import Link from "next/link";

export function AboutCTA() {
    return (
        <Section className="relative border-t border-white/10 overflow-hidden py-24 md:py-32">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-background">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(11,15,20,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(11,15,20,0.8)_2px,transparent_2px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] opacity-20 pointer-events-none" />
            </div>

            <Container className="relative z-10">
                <div className="bg-[#0D1117] border border-white/10 rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden group">
                    {/* Subtle Glow */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
                        <div className="max-w-xl space-y-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                                Let&apos;s Create Your <br />
                                <span className="text-primary tracking-tight">Success Story.</span>
                            </h2>
                            <p className="text-base md:text-lg text-text-muted leading-relaxed">
                                Ready to take your digital marketing to the next level? No obligations, just honest conversation about your goals.
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <Link href="/contact">
                                <Button className="bg-primary hover:bg-primary/90 text-black rounded-full font-bold text-lg px-10 h-16 shadow-[0_0_30px_-5px_#00D9C3] transition-all hover:scale-105 active:scale-95">
                                    Get Started Today
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

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

            <Container className="relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                        Ready to Skyrocket <br />
                        <span className="text-primary">Your Revenue?</span>
                    </h2>

                    <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
                        Stop buying clicks. Start buying customers. <br className="hidden md:block" /> Let's build your custom marketing roadmap.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" variant="neon" className="w-full text-base px-8 h-12 shadow-[0_0_20px_-5px_var(--color-primary)] transition-all">
                                Book Free Consultation
                            </Button>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full gap-2 text-base px-8 h-12 hover:bg-white/5 border-white/10 text-white transition-all">
                                <MessageSquare size={18} />
                                Talk to an Expert
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

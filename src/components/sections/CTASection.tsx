import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export function CTASection() {
    return (
        <Section className="relative border-t border-white/10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-background">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
            </div>

            <Container className="relative z-10 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Ready to Build Your <br />
                        <span className="text-primary">Digital Growth Engine?</span>
                    </h2>

                    <div className="flex items-center justify-center gap-3 text-lg md:text-xl font-medium text-text-muted mb-10 font-mono">
                        <span>Data</span>
                        <span className="text-primary">→</span>
                        <span>Decisions</span>
                        <span className="text-primary">→</span>
                        <span>Customers</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" variant="neon" className="w-full text-base px-8 h-12">
                                Start Free Consultation
                            </Button>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full gap-2 text-base px-8 h-12">
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

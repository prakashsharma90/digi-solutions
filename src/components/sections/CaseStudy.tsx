import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CaseStudy() {
    return (
        <Section className="bg-white/5 border-y border-white/5">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20">
                            <span className="text-primary text-sm font-medium">Featured Case Study</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            FinTech Scale-Up
                        </h2>

                        <div className="space-y-6 mb-8 text-text-muted">
                            <div>
                                <h3 className="text-text-primary font-semibold mb-2">Challenge</h3>
                                <p>Stagnant user acquisition despite high ad spend. High Customer Acquisition Cost (CAC).</p>
                            </div>
                            <div>
                                <h3 className="text-text-primary font-semibold mb-2">Solution</h3>
                                <p>Implemented AI-driven audience targeting and automated email nurturing sequences.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="p-4 rounded-xl bg-background border border-white/10">
                                <div className="text-3xl font-bold text-primary mb-1">350%</div>
                                <div className="text-sm text-text-muted">User Growth</div>
                            </div>
                            <div className="p-4 rounded-xl bg-background border border-white/10">
                                <div className="text-3xl font-bold text-primary mb-1">-42%</div>
                                <div className="text-sm text-text-muted">CAC Reduction</div>
                            </div>
                        </div>

                        <Link href="/blog">
                            <Button variant="neon" className="gap-2 group">
                                View All Case Studies
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {/* Visual/Image Placeholder */}
                    <div className="lg:w-1/2 w-full">
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 group">
                            {/* Abstract representation of a dashboard or app interface */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col justify-center items-center">
                                <div className="w-full max-w-sm p-6 rounded-lg bg-gray-800/80 backdrop-blur border border-white/10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded bg-primary/20" />
                                        <div className="space-y-2 flex-1">
                                            <div className="h-2 w-3/4 bg-white/20 rounded" />
                                            <div className="h-2 w-1/2 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                    <div className="h-32 bg-background/50 rounded border border-white/5 relative overflow-hidden">
                                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/20 to-transparent" />
                                        {/* Fake Chart Line */}
                                        <svg className="absolute bottom-0 w-full h-24 text-primary" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path d="M0,100 L20,80 L40,85 L60,40 L80,50 L100,10 V100 Z" fill="currentColor" fillOpacity="0.2" />
                                            <path d="M0,100 L20,80 L40,85 L60,40 L80,50 L100,10" stroke="currentColor" strokeWidth="2" fill="none" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

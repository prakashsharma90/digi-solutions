import { Container, Section } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Activity, Database, GitBranch } from "lucide-react";

export function BrandStory() {
    return (
        <Section className="border-t border-white/5">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Content Side */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
                        <div className="space-y-6 text-text-muted text-lg leading-relaxed">
                            <p>
                                Digihub Solutions is built for modern businesses that demand <span className="text-text-primary font-medium">clarity, intelligence, and results</span>.
                            </p>
                            <p>
                                We combine AI-powered insights, strategic thinking, and execution excellence to create scalable digital systems that don't just work—they evolve.
                            </p>
                            <p className="text-white border-l-2 border-primary pl-4 italic">
                                "We don’t chase vanity metrics — we build growth engines."
                            </p>
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className="lg:w-1/2 w-full">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl rounded-2xl" />
                            <Card className="relative bg-black/80 border-white/10 backdrop-blur-xl p-6 overflow-hidden">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 p-4 rounded-lg bg-white/5 border border-white/5 flex items-center gap-4">
                                        <div className="p-3 rounded bg-primary/20 text-primary">
                                            <Activity size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-text-muted">System Status</div>
                                            <div className="font-mono text-green-400">OPTIMAL</div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                        <Database className="text-secondary mb-2" size={24} />
                                        <div className="text-2xl font-bold">1.2TB</div>
                                        <div className="text-xs text-text-muted">Data Processed</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                        <GitBranch className="text-primary mb-2" size={24} />
                                        <div className="text-2xl font-bold">99.9%</div>
                                        <div className="text-xs text-text-muted">Uptime</div>
                                    </div>
                                </div>

                                {/* Decorative Pattern */}
                                <svg className="absolute top-0 right-0 opacity-10" width="200" height="200" viewBox="0 0 100 100">
                                    <path d="M0 0 L100 0 L100 100" fill="none" stroke="currentColor" strokeWidth="1" />
                                    <path d="M20 0 L100 80" fill="none" stroke="currentColor" strokeWidth="1" />
                                    <path d="M40 0 L100 60" fill="none" stroke="currentColor" strokeWidth="1" />
                                    <path d="M60 0 L100 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </svg>
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

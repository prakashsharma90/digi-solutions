import { Container, Section } from "@/components/ui/container";

export function Mindset() {
    return (
        <Section>
            <Container>
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-medium tracking-widest uppercase">How We Think</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2">The AI-First Mindset</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-4xl mx-auto">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent mb-4" />
                        <h3 className="text-2xl font-bold">Data before decisions.</h3>
                        <p className="text-text-muted text-lg">We never guess. Every strategy is built on a foundation of rigorous data analysis and market intelligence.</p>
                    </div>

                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <div className="h-px w-full bg-gradient-to-r from-secondary/50 to-transparent mb-4" />
                        <h3 className="text-2xl font-bold">Automation before scale.</h3>
                        <p className="text-text-muted text-lg">Manual processes break at scale. We build automated systems that grow effortlessly with your business.</p>
                    </div>

                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <div className="h-px w-full bg-gradient-to-r from-purple-500/50 to-transparent mb-4" />
                        <h3 className="text-2xl font-bold">Systems before shortcuts.</h3>
                        <p className="text-text-muted text-lg">Hacks are temporary. Systems are permanent. We build durable infrastructure for long-term success.</p>
                    </div>

                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent mb-4" />
                        <h3 className="text-2xl font-bold">Performance before hype.</h3>
                        <p className="text-text-muted text-lg">We prioritize measurable outcomes—leads, sales, and ROI—over vanity metrics and buzzwords.</p>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

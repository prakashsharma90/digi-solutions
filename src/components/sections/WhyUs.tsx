import { Container, Section } from "@/components/ui/container";
import { Brain, BarChart3, Layers, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
    {
        icon: Brain,
        title: "AI-Driven Decisions",
        description: "We don't guess. We use advanced machine learning models to predict market trends and user behavior.",
    },
    {
        icon: BarChart3,
        title: "Transparent Reporting",
        description: "Live dashboards giving you real-time visibility into your ROI and campaign performance.",
    },
    {
        icon: Layers,
        title: "Scalable Systems",
        description: "Built for growth. Our strategies and tech stacks are designed to scale with your business.",
    },
    {
        icon: Zap,
        title: "Performance Execution",
        description: "Obsessed with speed and efficiency. We optimize every pixel and every line of code.",
    },
];

export function WhyUs() {
    return (
        <Section className="bg-white/5 border-y border-white/5">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Content Side */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Why <span className="text-primary">Digihub?</span>
                        </h2>
                        <p className="text-text-muted text-lg mb-8 leading-relaxed">
                            We bridge the gap between creative marketing and hard data.
                            While others guess, we engineer growth using proprietary AI tools
                            and a data-first philosophy that ensures sustainable success.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex flex-col gap-2 p-4 rounded-xl border border-white/5 bg-background/50">
                                    <feature.icon className="text-primary mb-2" size={24} />
                                    <h3 className="font-semibold text-text-primary text-lg">{feature.title}</h3>
                                    <p className="text-sm text-text-muted">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className="lg:w-1/2 w-full">
                        <div className="relative text-center">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                            <Card className="relative z-10 border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
                                <CardHeader className="border-b border-white/10 pb-4">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg font-medium">Growth Analytics</CardTitle>
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                    </div>
                                    <CardDescription>Live Performance Metrics</CardDescription>
                                </CardHeader>
                                <div className="p-6 h-[300px] flex items-end justify-between gap-2">
                                    {/* Simplified Chart Visualization */}
                                    {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                                        <div key={i} className="w-full bg-primary/20 rounded-t-sm hover:bg-primary/40 transition-all duration-500 relative group" style={{ height: `${height}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                +{height}% Growth
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Floating Element */}
                            <Card className="absolute -bottom-6 -right-6 w-48 border-white/10 bg-background/90 backdrop-blur shadow-xl animate-bounce-slow hidden md:block">
                                <div className="p-4 flex items-center gap-3">
                                    <div className="p-2 bg-green-500/20 rounded-full text-green-500">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-text-muted">Conversion Rate</div>
                                        <div className="font-bold text-lg text-green-400">+12.5%</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

function TrendingUp({ size, className }: { size?: number, className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
}

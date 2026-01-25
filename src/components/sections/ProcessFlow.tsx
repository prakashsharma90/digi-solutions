import { Container, Section } from "@/components/ui/container";
import { Search, Compass, Zap, BarChart, Rocket } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "1. Analyze",
        description: "Deep dive into your market positions and competitors.",
    },
    {
        icon: Compass,
        title: "2. Strategize",
        description: "Develop a custom roadmap tailored to your specific goals.",
    },
    {
        icon: Zap,
        title: "3. Execute",
        description: "Rapid deployment of campaigns and development.",
    },
    {
        icon: BarChart,
        title: "4. Optimize",
        description: "Continuous testing and refinement based on data.",
    },
    {
        icon: Rocket,
        title: "5. Scale",
        description: "Expanding reach and maximizing successful channels.",
    },
];

export function ProcessFlow() {
    return (
        <Section>
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Our systematic approach ensures consistency and predictable results.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 hidden lg:block" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-full bg-background border border-primary/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,229,192,0.1)] group-hover:shadow-[0_0_25px_rgba(0,229,192,0.4)] group-hover:border-primary transition-all duration-300">
                                    <step.icon className="text-primary group-hover:scale-110 transition-transform duration-300" size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-text-muted">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}

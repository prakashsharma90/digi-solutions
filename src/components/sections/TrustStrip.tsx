import { Container } from "@/components/ui/container";
import { Briefcase, Globe, TrendingUp, Cpu } from "lucide-react";

export function TrustStrip() {
  const stats = [
    {
      icon: Briefcase,
      label: "50+ Projects Delivered",
    },
    {
      icon: Globe,
      label: "10+ Industries Served",
    },
    {
      icon: TrendingUp,
      label: "Data-Driven Growth",
    },
    {
      icon: Cpu,
      label: "AI-First Approach",
    },
  ];

  return (
    <section className="border-y border-white/10 bg-background/50 backdrop-blur-sm relative z-20 py-5 ">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg border border-primary/20 bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                <stat.icon size={20} strokeWidth={1.5} />
              </div>
              <span className="font-medium text-text-primary text-sm md:text-base tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

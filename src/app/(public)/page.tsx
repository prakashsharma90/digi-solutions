import { HeroRedesign } from "@/components/layout/HeroRedesign";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesGridRedesign } from "@/components/sections/ServicesGridRedesign";
import { WhyUsRedesign } from "@/components/sections/WhyUsRedesign";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { CaseStudiesRedesign } from "@/components/sections/CaseStudiesRedesign";
import { Insights } from "@/components/sections/Insights";
import { CTASectionRedesign } from "@/components/sections/CTASectionRedesign";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary overflow-x-hidden">
      <HeroRedesign />
      <TrustStrip />
      <ServicesGridRedesign />
      <WhyUsRedesign />
      <ProcessFlow />
      <CaseStudiesRedesign />
      <Insights />
      <CTASectionRedesign />
    </main>
  );
}

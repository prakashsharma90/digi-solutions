import { HeroRedesign } from "@/components/layout/HeroRedesign";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { GrowthHero } from "@/components/sections/GrowthHero";
import { ServicesGridRedesign } from "@/components/sections/ServicesGridRedesign";
import { WhyUsRedesign } from "@/components/sections/WhyUsRedesign";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { CaseStudiesRedesign } from "@/components/sections/CaseStudiesRedesign";
import { Insights } from "@/components/sections/Insights";

import { HomeFAQ } from "@/components/sections/HomeFAQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary overflow-x-hidden">
      <GrowthHero />
      {/* <HeroRedesign /> */}
      <TrustStrip />
      <ServicesGridRedesign />
      <WhyUsRedesign />
      <ProcessFlow />
      {/* <CaseStudiesRedesign /> */}
      <Insights />
      <HomeFAQ />
    </main>
  );
}


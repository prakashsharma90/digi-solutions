import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesOverview } from "@/components/sections/services/ServicesOverview";
import { ServiceBreakdowns } from "@/components/sections/services/ServiceBreakdowns";
import { AIDifferentiator } from "@/components/sections/services/AIDifferentiator";
import { ServicesProcess } from "@/components/sections/services/ServicesProcess";
import { ServicesProof } from "@/components/sections/services/ServicesProof";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden">
            <ServicesHero />
            <ServicesOverview />
            <ServiceBreakdowns />
            <AIDifferentiator />
            <ServicesProcess />
            <ServicesProof />
            <ServicesCTA />
        </main>
    );
}

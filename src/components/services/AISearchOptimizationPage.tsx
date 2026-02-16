"use client";

import { AISearchHero } from "@/components/services/ai-seo/AISearchHero";
import { WhoThisIsFor } from "@/components/services/ai-seo/WhoThisIsFor";
import { PainPoints } from "@/components/services/ai-seo/PainPoints";
import { WhatIsAISearch } from "@/components/services/ai-seo/WhatIsAISearch";
import { ProvenFramework } from "@/components/services/ai-seo/ProvenFramework";
import { AISearchCaseStudies } from "@/components/services/ai-seo/AISearchCaseStudies";
import { WhyDigihubAI } from "@/components/services/ai-seo/WhyDigihubAI";
import { ToolsTech } from "@/components/services/ai-seo/ToolsTech";
import { ExpectedResults } from "@/components/services/ai-seo/ExpectedResults";
import { AISearchPricing } from "@/components/services/ai-seo/AISearchPricing";
import { AISearchFAQ } from "@/components/services/ai-seo/AISearchFAQ";
import { LeadCapture } from "@/components/services/ai-seo/LeadCapture";
import { FinalConversion } from "@/components/services/ai-seo/FinalConversion";
import { StickyCTABar } from "@/components/services/ai-seo/StickyCTABar";

export function AISearchOptimizationPage({ plans }: { plans?: any[] }) {
    return (
        <main className="min-h-screen bg-background text-text-primary overflow-x-hidden">
            {/* Section 1: Hero */}
            <AISearchHero />

            {/* Section 2: Qualification */}
            <WhoThisIsFor />

            {/* Section 3: Pain Points */}
            <PainPoints />

            {/* Section 4: Education */}
            <WhatIsAISearch />

            {/* Section 5: Framework */}
            <ProvenFramework />

            {/* Section 6: Case Studies */}
            <AISearchCaseStudies />

            {/* Section 7: Why Digihub */}
            <WhyDigihubAI />

            {/* Section 8: Tools & Tech */}
            <ToolsTech />

            {/* Section 9: Expected Results */}
            <ExpectedResults />

            {/* Section 10: Pricing */}
            <AISearchPricing plans={plans || []} />

            {/* Section 12: Mid-Page Lead Capture */}
            <LeadCapture />

            {/* Section 11: FAQ */}
            <AISearchFAQ />

            {/* Section 14: Final Conversion */}
            <FinalConversion />

            {/* Section 13: Sticky CTA Bar */}
            <StickyCTABar />
        </main>
    );
}

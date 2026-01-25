import { SocialMediaHero } from "@/components/services/social-media/SocialMediaHero";
import { SocialWhoThisIsFor } from "@/components/services/social-media/SocialWhoThisIsFor";
import { SocialProblemsWeFix } from "@/components/services/social-media/SocialProblemsWeFix";
import { WhatIsStrategicSocial } from "@/components/services/social-media/WhatIsStrategicSocial";
import { SocialGrowthFramework } from "@/components/services/social-media/SocialGrowthFramework";
import { SocialProofSection } from "@/components/services/social-media/SocialProofSection";
import { WhyDigihubSocial } from "@/components/services/social-media/WhyDigihubSocial";
import { SocialDeliverables } from "@/components/services/social-media/SocialDeliverables";
import { SocialPricing } from "@/components/services/social-media/SocialPricing";
import { SocialFAQ } from "@/components/services/social-media/SocialFAQ";
import { SocialLeadCapture } from "@/components/services/social-media/SocialLeadCapture";
import { SocialStickyCTA } from "@/components/services/social-media/SocialStickyCTA";
import { SocialFinalConversion } from "@/components/services/social-media/SocialFinalConversion";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Social Media Marketing Services | Instagram, LinkedIn, YouTube & X Marketing Agency",
    description: "Strategic social media marketing that builds brands, not just posts. Grow your audience, engagement & revenue with data-driven content systems. 50+ brands scaled.",
    keywords: "social media marketing services, social media management agency, Instagram marketing agency, LinkedIn marketing services, YouTube marketing agency, brand building on social media, social media marketing company India",
};

export default async function SocialMediaMarketingPage() {
    // Fetch pricing plans - try multiple service IDs
    const supabase = await createClient();

    // Try to find plans with different possible service IDs
    let { data: plans } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('service_id', 'social-media-marketing')
        .eq('is_active', true)
        .order('price', { ascending: true });

    // If no plans found, try alternative service IDs
    if (!plans || plans.length === 0) {
        const { data: altPlans } = await supabase
            .from('pricing_plans')
            .select('*')
            .eq('service_id', 'social')
            .eq('is_active', true)
            .order('price', { ascending: true });
        plans = altPlans;
    }

    return (
        <main className="min-h-screen bg-background text-text-primary overflow-x-hidden">
            {/* Section 1: Hero */}
            <SocialMediaHero />

            {/* Section 2: Who This Is For */}
            <SocialWhoThisIsFor />

            {/* Section 3: Problems We Fix */}
            <SocialProblemsWeFix />

            {/* Section 4: What Is Strategic Social Media */}
            <WhatIsStrategicSocial />

            {/* Section 5: Growth Framework */}
            <SocialGrowthFramework />

            {/* Section 6: Proof Section */}
            <SocialProofSection />

            {/* Section 7: Why Digihub */}
            <WhyDigihubSocial />

            {/* Section 8: Deliverables by Plan */}
            <SocialDeliverables />

            {/* Section 9: Pricing */}
            <SocialPricing plans={plans || []} />

            {/* Section 11: Mid-Page Lead Magnet */}
            <SocialLeadCapture />

            {/* Section 10: FAQ */}
            <SocialFAQ />

            {/* Section 13: Final Conversion */}
            <SocialFinalConversion />

            {/* Section 12: Sticky CTA */}
            <SocialStickyCTA />
        </main>
    );
}

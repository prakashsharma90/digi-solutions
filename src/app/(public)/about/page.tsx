import { AboutHero } from "@/components/sections/about/AboutHero";
import { StorySection } from "@/components/sections/about/StorySection";
import { WhoWeAre } from "@/components/sections/about/WhoWeAre";
import { MissionVision } from "@/components/sections/about/MissionVision";
// import { CoreValues } from "@/components/sections/about/CoreValues";
import { DigihubDifference } from "@/components/sections/about/DigihubDifference";
import { TeamExpertise } from "@/components/sections/about/TeamExpertise";
import { HowWeThink } from "@/components/sections/about/HowWeThink";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-text-primary overflow-hidden">
            <AboutHero />
            <StorySection />
            <WhoWeAre />
            <MissionVision />
            {/* <CoreValues /> */}
            <DigihubDifference />
            {/* <TeamExpertise /> Optional per requirements */}
            <TeamExpertise />
            <HowWeThink />
            <AboutCTA />
        </main>
    );
}

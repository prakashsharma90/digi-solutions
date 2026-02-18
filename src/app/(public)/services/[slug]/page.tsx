
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check, XCircle, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";
import { PerformanceMarketingPage } from "@/components/services/PerformanceMarketingPage";
import { SEOPage } from "@/components/services/SEOPage";
import { SocialMediaMarketingPage } from "@/components/services/SocialMediaMarketingPage";
import { ContentMarketingPage } from '@/components/services/ContentMarketingPage';
import { ServicePricing } from "@/components/sections/ServicePricing";
import { InfluencerMarketingPage } from "@/components/services/InfluencerMarketingPage";
import { AIMarketingPage } from "@/components/services/AIMarketingPage";
import { PersonalBrandingPage } from "@/components/services/PersonalBrandingPage";
import { EmailMarketingPage } from "@/components/services/EmailMarketingPage";
import { AISearchOptimizationPage } from "@/components/services/AISearchOptimizationPage";
import { MarketingAutomationPage } from "@/components/services/MarketingAutomationPage";
import { LinkedInAdsPage } from "@/components/services/LinkedInAdsPage";



export const revalidate = 3600;

// Next.js 15+ Page Props Interface
interface Props {
    params: Promise<{ slug: string }>;
}

async function getService(slug: string) {
    // Handle URL migration for performance -> performance-marketing
    // The DB might still have 'performance' as the slug
    // Handle URL migration for performance -> performance-marketing
    // The DB might still have 'performance' as the slug
    // Also map ai-seo -> ai-marketing so it fetches the same data
    let dbSlug = slug;
    if (slug === 'performance-marketing') dbSlug = 'performance';
    if (slug === 'ai-seo') dbSlug = 'ai-marketing';

    try {
        const supabase = await createClient();

        // 1. Fetch Service Details
        const { data: service } = await supabase
            .from('services')
            .select('*')
            .eq('slug', dbSlug)
            .eq('status', 'Published')
            .eq('is_deleted', false)
            .single();

        if (!service) return null;

        // 2. Fetch Dynamic Pricing Plans
        const { data: dbPlans } = await supabase
            .from('pricing_plans')
            .select(`
                *,
                features:plan_features(*)
            `)
            .eq('service_id', service.id)
            .eq('is_active', true)
            .order('sort_order', { ascending: true }); // or order by price

        // Map snake_case DB fields to camelCase for the component
        // Supabase returns JSON columns as objects usually, but sometimes as strings if not typed
        const benefits = typeof service.benefits === 'string' ? JSON.parse(service.benefits) : service.benefits;
        const problems = typeof service.problems === 'string' ? JSON.parse(service.problems) : service.problems;
        const approach = typeof service.approach === 'string' ? JSON.parse(service.approach) : service.approach;
        const tools = typeof service.tools === 'string' ? JSON.parse(service.tools) : service.tools;
        const outcomes = typeof service.outcomes === 'string' ? JSON.parse(service.outcomes) : service.outcomes;
        const industries = typeof service.industries === 'string' ? JSON.parse(service.industries) : service.industries;
        const pricing = typeof service.pricing === 'string' ? JSON.parse(service.pricing) : service.pricing;
        const faq = typeof service.faq === 'string' ? JSON.parse(service.faq) : service.faq;

        return {
            ...service,
            metaTitle: service.meta_title,
            metaDesc: service.meta_desc,
            heroText: service.hero_text,
            whyMatters: service.why_matters,
            benefits: benefits || [],
            problems: problems || [],
            approach: approach || [],
            tools: tools || [],
            outcomes: outcomes || [],
            industries: industries || [],
            pricing: pricing || {},
            faq: faq || [],
            // Attach dynamic plans
            dynamicPlans: dbPlans || []
        };
    } catch (error) {
        console.error("getService Error:", error);
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Custom metadata for Performance Marketing / Meta Ads page
    if (slug === 'performance-marketing' || slug === 'meta-ads') {
        return {
            title: "Performance Marketing Services - ROI-Focused Campaigns | Digihub",
            description: "Data-driven Google & Meta ad campaigns focused on ROI, not vanity metrics. Get qualified leads with 3-5x ROAS. Free performance audit available.",
        };
    }


    if (slug === 'seo') {
        return {
            title: "SEO Services - Build Trust with Google | Digihub",
            description: "Your website exists. Google just doesn't trust it yet. Strategic SEO built on search intent, structure, and authority. 4-6 month realistic timeline.",
        };
    }

    if (slug === 'social-media-marketing') {
        return {
            title: "Social Media Marketing - Build A Cult Brand | Digihub",
            description: "Stop shouting into the void. Build a loyal community that buys. Premium social media management, content strategy, and brand building.",
        };
    }

    if (slug === 'content-marketing') {
        return {
            title: "Content Marketing - Build Authority, Not Noise | Digihub",
            description: "Break through the AI slop. Expert-led content strategies that build trust, authority, and inbound leads. Blogs, whitepapers, and more.",
        };
    }

    if (slug === 'influencer') {
        return {
            title: "Influencer Marketing - Turn Views into Trust | Digihub",
            description: "Don't just buy posts, buy influence. Connect with 500+ vetted creators to drive authentic brand growth. Data-driven campaigns, not guesswork.",
        };
    }

    if (slug === 'ai-marketing' || slug === 'ai-seo') {
        return {
            title: "AI Marketing Services - The Neural Edge | Digihub",
            description: "Replace guesswork with neural intelligence. Predictive analytics, automated creative, and hyper-personalization at scale.",
        };
    }

    if (slug === 'personal-branding') {
        return {
            title: "Expert Personal Branding Services for Founders & Executives | Digihub",
            description: "Build a high-value personal brand that attracts clients, media & inbound opportunities. Authority building, ghostwriting & PR for executives.",
            keywords: ["personal branding services", "executive branding", "founder personal branding", "linkedin personal branding", "personal brand agency India"]
        };
    }

    if (slug === 'email' || slug === 'email-marketing') {
        return {
            title: "Email Marketing Services - 30% Higher Open Rates | Digihub",
            description: "Turn every email into a growth channel with our managed email marketing services. Automated campaigns, high deliverability, and stunning designs.",
            keywords: ["email marketing", "newsletter services", "email automation", "klaviyo agency", "email list growth"]
        };
    }

    if (slug === 'marketing-automation') {
        return {
            title: "Marketing Automation Services - Scale Without Headcount | Digihub",
            description: "Stop doing tasks. Start scaling systems. AI-powered marketing automation that runs 24/7 — email sequences, lead nurturing, CRM workflows, and more.",
            keywords: ["marketing automation", "email automation", "lead nurturing", "CRM automation", "marketing automation agency India"]
        };
    }

    if (slug === 'linkedin-ads') {
        return {
            title: "LinkedIn Ads Services - B2B Growth Engineering | Digihub",
            description: "Own the boardroom. Target decision-makers with surgical precision through professional B2B LinkedIn advertising. Scale your pipeline with high-intent leads.",
            keywords: ["linkedin ads agency", "b2b marketing", "linkedin lead generation", "professional advertising", "cxo targeting"]
        };
    }

    const service = await getService(slug);
    if (!service) return {};

    return {
        title: service.metaTitle,
        description: service.metaDesc,
    };
}




export async function generateStaticParams() {
    // Generate params only for PUBLISHED services
    // Use Admin Client to bypass cookie check (since this runs at build time / static generation)
    try {
        const supabase = createAdminClient();
        const { data } = await supabase
            .from('services')
            .select('slug')
            .eq('status', 'Published')
            .eq('is_deleted', false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (data || []).map((service: any) => ({
            slug: service.slug === 'performance' ? 'performance-marketing' : service.slug,
        }));
    } catch (error) {
        console.error("generateStaticParams (Services): Error fetching services:", error);
        return [];
    }
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;

    // 1. Always attempt to fetch service data first to get dynamic pricing
    const service = await getService(slug);

    // 2. Prepare standardized plans for the UI
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let finalPlans: any[] = [];

    if (service) {
        const plans = service.dynamicPlans;
        const pricing = service.pricing;

        finalPlans = (plans && plans.length > 0) ? plans : [
            {
                id: 'static-starter',
                title: 'Starter Plan',
                price: pricing?.starter?.price?.replace(/,/g, '').replace(/[^\d.]/g, '') || "9999",
                currency: 'INR',
                billing_cycle: 'month',
                is_popular: false,
                features: pricing?.starter?.features || []
            },
            {
                id: 'static-growth',
                title: 'Growth Plan',
                price: pricing?.growth?.price?.replace(/,/g, '').replace(/[^\d.]/g, '') || "24999",
                currency: 'INR',
                billing_cycle: 'month',
                is_popular: true,
                features: pricing?.growth?.features || []
            },
            {
                id: 'static-scale',
                title: 'Scale Plan',
                price: 0,
                currency: 'INR',
                billing_cycle: 'month',
                is_popular: false,
                features: pricing?.scale?.features || []
            }
        ];
    }

    // Use custom Performance Marketing page for 'performance' or 'meta-ads' slug
    if (slug === 'performance-marketing' || slug === 'meta-ads') {
        return <PerformanceMarketingPage plans={finalPlans} />;
    }

    // Use custom SEO page for 'seo' slug
    if (slug === 'seo') {
        return <SEOPage plans={finalPlans} />;
    }

    // Use custom Social Media Marketing page for 'social-media-marketing' slug
    if (slug === 'social-media-marketing') {
        return <SocialMediaMarketingPage plans={finalPlans} />;
    }

    // Use custom Content Marketing page for 'content-marketing' slug
    if (slug === 'content-marketing') {
        return <ContentMarketingPage plans={finalPlans} />;
    }

    // Use custom Influencer Marketing page for 'influencer' slug
    if (slug === 'influencer') {
        return <InfluencerMarketingPage />;
    }

    // Use custom AI Marketing / SEO page for 'ai-marketing' or 'ai-seo' slug
    if (slug === 'ai-marketing' || slug === 'ai-seo') {
        return <AISearchOptimizationPage plans={finalPlans} />;
    }

    if (slug === 'personal-branding') {
        return <PersonalBrandingPage plans={finalPlans} />;
    }

    if (slug === 'email' || slug === 'email-marketing') {
        return <EmailMarketingPage plans={finalPlans} />;
    }

    if (slug === 'marketing-automation') {
        // If no DB plans found, use static fallback plans
        const automationPlans = finalPlans.length > 0 ? finalPlans : [
            {
                id: 'ma-starter',
                title: 'Starter',
                price: 14999,
                currency: 'INR',
                billing_cycle: 'month',
                is_popular: false,
                features: [
                    { feature_text: 'Up to 3 automation workflows', is_included: true },
                    { feature_text: 'Email sequence setup (up to 5 emails)', is_included: true },
                    { feature_text: 'Basic lead scoring', is_included: true },
                    { feature_text: 'CRM integration (1 platform)', is_included: true },
                    { feature_text: 'Monthly performance report', is_included: true },
                    { feature_text: 'Multi-channel automation', is_included: false },
                    { feature_text: 'A/B testing', is_included: false },
                ]
            },
            {
                id: 'ma-growth',
                title: 'Growth',
                price: 29999,
                currency: 'INR',
                billing_cycle: 'month',
                is_popular: true,
                features: [
                    { feature_text: 'Up to 10 automation workflows', is_included: true },
                    { feature_text: 'Full email nurture sequences', is_included: true },
                    { feature_text: 'Advanced lead scoring & segmentation', is_included: true },
                    { feature_text: 'CRM integration (up to 3 platforms)', is_included: true },
                    { feature_text: 'Ad retargeting automation', is_included: true },
                    { feature_text: 'A/B testing & optimization', is_included: true },
                    { feature_text: 'Weekly performance dashboard', is_included: true },
                ]
            },
            {
                id: 'ma-enterprise',
                title: 'Enterprise',
                price: 0,
                currency: 'INR',
                billing_cycle: 'month',
                is_popular: false,
                is_custom: true,
                features: [
                    { feature_text: 'Unlimited automation workflows', is_included: true },
                    { feature_text: 'Full-stack marketing automation', is_included: true },
                    { feature_text: 'AI-powered predictive lead scoring', is_included: true },
                    { feature_text: 'Multi-CRM & custom integrations', is_included: true },
                    { feature_text: 'Dedicated automation strategist', is_included: true },
                    { feature_text: 'Custom reporting & analytics', is_included: true },
                    { feature_text: 'Priority support & SLA', is_included: true },
                ]
            }
        ];
        return <MarketingAutomationPage plans={automationPlans} />;
    }

    if (slug === 'linkedin-ads') {
        return <LinkedInAdsPage plans={finalPlans} />;
    }

    // If no custom page and no DB service, 404
    if (!service) {
        notFound();
    }

    // Default values for new fields if not present
    const description = service.description || `Digihub Solutions delivers AI-powered ${service.name} services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.`;
    const benefits = service.benefits || [
        "Increased online visibility",
        "Better-quality leads",
        "Improved conversion rates",
        "Lower customer acquisition cost",
        "Long-term scalable growth"
    ];
    const industries = service.industries || [
        "Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"
    ];
    // pricing object is already extracted above but used for static fallback logic

    const problems = service.problems || ["Low traffic", "Poor conversion", "Wasted ad budget"];
    const approach = service.approach || [
        { step: "Audit", desc: "We analyze your current status." },
        { step: "Strategy", desc: "We build a custom roadmap." },
        { step: "Execution", desc: "We implement the plan." },
        { step: "Scale", desc: "We optimize for growth." }
    ];
    const tools = service.tools || ["Google Analytics", "AI Tools", "SEMrush", "React"];
    const outcomes = service.outcomes || ["Higher Traffic", "More Leads", "Better ROI"];
    const faq = service.faq || [
        { q: `What is included in ${service.name}?`, a: "We provide end-to-end management and optimization." },
        { q: "How long to see results?", a: "Typically 3-6 months for significant impact." }
    ];


    return (
        <main className="min-h-screen bg-[#0B0F14] text-text-primary pt-20">

            {/* 2️⃣ SERVICE HERO SECTION (H1) */}
            <Section className="relative py-24 md:py-32 overflow-hidden bg-[#0B0F14]">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
                <Container className="relative z-10 text-center max-w-4xl">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-mono tracking-widest uppercase mb-6">
                        {service.name} Services
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {service.title} That Drive Measurable Growth
                    </h1>
                    <p className="text-xl text-text-muted mb-10 leading-relaxed max-w-3xl mx-auto">
                        {description}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg" className="h-12 px-8 shadow-[0_0_20px_-5px_var(--color-primary)] transition-all">Get Free Consultation</Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline" className="h-12 px-8 border-white/10 hover:bg-white/5 transition-all">Talk to an Expert</Button>
                        </Link>
                    </div>
                </Container>
            </Section>

            {/* 3️⃣ SERVICE OVERVIEW (H2) */}
            <Section className="py-20 bg-background/50">
                <Container className="max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">What Are {service.name} Services?</h2>
                    <p className="text-lg text-text-muted leading-relaxed">
                        {service.name} plays a critical role in digital marketing by helping businesses achieve sustainable growth through optimized strategies, better targeting, and performance-based execution.
                    </p>
                </Container>
            </Section>

            {/* 4️⃣ WHY THIS SERVICE IS IMPORTANT (H2) */}
            <Section className="py-20 bg-[#0B0F14]">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Why Your Business Needs {service.name}</h2>
                        <p className="text-text-muted">Without expert execution, businesses often waste budget. Our approach ensures maximum ROI.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {benefits.map((benefit: string, i: number) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center transition-all hover:bg-white/[0.05] hover:border-primary/20">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                                    <Check className="w-5 h-5" />
                                </div>
                                <p className="text-white font-medium text-sm">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 5️⃣ PROBLEMS WE SOLVE (H2) */}
            <Section className="py-20 bg-white/[0.02]">
                <Container>
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-white mb-8">Common Challenges We Solve</h2>
                            <div className="space-y-4">
                                {problems.map((prob: string, i: number) => (
                                    <div key={i} className="flex items-start bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                                        <XCircle className="w-6 h-6 text-red-400 mr-4 shrink-0" />
                                        <span className="text-text-muted">{prob}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 h-80 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                            <div className="text-center p-8 relative z-10">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BrainCircuit className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-white">The Digihub Solution</h3>
                                <p className="text-text-muted text-sm mt-2">AI-Powered. Data-Backed. Scalable.</p>
                            </div>
                            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 6️⃣ OUR AI-DRIVEN APPROACH (H2) */}
            <Section className="py-24 bg-[#0B0F14]">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Approach to {service.name}</h2>
                        <p className="text-text-muted">We follow a proven, performance-oriented framework for predictable and sustainable growth.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {approach.map((step: any, i: number) => (
                            <div key={i} className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all group">
                                <div className="text-4xl font-bold text-white/10 mb-4 group-hover:text-primary transition-colors">0{i + 1}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.step}</h3>
                                <p className="text-text-muted leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 7️⃣ TOOLS & TECHNOLOGY (H2) */}
            <Section className="py-20 bg-white/[0.01]">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Tools & Technology We Use</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">We leverage the latest AI and data-intelligence tools to ensure top-tier performance.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {tools.map((tool: string, i: number) => (
                            <span key={i} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm hover:border-primary/30 transition-colors">
                                {tool}
                            </span>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 8️⃣ EXPECTED RESULTS (H2) */}
            <Section className="py-20 bg-[#0B0F14]">
                <Container className="max-w-4xl">
                    <div className="bg-gradient-to-b from-white/[0.03] to-transparent p-12 rounded-[32px] border border-white/5">
                        <h2 className="text-3xl font-bold text-white mb-10 text-center">What Results Can You Expect?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {outcomes.map((outcome: string, i: number) => (
                                <div key={i} className="flex items-center text-lg text-white">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4 shrink-0">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    {outcome}
                                </div>
                            ))}
                        </div>
                        <p className="mt-12 text-center text-text-muted italic">Transparent reporting and performance-based results are our promise.</p>
                    </div>
                </Container>
            </Section>

            {/* 9️⃣ PRICING PLANS (New Standardized Component) */}
            <ServicePricing serviceName={service.name} plans={finalPlans} />

            {/* 1️⃣0️⃣ WHY CHOOSE DIGIHUB SOLUTIONS (H2) */}
            <Section className="py-20 bg-[#0B0F14]">
                <Container>
                    <div className="bg-primary/5 border border-primary/20 rounded-3xl p-12 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8">Why Choose Digihub Solutions for {service.name}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10 text-left">
                            {[
                                "AI-driven decision making", "Transparent pricing & reporting", "Experienced digital experts",
                                "Scalable growth systems", "Long-term growth mindset"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center text-white/90 font-medium">
                                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                                    {item}
                                </div>
                            ))}
                        </div>
                        <p className="text-lg text-white font-bold">We don’t just provide services — we build digital growth engines.</p>
                    </div>
                </Container>
            </Section>

            {/* 1️⃣1️⃣ INDUSTRIES WE SERVE (H2) */}
            <Section className="py-20 bg-white/[0.01]">
                <Container>
                    <h2 className="text-3xl font-bold text-white mb-10 text-center">Industries We Serve</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {industries.map((industry: string, i: number) => (
                            <div key={i} className="px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/20 transition-all text-white font-medium">
                                {industry}
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 1️⃣2️⃣ FAQs (H2) */}
            <Section className="py-20 bg-background">
                <Container className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {faq.map((item: any, i: number) => (
                            <div key={i} className="border-b border-white/10 pb-6 group">
                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">Q. {item.q}</h3>
                                <p className="text-text-muted leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* NEW: Inline Lead Magnet/Form */}
            <ConsultationFormSection
                title={`Scale Your ${service.name} with AI`}
                subtitle="Get a free audit and custom strategy roadmap for your business. No strings attached."
                source={`${service.name} Page - Bottom Form`}
            />

            {/* 1️⃣3️⃣ FINAL CTA SECTION */}
            <Section className="py-32 bg-[#0B0F14] relative overflow-hidden text-center border-t border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px]" />
                <Container className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Grow with {service.name}?</h2>
                    <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto">Let’s build a smart, data-driven growth system tailored to your business.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg" className="h-14 px-12 text-lg shadow-[0_0_20px_-5px_var(--color-primary)] transition-all">Start Free Consultation</Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline" className="h-14 px-12 text-lg border-white/10 hover:bg-white/5 transition-all">Talk to an Expert</Button>
                        </Link>
                    </div>
                </Container>
            </Section>

        </main>
    );
}



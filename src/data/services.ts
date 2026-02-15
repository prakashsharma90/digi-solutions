import {
    Search, Megaphone, Share2, Bot, Code, LineChart,
    Zap, Target, Sparkles, PenTool, User, Users,
    Video, MousePointer2, Mail, MessageCircle, ShieldCheck,
    Layers, ShoppingCart, MapPin, Database, BarChart3
} from "lucide-react";

export interface ServiceType {
    name: string;
    title: string;
    metaTitle: string;
    metaDesc: string;
    heroText: string;
    description?: string;
    whyMatters: string;
    benefits?: string[];
    problems: string[];
    approach: { step: string; desc: string; }[];
    tools: string[];
    outcomes: string[];
    industries?: string[];
    pricing?: {
        starter: { price: string; features: string[] };
        growth: { price: string; features: string[] };
        scale: { price: string; features: string[] };
    };
    faq: { q: string; a: string; }[];
}

export const servicesData: Record<string, ServiceType> = {
    "performance-marketing": {
        name: "Performance Marketing",
        title: "Results-Driven Performance Marketing",
        metaTitle: "Performance Marketing Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable performance marketing services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "We manage multi-channel campaigns with a singular focus: positive ROI and measurable business growth.",
        description: "Digihub Solutions delivers high-performance Marketing services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Brand awareness is great, but results pay the bills. Performance marketing ensures every dollar is tracked and accountable.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Low ROI", "High customer acquisition cost", "Unclear attribution", "Stagnant sales"],
        approach: [
            { step: "KPI Mapping", desc: "Defining what success looks like" },
            { step: "Funnel Build", desc: "Creating high-converting pathways" },
            { step: "Launch", desc: "Controlled testing on primary channels" },
            { step: "Scaling", desc: "Aggressive growth based on profitable data" }
        ],
        tools: ["Google Ads", "Meta Ads", "TikTok Ads", "Snapchat Ads"],
        outcomes: ["Higher ROAS", "Lower CAC", "Daily lead flow", "Market dominance"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "14,999", features: ["Basic campaign setup", "Initial audit & optimization", "Monthly performance tracking", "Email support"] },
            growth: { price: "34,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Conversion tracking", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Which channel is best?", a: "It depends on your audience, but we typically find the best results through a mix of search and social." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "google-ads": {
        name: "Google Ads (PPC)",
        title: "#1 Google Ads Agency for E-commerce Stores",
        metaTitle: "Google Ads Services for E-commerce | Digihub Solutions",
        metaDesc: "Helping top 1% brands scale to 7/8-figure months with advanced Google Ads strategies and high ROAS.",
        heroText: "Stop wasting budget. We build high-intent campaigns that convert searchers into buyers instantly.",
        description: "Digihub Solutions specializes in Google Ads for e-commerce, helping brands scale profitably with data-driven PPC campaigns, Shopping ads, and YouTube strategies.",
        whyMatters: "Google captures intention. People searching for your product are ready to buy. If you aren't there, you're handing sales to competitors.",
        benefits: ["Consistent and Stable ROAS", "Higher Buyer Intent", "Endless Scaling Opportunities", "Full Merchant Center Solutions", "Transparent Reporting"],
        problems: ["Wasted ad spend", "Low click-through rates", "Poor quality scores", "Untracked conversions"],
        approach: [
            { step: "Audit & Fix", desc: "Identifying wasted spend and technical errors" },
            { step: "Campaign Structure", desc: "Rebuilding for high relevance and quality score" },
            { step: "Shopping Optimization", desc: "Feed management for maximum visibility" },
            { step: "Scale", desc: "Incrementally increasing budget while maintaining ROAS" }
        ],
        tools: ["Google Ads", "Google Merchant Center", "GA4", "Looker Studio"],
        outcomes: ["High ROAS", "Predictable Revenue", "Scalable Growth", "Market Leadership"],
        industries: ["E-commerce", "DTC Brands", "Dropshipping", "Retail"],
        pricing: {
            starter: { price: "19,999", features: ["Campaign Audit", "Basic Search Setup", "Monthly Optimization", "Email Support"] },
            growth: { price: "49,999", features: ["Shopping & PMax Setup", "Advanced Bidding Strategies", "Weekly Optimization", "Custom Reporting", "Priority Support"] },
            scale: { price: "Custom", features: ["Enterprise Strategy", "Dedicated Account Manager", "Daily Optimization", "Custom Dashboards"] }
        },
        faq: [
            { q: "How fast can I see results?", a: "PPC is immediate. You can start getting traffic within hours of launch." },
            { q: "Do you handle Google Shopping?", a: "Yes, we are experts in Merchant Center and PMax campaigns for e-commerce." }
        ]
    },
    "seo": {
        name: "Search Engine Optimization (SEO)",
        title: "Dominate Search Results Sustainably",
        metaTitle: "SEO Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable SEO services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Technical precision meets content authority. We build SEO foundations that stand the test of algorithm updates.",
        description: "Digihub Solutions delivers expert SEO services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Organic traffic is the most valuable asset in digital marketing. It compounding value over time without increasing daily spend.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Low organic visibility", "Poor keyword rankings", "Technical site errors", "High dependency on paid ads"],
        approach: [
            { step: "Technical Audit", desc: "Fixing sitewide indexing & speed issues" },
            { step: "Keyword Strategy", desc: "Targeting high-intent search terms" },
            { step: "On-Page SEO", desc: "Optimizing content for humans & bots" },
            { step: "Link Building", desc: "Building authority via quality backlinks" }
        ],
        tools: ["Semrush", "Ahrefs", "Search Console", "SurferSEO"],
        outcomes: ["First-page rankings", "Compounding traffic", "Higher authority", "Lower overall marketing cost"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "11,000", features: ["Basic On-Page Optimization", "10 Keywords Target", "3500+ Word Content", "150+ Backlinks Monthly", "2 Article Submission", "Analytics & Console Setup", "Monthly SEO Report", "1 Performance Review Meeting"] },
            growth: { price: "20,000", features: ["Advanced On-Page Optimization", "20 Keywords Target", "7500+ Word Content", "300+ Backlinks Monthly", "Analytics & Console Setup", "5 Article Submission", "Monthly SEO Report", "2 Performance Review Meeting"] },
            scale: { price: "35,000", features: ["Advanced On-Page Optimization", "Advanced Technical SEO audit", "35 Keywords Target", "12000+ Word Content", "500+ Backlinks Monthly", "Analytics & Console Setup", "8 Article Submission", "2 Quality Guest Post", "1 Digital PR", "SEO Report in Every 15 Days", "3 Performance Review Meeting"] }
        },
        faq: [
            { q: "How long until I see results?", a: "SEO is a 3-6 month game, but the results last for years." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "ai-seo": {
        name: "AI Search Optimization (SGE & LLM SEO)",
        title: "The Future of SEO: SGE & LLM Optimization",
        metaTitle: "AI Search & SGE Optimization Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable AI search & SGE optimization services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Traditional SEO is changing. We help your brand appear in AI-generated answers and LLM citations.",
        description: "Digihub Solutions delivers AI-Search & SGE optimization services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "AI Overviews are taking over the top of search. If you aren't optimized for SGE, you're losing the most visible real estate.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Loss of click-through rate to AI answers", "Poor brand presence in LLM outputs", "Outdated SEO tactics"],
        approach: [
            { step: "LLM Mapping", desc: "Researching where AI pulls information from" },
            { step: "Entity Optimization", desc: "Building structured knowledge about your brand" },
            { step: "Content Structuring", desc: "Format content for easy ingestion by AI" },
            { step: "Authority Building", desc: "Establishing trust in niche-specific databases" }
        ],
        tools: ["Perplexity", "Gemini", "Claude", "Vertex AI"],
        outcomes: ["Inclusion in AI Overviews", "Better LLM brand sentiment", "Direct answer citations"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "19,999", features: ["Basic SGE audit", "Initial entity setup", "Monthly visibility tracking", "Email support"] },
            growth: { price: "44,999", features: ["Advanced LLM strategy", "Ongoing entity optimization", "Citation building", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Is SGE different from regular SEO?", a: "Yes, it focuses more on being a 'source of truth' for AI engines rather than just ranking for keywords." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "social": {
        name: "Social Media Marketing",
        title: "Build a Community, Not Just a Following",
        metaTitle: "Social Media Marketing Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable social media marketing services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "We help brands show up authentically where their customers live, from LinkedIn to TikTok.",
        description: "Digihub Solutions delivers dynamic Social Media Marketing services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Social platforms are where culture happens. If your brand isn't part of the conversation, you're invisible to the modern consumer.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Dead social channels", "Unresponsive audience", "Random posting", "Lack of growth"],
        approach: [
            { step: "Social Audit", desc: "Analyzing current presence & competitors" },
            { step: "Voice Definition", desc: "How your brand talks on social" },
            { step: "Campaign Launch", desc: "Integrated social promotions" },
            { step: "Engagement", desc: "Active community lead nurturing" }
        ],
        tools: ["Hootsuite", "Loomly", "CapCut", "Figma"],
        outcomes: ["Viral growth potential", "Direct customer feedback", "Brand loyalty"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "10,999", features: ["Basic social audit", "Initial strategy & optimization", "Monthly performance tracking", "Email support"] },
            growth: { price: "24,499", features: ["Advanced strategy & execution", "Ongoing optimization", "Conversion tracking", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Which platforms are best for B2B?", a: "LinkedIn and X (Twitter) are usually primary for B2B, but YouTube is excellent for authority." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "personal-branding": {
        name: "Personal Branding",
        title: "Turn Yourself Into a High-Value Asset",
        metaTitle: "Personal Branding Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable personal branding services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "People buy from people. We help you build a professional brand that attracts opportunities and talent.",
        description: "Digihub Solutions delivers expert Personal Branding services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "A strong personal brand is a hedge against AI. Human authority and unique perspectives are worth more than ever.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Talent staying hidden", "Loss of authority to competitors", "Difficulty in fundraising/hiring"],
        approach: [
            { step: "ID Discovery", desc: "Finding your unique angle & voice" },
            { step: "Platform Setup", desc: "Optimizing profiles for conversion" },
            { step: "Ghostwriting", desc: "Creating thought-leadership content" },
            { step: "PR & Networking", desc: "Expanding your reach outside social" }
        ],
        tools: ["AuthoredUp", "Taplio", "Substack", "Medium"],
        outcomes: ["High-level network", "Inbound deal flow", "Keynote opportunities"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "15,999", features: ["Basic brand audit", "Initial identity setup", "Monthly authority tracking", "Email support"] },
            growth: { price: "39,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Conversion tracking", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "I don't have time to post.", a: "We handle the research, writing, and scheduling for you." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "influencer": {
        name: "Influencer Marketing",
        title: "Scale Trust with Influencer Partnerships",
        metaTitle: "Influencer Marketing Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable influencer marketing services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Don't just run ads; build partnerships. We connect you with the right voices that resonate with your target audience.",
        description: "Digihub Solutions delivers strategic Influencer Marketing services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "People trust people more than brands. Influencers provide the social proof needed to overcome buyer objection instantly.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Fake followers", "Misaligned brand messaging", "Low ROI partnerships", "Difficulty in tracking impact"],
        approach: [
            { step: "Persona Mapping", desc: "Finding creators your audience actually follows" },
            { step: "Vetting", desc: "Verifying engagement & audience authenticity" },
            { step: "Negotiation", desc: "Handling contracts & deliverable alignment" },
            { step: "Analysis", desc: "Measuring direct sales vs brand lift" }
        ],
        tools: ["Upfluence", "HypeAuditor", "Modash", "Grin"],
        outcomes: ["Massive social proof", "High engagement rates", "Direct attributed sales"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "24,999", features: ["Basic influencer audit", "Initial outreach & management", "Monthly performance tracking", "Email support"] },
            growth: { price: "54,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Conversion tracking", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Do you work with micro-influencers?", a: "Yes, we often find they have higher engagement and better ROI for niche brands." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "video": {
        name: "Video Marketing & Production",
        title: "Stop the Scroll with High-Impact Video",
        metaTitle: "Video Marketing Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable video marketing services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Video is no longer optional. We create content that holds attention and drives action across all platforms.",
        description: "Digihub Solutions delivers professional Video Marketing services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "80% of all internet traffic is video. If you aren't producing video, you're missing out on 80% of the market.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Low watch time", "Boring corporate videos", "High production costs", "No distribution strategy"],
        approach: [
            { step: "Scripting", desc: "Writing hooks that keep viewers watching" },
            { step: "Production", desc: "High-quality filming or AI generation" },
            { step: "Editing", desc: "Fast-paced, platform-specific optimization" },
            { step: "Distribution", desc: "Ensuring your video reaches the right feed" }
        ],
        tools: ["Adobe Premiere", "After Effects", "Descript", "RunwayML"],
        outcomes: ["Viral potential", "Direct product education", "Increased time-on-site"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "29,999", features: ["Basic video strategy", "Initial production & editing", "Monthly performance tracking", "Email support"] },
            growth: { price: "69,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Conversion tracking", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Do you handle short-form content?", a: "Yes, Reels, TikToks, and Shorts are our specialty." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "cro": {
        name: "Conversion Rate Optimization (CRO)",
        title: "Turn Existing Traffic Into Paying Customers",
        metaTitle: "CRO Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable CRO services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Stop wasting money on traffic that doesn't convert. We use data to find out why they leave and fix it.",
        description: "Digihub Solutions delivers data-driven CRO services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Getting traffic is expensive. Closing the traffic you already have is the fastest way to increase profit without increasing ad spend.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["High bounce rates", "Abandoned carts", "Low lead form completions", "Unclear user journey"],
        approach: [
            { step: "Data Analysis", desc: "Reviewing heatmaps & GA4 behavior" },
            { step: "Hypothesis", desc: "Guessing what will improve performance" },
            { step: "A/B Testing", desc: "Running split tests on live traffic" },
            { step: "Winning Implementation", desc: "Hardcoding the better version" }
        ],
        tools: ["Hotjar", "VWO", "Optimizely", "Mixpanel"],
        outcomes: ["Higher revenue per visitor", "Lower CAC", "Streamlined UX"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "18,999", features: ["Basic CRO audit", "Initial hypothesis & setup", "Monthly conversion tracking", "Email support"] },
            growth: { price: "44,999", features: ["Advanced strategy & execution", "Ongoing optimization", "A/B testing management", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "How much traffic do I need for CRO?", a: "We typically recommend at least 5,000 visitors per month for statistically significant results." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "automation": {
        name: "Marketing Automation",
        title: "Automate Your Growth, Reclaim Your Time",
        metaTitle: "Marketing Automation Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable marketing automation services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "We build systems that work while you sleep. From lead scoring to nurture sequences, we automate your funnel.",
        description: "Digihub Solutions delivers advanced Marketing Automation services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Manual follow-ups lead to dropped leads. Automation ensures no opportunity is ever missed.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Leaked leads", "Slow response times", "Manual repetitive tasks", "Disjointed systems"],
        approach: [
            { step: "Workflow Audit", desc: "Finding manual bottlenecks" },
            { step: "System Architecture", desc: "Building the logic of the automation" },
            { step: "Zapier/Make Setup", desc: "Connecting the tools" },
            { step: "Stress Testing", desc: "Ensuring nothing breaks at scale" }
        ],
        tools: ["Zapier", "Make.com", "GoHighLevel", "HubSpot"],
        outcomes: ["Zero lead leakage", "Increased sales velocity", "Reduced overhead"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "14,499", features: ["Basic automation audit", "Initial workflow setup", "Monthly system tracking", "Email support"] },
            growth: { price: "34,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Multiple system integration", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Will automation make my brand feel cold?", a: "No, we use AI to personalize every touchpoint so it feels human, but happens instantly." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "crm": {
        name: "CRM & Lead Nurturing",
        title: "Master Your Lead Management & Nurturing",
        metaTitle: "CRM & Lead Nurturing Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable CRM & lead nurturing services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Revenue isn't made in the click; it's made in the follow-up. We optimize your CRM lifecycle.",
        description: "Digihub Solutions delivers professional CRM & Lead Nurturing services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "A lead today might not buy for 6 months. Without nurturing, you lose them forever.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Messy leads", "Unknown lead sources", "High churn", "Sales & marketing misalignment"],
        approach: [
            { step: "CRM Setup", desc: "Configuring stages & custom fields" },
            { step: "Lead Scoring", desc: "Identifying the hottest leads" },
            { step: "Nurturing Paths", desc: "Tailored content for different segments" },
            { step: "Analytics", desc: "Tracking pipe value & velocity" }
        ],
        tools: ["Salesforce", "Pipedrive", "Zendesk", "ClickUp"],
        outcomes: ["Higher lead-to-close ratio", "Increased customer LTV", "Clean data reporting"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "12,999", features: ["Basic CRM audit", "Initial setup & optimization", "Monthly performance tracking", "Email support"] },
            growth: { price: "29,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Conversion tracking", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Which CRM should I use?", a: "We recommend HubSpot for most SMEs, and Salesforce for complex enterprise needs." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "email": {
        name: "Email Marketing",
        title: "High-ROI Email Marketing Campaigns",
        metaTitle: "Email Marketing Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable email marketing services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Email still has the highest ROI of any digital channel. We help you build a list that buys.",
        description: "Digihub Solutions delivers strategic Email Marketing services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Social platforms own your audience; you own your email list. It's the only channel you truly control.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Low open rates", "Spam issues", "Boring newsletters", "Dying list"],
        approach: [
            { step: "List Building", desc: "Strategizing high-value lead magnets" },
            { step: "Segmentation", desc: "Sending the right message to the right person" },
            { step: "Campaign Design", desc: "On-brand, mobile-optimized emails" },
            { step: "Deliverability", desc: "Ensuring you land in the inbox, not junk" }
        ],
        tools: ["Klaviyo", "Mailchimp", "ActiveCampaign", "Beehiiv"],
        outcomes: ["Direct revenue growth", "Higher customer lifetime value", "Strong brand community"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "9,999", features: ["Basic email audit", "Initial creation & optimization", "Monthly performance tracking", "Email support"] },
            growth: { price: "21,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Conversion tracking", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "How often should I email?", a: "Usually 1-3 times a week, but it depends on your value proposition." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "whatsapp": {
        name: "WhatsApp Marketing",
        title: "Engage Customers on Their Favorite App",
        metaTitle: "WhatsApp Marketing Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable WhatsApp marketing services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Meet your customers where they are. High-engagement marketing via WhatsApp automation.",
        description: "Digihub Solutions delivers professional WhatsApp Marketing services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "WhatsApp has the highest engagement rate of any communication platform worldwide. It's the ultimate direct line.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Unanswered messages", "Manual communication", "Account bans", "No tracking"],
        approach: [
            { step: "API Setup", desc: "Enterprise-grade WhatsApp Meta API" },
            { step: "Campaign Strategy", desc: "Respectful, high-conversion broadcasts" },
            { step: "Chatbot Build", desc: "Automated FAQ & lead capture" },
            { step: "Team Integration", desc: "Shared inbox for your sales team" }
        ],
        tools: ["Wati", "Interakt", "AiSensy", "ManyChat"],
        outcomes: ["90%+ open rates", "Instant customer support", "High-speed sales"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "11,999", features: ["Basic API setup", "Initial audit & optimization", "Monthly performance tracking", "Email support"] },
            growth: { price: "24,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Conversion tracking", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Is it legal to send marketing on WhatsApp?", a: "Yes, provided you use the official API and have user opt-in." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "orm": {
        name: "Online Reputation Management (ORM)",
        title: "Control Your Story and Build Trust",
        metaTitle: "ORM Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable ORM services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Your brand is what people say about you when you're not in the room. We make sure they say good things.",
        description: "Digihub Solutions delivers expert Online Reputation Management services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "One bad review can cost you thousands. We proactively build and protect your digital reputation.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Negative search results", "Poor Glassdoor/Trustpilot scores", "Social media crises", "Misinformation"],
        approach: [
            { step: "Reputation Audit", desc: "Scanning search results & social sentiment" },
            { step: "Positive Content", desc: "Pushing down negative links with high-value assets" },
            { step: "Review Management", desc: "Automating positive review collection" },
            { step: "Crisis Monitoring", desc: "24/7 alerts for brand mentions" }
        ],
        tools: ["Brand24", "Reputology", "Mention", "ReviewTrackers"],
        outcomes: ["Positive search presence", "Increased customer trust", "Better hiring power"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "19,999", features: ["Basic reputation audit", "Initial cleanup & optimization", "Monthly sentiment tracking", "Email support"] },
            growth: { price: "44,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Review campaign management", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Can you remove negative links?", a: "We can't always delete them, but we can bury them on page 2 and beyond." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "funnel": {
        name: "Website & Funnel Optimization",
        title: "Engineered Funnels That Print Revenue",
        metaTitle: "Funnel Optimization Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable funnel optimization services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "A website is for browsing; a funnel is for buying. We build the latter.",
        description: "Digihub Solutions delivers professional Funnel Optimization services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Most websites are leaks for your marketing budget. We fix the leaks and build a straight line to sale.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["High ad spend, zero sales", "Users getting lost", "Friction in the checkout", "No upsells"],
        approach: [
            { step: "Funnel Blueprint", desc: "Strategic mapping of the sale" },
            { step: "LP Design", desc: "High-speed, high-copy landing pages" },
            { step: "Integration", desc: "Connecting payment & email triggers" },
            { step: "Optimization", desc: "Continuous testing of headlines & offers" }
        ],
        tools: ["ClickFunnels", "Leadpages", "Unbounce", "Instapage"],
        outcomes: ["Consistent ROAS", "Scalable customer acquisition", "Higher Average Order Value (AOV)"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "24,999", features: ["Basic funnel audit", "Initial LP design & setup", "Monthly conversion tracking", "Email support"] },
            growth: { price: "54,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Upsell/Downsell setup", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Do I need a new website?", a: "No, we can often build funnels as standalone landing pages separate from your main site." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "ecommerce": {
        name: "E-commerce Marketing",
        title: "Scale Your Online Store with Data",
        metaTitle: "E-commerce Marketing Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable e-commerce marketing services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Specialized strategies for Shopify and WooCommerce stores. Focus on CAC, LTV, and repeat buys.",
        description: "Digihub Solutions delivers expert E-commerce Marketing services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "E-commerce is highly competitive. Without specialized knowledge of feast/famine cycles and unit economics, you'll struggle to scale.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Low repeat purchase rate", "High cart abandonment", "Low average order value", "Bleeding money on ads"],
        approach: [
            { step: "Unit Economic Audit", desc: "Ensuring your product is actually profitable to scale" },
            { step: "Retention Build", desc: "Setting up flows to keep people coming back" },
            { step: "Ad Scaling", desc: "Aggressive multi-channel customer acquisition" },
            { step: "AOV Optimization", desc: "Increasing revenue per customer using upsells" }
        ],
        tools: ["Shopify", "Klaviyo", "TripleWhale", "Meta Ads"],
        outcomes: ["Increased store revenue", "Higher customer lifetime value", "Efficient ad spend"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "29,999", features: ["Basic store audit", "Initial ad setup & optimization", "Monthly performance tracking", "Email support"] },
            growth: { price: "64,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Retention flow setup", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Do you handle product photography?", a: "We can recommend partners, but our focus is primarily on the growth marketing side." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "local-seo": {
        name: "Local SEO & Google Maps",
        title: "Be the Top Choice in Your Neighborhood",
        metaTitle: "Local SEO Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable local SEO services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "If you aren't in the Google Maps '3-pack,' you're invisible to local customers. We put you there.",
        description: "Digihub Solutions delivers expert Local SEO services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Local search intent is the highest-converting traffic. People searching 'near me' are ready to buy NOW.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Not showing up on maps", "Bad or few reviews", "Inconsistent NAP info", "Competitors stealing local leads"],
        approach: [
            { step: "GBP Optimization", desc: "Maximizing your Google Business Profile visibility" },
            { step: "Citation Building", desc: "listing you in every relevant local directory" },
            { step: "Review Strategy", desc: "Getting regular 5-star feedback from customers" },
            { step: "Local Content", desc: "Ranking for neighborhood-specific search terms" }
        ],
        tools: ["BrightLocal", "Whitespark", "Google Business Profile", "Yext"],
        outcomes: ["Dominant local presence", "Increased foot traffic/calls", "Trust & authority in niche"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "11,499", features: ["Basic GBP audit", "Initial citation setup", "Monthly map tracking", "Email support"] },
            growth: { price: "24,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Review management system", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "How long does it take to rank on maps?", a: "Typically 30-90 days depending on your starting point and competition." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "programmatic-seo": {
        name: "Programmatic SEO",
        title: "Rank for 10,000+ Keywords Simultaneously",
        metaTitle: "Programmatic SEO Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable programmatic SEO services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "Scale your organic reach using data and templates. Build thousands of high-quality pages that rank.",
        description: "Digihub Solutions delivers advanced Programmatic SEO services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Writing 1,000 blogs manually is impossible. Programmatic SEO allows you to capture every 'long-tail' variation of your service.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Scaling organic traffic", "Competing for high-volume keywords", "High cost of manual content"],
        approach: [
            { step: "Data Sourcing", desc: "Finding datasets that solve user problems" },
            { step: "Template Design", desc: "Building high-quality, non-spammy page structures" },
            { step: "Stack Setup", desc: "Connecting your database to your CMS" },
            { step: "Indexing Strategy", desc: "Ensuring Google likes and crawls your pages" }
        ],
        tools: ["Airtable", "Webflow", "Next.js", "GPT-4 API"],
        outcomes: ["Massive keyword footprint", "Lower cost per lead", "Dominance in long-tail search"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "49,999", features: ["Basic p-SEO audit", "Initial data setup & 100 pages", "Monthly visibility tracking", "Email support"] },
            growth: { price: "99,999", features: ["Advanced strategy & execution", "Ongoing optimization", "1000+ page builds", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Is this spam?", a: "No, we focus on 'utility' pages that actually answer user data-driven questions." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "analytics": {
        name: "Marketing Analytics & BI",
        title: "Stop Guessing, Start Knowing",
        metaTitle: "Marketing Analytics Services & Pricing | Digihub Solutions",
        metaDesc: "Affordable marketing analytics services with flexible pricing plans by Digihub Solutions. AI-driven strategy, transparent pricing & measurable results.",
        heroText: "If you can't measure it, you can't manage it. We turn your data into a competitive advantage.",
        description: "Digihub Solutions delivers professional Marketing Analytics & BI services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Most businesses fly blind. Real-time data allows you to cut what's failing and double down on what's working instantly.",
        benefits: ["Increased online visibility", "Better-quality leads", "Improved conversion rates", "Lower customer acquisition cost", "Long-term scalable growth"],
        problems: ["Guessing where sales come from", "Messy Google Analytics", "Inaccurate reporting", "Data silos"],
        approach: [
            { step: "Tracking Audit", desc: "Verifying the accuracy of your current data" },
            { step: "GTM Setup", desc: "Pro-level tag management for everything" },
            { step: "Dashboard Build", desc: "Visualizing your KPIs in one place" },
            { step: "Insights", desc: "Regular calls to explain what the data means" }
        ],
        tools: ["GA4", "Looker Studio", "BigQuery", "PostHog"],
        outcomes: ["Single source of truth", "Higher efficiency", "Clear attribution"],
        industries: ["Startups", "SMEs", "E-commerce brands", "Service-based businesses", "Local & global companies"],
        pricing: {
            starter: { price: "15,999", features: ["Basic GA4 audit", "Initial dashboard setup", "Monthly data tracking", "Email support"] },
            growth: { price: "39,999", features: ["Advanced strategy & execution", "Ongoing optimization", "Custom attribution modeling", "Monthly detailed reports", "Priority support"] },
            scale: { price: "Custom", features: ["Custom AI-driven strategy", "Advanced automation", "Dedicated account manager", "Weekly optimization", "Custom dashboards"] }
        },
        faq: [
            { q: "Do you handle server-side tracking?", a: "Yes, we highly recommend it for cookie-less environments." },
            { q: "Is pricing fixed or customizable?", a: "Pricing is flexible and depends on business goals, competition, and service scope." }
        ]
    },
    "ai-marketing": {
        name: "AI Marketing",
        title: "The Neural Edge",
        metaTitle: "AI Marketing Services - The Neural Edge | Digihub",
        metaDesc: "Replace guesswork with neural intelligence. Predictive analytics, automated creative, and hyper-personalization at scale.",
        heroText: "Transform your marketing stack into a self-learning engine. We deploy AI agents that predict trends, personalize content, and optimize ads 24/7.",
        description: "Digihub Solutions delivers advanced AI Marketing services designed to help businesses improve visibility, generate high-quality leads, and scale profitably using data-driven strategies.",
        whyMatters: "Humans sleep. AI never stops. Traditional marketing is reactive; AI marketing is predictive and instantaneous.",
        benefits: ["Predictive revenue forecasting", "Hyper-personalized content", "Automated creative testing", "24/7 lead qualification", "Real-time bid optimization"],
        problems: ["Manual scaling limits", "Guesswork in ad creative", "Slow response times", "Data silos"],
        approach: [
            { step: "Ingestion", desc: "AI scrapes industry news & your past data" },
            { step: "Synthesis", desc: "LLM Identifies trending topics & drafts strategy" },
            { step: "Creation", desc: "Generates usage-ready assets & copy" },
            { step: "Distribution", desc: "Auto-posts and optimizes based on feedback" }
        ],
        tools: ["OpenAI GPT-4", "Claude 3.5", "Midjourney", "Zapier"],
        outcomes: ["10x content velocity", "Higher ROAS", "Automated operations"],
        industries: ["SaaS", "E-commerce", "Fintech", "Healthcare", "Agencies"],
        pricing: {
            starter: { price: "30,000", features: ["1 Custom AI Agent", "Weekly Performance Report", "Basic Workflow Automation", "Email Support"] },
            growth: { price: "75,000", features: ["3 Integrated AI Agents", "Real-time Dashboard", "Predictive Analytics", "Creative Generation Suite", "Priority Optimization"] },
            scale: { price: "Custom", features: ["Private LLM deployment", "Custom Model Fine-tuning", "Enterprise API Access", "Dedicated AI Engineer"] }
        },
        faq: [
            { q: "Is my data safe?", a: "Yes, we use private instances and SOC2 compliant workflows. Your data is never used to train public models." },
            { q: "Can this replace my marketing team?", a: "It empowers them. AI handles the grunt work so your team can focus on strategy and creative direction." }
        ]
    }
};

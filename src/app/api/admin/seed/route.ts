import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const blogPosts = [
    // --- SEO ---
    {
        title: "SEO in 2026: Strategies That Actually Work After AI Search Updates",
        category: "SEO",
        image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=2000&auto=format&fit=crop",
        excerpt: "The landscape of search is shifting rapidly with Generative AI. Discover the core strategies to maintain visibility in 2026."
    },
    {
        title: "On-Page SEO Checklist: 15 Elements Every High-Ranking Page Needs",
        category: "SEO",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Perfect your on-page technicals with this comprehensive checklist designed for modern search engines."
    },
    {
        title: "How to Build Topic Authority and Dominate Google Rankings",
        category: "SEO",
        image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Learn why topic clusters and authority are more important than individual keywords in today's digital landscape."
    },
    {
        title: "Technical SEO Mistakes That Are Killing Your Traffic (And How to Fix Them)",
        category: "SEO",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Simple technical errors can destroy your rankings. We identify the top culprits and provide step-by-step fixes."
    },
    {
        title: "SEO vs GEO: How AI Search Is Changing Content Optimization",
        category: "SEO",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Generative Engine Optimization is the new frontier. Understand the difference and how to dominate both."
    },

    // --- Paid Ads ---
    {
        title: "Google Ads vs Meta Ads: Which Platform Gives Better ROI in 2026?",
        category: "Paid Ads",
        image: "https://images.unsplash.com/photo-1533750516457-a7f992034fce?q=80&w=2000&auto=format&fit=crop",
        excerpt: "A data-driven comparison of the two giants in the advertising space to help you allocate your budget effectively."
    },
    {
        title: "10 Paid Advertising Mistakes That Drain Your Marketing Budget",
        category: "Paid Ads",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Are you burning through your ad spend? Avoid these common pitfalls to maximize your return on investment."
    },
    {
        title: "How to Create High-Converting Ad Funnels for Lead Generation",
        category: "Paid Ads",
        image: "https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Building a funnel isn't enough; it needs to convert. Discover the psychological triggers that drive leads."
    },
    {
        title: "Performance Marketing Strategies That Scale Without Increasing Costs",
        category: "Paid Ads",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Scale your business efficiently using these performance-focused marketing techniques and automation."
    },
    {
        title: "The Psychology Behind High-Click Paid Ads: What Actually Works",
        category: "Paid Ads",
        image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Why do people click? We dive into the behavioral science behind successful ad creative and copy."
    },

    // --- Social Media ---
    {
        title: "Social Media Marketing Trends 2026: What Brands Must Know",
        category: "Social Media",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
        excerpt: "The social landscape is evolving. Stay ahead of the curve with our forecast on the major trends for 2026."
    },
    {
        title: "How to Create Viral Content Without Following Every Trend",
        category: "Social Media",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Sustainability over snacks. Learn the framework for creating content that resonates and spreads naturally."
    },
    {
        title: "Instagram vs LinkedIn vs TikTok: Choosing the Right Platform for Business",
        category: "Social Media",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Don't spread yourself too thin. We analyze which platforms offer the best growth opportunities for your niche."
    },
    {
        title: "Social Media Content Strategy That Drives Real Engagement",
        category: "Social Media",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Engagement is more than just likes. Discover how to build a community and drive meaningful interactions."
    },
    {
        title: "The Secret to Building Brand Authority Through Social Media",
        category: "Social Media",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Position your brand as a leader. Strategies for establishing trust and authority on social platforms."
    },

    // --- Automation ---
    {
        title: "Marketing Automation Guide: Save Time and Increase Conversions",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Stop doing manual work. Learn how to automate your marketing workflows to save time and boost sales."
    },
    {
        title: "Top AI Automation Tools Every Digital Marketer Should Use",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop",
        excerpt: "From content creation to lead grading, these are the essential AI tools for the modern marketer."
    },
    {
        title: "How Automation Improves Lead Nurturing and Customer Experience",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Personalization at scale. Discover how automation can enhance the customer journey and drive loyalty."
    },
    {
        title: "Email Automation Workflows That Increase Sales on Autopilot",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2000&auto=format&fit=crop",
        excerpt: "The most effective email sequences for abandoned carts, welcome flows, and re-engagement."
    },
    {
        title: "Beginner’s Guide to Business Automation for Faster Growth",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1454165833767-02a698d1316a?q=80&w=2000&auto=format&fit=crop",
        excerpt: "New to automation? Our step-by-step guide will help you implement your first automation workflows."
    },

    // --- Web Development ---
    {
        title: "Modern Website Trends in 2026: Design, Speed, and User Experience",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop",
        excerpt: "What makes a great website in 2026? We analyze the shift towards immersive, fast, and accessible design."
    },
    {
        title: "Why Website Speed Matters More Than Ever for SEO and Conversions",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Speed is a ranking factor and a conversion driver. Learn how to optimize your site's performance."
    },
    {
        title: "Custom Website vs WordPress: What’s Better for Business Growth?",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Scalability, security, and performance. We compare custom builds with popular CMS platforms."
    },
    {
        title: "Core Web Vitals Explained: How to Build a High-Performance Website",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1504868584819-f8e90ece2cd1?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Getting green scores on Lighthouse. A deep dive into the metrics that matter for Google's UX signals."
    },
    {
        title: "Website UX Mistakes That Reduce Leads and Sales",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Is your design driving people away? Fix these common UX flaws to keep visitors on your site and convert them."
    },

    // --- Strategy ---
    {
        title: "Digital Marketing Strategy Framework for Business Growth in 2026",
        category: "Strategy",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Building a cohesive strategy in a fragmented market. Our framework for sustainable digital growth."
    },
    {
        title: "How to Create a Results-Driven Marketing Strategy from Scratch",
        category: "Strategy",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Start with why. A guide to setting goals, identifying audiences, and choosing the right channels."
    },
    {
        title: "Full Funnel Strategy: Turning Visitors into Loyal Customers",
        category: "Strategy",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Stop focusing only on the top of the funnel. Learn the comprehensive strategy for every customer stage."
    },
    {
        title: "Data-Driven Marketing Strategies That Actually Increase Revenue",
        category: "Strategy",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2000&auto=format&fit=crop",
        excerpt: "Insights over intuition. How to use data analytics to drive better marketing decisions and ROI."
    }
];

export async function GET() {
    const supabase = createAdminClient();
    const results = [];

    for (const post of blogPosts) {
        const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

        const content = `
## Why This Matters

In 2026, the digital landscape has transformed. **${post.title}** is more critical than ever for businesses looking to scale in a competitive market. 

As search engines shift towards AI-first responses and user behavior becomes increasingly fragmented across platforms, your strategy must evolve to remain relevant. This article explores the foundational elements and advanced tactics required to master ${post.category}.

## Core Principles

1. **User-First Mentality**: Algorithms now prioritize semantic meaning and helpfulness over keyword density.
2. **Data Integrity**: Clean, actionable data is the fuel for modern marketing automation and AI tools.
3. **Omni-channel Presence**: Being present where your audience is, with consistent and high-quality content.

## Implementation Guide

To effectively implement these strategies, our team recommends starting with a comprehensive audit of your current assets. Once you have a baseline, focus on high-impact changes that align with your primary business goals—whether that's lead generation, brand authority, or direct sales.

> "The best time to optimize your strategy was yesterday. The second best time is today." - Digihub Strategy Team

## Looking Ahead

As we move further into 2026, those who embrace these shifts in **${post.category}** will find themselves at a significant advantage. Stay tuned to our blog for more deep dives into these topics.
    `;

        const { error } = await supabase
            .from('blogs')
            .upsert({
                title: post.title,
                slug: slug,
                excerpt: post.excerpt,
                content: content,
                category: post.category,
                image: post.image,
                status: 'published',
                author_name: 'Digihub Team',
                author_role: 'Strategy Expert',
                published_at: new Date().toISOString(),
                type: 'blog',
                meta_title: post.title,
                meta_description: post.excerpt
            }, { onConflict: 'slug' });

        if (error) {
            results.push({ title: post.title, status: 'error', error });
        } else {
            results.push({ title: post.title, status: 'success' });
        }
    }

    return NextResponse.json({ results });
}

import { MetadataRoute } from 'next';

// Always use production URL for sitemap
const SITE_URL = 'https://digihubsolution.tech';


export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // Service Pages
        {
            url: `${SITE_URL}/services/seo`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services/performance-marketing`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services/social-media-marketing`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services/content-marketing`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services/influencer`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services/website-designing-and-development`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services/ai-marketing`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Legal Pages
        {
            url: `${SITE_URL}/privacy-policy`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/terms`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.8,
        },
    ];

    return staticRoutes;
}

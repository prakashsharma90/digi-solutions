import { MetadataRoute } from 'next';

const PREVIEW_DEPLOYMENT_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || PREVIEW_DEPLOYMENT_URL || 'https://digihubsolution.tech';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified,
            changeFrequency: 'yearly',
            priority: 1,
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
            url: `${SITE_URL}/blog`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/privacy-policy`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${SITE_URL}/terms`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    return staticRoutes;
}

import { MetadataRoute } from 'next';

const PREVIEW_DEPLOYMENT_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || PREVIEW_DEPLOYMENT_URL || 'https://digihub-solutions.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'], // Block admin and api routes from search aggregation
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}

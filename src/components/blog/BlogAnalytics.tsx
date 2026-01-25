"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

export function BlogAnalytics({ slug }: { slug: string }) {
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        // You could track a specific "Blog View" event here if simpler Page View isn't enough
        trackEvent("view_blog_post", { slug });
    }, [slug]);

    return null; // This component doesn't render anything visible
}

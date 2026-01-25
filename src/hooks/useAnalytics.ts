"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useAnalytics() {
    const pathname = usePathname();
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [maxScroll, setMaxScroll] = useState<number>(0);

    // Track page view and time on page
    useEffect(() => {
        // Reset start time on path change
        setStartTime(Date.now());
        setMaxScroll(0);

        // Page View Event
        console.log(`[Analytics] Page View: ${pathname}`);

        return () => {
            const timeSpent = (Date.now() - startTime) / 1000;
            console.log(`[Analytics] Time on Page: ${timeSpent.toFixed(1)}s`);
        };
    }, [pathname]);

    // Track Scroll Depth
    useEffect(() => {
        const handleScroll = () => {
            const tempMaxScroll = Math.max(
                maxScroll,
                (window.scrollY + window.innerHeight) / document.body.scrollHeight
            );

            // Only update locally to avoid too many renders/events, 
            // in a real app you'd debouce this or send at milestones (25%, 50%, etc)
            if (tempMaxScroll > maxScroll + 0.1) { // 10% increments
                setMaxScroll(tempMaxScroll);
                console.log(`[Analytics] Scroll Depth: ${(tempMaxScroll * 100).toFixed(0)}%`);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [maxScroll]);

    const trackEvent = (eventName: string, properties?: Record<string, any>) => {
        console.log(`[Analytics] Event: ${eventName}`, properties);
        // In production, connect to GA4, PostHog, or Supabase here
    };

    return { trackEvent };
}

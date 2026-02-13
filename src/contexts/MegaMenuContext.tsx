"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

interface ServiceItem {
    id: string;
    name: string;
    slug: string;
    subtitle: string;
    icon: string;
    visible: boolean;
    featured: boolean;
    badge?: "Most Popular" | "Recommended" | "AI-Powered" | "New";
    price: string;
    priceType?: 'fixed' | 'starting' | 'quote' | 'hidden';
    order: number;
}

interface Category {
    id: string;
    name: string;
    color: string;
    icon: string;
    visible: boolean;
    order: number;
    services: ServiceItem[];
}

interface AvailableService {
    id: string;
    name: string;
    slug: string;
    description?: string;
    status: string;
}

interface MegaMenuContextType {
    categories: Category[];
    setCategories: (categories: Category[]) => void;
    updateCategory: (categoryId: string, updates: Partial<Category>) => void;
    updateService: (categoryId: string, serviceId: string, updates: Partial<ServiceItem>) => void;
    moveService: (serviceId: string, fromCategoryId: string, toCategoryId: string) => void;
    addService: (categoryId: string, service: ServiceItem) => void;
    removeService: (categoryId: string, serviceId: string) => void;
    reorderServices: (categoryId: string, services: ServiceItem[]) => void;
    showPricing: boolean;
    setShowPricing: (show: boolean) => void;
    availableServices: AvailableService[];
    loadingServices: boolean;
    resetToDefaults: () => void;
}

const MegaMenuContext = createContext<MegaMenuContextType | undefined>(undefined);

const defaultCategories: Category[] = [
    {
        id: "seo",
        name: "SEO Services",
        color: "cyan",
        icon: "Search",
        visible: true,
        order: 1,
        services: [
            { id: "seo-1", name: "Search Engine Optimization (SEO)", slug: "seo", subtitle: "Organic search dominance", icon: "Search", visible: true, featured: true, price: "₹25k/mo", order: 1 },
            { id: "seo-2", name: "Local SEO", slug: "local-seo", subtitle: "Local map rankings", icon: "MapPin", visible: true, featured: false, price: "₹15k/mo", order: 2 },
            { id: "seo-3", name: "E-commerce SEO", slug: "ecommerce-seo", subtitle: "Product visibility", icon: "ShoppingBag", visible: true, featured: false, price: "₹35k/mo", order: 3 },
            { id: "seo-4", name: "Technical SEO", slug: "seo", subtitle: "Core web vitals & crawlability", icon: "Settings", visible: true, featured: false, price: "₹20k/mo", order: 4 },
            { id: "seo-5", name: "SEO Audit", slug: "seo", subtitle: "Site health analysis", icon: "ClipboardCheck", visible: true, featured: false, price: "₹10k", order: 5 },
            { id: "seo-6", name: "Keyword Research", slug: "seo", subtitle: "Targeted traffic strategy", icon: "Key", visible: true, featured: false, price: "₹5k", order: 6 },
            { id: "seo-7", name: "Link Building", slug: "seo", subtitle: "Authority & trust building", icon: "Link", visible: true, featured: false, price: "₹30k/mo", order: 7 }
        ]
    },
    {
        id: "paid-ads",
        name: "Paid Advertising",
        color: "green",
        icon: "DollarSign",
        visible: true,
        order: 2,
        services: [
            { id: "paid-1", name: "Google Ads", slug: "google-ads", subtitle: "PPC & Search ads", icon: "Target", visible: true, featured: true, price: "₹20k/mo", order: 1 },
            { id: "paid-2", name: "Meta Ads (Facebook & Instagram)", slug: "meta-ads", subtitle: "Social media reach", icon: "Facebook", visible: true, featured: true, price: "₹15k/mo", order: 2 },
            { id: "paid-3", name: "YouTube Ads", slug: "youtube-ads", subtitle: "Video marketing", icon: "Youtube", visible: true, featured: false, price: "₹25k/mo", order: 3 },
            { id: "paid-4", name: "LinkedIn Ads", slug: "linkedin-ads", subtitle: "B2B lead generation", icon: "Linkedin", visible: true, featured: false, price: "₹30k/mo", order: 4 },
            { id: "paid-5", name: "Performance Marketing", slug: "performance-marketing", subtitle: "ROI focused strategy", icon: "TrendingUp", visible: true, featured: true, price: "₹40k/mo", order: 5 },
            { id: "paid-6", name: "Remarketing Campaigns", slug: "performance-marketing", subtitle: "Customer re-engagement", icon: "RefreshCw", visible: true, featured: false, price: "₹10k/mo", order: 6 }
        ]
    },
    {
        id: "digital-channels",
        name: "Marketing & Digital Channels",
        color: "blue",
        icon: "Share2",
        visible: true,
        order: 3,
        services: [
            { id: "chan-1", name: "Social Media Marketing", slug: "social-media", subtitle: "Brand presence", icon: "MessageCircle", visible: true, featured: true, price: "₹15k/mo", order: 1 },
            { id: "chan-2", name: "Website Designing & Development", slug: "website-designing-and-development", subtitle: "High-converting sites", icon: "Code", visible: true, featured: true, price: "₹50k+", order: 2 },
            { id: "chan-3", name: "Email Marketing", slug: "email-marketing", subtitle: "Direct engagement", icon: "Mail", visible: true, featured: false, price: "₹10k/mo", order: 3 },
            { id: "chan-4", name: "WhatsApp Marketing", slug: "whatsapp-marketing", subtitle: "Instant messaging", icon: "Phone", visible: true, featured: false, price: "₹12k/mo", order: 4 },
            { id: "chan-5", name: "Content Marketing", slug: "content-marketing", subtitle: "Authority content", icon: "FileText", visible: true, featured: false, price: "₹20k/mo", order: 5 },
            { id: "chan-6", name: "AI Search Optimization (SGE & LLM SEO)", slug: "ai-marketing", subtitle: "Future-proof SEO", icon: "Sparkles", visible: true, featured: true, badge: "AI-Powered", price: "₹35k/mo", order: 6 },
            { id: "chan-7", name: "Influencer Marketing", slug: "influencer", subtitle: "Social proof", icon: "Users", visible: true, featured: false, price: "Quote", order: 7 }
        ]
    },
    {
        id: "growth-opt",
        name: "Growth & Optimization",
        color: "purple",
        icon: "Zap",
        visible: true,
        order: 4,
        services: [
            { id: "growth-1", name: "Conversion Rate Optimization (CRO)", slug: "cro", subtitle: "Maximize efficiency", icon: "MousePointerClick", visible: true, featured: true, price: "₹25k/mo", order: 1 },
            { id: "growth-2", name: "Landing Page Optimization", slug: "landing-page", subtitle: "High-impact pages", icon: "Layout", visible: true, featured: false, price: "₹15k+", order: 2 },
            { id: "growth-3", name: "Funnel Building", slug: "funnel-building", subtitle: "Sales automation", icon: "Filter", visible: true, featured: false, price: "₹40k+", order: 3 },
            { id: "growth-4", name: "Marketing Automation", slug: "marketing-automation", subtitle: "Scaling efficiency", icon: "Repeat", visible: true, featured: false, price: "₹30k/mo", order: 4 },
            { id: "growth-5", name: "CRM Integration", slug: "crm-integration", subtitle: "Seamless workflows", icon: "Database", visible: true, featured: false, price: "₹20k+", order: 5 },
            { id: "growth-6", name: "Online Reputation Management (ORM)", slug: "orm", subtitle: "Brand protection", icon: "ShieldCheck", visible: true, featured: false, price: "₹20k/mo", order: 6 },
            { id: "growth-7", name: "Brand Strategy & Positioning", slug: "brand-strategy", subtitle: "Market differentiation", icon: "Flag", visible: true, featured: true, price: "₹50k+", order: 7 },
            { id: "growth-8", name: "Analytics & Reporting", slug: "analytics", subtitle: "Insights & transparency", icon: "BarChart3", visible: true, featured: false, price: "₹10k/mo", order: 8 }
        ]
    }
];

export function MegaMenuProvider({ children }: { children: ReactNode }) {
    const [categories, setCategories] = useState<Category[]>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("megaMenuCategories");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    // Force update to new 4-column layout if they have fewer than 4 categories
                    if (parsed.length < 4) {
                        return defaultCategories;
                    }
                    return parsed;
                } catch (e) {
                    return defaultCategories;
                }
            }
        }
        return defaultCategories;
    });

    const [showPricing, setShowPricing] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("megaMenuShowPricing");
            return stored ? JSON.parse(stored) : true;
        }
        return true;
    });

    const [availableServices, setAvailableServices] = useState<AvailableService[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);

    // Fetch available services from Supabase
    useEffect(() => {
        const fetchServices = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('services')
                .select('id, name, slug, description, status')
                .eq('status', 'Published')
                .order('name', { ascending: true });

            if (!error && data) {
                setAvailableServices(data);
            }
            setLoadingServices(false);
        };

        fetchServices();
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("megaMenuCategories", JSON.stringify(categories));
        }
    }, [categories]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("megaMenuShowPricing", JSON.stringify(showPricing));
        }
    }, [showPricing]);

    const updateCategory = (categoryId: string, updates: Partial<Category>) => {
        setCategories(prev => prev.map(cat =>
            cat.id === categoryId ? { ...cat, ...updates } : cat
        ));
    };

    const updateService = (categoryId: string, serviceId: string, updates: Partial<ServiceItem>) => {
        setCategories(prev => prev.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    services: cat.services.map(svc =>
                        svc.id === serviceId ? { ...svc, ...updates } : svc
                    )
                };
            }
            return cat;
        }));
    };

    const moveService = (serviceId: string, fromCategoryId: string, toCategoryId: string) => {
        setCategories(prev => {
            const fromCategory = prev.find(cat => cat.id === fromCategoryId);
            const service = fromCategory?.services.find(svc => svc.id === serviceId);

            if (!service) return prev;

            return prev.map(cat => {
                if (cat.id === fromCategoryId) {
                    return {
                        ...cat,
                        services: cat.services.filter(svc => svc.id !== serviceId)
                    };
                }
                if (cat.id === toCategoryId) {
                    return {
                        ...cat,
                        services: [...cat.services, service]
                    };
                }
                return cat;
            });
        });
    };

    const addService = (categoryId: string, service: ServiceItem) => {
        setCategories(prev => prev.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    services: [...cat.services, service]
                };
            }
            return cat;
        }));
    };

    const removeService = (categoryId: string, serviceId: string) => {
        setCategories(prev => prev.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    services: cat.services.filter(svc => svc.id !== serviceId)
                };
            }
            return cat;
        }));
    };

    const reorderServices = (categoryId: string, services: ServiceItem[]) => {
        setCategories(prev => prev.map(cat => {
            if (cat.id === categoryId) {
                return { ...cat, services };
            }
            return cat;
        }));
    };

    return (
        <MegaMenuContext.Provider
            value={{
                categories,
                setCategories,
                updateCategory,
                updateService,
                moveService,
                addService,
                removeService,
                reorderServices,
                showPricing,
                setShowPricing,
                availableServices,
                loadingServices,
                resetToDefaults: () => setCategories(defaultCategories)
            }}
        >
            {children}
        </MegaMenuContext.Provider>
    );
}

export function useMegaMenu() {
    const context = useContext(MegaMenuContext);
    if (context === undefined) {
        throw new Error("useMegaMenu must be used within a MegaMenuProvider");
    }
    return context;
}

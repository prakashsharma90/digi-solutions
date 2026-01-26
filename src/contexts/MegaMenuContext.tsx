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
}

const MegaMenuContext = createContext<MegaMenuContextType | undefined>(undefined);

const defaultCategories: Category[] = [
    {
        id: "acquisition",
        name: "Acquisition & Revenue",
        color: "green",
        icon: "TrendingUp",
        visible: true,
        order: 1,
        services: [
            {
                id: "perf-1",
                name: "Performance Marketing",
                slug: "performance",
                subtitle: "Multi-channel campaigns with positive ROI",
                icon: "Megaphone",
                visible: true,
                featured: true,
                badge: "Most Popular",
                price: "₹25k/mo",
                order: 1
            },
            {
                id: "ppc-1",
                name: "Google Ads (PPC)",
                slug: "ppc",
                subtitle: "Instant visibility & qualified leads",
                icon: "Target",
                visible: true,
                featured: true,
                badge: "Recommended",
                price: "₹20k/mo",
                order: 2
            }
        ]
    },
    {
        id: "ai",
        name: "AI & Future Search",
        color: "cyan",
        icon: "Bot",
        visible: true,
        order: 2,
        services: [
            {
                id: "ai-seo-1",
                name: "AI Search Optimization",
                slug: "ai-seo",
                subtitle: "Rank in AI answers & featured snippets",
                icon: "Sparkles",
                visible: true,
                featured: true,
                badge: "AI-Powered",
                price: "₹35k/mo",
                order: 1
            }
        ]
    },
    {
        id: "brand",
        name: "Brand Growth",
        color: "purple",
        icon: "Star",
        visible: true,
        order: 3,
        services: []
    },
    {
        id: "dev",
        name: "Development & Tech",
        color: "orange",
        icon: "Code",
        visible: true,
        order: 4,
        services: []
    }
];

export function MegaMenuProvider({ children }: { children: ReactNode }) {
    const [categories, setCategories] = useState<Category[]>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("megaMenuCategories");
            if (stored) {
                try {
                    return JSON.parse(stored);
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
                loadingServices
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

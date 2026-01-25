"use client";

import React, { useState, useEffect } from "react";
import { Container, Section } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles, Target, Search, Bot, PenTool, Share2,
    User, Users, Video, MousePointer2, Zap, Database,
    Mail, MessageCircle, ShieldCheck, Layers, ShoppingCart,
    MapPin, BarChart3, ArrowUpRight, ChevronDown
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { getIcon } from "@/lib/icon-mapping";

export function ServicesOverview() {
    const [services, setServices] = useState<any[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await supabase
                .from('services')
                .select('slug, name, description, display_tags')
                .eq('status', 'Published')
                .eq('is_deleted', false)
                .contains('display_tags', ['services'])
                .order('sort_order', { ascending: true });

            if (data) {
                // Map db fields to component props
                const mapped = data.map(s => ({
                    title: s.name,
                    desc: s.description || "Digital Service",
                    icon: getIcon(s.slug),
                    href: `/services/${s.slug}`
                }));
                setServices(mapped);
            }
            setLoading(false);
        };

        fetchServices();

        // Real-time subscription for instant updates on the listing page
        const channel = supabase
            .channel('public:services')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, (payload) => {
                fetchServices(); // Re-fetch on any change
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };

    }, []);

    const handleViewMore = () => {
        setVisibleCount((prev) => Math.min(prev + 3, services.length));
    };

    const isAllVisible = visibleCount >= services.length;

    if (loading && services.length === 0) {
        return (
            <Section className="bg-[#0B0F14] relative py-20">
                <Container>
                    <div className="text-center text-white">Loading Services...</div>
                </Container>
            </Section>
        )
    }

    return (
        <Section className="bg-[#0B0F14] relative py-20">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <AnimatePresence mode="popLayout">
                        {services.slice(0, visibleCount).map((service, i) => (
                            <motion.div
                                key={service.href}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{
                                    opacity: { duration: 0.3 },
                                    layout: { type: "spring", stiffness: 300, damping: 30 }
                                }}
                                viewport={{ once: true }}
                                className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-300 cursor-pointer h-full"
                            >
                                <Link href={service.href} className="absolute inset-0 z-10" aria-label={`View ${service.title}`} />
                                <div className="absolute top-4 right-4 text-white/20 group-hover:text-primary transition-colors">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <service.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-text-muted leading-relaxed">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {!isAllVisible && services.length > 6 && (
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleViewMore}
                                className="group border-primary/20 hover:border-primary/50 text-white gap-2 transition-all"
                            >
                                View More Services
                                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            </Button>
                        </motion.div>
                    </div>
                )}
            </Container>
        </Section>
    );
}

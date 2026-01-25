"use client";

import React, { useState, useEffect } from "react";
import { Container, Section } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { getIcon } from "@/lib/icon-mapping";

export function ServicesGrid() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await supabase
                .from('services')
                .select('slug, name, description, display_tags')
                .eq('status', 'Published')
                .eq('is_deleted', false)
                .contains('display_tags', ['home'])
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

        // Real-time subscription for instant updates
        const channel = supabase
            .channel('public:services-home')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, (payload) => {
                fetchServices();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    if (loading && services.length === 0) {
        return (
            <Section className="relative overflow-hidden">
                <Container>
                    <div className="text-center text-white">Loading Services...</div>
                </Container>
            </Section>
        );
    }

    return (
        <Section className="relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/3" />
            </div>

            <Container className="relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-muted mb-4">
                        Our Services
                    </h2>
                    <p className="text-text-muted text-lg">
                        Comprehensive digital solutions powered by intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <AnimatePresence mode="popLayout">
                        {services.map((service, i) => (
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

                {/* View More Services Button */}
                <div className="flex justify-center mt-12">
                    <Link href="/services">
                        <Button size="lg" variant="outline" className="group border-primary/20 hover:border-primary/50">
                            View More Services
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </Container>
        </Section>
    );
}

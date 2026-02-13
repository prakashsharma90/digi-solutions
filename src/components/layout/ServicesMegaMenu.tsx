"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useMegaMenu } from "@/contexts/MegaMenuContext";
import { cn } from "@/lib/utils";

interface ServicesMegaMenuProps {
    onClose: () => void;
    isPreview?: boolean;
}

export function ServicesMegaMenu({ onClose, isPreview = false }: ServicesMegaMenuProps) {
    const { categories } = useMegaMenu();

    // Filter categories that have at least one visible service
    const visibleCategories = categories
        .filter(cat => cat.visible)
        .map(cat => ({
            ...cat,
            services: cat.services.filter(svc => svc.visible)
        }))
        .filter(cat => cat.services.length > 0);

    if (visibleCategories.length === 0) {
        return isPreview ? (
            <div className="text-center py-12 text-gray-400">
                <p>No visible services configured</p>
                <p className="text-sm mt-2">Add services in admin to see them here</p>
            </div>
        ) : null;
    }

    const menuContent = (
        <div className="bg-[#0f141a]/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {visibleCategories.map((category) => (
                        <div key={category.id} className="flex flex-col gap-3">
                            {/* Category Header */}
                            <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                                <div className={`text-[11px] font-black uppercase tracking-[0.2em] text-[#00D9C3]`}>
                                    {category.name}
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            </div>

                            {/* Service Links */}
                            <div className="flex flex-col gap-0.5">
                                {category.services.map((service) => (
                                    <Link
                                        key={service.id}
                                        href={`/services/${service.slug}`}
                                        onClick={onClose}
                                        className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-all duration-200 border border-transparent hover:border-white/5"
                                    >
                                        <span className="text-[13px] font-bold text-gray-500 group-hover:text-white transition-colors">
                                            {service.name}
                                        </span>
                                        <ChevronRight
                                            size={12}
                                            className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Optional Footer/Stats */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-600 font-black tracking-widest uppercase">
                    <div>
                        Explore all <span className="text-primary">{visibleCategories.reduce((acc, c) => acc + c.services.length, 0)} Services</span>
                    </div>
                </div>
            </div>
        </div>
    );

    // In preview mode, render without motion wrapper
    if (isPreview) {
        return menuContent;
    }

    // In navbar mode, use motion wrapper with absolute positioning
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[90vw] md:w-[900px] z-50"
            role="menu"
            aria-label="Services menu"
            onMouseLeave={onClose}
        >
            {menuContent}
        </motion.div>
    );
}

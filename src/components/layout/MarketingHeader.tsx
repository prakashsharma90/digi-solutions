"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function MarketingHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
            <Container className="flex items-center h-20">
                {/* Logo - Left */}
                <div className="flex-1 flex items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden">
                            <Image
                                src="/Digihub Solution (1).png"
                                alt="Digihub Logo"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <span className="text-lg md:text-2xl font-bold font-sans tracking-tight text-slate-900 group-hover:text-primary transition-colors whitespace-nowrap">
                            Digihub Solution
                        </span>
                    </Link>
                </div>

                {/* Center Navigation - Proportional Spacing */}
                <nav className="hidden md:flex items-center justify-center">
                    <div className="flex items-center bg-slate-100 rounded-full p-1.5 border border-slate-200 shadow-sm">
                        <Link
                            href="/"
                            className="text-sm font-bold text-white px-6 py-2 rounded-full bg-orange-600 shadow-md shadow-orange-500/20 transition-all hover:bg-orange-500"
                        >
                            Home
                        </Link>
                        {[
                            { name: "Features", href: "#features", hasDropdown: true },
                            { name: "Services", href: "#services" },
                            { name: "Pricing", href: "#pricing" },
                            { name: "Help", href: "#help" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-bold text-slate-600 hover:text-slate-900 px-6 py-2 rounded-full transition-all flex items-center gap-1 hover:bg-white/50"
                            >
                                {item.name}
                                {item.hasDropdown && <div className="w-0 h-0 border-l-[3px] border-l-transparent border-t-[4px] border-t-slate-400 border-r-[3px] border-r-transparent mt-0.5 ml-0.5" />}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Actions - Right */}
                <div className="flex-1 flex items-center justify-end gap-6">
                    <Link href="/login" className="hidden md:flex text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors">
                        Login
                    </Link>
                    <Link href="/signup">
                        <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 h-10 px-6 font-bold shadow-lg shadow-black/10 transition-all">
                            Sign Up
                        </Button>
                    </Link>
                    <button className="md:hidden p-2 text-slate-900 hover:text-orange-600 transition-colors">
                        <Menu size={24} />
                    </button>
                </div>
            </Container>
        </header>
    );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function MarketingHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-sm pt-6">
            <Container className="flex items-center justify-between">
                {/* Logo from Screenshot */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                    </div>
                    <span className="text-2xl font-bold font-sans tracking-tight text-slate-900">
                        Pollinate
                    </span>
                </Link>

                {/* Center Pill Navigation */}
                <div className="hidden md:flex items-center bg-black rounded-full p-1.5 absolute left-1/2 -translate-x-1/2 shadow-xl shadow-black/5">
                    <Link
                        href="/"
                        className="text-sm font-medium text-white px-5 py-2 rounded-full bg-orange-600 transition-all hover:bg-orange-500"
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
                            className="text-sm font-medium text-slate-300 hover:text-white px-5 py-2 rounded-full transition-all flex items-center gap-1"
                        >
                            {item.name}
                            {item.hasDropdown && <div className="w-0 h-0 border-l-[3px] border-l-transparent border-t-[4px] border-t-slate-400 border-r-[3px] border-r-transparent mt-0.5 ml-0.5" />}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/login" className="hidden md:flex text-sm font-semibold text-slate-900 hover:text-orange-600">
                        Login
                    </Link>
                    <Link href="/signup">
                        <Button className="rounded-full bg-black text-white hover:bg-slate-800 h-10 px-6 font-semibold shadow-lg shadow-black/20">
                            Sign Up
                        </Button>
                    </Link>
                    <button className="md:hidden p-2 text-slate-900">
                        <Menu size={24} />
                    </button>
                </div>
            </Container>
        </header>
    );
}

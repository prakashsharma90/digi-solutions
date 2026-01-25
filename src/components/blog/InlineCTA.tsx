"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap } from "lucide-react";

export function InlineCTA() {
    return (
        <div className="my-12 relative overflow-hidden rounded-2xl border border-primary/30 p-8 md:p-10 isolate group">
            {/* Background with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] z-0" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                        <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                            <Zap size={12} fill="currentColor" /> Pro Tip
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Want to implement this faster?</h3>
                    <p className="text-gray-400 max-w-md">
                        Our team can handle the heavy lifting. Get a custom strategy audit for your brand.
                    </p>
                </div>

                <Link href="/contact" className="flex-shrink-0 w-full md:w-auto">
                    <Button size="lg" className="w-full rounded-full font-semibold bg-white text-black hover:bg-gray-200">
                        Book Free Strategy Call
                    </Button>
                </Link>
            </div>

            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-700" />
        </div>
    );
}

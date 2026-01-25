"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, FileText } from "lucide-react";
import Link from "next/link";

export function SidebarAudit() {
    return (
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />

            <div className="relative z-10">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                    <BarChart3 className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Free SEO Audit</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    Is your website leaking traffic? Get a comprehensive 20-point analysis of your SEO health.
                </p>

                <Link href="/contact" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-900/20">
                        Get My Score <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}

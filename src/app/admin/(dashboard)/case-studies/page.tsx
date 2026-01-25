"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import {
    Briefcase,
    Search,
    Plus,
    MoreVertical,
    TrendingUp,
    ExternalLink,
    Trash2,
    Edit3,
    Globe,
    Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function CaseStudiesManagement() {
    const [caseStudies, setCaseStudies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCaseStudies();
    }, []);

    const fetchCaseStudies = async () => {
        try {
            const res = await fetch("/api/case-studies");
            if (res.ok) {
                const data = await res.json();
                setCaseStudies(data);
            }
        } catch (error) {
            console.error("Failed to fetch case studies", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCaseStudy = async (id: string) => {
        if (!confirm("Are you sure you want to delete this case study?")) return;
        try {
            const res = await fetch(`/api/case-studies?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setCaseStudies(caseStudies.filter(cs => cs.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete case study", error);
        }
    };

    const filtered = caseStudies.filter(cs =>
        cs.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cs.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#0B0F14]">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white font-poppins">Case Studies</h1>
                            <p className="text-gray-400 mt-1">Showcase your success stories and client results</p>
                        </div>
                        <Button className="gap-2">
                            <Plus size={18} />
                            Add Case Study
                        </Button>
                    </div>

                    <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-4 mb-8 flex items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search by client or industry..."
                                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {loading ? (
                            <div className="col-span-2 text-center py-12 text-gray-500">Loading case studies...</div>
                        ) : filtered.length === 0 ? (
                            <div className="col-span-2 text-center py-12 text-gray-500">No case studies found</div>
                        ) : filtered.map((cs) => (
                            <motion.div
                                key={cs.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#0F141A] border border-white/5 rounded-2xl p-6 group hover:border-primary/20 transition-all"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                        <Briefcase size={24} />
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg">
                                            <Edit3 size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteCaseStudy(cs.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 bg-white/5 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{cs.client}</h3>
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                                    <span className="flex items-center gap-1">
                                        <Building2 size={12} /> {cs.industry}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Globe size={12} /> {cs.service}
                                    </span>
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <div className="flex items-center gap-2 text-primary font-bold mb-1">
                                        <TrendingUp size={16} /> Result
                                    </div>
                                    <p className="text-sm text-gray-300">{cs.result}</p>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase py-1 px-3 rounded-full border",
                                        cs.status === "Published" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                    )}>
                                        {cs.status}
                                    </span>
                                    <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
                                        Preview <ExternalLink size={12} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

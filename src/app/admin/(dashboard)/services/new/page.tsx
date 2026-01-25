"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
// import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddServicePage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // Form States
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("sparkles"); // default

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setName(val);
        setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (!name || !slug) {
            alert("Name and Slug are required");
            setLoading(false);
            return;
        }

        const { error } = await supabase
            .from('services')
            .insert({
                name,
                slug,
                description,
                title: name, // Default title to name
                status: 'Draft',
                is_deleted: false,
                sort_order: 99, // Put at end by default
                // Default empty JSON to prevent null errors
                benefits: [],
                problems: [],
                approach: [],
                tools: [],
                outcomes: [],
                industries: [],
                pricing: {},
                faq: [],
                meta_title: `${name} Services | Digihub Solutions`,
                meta_desc: description.substring(0, 150)
            });

        if (error) {
            console.error(error);
            alert(`Failed to create service: ${error.message}`);
        } else {
            alert("Service created successfully!");
            router.push('/admin/services');
        }
        setLoading(false);
    };

    return (
        <div className="flex h-screen bg-[#0B0F14]">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">Add New Service</h1>

                    <form onSubmit={handleSubmit} className="bg-[#0F141A] border border-white/5 rounded-2xl p-8 space-y-6">

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Service Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="e.g. AI Marketing"
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Slug (URL)</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="e.g. ai-marketing"
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-primary/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Short Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Brief summary for the cards..."
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white h-24 focus:outline-none focus:border-primary/50"
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.back()}
                                className="text-gray-400 hover:text-white"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="min-w-[120px]">
                                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Create Draft"}
                            </Button>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
}

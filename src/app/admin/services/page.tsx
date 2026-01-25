"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminServices() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('sort_order', { ascending: true }); // Assuming sort_order, or created_at

        if (error) {
            console.error("Failed to fetch services", error);
        } else {
            setServices(data || []);
        }
        setLoading(false);
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';

        // Optimistic UI Update
        setServices(prev => prev.map(s =>
            s.id === id ? { ...s, status: newStatus } : s
        ));

        // Send to DB
        const { error } = await supabase
            .from('services')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            alert("Failed to update status");
            // Revert on error
            setServices(prev => prev.map(s =>
                s.id === id ? { ...s, status: currentStatus } : s
            ));
            console.error(error);
        }
    };

    const handleSeed = async () => {
        if (!confirm("This will restore all default services. Continue?")) return;

        setLoading(true);
        try {
            const res = await fetch('/api/seed-services');
            const data = await res.json();

            if (res.ok) {
                alert("Services restored successfully!");
                fetchServices();
            } else {
                alert(`Failed to seed services: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error running seed: Network or Server Error");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white font-poppins">Services Management</h1>
                    <p className="text-gray-400 mt-1">Manage visibility of your services.</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleSeed} variant="secondary" className="gap-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border border-yellow-500/20">
                        Restore Default Services
                    </Button>
                    <Button onClick={() => window.location.href = '/admin/services/new'} className="gap-2 bg-primary text-black hover:bg-primary/90">
                        + Add New Service
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-primary w-8 h-8" />
                </div>
            ) : (
                <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="w-full overflow-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-white/80 font-medium">
                                <tr className="border-b border-white/5">
                                    <th className="p-4">Service Name</th>
                                    <th className="p-4">Slug</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {services.map((service) => (
                                    <tr key={service.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 font-medium text-white">{service.name}</td>
                                        <td className="p-4 text-gray-400 font-mono text-xs">{service.slug}</td>
                                        <td className="p-4 text-center">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${service.status === 'Published'
                                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                    : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                    }`}
                                            >
                                                {service.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => router.push(`/admin/services/${service.slug}`)}
                                                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                                    title="Edit Service"
                                                >
                                                    <Pencil className="w-4 h-4 mr-2" /> Edit
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleStatus(service.id, service.status)}
                                                    className={service.status === 'Published' ? "text-red-400 hover:text-red-300 hover:bg-red-900/20" : "text-green-400 hover:text-green-300 hover:bg-green-900/20"}
                                                >
                                                    {service.status === 'Published' ? (
                                                        <>
                                                            <EyeOff className="w-4 h-4 mr-2" /> Unpublish
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Eye className="w-4 h-4 mr-2" /> Publish
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

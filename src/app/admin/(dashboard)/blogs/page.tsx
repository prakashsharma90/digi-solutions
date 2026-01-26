"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
    Eye, EyeOff, Loader2, Plus, Pencil, Trash2, Search,
    Filter, MoreHorizontal, CheckSquare, BarChart,
    TrendingUp, Calendar, AlertCircle, CheckCircle2, ChevronDown
} from "lucide-react";
import { BlogPost } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Extended type for UI purposes (mocking SEO/Stats for now)
interface ExtendedBlog extends BlogPost {
    seo_score?: number;
    views?: number;
    featured?: boolean;
}

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<ExtendedBlog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    const supabase = createClient();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Failed to fetch blogs", error);
        } else {
            // Mocking some extra data for the demo of "Enterprise Features"
            const enhancedData = (data || []).map((blog: any) => ({
                ...blog,
                seo_score: Math.floor(Math.random() * 40) + 60, // Mock score 60-100
                views: Math.floor(Math.random() * 1000) + 100, // Mock views
                featured: blog.featured || false
            }));
            setBlogs(enhancedData);
        }
        setLoading(false);
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        const publishedAt = newStatus === 'published' ? new Date().toISOString() : null;

        setBlogs(prev => prev.map(b =>
            b.id === id ? { ...b, status: newStatus as any, published_at: publishedAt || undefined } : b
        ));

        await supabase.from('blogs').update({ status: newStatus, published_at: publishedAt }).eq('id', id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;

        setBlogs(prev => prev.filter(b => b.id !== id));
        await supabase.from('blogs').delete().eq('id', id);
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Delete ${selectedIds.size} posts? This cannot be undone.`)) return;

        const ids = Array.from(selectedIds);
        setBlogs(prev => prev.filter(b => !selectedIds.has(b.id)));
        await supabase.from('blogs').delete().in('id', ids);
        setSelectedIds(new Set());
    };

    const handleBulkPublish = async (status: 'published' | 'draft') => {
        const ids = Array.from(selectedIds);
        const publishedAt = status === 'published' ? new Date().toISOString() : null;

        setBlogs(prev => prev.map(b =>
            selectedIds.has(b.id) ? { ...b, status: status, published_at: publishedAt || undefined } : b
        ));

        await supabase.from('blogs').update({ status: status, published_at: publishedAt }).in('id', ids);
        setSelectedIds(new Set());
    };

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectAll = () => {
        if (selectedIds.size === filteredBlogs.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredBlogs.map(b => b.id)));
        }
    };

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.slug.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || blog.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [blogs, searchQuery, statusFilter]);

    // Stats
    const stats = useMemo(() => ({
        total: blogs.length,
        published: blogs.filter(b => b.status === "published").length,
        views: blogs.reduce((acc, b) => acc + (b.views || 0), 0)
    }), [blogs]);

    return (
        <div className="flex flex-col h-full w-full bg-[#0B0F14]">
            <div className="flex flex-col h-full overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-white/5 bg-[#0F141A]/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white font-poppins">Blog Management</h1>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-400" /> {stats.published} Published</span>
                                <span className="flex items-center gap-1"><Pencil size={14} className="text-yellow-400" /> {stats.total - stats.published} Drafts</span>
                                <span className="flex items-center gap-1"><Eye size={14} className="text-blue-400" /> {stats.views.toLocaleString()} Views</span>
                            </div>
                        </div>
                        <Link href="/admin/blogs/new">
                            <Button className="gap-2 bg-primary text-black hover:bg-primary/90 font-medium">
                                <Plus size={18} /> Write New Blog
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="p-4 md:px-8 border-b border-white/5 bg-[#0B0F14]">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Search & Filter */}
                        <div className="flex items-center gap-3 w-full md:flex-1">
                            <div className="relative flex-1 md:max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by title..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#0F141A] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="default" className="gap-2 border-white/10 text-gray-300 hover:text-white hover:border-white/20 min-w-[140px] justify-between">
                                        <div className="flex items-center gap-2">
                                            <Filter size={16} />
                                            <span className="text-sm">
                                                {statusFilter === 'all' ? 'All Status' : statusFilter === 'published' ? 'Published' : 'Drafts'}
                                            </span>
                                        </div>
                                        <ChevronDown size={14} className="opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-40 bg-[#0F141A] border-white/10">
                                    <DropdownMenuItem onClick={() => setStatusFilter('all')} className="cursor-pointer">
                                        All Posts
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter('published')} className="cursor-pointer">
                                        Published
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter('draft')} className="cursor-pointer">
                                        Drafts
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Bulk Actions (Conditional) */}
                        {selectedIds.size > 0 && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                <span className="text-sm text-gray-400 mr-2">{selectedIds.size} selected</span>
                                <Button size="sm" variant="secondary" onClick={() => handleBulkPublish('published')} className="text-xs">
                                    Publish
                                </Button>
                                <Button size="sm" variant="secondary" onClick={() => handleBulkPublish('draft')} className="text-xs">
                                    Unpublish
                                </Button>
                                <Button size="sm" variant="destructive" onClick={handleBulkDelete} className="text-xs">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Custom Scrollbar Styles */}
                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.02);
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 4px;
                        border: 2px solid rgba(0, 0, 0, 0); /* Creates padding effect */
                        background-clip: padding-box;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(255, 255, 255, 0.4);
                        border: 2px solid rgba(0, 0, 0, 0);
                        background-clip: padding-box;
                    }
                `}</style>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 md:px-6 md:py-6 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                                <Loader2 className="animate-spin text-primary w-8 h-8 mb-4" />
                                <p>Loading articles...</p>
                            </div>
                        ) : (
                            <div className="bg-[#0F141A] border border-white/5 rounded-xl overflow-hidden shadow-xl">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/[0.02] text-white/60 font-medium">
                                        <tr className="border-b border-white/5">
                                            <th className="p-4 w-12 text-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-white/20 bg-transparent text-primary focus:ring-primary/20 cursor-pointer"
                                                    onChange={selectAll}
                                                    checked={filteredBlogs.length > 0 && selectedIds.size === filteredBlogs.length}
                                                />
                                            </th>
                                            <th className="p-4 min-w-[300px]">Article</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">SEO Score</th>
                                            <th className="p-4 text-right">Views</th>
                                            <th className="p-4 text-right">Last Updated</th>
                                            <th className="p-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                                            <tr key={blog.id} className={`group transition-colors ${selectedIds.has(blog.id) ? "bg-primary/5" : "hover:bg-white/[0.02]"}`}>
                                                <td className="p-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-white/20 bg-transparent text-primary focus:ring-primary/20 cursor-pointer"
                                                        checked={selectedIds.has(blog.id)}
                                                        onChange={() => toggleSelection(blog.id)}
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <Link href={`/admin/blogs/${blog.id}`} className="font-medium text-white hover:text-primary transition-colors line-clamp-1 text-base mb-1">
                                                            {blog.title}
                                                        </Link>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <span className="bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/5 capitalize">{blog.type}</span>
                                                            {blog.featured && <span className="text-yellow-500 flex items-center gap-1"><TrendingUp size={10} /> Featured</span>}
                                                            <span>• {blog.slug}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <Badge variant="outline" className={`${blog.status === 'published' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                        }`}>
                                                        {blog.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${(blog.seo_score || 0) > 80 ? "bg-green-500" : (blog.seo_score || 0) > 50 ? "bg-yellow-500" : "bg-red-500"
                                                                    }`}
                                                                style={{ width: `${blog.seo_score || 0}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-gray-400">{blog.seo_score}/100</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right font-mono text-gray-400">
                                                    {(blog.views || 0).toLocaleString()}
                                                </td>
                                                <td className="p-4 text-right text-gray-500 text-xs">
                                                    {new Date(blog.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-white">
                                                                <MoreHorizontal size={16} />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-[#0B0F14] border-white/10">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => toggleStatus(blog.id, blog.status)}>
                                                                {blog.status === 'published' ? <><EyeOff size={14} className="mr-2" /> Unpublish</> : <><Eye size={14} className="mr-2" /> Publish</>}
                                                            </DropdownMenuItem>
                                                            <Link href={`/admin/blogs/${blog.id}`}>
                                                                <DropdownMenuItem>
                                                                    <Pencil size={14} className="mr-2" /> Edit Article
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <DropdownMenuSeparator className="bg-white/10" />
                                                            <DropdownMenuItem className="text-red-400 focus:text-red-400" onClick={() => handleDelete(blog.id)}>
                                                                <Trash2 size={14} className="mr-2" /> Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={7} className="p-16 text-center text-gray-500">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="p-4 rounded-full bg-white/5">
                                                            <Search size={24} />
                                                        </div>
                                                        <p className="text-lg font-medium text-white">No articles found</p>
                                                        <p className="text-sm">Try adjusting your search or filters.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

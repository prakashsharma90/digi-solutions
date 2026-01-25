"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar"; // Verify if this component exists and where
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, Plus, Pencil, Trash2, Search } from "lucide-react";
import { BlogPost } from "@/types";

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
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
            // If table doesn't exist yet, we might get an error.
            if (error.code === '42P01') {
                alert("Table 'blogs' does not exist. Please run the migration script.");
            }
        } else {
            setBlogs(data || []);
        }
        setLoading(false);
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        const publishedAt = newStatus === 'published' ? new Date().toISOString() : null;

        // Optimistic Update
        setBlogs(prev => prev.map(b =>
            b.id === id ? { ...b, status: newStatus as any, published_at: publishedAt || undefined } : b
        ));

        const { error } = await supabase
            .from('blogs')
            .update({
                status: newStatus,
                published_at: publishedAt
            })
            .eq('id', id);

        if (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
            fetchBlogs(); // Revert
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;

        // Optimistic Update
        setBlogs(prev => prev.filter(b => b.id !== id));

        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Failed to delete blog", error);
            alert("Failed to delete blog");
            fetchBlogs(); // Revert
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#0B0F14]">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white font-poppins">Blog Management</h1>
                            <p className="text-gray-400 mt-1">Create, edit, and manage your content.</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/admin/blogs/new">
                                <Button className="gap-2 bg-primary text-black hover:bg-primary/90">
                                    <Plus size={18} /> Write New Blog
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="mb-6 flex gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search blogs by title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0F141A] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary/50"
                            />
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
                                            <th className="p-4">Title</th>
                                            <th className="p-4">Type</th>
                                            <th className="p-4 text-center">Status</th>
                                            <th className="p-4 text-center">Date</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                                            <tr key={blog.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="p-4 font-medium text-white max-w-xs truncate" title={blog.title}>
                                                    {blog.title}
                                                </td>
                                                <td className="p-4 text-gray-400 capitalize">{blog.type}</td>
                                                <td className="p-4 text-center">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${blog.status === 'published'
                                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                            : blog.status === 'draft'
                                                                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                                : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                                                            }`}
                                                    >
                                                        {blog.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-center text-gray-500">
                                                    {new Date(blog.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => toggleStatus(blog.id, blog.status)}
                                                            title={blog.status === 'published' ? "Unpublish" : "Publish"}
                                                            className={blog.status === 'published' ? "text-orange-400 hover:bg-orange-900/20" : "text-green-400 hover:bg-green-900/20"}
                                                        >
                                                            {blog.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </Button>

                                                        <Link href={`/admin/blogs/${blog.id}`}>
                                                            <Button variant="ghost" size="icon" className="text-blue-400 hover:bg-blue-900/20" title="Edit">
                                                                <Pencil size={18} />
                                                            </Button>
                                                        </Link>

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDelete(blog.id)}
                                                            className="text-red-400 hover:bg-red-900/20"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={18} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                                    No blogs found. Create one to get started!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

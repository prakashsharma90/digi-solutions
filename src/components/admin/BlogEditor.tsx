"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/types";

interface BlogEditorProps {
    initialData?: BlogPost;
    isEditing?: boolean;
}

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        type: "blog",
        category: "Strategy",
        image: "",
        status: "draft",
        meta_title: "",
        meta_description: "",
        author_name: "Digihub Team",
        author_role: "Editor",
        published_at: null as string | null,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                slug: initialData.slug || "",
                excerpt: initialData.excerpt || "",
                content: initialData.content || "",
                type: initialData.type || "blog",
                category: initialData.category || "Strategy",
                image: initialData.image || "",
                status: initialData.status || "draft",
                meta_title: initialData.meta_title || "",
                meta_description: initialData.meta_desc || "",
                author_name: initialData.author?.name || "Digihub Team",
                author_role: initialData.author?.role || "Editor",
                published_at: initialData.published_at || null,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Auto-generate slug from title if not editing manually and valid title
            if (name === "title" && !isEditing && !prev.slug) {
                newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            }
            return newData;
        });
    };

    const generateSlug = () => {
        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            type: formData.type,
            category: formData.category,
            image: formData.image,
            status: formData.status,
            meta_title: formData.meta_title || formData.title,
            meta_description: formData.meta_description || formData.excerpt,
            // Store author as JSON or flat? DB has flattened fields in my SQL schema, wait...
            // Let's check SQL schema I wrote. 
            // author_name, author_role, author_avatar.
            author_name: formData.author_name,
            author_role: formData.author_role,
            published_at: formData.status === 'published' && !formData.published_at ? new Date().toISOString() : formData.published_at
        };

        if (isEditing && initialData) {
            const { error } = await supabase
                .from('blogs')
                .update({ ...payload, updated_at: new Date().toISOString() })
                .eq('id', initialData.id);

            if (error) {
                alert(`Error updating blog: ${error.message}`);
            } else {
                router.push('/admin/blogs');
            }
        } else {
            const { error } = await supabase
                .from('blogs')
                .insert(payload);

            if (error) {
                alert(`Error creating blog: ${error.message}`);
            } else {
                router.push('/admin/blogs');
            }
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs">
                        <Button variant="ghost" size="icon" type="button" className="text-gray-400 hover:text-white">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{isEditing ? "Edit Blog Post" : "Write New Blog"}</h1>
                        <p className="text-gray-400 text-sm">Fill in the details below.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        className="text-gray-400"
                        onClick={() => router.push('/admin/blogs')}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-primary text-black hover:bg-primary/90 min-w-[120px]"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                        {isEditing ? "Update" : "Save Blog"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="bg-[#0F141A] border border-white/5 p-6 rounded-2xl space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Blog Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter a catchy title..."
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white text-lg focus:border-primary/50 focus:outline-none"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Slug (URL)</label>
                            <div className="flex gap-2">
                                <span className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-500 font-mono text-sm flex items-center">
                                    /blog/
                                </span>
                                <input
                                    type="text"
                                    name="slug"
                                    required
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="flex-1 bg-[#0B0F14] border border-white/10 rounded-lg p-2 text-gray-300 font-mono text-sm focus:border-primary/50 focus:outline-none"
                                />
                                <Button type="button" onClick={generateSlug} variant="outline" size="sm" className="h-[42px]">
                                    Generate
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="bg-[#0F141A] border border-white/5 p-6 rounded-2xl space-y-4 min-h-[500px] flex flex-col">
                        <label className="block text-sm font-medium text-gray-400">Content (Markdown)</label>
                        <textarea
                            name="content"
                            required
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="# Write your masterpiece here...\n\nUse markdown for formatting."
                            className="flex-1 w-full bg-[#0B0F14] border border-white/10 rounded-lg p-4 text-white font-mono text-sm focus:border-primary/50 focus:outline-none leading-relaxed resize-none min-h-[400px]"
                        />
                        <p className="text-xs text-gray-500">
                            Supports Markdown: **bold**, # Heading 1, ## Heading 2, - List items, &gt; Quotes
                        </p>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-[#0F141A] border border-white/5 p-6 rounded-2xl">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Short Excerpt (SEO Description)</label>
                        <textarea
                            name="excerpt"
                            rows={3}
                            value={formData.excerpt}
                            onChange={handleChange}
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-gray-300 text-sm focus:border-primary/50 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="space-y-6">
                    {/* Publishing */}
                    <div className="bg-[#0F141A] border border-white/5 p-6 rounded-2xl space-y-4">
                        <h3 className="font-semibold text-white">Publishing</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 focus:outline-none"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Content Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 focus:outline-none"
                            >
                                <option value="blog">Blog Post</option>
                                <option value="news">News / Press</option>
                                <option value="research">Research / Case Study</option>
                            </select>
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="bg-[#0F141A] border border-white/5 p-6 rounded-2xl space-y-4">
                        <h3 className="font-semibold text-white">Organization</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                list="categories-list"
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 focus:outline-none"
                            />
                            <datalist id="categories-list">
                                <option value="Strategy" />
                                <option value="SEO" />
                                <option value="Social Media" />
                                <option value="Automation" />
                                <option value="Web Development" />
                            </datalist>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Featured Image URL</label>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-xs text-gray-300 focus:border-primary/50 focus:outline-none"
                                />
                                {formData.image && (
                                    <div className="rounded-lg overflow-hidden border border-white/10 aspect-video relative group">
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-xs text-white">Preview</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Author */}
                    <div className="bg-[#0F141A] border border-white/5 p-6 rounded-2xl space-y-4">
                        <h3 className="font-semibold text-white">Author</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                name="author_name"
                                value={formData.author_name}
                                onChange={handleChange}
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                            <input
                                type="text"
                                name="author_role"
                                value={formData.author_role}
                                onChange={handleChange}
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

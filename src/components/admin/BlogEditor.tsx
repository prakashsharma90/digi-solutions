"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Upload } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/types";
import TiptapEditor from "./TiptapEditor";

interface BlogEditorProps {
    initialData?: BlogPost;
    isEditing?: boolean;
}

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

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
        meta_desc: "",
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
                meta_desc: initialData.meta_desc || "",
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setFormData(prev => ({ ...prev, image: data.url }));
            } else {
                alert(`Upload failed: ${data.error}`);
            }
        } catch (error) {
            alert('Failed to upload image');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
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
            meta_desc: formData.meta_desc || formData.excerpt,
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
                // Revalidate the blog page cache
                await fetch(`/api/revalidate?path=/blog/${formData.slug}`, { method: 'POST' });
                router.push('/admin/blogs');
                router.refresh();
            }
        } else {
            const { error } = await supabase
                .from('blogs')
                .insert(payload);

            if (error) {
                alert(`Error creating blog: ${error.message}`);
            } else {
                router.push('/admin/blogs');
                router.refresh();
            }
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="min-h-screen bg-[#0B0F14]">
            {/* Top Action Bar (Sticky) - Reduced Visual Weight */}
            <div className="sticky top-0 z-30 bg-[#0B0F14]/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/blogs">
                            <Button variant="ghost" size="icon" type="button" className="text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                                <ArrowLeft size={18} />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
                            <span className={`w-1.5 h-1.5 rounded-full ${formData.status === 'published' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                            <span className="text-xs font-medium text-gray-400 capitalize">{formData.status}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white hover:bg-white/5 text-sm"
                            onClick={() => router.push('/admin/blogs')}
                        >
                            Discard
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            className="bg-primary text-black hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
                            {isEditing ? "Update" : "Publish"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content - Centered with Auto Margins */}
            <div className="w-full py-8 flex justify-center">
                <div className="w-full px-6 space-y-6" style={{ maxWidth: '900px' }}>

                    {/* Metadata Box - Enhanced Visual Focus */}
                    <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-6 shadow-xl shadow-black/20">
                        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                            <div className="w-1 h-8 bg-primary rounded-full"></div>
                            <h2 className="text-xl font-bold text-white">Post Metadata</h2>
                        </div>

                        {/* Title */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wider block">
                                Post Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter your blog post title..."
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-xl p-4 text-xl font-semibold text-white placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-white/20 transition-all"
                            />
                        </div>

                        {/* URL Slug */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wider block">
                                URL Slug *
                            </label>
                            <div className="flex items-center gap-2 bg-[#0B0F14] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
                                <span className="text-sm font-mono text-gray-500 whitespace-nowrap">
                                    digihub.agency/blog/
                                </span>
                                <input
                                    type="text"
                                    name="slug"
                                    required
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="url-slug-here"
                                    className="flex-1 bg-transparent border-none text-base font-mono text-gray-200 placeholder:text-gray-600 focus:outline-none p-0"
                                />
                            </div>
                        </div>

                        {/* Meta Description */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wider block">
                                Meta Description (SEO)
                            </label>
                            <textarea
                                name="meta_desc"
                                rows={3}
                                value={formData.meta_desc}
                                onChange={handleChange}
                                placeholder="Enter a compelling meta description for search engines (150-160 characters recommended)..."
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-xl p-4 text-base text-gray-200 placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-white/20 transition-all resize-none"
                            />
                            <p className="text-xs text-gray-500 flex items-center gap-2">
                                <span className={formData.meta_desc.length > 160 ? 'text-yellow-400' : 'text-gray-500'}>
                                    {formData.meta_desc.length} / 160 characters
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Excerpt - Enhanced */}
                    <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-4 shadow-xl shadow-black/20">
                        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                            <div className="w-1 h-8 bg-primary rounded-full"></div>
                            <h2 className="text-xl font-bold text-white">Excerpt / Summary</h2>
                        </div>
                        <textarea
                            name="excerpt"
                            rows={3}
                            value={formData.excerpt}
                            onChange={handleChange}
                            placeholder="Add a compelling excerpt that summarizes your post (used for previews and cards)..."
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-xl p-4 text-base text-gray-200 placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-white/20 transition-all resize-none"
                        />
                    </div>

                    {/* Rich Editor - Enhanced */}
                    <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-4 shadow-xl shadow-black/20">
                        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                            <div className="w-1 h-8 bg-primary rounded-full"></div>
                            <h2 className="text-xl font-bold text-white">Content Editor</h2>
                        </div>
                        <TiptapEditor
                            content={formData.content}
                            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                        />
                    </div>

                    {/* Settings Row - Compact */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Status */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1 h-3 bg-primary rounded-full"></span>
                                Visibility
                            </h3>
                            <div className="grid grid-cols-2 bg-[#0B0F14] p-1 rounded-lg border border-white/10">
                                {['draft', 'published'].map((s) => (
                                    <button
                                        type="button"
                                        key={s}
                                        onClick={() => setFormData(p => ({ ...p, status: s }))}
                                        className={`text-xs py-2 rounded-md capitalize transition-all font-medium ${formData.status === s ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1 h-3 bg-primary rounded-full"></span>
                                Category
                            </h3>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-2.5 text-sm text-gray-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer hover:border-white/20 transition-all"
                            >
                                <option value="Strategy">Strategy</option>
                                <option value="SEO">SEO</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Automation">Automation</option>
                                <option value="Web Development">Web Development</option>
                            </select>
                        </div>

                        {/* Author */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1 h-3 bg-primary rounded-full"></span>
                                Author
                            </h3>
                            <input
                                type="text"
                                name="author_name"
                                value={formData.author_name}
                                onChange={handleChange}
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-lg p-2.5 text-sm text-gray-200 placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-white/20 transition-all"
                                placeholder="Author name"
                            />
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-4 shadow-xl shadow-black/20">
                        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                            <div className="w-1 h-8 bg-primary rounded-full"></div>
                            <h2 className="text-xl font-bold text-white">Featured Image</h2>
                        </div>
                        <div className="space-y-4">
                            {/* Upload Button */}
                            <div className="flex gap-3">
                                <label className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                    <div className="w-full bg-primary/10 border border-primary/30 rounded-xl p-4 text-center cursor-pointer hover:bg-primary/20 hover:border-primary/50 transition-all group">
                                        <div className="flex items-center justify-center gap-2 text-primary">
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={20} />
                                                    <span className="font-medium">Uploading...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={20} />
                                                    <span className="font-medium">Upload Image</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* OR Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#0B0F14] px-2 text-gray-500">Or use URL</span>
                                </div>
                            </div>

                            {/* URL Input */}
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Paste image URL here..."
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-xl p-4 text-base text-gray-200 placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-white/20 transition-all"
                            />

                            {/* Image Preview */}
                            <div className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-[#0B0F14] flex items-center justify-center relative group hover:border-white/20 transition-all">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                ) : (
                                    <div className="flex flex-col items-center gap-3 text-gray-600">
                                        <ImageIcon size={48} />
                                        <span className="text-sm">No image selected</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Spacing */}
                    <div className="h-16"></div>
                </div>
            </div>
        </form>
    );
}

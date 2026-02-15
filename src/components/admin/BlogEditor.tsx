"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
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
        <form onSubmit={handleSubmit} className="pb-20">
            {/* Top Action Bar (Sticky) */}
            <div className="sticky top-0 z-30 bg-[#0B0F14]/80 backdrop-blur-md border-b border-white/5 py-4 mb-8">
                <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/blogs">
                            <Button variant="ghost" size="icon" type="button" className="text-gray-400 hover:text-white hover:bg-white/5">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${formData.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                            <span className="text-sm font-medium text-gray-400 capitalize">{formData.status}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            className="text-gray-400"
                            onClick={() => router.push('/admin/blogs')}
                        >
                            Discard
                        </Button>
                        <Button
                            type="submit"
                            className="bg-primary text-black hover:bg-primary/90 min-w-[140px] font-semibold"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                            {isEditing ? "Update Post" : "Publish Post"}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row justify-center items-start gap-12 px-6 max-w-[1600px] mx-auto">
                {/* Main Content (Writer Focus) */}
                <div className="w-full max-w-[1000px] space-y-12 pb-32">
                    {/* Hero Title Input */}
                    <div className="space-y-6">
                        <textarea
                            name="title"
                            required
                            rows={1}
                            value={formData.title}
                            onChange={(e) => {
                                handleChange(e as any);
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            placeholder="Post Title Here..."
                            className="w-full bg-transparent border-none p-0 text-6xl md:text-7xl font-black text-white placeholder:text-gray-800 focus:ring-0 focus:outline-none leading-[1.1] tracking-tight resize-none overflow-hidden"
                            style={{ height: 'auto' }}
                        />

                        {/* Slug Editor */}
                        <div className="flex items-center gap-2 text-gray-600 group">
                            <span className="text-sm font-mono opacity-40">https://digihub.agency/blog/</span>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="bg-transparent border-b border-white/5 group-hover:border-white/20 focus:border-primary text-sm font-mono text-gray-500 focus:text-primary focus:outline-none transition-all min-w-[300px]"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="relative group">
                        <div className="absolute left-[-2rem] top-0 bottom-0 w-1 bg-white/5 group-focus-within:bg-primary/50 transition-colors"></div>
                        <textarea
                            name="excerpt"
                            rows={2}
                            value={formData.excerpt}
                            onChange={handleChange}
                            placeholder="Add a short excerpt or summary (SEO description)..."
                            className="w-full bg-transparent border-none py-1 text-2xl text-gray-500 focus:ring-0 focus:outline-none resize-none leading-relaxed font-light italic"
                        />
                    </div>

                    {/* Rich Editor */}
                    <div className="pt-8 border-t border-white/5">
                        <TiptapEditor
                            content={formData.content}
                            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                        />
                    </div>
                </div>

                {/* Sidebar (Settings Area) */}
                <div className="w-full xl:w-80 shrink-0 xl:sticky xl:top-32 space-y-8">
                    {/* Organization Card */}
                    <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl shadow-black/50">
                        <h3 className="font-bold text-white text-xs uppercase tracking-[0.2em] text-gray-500">Settings</h3>

                        {/* Status */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Visibility</label>
                            <div className="grid grid-cols-2 bg-[#0B0F14] p-1 rounded-xl border border-white/5">
                                {['draft', 'published'].map((s) => (
                                    <button
                                        type="button"
                                        key={s}
                                        onClick={() => setFormData(p => ({ ...p, status: s }))}
                                        className={`text-xs py-2 rounded-lg capitalize transition-all ${formData.status === s ? 'bg-white/10 text-white font-semibold shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-primary/50 focus:outline-none appearance-none"
                            >
                                <option value="Strategy">Strategy</option>
                                <option value="SEO">SEO</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Automation">Automation</option>
                                <option value="Web Development">Web Development</option>
                            </select>
                        </div>

                        {/* Author */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Author</label>
                            <input
                                type="text"
                                name="author_name"
                                value={formData.author_name}
                                onChange={handleChange}
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-primary/50 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6 space-y-4 shadow-2xl shadow-black/50">
                        <h3 className="font-bold text-white text-xs uppercase tracking-[0.2em] text-gray-500">Media</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Image URL..."
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-xl p-3 text-[10px] text-gray-400 focus:border-primary/50 focus:outline-none"
                            />
                            <div className="rounded-xl overflow-hidden border border-white/5 aspect-video bg-[#0B0F14] flex items-center justify-center relative group">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                ) : (
                                    <ImageIcon className="text-gray-800" size={32} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

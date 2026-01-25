"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/blog";
import { Calendar, Clock, ArrowRight, Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { BlogPost } from "@/types";

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchBlogs = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false });

            if (error) {
                console.error("Error fetching blogs:", error);
            } else {
                const formattedPosts = (data || []).map((post: any) => ({
                    ...post,
                    author: {
                        name: post.author_name,
                        role: post.author_role,
                        avatar: post.author_avatar
                    },
                    readTime: post.read_time,
                    publishedAt: post.published_at,
                    image: post.image || null
                }));
                setPosts(formattedPosts);
            }
            setLoading(false);
        };

        fetchBlogs();
    }, []);

    const filteredPosts = posts.filter((post) => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = (post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0]; // Fallback to first if no featured
    const regularPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);

    return (
        <main className="min-h-screen bg-[#0B0F14] text-white pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Hero Section */}
            <Section className="relative pt-24 md:pt-10 pb-0">
                <Container className="text-center max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Knowledge Hub
                        </span>
                        <h1 className="text-6xl md:text-6xl font-bold mb-4 tracking-tight">
                            Insights for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Digital Age</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Deep dives into SEO, AI automation, and growth strategies to keep you ahead of the curve.
                        </p>
                    </motion.div>
                </Container>
            </Section>

            {/* Content Area */}
            <Section className="relative z-10 pt-0 pb-10 md:pt-0">
                <Container>
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0F141A] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? "bg-white text-black scale-105 shadow-lg shadow-white/10"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-20 text-center">
                            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-gray-400">Curating insights...</p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Post (Hero Style) */}
                            {featuredPost && (
                                <Link href={`/blog/${featuredPost.slug}`} className="block mb-16 group">
                                    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0F141A] grid md:grid-cols-2 gap-0 hover:border-primary/30 transition-all duration-500">
                                        {/* Image Side */}
                                        <div className="relative h-64 md:h-full min-h-[400px] overflow-hidden">
                                            {featuredPost.image ? (
                                                <img
                                                    src={featuredPost.image}
                                                    alt={featuredPost.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                                    <span className="text-gray-700 text-6xl font-bold opacity-20">DIGIHUB</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F141A] via-transparent to-transparent md:bg-gradient-to-r" />
                                        </div>

                                        {/* Content Side */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 bg-primary text-black text-xs font-bold rounded-full uppercase tracking-wider">
                                                    Featured
                                                </span>
                                                <span className="text-sm text-gray-400 flex items-center gap-1">
                                                    <Clock size={14} /> {featuredPost.readTime} read
                                                </span>
                                            </div>

                                            <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight">
                                                {featuredPost.title}
                                            </h2>

                                            <p className="text-gray-400 text-lg mb-8 line-clamp-3">
                                                {featuredPost.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold border border-white/10">
                                                        {featuredPost.author.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-white">{featuredPost.author.name}</div>
                                                        <div className="text-xs text-gray-500">{featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString() : ''}</div>
                                                    </div>
                                                </div>
                                                <span className="flex items-center gap-2 text-primary text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                    Read Article <ArrowRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Standard Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {regularPosts.map((post, index) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link href={`/blog/${post.slug}`} className="group h-full flex flex-col">
                                            <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(0,217,195,0.3)] transition-all duration-300 h-full flex flex-col">
                                                {/* Card Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    {post.image ? (
                                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-800 group-hover:to-primary/20 transition-all" />
                                                    )}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs rounded-full">
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Card Content */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                                        <Calendar size={12} />
                                                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}
                                                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                        <Clock size={12} /> {post.readTime}
                                                    </div>

                                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>

                                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 md:line-clamp-3 flex-1">
                                                        {post.excerpt}
                                                    </p>

                                                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                                        <span className="text-xs font-medium text-gray-300">
                                                            By {post.author.name}
                                                        </span>
                                                        <ArrowRight size={16} className="text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </Container>
            </Section>

            {/* Newsletter CTA */}
            <Section className="py-20 border-t border-white/5 bg-[#0F141A]/50">
                <Container className="max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay ahead of the competition</h2>
                    <p className="text-gray-400 mb-8">Get the latest marketing insights and strategies delivered straight to your inbox.</p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative group">
                        <div className="relative flex-1">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[#0B0F14] border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                        <Button className="rounded-full px-8 shadow-[0_0_20px_-5px_var(--color-primary)]">
                            Subscribe
                        </Button>
                    </form>
                </Container>
            </Section>
        </main>
    );
}

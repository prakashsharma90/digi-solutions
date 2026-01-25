"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/blog";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { BlogPost } from "@/types";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogCard, BlogCardSkeleton } from "@/components/blog/BlogCard";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(9); // Initial number of posts to show
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
                        name: post.author_name || "Digihub Team",
                        role: post.author_role || "Editor",
                        avatar: post.author_avatar
                    },
                    readTime: post.read_time,
                    publishedAt: post.published_at,
                    image: post.image || null,
                    // If category is missing in DB, try to infer or default
                    category: post.category || "General"
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

    const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
    const regularPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);
    const visiblePosts = regularPosts.slice(0, visibleCount);

    // Check if we need to insert the newsletter CTA
    // We want to insert it after the 6th item (or close to middle if fewer)
    const renderPosts = () => {
        const items = [];
        let newsletterInserted = false;

        for (let i = 0; i < visiblePosts.length; i++) {
            items.push(
                <div key={visiblePosts[i].slug} className="h-full">
                    <BlogCard post={visiblePosts[i] as any} />
                </div>
            );

            // Insert Newsletter CTA after 6 items
            if (i === 5 && !newsletterInserted) {
                items.push(<NewsletterCTA key="newsletter-cta" />);
                newsletterInserted = true;
            }
        }

        // If we have fewer than 6 items but more than 2, maybe put it at the end? 
        // Or just stick to the rule: "Mid-grid". If grid is small, maybe don't show or show at bottom.
        // Let's just stick to the loop insertion for now.

        return items;
    };


    return (
        <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
            <Container className="max-w-[1280px]">
                {/* 1. FEATURED HERO POST */}
                {loading ? (
                    <div className="w-full h-[400px] md:h-[500px] bg-white/5 animate-pulse rounded-[2rem] mb-20" />
                ) : featuredPost ? (
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden mb-16 group border border-white/5">
                        {/* Background Image */}
                        {featuredPost.image ? (
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-black" />
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col items-start justify-end h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-full uppercase tracking-wider">
                                    {featuredPost.category || "Featured"}
                                </span>
                                {featuredPost.readTime && (
                                    <span className="text-xs font-medium text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        {featuredPost.readTime}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl leading-tight">
                                {featuredPost.title}
                            </h1>
                            <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed line-clamp-2 md:line-clamp-3">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex items-center justify-between w-full max-w-2xl">
                                <Link href={`/blog/${featuredPost.slug}`} className="flex items-center gap-2 text-white font-semibold bg-primary/90 hover:bg-primary px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-primary/25">
                                    Read Article <ArrowUpRight className="w-4 h-4" />
                                </Link>

                                {/* Author Info in Hero */}
                                <div className="hidden md:flex items-center gap-3">
                                    {featuredPost.author?.avatar && (
                                        <img src={featuredPost.author.avatar} alt="Author" className="w-10 h-10 rounded-full border border-white/20" />
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">{featuredPost.author?.name}</span>
                                        <span className="text-xs text-gray-400">{featuredPost.author?.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* 2. FILTERS & SEARCH */}
                <BlogFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {/* 3. POSTS GRID */}
                <div className="mb-24">
                    {/* Section Header */}
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Latest from the blog</h2>
                            <p className="text-gray-400">Insights, strategies, and updates from the Digihub team.</p>
                        </div>
                        <div className="hidden md:block text-sm text-gray-500">
                            Showing {visiblePosts.length} of {regularPosts.length} articles
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                            {[1, 2, 3, 4, 5, 6].map(i => <BlogCardSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                            {visiblePosts.length > 0 ? (
                                renderPosts()
                            ) : (
                                <div className="col-span-3 py-20 text-center">
                                    <p className="text-2xl font-bold text-gray-500 mb-2">No articles found</p>
                                    <p className="text-gray-600">Try adjusting your search or category filter.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Load More Button */}
                    {regularPosts.length > visibleCount && (
                        <div className="mt-16 flex justify-center pt-8">
                            <Button
                                variant="outline"
                                onClick={() => setVisibleCount(prev => prev + 6)}
                                className="rounded-full px-8 py-6 h-auto text-base border-white/10 hover:bg-white/5 gap-2 group min-w-[200px]"
                            >
                                Load more articles <Loader2 className="w-4 h-4 group-hover:animate-spin" />
                            </Button>
                        </div>
                    )}
                </div>

                {/* 4. FOOTER CTA */}
                <div className="bg-gradient-to-b from-[#0F141A] to-black rounded-[2.5rem] p-12 md:p-24 text-center border border-white/5 relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <span className="text-primary font-semibold mb-4 block">Ready to grow?</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Transform your digital presence today</h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Get a free comprehensive growth audit and see exactly how we can help you scale your revenue.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto rounded-full h-14 px-10 text-base bg-white text-black hover:bg-gray-200 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">
                                    Get your free audit
                                </Button>
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto rounded-full h-14 px-10 text-base border-white/10 hover:bg-white/5">
                                    Talk to an expert
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-60" />
                </div>
            </Container>
        </main>
    );
}

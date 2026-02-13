"use client";

import { Container, Section } from "@/components/ui/container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    published_at: string;
    author_name: string;
    author_role: string;
}

export function Insights() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("blogs")
                .select(
                    "slug, title, excerpt, image, category, published_at, author_name, author_role"
                )
                .eq("status", "published")
                .order("published_at", { ascending: false })
                .limit(4);

            if (error) {
                console.error("Error fetching blogs:", error);
            } else {
                setPosts(data || []);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    // First post is featured, next 3 are secondary cards
    const featured = posts[0];
    const secondary = posts.slice(1, 4);

    // Loading skeleton
    if (loading) {
        return (
            <Section className="bg-gradient-to-b from-[#0B0F14] to-background relative overflow-hidden py-16 md:py-20">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="h-10 w-3/4 mx-auto bg-white/5 rounded-lg animate-pulse mb-4" />
                        <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                    </div>
                    <div className="h-72 bg-white/5 rounded-2xl animate-pulse mb-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[1, 2, 3].map((i) => (
                            <div key={i}>
                                <div className="aspect-[4/3] bg-white/5 rounded-xl animate-pulse mb-4" />
                                <div className="h-5 bg-white/5 rounded animate-pulse mx-4" />
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        );
    }

    if (!featured) return null;

    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background relative overflow-hidden py-16 md:py-20">
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
                        Explore Our Latest Insights &{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Marketing Tips
                        </span>
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Dive into expert tips, case studies, and actionable
                        strategies to grow your digital presence. We share
                        content designed to help your business thrive online.
                    </p>
                </motion.div>

                {/* Featured Post */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <Link
                        href={`/blog/${featured.slug}`}
                        className="group block"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/[0.04] rounded-2xl border border-white/[0.08] overflow-hidden hover:border-primary/20 transition-all duration-300">
                            {/* Image */}
                            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden">
                                {featured.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={featured.image}
                                        alt={featured.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                                        <span className="text-4xl">📝</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-10 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-white mb-4 font-poppins leading-snug group-hover:text-primary transition-colors">
                                    {featured.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                                    {featured.excerpt}
                                </p>

                                {/* Author + Category */}
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/20 flex items-center justify-center">
                                            <span className="text-xs font-bold text-primary">
                                                {(featured.author_name || "DT")
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">
                                                {featured.author_name ||
                                                    "Digihub Team"}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {featured.author_role ||
                                                    "Editor"}
                                            </div>
                                        </div>
                                    </div>

                                    <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                                        {featured.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Secondary Posts - 3 Cards */}
                {secondary.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {secondary.map((post, index) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.2 + index * 0.1,
                                }}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group block"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-white/[0.06]">
                                        {post.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-white/[0.05] to-white/[0.02] flex items-center justify-center">
                                                <span className="text-3xl">
                                                    📝
                                                </span>
                                            </div>
                                        )}
                                        {/* Category badge on image */}
                                        <div className="absolute bottom-3 left-3">
                                            <span className="text-[10px] font-semibold text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base font-bold text-white text-center leading-snug group-hover:text-primary transition-colors px-2">
                                        {post.title}
                                    </h3>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Read More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="flex justify-center mt-10"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-primary hover:bg-primary/90 px-6 py-2.5 rounded-full transition-all group"
                    >
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </Container>
        </Section>
    );
}

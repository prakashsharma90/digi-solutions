"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/types";

interface BlogCardProps {
    post: BlogPost & {
        author: {
            name: string;
            role: string;
            avatar?: string;
        };
        readTime?: string;
        publishedAt?: string;
        image: string | null;
    };
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <div className="flex flex-col h-full bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors duration-300">
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-900">
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        // Fallback pattern
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                            <div className="text-gray-600 font-medium flex items-center gap-2 z-10">
                                <span className="text-3xl text-gray-700 font-bold opacity-30 tracking-tighter">Digihub</span>
                            </div>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                        <ArrowUpRight className="text-white w-5 h-5" />
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm">
                            {post.category || "General"}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                        {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="border-t border-white/5 pt-4 mt-auto">
                        <div className="flex items-center gap-3">
                            {post.author.avatar ? (
                                <img src={post.author.avatar} alt={post.author.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10" />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-1 ring-white/10">
                                    <span className="text-xs font-bold text-primary">{post.author.name?.charAt(0) || "D"}</span>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">{post.author.name}</span>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}</span>
                                    {post.readTime && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-gray-600" />
                                            <span>{post.readTime}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function BlogCardSkeleton() {
    return (
        <div className="h-full bg-white/5 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="h-56 bg-white/5 animate-pulse w-full" />
            <div className="p-6 flex flex-col flex-1">
                <div className="h-6 bg-white/5 animate-pulse rounded w-3/4 mb-4" />
                <div className="h-4 bg-white/5 animate-pulse rounded w-full mb-2" />
                <div className="h-4 bg-white/5 animate-pulse rounded w-2/3 mb-6" />
                <div className="border-t border-white/5 pt-4 mt-auto flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse" />
                    <div className="flex flex-col gap-1">
                        <div className="h-3 w-24 bg-white/5 animate-pulse rounded" />
                        <div className="h-3 w-16 bg-white/5 animate-pulse rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}

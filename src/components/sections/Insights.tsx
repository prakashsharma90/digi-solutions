"use client";

import { Container, Section } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function Insights() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Get the latest 6 posts
    const latestPosts = [...blogPosts]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 6);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto-play logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex, isPaused, itemsPerPage]);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev < latestPosts.length - itemsPerPage ? prev + 1 : 0
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev > 0 ? prev - 1 : latestPosts.length - itemsPerPage
        );
    };

    return (
        <Section className="overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest Insights</h2>
                        <p className="text-text-muted text-lg">Stay ahead of the curve with our research.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/blog">
                            <Button variant="outline" className="hidden md:flex gap-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all">
                                Explore All <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div
                    className="relative overflow-hidden"
                    ref={containerRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        className="flex gap-6"
                        initial={false}
                        animate={{ x: `calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * (24 / itemsPerPage)}px)` }}
                        transition={{ type: "spring", damping: 25, stiffness: 120 }}
                    >
                        {latestPosts.map((post) => (
                            <div
                                key={post.slug}
                                className="flex-shrink-0"
                                style={{ width: `calc(${(100 / itemsPerPage)}% - ${(24 * (itemsPerPage - 1)) / itemsPerPage}px)` }}
                            >
                                <Link href={`/blog/${post.slug}`} className="group block h-full">
                                    <Card className="h-full border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                                        <CardHeader>
                                            <div className="flex justify-between items-center mb-3 text-xs text-primary font-medium tracking-wider uppercase">
                                                <span>{post.category}</span>
                                                <span className="text-text-muted normal-case">{post.readTime}</span>
                                            </div>
                                            <CardTitle className="leading-tight group-hover:text-primary transition-colors text-xl min-h-[3.5rem] line-clamp-2">
                                                {post.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-text-muted text-sm line-clamp-3">{post.excerpt}</p>
                                        </CardContent>
                                        <CardFooter className="text-xs text-text-muted mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                                            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            <span className="group-hover:text-primary transition-colors flex items-center gap-1 font-medium">
                                                Read More <ArrowRight size={12} />
                                            </span>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/blog">
                        <Button variant="outline" className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all">
                            Explore All <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>
            </Container>
        </Section>
    );
}

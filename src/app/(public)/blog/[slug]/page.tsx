import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Tag, BookOpen, ChevronRight, ChevronLeft, Share2, ArrowUpRight, HelpCircle } from "lucide-react";
import { Metadata } from "next";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { BlogAnalytics } from "@/components/blog/BlogAnalytics";

export const revalidate = 60; // Revalidate every minute
export const dynamicParams = true; // Allow dynamic params for new posts

type Props = {
    params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
    const supabase = createAdminClient();
    const { data: post, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) console.error("Supabase Error:", error);

    // Fallback/Default Related Resources if none exist
    if (post && (!post.related_resources || post.related_resources.length === 0)) {
        post.related_resources = [
            { title: "Explore our Digital Marketing Services", href: "/services" },
            { title: "Book a Free Strategy Consultation", href: "/book-consultation" },
            { title: "See our Success Stories", href: "/case-studies" }
        ];
    }

    return post;
}

// Internal Linking Engine: Get related posts based on category
async function getRelatedPosts(currentSlug: string, category: string) {
    const supabase = createAdminClient();
    const { data: posts } = await supabase
        .from('blogs')
        .select('title, slug, image, published_at, read_time, category')
        .eq('category', category)
        .neq('slug', currentSlug) // Exclude current post
        .eq('status', 'published')
        .limit(3);

    return posts || [];
}

// FAQ Parser: Extract FAQs from markdown content
function extractFAQs(content: string | null | undefined) {
    if (!content) return [];

    const faqSectionMatch = content.match(/##\s+(?:FAQ|Frequently Asked Questions)([\s\S]*?)(?:##|$)/i);
    if (!faqSectionMatch) return [];

    const faqContent = faqSectionMatch[1];
    const faqs = [];
    const regex = /###\s+(.*?)\n([\s\S]*?)(?=(?:###|$))/g;

    let match;
    while ((match = regex.exec(faqContent)) !== null) {
        faqs.push({
            question: match[1].trim(),
            answer: match[2].trim()
        });
    }
    return faqs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt,
            images: post.image ? [post.image] : [],
            type: 'article',
            publishedTime: post.published_at,
            authors: [post.author_name],
        },
    };
}

export async function generateStaticParams() {
    const supabase = createAdminClient();
    const { data: posts } = await supabase
        .from('blogs')
        .select('slug')
        .eq('status', 'published');

    return (posts || []).map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(slug, post.category);
    const faqs = extractFAQs(post.content);

    const author = {
        name: post.author_name || 'Digihub Team',
        role: post.author_role || 'Editor',
        avatar: post.author_avatar,
        slug: post.author_name ? post.author_name.toLowerCase().replace(/\s+/g, '-') : 'digihub-team'
    };

    const tableOfContents = (post.content && post.content.match(/^##\s+(.+)$/gm)?.map((header: string) => {
        const title = header.replace(/^##\s+/, '');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return { title, id };
    })) || [];

    // JSON-LD Schema including FAQPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "headline": post.title,
                "image": post.image,
                "author": {
                    "@type": "Person",
                    "name": author.name,
                    "url": `https://digihub.agency/author/${author.slug}`
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Digihub Solutions",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://digihub.agency/logo.png"
                    }
                },
                "datePublished": post.published_at,
                "description": post.excerpt
            },
            ...(faqs.length > 0 ? [{
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            }] : [])
        ]
    };

    return (
        <main className="min-h-screen bg-[#0B0F14] text-white pt-10">


            <ReadingProgressBar />
            <BlogAnalytics slug={slug} />

            {/* JSON-LD Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Back Button */}
            <Section className="pt-32 md:pt-40 pb-12">
                <Container className="max-w-6xl">
                    <Link href="/blog">
                        <Button variant="ghost" className="mb-6 -ml-4 text-gray-400 hover:text-primary">
                            <ArrowLeft className="mr-2" size={20} />
                            Back to Blog
                        </Button>
                    </Link>

                    {/* Category */}
                    <div className="mb-6">
                        <Link href={`/blog?category=${post.category}`} className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                            {post.category || 'Blog'}
                        </Link>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        {post.excerpt}
                    </p>

                    {/* Author & Meta */}
                    <div className="flex items-center gap-6 pb-8 border-b border-white/10 mb-8">
                        <Link href={`/author/${author.slug}`} className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-lg font-bold text-black overflow-hidden relative group-hover:scale-105 transition-transform">
                                {author.avatar ? (
                                    <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                                ) : (
                                    author.name.charAt(0)
                                )}
                            </div>
                            <div>
                                <div className="font-semibold text-white group-hover:text-primary transition-colors">{author.name}</div>
                                <div className="text-sm text-gray-400">{author.role}</div>
                            </div>
                        </Link>
                        <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
                                    month: 'long', day: 'numeric', year: 'numeric'
                                }) : 'Draft'}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                {post.read_time || '5 min read'}
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 mb-12 shadow-2xl">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                </Container>
            </Section>

            {/* Content & Sidebar Layout */}
            <Section className="md:py-0 pb-20">
                <Container className="max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

                        {/* Main Article Content */}
                        <article className="prose prose-invert prose-lg max-w-none">
                            {/* Table of Contents Mobile */}
                            {tableOfContents.length > 0 && (
                                <div className="lg:hidden mb-8 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <BookOpen size={20} className="text-primary" />
                                        Table of Contents
                                    </h3>
                                    <nav className="space-y-2">
                                        {tableOfContents.map((item: any, index: number) => (
                                            <a key={index} href={`#${item.id}`} className="block text-gray-400 hover:text-primary transition-colors text-sm">
                                                {item.title}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            <div
                                className="text-gray-300 leading-relaxed space-y-6"
                                dangerouslySetInnerHTML={{
                                    __html: (post.content || '')
                                        .split('\n')
                                        .map((line: string) => {
                                            if (line.startsWith('# ')) return `<h1 class="text-3xl font-bold text-white mt-12 mb-6">${line.substring(2)}</h1>`;
                                            if (line.startsWith('## ')) {
                                                const title = line.substring(3);
                                                const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                                return `<h2 id="${id}" class="text-3xl font-bold text-white mt-12 mb-6 scroll-mt-24 border-l-4 border-primary pl-4">${title}</h2>`;
                                            }
                                            if (line.startsWith('### ')) return `<h3 class="text-2xl font-bold text-white mt-8 mb-4">${line.substring(4)}</h3>`;
                                            if (line.startsWith('- ')) return `<li class="ml-6 mb-2 text-gray-300 list-disc">${line.substring(2)}</li>`;
                                            if (line.startsWith('> ')) return `<blockquote class="border-l-4 border-primary/50 pl-4 py-2 italic text-gray-400 bg-white/[0.02] rounded-r-lg my-6">${line.substring(2)}</blockquote>`;

                                            // Enhanced element styling
                                            line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
                                            line = line.replace(/`(.*?)`/g, '<code class="bg-primary/10 text-primary px-1 py-0.5 rounded font-mono text-sm border border-primary/20">$1</code>');

                                            if (line.trim()) return `<p class="mb-4 text-gray-300 leading-relaxed text-lg">${line}</p>`;
                                            return '';
                                        })
                                        .join('')
                                }}
                            />
                        </article>

                        {/* Sidebar (Desktop) */}
                        <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
                            {/* Social Share */}
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Share this article</h3>
                                <div className="flex gap-4">
                                    <Button variant="outline" size="icon" className="rounded-full hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300" title="Share on LinkedIn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full hover:bg-black hover:text-white hover:border-gray-500 transition-all duration-300" title="Share on X">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-all duration-300" title="Copy Link">
                                        <Share2 size={18} />
                                    </Button>
                                </div>
                            </div>

                            {/* TOC Sidebar */}
                            {tableOfContents.length > 0 && (
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <BookOpen size={16} /> Table of Contents
                                    </h3>
                                    <nav className="space-y-3 relative">
                                        <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10"></div>
                                        {tableOfContents.map((item: any, index: number) => (
                                            <a
                                                key={index}
                                                href={`#${item.id}`}
                                                className="block pl-4 border-l-2 border-transparent hover:border-primary text-sm text-gray-400 hover:text-white transition-all py-1"
                                            >
                                                {item.title}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {/* Related Resources Sidebar */}
                            {post.related_resources && (
                                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4">You might also like</h3>
                                    <div className="space-y-3">
                                        {post.related_resources.map((res: any, i: number) => (
                                            <Link key={i} href={res.href} className="flex items-start gap-3 group">
                                                <ArrowUpRight size={18} className="text-primary mt-0.5" />
                                                <span className="text-sm text-gray-300 group-hover:text-primary transition-colors leading-snug">
                                                    {res.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </Container>
            </Section>

            {/* FAQ Section (If populated) */}
            {faqs.length > 0 && (
                <Section className="py-20 bg-white/[0.02]">
                    <Container className="max-w-4xl">
                        <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                            <HelpCircle className="text-primary" /> Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            {faqs.map((faq: any, index: number) => (
                                <div key={index} className="bg-[#0F141A] border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </Section>
            )}

            {/* Internal Linking Engine: Related Posts */}
            {relatedPosts.length > 0 && (
                <Section className="py-20 border-t border-white/5">
                    <Container>
                        <h2 className="text-3xl font-bold mb-10">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((related: any) => (
                                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block h-full">
                                    <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                                        <div className="relative h-48 overflow-hidden">
                                            {related.image && (
                                                <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="text-xs text-primary font-bold mb-2 uppercase tracking-wide">{related.category}</div>
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{related.title}</h3>
                                            <div className="mt-auto text-xs text-gray-500 flex justify-between items-center">
                                                <span>{new Date(related.published_at).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {related.read_time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Container>
                </Section>
            )}

            {/* Author Section */}
            <Section className="py-20">
                <Container className="max-w-4xl">
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

                        <Link href={`/author/${author.slug}`} className="relative z-10 group">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0 text-black group-hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                                {author.avatar ? (
                                    <img src={author.avatar} alt={author.name} className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    author.name.charAt(0)
                                )}
                            </div>
                        </Link>

                        <div className="relative z-10">
                            <div className="text-sm text-primary font-medium mb-1 tracking-wider uppercase">Written by</div>
                            <Link href={`/author/${author.slug}`} className="hover:text-primary transition-colors">
                                <h3 className="text-2xl font-bold text-white mb-2">{author.name}</h3>
                            </Link>
                            <div className="text-gray-400 mb-4">{author.role}</div>
                            {post.author_bio && (
                                <p className="text-gray-300 leading-relaxed max-w-2xl">{post.author_bio}</p>
                            )}
                            <div className="mt-4">
                                <Link href={`/author/${author.slug}`}>
                                    <Button variant="outline" size="sm" className="rounded-full">
                                        View Profile
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Consultation Form */}
            <ConsultationFormSection
                title="Want to grow your revenue?"
                subtitle={`Get a free consultation on how we can apply these strategies to your specific business goals.`}
                source={`Blog Post: ${post.title}`}
            />
        </main>
    );
}

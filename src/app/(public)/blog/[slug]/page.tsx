import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, BookOpen, Share2, ArrowUpRight, HelpCircle, Linkedin, Twitter, Facebook, User } from "lucide-react";
import { Metadata } from "next";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";
import { createClient } from "@/lib/supabase/client"; // Use client due to some issues with server client in Next 15 sometimes, but let's stick to server for data fetching if possible. Actually the original used createAdminClient. Sticking to simple createClient or custom getPost.
// Reverting to the original data fetching pattern but improved.
import { createAdminClient } from "@/lib/supabase/server";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { BlogAnalytics } from "@/components/blog/BlogAnalytics";
import { SidebarNewsletter } from "@/components/blog/SidebarNewsletter";
import { InlineCTA } from "@/components/blog/InlineCTA";

export const revalidate = 60;
export const dynamicParams = true;

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

    // Fallback Related Resources
    if (post && (!post.related_resources || post.related_resources.length === 0)) {
        post.related_resources = [
            { title: "Explore our Digital Marketing Services", href: "/services" },
            { title: "Book a Free Strategy Consultation", href: "/contact" }, // Changed to contact
            { title: "See our Success Stories", href: "/case-studies" }
        ];
    }

    return post;
}

async function getRelatedPosts(currentSlug: string, category: string) {
    const supabase = createAdminClient();
    const { data: posts } = await supabase
        .from('blogs')
        .select('title, slug, image, published_at, read_time, category')
        .eq('category', category)
        .neq('slug', currentSlug)
        .eq('status', 'published')
        .limit(3);

    return posts || [];
}

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

    if (!post) return { title: 'Article Not Found' };

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
    const { data: posts } = await supabase.from('blogs').select('slug').eq('status', 'published');
    return (posts || []).map((post: { slug: string }) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    const relatedPosts = await getRelatedPosts(slug, post.category);
    const faqs = extractFAQs(post.content);

    const author = {
        name: post.author_name || 'Digihub Team',
        role: post.author_role || 'Editor',
        avatar: post.author_avatar,
        slug: post.author_name ? post.author_name.toLowerCase().replace(/\s+/g, '-') : 'digihub-team',
        bio: post.author_bio || `Expert in ${post.category || 'Digital Marketing'} with a passion for helping businesses grow.`
    };

    const tableOfContents = (post.content && post.content.match(/^##\s+(.+)$/gm)?.map((header: string) => {
        const title = header.replace(/^##\s+/, '');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return { title, id };
    })) || [];

    // JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "headline": post.title,
                "image": post.image ? [post.image] : [],
                "author": {
                    "@type": "Person",
                    "name": author.name,
                    "url": `https://digihub.agency/author/${author.slug}`,
                    "jobTitle": author.role
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Digihub Solutions",
                    "logo": { "@type": "ImageObject", "url": "https://digihub.agency/logo.png" }
                },
                "datePublished": post.published_at,
                "description": post.excerpt,
                "mainEntityOfPage": { "@type": "WebPage", "@id": `https://digihub.agency/blog/${slug}` }
            },
            ...(faqs.length > 0 ? [{
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
                }))
            }] : [])
        ]
    };

    // Inject Inline CTA logic: Split content by H2 and insert CTA after the 2nd H2 (approx middle of intro sections)
    // For simplicity with dangerouslySetInnerHTML, we will do string manipulation on the HTML string generated.
    // However, doing it on the raw markdown before rendering is safer.
    // Let's modify the content processing loop.

    const contentLines = (post.content || '').split('\n');
    let h2Count = 0;

    // Process content for rendering
    const processedContent = contentLines.map((line: string) => {
        if (line.startsWith('## ')) {
            h2Count++;
            const title = line.substring(3);
            const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            // Add anchor link capability
            return `<h2 id="${id}" class="text-3xl font-bold text-white mt-16 mb-6 scroll-mt-32 border-l-4 border-primary pl-6">${title}</h2>`;
        }
        if (line.startsWith('# ')) return `<h1 class="text-4xl font-bold text-white mt-12 mb-6">${line.substring(2)}</h1>`;
        if (line.startsWith('### ')) return `<h3 class="text-2xl font-bold text-white mt-10 mb-4">${line.substring(4)}</h3>`;
        if (line.startsWith('- ')) return `<li class="ml-6 mb-3 text-gray-300 list-disc pl-2 marker:text-primary">${line.substring(2)}</li>`;
        if (line.startsWith('> ')) return `<blockquote class="border-l-4 border-primary/50 pl-6 py-4 italic text-xl text-gray-300 bg-white/[0.03] rounded-r-2xl my-8 relative"><span class="absolute top-0 left-2 text-6xl text-primary/20 font-serif -translate-y-4">"</span>${line.substring(2)}</blockquote>`;

        // Bold, Code, Italic
        let processedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
            .replace(/`(.*?)`/g, '<code class="bg-white/10 text-primary px-1.5 py-0.5 rounded font-mono text-sm border border-white/5">$1</code>')
            .replace(/\*(.*?)\*/g, '<em class="text-gray-300 italic">$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-all">$1</a>');

        if (processedLine.trim()) return `<p class="mb-6 text-gray-300 leading-relaxed text-lg tracking-wide">${processedLine}</p>`;
        return '';
    }).join('');

    return (
        <main className="min-h-screen bg-[#0B0F14] text-white pt-10">
            <ReadingProgressBar />
            <BlogAnalytics slug={slug} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HEADER / BACK NAV */}
            <div className="fixed top-0 left-0 w-full z-40 bg-[#0B0F14]/80 backdrop-blur-md border-b border-white/5 h-20 flex items-center transition-transform duration-300">
                <Container className="max-w-7xl flex items-center justify-between w-full">
                    <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>
                    {/* Sticky Title (Visible only when scrolled past hero? Not implemented yet, simple nav for now) */}
                    <div className="hidden md:flex gap-4">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Share</Button>
                        <Link href="/contact">
                            <Button size="sm" className="rounded-full">Get Audit</Button>
                        </Link>
                    </div>
                </Container>
            </div>

            {/* HERO SECTION - RESTRUCTURED */}
            <Section className="pt-32 pb-12">
                <Container className="max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            {/* Category & Date */}
                            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                                <Link href={`/blog?category=${post.category}`} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full font-semibold hover:bg-primary/20 transition-colors">
                                    {post.category || 'Marketing'}
                                </Link>
                                <span className="text-gray-500 flex items-center gap-1">
                                    <Calendar size={14} />
                                    {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'}
                                </span>
                                <span className="text-gray-500 flex items-center gap-1">
                                    <Clock size={14} />
                                    {post.read_time || '5 min read'}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
                                {post.title}
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                                {post.excerpt}
                            </p>

                            {/* Author Block - Enhanced */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 max-w-md">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                                        {author.avatar ? (
                                            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xl font-bold">{author.name.charAt(0)}</div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-white">{author.name}</div>
                                    <div className="text-xs text-primary mb-0.5">{author.role}</div>
                                    <Link href={`/author/${author.slug}`} className="text-xs text-gray-400 hover:text-white underline underline-offset-2">View Profile</Link>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image - Right Side on Desktop for better fold usage */}
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] lg:aspect-square group">
                            {post.image ? (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-900 flex items-center justify-center">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CONTENT & SIDEBAR */}
            <Section className="py-0 pb-20">
                <Container className="max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">

                        {/* Main Content */}
                        <div className="min-w-0"> {/* min-w-0 prevents flex/grid blowout */}

                            {/* Mobile TOC */}
                            {tableOfContents.length > 0 && (
                                <div className="lg:hidden mb-10 p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <BookOpen size={18} className="text-primary" /> Table of Contents
                                    </h3>
                                    <div className="space-y-2">
                                        {tableOfContents.map((item: any) => (
                                            <a key={item.id} href={`#${item.id}`} className="block text-gray-400 hover:text-white py-1 text-sm border-l-2 border-transparent hover:border-primary pl-3">
                                                {item.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <article className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-24 prose-p:text-gray-300 prose-a:text-primary hover:prose-a:text-primary/80">
                                <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                            </article>

                            {/* Inline CTA (Injected at bottom for now, as unsafe injection is tricky) 
                                Ideally usage: <InlineCTA /> inside MDX, but here we just append it mid-way manually or at key sections.
                                Let's put one explicitly after main content before FAQ. 
                            */}
                            <div className="mt-16">
                                <InlineCTA />
                            </div>

                            {/* FAQs */}
                            {faqs.length > 0 && (
                                <div className="mt-20 border-t border-white/10 pt-12">
                                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                        <HelpCircle className="text-primary" /> Frequently Asked Questions
                                    </h2>
                                    <div className="grid gap-6">
                                        {faqs.map((faq: any, i: number) => (
                                            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
                                                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                                                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sticky Sidebar */}
                        <aside className="hidden lg:block space-y-8">
                            <div className="sticky top-28 space-y-8">
                                {/* TOC Widget */}
                                {tableOfContents.length > 0 && (
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" /> On this page
                                        </h3>
                                        <nav className="space-y-1 relative max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                            {tableOfContents.map((item: any) => (
                                                <a
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    className="block py-2 text-sm text-gray-400 hover:text-white transition-colors border-l-2 border-transparent hover:border-primary pl-4 -ml-px"
                                                >
                                                    {item.title}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                )}

                                {/* Newsletter Widget */}
                                <SidebarNewsletter />

                                {/* Social Share */}
                                <div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Share Article</h3>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all">
                                            <Linkedin size={18} />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-black hover:border-white hover:text-white transition-all">
                                            <Twitter size={18} />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-[#1877f2] hover:border-[#1877f2] hover:text-white transition-all">
                                            <Facebook size={18} />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-primary hover:border-primary hover:text-black transition-all">
                                            <Share2 size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </Container>
            </Section>

            {/* AUTHOR BIO EXPANDED */}
            <Section className="py-20 bg-white/[0.02] border-y border-white/5">
                <Container className="max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shrink-0">
                            {author.avatar ? (
                                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl font-bold">{author.name.charAt(0)}</div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Written by {author.name}</h2>
                            <div className="text-primary font-medium mb-4">{author.role}</div>
                            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                                {author.bio}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <Link href={`/author/${author.slug}`}>
                                    <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/10">View Profile</Button>
                                </Link>
                                <div className="flex gap-2">
                                    <a href="#" className="p-2 text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                                    <a href="#" className="p-2 text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* RELATED ARTICLES */}
            <Section className="py-24">
                <Container className="max-w-7xl">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold">More from {post.category || 'our blog'}</h2>
                        <Link href="/blog">
                            <Button variant="ghost" className="text-primary hover:text-primary/80">View all <ArrowUpRight className="ml-2 w-4 h-4" /></Button>
                        </Link>
                    </div>
                    {relatedPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((related: any) => (
                                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                                    <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                                        <div className="relative h-56 overflow-hidden">
                                            {related.image ? (
                                                <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-800" />
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-black/50 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/10">
                                                    {related.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{related.title}</h3>
                                            <div className="mt-auto pt-4 border-t border-white/5 text-xs text-gray-500 flex justify-between items-center">
                                                <span>{new Date(related.published_at).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {related.read_time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                            <p className="text-gray-500">No related articles found.</p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* FINAL CTA */}
            <ConsultationFormSection
                title="Ready to Scale?"
                subtitle="Stop guessing with your strategy. Get a data-driven roadmap customized for your business."
                source={`Blog Details CTA: ${post.title}`}
            />
        </main>
    );
}


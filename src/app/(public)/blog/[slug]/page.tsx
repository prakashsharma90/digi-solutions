import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, HelpCircle, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";
import { createAdminClient } from "@/lib/supabase/server";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { BlogAnalytics } from "@/components/blog/BlogAnalytics";
import { SidebarNewsletter } from "@/components/blog/SidebarNewsletter";
import { SidebarAudit } from "@/components/blog/SidebarAudit";
import { InlineCTA } from "@/components/blog/InlineCTA"; // Now used!
import { TableOfContents } from "@/components/blog/TableOfContents";

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
    params: Promise<{ slug: string }>;
};

// Helper: Consistent ID generation
function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function getPost(slug: string) {
    try {
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
                { title: "Book a Free Strategy Consultation", href: "/contact" },
                { title: "See our Success Stories", href: "/case-studies" }
            ];
        }

        return post;
    } catch (e) {
        console.error("getPost Error:", e);
        return null;
    }
}

async function getRelatedPosts(currentSlug: string, category: string) {
    try {
        const supabase = createAdminClient();
        const { data: posts } = await supabase
            .from('blogs')
            .select('title, slug, image, published_at, read_time, category')
            .eq('category', category)
            .neq('slug', currentSlug)
            .eq('status', 'published')
            .limit(3);

        return posts || [];
    } catch (e) {
        console.error("getRelatedPosts Error:", e);
        return [];
    }
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

// Processing content for display (IDs, classes)
function processContentPart(content: string): string {
    const lines = content.split('\n');
    return lines.map((line) => {
        if (line.startsWith('## ')) {
            const title = line.substring(3);
            const id = slugify(title);
            return `<h2 id="${id}" class="text-3xl md:text-4xl font-bold text-white mt-16 mb-8 scroll-mt-32 border-l-4 border-primary pl-6 tracking-tight">${title}</h2>`;
        }
        if (line.startsWith('# ')) return `<h1 class="text-4xl font-bold text-white mt-12 mb-6">${line.substring(2)}</h1>`;
        if (line.startsWith('### ')) return `<h3 class="text-2xl font-bold text-white mt-12 mb-6 tracking-wide">${line.substring(4)}</h3>`;
        if (line.startsWith('- ')) return `<li class="ml-6 mb-4 text-gray-300 list-disc pl-2 marker:text-primary text-lg leading-relaxed">${line.substring(2)}</li>`;
        if (line.startsWith('> ')) return `<blockquote class="border-l-4 border-primary/50 pl-8 py-6 italic text-xl md:text-2xl text-gray-200 bg-white/[0.03] rounded-r-2xl my-10 relative font-serif"><span class="absolute top-2 left-2 text-6xl text-primary/20 -translate-y-4">"</span>${line.substring(2)}</blockquote>`;

        // Formatting
        const processedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
            .replace(/`(.*?)`/g, '<code class="bg-white/10 text-primary px-1.5 py-0.5 rounded font-mono text-sm border border-white/5">$1</code>')
            .replace(/\*(.*?)\*/g, '<em class="text-gray-300 italic">$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-all font-medium">$1</a>');

        if (processedLine.trim()) return `<p class="mb-8 text-gray-300 leading-8 text-lg md:text-xl tracking-wide font-light">${processedLine}</p>`;
        return '';
    }).join('');
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
            authors: [post.author_name || 'Digihub Team'],
            modifiedTime: post.updated_at || post.published_at,
        },
    };
}

export async function generateStaticParams() {
    try {
        const supabase = createAdminClient();
        const { data: posts } = await supabase.from('blogs').select('slug').eq('status', 'published');
        return (posts || []).map((post: { slug: string }) => ({ slug: post.slug }));
    } catch (error) {
        console.error("generateStaticParams (Blog): Error fetching posts:", error);
        return [];
    }
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

    // Calculate TOC
    const tableOfContents = (post.content && post.content.match(/^##\s+(.+)$/gm)?.map((header: string) => {
        const title = header.replace(/^##\s+/, '');
        const id = slugify(title);
        return { title, id };
    })) || [];

    // Split content for CTA Injection
    // We split by "## " but we need to keep distinct blocks.
    // Ideally we want to inject after the 2nd H2.
    const contentParts: string[] = post.content ? post.content.split(/(?=## )/g) : [];

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
                    "jobTitle": author.role,
                    "description": author.bio
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Digihub Solutions",
                    "logo": { "@type": "ImageObject", "url": "https://digihub.agency/logo.png" }
                },
                "datePublished": post.published_at,
                "dateModified": post.updated_at || post.published_at,
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

    return (
        <main className="min-h-screen bg-[#0B0F14] text-white pt-10 font-sans selection:bg-primary/30">
            <ReadingProgressBar />
            <BlogAnalytics slug={slug} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HEADER NAV REMOVED
                <div className="fixed top-0 left-0 w-full z-40 bg-[#0B0F14]/90 backdrop-blur-md border-b border-white/5 h-16 md:h-20 flex items-center transition-transform duration-300 py-0">
                    <Container className="max-w-7xl flex items-center justify-between w-full">
                        <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="hidden md:inline">Back</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                            <Link href="/blog" className="hover:text-white">Blog</Link>
                            <span>/</span>
                            <Link href={`/blog?category=${post.category}`} className="text-primary hover:text-primary/80">{post.category || 'Article'}</Link>
                        </div>

                        <div className="flex gap-3">
                            <Link href="/contact">
                                <Button size="sm" className="rounded-full font-semibold shadow-[0_0_15px_-5px_var(--color-primary)]">Get Free Audit</Button>
                            </Link>
                        </div>
                    </Container> 
                </div> 
                */}

            {/* HERO SECTION - RESTRUCTURED */}
            <Section className="pt-32 pb-0 md:pb-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <Container className="max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-end">
                        <div>
                            {/* Meta Tags */}
                            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                                <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full font-bold uppercase text-xs tracking-wider">
                                    {post.category || 'Insight'}
                                </span>
                                <span className="text-gray-400 flex items-center gap-1.5 font-medium">
                                    <Calendar size={14} className="text-gray-500" />
                                    {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'}
                                </span>
                                {(post.updated_at && post.updated_at !== post.published_at) && (
                                    <span className="text-gray-500 italic text-xs border-l border-white/10 pl-4">
                                        Updated: {new Date(post.updated_at).toLocaleDateString()}
                                    </span>
                                )}
                                <span className="text-gray-400 flex items-center gap-1.5 font-medium border-l border-white/10 pl-4">
                                    <Clock size={14} className="text-gray-500" />
                                    {post.read_time || '5 min read'}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
                                {post.title}
                            </h1>
                            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
                                {post.excerpt}
                            </p>

                            {/* Author Block - Enhanced EEAT */}
                            <div className="flex items-center gap-4 pt-4 pb-0 border-t border-white/10">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-white/5">
                                    {author.avatar ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-gray-800 to-black">
                                            {author.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white text-base">{author.name}</span>
                                        <a href={author.slug === 'digihub-team' ? '#' : `https://linkedin.com/in/${author.slug}`} className="text-gray-500 hover:text-[#0077b5] transition-colors"><Linkedin size={14} /></a>
                                    </div>
                                    <div className="text-sm text-gray-400">{author.role}</div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/10] bg-[#0F141A] group mb-52">
                            {post.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    loading="eager"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-sm">No Cover Image</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CONTENT & SIDEBAR */}

            <Section className="pt-0 md:pt-0 pb-24 md:py-10">
                <Container className="max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">

                        {/* Main Content */}
                        <div className="min-w-0">
                            {/* Mobile TOC */}
                            {tableOfContents.length > 0 && (
                                <div className="lg:hidden mb-12">
                                    <TableOfContents headings={tableOfContents} />
                                </div>
                            )}

                            <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-white prose-code:text-primary prose-code:bg-white/5 prose-code:rounded prose-code:px-1 prose-code:before:content-none prose-code:after:content-none">
                                {contentParts.map((part, index) => (
                                    <div key={index}>
                                        <div dangerouslySetInnerHTML={{ __html: processContentPart(part) }} />
                                        {/* INJECT CTA AFTER 2nd SECTION (which is usually Introduction + First Major Heading) */}
                                        {index === 2 && <InlineCTA />}
                                    </div>
                                ))}
                            </article>

                            {/* FAQs */}
                            {faqs.length > 0 && (
                                <div className="mt-20 border-t border-white/10 pt-16">
                                    <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                                        <HelpCircle className="text-primary" /> Frequently Asked Questions
                                    </h2>
                                    <div className="grid gap-6">
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        {faqs.map((faq: any, i: number) => (
                                            <div key={i} className="bg-[#0F141A] border border-white/5 rounded-2xl p-8 hover:border-primary/20 transition-all shadow-sm">
                                                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                                                <p className="text-gray-400 leading-relaxed text-base">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sticky Sidebar */}
                        <aside className="hidden lg:block h-full">
                            <div className="sticky top-28 space-y-8 max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pb-10">

                                <SidebarAudit />

                                {tableOfContents.length > 0 && (
                                    <TableOfContents headings={tableOfContents} />
                                )}

                                <SidebarNewsletter />

                                {/* Social Share */}
                                <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Share Article</h3>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-[#0077b5] hover:border-transparent hover:text-white transition-all text-gray-400">
                                            <Linkedin size={18} />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-black hover:border-white hover:text-white transition-all text-gray-400">
                                            <Twitter size={18} />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-[#1877f2] hover:border-transparent hover:text-white transition-all text-gray-400">
                                            <Facebook size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </Container>
            </Section>

            {/* AUTHOR BIO EXPANDED */}
            <Section className="py-24 bg-[#0F141A] border-y border-white/5">
                <Container className="max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 text-center md:text-left">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shrink-0 shadow-2xl">
                            {author.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-gray-700 to-black">{author.name.charAt(0)}</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-2 text-white">{author.name}</h2>
                            <div className="text-primary font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                                {author.role} <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                <span className="text-gray-500 text-sm font-normal">Expert Contributor</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                                {author.bio}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <Link href={`/author/${author.slug}`}>
                                    <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/10 px-6">View Full Profile</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* RELATED ARTICLES */}
            <Section className="py-24">
                <Container className="max-w-7xl">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-white">More from {post.category || 'our blog'}</h2>
                        <Link href="/blog">
                            <Button variant="ghost" className="text-primary hover:text-primary/80 group">View all <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button>
                        </Link>
                    </div>
                    {relatedPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {relatedPosts.map((related: any) => (
                                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block h-full">
                                    <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group-hover:-translate-y-2">
                                        <div className="relative h-56 overflow-hidden">
                                            {related.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-800" />
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10 shadow-lg">
                                                    {related.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight">{related.title}</h3>
                                            <div className="mt-auto pt-6 border-t border-white/5 text-xs text-gray-500 flex justify-between items-center font-medium">
                                                <span>{new Date(related.published_at).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1.5"><Clock size={14} /> {related.read_time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                            <p className="text-gray-500">No related articles found.</p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* FINAL CTA */}
            <ConsultationFormSection
                title={`Ready to Master ${post.category || 'Digital Marketing'}?`}
                subtitle="Stop guessing with your strategy. Get a data-driven roadmap customized for your business."
                source={`Blog Details CTA: ${post.title}`}
            />
        </main>
    );
}

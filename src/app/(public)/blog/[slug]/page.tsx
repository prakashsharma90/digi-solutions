import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, HelpCircle, Linkedin, Twitter, Facebook, ArrowRight, CheckCircle2, Zap, User } from "lucide-react";
import { Metadata } from "next";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";
import { createAdminClient } from "@/lib/supabase/server";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { BlogAnalytics } from "@/components/blog/BlogAnalytics";
import { SidebarNewsletter } from "@/components/blog/SidebarNewsletter";
import { SidebarAudit } from "@/components/blog/SidebarAudit";
import { InlineCTA } from "@/components/blog/InlineCTA";
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
// IMPROVED: Better contrast, larger font sizes, spacing for readability
function processContentPart(content: string, isPart: boolean = false): string {
    const lines = content.split('\n');
    return lines.map((line) => {
        // H2: Use Semantic HTML + ID, Let CSS handle detailed styling
        if (line.startsWith('## ')) {
            const title = line.substring(3);
            const id = slugify(title);
            return `<h2 id="${id}">${title}</h2>`;
        }

        // H3
        if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;

        // Lists
        if (line.startsWith('1. ')) return `<ol><li>${line.substring(3)}</li></ol>`; // Note: Ideally we'd group these, but line-by-line this is a limitation. CSS adjacent sibling selector can help fix margins.
        if (line.startsWith('- ')) return `<ul><li>${line.substring(2)}</li></ul>`;

        // Blockquotes
        if (line.startsWith('> ')) return `
            <blockquote>
                <p>
                    ${line.substring(2)}
                </p>
            </blockquote>`;

        // "Key Takeaway" / "Pro Tip" Box detection
        if (line.startsWith('TIP: ') || line.startsWith('Note: ') || line.startsWith('Pro Tip: ')) {
            return `
                <div class="my-10 p-6 bg-primary/10 border border-primary/20 rounded-xl relative overflow-hidden not-prose">
                    <div class="absolute top-0 right-0 p-4 opacity-10">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" class="text-primary"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <strong class="text-primary block mb-2 uppercase tracking-widest text-xs font-bold flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                        Expert Insight
                    </strong>
                    <p class="text-lg text-white m-0 font-medium relative z-10">
                        ${line.substring(line.indexOf(':') + 1).trim()}
                    </p>
                </div>`;
        }

        // Formatting
        const processedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

        if (processedLine.trim()) return `<p>${processedLine}</p>`;
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

    // Split content for CTA Injection (Supports both markdown ## and HTML <h2>)
    const contentParts: string[] = post.content
        ? post.content.split(/(?=## |<h2)/g)
        : [];

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

            {/* HERO SECTION - EDITORIAL DESIGN */}
            <Section className="pt-32 pb-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

                <Container className="max-w-5xl relative z-10 text-left">
                    {/* Category Label */}
                    <div className="mb-8">
                        <span className="px-4 py-1.5 bg-primary/20 border border-primary/30 text-primary rounded-md font-extrabold uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-primary/10">
                            {post.category || 'INSIGHT'}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white max-w-4xl">
                        {post.title}
                    </h1>

                    {/* New Meta Row (Reference Style) */}
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-gray-400 border-b border-white/5 pb-6 mb-0">
                        {/* Author */}
                        <div className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shadow-sm transition-transform group-hover:scale-110">
                                {author.avatar ? (
                                    <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-[10px] font-bold text-primary">{author.name.charAt(0)}</div>
                                )}
                            </div>
                            <span className="text-sm font-semibold tracking-wide">
                                <span className="opacity-60 font-medium">By</span> <span className="text-white hover:text-primary transition-colors cursor-pointer">{author.name}</span>
                            </span>
                        </div>

                        <div className="h-4 w-px bg-white/10" />

                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                            <Calendar size={15} className="text-gray-500" />
                            {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'}
                        </div>

                        <div className="h-4 w-px bg-white/10" />

                        {/* Read Time */}
                        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                            <Clock size={15} className="text-gray-500" />
                            {post.read_time || '6 min read'}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* FEATURED IMAGE */}
            <Container className="max-w-5xl -mt-4 mb-14 relative z-20 px-0 md:px-6">
                <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl aspect-video bg-[#0F141A]">
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="object-cover w-full h-full transform hover:scale-102 transition-transform duration-1000 object-center"
                            loading="eager"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-800 font-mono text-xl uppercase tracking-widest">Article Insight</div>
                    )}
                </div>
            </Container>

            {/* CONTENT & SIDEBAR */}
            <Section className="pt-0 pb-32">
                <Container className="max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-24">

                        {/* Main Content Area */}
                        <div className="min-w-0">
                            {/* Mobile Quick Nav */}
                            {tableOfContents.length > 0 && (
                                <div className="lg:hidden mb-16 border border-white/10 rounded-2xl p-8 bg-white/[0.02]">
                                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                                        <ArrowRight className="text-primary w-4 h-4" /> Jump to Section
                                    </h3>
                                    <ul className="grid grid-cols-1 gap-4 text-gray-400">
                                        {tableOfContents.slice(0, 6).map((item: { title: string; id: string }) => (
                                            <li key={item.id} className="text-sm">
                                                <a href={`#${item.id}`} className="hover:text-primary flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-white/20" /> {item.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <article className="blog-typography">
                                {contentParts.map((part, index) => {
                                    // Detecting if it's HTML or Markdown and rendering accordingly
                                    const isHTML = part.trim().startsWith('<');
                                    return (
                                        <div key={index} className="relative">
                                            {isHTML ? (
                                                <div dangerouslySetInnerHTML={{ __html: part }} />
                                            ) : (
                                                <div dangerouslySetInnerHTML={{ __html: processContentPart(part, true) }} />
                                            )}

                                            {/* Smart CTA Injection */}
                                            {index === 1 && <InlineCTA />}
                                        </div>
                                    );
                                })}
                            </article>

                            {/* FAQs Section */}
                            {faqs.length > 0 && (
                                <div className="mt-32 border-t border-white/5 pt-24">
                                    <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs font-bold uppercase tracking-widest mb-6">
                                        Support Intelligence
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black mb-12 text-white tracking-tight">
                                        Frequently Asked Questions
                                    </h2>
                                    <div className="space-y-4">
                                        {faqs.map((faq: any, i: number) => (
                                            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-primary/20 transition-all group overflow-hidden relative">
                                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity">
                                                    <HelpCircle size={80} className="text-primary" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors flex items-center gap-3">
                                                    <span className="text-primary font-mono text-sm">0{i + 1}.</span>
                                                    {faq.question}
                                                </h3>
                                                <p className="text-gray-400 leading-relaxed text-lg max-w-3xl">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Editorial Sidebar */}
                        <aside className="hidden lg:block relative">
                            <div className="sticky top-32 space-y-12 pb-20">
                                {/* Enhanced Table of Contents */}
                                {tableOfContents.length > 0 && (
                                    <TableOfContents headings={tableOfContents} />
                                )}

                                <SidebarAudit />
                                <SidebarNewsletter />

                                {/* Social Sharing - Minimized */}
                                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-1">
                                    <div className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-r border-white/10 mr-2">Share</div>
                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#0077b5] hover:text-white text-gray-500 h-10 w-10">
                                        <Linkedin size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-black hover:text-white text-gray-500 h-10 w-10">
                                        <Twitter size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#1877f2] hover:text-white text-gray-500 h-10 w-10">
                                        <Facebook size={18} />
                                    </Button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </Container>
            </Section>

            {/* AUTHOR BIO EXPANDED */}
            <Section className="py-24 bg-[#0F141A] border-t border-white/5">
                <Container className="max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 text-center md:text-left bg-white/[0.02] p-8 md:p-12 rounded-3xl border border-white/5">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shrink-0 shadow-2xl relative group">
                            {author.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-gray-700 to-black">{author.name.charAt(0)}</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-2 text-white">{author.name}</h2>
                            <div className="text-primary font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                                {author.role}
                                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                <span className="text-gray-400 text-sm font-normal">Strategy Expert</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light">
                                {author.bio}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <Link href={`/author/${author.slug}`}>
                                    <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/10 px-8 py-6 h-auto text-base">View Full Profile</Button>
                                </Link>
                                <Link href="/contact">
                                    <Button className="rounded-full px-8 py-6 h-auto text-base font-bold shadow-[0_0_20px_-5px_var(--color-primary)]">Book Consultation</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* SOFT TRANSITION DIVIDER */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
            </div>

            {/* RELATED ARTICLES - EDITORIAL GRID */}
            <Section className="py-32">
                <Container className="max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Recommended Deep Dives</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">More from {post.category || 'our blog'}</h2>
                        </div>
                        <Link href="/blog">
                            <Button variant="ghost" className="text-gray-400 hover:text-primary group text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-transparent hover:border-primary rounded-none transition-all">
                                Explore All Insights <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                    {relatedPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {relatedPosts.map((related: any) => (
                                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                                    <div className="bg-transparent space-y-6 transition-all">
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
                                            {related.image ? (
                                                <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-900" />
                                            )}
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-[10px] font-bold text-primary uppercase tracking-widest">
                                                <span>{related.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                                <span className="text-gray-500 font-medium">{new Date(related.published_at).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight line-clamp-2">{related.title}</h3>
                                            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                                                <Clock size={12} /> {related.read_time || '5 min'} read
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                            <p className="text-gray-500 font-medium">Continue your journey in our main archive.</p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* FINAL CTA - SOFTENED CONTEXT */}
            <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B0F14] to-transparent z-10" />
                <ConsultationFormSection
                    title={`Ready to Master ${post.category || 'Digital Marketing'}?`}
                    subtitle="Stop guessing with your strategy. Get a data-driven roadmap customized for your business."
                    source={`Blog Details CTA: ${post.title}`}
                />
            </div>

            {/* MOBILE FLOATING CTA */}
            <div className="fixed bottom-0 left-0 w-full z-50 p-4 lg:hidden bg-[#0B0F14]/90 backdrop-blur-md border-t border-white/10">
                <Link href="/contact">
                    <Button className="w-full rounded-full font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-black py-6">
                        Get Free Strategy Audit
                    </Button>
                </Link>
            </div>
        </main>
    );
}

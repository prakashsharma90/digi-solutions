import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";

export const revalidate = 60;

type Props = {
    params: Promise<{ slug: string }>;
};

// Helper to slugify author name
const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

async function getAuthorData(slug: string) {
    const supabase = createAdminClient();

    // Fetch all published posts
    // Note: In a larger app, we would have an 'authors' table or 'author_slug' column
    const { data: posts, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error("Supabase Error:", error);
        return null;
    }

    // Filter posts by author slug
    const authorPosts = posts.filter((post: any) => slugify(post.author_name || '') === slug);

    if (!authorPosts.length) return null;

    // Extract author details from the most recent post
    const authorInfo = {
        name: authorPosts[0].author_name,
        role: authorPosts[0].author_role || 'Contributor',
        avatar: authorPosts[0].author_avatar,
        bio: authorPosts[0].author_bio,
        posts: authorPosts
    };

    return authorInfo;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const author = await getAuthorData(slug);

    if (!author) {
        return {
            title: 'Author Not Found',
        };
    }

    return {
        title: `${author.name} - Author at Digihub Solutions`,
        description: author.bio || `Read articles by ${author.name} on Digihub Solutions.`,
        openGraph: {
            title: `${author.name} - Author Profile`,
            description: author.bio,
            images: author.avatar ? [author.avatar] : [],
        },
    };
}

export default async function AuthorPage({ params }: Props) {
    const { slug } = await params;
    const author = await getAuthorData(slug);

    if (!author) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0B0F14] text-white pt-20">
            {/* Author Hero */}
            <Section className="py-20 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <Container className="max-w-4xl text-center relative z-10">
                    <Link href="/blog">
                        <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white">
                            <ArrowLeft className="mr-2" size={16} /> Back to Blog
                        </Button>
                    </Link>

                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold text-black mb-6 border-4 border-[#0B0F14] shadow-[0_0_40px_-10px_rgba(0,217,195,0.3)] overflow-hidden">
                        {author.avatar ? (
                            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                        ) : (
                            author.name.charAt(0)
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-3">{author.name}</h1>
                    <p className="text-primary font-medium tracking-wide uppercase text-sm mb-6">{author.role}</p>

                    {author.bio && (
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            {author.bio}
                        </p>
                    )}
                </Container>
            </Section>

            {/* Author's Articles */}
            <Section className="py-20 border-t border-white/5 bg-white/[0.02]">
                <Container>
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl font-bold">Latest Articles by {author.name.split(' ')[0]}</h2>
                        <span className="text-gray-400 text-sm">{author.posts.length} Articles</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {author.posts.map((post: any) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full flex flex-col">
                                <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(0,217,195,0.3)] transition-all duration-300 h-full flex flex-col">
                                    {/* Card Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
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
                                            {new Date(post.published_at).toLocaleDateString()}
                                            <span className="w-1 h-1 rounded-full bg-gray-600" />
                                            <Clock size={12} /> {post.read_time}
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                            <span className="text-xs font-medium text-gray-300">
                                                Read Article
                                            </span>
                                            <ArrowRight size={16} className="text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </Section>
        </main>
    );
}

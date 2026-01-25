export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    status: 'draft' | 'published' | 'archived';
    type: 'blog' | 'news' | 'research';
    meta_title?: string;
    meta_desc?: string;
    author: {
        name: string;
        role: string;
        avatar?: string;
    };
    published_at?: string;
    created_at: string;
    readTime?: string;
    publishedAt?: string;
    featured?: boolean;
    tags?: string[];
    related_resources?: { title: string; href: string }[];
}

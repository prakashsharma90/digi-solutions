"use client";

import { useEffect, useState } from "react";
import BlogEditor from "@/components/admin/BlogEditor";
import AdminSidebar from "@/components/AdminSidebar";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { BlogPost } from "@/types";
import { useParams } from "next/navigation";

export default function EditBlogPage() {
    const params = useParams(); // useParams handles the async/sync of params in Client Components elegantly
    const id = params?.id as string;

    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        if (!id) return;

        const fetchBlog = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching blog", error);
                alert("Blog not found");
            } else {
                setBlog(data);
            }
            setLoading(false);
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen bg-[#0B0F14]">
                <AdminSidebar />
                <main className="flex-1 md:ml-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary w-10 h-10" />
                </main>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="flex h-screen bg-[#0B0F14]">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                <BlogEditor isEditing={true} initialData={blog} />
            </main>
        </div>
    );
}

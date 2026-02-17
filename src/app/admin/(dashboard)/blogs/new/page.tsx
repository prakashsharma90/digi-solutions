"use client";

import BlogEditor from "@/components/admin/BlogEditor";
import AdminSidebar from "@/components/AdminSidebar";

export default function NewBlogPage() {
    return (
        <div className="flex h-screen bg-[#0B0F14]">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto pl-0 md:pl-64 w-full">
                <BlogEditor isEditing={false} />
            </main>
        </div>
    );
}

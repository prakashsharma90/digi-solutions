"use client";

import BlogEditor from "@/components/admin/BlogEditor";
import AdminSidebar from "@/components/AdminSidebar";

export default function NewBlogPage() {
    return (
        <div className="flex h-screen bg-[#0B0F14]">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                <BlogEditor isEditing={false} />
            </main>
        </div>
    );
}

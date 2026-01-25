import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
    const blogs = await readData("blogs");
    return NextResponse.json(blogs);
}

export async function POST(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    const blogs = await readData<any>("blogs");

    const newBlog = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
    };

    blogs.push(newBlog);
    await writeData("blogs", blogs);

    return NextResponse.json(newBlog, { status: 201 });
}

export async function PATCH(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id, ...updates } = await request.json();
    const blogs = await readData<any>("blogs");

    const index = blogs.findIndex((b: any) => b.id === id);
    if (index === -1) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    blogs[index] = { ...blogs[index], ...updates };
    await writeData("blogs", blogs);

    return NextResponse.json(blogs[index]);
}

export async function DELETE(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const blogs = await readData<any>("blogs");
    const filteredBlogs = blogs.filter((b: any) => b.id !== id);
    await writeData("blogs", filteredBlogs);

    return NextResponse.json({ message: "Blog deleted" });
}

import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
    const pricing = await readData("pricing");
    return NextResponse.json(pricing);
}

export async function PATCH(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id, ...updates } = await request.json();
    const pricing = await readData<any>("pricing");
    const index = pricing.findIndex((p: any) => p.id === id);
    if (index !== -1) {
        pricing[index] = { ...pricing[index], ...updates };
        await writeData("pricing", pricing);
    }
    return NextResponse.json({ success: true });
}

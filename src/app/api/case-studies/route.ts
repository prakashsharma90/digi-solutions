import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
    const caseStudies = await readData("case-studies");
    return NextResponse.json(caseStudies);
}

export async function POST(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    const caseStudies = await readData<any>("case-studies");

    const newCaseStudy = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
    };

    caseStudies.push(newCaseStudy);
    await writeData("case-studies", caseStudies);

    return NextResponse.json(newCaseStudy, { status: 201 });
}

export async function PATCH(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id, ...updates } = await request.json();
    const caseStudies = await readData<any>("case-studies");

    const index = caseStudies.findIndex((cs: any) => cs.id === id);
    if (index === -1) {
        return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }

    caseStudies[index] = { ...caseStudies[index], ...updates };
    await writeData("case-studies", caseStudies);

    return NextResponse.json(caseStudies[index]);
}

export async function DELETE(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const caseStudies = await readData<any>("case-studies");
    const filtered = caseStudies.filter((cs: any) => cs.id !== id);
    await writeData("case-studies", filtered);

    return NextResponse.json({ message: "Case study deleted" });
}

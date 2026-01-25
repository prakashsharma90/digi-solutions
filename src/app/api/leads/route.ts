import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

const USE_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined && process.env.SUPABASE_SERVICE_ROLE_KEY !== undefined;

export async function GET() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let allLeads: any[] = [];
    const isLocal = process.env.NODE_ENV === 'development';

    if (USE_SUPABASE) {
        try {
            const supabase = createAdminClient();
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                // Map snake_case to camelCase for frontend compatibility
                const supabaseLeads = data.map((row: any) => ({
                    ...row,
                    createdAt: row.created_at
                }));
                allLeads = [...supabaseLeads];
            }
        } catch (error) {
            console.error("Supabase fetch error:", error);
        }
    }

    // If we're local, OR if we failed to get Supabase leads, include JSON leads
    if (isLocal || allLeads.length === 0) {
        try {
            const localLeads = await readData("leads");
            // Merge and avoid duplicates by ID
            const existingIds = new Set(allLeads.map(l => String(l.id)));
            localLeads.forEach((l: any) => {
                if (!existingIds.has(String(l.id))) {
                    allLeads.push(l);
                }
            });
        } catch (e) {
            console.error("Local leads read error:", e);
        }
    }

    // Sort combined leads by date
    allLeads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(allLeads);
}

export async function POST(request: NextRequest) {
    const data = await request.json();

    // Basic server-side validation
    if (!data.name || !data.email || !data.message) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (data.message.length > 2000) {
        return NextResponse.json({ error: "Message too long (max 2000 characters)" }, { status: 400 });
    }

    const id = Date.now().toString();
    const status = "New";
    const createdAt = new Date().toISOString();

    if (USE_SUPABASE) {
        try {
            const supabase = createAdminClient();
            const { data: insertedData, error } = await supabase
                .from('leads')
                .insert([{
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    service: data.service,
                    message: data.message,
                    source: data.source,
                    status
                }])
                .select();

            if (error) throw error;
            return NextResponse.json({ ...insertedData[0], createdAt: insertedData[0].created_at }, { status: 201 });
        } catch (error) {
            console.error("Supabase error (falling back to JSON):", error);
        }
    }

    const leads = await readData<any>("leads");
    const newLead = { ...data, id, status, createdAt };
    leads.push(newLead);
    await writeData("leads", leads);
    return NextResponse.json(newLead, { status: 201 });
}

export async function PATCH(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id, ...updates } = await request.json();

    if (USE_SUPABASE) {
        try {
            const supabase = createAdminClient();
            const { data, error } = await supabase
                .from('leads')
                .update({
                    status: updates.status,
                    company_name: updates.company_name,
                    budget_range: updates.budget_range,
                    business_size: updates.business_size,
                    timeline: updates.timeline,
                    notes: updates.notes,
                    assigned_to: updates.assigned_to,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            return NextResponse.json({ ...data[0], createdAt: data[0].created_at });
        } catch (error) {
            console.error("Supabase error:", error);
        }
    }

    const leads = await readData<any>("leads");
    const index = leads.findIndex((l: any) => l.id === id);
    if (index === -1) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    leads[index] = { ...leads[index], ...updates };
    await writeData("leads", leads);
    return NextResponse.json(leads[index]);
}

export async function DELETE(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (USE_SUPABASE && id) {
        try {
            const supabase = createAdminClient();
            const { error } = await supabase
                .from('leads')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return NextResponse.json({ message: "Lead deleted" });
        } catch (error) {
            console.error("Supabase error:", error);
        }
    }

    const leads = await readData<any>("leads");
    const filteredLeads = leads.filter((l: any) => l.id !== id);
    await writeData("leads", filteredLeads);
    return NextResponse.json({ message: "Lead deleted" });
}

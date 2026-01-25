import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

const USE_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined && process.env.SUPABASE_SERVICE_ROLE_KEY !== undefined;

export async function GET() {
    if (USE_SUPABASE) {
        try {
            const supabase = createAdminClient();
            const { data, error } = await supabase
                .from('services')
                .select('*');

            if (!error) return NextResponse.json(data);
            console.error("Supabase error:", error);
        } catch (error) {
            console.error("Supabase fetch error:", error);
        }
    }

    const services = await readData("services");
    return NextResponse.json(services);
}

export async function PATCH(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id, ...updates } = await request.json();

    if (USE_SUPABASE) {
        try {
            const supabase = createAdminClient();
            // Upsert (insert or update)
            const { error } = await supabase
                .from('services')
                .upsert({ id, ...updates }, { onConflict: 'id' });

            if (!error) return NextResponse.json({ success: true });
            console.error("Supabase update error:", error);
        } catch (error) {
            console.error("Supabase error:", error);
        }
    }

    const services = await readData<any>("services");

    const index = services.findIndex((s: any) => s.id === id);
    if (index === -1) {
        // If not in JSON, but exists in static data, we might want to add it
        services.push({ id, ...updates });
    } else {
        services[index] = { ...services[index], ...updates };
    }

    await writeData("services", services);
    return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();

    // Ensure ID exists
    if (!data.id) {
        return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    if (USE_SUPABASE) {
        try {
            const supabase = createAdminClient();
            const { error } = await supabase
                .from('services')
                .insert([data]);

            if (!error) return NextResponse.json({ success: true });
            console.error("Supabase insert error:", error);
            // If error, we might fall back or return error depending on strategy. 
            // For now let's return error to debug.
            return NextResponse.json({ error: error.message }, { status: 500 });
        } catch (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: "Supabase error" }, { status: 500 });
        }
    }

    const services = await readData<any>("services");
    if (services.some((s: any) => s.id === data.id)) {
        return NextResponse.json({ error: "Service ID already exists" }, { status: 400 });
    }

    services.push(data);
    await writeData("services", services);
    return NextResponse.json({ success: true });
}

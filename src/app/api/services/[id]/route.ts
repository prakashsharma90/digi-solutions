import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";

const USE_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined && process.env.SUPABASE_SERVICE_ROLE_KEY !== undefined;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (USE_SUPABASE) {
        try {
            const supabase = createAdminClient();

            // Try to find by id first, then by slug
            let { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('id', id)
                .single();

            // If not found by id, try slug
            if (error && error.code === 'PGRST116') {
                const result = await supabase
                    .from('services')
                    .select('*')
                    .eq('slug', id)
                    .single();

                data = result.data;
                error = result.error;
            }

            if (!error && data) return NextResponse.json(data);
            if (error && error.code !== 'PGRST116') console.error("Supabase error:", error);
        } catch (error) {
            console.error("Supabase fetch error:", error);
        }
    }

    const services = await readData<any>("services");
    const service = services.find((s: any) => s.id === id || s.slug === id);

    if (service) return NextResponse.json(service);
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (USE_SUPABASE) {
        try {
            const supabase = createAdminClient();

            // First, find the service by id or slug to get the actual UUID
            let { data: existingService } = await supabase
                .from('services')
                .select('id')
                .eq('id', id)
                .single();

            // If not found by id, try slug
            if (!existingService) {
                const result = await supabase
                    .from('services')
                    .select('id')
                    .eq('slug', id)
                    .single();

                existingService = result.data;
            }

            if (existingService) {
                // Update using the actual UUID
                const { error } = await supabase
                    .from('services')
                    .update(body)
                    .eq('id', existingService.id);

                if (!error) return NextResponse.json({ success: true });
                console.error("Supabase update error:", error);
            }
        } catch (error) {
            console.error("Supabase error:", error);
        }
    }

    const services = await readData<any>("services");
    const index = services.findIndex((s: any) => s.id === id || s.slug === id);

    if (index !== -1) {
        services[index] = { ...services[index], ...body };
        await writeData("services", services);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Service not found" }, { status: 404 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (USE_SUPABASE) {
        try {
            const supabase = createAdminClient();

            // First, find the service by id or slug to get the actual UUID
            let { data: existingService } = await supabase
                .from('services')
                .select('id')
                .eq('id', id)
                .single();

            // If not found by id, try slug
            if (!existingService) {
                const result = await supabase
                    .from('services')
                    .select('id')
                    .eq('slug', id)
                    .single();

                existingService = result.data;
            }

            if (existingService) {
                const { error } = await supabase
                    .from('services')
                    .delete()
                    .eq('id', existingService.id);

                if (!error) return NextResponse.json({ success: true });
            }
        } catch (error) {
            console.error("Supabase error:", error);
        }
    }

    const services = await readData<any>("services");
    const filtered = services.filter((s: any) => s.id !== id && s.slug !== id);
    await writeData("services", filtered);

    return NextResponse.json({ success: true });
}

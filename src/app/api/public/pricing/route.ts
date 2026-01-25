import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const serviceSlug = searchParams.get("service");

    const supabase = createClient();

    if (!serviceSlug) {
        return NextResponse.json({ error: "Service slug is required" }, { status: 400 });
    }

    // 1. Get Service ID
    const { data: service, error: serviceError } = await supabase
        .from("services")
        .select("id")
        .eq("slug", serviceSlug)
        .single();

    if (serviceError || !service) {
        return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // 2. Get Active Pricing Plans with Features
    const { data: plans, error: plansError } = await supabase
        .from("pricing_plans")
        .select(`
      *,
      features:plan_features(feature_text, is_included, sort_order)
    `)
        .eq("service_id", service.id)
        .eq("is_active", true) // Only active plans
        .order("sort_order", { ascending: true });

    if (plansError) {
        return NextResponse.json({ error: plansError.message }, { status: 500 });
    }

    // Optimize response structure if needed, or return as is
    return NextResponse.json(plans);
}

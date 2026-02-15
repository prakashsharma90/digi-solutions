import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("serviceId");

    const supabase = await createClient();

    let query = supabase
        .from("pricing_plans")
        .select(`
      *,
      features:plan_features(*)
    `)
        .order("sort_order", { ascending: true });

    if (serviceId) {
        query = query.eq("service_id", serviceId);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    // Use Admin Client to bypass RLS for admin actions
    const supabase = createAdminClient();
    const body = await request.json();

    const {
        service_id,
        title,
        price,
        currency,
        billing_cycle,
        is_popular,
        is_active,
        // cta_text, // Uncomment after running migration
        features, // Array of strings or objects
    } = body;

    // 1. Create Plan
    const { data: plan, error: planError } = await supabase
        .from("pricing_plans")
        .insert({
            service_id,
            title,
            price,
            currency,
            billing_cycle,
            is_popular,
            is_active,
            // cta_text, // Uncomment after running migration
        })
        .select()
        .single();

    if (planError) {
        return NextResponse.json({ error: planError.message }, { status: 500 });
    }

    // 2. Create Features if provided
    if (features && features.length > 0) {
        const featuresToInsert = features.map((f: any, index: number) => ({
            pricing_plan_id: plan.id,
            feature_text: typeof f === "string" ? f : f.feature_text,
            is_included: typeof f === "string" ? true : f.is_included ?? true,
            sort_order: index,
        }));

        const { error: featureError } = await supabase
            .from("plan_features")
            .insert(featuresToInsert);

        if (featureError) {
            // Optional: Rollback plan creation (complex in HTTP), but for now just report
            return NextResponse.json(
                { error: "Plan created but features failed: " + featureError.message },
                { status: 500 }
            );
        }
    }

    return NextResponse.json(plan);
}

export async function PUT(request: Request) {
    const supabase = createAdminClient();
    const body = await request.json();
    const { id, features, ...updates } = body;

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // 1. Update Plan Details
    const { error: updateError } = await supabase
        .from("pricing_plans")
        .update(updates)
        .eq("id", id);

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 2. Update Features (Full Replace Strategy for simplicity in Phase 1)
    if (features) {
        // Delete existing
        await supabase.from("plan_features").delete().eq("pricing_plan_id", id);

        // Insert new
        if (features.length > 0) {
            const featuresToInsert = features.map((f: any, index: number) => ({
                pricing_plan_id: id,
                feature_text: typeof f === "string" ? f : f.feature_text,
                is_included: typeof f === "string" ? true : f.is_included ?? true,
                sort_order: index,
            }));

            await supabase.from("plan_features").insert(featuresToInsert);
        }
    }

    return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("pricing_plans").delete().eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}

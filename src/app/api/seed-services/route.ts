import { NextRequest, NextResponse } from "next/server";
import { servicesData } from "@/data/services";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
    // Security: Disable in production to prevent accidental data overwrites
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: "Seeding is disabled in production" }, { status: 403 });
    }

    const supabase = createAdminClient();

    const services = Object.entries(servicesData).map(([slug, data]) => ({
        slug,
        name: data.name,
        title: data.title,
        meta_title: data.metaTitle,
        meta_desc: data.metaDesc,
        hero_text: data.heroText,
        description: data.description,
        why_matters: data.whyMatters,
        benefits: JSON.stringify(data.benefits),
        problems: JSON.stringify(data.problems),
        approach: JSON.stringify(data.approach),
        tools: JSON.stringify(data.tools),
        outcomes: JSON.stringify(data.outcomes),
        industries: JSON.stringify(data.industries),
        pricing: JSON.stringify(data.pricing),
        faq: JSON.stringify(data.faq),
        status: 'Published', // Initial seed as Published
        is_deleted: false,
    }));

    const { data, error } = await supabase
        .from("services")
        .upsert(services, { onConflict: "slug" })
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Services seeded successfully", count: data.length });
}

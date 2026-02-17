import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const TABLE_NAME = "site_settings";

// Ensure the table exists
async function ensureTable(supabase: any) {
    // Try a simple select first
    const { error } = await supabase
        .from(TABLE_NAME)
        .select("key")
        .limit(1);

    if (error?.code === "42P01") {
        // Table doesn't exist, create it
        const { error: createError } = await supabase.rpc("exec_sql", {
            query: `
                CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                    key TEXT PRIMARY KEY,
                    value TEXT NOT NULL DEFAULT '',
                    updated_at TIMESTAMPTZ DEFAULT NOW()
                );
            `,
        });
        // If RPC doesn't exist, we'll handle it via the migration endpoint
        if (createError) {
            console.warn("Could not auto-create table. Please run the SQL manually:", createError.message);
        }
    }
}

// GET - Load all settings
export async function GET() {
    try {
        const supabase = createAdminClient();
        await ensureTable(supabase);

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select("key, value");

        if (error) {
            // If table doesn't exist, return empty defaults
            if (error.code === "42P01") {
                return NextResponse.json({ success: true, settings: {} });
            }
            throw error;
        }

        // Convert array of {key, value} to a flat object
        const settings: Record<string, string> = {};
        (data || []).forEach((row: { key: string; value: string }) => {
            settings[row.key] = row.value;
        });

        return NextResponse.json({ success: true, settings });
    } catch (err: any) {
        console.error("Settings GET error:", err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}

// POST - Save settings
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { settings } = body as { settings: Record<string, string> };

        if (!settings || typeof settings !== "object") {
            return NextResponse.json(
                { success: false, error: "Invalid settings payload" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();
        await ensureTable(supabase);

        // Upsert each key-value pair
        const rows = Object.entries(settings).map(([key, value]) => ({
            key,
            value: String(value),
            updated_at: new Date().toISOString(),
        }));

        const { error } = await supabase
            .from(TABLE_NAME)
            .upsert(rows, { onConflict: "key" });

        if (error) throw error;

        // Revalidate all pages so favicon/title/settings changes take effect
        revalidatePath("/", "layout");

        return NextResponse.json({ success: true, message: "Settings saved successfully" });
    } catch (err: any) {
        console.error("Settings POST error:", err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}

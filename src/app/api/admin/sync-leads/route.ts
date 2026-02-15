import { NextResponse } from "next/server";
import { readData } from "@/lib/db";
import { createAdminClient } from "@/lib/supabase/server";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
    // Basic security check
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const localLeads = await readData("leads");
        if (!localLeads || localLeads.length === 0) {
            return NextResponse.json({ message: "No local leads found to sync." });
        }

        const supabase = createAdminClient();
        const results = [];

        for (const lead of localLeads as any[]) {
            // Map JSON fields to Supabase fields
            const { id, createdAt, ...rest } = lead;

            const { data, error } = await supabase
                .from('leads')
                .upsert({
                    ...rest,
                    created_at: createdAt || new Date().toISOString()
                }, { onConflict: 'email' }); // Upsert by email to avoid duplicates

            if (error) {
                results.push({ name: lead.name, status: 'error', error });
            } else {
                results.push({ name: lead.name, status: 'success' });
            }
        }

        return NextResponse.json({
            message: `Sync completed. Processed ${localLeads.length} leads.`,
            results
        });
    } catch (error: any) {
        console.error("Sync error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

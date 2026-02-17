import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    const supabase = createAdminClient();

    try {
        // Add missing columns to blogs table
        const alterations = [
            // Add meta_desc column if it doesn't exist
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_desc TEXT`,

            // Add meta_title column if it doesn't exist
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title TEXT`,

            // Add image column if it doesn't exist
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS image TEXT`,

            // Add status column if it doesn't exist
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft'`,

            // Add type column if it doesn't exist
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'blog'`,

            // Add author_name column if it doesn't exist
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author_name TEXT`,

            // Add author_role column if it doesn't exist
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author_role TEXT`,

            // Add updated_at column if it doesn't exist
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`,
        ];

        const results = [];

        for (const sql of alterations) {
            try {
                const { error } = await supabase.rpc('exec_sql', { sql_query: sql });

                if (error) {
                    // Try direct execution if RPC doesn't work
                    console.log('Attempting direct execution...');
                    results.push({ sql, status: 'attempted', note: 'May need manual execution in Supabase SQL editor' });
                } else {
                    results.push({ sql, status: 'success' });
                }
            } catch (err) {
                results.push({ sql, status: 'error', error: String(err) });
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Migration attempted. If using Supabase, you may need to run these SQL commands manually in the SQL editor.',
            results,
            manual_sql: alterations.join(';\n') + ';'
        });

    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json(
            {
                error: 'Migration failed',
                details: String(error),
                note: 'Please run the SQL commands manually in Supabase SQL editor'
            },
            { status: 500 }
        );
    }
}

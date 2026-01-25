import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { initDatabase } from "@/lib/postgres";

export async function GET() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            return NextResponse.json({
                message: "Please run the following SQL in your Supabase SQL Editor to initialize the database:",
                sql: `
                    create table leads (
                        id uuid default gen_random_uuid() primary key,
                        name text not null,
                        email text not null,
                        phone text,
                        service text,
                        message text,
                        source text,
                        status text default 'New',
                        created_at timestamp with time zone default timezone('utc'::text, now()) not null
                    );
                    alter table leads enable row level security;
                    create policy "Admin access" on leads for all using (true);
                `
            });
        }
        await initDatabase();
        return NextResponse.json({ message: "Database initialized successfully" });
    } catch (error: any) {
        console.error("Setup DB error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

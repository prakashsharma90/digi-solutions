
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { user_id, channel, metadata } = body;

        const supabase = createAdminClient();

        // Insert new session using Supabase client
        const { data: session, error } = await supabase
            .from('sessions')
            .insert({
                user_id: user_id || null, // Allow generic null if empty
                channel: channel || 'web',
                metadata: metadata || null
            })
            .select('id, started_at')
            .single();

        if (error) {
            console.error("Supabase Session Error:", error);
            throw new Error(error.message);
        }

        if (!session) {
            throw new Error("Failed to create session - no data returned");
        }

        return NextResponse.json({
            session_id: session.id,
            created_at: session.started_at
        });
    } catch (error) {
        console.error('Create Session Error:', error);
        return NextResponse.json(
            { error: 'Failed to create session', details: String(error) },
            { status: 500 }
        );
    }
}

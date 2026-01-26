import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Check if user is admin (you should implement proper auth check)
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch all conversations
        const { data: conversations, error } = await supabase
            .from('chat_conversations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching conversations:', error);
            return NextResponse.json(
                { error: 'Failed to fetch conversations' },
                { status: 500 }
            );
        }

        return NextResponse.json({ conversations });
    } catch (error) {
        console.error('Admin chat conversations error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Update conversation status
export async function PATCH(request: NextRequest) {
    try {
        const { conversationId, status, visitorData } = await request.json();

        const supabase = await createClient();

        // Check if user is admin
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const updateData: any = {};

        if (status) {
            updateData.status = status;
        }

        if (visitorData) {
            Object.assign(updateData, visitorData);
        }

        const { data, error } = await supabase
            .from('chat_conversations')
            .update(updateData)
            .eq('id', conversationId)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to update conversation' },
                { status: 500 }
            );
        }

        return NextResponse.json({ conversation: data });
    } catch (error) {
        console.error('Update conversation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

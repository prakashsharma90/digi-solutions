import { createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET: Fetch all chatbot leads
export async function GET(req: Request) {
    try {
        const supabase = createAdminClient();
        const { searchParams } = new URL(req.url);

        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';
        const service = searchParams.get('service') || '';
        const startDate = searchParams.get('startDate') || '';
        const endDate = searchParams.get('endDate') || '';

        let query = supabase
            .from('chatbot_leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (search) {
            query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
        }
        if (status && status !== 'All') {
            query = query.eq('status', status);
        }
        if (service) {
            query = query.ilike('service_type', `%${service}%`);
        }
        if (startDate) {
            query = query.gte('created_at', new Date(startDate).toISOString());
        }
        if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            query = query.lte('created_at', end.toISOString());
        }

        const { data, error } = await query;

        if (error) {
            console.error("Failed to fetch chatbot leads:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error("Chatbot Leads API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PATCH: Update lead status or notes
export async function PATCH(req: Request) {
    try {
        const supabase = createAdminClient();
        const body = await req.json();
        const { id, status, notes } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing lead id' }, { status: 400 });
        }

        const updateData: Record<string, any> = {};
        if (status !== undefined) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const { data, error } = await supabase
            .from('chatbot_leads')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Failed to update chatbot lead:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Chatbot Leads PATCH Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE: Delete a lead
export async function DELETE(req: Request) {
    try {
        const supabase = createAdminClient();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing lead id' }, { status: 400 });
        }

        const { error } = await supabase
            .from('chatbot_leads')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Failed to delete chatbot lead:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Chatbot Leads DELETE Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

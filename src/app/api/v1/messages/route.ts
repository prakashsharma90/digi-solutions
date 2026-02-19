
import { chatService } from '@/lib/chat-service';
import { createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { session_id, message } = await req.json();

    if (!session_id || !message) {
        return NextResponse.json({ error: 'Missing session_id or message' }, { status: 400 });
    }

    try {
        const supabase = createAdminClient();

        // 1. Save User Message
        const { error: insertError } = await supabase
            .from('messages')
            .insert({
                session_id: session_id,
                role: 'user',
                content: message
            });

        if (insertError) {
            console.error("Failed to save user message:", insertError);
            throw new Error(`DB Error: ${insertError.message}`);
        }

        // 2. Fetch History (limit 11 to include current + 10 previous)
        const { data: historyData, error: historyError } = await supabase
            .from('messages')
            .select('role, content, created_at')
            .eq('session_id', session_id)
            .order('created_at', { ascending: false })
            .limit(11);

        if (historyError) {
            console.error("Failed to fetch history:", historyError);
        }

        let historyRows = (historyData || []).reverse();

        // Remove the last message if it matches the current message
        if (historyRows.length > 0) {
            const lastMsg = historyRows[historyRows.length - 1];
            if (lastMsg.role === 'user' && lastMsg.content === message) {
                historyRows.pop();
            }
        }

        const history = historyRows.map(row => ({
            role: row.role as 'user' | 'assistant' | 'system',
            content: row.content as string
        }));

        // 3. Generate Response (Stream)
        const stream = await chatService.generateResponse(history, message);

        // 4. Transform Stream
        const encoder = new TextEncoder();
        let fullResponse = '';

        const customStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    const content = (chunk as any).choices?.[0]?.delta?.content || '';
                    if (content) {
                        fullResponse += content;
                        controller.enqueue(encoder.encode(content));
                    }
                }

                // 5. Save Bot Message & Extract Lead Data after stream ends
                try {
                    if (fullResponse) {
                        let contentToSave = fullResponse;

                        // Check for Lead Data JSON block
                        const leadMatch = fullResponse.match(/\[\[LEAD_DATA:([\s\S]*?)\]\]/);
                        if (leadMatch && leadMatch[1]) {
                            try {
                                const leadData = JSON.parse(leadMatch[1].trim());
                                console.log("Lead captured from chatbot:", leadData);

                                // Fetch the first user message as the original query
                                let queryMessage = message;
                                const { data: firstMsg } = await supabase
                                    .from('messages')
                                    .select('content')
                                    .eq('session_id', session_id)
                                    .eq('role', 'user')
                                    .order('created_at', { ascending: true })
                                    .limit(1)
                                    .single();
                                if (firstMsg) queryMessage = firstMsg.content;

                                // Save to chatbot_leads table
                                const { error: leadError } = await supabase
                                    .from('chatbot_leads')
                                    .insert({
                                        full_name: leadData.fullName || '',
                                        email: leadData.email || '',
                                        phone: leadData.phone || '',
                                        service_type: leadData.serviceType || '',
                                        session_id: session_id,
                                        query_message: queryMessage,
                                        status: 'New'
                                    });

                                if (leadError) {
                                    console.error("Failed to save chatbot lead:", leadError);
                                } else {
                                    console.log("Chatbot lead saved successfully!");
                                }

                                // Strip the JSON block from the saved message
                                contentToSave = fullResponse.replace(leadMatch[0], '').trim();
                                if (!contentToSave) {
                                    contentToSave = "Thank you! I've saved your details. Our team will reach out to you shortly.";
                                }
                            } catch (parseErr) {
                                console.error("Failed to parse lead data:", parseErr);
                            }
                        }

                        const { error: botInsertError } = await supabase
                            .from('messages')
                            .insert({
                                session_id: session_id,
                                role: 'assistant',
                                content: contentToSave
                            });

                        if (botInsertError) {
                            console.error("Failed to save bot message:", botInsertError);
                        }
                    }
                } catch (dbError) {
                    console.error('Failed to save bot message (exception):', dbError);
                }

                controller.close();
            }
        });

        return new Response(customStream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            }
        });

    } catch (error) {
        console.error('Chat Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}

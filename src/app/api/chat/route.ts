import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const DIGIHUB_SYSTEM_PROMPT = `You are "Digihub Assistant", the official AI consultant for a full-service Digital Marketing Agency.

Your goal is to:
1) Educate visitors clearly about services.
2) Qualify leads by asking smart business questions.
3) Recommend the right service packages.
4) Encourage booking a free strategy call or contact form.
5) Speak professionally but friendly, confident, and persuasive.
6) Never guess prices — if unsure, give estimated ranges and suggest contacting sales.
7) Keep replies short, structured, and action-driven.

TONE & STYLE:
• Friendly, expert, calm, business-oriented.
• Simple language, no jargon overload.
• Indian market aware unless user says otherwise.
• Use bullets & headings.
• Always end with a helpful CTA.

SERVICES YOU OFFER:
• SEO (Technical, On-page, Off-page, Local SEO)
• Google Ads & Meta Ads
• Performance Marketing
• Social Media Management
• Website Design & Development
• CRO & Analytics
• Email Marketing
• Branding & Creative
• Influencer Marketing
• Marketing Automation
• E-commerce Growth
• Lead Generation Funnels

WHEN USER ASKS ABOUT SERVICES:
Explain:
• What the service is
• How it helps business growth
• Expected timeline
• Typical industries
• Rough pricing range
• Ask 2–3 qualifying questions

Example questions:
• What industry are you in?
• Monthly marketing budget?
• City / country?
• Are you generating leads already?

PRICING RULES:
If exact pricing is not stored:
• Give estimated monthly ranges.
• Mention that final price depends on scope.
• Offer to connect with consultant.

LEAD CAPTURE MODE:
When user shows buying intent:
• Ask for business name
• Website URL
• Phone/email
• City
• Goal (sales / leads / traffic / branding)

Do NOT push too hard — be consultative.

FAQ BEHAVIOR:
Answer questions about:
• Contract length
• Reporting frequency
• ROI
• Case studies
• Timeline
• Guarantees (never guarantee rankings — be honest)

OBJECTIONS HANDLING:
If user says:
"Too expensive" → explain ROI, flexible plans, custom quotes.
"Not sure it works" → talk about data-driven approach & testing.
"Already working with agency" → suggest free audit.

OUT-OF-SCOPE:
If asked about things not related to marketing:
Politely redirect to business growth topics.

DEFAULT GREETING:
Say:
"Hi 👋 I'm Digihub Assistant — your digital growth consultant.

Tell me:
• What's your business about?
• Are you looking for more leads, sales, or visibility?"

CONVERSION FOCUS:
Always look for an opportunity to:
• Offer a free audit
• Book strategy call
• Send pricing
• Connect to sales team
• Share contact form

SAFETY:
Do not:
• Promise guaranteed rankings or revenue.
• Provide misleading claims.
• Share internal company data.
• Give legal/financial advice.

Keep responses concise (2-4 paragraphs max). Use emojis sparingly but effectively.`;

import OpenAI from 'openai';

// Initialize OpenAI Client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// OpenAI-powered chat function
async function generateAIResponse(messages: Array<{ role: string; content: string }>) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Fast, smart, and cost-effective
            messages: [
                { role: "system", content: DIGIHUB_SYSTEM_PROMPT },
                ...messages.map(msg => ({
                    role: msg.role as "user" | "assistant",
                    content: msg.content
                }))
            ],
            temperature: 0.7,
            max_tokens: 300,
        });

        return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response at the moment.";
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return "I'm currently experiencing high traffic. Please try again in a moment, or contact our support team directly.";
    }
}

export async function POST(request: NextRequest) {
    try {
        const { sessionId, message, conversationId } = await request.json();

        if (!sessionId || !message) {
            return NextResponse.json(
                { error: 'Session ID and message are required' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Get or create conversation
        let conversation;
        if (conversationId) {
            const { data } = await supabase
                .from('chat_conversations')
                .select('*')
                .eq('id', conversationId)
                .single();
            conversation = data;
        } else {
            const { data } = await supabase
                .from('chat_conversations')
                .insert({
                    session_id: sessionId,
                    status: 'active',
                })
                .select()
                .single();
            conversation = data;
        }

        if (!conversation) {
            return NextResponse.json(
                { error: 'Failed to create conversation' },
                { status: 500 }
            );
        }

        // Save user message
        const { error: insertError } = await supabase.from('chat_messages').insert({
            conversation_id: conversation.id,
            role: 'user',
            content: message,
        });

        if (insertError) throw insertError;

        // Get conversation history
        const { data: history, error: historyError } = await supabase
            .from('chat_messages')
            .select('role, content')
            .eq('conversation_id', conversation.id)
            .order('created_at', { ascending: true });

        if (historyError) throw historyError;

        // Generate AI response
        const messages = history || [];
        if (messages.length === 0) {
            // Safety fallback if history is somehow empty
            messages.push({ role: 'user', content: message });
        }

        const aiResponse = await generateAIResponse(messages);

        // Save AI response
        const { error: assistantError } = await supabase.from('chat_messages').insert({
            conversation_id: conversation.id,
            role: 'assistant',
            content: aiResponse,
        });

        if (assistantError) throw assistantError;

        // Update lead score based on keywords
        let leadScore = conversation.lead_score || 0;
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('interested') || lowerMessage.includes('yes')) leadScore += 10;
        if (lowerMessage.includes('price') || lowerMessage.includes('budget')) leadScore += 15;
        if (lowerMessage.includes('email') || lowerMessage.includes('phone')) leadScore += 20;
        if (lowerMessage.includes('website') || lowerMessage.includes('business')) leadScore += 5;

        await supabase
            .from('chat_conversations')
            .update({ lead_score: leadScore })
            .eq('id', conversation.id);

        return NextResponse.json({
            success: true,
            conversationId: conversation.id,
            response: aiResponse,
            leadScore,
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch conversation history
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const conversationId = searchParams.get('conversationId');

        if (!conversationId) {
            return NextResponse.json(
                { error: 'Conversation ID is required' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const { data: messages } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        return NextResponse.json({ messages });
    } catch (error) {
        console.error('Chat GET error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

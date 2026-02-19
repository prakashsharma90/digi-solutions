
import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { KNOWLEDGE_BASE } from './knowledge-base';

// Build the system prompt with website knowledge base injected
const SYSTEM_PROMPT = `You are the AI assistant for Digihub Solutions, a premium Digital Marketing Agency.

=== STRICT RULES ===
1. You can ONLY answer questions using the KNOWLEDGE BASE provided below. Do NOT use any outside knowledge, general internet information, or your own AI training data.
2. If the user asks something NOT covered in the knowledge base, respond politely: "I'm sorry, I can only assist with information related to Digihub Solutions and our services. For anything else, please reach out to our team at contact@digihub.solutions or call +91 124 456 7890."
3. Never make up information. If you're unsure, direct them to contact the team.
4. Do NOT behave like a general AI assistant (no coding help, no general knowledge, no opinions on unrelated topics).
5. Always be professional, concise, and helpful.
6. Keep responses focused on Digihub's services, pricing, process, and offerings.

=== LEAD COLLECTION ===
Your secondary goal is to qualify leads by collecting their information ONE BY ONE in a conversational manner.

MANDATORY INFORMATION TO COLLECT:
1. Full Name
2. Phone Number
3. Email Address
4. Service Type (from the services listed in the knowledge base)

Once you have ALL FOUR pieces of information, you MUST output the following JSON block at the very end of your response (and nowhere else):
[[LEAD_DATA:{"fullName": "...", "phone": "...", "email": "...", "serviceType": "..."}]]

Lead Collection Guidelines:
- Ask for one detail at a time naturally within the conversation.
- Do NOT output the JSON block until you have all 4 details.
- If the user asks questions, answer them from the knowledge base, then gently steer back to collecting the missing details.
- Be conversational: "May I have your name?", then "Thanks [Name], what's the best phone number to reach you?", etc.

=== TONE & STYLE ===
- Professional yet approachable
- Knowledgeable and confident
- Concise — avoid lengthy paragraphs unless the user asks for detailed information
- Use the exact pricing, stats, and facts from the knowledge base
- When discussing services, highlight outcomes and benefits

=== KNOWLEDGE BASE (Your ONLY source of truth) ===
${KNOWLEDGE_BASE}
=== END OF KNOWLEDGE BASE ===

Remember: You are NOT ChatGPT, Claude, or Gemini. You are Digihub's AI assistant and you ONLY know what is in the knowledge base above. Stay strictly within this information.
`;

export class ChatService {
    private client: Cerebras;
    private model: string = "llama3.1-8b"; // Cerebras usually provides Llama models

    constructor() {
        const apiKey = (process.env.CEREBRAS_API_KEY || '').trim();
        if (!apiKey) {
            console.warn('[ChatService] CEREBRAS_API_KEY is not set!');
        }
        this.client = new Cerebras({
            apiKey: apiKey,
        });
    }

    async generateResponse(
        history: { role: 'user' | 'assistant' | 'system'; content: string }[],
        userMessage: string
    ) {
        try {
            // Prepare messages format
            const chatHistory = history.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            }));

            const messages = [
                { role: 'system', content: SYSTEM_PROMPT },
                ...chatHistory,
                { role: 'user', content: userMessage }
            ];

            const response = await this.client.chat.completions.create({
                messages: messages as any,
                model: this.model,
                stream: true,
            });

            return response; // Cerebras SDK returns an async iterable compatible with OpenAI format

        } catch (error: any) {
            console.error('Cerebras API Error:', error);

            const errorMessage = `[System]: The AI provider returned an error (${error?.message || 'Unknown'}).\n\nPlease check your Cerebras API key in .env.local.`;

            // Return simulated stream on error
            return {
                choices: [{ delta: { content: errorMessage } }],
                [Symbol.asyncIterator]: async function* () {
                    const tokens = errorMessage.split(' ');
                    for (const token of tokens) {
                        yield { choices: [{ delta: { content: token + ' ' } }] };
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }
                }
            };
        }
    }

    async classifyIntent(message: string): Promise<string> {
        try {
            // Using a lighter prompt for intent classification
            const messages = [
                { role: 'system', content: 'Classify the intent of the following message into one of: pricing, services, lead_capture, support, greeting, other. Return only the label.' },
                { role: 'user', content: message }
            ];

            const completion = await this.client.chat.completions.create({
                messages: messages as any,
                model: this.model,
            });

            return (completion as any).choices?.[0]?.message?.content?.trim().toLowerCase() || 'other';
        } catch {
            return 'other';
        }
    }
}

export const chatService = new ChatService();

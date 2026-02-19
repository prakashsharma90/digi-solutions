
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: 'AIzaSyB2Pz_vq5bb1pQE_-ytMZyOAwNE-GAu8iY',
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

async function main() {
    try {
        console.log('Sending request to Gemini (via OpenAI compatibility)...');
        const stream = await openai.chat.completions.create({
            model: 'gemini-1.5-flash',
            messages: [{ role: 'user', content: 'Say hello!' }],
            max_tokens: 10,
            stream: true,
        });

        console.log('Stream started.');
        for await (const chunk of stream) {
            process.stdout.write(chunk.choices[0]?.delta?.content || '');
        }
        console.log('\nStream complete.');
    } catch (error: any) {
        console.error('Error:', error?.response?.data || error.message);
    }
}

main();

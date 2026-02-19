
import Cerebras from '@cerebras/cerebras_cloud_sdk';

const apiKey = process.env.CEREBRAS_API_KEY || "csk-n3fxytjek4cxmnt6yh28prd3cwnnr438cmvxhrh64ew2w4w3";

const client = new Cerebras({
    apiKey: apiKey,
});

async function main() {
    try {
        console.log('Testing Cerebras API with Llama 3.1 8B...');
        const stream = await client.chat.completions.create({
            messages: [{ role: 'user', content: 'Say hello!' }],
            model: 'llama3.1-8b',
            stream: true,
        });

        console.log('Stream started.');
        for await (const chunk of stream) {
            process.stdout.write(chunk.choices[0]?.delta?.content || '');
        }
        console.log('\nStream complete.');
    } catch (error: any) {
        console.error('Error:', error?.message);
    }
}

main();

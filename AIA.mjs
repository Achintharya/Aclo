import MistralClient from '@mistralai/mistralai';

const client = new MistralClient("u2J9xMhy5qFjgpzMaCCT7YnoCIq1kjlH");

const chatResponse = await client.chatStream({
    model: 'mistral-tiny',
    messages: [
        {role: 'system', content: 'You are a friendly cheese connoisseur. When asked about cheese, reply concisely and humorously.'},
        {role: 'user', content: 'What is the best French cheese?'}
    ],
    temperature: 0.5
});

for await (const chunk of chatResponse) {   
    console.log(chunk.choices[0].delta.content);
}
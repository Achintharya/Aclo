import MistralClient from "@mistralai/mistralai";
import { createClient } from "@supabase/supabase-js";

const mistralClient = new MistralClient("u2J9xMhy5qFjgpzMaCCT7YnoCIq1kjlH",2);
const supabase = createClient("https://bewwfdiqefwvthokopxy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJld3dmZGlxZWZ3dnRob2tvcHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMTk0NTcsImV4cCI6MjAzNDc5NTQ1N30.o5JY0pPTp1Kt_We67jL_WR_G8iwsm7hjRtF8HYKOcao");

// 1. Getting the user input
const input = "why should I hire you ?";

// 2. Creating an embedding of the input
const embedding = await createEmbedding(input);

// 3. Retrieving similar embeddings / text chunks (aka "context")
const context = await retrieveMatches(embedding);


// 4. Combining the input and the context in a prompt and using the chat API to generate a response 
const response = await generateChatResponse(context, input);
console.log(response);

async function createEmbedding(input) {
  const embeddingResponse = await mistralClient.embeddings({
      model: 'mistral-embed',
      input: [input]
  });
  return embeddingResponse.data[0].embedding;
}

async function retrieveMatches(embedding) {
    const { data } = await supabase.rpc('match_my_resume', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 2
    });
    return data[0].content;
}


async function generateChatResponse(context, query) {
    const response = await mistralClient.chat({
        model: 'mistral-tiny',
        messages: [
            {role: "system", content:"You are Achintharya, reply only in first person. Be professional and straightforward."},
            {role: 'user',
            content: `Resume context: ${context} - Question: ${query}`}
        ], temperature: 0.2
    });  
    return response.choices[0].message.content;
}
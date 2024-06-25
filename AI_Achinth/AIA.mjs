import MistralClient from "@mistralai/mistralai";
import { createClient } from "@supabase/supabase-js";

const mistralClient = new MistralClient("u2J9xMhy5qFjgpzMaCCT7YnoCIq1kjlH");
const supabase = createClient("https://bewwfdiqefwvthokopxy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJld3dmZGlxZWZ3dnRob2tvcHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMTk0NTcsImV4cCI6MjAzNDc5NTQ1N30.o5JY0pPTp1Kt_We67jL_WR_G8iwsm7hjRtF8HYKOcao");

// 1. Getting the user input
const input = "tell me about yourself";

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
    try {
        const { data, error } = await supabase.rpc('match_my_resume', {
            query_embedding: embedding,
            match_threshold: 0.7,
            match_count: 3
        });

        if (error) {
            throw new Error(error.message || 'Unknown error occurred');
        }

        if (!data || !Array.isArray(data) || data.length === 0) {
            throw new Error('No matching content found');
        }

        return data[0].content; // Assuming data is an array and you want the first element's content
    } catch (error) {
        console.error('Error retrieving matches:', error.message);
        throw error; // Re-throw the error to be caught by the caller if needed
    }
}


async function generateChatResponse(context, query) {
    // Get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // Prompt message including current date and time
    const promptMessage = `Current Date and Time: ${currentDate}, ${currentTime}\n`
                         + `Resume context: ${context} - Question: ${query}`;

    try {
        // Call Mistral AI chat API
        const response = await mistralClient.chat({
            model: 'mistral-tiny',
            messages: [
                { role: "system", content: "### YOU = Achintharya. You WILL only answer what you know. ### you MUST only reply in first person ### reply professionally in a paragraph ### you MUST be straight-foward and truthful" },
                { role: 'user', content: promptMessage }
            ],
            temperature: 0.5, randomSeed:615
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating chat response:', error.message);
        throw error; // Handle or propagate the error as needed
    }
}

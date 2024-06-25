import MistralClient from "@mistralai/mistralai";
import { createClient } from "@supabase/supabase-js";

const mistralClient = new MistralClient("u2J9xMhy5qFjgpzMaCCT7YnoCIq1kjlH");
const supabase = createClient("https://bewwfdiqefwvthokopxy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJld3dmZGlxZWZ3dnRob2tvcHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMTk0NTcsImV4cCI6MjAzNDc5NTQ1N30.o5JY0pPTp1Kt_We67jL_WR_G8iwsm7hjRtF8HYKOcao");

const BACKOFF_BASE_MS = 500; // Base backoff time in milliseconds
const BACKOFF_MAX_ATTEMPTS = 3; // Maximum number of retry attempts

async function backoff(attempt) {
  const delay = BACKOFF_BASE_MS * (2 ** attempt);
  await new Promise(resolve => setTimeout(resolve, delay));
}

async function processInput() {
  const input = "tell me about yourself";

  try {
    // 2. Creating an embedding of the input
    const embedding = await createEmbedding(input);
    if (embedding === null) {
      throw new Error('Failed to create embedding for the input');
    }

    // 3. Retrieving similar embeddings / text chunks (aka "context")
    const context = await retrieveMatches(embedding);
    if (context === null) {
      throw new Error('Failed to retrieve matches for the embedding');
    }

    // 4. Combining the input and the context in a prompt and using the chat API to generate a response
    const response = await generateChatResponse(context, input);
    if (response === null) {
      throw new Error('Failed to generate chat response');
    }

    console.log(response);
  } catch (error) {
    console.error('An error occurred during the processing of the input:', error.message);
    // Handle the error as needed, e.g., show a user-friendly message or log the error on a server
  }
}


async function createEmbedding(input) {
  try {
    const embeddingResponse = await mistralClient.embeddings({
      model: 'mistral-embed',
      input: [input]
    });

    // Check if embeddingResponse has the expected data structure
    if (embeddingResponse?.data && embeddingResponse.data.length > 0 && embeddingResponse.data[0].embedding) {
      return embeddingResponse.data[0].embedding;
    } else {
      throw new Error('Unexpected response structure from the embeddings API');
    }
  } catch (error) {
    console.error('An error occurred while creating the embedding:', error.message);
    // Handle the error as needed, e.g., return null, throw the error, or show a user-friendly message
    return null;
  }
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

  let attempt = 0;
  while (attempt < BACKOFF_MAX_ATTEMPTS) {
    try {
      // Call Mistral AI chat API with streaming
      const chatStreamResponse = await mistralClient.chatStream({
        model: 'mistral-tiny',
        messages: [
          { role: "system", content: "### YOU are Achintharya. YOU WILL only answer what you know. ### YOU MUST only reply in first person with 'I' ### reply professionally in a paragraph ### YOU MUST be straight-foward and truthful" },
          { role: 'user', content: promptMessage }
        ],
        temperature: 0.5, randomSeed: 615
      });

      console.log();
      for await (const chunk of chatStreamResponse) {
        const streamText = chunk?.choices?.[0]?.delta?.content ?? '';
        const cleanedStreamText = streamText.replace(/undefined/g, '');

        if (cleanedStreamText.trim()) {
          process.stdout.write(cleanedStreamText);
        }
      }

      return; // Exit the function if the request is successful

    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("Retrying request on response status: 429 Response: ", error.response.data);
        attempt++;
        if (attempt < BACKOFF_MAX_ATTEMPTS) {
          await backoff(attempt);
        }
      } else {
        console.error("I'm sorry, something went wrong", error.message);
        throw error; // Handle or propagate the error as needed
      }
    }
  }

  // If the loop reaches this point, it means that all retry attempts have failed
  console.error("I'm sorry, I'm too tired to talk. Please try again later.");
}

processInput();

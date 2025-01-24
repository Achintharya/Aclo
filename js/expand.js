import MistralClient from 'https://cdn.skypack.dev/@mistralai/mistralai';
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';


console.log("web_AIA.mjs module loaded");

const mistralClient = new MistralClient("6j9Rq0RWLutx1ZFdZpxEjeA93K6sk59L");
const supabase = createClient("https://bewwfdiqefwvthokopxy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJld3dmZGlxZWZ3dnRob2tvcHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMTk0NTcsImV4cCI6MjAzNDc5NTQ1N30.o5JY0pPTp1Kt_We67jL_WR_G8iwsm7hjRtF8HYKOcao");

const BACKOFF_BASE_MS = 600; // Base backoff time in milliseconds
const BACKOFF_MAX_ATTEMPTS = 2; // Maximum number of retry attempts

async function backoff(attempt) {
  const delay = BACKOFF_BASE_MS * (2 ** attempt);
  await new Promise(resolve => setTimeout(resolve, delay));
}

async function processInput(input) {
  if (!input.trim()) {
    console.log("No input detected");
    return generateChatResponse(input, "if no known query is detected, ask the user to ask them anything about yourself");
  }

  try {
    // Creating an embedding of the input
    const embedding = await createEmbedding(input);
    if (embedding === null) {
      console.log("Failed to create embedding for the input");
      return generateChatResponse(input, "if no known query is detected, answer the query as yourself(Achintharya)");
    }

    // Retrieving similar embeddings / text chunks (aka "context")
    const context = await retrieveMatches(embedding);
    if (context === null) {
      console.log("Failed to retrieve matches for the embedding");
    }

    // Combining the input and the context in a prompt and using the chat API to generate a response
    const response = await generateChatResponse(context, input);
    if (response === null) {
      console.log("Failed to generate chat response");
      return generateChatResponse(input, "if no known query is detected, answer the query as yourself(Achintharya)");
    }

    return response;
  } catch (error) {
    console.log(error.message);
    return generateChatResponse(input, "if no known query is detected, answer the query as yourself(Achintharya)");
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
      throw new Error("Unexpected response structure from the embeddings API");
    }
  } catch (error) {
    console.log(error.message);
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
      throw new Error(error.message);
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("No matching content found");
    }

    return data[0].content; // Assuming data is an array and you want the first element's content
  } catch (error) {
    console.error(error.message);
    return null;
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
        model: 'mistral-small-latest',
        messages: [
          { role: "system", content: "### YOU are Achintharya. Reply only as Achintharya (yourself) in first person with 'I'. ###**Answer in a straightforward, truthful, and professional paragraph. Use only the provided context and NEVER hallucinate information. All responses must be a maximum of 128 tokens. Be Achintharya, not an AI language model.**"},
          { role: 'user', content: promptMessage }
        ],
        temperature: 0.5, randomSeed: 615, maxTokens: 128
      });

      let finalResponse = '';
      const inputLabelElement = document.querySelector('.input__label'); // Get the input label element
      inputLabelElement.innerHTML = ''; // Clear previous content

      for await (const chunk of chatStreamResponse) {
        const streamText = chunk.choices[0].delta.content;
        if (streamText) {
          inputLabelElement.innerHTML += streamText; // Append the text to the input label element
          finalResponse += streamText;
        }
      }
      return finalResponse;

    } catch (error) {
      if (error.response && error.response.status === 429) {
        attempt++;
        if (attempt < BACKOFF_MAX_ATTEMPTS) {
          await backoff(attempt);
        }
      } else {
        console.error(error.message);
        // Avoid infinite recursion by returning a default message
        return "An error occurred while processing your request. Please try again.";
      }
    }
  }
  // Fallback call to generateChatResponse
  return "An error occurred while processing your request. Please try again.";
}



function expandContainer() {
    const black_hole = document.getElementById('black_hole');
    const buttonContainer = document.getElementById('buttonContainer');
    const inputContainer = document.getElementById('inputContainer');
    const inputText = document.getElementById('inputText');
    const aboutH = document.getElementById('about_h');
    const tieElements = document.querySelectorAll('#TIE, #tie2, #tie3'); // Select all TIE elements
    const cool = document.getElementById("coolStuff");

    // Check if elements are found
    if (!buttonContainer) {
        console.error("buttonContainer not found");
        return;
    }
    if (!inputContainer) {
        console.error("inputContainer not found");
        return;
    }
    if (!inputText) {
        console.error("inputText not found");
        return;
    }

    // Hide the button container
    buttonContainer.style.display = 'none';
    aboutH.style.display = 'none';
    
    inputContainer.style.display = 'flex';

    setTimeout(() => {
        cool.style.cursor = 'default';
        inputContainer.classList.add('active');
        black_hole.classList.add('active');
    }, 10); // Small delay to allow the display change to take effect

    inputText.addEventListener('keypress', window.handleInput);

    tieElements.forEach(tie => tie.remove());
}

// Loader stop function
function stop_loader() {
  const loader = document.getElementById('loader_container');
  if (loader) {
    loader.classList.add('dead');
  } else {
    console.error("Loader not found");
  }
}

function handleInput(event) {
    if (event.key === 'Enter') {
        stop_loader();
        const userInput = event.target.value;
        processInput(userInput)
            .then(modelOutput => {
                const inputLabel = document.querySelector('.input__label');
                if (inputLabel) {
                    inputLabel.innerHTML = modelOutput;
                } else {
                    console.error("Input label not found");
                }
            })
            .catch(error => {
                console.error("Error processing input:", error);
            });
    }
}

function startShooting() {
  document.addEventListener('DOMContentLoaded', () => {
    const coolSection = document.getElementById('coolStuff');
    const aboutSection = document.getElementById('about');
    const aboutH = document.getElementById('about_h');
    const button = document.querySelector('.btn');
    const f = document.querySelector('.tie');
    let clickCount = 0;
    let shots = 0;
    const requiredShots = 5;
    const requiredClicks = 10;
    let canShoot = true;

    if (aboutSection && button) {
      aboutSection.addEventListener('click', (event) => {
        if (canShoot) shootBullet(event, coolSection);
      });
    } else {
      console.error('about container or button not found');
    }

    function shootBullet(event, container) {

      if(window.innerWidth > 768){
        canShoot = false;
        const rect = container.getBoundingClientRect();
        const cursorBoxRect = cursorBox.getBoundingClientRect();
        const x = cursorBoxRect.left + cursorBoxRect.width / 2 - rect.left;
        const y = cursorBoxRect.top + cursorBoxRect.height / 2 - rect.top;

        if (y < 300 || y > 1000) {
          resetShootCooldown();
          return;
        }

        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.style.left = `${x}px`;
        bullet.style.top = `${y}px`;
        bullet.style.position = 'absolute';
        container.appendChild(bullet);

        const bulletSpeed = 4;

        function moveBullet() {
          bullet.style.top = `${parseFloat(bullet.style.top) - bulletSpeed}px`;
          if (parseFloat(bullet.style.top) > 0) {
            requestAnimationFrame(moveBullet);
          } else {
            bullet.remove();
          }
        }

        function checkCollision() {
          const bulletRect = bullet.getBoundingClientRect();
          const buttonRect = button.getBoundingClientRect();
          const tieRect = f.getBoundingClientRect();

          const buttonHit = checkHit(bulletRect, buttonRect);
          const tieHit = checkHit(bulletRect, tieRect);

          if (buttonHit) {
            bullet.remove();
            triggerButtonHit();
          }

          if (tieHit) {
            bullet.remove();
            shots++;
            if (shots >= requiredShots && f) {
              f.remove();
            }
          }

          if (!buttonHit && !tieHit) {
            requestAnimationFrame(checkCollision);
          }
        }

        requestAnimationFrame(moveBullet);
        requestAnimationFrame(checkCollision);

        bullet.addEventListener('animationend', () => bullet.remove());

        resetShootCooldown();
      }
    }

    function checkHit(rect1, rect2) {
      return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      );
    }

    function triggerButtonHit() {
      button.classList.add('hit');
      setTimeout(() => button.classList.remove('hit'), 500);
      button.click();
    }

    function resetShootCooldown() {
      setTimeout(() => {
        canShoot = true;
      }, 200);
    }

    aboutH.textContent = `Hit the button ${requiredClicks} times to see some magic`;

    function handleButtonClick() {
      if (window.innerWidth < 768) {  // Handles screens less than 768px
        expandContainer();
      } else {  // Handles screens 768px and wider
        clickCount++;

        button.classList.add('hover');
        setTimeout(() => button.classList.remove('hover'), 200);

        if (aboutH) {
          aboutH.textContent = `${requiredClicks - clickCount} times to go`;
        }

        if (clickCount >= requiredClicks) {
          expandContainer();
          clickCount = 0;
        }
      }
    }

    button.addEventListener('click', handleButtonClick);
    // Feature detection for requestAnimationFrame
    if (window.requestAnimationFrame) {
      window.addEventListener('scroll', function() {
        window.requestAnimationFrame(parallax);
      });
    } else {
      window.addEventListener('scroll', parallax);
    }

  });
}


startShooting();
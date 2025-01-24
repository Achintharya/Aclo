import { processInput } from './web_AIA.mjs';

export function expandContainer() {
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
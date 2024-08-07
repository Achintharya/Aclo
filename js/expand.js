function expandContainer() {
    const black_hole = document.getElementById('black_hole');
    const buttonContainer = document.getElementById('buttonContainer');
    const inputContainer = document.getElementById('inputContainer');
    const inputText = document.getElementById('inputText');
    const aboutH = document.getElementById('about_h');
    const tieElements = document.querySelectorAll('#TIE, #tie2, #tie3'); // Select all TIE elements

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
    
    inputContainer.style.display = 'flex'; // Ensure it's displayed
    inputContainer.style.cursor= 'auto';

    setTimeout(() => {
        inputContainer.classList.add('active');
        black_hole.classList.add('active');
    }, 10); // Small delay to allow the display change to take effect

    inputText.addEventListener('keypress', window.handleInput);

    // Remove all TIE elements
    tieElements.forEach(tie => tie.remove());
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

window.handleInput = handleInput;
window.expandContainer = expandContainer;
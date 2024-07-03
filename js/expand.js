function expandContainer() {
    console.log("expandContainer function called");
    const buttonContainer = document.getElementById('buttonContainer');
    const inputContainer = document.getElementById('inputContainer');
    const inputText = document.getElementById('inputText');

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
    console.log("buttonContainer hidden");
    
    inputContainer.style.display = 'flex'; // Ensure it's displayed

    setTimeout(() => {
        inputContainer.classList.add('active');
        console.log("inputContainer displayed");
    }, 10); // Small delay to allow the display change to take effect

    inputText.addEventListener('keypress', window.handleInput);
}

window.expandContainer = expandContainer;
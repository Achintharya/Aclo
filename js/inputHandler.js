function handleInput(event) {
    if (event.key === 'Enter') {
        stop_loader();
        const userInput = event.target.value;
        console.log("User input: ", userInput);
        processInput(userInput)
            .then(modelOutput => {
                console.log("Model output: ", modelOutput);
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
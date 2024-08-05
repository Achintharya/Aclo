const coolSection = document.getElementById('coolStuff');
const f = document.getElementById("TIE");
const f2 = document.getElementById("tie2");
const f3 = document.getElementById("tie3");

let targetX = 0;
let targetY = 0;
let startTime = null;
let hitCounter = 0;

// Create a small box to follow the cursor
const cursorBox = document.createElement('div');
cursorBox.className = 'cursor-box';
coolSection.appendChild(cursorBox);

let isMoving = false; // Flag to track if the cursor box is moving

// Function to update the cursor box position
function updateCursorBox() {
  cursorBox.style.left = `${targetX + 15}px`; // Adjust the offset as needed
  cursorBox.style.top = `${targetY}px`; // Adjust the offset as needed
  isMoving = false; // Reset the flag
}

// Make the TIE follow the cursor and update the cursor box position
coolSection.addEventListener("mousemove", (ev) => {
  targetX = ev.clientX;
  targetY = ev.clientY;

  // Only request animation frame if not already moving
  if (!isMoving) {
    isMoving = true; // Set the flag to indicate movement
    requestAnimationFrame(updateCursorBox); // Use requestAnimationFrame to update position
  }
}, false);

// Function to animate the TIE element
function animateTIE(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;

  // Calculate the oscillation using a sine wave
  const oscillation = Math.sin(elapsed / 1250) * 300; // Adjust the speed and amplitude as needed
  const rotation = targetY > window.innerHeight / 2 ? 'rotate(180deg)' : 'rotate(720deg)';

  // Update the TIE position with oscillation
  f.style.transform = `translate(${targetX + oscillation}px, ${targetY - 100}px) ${rotation}`;
  f2.style.transform = `translate(${targetX + 100 + oscillation}px, ${targetY - 50 + oscillation}px) ${rotation}`;
  f3.style.transform = `translate(${targetX - 100 - oscillation}px, ${targetY + 50 + oscillation}px) ${rotation}`;

  requestAnimationFrame(animateTIE);
}

// Start animation with a delay
const delay = 1000; // Delay in milliseconds
setTimeout(() => {
  requestAnimationFrame(animateTIE);
}, delay);

// Function to flash the cursor box color
function flashCursorBoxColor(color, duration) {
  const originalColor = cursorBox.style.backgroundColor = "transparent"; // Store the original color
  cursorBox.style.backgroundColor = color; // Set the new color

  // Revert back to the original color after the specified duration
  setTimeout(() => {
    cursorBox.style.backgroundColor = originalColor;
  }, duration);
}

// Function to shoot attacks towards cursor
function shootattack() {
  if (!f) {
    console.log("TIE element not found, stopping attack creation.");
    return; // Stop if the TIE element is removed
  }
  if (coolSection) {
    try {
      const attack = document.createElement('div');
      attack.className = 'attack';
      attack.style.position = 'absolute';
      coolSection.appendChild(attack);

      // Get the TIE element's position
      const tieRect = f.getBoundingClientRect();
      // Set the attack's starting position to the center of the TIE element
      attack.style.left = `${tieRect.left + tieRect.width / 2}px`;
      attack.style.top = `${tieRect.top + tieRect.height / 2}px`;

      // Calculate the direction vector towards the cursor
      const cursorX = targetX; // Use the targetX directly
      const cursorY = targetY; // Use the targetY directly
      const dx = cursorX - (tieRect.left + tieRect.width / 2);
      const dy = cursorY - (tieRect.top + tieRect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Ensure distance is not zero to avoid division by zero
      const velocityX = distance > 0 ? (dx / distance) * 8 : 0; // Adjust the speed as needed
      const velocityY = distance > 0 ? (dy / distance) * 8 : 0; // Adjust the speed as needed

      // Animate the attack
      function moveattack() {
        const attackRect = attack.getBoundingClientRect();
        attack.style.left = `${attackRect.left + velocityX}px`;
        attack.style.top = `${attackRect.top + velocityY}px`;

        // Check for collision with the cursor position
        const hitArea = 3;

        if (
          attackRect.left < cursorX + hitArea &&
          attackRect.right > cursorX - hitArea &&
          attackRect.top < cursorY + hitArea &&
          attackRect.bottom > cursorY - hitArea
        ) {
          attack.remove();
          console.log('Attack removed upon hitting the cursor');
          hitCounter++;
          flashCursorBoxColor('red', 200);
          if (hitCounter === 20) {
            const aboutH2 = document.getElementById('about_h');
            aboutH2.textContent = 'Oh no! you are hit, try again :(';
            aboutH2.style.fontSize = '2.5vw';
            setTimeout(() => {
              location.reload(true); // Refresh the page
            }, 2000);
          }
        } else {
          requestAnimationFrame(moveattack);
        }
      }

      requestAnimationFrame(moveattack);
      setTimeout(() => {
        attack.remove();
      }, 2500);

    } catch (error) {
      console.error("Error in shootattack function:", error);
    }
  }
}

// Function to start shooting attacks at intervals
function startAttack() {
  const attackInterval = setInterval(() => {
    if (!document.getElementById('TIE')) {
      console.log("TIE element not found, clearing interval.");
      clearInterval(attackInterval); // Stop the interval if the TIE element is removed
      return;
    }
    try {
      console.log("Creating an attack.");
      shootattack();
    } catch (error) {
      console.error("Error in setInterval for shootattack:", error);
    }
  }, 850);
}

const aboutSection = document.getElementById("about");
const f = document.getElementById("TIE");
const f2 = document.getElementById("tie2");
const f3 = document.getElementById("tie3");

let targetX = 0;
let targetY = 0;
let target2X = 0;
let target2Y = 0;
let startTime = null;
let hitCounter = 0;

// Create a small box to follow the cursor
const cursorBox = document.createElement('div');
cursorBox.className = 'cursor-box';
aboutSection.appendChild(cursorBox);

let isMoving = false; // Flag to track if the cursor box is moving

// Function to update the cursor box position
function updateCursorBox() {
  cursorBox.style.left = `${targetX + 15}px`; // Adjust the offset as needed
  cursorBox.style.top = `${targetY}px`; // Adjust the offset as needed
  isMoving = false; // Reset the flag
}

// Make the TIE follow the cursor and update the cursor box position
document.addEventListener(
  "mousemove",
  (ev) => {
    targetX = ev.clientX;
    targetY = ev.clientY;

    target2X = ev.pageX;
    target2Y = ev.pageY;

    // Only request animation frame if not already moving
    if (!isMoving) {
      isMoving = true; // Set the flag to indicate movement
      requestAnimationFrame(updateCursorBox); // Use requestAnimationFrame to update position
    }
  },
  false
);

  // Function to animate the TIE element
  function animateTIE(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;

  // Calculate the oscillation using a sine wave
  const oscillation = Math.sin(elapsed / 1250) * 500; // Adjust the speed and amplitude as needed
  const rotation = targetY > window.innerHeight / 2 ? 'rotate(180deg)' : 'rotate(720deg)';

  // Update the TIE position with oscillation
  f.style.transform = `translate(${targetX + oscillation}px, ${targetY - 100}px) ${rotation}`;
  f2.style.transform = `translate(${targetX + 100 + oscillation }px, ${targetY -50 + oscillation}px) ${rotation}`;
  f3.style.transform = `translate(${targetX - 100 - oscillation}px, ${targetY +50 + oscillation}px) ${rotation}`;

  requestAnimationFrame(animateTIE);
  }

  // Start  animation with a delay
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
  if (aboutSection) {
    try {
      const attack = document.createElement('div');
      const coolSection = document.getElementById('coolStuff');
      attack.className = 'attack';
      const tieRect = f.getBoundingClientRect();
      attack.style.left = `${tieRect.left + tieRect.width / 2}px`;
      attack.style.top = `${tieRect.top + tieRect.height / 2}px`;
      attack.style.position = 'absolute';
      coolSection.appendChild(attack);

      // Calculate the direction vector
      const dx = target2X - (tieRect.left + tieRect.width / 2);
      const dy = target2Y - (tieRect.top + tieRect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

// Ensure distance is not zero to avoid division by zero
const velocityX = distance > 0 ? (dx / distance) * 8 : 0; // Adjust the speed as needed
const velocityY = distance > 0 ? (dy / distance) * 8 : 0; // Adjust the speed as needed

      // Animate the attack
      function moveattack() {
        try {
          const attackRect = attack.getBoundingClientRect();
          attack.style.left = `${attackRect.left + velocityX}px`;
          attack.style.top = `${attackRect.top + velocityY}px`;

          // Check for collision with the cursor position
          const checkCollisionWithCursor = () => {
            // Get the current cursor position
            const cursorX = targetX;
            const cursorY = targetY;

            // Define a hit area around the cursor 
            const hitArea = 3;

            if (
              attackRect.left < cursorX + hitArea &&
              attackRect.right > cursorX - hitArea &&
              attackRect.top < cursorY + hitArea &&
              attackRect.bottom > cursorY - hitArea
            ) {
              attack.remove();
              console.log('Attack removed upon hitting the cursor');

              // Check if the TIE element still exists before incrementing hitCounter
              if (document.getElementById('TIE')) {
                hitCounter++; // Increment the hit counter
                console.log("you have been hit", hitCounter, "times");
                flashCursorBoxColor('red', 200);

                if (hitCounter === 20) {
                  const aboutH2 = document.getElementById('about_h');
                  aboutH2.textContent = 'Oh no! you are hit, try again :(';
                  aboutH2.style.fontSize = '2.5em';
                  setTimeout(() => {
                    location.reload(true); // Refresh the page
                  }, 2000);
                }
              }
            } else {
              requestAnimationFrame(checkCollisionWithCursor);
            }
          };

          requestAnimationFrame(checkCollisionWithCursor);
          
          setTimeout(() => {
            attack.remove();
          }, 2500);

          requestAnimationFrame(moveattack);

        } catch (error) {
          console.error("Error in moveattack function:", error);
          attack.remove(); // Ensure the attack is removed in case of an error
        }
      }
      requestAnimationFrame(moveattack);
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


const aboutSection = document.getElementById("about");
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
aboutSection.appendChild(cursorBox);

// Make the TIE follow the cursor and update the cursor box position
document.addEventListener(
  "mousemove",
  (ev) => {
    try {
      // Update the target position
      targetX = ev.clientX;
      targetY = ev.clientY;

      // Directly update the cursor box position to follow the cursor
      cursorBox.style.left = `${targetX + 12}px`; // Adjust the offset as needed
      cursorBox.style.top = `${targetY + 10}px`; // Adjust the offset as needed
    } catch (error) {
      console.error("Error in mousemove event listener:", error);
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
        f2.style.transform = `translate(${targetX + 100 + oscillation }px, ${targetY + oscillation}px) ${rotation}`;
        f3.style.transform = `translate(${targetX - 100 - oscillation}px, ${targetY + oscillation}px) ${rotation}`;

        requestAnimationFrame(animateTIE);
        }

        // Start the animation with a delay
        const delay = 1000; // Delay in milliseconds (e.g., 2000ms = 2 seconds)
        setTimeout(() => {
        requestAnimationFrame(animateTIE);
        }, delay);

// Function to shoot attacks towards the cursor
function shootattack() {
  if (!f) {
    console.log("TIE element not found, stopping attack creation.");
    return; // Stop if the TIE element is removed
  }

  try {
    const attack = document.createElement('div');
    const aboutSection = document.getElementById('about');
    attack.className = 'attack';
    const tieRect = f.getBoundingClientRect();
    attack.style.left = `${tieRect.left + tieRect.width / 2}px`;
    attack.style.top = `${tieRect.top + tieRect.height / 2}px`;
    attack.style.position = 'absolute';
    aboutSection.appendChild(attack);

    // Calculate the direction vector
    const dx = targetX - (tieRect.left + tieRect.width / 2);
    const dy = targetY - (tieRect.top + tieRect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const velocityX = (dx / distance) * 4; // Adjust the speed as needed
    const velocityY = (dy / distance) * 4; // Adjust the speed as needed

    // Animate the attack
    function moveattack() {
      try {
        const attackRect = attack.getBoundingClientRect();
        attack.style.left = `${attackRect.left + velocityX}px`;
        attack.style.top = `${attackRect.top + velocityY}px`;

        // Check for collision with the cursor box
        const checkCollisionWithCursorBox = () => {
          const cursorBoxRect = cursorBox.getBoundingClientRect();
          if (
            attackRect.left < cursorBoxRect.right &&
            attackRect.right > cursorBoxRect.left &&
            attackRect.top < cursorBoxRect.bottom &&
            attackRect.bottom > cursorBoxRect.top
          ) {
            attack.remove();
            console.log('Attack removed upon hitting the cursor box');

            // Check if the TIE element still exists before incrementing hitCounter
            if (document.getElementById('TIE')) {
                hitCounter++; // Increment the hit counter

                if (hitCounter === 10) {
                    const aboutH2 = document.getElementById('about_h');
                    aboutH2.textContent = 'Oh no! you are hit, try again :(';
                    aboutH2.style.fontSize='2.5em';
                    cursorBox.style.backgroundColor = 'red';
                    setTimeout(() => {
                        location.reload(true); // Refresh the page
                    }, 1000);
                }
            }
          } else {
            requestAnimationFrame(checkCollisionWithCursorBox);
          }
        };

        requestAnimationFrame(checkCollisionWithCursorBox);

        // Remove the attack if it goes off-screen
        if (
          attackRect.left < 0 ||
          attackRect.top < 0 ||
          attackRect.right > window.innerWidth ||
          attackRect.bottom > window.innerHeight
        ) {
          attack.remove();
        } else {
          requestAnimationFrame(moveattack);
        }
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

// Continuously shoot attacks at intervals
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

window.animateTIE = animateTIE;
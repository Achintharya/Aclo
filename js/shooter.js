function startShooting(){
    
  document.addEventListener('DOMContentLoaded', () => {
    const coolSection = document.getElementById('coolStuff');
    const aboutSection = document.getElementById('about')
    const aboutH = document.getElementById('about_h');
    const button = document.querySelector('.btn');
    const f = document.querySelector('.tie');
    const f2 = document.querySelector('.tie2');
    const f3 = document.querySelector('.tie3');
    let clickCount = 0;
    let shots = 0;
    const requiredShots = 5;
    const requiredClicks = 20; // Set the number of clicks required


    if (aboutSection && button) {
      aboutSection.addEventListener('click', (event) => {
        try {
          shootBullet(event, coolSection);
        } catch (error) {
          console.error('Error shooting bullet:', error);
        }
      });
    } else {
      console.error('about container or button not found');
    }

    function shootBullet(event, container) {
      try {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Check if the click is within the defined region
        if (y >= 500 && y<= 1000) {
          const bullet = document.createElement('div');
          bullet.className = 'bullet';
          bullet.style.left = `${x}px`;
          bullet.style.top = `${y}px`;
          bullet.style.position = 'absolute'; // Ensure the bullet is positioned absolutely
          container.appendChild(bullet);
          console.log(`Shooting bullet at (${x}, ${y}) within the allowed region`);

          // Check for collision with the button and TIE
          const checkCollision = () => {
            const bulletRect = bullet.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            const tieRect = f.getBoundingClientRect(); // Assuming 'f' is the TIE element

            if (
              (bulletRect.left < buttonRect.right &&
              bulletRect.right > buttonRect.left &&
              bulletRect.top < buttonRect.bottom &&
              bulletRect.bottom > buttonRect.top) ||
              (bulletRect.left < tieRect.right &&
              bulletRect.right > tieRect.left &&
              bulletRect.top < tieRect.bottom &&
              bulletRect.bottom > tieRect.top)
            ) {
              bullet.remove();

              if (
                bulletRect.left < buttonRect.right &&
                bulletRect.right > buttonRect.left &&
                bulletRect.top < buttonRect.bottom &&
                bulletRect.bottom > buttonRect.top
              ) {
                button.classList.add('hit'); // Add the 'hit' class to the button
                setTimeout(() => {
                  button.classList.remove('hit'); // Remove the 'hit' class after a short duration
                }, 500); // Adjust the duration as needed
                button.click(); // Programmatically trigger a click event on the button
              }

              if (
                bulletRect.left < tieRect.right &&
                bulletRect.right > tieRect.left &&
                bulletRect.top < tieRect.bottom &&
                bulletRect.bottom > tieRect.top
              ) 
            
              {
                shots++; // Increment the shots counter
                console.log(`Shots: ${shots}`);

                if (shots >= requiredShots) {
                  if (f) f.remove();
                  if (f2) f2.remove();
                  if (f3) f3.remove();
                }
              }
            } else {
              requestAnimationFrame(checkCollision);
            }
          };

          requestAnimationFrame(checkCollision);

          // Remove the bullet after the animation ends
          bullet.addEventListener('animationend', () => {
            bullet.remove();
          });
        } else {
          console.log('Click outside the allowed region, bullet not created');
        }
      } catch (error) {
        console.error('Error creating or animating bullet:', error);
      }
    }

    aboutH.textContent = `Hit the button ${requiredClicks} times to see some magic`

    function handleButtonClick() {
      clickCount++;
      console.log(`Button clicked ${clickCount} times`);

      // Simulate hover effect
      button.classList.add('hover');
      setTimeout(() => {
        button.classList.remove('hover');
      }, 200); // Adjust the duration as needed

    if (aboutH) {
      aboutH.textContent = `Hit the button ${requiredClicks} times to see some magic`
      aboutH.textContent = ` ${requiredClicks - clickCount} times to go`;
    }

      if (clickCount >= requiredClicks) {
        expandContainer(); // Call the global expandContainer function
        clickCount = 0; // Reset the counter if you want to allow multiple executions
      }
    }

    button.addEventListener('click', handleButtonClick);
  });
}

startShooting();
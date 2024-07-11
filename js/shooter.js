document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed for shooter');
  const aboutSection = document.getElementById('about');
  const button = document.querySelector('.btn');
  const f = document.querySelector('.tie');
  const f2 = document.querySelector('.tie2');
  const f3 = document.querySelector('.tie3');
  const attack = document.querySelector('.attack');
  let clickCount = 0;
  let shots = 0;
  const requiredShots = 5;
  const requiredClicks = 25; // Set the number of clicks required

  if (aboutSection && button) {
    console.log('about container and button found');
    aboutSection.addEventListener('click', (event) => {
      try {
        shootBullet(event, aboutSection);
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
      console.log(`Click at (${x}, ${y}) relative to container`);

      // Check if the click is within the defined region
      if (y >= 500 && y<= 1000) {
        console.log(`Shooting bullet at (${x}, ${y}) within the allowed region`);

        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.style.left = `${x}px`;
        bullet.style.top = `${y}px`;
        bullet.style.position = 'absolute'; // Ensure the bullet is positioned absolutely
        container.appendChild(bullet);
        console.log('Bullet created and appended to the container');

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
            console.log('Bullet removed upon hitting the button or TIE');

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
                f.remove(); 
                f2.remove();
                f3.remove();
                attack.remove();
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
          console.log('Bullet removed after animation');
        });
      } else {
        console.log('Click outside the allowed region, bullet not created');
      }
    } catch (error) {
      console.error('Error creating or animating bullet:', error);
    }
  }

  function handleButtonClick() {
    clickCount++;
    console.log(`Button clicked ${clickCount} times`);

    // Simulate hover effect
    button.classList.add('hover');
    setTimeout(() => {
      button.classList.remove('hover');
    }, 200); // Adjust the duration as needed

  const aboutH2 = document.getElementById('about_h');
  if (aboutH2) {
    aboutH2.textContent = ` ${25 - clickCount} times to go`;
  }

    if (clickCount >= requiredClicks) {
      expandContainer(); // Call the global expandContainer function
      clickCount = 0; // Reset the counter if you want to allow multiple executions
    }
  }

  button.addEventListener('click', handleButtonClick);
});
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed for shooter');
  const aboutSection = document.getElementById('about');
  const button = document.querySelector('.btn');
  let clickCount = 0;
  const requiredClicks = 2; // Set the number of clicks required

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

        // Check for collision with the button
        const checkCollision = () => {
          const bulletRect = bullet.getBoundingClientRect();
          const buttonRect = button.getBoundingClientRect();

          if (
            bulletRect.left < buttonRect.right &&
            bulletRect.right > buttonRect.left &&
            bulletRect.top < buttonRect.bottom &&
            bulletRect.bottom > buttonRect.top
          ) {
            bullet.remove();
            console.log('Bullet removed upon hitting the button');
            button.classList.add('hit'); // Add the 'hit' class to the button
            setTimeout(() => {
              button.classList.remove('hit'); // Remove the 'hit' class after a short duration
            }, 500); // Adjust the duration as needed
            button.click(); // Programmatically trigger a click event on the button
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

    if (clickCount >= requiredClicks) {
      expandContainer(); // Call the global expandContainer function
      clickCount = 0; // Reset the counter if you want to allow multiple executions
    }
  }

  button.addEventListener('click', handleButtonClick);
});
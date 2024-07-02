document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded again and parsed');
  const aboutSection = document.getElementById('about');

  if (aboutSection) {
    console.log('About section found');
    aboutSection.addEventListener('click', (event) => {
      try {
        shootBullet(event);
      } catch (error) {
        console.error('Error shooting bullet:', error);
      }
    });
  } else {
    console.error('About section not found');
  }

  function shootBullet(event) {
    try {
      const x = event.clientX;
      const y = event.clientY;
      const bullet = document.createElement('div');
      bullet.className = 'bullet';
      bullet.style.left = `${x}px`;
      bullet.style.top = `${y}px`;
      document.body.appendChild(bullet);
      console.log(`Shooting bullet at (${x}, ${y})`);
      // Remove the bullet after the animation ends
      bullet.addEventListener('animationend', () => {
        bullet.remove();
      });
    } catch (error) {
      console.error('Error creating or animating bullet:', error);
    }
  }
});

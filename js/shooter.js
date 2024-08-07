function startShooting() {
  document.addEventListener('DOMContentLoaded', () => {
    const coolSection = document.getElementById('coolStuff');
    const aboutSection = document.getElementById('about');
    const aboutH = document.getElementById('about_h');
    const button = document.querySelector('.btn');
    const f = document.querySelector('.tie');
    let clickCount = 0;
    let shots = 0;
    const requiredShots = 5;
    const requiredClicks = 12;
    let canShoot = true;

    if (aboutSection && button) {
      aboutSection.addEventListener('click', (event) => {
        if (canShoot) shootBullet(event, coolSection);
      });
    } else {
      console.error('about container or button not found');
    }

    function shootBullet(event, container) {
      canShoot = false;

      const rect = container.getBoundingClientRect();
      const cursorBoxRect = cursorBox.getBoundingClientRect();
      const x = cursorBoxRect.left + cursorBoxRect.width / 2 - rect.left;
      const y = cursorBoxRect.top + cursorBoxRect.height / 2 - rect.top;

      if (y < 300 || y > 1000) {
        resetShootCooldown();
        return;
      }

      const bullet = document.createElement('div');
      bullet.className = 'bullet';
      bullet.style.left = `${x}px`;
      bullet.style.top = `${y}px`;
      bullet.style.position = 'absolute';
      container.appendChild(bullet);

      const bulletSpeed = 7;

      function moveBullet() {
        bullet.style.top = `${parseFloat(bullet.style.top) - bulletSpeed}px`;
        if (parseFloat(bullet.style.top) > 0) {
          requestAnimationFrame(moveBullet);
        } else {
          bullet.remove();
        }
      }

      function checkCollision() {
        const bulletRect = bullet.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const tieRect = f.getBoundingClientRect();

        const buttonHit = checkHit(bulletRect, buttonRect);
        const tieHit = checkHit(bulletRect, tieRect);

        if (buttonHit) {
          bullet.remove();
          triggerButtonHit();
        }

        if (tieHit) {
          bullet.remove();
          shots++;
          if (shots >= requiredShots && f) {
            f.remove();
          }
        }

        if (!buttonHit && !tieHit) {
          requestAnimationFrame(checkCollision);
        }
      }

      requestAnimationFrame(moveBullet);
      requestAnimationFrame(checkCollision);

      bullet.addEventListener('animationend', () => bullet.remove());

      resetShootCooldown();
    }

    function checkHit(rect1, rect2) {
      return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      );
    }

    function triggerButtonHit() {
      button.classList.add('hit');
      setTimeout(() => button.classList.remove('hit'), 500);
      button.click();
    }

    function resetShootCooldown() {
      setTimeout(() => {
        canShoot = true;
      }, 150);
    }

    aboutH.textContent = `Hit the button ${requiredClicks} times to see some magic`;

    function handleButtonClick() {
      clickCount++;

      button.classList.add('hover');
      setTimeout(() => button.classList.remove('hover'), 200);

      if (aboutH) {
        aboutH.textContent = `${requiredClicks - clickCount} times to go`;
      }

      if (clickCount >= requiredClicks) {
        expandContainer();
        clickCount = 0;
      }
    }

    button.addEventListener('click', handleButtonClick);

    // Feature detection for requestAnimationFrame
    if (window.requestAnimationFrame) {
      window.addEventListener('scroll', function() {
        window.requestAnimationFrame(parallax);
      });
    } else {
      window.addEventListener('scroll', parallax);
    }

  });
}

startShooting();
const coolSection = document.getElementById('coolStuff');
const f = document.getElementById("TIE");
const f2 = document.getElementById("tie2");
const f3 = document.getElementById("tie3");

let targetX = 0;
let targetY = 0;
let startTime = null;
let hitCounter = 0;
let isMoving = false;
let cursorBoxVisible = false;

const cursorBox = document.createElement('div');
cursorBox.className = 'cursor-box';
coolSection.appendChild(cursorBox);

const lerpFactor = 0.04;
const attackSpeed = 8;
const attackIntervalTime = 850;
const cursorHitArea = 3;
const animationSpeed = 1250;
const animationAmplitude = 300;
const maxHits = 20;

function updateCursorBox() {
  const currentX = parseFloat(cursorBox.style.left) || 0;
  const currentY = parseFloat(cursorBox.style.top) || 0;

  const newX = currentX + (targetX - currentX) * lerpFactor;
  const newY = currentY + (targetY - currentY) * lerpFactor;

  cursorBox.style.left = `${newX}px`;
  cursorBox.style.top = `${newY}px`;

  if (Math.abs(newX - targetX) > 0.5 || Math.abs(newY - targetY) > 0.5) {
    requestAnimationFrame(updateCursorBox);
  } else {
    isMoving = false;
  }
}

// Throttle function to limit the rate at which the updateCursorBox function is called
function throttle(fn, wait) {
  let lastTime = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastTime >= wait) {
      lastTime = now;
      return fn(...args);
    }
  };
}

coolSection.addEventListener("mousemove", throttle((ev) => {
  targetX = ev.clientX;
  targetY = ev.clientY;

  if (!isMoving) {
    isMoving = true;
    requestAnimationFrame(updateCursorBox);
  }
}, 16)); // Throttle to approximately 60fps

function animateTIE(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;

  const oscillation = Math.sin(elapsed / animationSpeed) * animationAmplitude;
  const rotation = targetY > window.innerHeight / 2 ? 'rotate(180deg)' : 'rotate(720deg)';

  f.style.transform = `translate(${targetX + oscillation}px, ${targetY - 100}px) ${rotation}`;
  f2.style.transform = `translate(${targetX + 100 + oscillation}px, ${targetY - 50 + oscillation}px) ${rotation}`;
  f3.style.transform = `translate(${targetX - 100 - oscillation}px, ${targetY + 50 + oscillation}px) ${rotation}`;

  requestAnimationFrame(animateTIE);
}

setTimeout(() => {
  requestAnimationFrame(animateTIE);
}, 1000);

function shootattack() {
  if (!f || !cursorBoxVisible) return;

  const attack = document.createElement('div');
  attack.className = 'attack';
  attack.style.position = 'absolute';
  coolSection.appendChild(attack);

  const tieRect = f.getBoundingClientRect();
  attack.style.left = `${tieRect.left + tieRect.width / 2}px`;
  attack.style.top = `${tieRect.top + tieRect.height / 2}px`;

  const cursorBoxRect = cursorBox.getBoundingClientRect();
  const cursorX = cursorBoxRect.left + cursorBoxRect.width / 2;
  const cursorY = cursorBoxRect.top + cursorBoxRect.height / 2;
  const dx = cursorX - (tieRect.left + tieRect.width / 2);
  const dy = cursorY - (tieRect.top + tieRect.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);
  const velocityX = distance > 0 ? (dx / distance) * attackSpeed : 0;
  const velocityY = distance > 0 ? (dy / distance) * attackSpeed : 0;

  function moveattack() {
    const attackRect = attack.getBoundingClientRect();
    attack.style.left = `${attackRect.left + velocityX}px`;
    attack.style.top = `${attackRect.top + velocityY}px`;

    if (
      attackRect.left < cursorX + cursorHitArea &&
      attackRect.right > cursorX - cursorHitArea &&
      attackRect.top < cursorY + cursorHitArea &&
      attackRect.bottom > cursorY - cursorHitArea
    ) {
      attack.remove();
      hitCounter++;
      flashCursorBoxColor('red', 200);
      if (hitCounter === maxHits) {
        const aboutH2 = document.getElementById('about_h');
        aboutH2.textContent = 'Oh no! you are hit, try again :(';
        aboutH2.style.fontSize = '2.5vw';
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } else {
      requestAnimationFrame(moveattack);
    }
  }

  requestAnimationFrame(moveattack);
  setTimeout(() => attack.remove(), 2500);
}

function startAttack() {
  const attackInterval = setInterval(() => {
    if (!document.getElementById('TIE')) {
      clearInterval(attackInterval);
      return;
    }
    if (targetX >= 0 && targetX <= window.innerWidth && targetY >= 0 && targetY <= window.innerHeight) {
      shootattack();
    }
  }, attackIntervalTime);
}

function flashCursorBoxColor(color, duration) {
  const originalColor = cursorBox.style.backgroundColor;
  cursorBox.style.backgroundColor = color;
  setTimeout(() => {
    cursorBox.style.backgroundColor = originalColor;
  }, duration);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    cursorBoxVisible = entry.isIntersecting;
  });
});

observer.observe(cursorBox);

// Feature detection for requestAnimationFrame
if (window.requestAnimationFrame) {
  window.addEventListener('scroll', function() {
    window.requestAnimationFrame(updateCursorBox);
  });
} else {
  window.addEventListener('scroll', updateCursorBox);
}
// Scroll to the top of the page on refresh
window.onload = function() {
  window.scrollTo(0, 0); // Scroll to the top-left corner of the page
};

function parallax() {
  const bg = document.getElementById("Home");
  const moon = document.getElementById("moon");

  if (bg && moon) {
    bg.style.top = window.scrollY * 0.5 + 'px';
    moon.style.left = (window.innerHeight / 2) + window.scrollY * 0.5 + 'px';
    moon.style.backgroundSize = (35 - window.scrollY * 0.05) + '%';

    if (window.innerWidth <= 768) {
      moon.style.top = '40%';
      moon.style.left = window.scrollY * 0.5 + 'px';
      moon.style.width = '150vw';
    }
  }
}

function stopParallax() {
  const bg = document.getElementById("Home");
  const moon = document.getElementById("moon");

  if (bg && moon) {
    bg.style.top = '0%';
    moon.style.backgroundSize = '1%';
    bg.scrollIntoView({ behavior: 'smooth' });
  }
}

// Throttle function to limit the rate at which the parallax function is called
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

// Feature detection for requestAnimationFrame
if (window.requestAnimationFrame) {
  window.addEventListener('scroll', throttle(function() {
    window.requestAnimationFrame(parallax);
  }, 16)); // Throttle to approximately 60fps
} else {
  window.addEventListener('scroll', throttle(parallax, 16));
}

const nav_header = document.getElementById("navLink");
nav_header.querySelector('a[href="#Home"]').addEventListener('click', function () {
  stopParallax();
});
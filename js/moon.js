const bg = document.getElementById("Home");
const moon = document.getElementById("moon");
const navLinks = document.querySelectorAll("#navLink li a");
const inPos = window.innerHeight / 2;

window.addEventListener('scroll', function () {
var value = window.scrollY;
bg.style.top = value * 0.5 + 'px';
moon.style.left = inPos + value * 0.5 + 'px'; // Move to the right
moon.style.backgroundSize = (40 - value * 0.05) + '%'; // Get smaller
})


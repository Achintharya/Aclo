// Scroll to the top of the page on refresh
window.onload = function() {
  window.scrollTo(0, 0); // Scroll to the top-left corner of the page
};

function parallax(){
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

function stopParallax(){
  const bg = document.getElementById("Home");
  const moon = document.getElementById("moon");

  if (bg && moon) {
    bg.style.top = '0%';
    moon.style.backgroundSize = '1%';
    bg.scrollIntoView({ behavior: 'smooth' });
  }
}

window.addEventListener('scroll', parallax);

const nav_header = document.getElementById("navLink");
nav_header.querySelector('a[href="#Home"]').addEventListener('click', function () {
  stopParallax();
});
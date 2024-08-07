// Scroll to the top of the page on refresh
window.onload = function() {
  window.scrollTo(0, 0); // Scroll to the top-left corner of the page
};

function parallax(){
  const bg = document.getElementById("Home");
  const moon = document.getElementById("moon"); // Ensure 'moon' is defined
  const inPos = window.innerHeight / 2;
  var value = window.scrollY;

  // Check if bg and moon are defined
  if (bg && moon) {
    bg.style.top = value * 0.5 + 'px'; // Parallax effect for bg
    moon.style.left = inPos + value * 0.5 + 'px'; // Move to the right
    moon.style.backgroundSize = (35 - value * 0.05) + '%'; // Get smaller

    // Adjust moon position and size for responsiveness
    if (window.innerWidth <= 768) {
      moon.style.top = '40%';
      moon.style.left = value * 0.5 + 'px'; // Move to the right
      moon.style.width = '150vw';
    }
  }
}

window.addEventListener('scroll',parallax);

function stopParallax(){
  const bg = document.getElementById("Home");
  const moon = document.getElementById("moon"); // Ensure 'moon' is defined

    if (bg && moon) {
      bg.style.top = '0%'; // Reset background position
      moon.style.backgroundSize = '1%'; // Reset moon size
      bg.scrollIntoView({
        behavior: 'smooth'
      })
  }

}

const nav_header = document.getElementById("navLink");
nav_header.querySelector('a[href="#Home"]').addEventListener('click', function () {
  console.log("Home link clicked"); // Debug log
  stopParallax();
});

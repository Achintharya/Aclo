const bg = document.getElementById("Home");
const moon = document.getElementById("moon");
const comet = document.getElementById("comet");
const navLinks = document.querySelectorAll("#navLink li a");
const inPos = window.innerHeight / 2;

window.addEventListener('scroll', function () {
var value = window.scrollY;
bg.style.top = value * 0.5 + 'px';
moon.style.left = inPos + value * 0.5 + 'px'; // Move to the right
moon.style.backgroundSize = (40 - value * 0.05) + '%'; // Get smaller
comet.style.left = inPos + 320 - value * 0.5 + 'px'; // Move to the right
comet.style.backgroundSize = (40 - value * 0.5) + '%'; // Get smaller
})



// Add a click event listener to each navigation link
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {

    // Hide the "moon" element
    moon.style.display = "none";
    comet.style.display = "none";

    // Get the target section ID from the link's href attribute
    const targetId = event.target.getAttribute("href");

    // Get the target section element
    const targetSection = document.querySelector(targetId);


    // Show the target section
    targetSection.style.display = "grid";

    // If the target section is the "Home" section, show the "moon" element
    if (targetId === "#Home") {
      moon.style.display = "grid";
    }
  });
});

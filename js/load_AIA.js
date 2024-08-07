document.addEventListener('DOMContentLoaded', () => {
  // Input text event listener
  const inputText = document.getElementById('inputText');
  if (inputText) {
    inputText.addEventListener('keypress', window.handleInput);
  } else {
    console.error("Input text not found");
  }

  // Scroll animation for #about section
  const aboutSection = document.getElementById('about');
  function handleScroll() {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight) {
      aboutSection.classList.add('visible');
    } else {
      aboutSection.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check if the section is already in view on page load

  // Star animation setup
  const starContainer = document.querySelector('#about_stars');
  const starCounts = [250, 50, 50, 300]; // Number of stars for each background
  const starClasses = ['star-bg1', 'star-bg2', 'star-bg3', 'star-bg4'];

  starCounts.forEach((count, index) => {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.classList.add(starClasses[index]);
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      starContainer.appendChild(star);
    }
  });

  // Toggle switch functionality
  const toggleSwitch = document.querySelector('.bb8-toggle__checkbox');
  toggleSwitch.addEventListener("change", function() {
    const boring = document.getElementById("just_text");
    const cool = document.getElementById("coolStuff");
    const Pageswitch = document.getElementById("switchPage");
    const fun = document.getElementById("funTime");

    if (this.checked) {
      boring.style.display = "none";
      cool.style.display = "grid"; // Show coolStuff
      fun.style.display = "none";
      setTimeout(() => {
        Pageswitch.style.opacity = 0.2;
      }, 1000); // Delay of 1 second

      startAttack();
      startShooting();
      this.setAttribute("aria-checked", "true"); // Update aria attribute
    } else {
      boring.style.display = "grid"; // Show just_text
      fun.style.display = "flex";
      cool.style.display = "none"; // Hide coolStuff
      Pageswitch.style.opacity = 1;
      this.setAttribute("aria-checked", "false"); // Update aria attribute
    }
  });

});

// Loader stop function
function stop_loader() {
  const loader = document.getElementById('loader_container');
  if (loader) {
    loader.classList.add('dead');
  }
}
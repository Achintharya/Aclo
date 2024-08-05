document.addEventListener('DOMContentLoaded', () => {
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
});

  document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.querySelector('#about_stars');
    const star1Count = 250; // Number of stars in bg 1
    const star2Count = 50; // Number of stars in bg 2
    const star3Count = 50; // Number of stars in bg 3
    const star4Count = 300; // Number of stars in bg 4

    for (let i = 0; i < star1Count; i++) {
      const star1 = document.createElement('div');
      star1.classList.add('star-bg1');
      star1.style.top = `${Math.random() * 100}%`;
      star1.style.left = `${Math.random() * 100}%`;
      starContainer.appendChild(star1);
    }

    for (let i = 0; i < star2Count; i++) {
      const star2 = document.createElement('div');
      star2.classList.add('star-bg2');
      star2.style.top = `${Math.random() * 100}%`;
      star2.style.left = `${Math.random() * 100}%`;
      starContainer.appendChild(star2);
    }

    for (let i = 0; i < star3Count; i++) {
      const star3 = document.createElement('div');
      star3.classList.add('star-bg3');
      star3.style.top = `${Math.random() * 100}%`;
      star3.style.left = `${Math.random() * 100}%`;
      starContainer.appendChild(star3);
    }

    for (let i = 0; i < star4Count; i++) {
      const star4 = document.createElement('div');
      star4.classList.add('star-bg4');
      star4.style.top = `${Math.random() * 100}%`;
      star4.style.left = `${Math.random() * 100}%`;
      starContainer.appendChild(star4);
    }
  });

// Get the toggle switch input element
const toggleSwitch = document.querySelector('.bb8-toggle__checkbox');

// Function to check the state of the toggle switch
function checkToggleState() {
    if (toggleSwitch.checked) {
        console.log("cool stuff only");
    } else {
        console.log("Toggle switch is OFF");
    }
}

// Event listener for the toggle switch
toggleSwitch.addEventListener("change", function() {
    const boring = document.getElementById("just_text");
    const cool = document.getElementById("coolStuff");
    const Pageswitch = document.getElementById("switchPage")

    if (this.checked) {
        // Hide main content and show game content
        boring.style.display = "none";
        cool.style.display = "grid"; // Show coolStuff
        setTimeout(() => {
            Pageswitch.style.opacity = 0.2;
        }, 1000); // Delay of 1 second

        startAttack();
        startShooting();
        this.setAttribute("aria-checked", "true"); // Update aria attribute
    } else {
        // Show main content and hide game content
        console.log("boring stuff only");
        boring.style.display = "grid"; // Show just_text
        cool.style.display = "none"; // Hide coolStuff
        Pageswitch.style.opacity=1;
        this.setAttribute("aria-checked", "false"); // Update aria attribute
    }

    // Check the toggle state after changing visibility
    checkToggleState(); // Log the current state of the toggle switch
});

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  const button = document.querySelector('.btn');
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
    const homeSection = document.getElementById('Home');

    // Adjust the threshold value as needed
    const threshold = 100;


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
    const star2Count = 70; // Number of stars in bg 2
    const star3Count = 50; // Number of stars in bg 3

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
  });

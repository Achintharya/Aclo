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
  const homeSection = document.getElementById('Home');  

  function handleScroll() {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const homeSection = document.getElementById('Home');
    const scrollPosition = window.scrollY;

    // Adjust the threshold value as needed
    const threshold = 100;

    if (scrollPosition > threshold) {
      homeSection.classList.add('zoom');
    } else {
      homeSection.classList.remove('zoom');
    }

    if (sectionTop < windowHeight) {
      homeSection.classList.add('hide');
      aboutSection.classList.add('visible');

    } else {
      homeSection.classList.remove('hide');
      aboutSection.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check if the section is already in view on page load
});

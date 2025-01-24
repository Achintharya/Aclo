document.addEventListener('DOMContentLoaded', () => {
  // Cache elements
  const inputText = document.getElementById('inputText');
  const aboutSection = document.getElementById('about');
  const starContainer = document.querySelector('#about_stars');


// Scroll animation for #about section
if (aboutSection) {
  const handleScroll = () => {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight) {
      aboutSection.classList.add('visible');
    } else {
      aboutSection.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check if the section is already in view on page load

  const observerOptions = { root: null, threshold: 0.75 };

  const observerCallback = (entries) => {
    // Check if the screen width is less than 768px
    if (window.innerWidth < 768) {
      return; // Do nothing if the screen width is less than 768px
    }

    else {entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.scrollTo({
          top: aboutSection.offsetTop,
          left: aboutSection.offsetLeft,
          behavior: 'smooth'
        });
      }
    });
  };}

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(aboutSection);


} else {
  console.error("About section not found");
}


  // Input text event listener
  if (inputText) {
    inputText.addEventListener('keypress', window.handleInput);
  } else {
    console.error("Input text not found");
  }

  // Star animation setup
  if (starContainer) {
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
  } else {
    console.error("Star container not found");
  }


// Select all elements with the classes .obj1, .obj2, and .obj3
document.querySelectorAll('.obj1, .obj2, .obj3').forEach(function(element) {
  // Add an event listener for both touchstart and click events
  element.addEventListener('touchstart', function() {
    this.classList.toggle('hover-effect');
  });
  element.addEventListener('click', function() {
    this.classList.toggle('hover-effect');
  });
});
});


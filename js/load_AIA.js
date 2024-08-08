document.addEventListener('DOMContentLoaded', () => {
  // Cache elements
  const inputText = document.getElementById('inputText');
  const aboutSection = document.getElementById('about');
  const starContainer = document.querySelector('#about_stars');
  const toggleSwitch = document.querySelector('.bb8-toggle__checkbox');
  const boring = document.getElementById("just_text");
  const cool = document.getElementById("coolStuff");
  const Pageswitch = document.getElementById("switchPage");
  const fun = document.getElementById("funTime");
  const arrow = document.getElementById("arrow");

  // Input text event listener
  if (inputText) {
    inputText.addEventListener('keypress', window.handleInput);
  } else {
    console.error("Input text not found");
  }

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

    // IntersectionObserver to scroll #about into view when 50% visible
    const observerOptions = { root: null, threshold: 0.6 };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.scrollTo({
            top: aboutSection.offsetTop,
            left: aboutSection.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(aboutSection);
  } else {
    console.error("About section not found");
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

  // Toggle switch functionality
  if (toggleSwitch && boring && cool && Pageswitch && fun) {
    toggleSwitch.addEventListener("change", function() {
      if (this.checked) {
        boring.style.display = "none";
        cool.style.display = "grid"; 
        fun.style.display = "none";
        arrow.style.display="none"
        setTimeout(() => {
          Pageswitch.style.opacity = 0.2;
        }, 1000); // Delay of 1 second

        startAttack();
        startShooting();
        this.setAttribute("aria-checked", "true"); // Update aria attribute
      } else {
        boring.style.display = "flex";
        fun.style.display = "flex";
        arrow.style.display="block"
        cool.style.display = "none"; 
        Pageswitch.style.opacity = 1;
        this.setAttribute("aria-checked", "false"); // Update aria attribute
      }
    });
  } else {
    console.error("Toggle switch or related elements not found");
  }
});

// Loader stop function
function stop_loader() {
  const loader = document.getElementById('loader_container');
  if (loader) {
    loader.classList.add('dead');
  } else {
    console.error("Loader not found");
  }
}


document.querySelectorAll('.obj1, .obj2, .obj3').addEventListener('touchstart', function() {
  this.classList.toggle('hover-effect');
});

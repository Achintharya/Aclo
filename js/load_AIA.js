document.addEventListener('DOMContentLoaded', () => {
  // Cache elements
  const inputText = document.getElementById('inputText');
  const aboutSection = document.getElementById('about');
  const starContainer = document.querySelector('#about_stars');
  const cool = document.getElementById("coolStuff");
  const fun = document.getElementById("funTime");


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



// Loader stop function
function stop_loader() {
  const loader = document.getElementById('loader_container');
  if (loader) {
    loader.classList.add('dead');
  } else {
    console.error("Loader not found");
  }
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
}

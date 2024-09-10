document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const slideImages = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.controls .prev');
    const nextButton = document.querySelector('.controls .next');
    let currentIndex = 0;
  
    function updateSlider() {
      const offset = -currentIndex * 100;
      slides.style.transform = `translateX(${offset}%)`;
    }
  
    nextButton.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % slideImages.length;
      updateSlider();
    });
  
    prevButton.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
      updateSlider();
    });
  
    // Initialize slider
    updateSlider();
  });
  
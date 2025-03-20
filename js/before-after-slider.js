document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.before-after-slider');
  const beforeImage = document.querySelector('.before-image');
  const afterImageContainer = document.querySelector('.after-image-container');
  const sliderLine = document.querySelector('.slider-line');
  const sliderButton = document.querySelector('.slider-button');

  let isResizing = false;

  // Fonction pour mettre à jour la position du slider
  function updateSliderPosition(x) {
    const bounds = slider.getBoundingClientRect();
    let position = (x - bounds.left) / bounds.width;
    
    // Limiter la position entre 0 et 1
    position = Math.max(0, Math.min(1, position));
    
    // Convertir en pourcentage
    const percentage = position * 100;
    
    // Mettre à jour les positions
    beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    afterImageContainer.style.left = `${percentage}%`;
    sliderLine.style.left = `${percentage}%`;
    sliderButton.style.left = `${percentage}%`;
  }

  // Gestionnaires d'événements pour la souris
  sliderButton.addEventListener('mousedown', function(e) {
    isResizing = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    updateSliderPosition(e.pageX);
  });

  document.addEventListener('mouseup', function() {
    isResizing = false;
  });

  // Gestionnaires d'événements pour le tactile
  sliderButton.addEventListener('touchstart', function(e) {
    isResizing = true;
    e.preventDefault();
  });

  document.addEventListener('touchmove', function(e) {
    if (!isResizing) return;
    updateSliderPosition(e.touches[0].pageX);
  });

  document.addEventListener('touchend', function() {
    isResizing = false;
  });
});
/**
 * Vitalia - Centre d'Amincissement
 * Before-After Comparison Slider
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initBeforeAfterSliders();
});

/**
 * Initialize all before-after comparison sliders on the page
 */
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll(".before-after-slider");

  if (sliders.length === 0) return; // Exit if no sliders found

  sliders.forEach((slider) => {
    setupSlider(slider);
  });
}

/**
 * Set up an individual slider
 * @param {HTMLElement} sliderContainer - The slider container element
 */
function setupSlider(sliderContainer) {
  const sliderHandle = sliderContainer.querySelector(".slider-handle");
  const beforeImage = sliderContainer.querySelector(".before-image");
  const afterImageContainer = sliderContainer.querySelector(
    ".after-image-container"
  );

  if (!sliderHandle || !beforeImage || !afterImageContainer) return;

  // Set initial position (50%)
  let sliderPosition = 50;
  updateSliderPosition(
    sliderPosition,
    beforeImage,
    afterImageContainer,
    sliderHandle
  );

  // Mouse events
  sliderHandle.addEventListener("mousedown", startDragging);

  // Touch events for mobile
  sliderHandle.addEventListener("touchstart", startDragging, { passive: true });

  // Functions to handle dragging
  function startDragging(e) {
    e.preventDefault();
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag, { passive: true });
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchend", stopDragging);

    // Add active class to slider
    sliderContainer.classList.add("active");
  }

  function drag(e) {
    let clientX;

    // Handle both mouse and touch events
    if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    // Calculate slider position based on container bounds
    const rect = sliderContainer.getBoundingClientRect();
    let newPosition = ((clientX - rect.left) / rect.width) * 100;

    // Constrain to 0-100%
    newPosition = Math.max(0, Math.min(newPosition, 100));

    // Update slider position
    sliderPosition = newPosition;
    updateSliderPosition(
      sliderPosition,
      beforeImage,
      afterImageContainer,
      sliderHandle
    );
  }

  function stopDragging() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("touchend", stopDragging);

    // Remove active class from slider
    sliderContainer.classList.remove("active");
  }

  // Allow clicking/tapping anywhere on the slider to move the handle
  sliderContainer.addEventListener("click", function (e) {
    // Ignore if clicking on the handle
    if (e.target === sliderHandle) return;

    const rect = sliderContainer.getBoundingClientRect();
    let newPosition = ((e.clientX - rect.left) / rect.width) * 100;

    // Constrain to 0-100%
    newPosition = Math.max(0, Math.min(newPosition, 100));

    // Update slider position
    sliderPosition = newPosition;
    updateSliderPosition(
      sliderPosition,
      beforeImage,
      afterImageContainer,
      sliderHandle
    );
  });

  // Add keyboard accessibility
  sliderContainer.setAttribute("tabindex", "0");
  sliderContainer.addEventListener("keydown", function (e) {
    let newPosition = sliderPosition;

    // Left/right arrows adjust by 5%
    if (e.key === "ArrowLeft") {
      newPosition = Math.max(0, sliderPosition - 5);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      newPosition = Math.min(100, sliderPosition + 5);
      e.preventDefault();
    }

    // Update if position changed
    if (newPosition !== sliderPosition) {
      sliderPosition = newPosition;
      updateSliderPosition(
        sliderPosition,
        beforeImage,
        afterImageContainer,
        sliderHandle
      );
    }
  });
}

/**
 * Update the slider position
 * @param {number} position - The position percentage (0-100)
 * @param {HTMLElement} beforeImage - The before image element
 * @param {HTMLElement} afterImageContainer - The container for the after image
 * @param {HTMLElement} handle - The slider handle element
 */
function updateSliderPosition(
  position,
  beforeImage,
  afterImageContainer,
  handle
) {
  // Update the clip path for the before image
  beforeImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;

  // Update the position of the handle
  handle.style.left = `${position}%`;

  // Update the width of the after image container
  afterImageContainer.style.width = `${position}%`;

  // Update ARIA values for accessibility
  handle.setAttribute("aria-valuenow", position);
}

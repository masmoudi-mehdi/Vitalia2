document.addEventListener("DOMContentLoaded", () => {
  const durationFilter = document.getElementById("duration-filter");
  const typeFilter = document.getElementById("type-filter");
  const transformationCards = document.querySelectorAll(".col-lg-6");

  function filterTransformations() {
    const selectedDuration = durationFilter.value;
    const selectedType = typeFilter.value;

    transformationCards.forEach((card) => {
      const duration = card.dataset.duration;
      const type = card.dataset.type;

      const durationMatch =
        selectedDuration === "all" || duration === selectedDuration;
      const typeMatch = selectedType === "all" || type === selectedType;

      if (durationMatch && typeMatch) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  }

  // Add event listeners to filters
  durationFilter.addEventListener("change", filterTransformations);
  typeFilter.addEventListener("change", filterTransformations);

  // Initialize AOS
  filterTransformations();

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

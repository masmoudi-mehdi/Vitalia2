const slider = document.getElementById("slider");
const afterImage = document.querySelector(".after-image");

slider.addEventListener("input", function () {
  const value = this.value;
  afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
});

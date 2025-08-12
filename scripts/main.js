import "./certifications-slider.js";
import "./Supplements-slider.js";
import "./results-slider.js";
import "./contact.js";
const burger = document.querySelector(".burger-menu");
const closeBtn = document.querySelector(".close-menu");
const nav = document.querySelector(".main-nav");

// BURGER MENU TOGGLE
burger.addEventListener("click", () => {
  nav.classList.toggle("active");
  const isOpen = nav.classList.contains("active");
  burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("active");
  burger.setAttribute("aria-expanded", "false");
});

document.addEventListener("click", (e) => {
  if (
    !nav.contains(e.target) &&
    !burger.contains(e.target) &&
    nav.classList.contains("active")
  ) {
    nav.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
  }
});

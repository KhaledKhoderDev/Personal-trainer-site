import "./certifications-slider.js";
import "./Supplements-slider.js";
import "./results-slider.js";
import "./contact.js";
const burger = document.querySelector(".burger-menu");
const closeBtn = document.querySelector(".close-menu");
const nav = document.querySelector(".main-nav");
const arabicBtns = document.querySelectorAll(".arabic-btn");
const englishBtns = document.querySelectorAll(".english-btn");

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

// LANGUAGE SWITCHING
const setLanguage = (lang, dir) => {
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
  arabicBtns.forEach((btn) => {
    btn.classList.toggle("active", lang == "ar");
    btn.setAttribute("aria-current", lang == "ar" ? "true" : "false");
  });
  englishBtns.forEach((btn) => {
    btn.classList.toggle("active", lang == "en");
    btn.setAttribute("aria-current", lang == "en" ? "true" : "false");
  });
};

arabicBtns.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage("ar", "rtl"));
});

englishBtns.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage("en", "ltr"));
});

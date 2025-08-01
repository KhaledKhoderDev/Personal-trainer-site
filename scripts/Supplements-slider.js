// Import Swiper modules
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination } from "swiper/modules";

// Initialize supplements swiper
const supplementsSwiper = new Swiper(".supplements-swiper", {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  rtl: true,
  speed: 800,
  effect: "slide",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
  },

  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 35,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 35,
    },
  },
  // Events
  on: {
    init: function () {
      console.log("Supplements Swiper initialized");
    },
    slideChange: function () {
      this.slides.forEach((slide, index) => {
        if (index === this.activeIndex) {
          slide.style.transform = "scale(1)";
        } else {
          slide.style.transform = "scale(0.95)";
        }
      });
    },
  },
});

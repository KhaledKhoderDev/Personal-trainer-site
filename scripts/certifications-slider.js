import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { Navigation, Pagination } from "swiper/modules";

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close-modal");

const swiper = new Swiper(".mySwiper", {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  rtl: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  breakpoints: {
    480: { slidesPerView: 1, spaceBetween: 20 },
    640: { slidesPerView: 1, spaceBetween: 25 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 35 },
    1200: { slidesPerView: 4, spaceBetween: 30 },
    1440: {
      slidesPerView: 5,
      spaceBetween: 35,
    },
  },
});

// Modal functionality
function openModal(imageSrc) {
  modal.style.display = "block";
  modalImg.src = imageSrc;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

closeBtn.onclick = closeModal;
modal.onclick = (e) => e.target === modal && closeModal();
document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());
window.openModal = openModal;

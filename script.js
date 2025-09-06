

const menuBtn = document.querySelector(".menu-icon"); 
const nav = document.querySelector(".responsive-nav");
const closeBtn = document.querySelector(".close");

menuBtn.addEventListener("click", () => {
  nav.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("active");
});


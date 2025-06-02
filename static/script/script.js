// === Menu ===
let menuOpened = false
function menuFunction() {
    const menu = document.querySelector(".menu-section")
    if (menuOpened === false) {
      menu.style.transform = "translateY(0%)"
      menuOpened = !menuOpened
    } else {
      menu.style.transform = "translateY(-100%)"
      menuOpened = !menuOpened
    }
}

// === Accordion ===
let accordion_list = document.querySelectorAll("#accordion-list .item");
accordion_list.forEach((item) => {
    item.addEventListener("click", function () {
        item.classList.toggle("active");
        accordion_list.forEach(el => {
            if (el !== item) el.classList.remove("active");
        });
    });
});

// === Lenis Scroll ===
document.addEventListener("DOMContentLoaded", () => {
  const services = document.querySelectorAll("#container-scroll-service .service");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  services.forEach(service => observer.observe(service));
});

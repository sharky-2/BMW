// === Menu ===
let menuOpened = false
function menuFunction() {
    const menu = document.querySelector(".menu-section")
    if (menuOpened === false) {
        menu.style.height = "100vh"
        menuOpened = !menuOpened
    } else {
        menu.style.height = "0vh"
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
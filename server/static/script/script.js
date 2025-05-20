// =================================================
// Card slide show
let currentIndex = 0;
const cards = document.querySelectorAll('.card');
const track = document.querySelector('.card-slider-track');

function showNextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    const offset = currentIndex * (cards[0].offsetWidth + 100);
    track.style.transform = `translateX(-${offset}px)`;
}

setInterval(showNextSlide, 3000);

// =================================================
// Accordion
let accordion_list = document.querySelectorAll("#accordion-list .item")
accordion_list.forEach(item => {
    item.addEventListener("click", function() {
        if (item.classList.contains("active")) {
            item.classList.remove("active")
        } else {
            accordion_list.forEach(el => el.classList.remove("active"))
            item.classList.add("active")
        } 
    })
})

// =================================================
// Dropdown
function toggleDropdown_Projects() {
    const dropdown = document.querySelector(".dropdown_projects")
    dropdown.classList.toggle("show")
}
function toggleDropdown_Other() {
    const dropdown = document.querySelector(".dropdown_other")
    dropdown.classList.toggle("show")
}

// ===============================================================
// Auto resize textarea of chat
const textarea = document.getElementById("message-input")
function autoResize() {
  textarea.style.height = 'auto'; 
  textarea.style.height = (textarea.scrollHeight) + 'px';
}
function resetHeight() {
  textarea.style.height = "auto"
}
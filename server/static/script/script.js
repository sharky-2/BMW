let currentIndex = 0;
const cards = document.querySelectorAll('.card');
const track = document.querySelector('.card-slider-track');

function showNextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    const offset = currentIndex * (cards[0].offsetWidth + 100);
    track.style.transform = `translateX(-${offset}px)`;
}

setInterval(showNextSlide, 3000);
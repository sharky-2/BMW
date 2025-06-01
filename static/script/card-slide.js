gsap.registerPlugin(CustomEase);
CustomEase.create("cubic", "M0,0 C0.83,0 0,0.17 1,1");
let isAnimating = false;

function splitTextIntoSpans(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const text = el.textContent;
    const split = text.split('').map(char => `<span>${char === ' ' ? '&nbsp;' : char}</span>`).join('');
    el.innerHTML = split;
  });
}

function initializeCards() {
  const cards = [...document.querySelectorAll('.card')];
  gsap.set(cards, {
    yPercent: (i) => -10 * (cards.length - 1 - i),
    z: (i) => 5 * i,  
  });
}

function setupInitialAnimation() {
  gsap.set("h1 span", { y: -200 });
  gsap.set(".slider .card:last-child h1 span", { y: 0 });
}

document.addEventListener('DOMContentLoaded', () => {
  splitTextIntoSpans(".copy h1");
  initializeCards();
  setupInitialAnimation();
});

document.querySelector(".slider").addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  const slider = document.querySelector(".slider");
  const cards = [...slider.querySelectorAll(".card")];
  const lastCard = cards.pop();

  gsap.to(lastCard.querySelectorAll("h1 span"), {
    y: 200,
    duration: 0.75,
    ease: "cubic",
  });

  gsap.to(lastCard, {
    yPercent: 150,
    duration: 0.75,
    ease: "cubic",
    onComplete: () => {
      slider.prepend(lastCard);
      gsap.set(lastCard, { yPercent: -8 * (cards.length), z: 0 });

      const updatedCards = [...slider.querySelectorAll('.card')];
      updatedCards.forEach((card, i) => {
        gsap.to(card, {
          z: 5 * i, 
          yPercent: -10 * (updatedCards.length - 1 - i),
          duration: 0.75,
          ease: "cubic",
        });
      });

      const newFrontCard = slider.querySelector(".card:last-child");
      gsap.to(newFrontCard.querySelectorAll("h1 span"), {
        y: 0,
        duration: 0.75,
        ease: "cubic"
      });

      isAnimating = false;
    }
  });
});

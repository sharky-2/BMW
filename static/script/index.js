document.addEventListener("DOMContentLoaded", function () {

  // === LANDING PAGE ANIMATIONS ===
  const textWrapper = document.querySelector(".title");
  if (textWrapper) {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline().add({
      targets: ".title .letter",
      translateY: [100, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => 4800 + 40 * i,
    });
  }

  TweenMax.to(".box", 2.4, {
    y: "-100%",
    ease: Expo.easeInOut,
    delay: 1,
  });

  TweenMax.from("img", 4, {
    scale: 2,
    ease: Expo.easeInOut,
    delay: 0,
  });

  TweenMax.to(".wrapper-img", 2.4, {
    width: "400px",
    height: "500px",
    ease: Expo.easeInOut,
    delay: 3.6,
  });

  TweenMax.from("img", 0.4, {
    opacity: 0,
    ease: Expo.easeInOut,
    delay: 3.4,
  });

  TweenMax.to(".left", 2, {
    x: "-400px",
    rotation: -10,
    ease: Expo.easeInOut,
    delay: 3.8,
  });

  TweenMax.to(".right", 2, {
    x: "100px",
    rotation: 10,
    ease: Expo.easeInOut,
    delay: 3.8,
  });

  TweenMax.staggerFrom(
    ".menu > div, .hero-container > div",
    2,
    {
      opacity: 0,
      y: 30,
      ease: Expo.easeInOut,
      delay: 4.2,
    },
    0.1
  );

  // === Slider ===
  const totalSlides = 5;
  const sectionHeight = (document.body.scrollHeight - window.innerHeight) / totalSlides;
  const slides = document.querySelectorAll(".slide");

  slides.forEach((slide, index) => {
    gsap.to(slide, {
      zIndex: (progress) => {
        return progress < 0.5 ? 1 : 5 - index;
      },
      scrollTrigger: {
        start: sectionHeight * index + " top",
        end: sectionHeight * (index + 1) + " top",
        scrub: 1,
      },
    });

    gsap.fromTo(
      slide,
      {
        scale: index === 0 ? 1 : 0,
      },
      {
        scale: 1,
        scrollTrigger: {
          start: sectionHeight * index + " top",
          end: sectionHeight * (index + 1) + " top",
          scrub: 1,
        },
      }
    );

    if (index !== 0) {
      gsap.fromTo(
        slide.querySelector(".slide-img"),
        {
          scale: 2,
        },
        {
          scale: 1,
          scrollTrigger: {
            start: sectionHeight * index + " top",
            end: sectionHeight * (index + 1) + " top",
            scrub: 1,
          },
        }
      );
    }
  });

});

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}
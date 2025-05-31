let currentIndex = 1;
const totalSlides = 7;

const updateActiveSlide = () => {
  document.querySelectorAll(".title").forEach((el, index) => {
    if (index === currentIndex - 1) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};

const updateImages = (imgNumber) => {
  const imgSrc = `/static/images/asset/image-${imgNumber}.jpg`;


  const imgTop = document.createElement("img");
  const imgBottom = document.createElement("img");

  imgTop.src = imgSrc;
  imgBottom.src = imgSrc;

  imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
  imgBottom.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";

  imgTop.style.transform = "scale(2)";
  imgBottom.style.transform = "scale(2)";

  document.querySelector(".img-top").appendChild(imgTop);
  document.querySelector(".img-bottom").appendChild(imgBottom);

  gsap.to([imgTop, imgBottom], {
    clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
    transform: "scale(1)",
    duration: 2,
    ease: "power4.out",
    stagger: 0.15,
    onComplete: trimExcessImages,
  });
};

const trimExcessImages = () => {
  const selectors = [".img-top", ".img-bottom"];

  selectors.forEach((selector) => {
    const container = document.querySelector(selector);
    const images = Array.from(container.querySelectorAll("img"));
    const excessCount = images.length - 5;

    if (excessCount > 0) {
      images.slice(0, excessCount).forEach((image) => container.removeChild(image));
    }
  });
};

const handleSlider = () => {
  if (currentIndex < totalSlides) {
    currentIndex++;
  } else {
    currentIndex = 1;
  }

  gsap.to(".slide-titles", {
    x: `-${(currentIndex - 1) * 11.1111}%`, 
    duration: 2,
    ease: "power4.out",
    onStart: () => {
      setTimeout(() => {
        updateActiveSlide();
      }, 100);

      let nextImgNumber = currentIndex + 1 > totalSlides ? 1 : currentIndex + 1;
      updateImages(nextImgNumber);
    },
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".slider").addEventListener("click", handleSlider);
  updateImages(2);
  updateActiveSlide();
});

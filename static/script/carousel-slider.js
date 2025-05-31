let currentIndex = 1;
const totalSlides = 6;

// Mapping slide numbers to image sources
const imageSources = {
  1: "/static/images/bmw/jon-koop-khYVyHiNZo0-unsplash.jpg",     
  2: "/static/images/bmw/devon-janse-van-rensburg-yoqHLUayUTg-unsplash.jpg", 
  3: "/static/images/bmw/michael-jasmund-kR1u56bYces-unsplash.jpg", 
  4: "/static/images/bmw/denys-nevozhai-QD-8l-8_uJg-unsplash.jpg", 
  5: "/static/images/bmw/leon-seibert-1RiyAwNIiew-unsplash.jpg",    
  6: "/static/images/bmw/melody-p-PwcfmLRzJcI-unsplash.jpg" 
};

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
  const imgSrc = imageSources[imgNumber];
  if (!imgSrc) return; // If no image source, do nothing

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

const updateSliderTo = (index) => {
  gsap.to(".slide-titles", {
    x: `-${(index - 1) * 11.1111}%`,
    duration: 2,
    ease: "power4.out",
    onStart: () => {
      setTimeout(() => {
        updateActiveSlide();
      }, 100);
      updateImages(index);
    },
  });
  currentIndex = index;
};

const handleSlider = () => {
  if (currentIndex < totalSlides) {
    currentIndex++;
  } else {
    currentIndex = 1;
  }
  updateSliderTo(currentIndex);
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".slider").addEventListener("click", handleSlider);

  document.querySelectorAll(".image-selector button").forEach(button => {
    button.addEventListener("click", (e) => {
      const selectedIndex = parseInt(e.target.getAttribute("data-index"));
      if (selectedIndex !== currentIndex) {
        updateSliderTo(selectedIndex);
      }
    });
  });

  // User input for custom image URLs
  const setImageBtn = document.getElementById("set-image");
  if (setImageBtn) {
    setImageBtn.addEventListener("click", () => {
      const numberInput = document.getElementById("img-number");
      const srcInput = document.getElementById("img-src");
      const number = parseInt(numberInput.value);
      const src = srcInput.value.trim();

      if (number >= 1 && number <= totalSlides && src) {
        imageSources[number] = src;
        alert(`Image for slide ${number} updated.`);
        if (number === currentIndex) {
          updateImages(currentIndex);
        }
      }
    });
  }

  updateImages(currentIndex);
  updateActiveSlide();
});

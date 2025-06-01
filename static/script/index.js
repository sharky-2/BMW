document.addEventListener("DOMContentLoaded", function () {

    // === LENIS SCRIPTS ===
    setTimeout(() => {
        Promise.all([
            loadScript("https://cdn.jsdelivr.net/npm/intersection-observer@0.12.2/intersection-observer.min.js"),
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"),
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"),
            loadScript("https://unpkg.com/lenis@1.1.1/dist/lenis.min.js")
        ]).then(() => {
            console.log("Scroll-related scripts loaded.");
            initScrollAnimations();
        }).catch(err => console.error("Failed to load scripts", err));
    }, 2000); 

    // === LANDING PAGE ANIMATIONS ===
    let textWrapper = document.querySelector(".title");
    textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
    );

    anime.timeline().add({
        targets: ".title .letter",
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 4800 + 40 * i,
    });

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
                return progress < .5 ? 1 : 5 - index;
            },
            ScrollTrigger: {
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
                ScrollTrigger: {
                    start: sectionHeight * index + " top",
                    end: sectionHeight + (index + 1) + " top",
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
                    ScrollTrigger: {
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

function initScrollAnimations() {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const services = gsap.utils.toArray(".service");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const service = entry.target;
                const imgContainer = service.querySelector(".img");

                ScrollTrigger.create({
                    trigger: service,
                    start: "bottom bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let newWidth = 30 + 50 * self.progress;
                        gsap.to(imgContainer, {
                            width: newWidth + "%",
                            duration: 0.1,
                            ease: "none",
                        });
                    },
                });

                ScrollTrigger.create({
                    trigger: service,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let newHeight = 200 + 300 * self.progress;
                        gsap.to(service, {
                            height: newHeight + "px",
                            duration: 0.1,
                            ease: "none",
                        });
                    },
                });

                observer.unobserve(service);
            }
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    });

    services.forEach(service => observer.observe(service));
}
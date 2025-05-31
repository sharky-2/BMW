gsap.registerPlugin(ScrollTrigger);

const bgColors = [
    "#1a1a1a", // deep black - luxury feel
    "#003366", // BMW blue (corporate color)
    "#e6e6e6", // light silver/white - clean and modern
    "#2a2a2a", // dark graphite - metallic tone
    "#0f4c81", // classic deep blue
    "#c1121f", // red accent for M series and sport
    "#ffffff", // pure white - clean minimalism
    "#6c757d", // muted steel gray
    "#0075c9", // electric blue - innovation and BMW i series
    "#bdbdbd", // light gray - neutral tone
    "#222222"  // jet black - sleek contrast
];


const bgColorElement = document.querySelector(".bg-color");

gsap.utils.toArray(".item").forEach((item, index) => {
    let img = item.querySelector(".item-img img");
    gsap.fromTo(
        img,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
        {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power1.out",
            duration: 2,
            scrollTrigger: {
                trigger: item,
                start: "center bottom",
                end: "bottom top",
                toggleActions: "play none none none",
                onEnter: () => updateBackground(bgColors[index]),
                onEnterBack: () => updateBackground(bgColors[index])
            }
        }
    );
});

function updateBackground(color) {
    gsap.to(bgColorElement, {
        background: `linear-gradient(180deg, ${color} 0%, rgba(252, 176, 69, 0) 100%)`,
        duration: 2,
        ease: "power1.out"
    });
}

// Scroll Counter
document.addEventListener("DOMContentLoaded", function () {
    const counterElement = document.querySelector(".counter p");
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    function updateScrollPercentage() {
        const scrollPosition = window.scrollY;
        const scrolledPercentage = Math.round((scrollPosition / docHeight) * 100);
        counterElement.textContent = `${scrolledPercentage}`;
    }

    window.addEventListener("scroll", updateScrollPercentage);
});

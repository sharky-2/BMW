const projects = document.querySelector(".projects");
const preview = document.querySelector(".preview");
const previewImg = document.querySelector(".preview-img");

const bgPosition = {
    p1: "0 0",
    p2: "0 25%",
    p3: "0 50%",
    p4: "0 75%",
    p5: "0 100%",
};

// Show preview on mouse enter
// Show preview when mouse enters container
projects.addEventListener("mouseenter", () => {
    gsap.to(preview, { scale: 1, duration: 0.3 });
});

// Hide preview when mouse leaves container
projects.addEventListener("mouseleave", () => {
    gsap.to(preview, { scale: 0, duration: 0.3 });
});

// Move preview exactly to mouse position inside container
Array.from(projects.children).forEach((project) => {
    project.addEventListener("mousemove", (e) => {
        preview.style.left = e.clientX + "px";
        preview.style.top = e.clientY + "px";

        const projectId = project.id;
        gsap.to(previewImg, {
            backgroundPosition: bgPosition[projectId] || "0 0",
            duration: 0.4,
        });
    });
});

// Move preview and update image when moving over each project
Array.from(projects.children).forEach((project) => {
    project.addEventListener("mousemove", (e) => {
        const previewRect = preview.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Clamp position so preview stays inside viewport
        const clampedX = Math.min(
            window.innerWidth - previewRect.width / 2,
            Math.max(previewRect.width / 2, mouseX)
        );
        const clampedY = Math.min(
            window.innerHeight - previewRect.height / 2,
            Math.max(previewRect.height / 2, mouseY)
        );

        preview.style.left = clampedX - previewRect.width / 2 + "px";
        preview.style.top = clampedY - previewRect.height / 2 + "px";

        // Change background position based on project hovered
        const projectId = project.id;
        gsap.to(previewImg, {
            backgroundPosition: bgPosition[projectId] || "0 0",
            duration: 0.4,
        });
    });
});

/* =========================================
   AURELIA RESIDENCE 01
   JAVASCRIPT
========================================= */


/* =========================================
   LOADER
========================================= */

document.body.classList.add("loading");

const loader = document.getElementById("loader");
const loaderNumber = document.getElementById("loaderNumber");
const loaderLine = document.getElementById("loaderLine");

let progress = 0;

const loaderInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 5) + 1;

    if (progress >= 100) {
        progress = 100;
        clearInterval(loaderInterval);

        setTimeout(() => {
            loader.classList.add("hide");
            document.body.classList.remove("loading");
        }, 500);
    }

    loaderNumber.textContent =
        String(progress).padStart(2, "0");

    loaderLine.style.width = progress + "%";

}, 35);


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

if (window.innerWidth > 900) {

    document.addEventListener("mousemove", (event) => {

        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";

        cursorDot.style.left = event.clientX + "px";
        cursorDot.style.top = event.clientY + "px";

    });

    document.querySelectorAll("a, button").forEach(element => {

        element.addEventListener("mouseenter", () => {
            cursor.style.transform =
                "translate(-50%, -50%) scale(1.6)";
        });

        element.addEventListener("mouseleave", () => {
            cursor.style.transform =
                "translate(-50%, -50%) scale(1)";
        });

    });
}


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* =========================================
   BUILDING ZOOM
========================================= */

const buildingStage =
    document.getElementById("buildingStage");

const buildingModel =
    document.getElementById("buildingModel");

const zoomValue =
    document.getElementById("zoomValue");

const zoomIn =
    document.getElementById("zoomIn");

const zoomOut =
    document.getElementById("zoomOut");

const resetView =
    document.getElementById("resetView");


let scale = 1;
let positionX = 0;
let positionY = 0;

const MIN_SCALE = 0.65;
const MAX_SCALE = 2.3;


function updateBuilding() {

    buildingModel.style.transform =
        `translate(${positionX}px, ${positionY}px) scale(${scale})`;

    zoomValue.textContent =
        Math.round(scale * 100) + "%";

}


/* =========================================
   BUTTON ZOOM
========================================= */

zoomIn.addEventListener("click", () => {

    scale += 0.15;

    if (scale > MAX_SCALE) {
        scale = MAX_SCALE;
    }

    updateBuilding();

});


zoomOut.addEventListener("click", () => {

    scale -= 0.15;

    if (scale < MIN_SCALE) {
        scale = MIN_SCALE;
    }

    updateBuilding();

});


resetView.addEventListener("click", () => {

    scale = 1;

    positionX = 0;
    positionY = 0;

    updateBuilding();

});


/* =========================================
   MOUSE WHEEL ZOOM
========================================= */

buildingStage.addEventListener(
    "wheel",
    (event) => {

        event.preventDefault();

        if (event.deltaY < 0) {
            scale += 0.08;
        } else {
            scale -= 0.08;
        }

        scale = Math.max(
            MIN_SCALE,
            Math.min(MAX_SCALE, scale)
        );

        updateBuilding();

    },
    { passive: false }
);


/* =========================================
   DRAG BUILDING
========================================= */

let dragging = false;

let startX = 0;
let startY = 0;

let initialX = 0;
let initialY = 0;


buildingStage.addEventListener(
    "pointerdown",
    (event) => {

        dragging = true;

        buildingStage.setPointerCapture(event.pointerId);

        startX = event.clientX;
        startY = event.clientY;

        initialX = positionX;
        initialY = positionY;

    }
);


buildingStage.addEventListener(
    "pointermove",
    (event) => {

        if (!dragging) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        positionX = initialX + dx;
        positionY = initialY + dy;

        updateBuilding();

    }
);


buildingStage.addEventListener(
    "pointerup",
    () => {

        dragging = false;

    }
);


buildingStage.addEventListener(
    "pointercancel",
    () => {

        dragging = false;

    }
);


/* =========================================
   REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(
        ".about-text, .about-image, .project-card, .manifesto-content, .location-text, .map"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(40px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});


/* =========================================
   HERO PARALLAX
========================================= */

const heroImage =
    document.querySelector(".hero-image");

window.addEventListener("scroll", () => {

    const scroll =
        window.scrollY;

    if (scroll < window.innerHeight) {

        heroImage.style.transform =
            `scale(1.04) translateY(${scroll * 0.12}px)`;

    }

});


/* =========================================
   MAGNETIC BUTTON EFFECT
========================================= */

document.querySelectorAll(
    ".circle-button, .contact-button"
).forEach(button => {

    button.addEventListener("mousemove", (event) => {

        const rect =
            button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "translate(0,0)";

    });

});


/* =========================================
   IMAGE PARALLAX
========================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            (event.clientX - rect.left)
            / rect.width;

        const y =
            (event.clientY - rect.top)
            / rect.height;

        const moveX =
            (x - 0.5) * 12;

        const moveY =
            (y - 0.5) * 12;

        const image =
            card.querySelector("img");

        image.style.transform =
            `scale(1.06) translate(${moveX}px, ${moveY}px)`;

    });


    card.addEventListener("mouseleave", () => {

        const image =
            card.querySelector("img");

        image.style.transform =
            "scale(1) translate(0,0)";

    });

});


/* =========================================
   SMOOTH ANCHOR
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================================
   KEYBOARD SHORTCUT
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        mobileMenu.classList.remove("active");

    }

});


/* =========================================
   BUILDING MODEL INITIALIZATION
========================================= */

updateBuilding();

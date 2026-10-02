/* =========================================
   NOVA ESTATE
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   LOADER
========================================= */

const loader =
    document.getElementById("loader");

const loaderNumber =
    document.getElementById("loaderNumber");

const loaderProgress =
    document.getElementById("loaderProgress");


let progress = 0;


const loadingInterval =
    setInterval(() => {

        progress +=
            Math.floor(Math.random() * 7) + 2;


        if (progress >= 100) {

            progress = 100;

            clearInterval(
                loadingInterval
            );

            setTimeout(() => {

                loader.classList.add(
                    "hidden"
                );

            }, 500);

        }


        loaderNumber.textContent =
            String(progress).padStart(
                2,
                "0"
            );


        loaderProgress.style.width =
            progress + "%";


    }, 70);



/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "open"
            );

            document.body.classList.toggle(
                "menu-open"
            );

        }
    );

}


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }
        );

    });



/* =========================================
   SMOOTH SCROLL
========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });



/* =========================================
   HERO PARALLAX
========================================= */

const heroImage =
    document.querySelector(
        ".hero-image"
    );


document.addEventListener(
    "mousemove",
    event => {

        if (!heroImage) return;


        const x =
            (event.clientX /
                window.innerWidth
            - .5) * 5;


        const y =
            (event.clientY /
                window.innerHeight
            - .5) * 5;


        heroImage.style.transform =
            `scale(1.05)
             translate(${x}px, ${y}px)`;

    }
);



/* =========================================
   REVEAL ON SCROLL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .15
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================
   PROJECT HOVER
========================================= */

document
    .querySelectorAll(
        ".project"
    )
    .forEach(project => {

        project.addEventListener(
            "mousemove",
            event => {

                const image =
                    project.querySelector(
                        "img"
                    );


                const rect =
                    project.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const moveX =
                    (x -
                        rect.width / 2
                    ) * .008;


                const moveY =
                    (y -
                        rect.height / 2
                    ) * .008;


                image.style.transform =
                    `scale(1.05)
                     translate(
                        ${moveX}px,
                        ${moveY}px
                     )`;

            }
        );


        project.addEventListener(
            "mouseleave",
            () => {

                const image =
                    project.querySelector(
                        "img"
                    );


                image.style.transform =
                    "scale(1)";

            }
        );

    });



/* =========================================
   THREE.JS BUILDING
========================================= */

const container =
    document.getElementById(
        "building-canvas"
    );


if (
    container &&
    typeof THREE !== "undefined"
) {


    /* SCENE */

    const scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(
            0x101315
        );



    /* CAMERA */

    const camera =
        new THREE.PerspectiveCamera(
            35,

            container.clientWidth /
            container.clientHeight,

            .1,

            1000
        );


    camera.position.set(
        18,
        13,
        28
    );



    /* RENDERER */

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    renderer.shadowMap.enabled =
        true;


    container.appendChild(
        renderer.domElement
    );



    /* =====================================
       LIGHTING
    ===================================== */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.4
        );


    scene.add(
        ambientLight
    );


    const mainLight =
        new THREE.DirectionalLight(
            0xfff1d4,
            3
        );


    mainLight.position.set(
        10,
        25,
        15
    );


    mainLight.castShadow =
        true;


    scene.add(
        mainLight
    );


    const fillLight =
        new THREE.DirectionalLight(
            0x8aa0b8,
            1
        );


    fillLight.position.set(
        -15,
        10,
        -10
    );


    scene.add(
        fillLight
    );



    /* =====================================
       BUILDING GROUP
    ===================================== */

    const building =
        new THREE.Group();


    scene.add(
        building
    );



    /* =====================================
       MATERIALS
    ===================================== */

    const concrete =
        new THREE.MeshStandardMaterial({
            color: 0x666b69,
            roughness: .72,
            metalness: .08
        });


    const glass =
        new THREE.MeshStandardMaterial({
            color: 0x172126,
            roughness: .12,
            metalness: .75
        });


    const warmGlass =
        new THREE.MeshStandardMaterial({
            color: 0x8e795e,
            roughness: .18,
            metalness: .45
        });


    const dark =
        new THREE.MeshStandardMaterial({
            color: 0x15191b,
            roughness: .5,
            metalness: .25
        });



    /* =====================================
       MAIN TOWER
    ===================================== */

    const towerGeometry =
        new THREE.BoxGeometry(
            9,
            24,
            7
        );


    const tower =
        new THREE.Mesh(
            towerGeometry,
            concrete
        );


    tower.position.y =
        12;


    tower.castShadow =
        true;


    tower.receiveShadow =
        true;


    building.add(
        tower
    );



    /* =====================================
       GLASS FLOOR BANDS
    ===================================== */

    for (
        let floor = 0;
        floor < 21;
        floor++
    ) {

        const y =
            2 +
            floor * 1.05;


        const geometry =
            new THREE.BoxGeometry(
                9.15,
                .62,
                7.15
            );


        const window =
            new THREE.Mesh(
                geometry,
                glass
            );


        window.position.y =
            y;


        building.add(
            window
        );

    }



    /* =====================================
       HORIZONTAL ARCHITECTURAL LINES
    ===================================== */

    for (
        let floor = 1;
        floor < 23;
        floor++
    ) {

        const geometry =
            new THREE.BoxGeometry(
                9.5,
                .08,
                7.4
            );


        const line =
            new THREE.Mesh(
                geometry,
                dark
            );


        line.position.y =
            floor * 1.05;


        building.add(
            line
        );

    }



    /* =====================================
       VERTICAL WINDOWS
    ===================================== */

    for (
        let floor = 1;
        floor < 20;
        floor++
    ) {

        for (
            let column = -3;
            column <= 3;
            column++
        ) {

            const geometry =
                new THREE.BoxGeometry(
                    .7,
                    .65,
                    .12
                );


            const window =
                new THREE.Mesh(
                    geometry,
                    warmGlass
                );


            window.position.set(
                column * 1.15,
                1.8 +
                floor * 1.05,
                3.56
            );


            building.add(
                window
            );

        }

    }



    /* =====================================
       BALCONIES
    ===================================== */

    for (
        let floor = 2;
        floor < 20;
        floor += 2
    ) {

        const geometry =
            new THREE.BoxGeometry(
                10.4,
                .16,
                2
            );


        const balcony =
            new THREE.Mesh(
                geometry,
                concrete
            );


        balcony.position.set(
            0,
            floor * 1.05,
            4
        );


        building.add(
            balcony
        );

    }



    /* =====================================
       ROOF
    ===================================== */

    const roofGeometry =
        new THREE.BoxGeometry(
            10,
            1,
            8
        );


    const roof =
        new THREE.Mesh(
            roofGeometry,
            concrete
        );


    roof.position.y =
        24.6;


    building.add(
        roof
    );



    /* =====================================
       ROOFTOP PENTHOUSE
    ===================================== */

    const penthouseGeometry =
        new THREE.BoxGeometry(
            6,
            2.8,
            5
        );


    const penthouse =
        new THREE.Mesh(
            penthouseGeometry,
            warmGlass
        );


    penthouse.position.y =
        26.5;


    building.add(
        penthouse
    );



    /* =====================================
       ENTRANCE
    ===================================== */

    const entranceGeometry =
        new THREE.BoxGeometry(
            5,
            3.5,
            .7
        );


    const entrance =
        new THREE.Mesh(
            entranceGeometry,
            glass
        );


    entrance.position.set(
        0,
        1.8,
        3.7
    );


    building.add(
        entrance
    );



    /* =====================================
       GROUND
    ===================================== */

    const groundGeometry =
        new THREE.CircleGeometry(
            20,
            64
        );


    const groundMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x15191a,
            roughness: 1
        });


    const ground =
        new THREE.Mesh(
            groundGeometry,
            groundMaterial
        );


    ground.rotation.x =
        -Math.PI / 2;


    ground.position.y =
        -.3;


    ground.receiveShadow =
        true;


    scene.add(
        ground
    );



    /* =====================================
       ROTATION
    ===================================== */

    let isDragging =
        false;


    let previousX =
        0;


    let previousY =
        0;


    let rotationY =
        0;


    let rotationX =
        0;


    container.addEventListener(
        "pointerdown",
        event => {

            isDragging =
                true;


            previousX =
                event.clientX;


            previousY =
                event.clientY;


            container.setPointerCapture(
                event.pointerId
            );

        }
    );


    container.addEventListener(
        "pointerup",
        event => {

            isDragging =
                false;


            container.releasePointerCapture(
                event.pointerId
            );

        }
    );


    container.addEventListener(
        "pointermove",
        event => {

            if (!isDragging)
                return;


            const deltaX =
                event.clientX -
                previousX;


            const deltaY =
                event.clientY -
                previousY;


            rotationY +=
                deltaX * .008;


            rotationX +=
                deltaY * .004;


            rotationX =
                Math.max(
                    -.7,
                    Math.min(
                        .7,
                        rotationX
                    )
                );


            previousX =
                event.clientX;


            previousY =
                event.clientY;

        }
    );



    /* =====================================
       ZOOM
    ===================================== */

    let cameraDistance =
        30;


    container.addEventListener(
        "wheel",
        event => {

            event.preventDefault();


            cameraDistance +=
                event.deltaY * .025;


            cameraDistance =
                Math.max(
                    15,
                    Math.min(
                        55,
                        cameraDistance
                    )
                );

        },
        {
            passive: false
        }
    );



    /* =====================================
       CAMERA
    ===================================== */

    function updateCamera() {

        camera.position.x =
            Math.sin(
                rotationY
            ) *
            cameraDistance;


        camera.position.z =
            Math.cos(
                rotationY
            ) *
            cameraDistance;


        camera.position.y =
            13 +
            rotationX * 8;


        camera.lookAt(
            0,
            12,
            0
        );

    }



    /* =====================================
       ZOOM BUTTONS
    ===================================== */

    const zoomIn =
        document.getElementById(
            "zoomIn"
        );


    const zoomOut =
        document.getElementById(
            "zoomOut"
        );


    const resetView =
        document.getElementById(
            "resetView"
        );


    if (zoomIn) {

        zoomIn.addEventListener(
            "click",
            () => {

                cameraDistance -= 3;


                cameraDistance =
                    Math.max(
                        15,
                        cameraDistance
                    );

            }
        );

    }


    if (zoomOut) {

        zoomOut.addEventListener(
            "click",
            () => {

                cameraDistance += 3;


                cameraDistance =
                    Math.min(
                        55,
                        cameraDistance
                    );

            }
        );

    }


    if (resetView) {

        resetView.addEventListener(
            "click",
            () => {

                rotationY =
                    0;


                rotationX =
                    0;


                cameraDistance =
                    30;

            }
        );

    }



    /* =====================================
       DAY / NIGHT / TOP
    ===================================== */

    document
        .querySelectorAll(".mode")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".mode"
                        )
                        .forEach(
                            item => {

                                item.classList
                                    .remove(
                                        "active"
                                    );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    const mode =
                        button.dataset.mode;


                    if (
                        mode === "night"
                    ) {

                        scene.background =
                            new THREE.Color(
                                0x030405
                            );


                        ambientLight.intensity =
                            .3;


                        mainLight.intensity =
                            .8;


                        fillLight.intensity =
                            .25;


                    }


                    else if (
                        mode === "top"
                    ) {

                        rotationX =
                            -.95;


                        cameraDistance =
                            28;


                    }


                    else {

                        scene.background =
                            new THREE.Color(
                                0x101315
                            );


                        ambientLight.intensity =
                            1.4;


                        mainLight.intensity =
                            3;


                        fillLight.intensity =
                            1;


                        rotationX =
                            0;

                    }

                }
            );

        });



    /* =====================================
       HOTSPOTS
    ===================================== */

    const hotspotText =
        document.getElementById(
            "hotspotText"
        );


    document
        .querySelectorAll(
            ".hotspot"
        )
        .forEach(point => {

            point.addEventListener(
                "click",
                () => {

                    hotspotText.textContent =
                        point.dataset.info;

                }
            );

        });



    /* =====================================
       RESIZE
    ===================================== */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                container.clientWidth /
                container.clientHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                container.clientWidth,
                container.clientHeight
            );

        }
    );



    /* =====================================
       ANIMATION
    ===================================== */

    function animate() {

        requestAnimationFrame(
            animate
        );


        updateCamera();


        renderer.render(
            scene,
            camera
        );

    }


    animate();

}

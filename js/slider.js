var swiper = new Swiper(".mySwiper", {
    speed: 800,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    scrollbar: {
        dragClass: "swiper-scrollbar-drag",
        el: ".swiper-scrollbar",
        draggable: "true",
    },
    breakpoints: {
        650: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        800: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1091: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1300: {
            slidesPerView: 5,
            spaceBetween: 50,
        },
    },
});

var productsSwiper = new Swiper(".mySwiper2", {
    speed: 800,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: false,
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        450: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        520: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1300: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});
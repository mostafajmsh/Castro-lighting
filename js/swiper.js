var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 150,
    loop: "true",
    autoplay: {
        delay: 1500,
        disableOnInteraction: "false",
        loop: "true"
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
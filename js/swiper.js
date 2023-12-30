var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 150,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
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
    slidesPerView: 5,
    spaceBetween: 10,
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
            centeredSlides: true,
            slidesPerView: 3,
            spaceBetween: 60,
        },
        650: {
            centeredSlides: false,
            slidesPerView: 2,
            spaceBetween: 10,
        },
        690: {
            centeredSlides: true,
            slidesPerView: 3,
            spaceBetween: 60,
        },
        805: {
            slidesPerView: 2,
            spaceBetween: 60,
        },
        850: {
            centeredSlides: false,
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1078: {
            centeredSlides: false,
            slidesPerView: 3,
            spaceBetween: 250,
        },
        1261: {
            slidesPerView: 3,
            spaceBetween: 150,
        },
    },
});
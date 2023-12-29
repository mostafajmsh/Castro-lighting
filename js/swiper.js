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
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: false,
    loop: false
});
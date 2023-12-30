const sectionTitleAfter = document.querySelector(".after-title");
const basketIcon = document.querySelectorAll(".basket-icon")
window.addEventListener("load", () => {
    if (window.innerWidth < 804) {
        sectionTitleAfter.src = "images/Ornament 26-l.png";
        basketIcon.forEach(icon => {
            icon.src = "images/Iconsax/Linear/Iconsax/Outline/bag2.png"
            icon.style.width = "12px"
        })
    } else {
        sectionTitleAfter.src = "images/Ornament 26.png";
        basketIcon.forEach(icon => {
            icon.src = "images/Iconsax/Outline/bag2.png"
        })
    }
});
window.addEventListener("resize", () => {
    if (window.innerWidth < 804) {
        sectionTitleAfter.src = "images/Ornament 26-l.png";
        basketIcon.forEach(icon => {
            icon.src = "images/Iconsax/Linear/Iconsax/Outline/bag2.png"
            icon.style.width = "12px"
        })
    } else {
        sectionTitleAfter.src = "images/Ornament 26.png";
        basketIcon.forEach(icon => {
            icon.src = "images/Iconsax/Outline/bag2.png"
        })
    }
});
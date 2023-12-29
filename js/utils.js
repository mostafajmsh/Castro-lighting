const sectionTitleAfter = document.querySelector(".after-title");
window.addEventListener("load", () => {
    if (window.innerWidth < 651) {
        sectionTitleAfter.src = "images/Ornament 26-l.png";
    } else {
        sectionTitleAfter.src = "images/Ornament 26.png";
    }
});
window.addEventListener("resize", () => {
    if (window.innerWidth < 651) {
        sectionTitleAfter.src = "images/Ornament 26-l.png";
    } else {
        sectionTitleAfter.src = "images/Ornament 26.png";
    }
});
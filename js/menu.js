const toggleMenu = () => {
    const menuIcon = document.querySelector(".menu-icon");
    const tabletMenu = document.querySelector(".tablet__menu-list");
    const mobileMenu = document.querySelector(".mobile__menu-list");
    menuIcon.classList.toggle("menu-open");
    if (menuIcon.classList.contains("menu-open")) {
        tabletMenu.style.visibility = "visible";
        tabletMenu.style.opacity = "1";
        tabletMenu.style.right = "0";
        mobileMenu.style.visibility = "visible";
        mobileMenu.style.opacity = "1";
        mobileMenu.style.right = "0";
    } else {
        tabletMenu.style.visibility = "hidden";
        tabletMenu.style.opacity = "0";
        tabletMenu.style.right = "-10rem";
        mobileMenu.style.visibility = "hidden";
        mobileMenu.style.opacity = "0";
        mobileMenu.style.right = "-10rem";
    }
}

function toggleDrop() {
    const tabletMenuDropdown = document.querySelector(".menu__drop");
    const dropdownElem = document.querySelector(".tablet__menu-dropdown");
    const lastChild = document.querySelector(".last-child");
    const dropIcon = document.querySelector(".tablet__dropdown-icon");

    tabletMenuDropdown.classList.toggle("menu-open");

    if (tabletMenuDropdown.classList.contains("menu-open")) {
        dropdownElem.style.visibility = "visible";
        dropdownElem.style.top = "4rem";
        dropdownElem.style.opacity = "1";
        lastChild.style.margin = "200px 0 0 0";
        dropIcon.style.transform = "rotate(180deg)";
    } else {
        dropdownElem.style.visibility = "hidden";
        dropdownElem.style.top = "-15rem";
        dropdownElem.style.opacity = "0";
        lastChild.style.margin = "0";
        dropIcon.style.transform = "none";
    }
}

function mobileToggleDrop() {

    const tabletMenuDropdown = document.querySelector(".menu__drop");
    const dropdownElem = document.querySelector(".mobile__menu-dropdown");
    const lastChild = document.querySelector(".mobile__last-child");
    const dropIcon = document.querySelector(".mobile__dropdown-icon");

    tabletMenuDropdown.classList.toggle("menu-open");

    if (tabletMenuDropdown.classList.contains("menu-open")) {
        dropdownElem.style.visibility = "visible";
        dropdownElem.style.top = "4rem";
        dropdownElem.style.opacity = "1";
        lastChild.style.margin = "200px 0 0 0";
        dropIcon.style.transform = "rotate(180deg)";
    } else {
        dropdownElem.style.visibility = "hidden";
        dropdownElem.style.top = "-15rem";
        dropdownElem.style.opacity = "0";
        lastChild.style.margin = "0";
        dropIcon.style.transform = "none";
    }
}

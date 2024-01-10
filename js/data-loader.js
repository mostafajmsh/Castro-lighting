import data from "../data.json" assert {type: 'json'}

const categoriesData = data.categories;
const MenuDropdownElem = document.querySelectorAll('.dropdown')
const productsGroupingElem = document.querySelector('.products__groupping-wrapper')
const mobileProductsGroupingElem = document.querySelector('.mobile__grouping-content')

// SHOW MENU DROPDOWN ITEMS
const categoryItems = Object.values(categoriesData)
const dropItems = categoryItems.map(item => {
    MenuDropdownElem.forEach(drop => {

        drop.innerHTML += `<li class="dropdown-item"><a href="#">${item.name}</a></li>`

    })

})

// SHOW PRODUCT CATEGORIES

const productsGroupingItems = categoryItems.map((item) => {

    productsGroupingElem.innerHTML += `
    <div class="swiper-slide">
        <div class="groupping__content-item">
            <img class="category-cover" src="${item.cover}" alt="" />
            <div class="content__item-text">
                <p>${item.name}</p>
                <div>
                    <img src="images/Iconsax/Outline/arrowleft.png" alt="" />
                </div>
            </div>
        </div>
    </div>
    `
    mobileProductsGroupingElem.innerHTML += `
    <div class="groupping__content-item">
        <img
            class="content__item-img"
            src="${item.cover}"
            alt=""
        />
        <div class="content__item-text">
            <p>${item.name}</p>
            <div>
                <img src="images//Iconsax/Outline/arrowleft.svg" alt="" />
            </div>
        </div>
    </div>
    `
})

// SHOW RANDOM PRODUCTS IN NEW PRODUCTS SECTION

const newProductsData = data.products;
const productsWrapper = document.querySelector('.products-wrapper')
console.log(newProductsData);

productsWrapper.innerHTML = "";

const shuffledArray = newProductsData.sort((a, b) => 0.5 - Math.random());

shuffledArray.slice(0, 9).map((product) => {
    productsWrapper.innerHTML += `
    <div class="swiper-slide">
        <div class="products__item">
            <img class="products__item-cover" src="${product.cover}" alt="" />
            <p class="products__item-title">${product.name}</p>
            <div class="products__item-score">
                <span>${product.score}</span>
                <img src="images/Iconsax/Bold/star1.png" alt="" />
                <p>_ ${product.categoryName}</p>
            </div>
            <div class="products__item-price">
                <div>
                    <img
                    class="basket-icon"
                    src="images/Iconsax/Outline/bag2.png"
                    alt=""
                    />
                </div>
                <p lang="fa-IR">${product.price.toLocaleString()} <span>تومان</span></p>
            </div>
        </div>
    </div>
  `
});
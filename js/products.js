import {
    products,
    insertAllProductsHtmlTemplate,
    paginateItems,
    addParamToUrl,
    getUrlParam,
    productsSorting,
    productsCategorySelection
} from "./data-loader.js";

const allProductsWrapper = document.querySelector('.products-wrapper')

window.addParamToUrl = addParamToUrl

window.addEventListener('load', () => {

    const productsPaginationWrapperElem = document.querySelector('#products-pagination')
    const productsFilteringSelections = document.querySelectorAll(
        ".products-top-bar__selection-item"
    );
    const productsCategorySelections = document.querySelectorAll(
        ".products-category__selection-item"
    );
    const selectionTitleElem = document.querySelector(
        ".products-top-bar__selection-title"
    );
    const categorySelectionTitleElem = document.querySelector(
        ".products-category__selection-title"
    );

    productsFilteringSelections.forEach((productFilteringSelection) => {
        productFilteringSelection.addEventListener("click", (event) => {
            productsFilteringSelections.forEach((selectionElem) =>
                selectionElem.classList.remove(
                    "products-top-bar__selection-item--active"
                )
            );

            event.target.classList.add("products-top-bar__selection-item--active");

            selectionTitleElem.innerHTML = "";
            selectionTitleElem.insertAdjacentHTML(
                "beforeend",
                `
              ${event.target.innerHTML}
              <i class="fas fa-angle-down products-top-bar__selection-icon"></i>
          `
            );

            let userFilteringSelection = event.target.dataset.key;
            let shownFilteredProducts = productsSorting([...products], userFilteringSelection);
            insertAllProductsHtmlTemplate([...shownFilteredProducts], allProductsWrapper)

        });
    });

    productsCategorySelections.forEach((productsCategory) => {
        productsCategory.addEventListener("click", (event) => {
            productsCategorySelections.forEach((selectionElem) =>
                selectionElem.classList.remove(
                    "products-category__selection-item--active"
                )
            );

            event.target.classList.add("products-category__selection-item--active");

            categorySelectionTitleElem.innerHTML = "";
            categorySelectionTitleElem.insertAdjacentHTML(
                "beforeend",
                `
              ${event.target.innerHTML}
              <i class="fas fa-angle-down products-category__selection-icon"></i>
          `
            );

            let userCategorySelection = event.target.dataset.key;
            let shownSelectedCategoryProducts = productsCategorySelection([...products], userCategorySelection);
            insertAllProductsHtmlTemplate([...shownSelectedCategoryProducts], allProductsWrapper)
        });
    });

    const currentPage = getUrlParam("page");

    let shownProducts = paginateItems([...products], 8, productsPaginationWrapperElem, currentPage)
    insertAllProductsHtmlTemplate([...shownProducts], allProductsWrapper)
})
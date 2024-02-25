
import {
    getAllProducts,
    insertAllProductsHtmlTemplate,
    productsSorting,
    productsCategorySelection
} from "./data-loader.js";

import {
    getUrlParam,
    paginateItems,
    productsCategoryHandler,
    productsFilteringHandler
} from "./func/utils.js";

window.addEventListener('load', () => {

    getAllProducts().then(products => {
        console.log(products);

        const allProductsWrapper = document.querySelector('.products-wrapper')

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

        productsFilteringHandler(productsFilteringSelections, selectionTitleElem, productsSorting, products, insertAllProductsHtmlTemplate, allProductsWrapper)
        productsCategoryHandler(productsCategorySelections, categorySelectionTitleElem, productsCategorySelection, products, insertAllProductsHtmlTemplate, allProductsWrapper)

        const currentPage = getUrlParam("page");

        let shownProducts = paginateItems([...products], 8, productsPaginationWrapperElem, currentPage)
        insertAllProductsHtmlTemplate([...shownProducts], allProductsWrapper)
    })

})
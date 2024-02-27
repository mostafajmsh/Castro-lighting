import {
    getAllCategories,
    insertAllProductsHtmlTemplate,
    productsSorting,
    getProductsByCategory,
} from "./data-loader.js";

import {
    getUrlParam,
    paginateItems,
    productsFilteringHandler
} from "./func/utils.js";

const productsWrapperElem = document.querySelector('.products-wrapper')
const productsPaginationWrapperElem = document.querySelector('#products-pagination')
const pageTitleElem = document.querySelector('.products__top-bar-title')
const productsFilteringSelections = document.querySelectorAll(
    ".products-top-bar__selection-item"
);
const selectionTitleElem = document.querySelector(
    ".products-top-bar__selection-title"
);

window.addEventListener('load', () => {
    const categoryName = getUrlParam('cat')
    getAllCategories().then(categories => {
        let filteredCategoryID = categories.filter(category => {
            return category.name === categoryName
        })
        pageTitleElem.innerHTML = filteredCategoryID[0].title
        console.log(filteredCategoryID);
        getProductsByCategory(filteredCategoryID[0].id).then(products => {
            const currentPage = getUrlParam('page')
            let shownProducts = paginateItems([...products], 8, productsPaginationWrapperElem, currentPage)

            insertAllProductsHtmlTemplate(shownProducts, productsWrapperElem)
            productsFilteringHandler(productsFilteringSelections, selectionTitleElem, productsSorting, products, insertAllProductsHtmlTemplate, productsWrapperElem)
        })
    })

})
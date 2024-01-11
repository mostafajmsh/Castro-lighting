import {
    categories,
    insertMobileProductsGroupingHtmlTemplate,
    insertNewProductsHtmlTemplate,
    insertProductsGroupingHtmlTemplate,
    shuffledArray
}
    from "./data-loader.js"

const productsGroupingElem = document.querySelector('.products__groupping-wrapper')
const mobileProductsGroupingElem = document.querySelector('.mobile__grouping-content')
const newProductsWrapper = document.querySelector('.products-wrapper')

window.addEventListener('load', () => {
    insertProductsGroupingHtmlTemplate(categories, productsGroupingElem)
    insertMobileProductsGroupingHtmlTemplate(categories, mobileProductsGroupingElem)
    insertNewProductsHtmlTemplate(shuffledArray, newProductsWrapper)
})
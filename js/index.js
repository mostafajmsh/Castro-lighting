import {
    getAllCategories,
    getAllProducts,
    insertMobileProductsGroupingHtmlTemplate,
    insertNewProductsHtmlTemplate,
    insertProductsGroupingHtmlTemplate,
}
    from "./data-loader.js"


const productsGroupingElem = document.querySelector('.products__groupping-wrapper')
const mobileProductsGroupingElem = document.querySelector('.mobile__grouping-content')
const newProductsWrapper = document.querySelector('.products-wrapper')

window.addEventListener('load', () => {
    getAllCategories().then(categories => {
        insertProductsGroupingHtmlTemplate(categories, productsGroupingElem)
        insertMobileProductsGroupingHtmlTemplate(categories, mobileProductsGroupingElem)

    })
    getAllProducts().then(products => {

        const shuffledArray = products.sort((a, b) => 0.5 - Math.random());

        insertNewProductsHtmlTemplate(shuffledArray, newProductsWrapper)

    })
})
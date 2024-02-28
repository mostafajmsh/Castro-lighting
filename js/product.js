import { addProductInfosToProductPage, getProductByUrl } from "./data-loader.js"
import { getUrlParam } from "./func/utils.js"

const productTitleElem = document.querySelector('.product-title')
const productImageElem = document.querySelector('.product__image-wrapper')
const productNameElem = document.querySelector('.product-name')
const productScoreElem = document.querySelector('.product-score')
const productCategoryElem = document.querySelector('.product-category')
const productPriceElem = document.querySelector('.product-price')
const productCountElem = document.querySelector('.product-count')
const productDescriptionElem = document.querySelector('.product-description')

window.addEventListener('load', () => {
    const productUrl = getUrlParam('name')
    getProductByUrl(productUrl).then(product => {
        addProductInfosToProductPage(
            product,
            productTitleElem,
            productImageElem,
            productNameElem,
            productScoreElem,
            productCategoryElem,
            productPriceElem,
            productCountElem,
            productDescriptionElem)
    })
})
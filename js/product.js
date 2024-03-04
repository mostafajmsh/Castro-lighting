import { addProductInfosToProductPage, getProductByUrl } from "./data-loader.js"
import { getUrlParam, isLogin } from "./func/utils.js"

const productTitleElem = document.querySelector('.product-title')
const productImageElem = document.querySelector('.product__image-wrapper')
const productNameElem = document.querySelector('.product-name')
const productScoreElem = document.querySelector('.product-score')
const productCategoryElem = document.querySelector('.product-category')
const productPriceElem = document.querySelector('.product-price')
const productCountElem = document.querySelector('.product-count')
const productDescriptionElem = document.querySelector('.product-description')
let totalPrice = 0
let maxCount = 0

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
        totalPrice = product[0].price
        maxCount = product[0].count
    })
})

const addToCartBtn = document.querySelector('.add-to-cart')
const orderWrapperElem = document.querySelector('.order-wrapper')
const plusBtnElem = document.querySelector('.plus-btn')
const orderCountNumber = document.querySelector('.order-count p')
const minusBtnElem = document.querySelector('.minus-btn')
const totalPriceElem = document.querySelector('.total-price span')
const addOrderBtnElem = document.querySelector('.add-order')

addToCartBtn.addEventListener('click', () => {
    addToCartBtn.style.display = 'none'
    orderWrapperElem.style.display = 'flex'
    orderCountNumber.innerHTML = 1
    minusBtnElem.innerHTML = `
        <i class="far fa-trash-alt"></i>
    `
    totalPriceElem.innerHTML = totalPrice
})

plusBtnElem.addEventListener('click', () => {
    if (+orderCountNumber.innerHTML === maxCount) {
        plusBtnElem.style.opacity = '0.6'
    } else {
        orderCountNumber.innerHTML++
        minusBtnElem.innerHTML = `
            <i class="fas fa-minus"></i>
        `
        totalPriceElem.innerHTML = totalPrice * +orderCountNumber.innerHTML
        plusBtnElem.style.opacity = '1'
    }
})

minusBtnElem.addEventListener('click', () => {
    orderCountNumber.innerHTML--
    plusBtnElem.style.opacity = '1'
    if (Number(orderCountNumber.innerHTML) < 1) {
        addToCartBtn.style.display = 'flex'
        orderWrapperElem.style.display = 'none'
    }

    if (Number(orderCountNumber.innerHTML) === 1) {
        minusBtnElem.innerHTML = `
            <i class="far fa-trash-alt"></i>
        `
    } else {
        minusBtnElem.innerHTML = `
            <i class="fas fa-minus"></i>
    `
    }
    totalPriceElem.innerHTML = totalPrice * +orderCountNumber.innerHTML
})

addOrderBtnElem.addEventListener('click', () => {
    if (!isLogin) {
        
    } else {
        
    }
})
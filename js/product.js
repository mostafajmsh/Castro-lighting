import { addProductInfosToProductPage, getProductByUrl } from "./data-loader.js"
import { addToLocalStorage, getUrlParam, isLogin, statusModalChanger } from "./func/utils.js"

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
let productID = null

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

let orderObj = {}
let cartTotalOrdersArray = []

addOrderBtnElem.addEventListener('click', () => {
    if (!isLogin) {
        statusModalChanger('ERROR', 'لطفا ابتدا وارد حساب کاربری خود شوید', 'ورود به حساب')
    } else {
        const productUrl = getUrlParam('name')
        getProductByUrl(productUrl).then(product => {
            orderObj = {
                id: product[0].id,
                count: orderCountNumber.innerHTML,
                name: product[0].name,
                score: product[0].score,
                category: product[0].categoryTitle,
                price: product[0].price,
                cover: product[0].cover,
                maxCount: product[0].count
            }
            cartTotalOrdersArray.push(orderObj)
            addToLocalStorage('order', cartTotalOrdersArray)
        })
        statusModalChanger('SUCCESS', 'محصول با موفقیت به سبد خرید اضافه شد', 'ادامه')
    }
})

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
        productID = product[0].id
    })

    let localStorageOrders = JSON.parse(localStorage.getItem('order'))
    console.log(localStorageOrders);
    if (localStorageOrders) {
        cartTotalOrdersArray = localStorageOrders
        console.log(cartTotalOrdersArray);
    } else {
        cartTotalOrdersArray = []
    }
})
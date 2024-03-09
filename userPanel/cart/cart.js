import { getUserInfo, showOrdersFromLocalStorage } from "../js/utils.js"
import { showUserInfosOnDashboard } from "../js/shared.js"

const allOrdersWrapper = document.querySelector('.order-wrapper')
const orderTotalCountNumber = document.querySelector('.order-total-count span')
const orderTotalPriceNumber = document.querySelector('.order__total-price span')
const profileTitle = document.querySelector('.profile-title')
const profileEmail = document.querySelector('.profile-email')

let totalCount = 0
let totalPrice = 0
let localStorageOrders = JSON.parse(localStorage.getItem('order'))

window.addEventListener('load', () => {

    getUserInfo().then(user => {

        showUserInfosOnDashboard(
            user,
            profileTitle,
            profileEmail)
    })

    showOrdersFromLocalStorage(localStorageOrders, allOrdersWrapper, totalCount, totalPrice, orderTotalCountNumber, orderTotalPriceNumber)
})

const plusBtnHandler = (event, maxCount, price) => {
    let countNumber = event.currentTarget.nextElementSibling
    let minusBtn = event.currentTarget.nextElementSibling.nextElementSibling
    let totalPriceElem = event.currentTarget.parentElement.parentElement.nextElementSibling.lastElementChild
    if (+countNumber.innerHTML === maxCount) {
        event.currentTarget.style.opacity = '0.6'
    } else {
        countNumber.innerHTML++
        minusBtn.innerHTML = `
            <i class="fas fa-minus"></i>
        `
        totalPriceElem.innerHTML = `<span>${price * +countNumber.innerHTML}</span> تومان`
        event.currentTarget.style.opacity = '1'
        orderTotalCountNumber.innerHTML++
        orderTotalPriceNumber.innerHTML = +orderTotalPriceNumber.innerHTML + +price
    }
}

window.plusBtnHandler = plusBtnHandler

const minusBtnHandler = (event, price, orderID) => {
    let countNumber = event.currentTarget.previousElementSibling;
    let plusBtn = event.currentTarget.previousElementSibling.previousElementSibling;
    let totalPriceElem = event.currentTarget.parentElement.parentElement.nextElementSibling.lastElementChild


    if (+countNumber.innerHTML <= 1) {
        let localStorageOrderArray = JSON.parse(localStorage.getItem('order'))
        localStorageOrders = localStorageOrderArray
        let mainOrderIndex = localStorageOrders.findIndex(order => {
            return order.id === orderID
        })
        localStorageOrders.splice(mainOrderIndex, 1)
        localStorage.setItem('order', JSON.stringify(localStorageOrders))
        allOrdersWrapper.innerHTML = ''
        showOrdersFromLocalStorage(localStorageOrders, allOrdersWrapper, totalCount, totalPrice, orderTotalCountNumber, orderTotalPriceNumber)
    } else {
        countNumber.innerHTML--
        plusBtn.style.opacity = '1'
        totalPriceElem.innerHTML = `<span>${price * +countNumber.innerHTML}</span> تومان`
        if (Number(countNumber.innerHTML) === 1) {
            event.currentTarget.innerHTML = `
                <i class="far fa-trash-alt"></i>
            `
            totalPriceElem.innerHTML = `<span>${price * +countNumber.innerHTML}</span> تومان`
        } else {
            event.currentTarget.innerHTML = `
                <i class="fas fa-minus"></i>
            `
            totalPriceElem.innerHTML = `<span>${price * +countNumber.innerHTML}</span> تومان`
        }
    }

    orderTotalCountNumber.innerHTML--
    orderTotalPriceNumber.innerHTML = +orderTotalPriceNumber.innerHTML - +price
}

window.minusBtnHandler = minusBtnHandler

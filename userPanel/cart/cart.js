
const allOrdersWrapper = document.querySelector('.order-wrapper')
const orderTotalCountNumber = document.querySelector('.order-total-count span')
const orderTotalPriceNumber = document.querySelector('.order__total-price span')

let totalCount = 0
let totalPrice = 0
let localStorageOrders = JSON.parse(localStorage.getItem('order'))

window.addEventListener('load', () => {

    if (!localStorageOrders) {
        allOrdersWrapper.innerHTML = 'محصولی انتخاب نشده است!!!'
    } else {
        console.log(localStorageOrders);
        allOrdersWrapper.innerHTML = ''
        localStorageOrders.forEach(order => {
            allOrdersWrapper.insertAdjacentHTML('beforeend', `
                <div class="order-box">
                    <div class="order-right">
                        <div class="order-image-wrapper">
                            <img
                            src="../../images/${order.cover}"
                            alt=""
                            />
                        </div>
                        <div class="order-count">
                            <button class="plus-btn" onclick="plusBtnHandler(event, ${order.maxCount}, ${order.price})">
                                <i class="fas fa-plus"></i>
                            </button>
                            <p class="orderCount">
                                ${order.count}
                            </p>
                            <button class="minus-btn" onclick="minusBtnHandler(event, ${order.price})">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="order-infos">
                        <p class="product-name">${order.name}</p>
                        <p class="product-score">
                            ${order.score}
                            <img src="../../images/Iconsax/Bold/star1.png" alt="" />
                        </p>
                        <p class="product-category">${order.category}</p>
                        <p class="product-warranty">گارانتی اصالت و سلامت فیزیکی کالا</p>
                        <p class="product-price"><span>${order.price * order.count}</span> تومان</p>
                    </div>
                </div>
            `)

            totalCount = localStorageOrders.reduce(function (accumulator, currentValue) {
                return accumulator + parseInt(currentValue.count);
            }, 0);
            orderTotalCountNumber.innerHTML = totalCount

            totalPrice = localStorageOrders.reduce(function(accumulator, currentValue) {
                var count = parseInt(currentValue.count);
                var price = parseInt(currentValue.price);
                return accumulator + (count * price);
            }, 0);
            orderTotalPriceNumber.innerHTML = totalPrice
        })
    }
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

const minusBtnHandler = (event, price) => {
    let countNumber = event.currentTarget.previousElementSibling;
    let plusBtn = event.currentTarget.previousElementSibling.previousElementSibling;
    let totalPriceElem = event.currentTarget.parentElement.parentElement.nextElementSibling.lastElementChild
    countNumber.innerHTML--
    plusBtn.style.opacity = '1'
    totalPriceElem.innerHTML = `<span>${price * +countNumber.innerHTML}</span> تومان`

    if (Number(countNumber.innerHTML) === 1) {
        event.target.innerHTML = `
            <i class="far fa-trash-alt"></i>
        `
        totalPriceElem.innerHTML = `<span>${price * +countNumber.innerHTML}</span> تومان`
    } else {
        event.target.innerHTML = `
            <i class="fas fa-minus"></i>
        `
        totalPriceElem.innerHTML = `<span>${price * +countNumber.innerHTML}</span> تومان`
    }
    orderTotalCountNumber.innerHTML--
    orderTotalPriceNumber.innerHTML = +orderTotalPriceNumber.innerHTML - +price
}

window.minusBtnHandler = minusBtnHandler

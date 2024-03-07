
const allOrdersWrapper = document.querySelector('.order-wrapper')
// const orderCountNumber = document.querySelector('.order-count p')
// const minusBtnElem = document.querySelector('.minus-btn')
// // const totalPriceElem = document.querySelector('.total-price span')
// const addOrderBtnElem = document.querySelector('.add-order')

let totalPrice = 0
let maxCount = 0
let localStorageOrders = JSON.parse(localStorage.getItem('order'))

window.addEventListener('load', () => {

    if (!localStorageOrders) {
        allOrdersWrapper.innerHTML = 'محصولی انتخاب نشده است!!!'
    } else {
        console.log(localStorageOrders);
        allOrdersWrapper.innerHTML = ''
        localStorageOrders.forEach(order => {
            maxCount = order.count
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
                            <button class="plus-btn" onclick="plusBtnHandler()">
                                <i class="fas fa-plus"></i>
                            </button>
                            <p>
                                ${order.count}
                            </p>
                            <button class="minus-btn">
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
                        <p class="product-price">${order.price * order.count} تومان</p>
                    </div>
                </div>
            `)
        })
    }
})

// const plusBtnHandler = (plusBtn, minusBtn, countNumber) => {
//     if (+countNumber.innerHTML === maxCount) {
//         plusBtnElem.style.opacity = '0.6'
//     } else {
//         orderCountNumber.innerHTML++
//         minusBtnElem.innerHTML = `
//             <i class="fas fa-minus"></i>
//         `
//         // totalPriceElem.innerHTML = totalPrice * +orderCountNumber.innerHTML
//         plusBtnElem.style.opacity = '1'
//     }
// })

// minusBtnElem.addEventListener('click', () => {
//     orderCountNumber.innerHTML--
//     plusBtnElem.style.opacity = '1'

//     if (Number(orderCountNumber.innerHTML) === 1) {
//         minusBtnElem.innerHTML = `
//             <i class="far fa-trash-alt"></i>
//         `
//     } else {
//         minusBtnElem.innerHTML = `
//             <i class="fas fa-minus"></i>
//     `
//     }
//     // totalPriceElem.innerHTML = totalPrice * +orderCountNumber.innerHTML
// })
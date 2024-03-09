import { supabase } from '../../js/database.js'
import { insertMenuDropdownItemsHtmlTemplate } from "../data-loader.js";
import { getUserInfo, isLogin } from './utils.js'

const menuDropdownElem = document.querySelectorAll('.dropdown')


let cartCounterNotificationHandler
const showNavbarProfile = () => {
  const headerProfileBtnElem = document.querySelectorAll('.header__menu-profile')
  const isUserLogin = isLogin()

  if (!isUserLogin) {
    headerProfileBtnElem.forEach(element => {
      element.innerHTML = `
        <a href="./register.html">
          <img width="32px" src="./images/Iconsax/icons8-add-user-male-48.png" alt="">
        </a>
      `
    });
  } else {
    getUserInfo().then(user => {
      headerProfileBtnElem.forEach(element => {
        element.insertAdjacentHTML('beforeend', `
        <a href="#">
          <svg
            class="header__menu-icon"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.2533 23.6667H10.0533C8.73332 23.6667 7.46666 23.1067 6.57332 22.1333C6.13021 21.6508 5.79139 21.082 5.57803 20.4626C5.36467 19.8432 5.28137 19.1864 5.33332 18.5333L6.43999 5.25332C6.47999 4.83999 6.33332 4.43999 6.05332 4.13332C5.77332 3.82666 5.38666 3.66666 4.97332 3.66666H2.66666C2.11999 3.66666 1.66666 3.21332 1.66666 2.66666C1.66666 2.11999 2.11999 1.66666 2.66666 1.66666H4.98666C5.95999 1.66666 6.87999 2.07999 7.53332 2.78666C7.89332 3.18666 8.15999 3.65332 8.30666 4.17332H24.96C26.3067 4.17332 27.5467 4.70666 28.4533 5.66666C29.3467 6.63999 29.8 7.90666 29.6933 9.25332L28.9733 19.2533C28.8267 21.6933 26.6933 23.6667 24.2533 23.6667ZM8.37332 6.15999L7.33332 18.6933C7.26666 19.4667 7.51999 20.2 8.03999 20.7733C8.55999 21.3467 9.27999 21.6533 10.0533 21.6533H24.2533C25.64 21.6533 26.8933 20.48 27 19.0933L27.72 9.09332C27.7516 8.71528 27.7039 8.3348 27.5797 7.97632C27.4556 7.61784 27.2578 7.2893 26.9991 7.01179C26.7405 6.73429 26.4266 6.51396 26.0777 6.36497C25.7288 6.21598 25.3527 6.14161 24.9733 6.14666H8.37332V6.15999ZM21.6667 30.3333C20.2 30.3333 19 29.1333 19 27.6667C19 26.2 20.2 25 21.6667 25C23.1333 25 24.3333 26.2 24.3333 27.6667C24.3333 29.1333 23.1333 30.3333 21.6667 30.3333ZM21.6667 27C21.2933 27 21 27.2933 21 27.6667C21 28.04 21.2933 28.3333 21.6667 28.3333C22.04 28.3333 22.3333 28.04 22.3333 27.6667C22.3333 27.2933 22.04 27 21.6667 27ZM11 30.3333C9.53332 30.3333 8.33332 29.1333 8.33332 27.6667C8.33332 26.2 9.53332 25 11 25C12.4667 25 13.6667 26.2 13.6667 27.6667C13.6667 29.1333 12.4667 30.3333 11 30.3333ZM11 27C10.6267 27 10.3333 27.2933 10.3333 27.6667C10.3333 28.04 10.6267 28.3333 11 28.3333C11.3733 28.3333 11.6667 28.04 11.6667 27.6667C11.6667 27.2933 11.3733 27 11 27Z"
              fill="#1B1B1B"
            />
            <path
              d="M28 11.6667H12C11.4533 11.6667 11 11.2133 11 10.6667C11 10.12 11.4533 9.66666 12 9.66666H28C28.5467 9.66666 29 10.12 29 10.6667C29 11.2133 28.5467 11.6667 28 11.6667Z"
              fill="#1B1B1B"
            />
          </svg>
          <div class="panel__link-wrapper">
            <p class="user-name">${user.user_metadata.full_name}</p>
            <a class="profile__menu-item" style="display: flex; align-items: center; gap: 10px;" href="./userPanel/main/main.html">
            <img width="32px" src="./images/Iconsax/icons8-user-profile-32.png" alt="">
            ورود به پنل کاربری</a>
            <a class="profile__menu-item" style="display: flex; align-items: center; gap: 10px;" href="./userPanel/cart/cart.html">
            <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.2533 23.6667H10.0533C8.73332 23.6667 7.46666 23.1067 6.57332 22.1333C6.13021 21.6508 5.79139 21.082 5.57803 20.4626C5.36467 19.8432 5.28137 19.1864 5.33332 18.5333L6.43999 5.25332C6.47999 4.83999 6.33332 4.43999 6.05332 4.13332C5.77332 3.82666 5.38666 3.66666 4.97332 3.66666H2.66666C2.11999 3.66666 1.66666 3.21332 1.66666 2.66666C1.66666 2.11999 2.11999 1.66666 2.66666 1.66666H4.98666C5.95999 1.66666 6.87999 2.07999 7.53332 2.78666C7.89332 3.18666 8.15999 3.65332 8.30666 4.17332H24.96C26.3067 4.17332 27.5467 4.70666 28.4533 5.66666C29.3467 6.63999 29.8 7.90666 29.6933 9.25332L28.9733 19.2533C28.8267 21.6933 26.6933 23.6667 24.2533 23.6667ZM8.37332 6.15999L7.33332 18.6933C7.26666 19.4667 7.51999 20.2 8.03999 20.7733C8.55999 21.3467 9.27999 21.6533 10.0533 21.6533H24.2533C25.64 21.6533 26.8933 20.48 27 19.0933L27.72 9.09332C27.7516 8.71528 27.7039 8.3348 27.5797 7.97632C27.4556 7.61784 27.2578 7.2893 26.9991 7.01179C26.7405 6.73429 26.4266 6.51396 26.0777 6.36497C25.7288 6.21598 25.3527 6.14161 24.9733 6.14666H8.37332V6.15999ZM21.6667 30.3333C20.2 30.3333 19 29.1333 19 27.6667C19 26.2 20.2 25 21.6667 25C23.1333 25 24.3333 26.2 24.3333 27.6667C24.3333 29.1333 23.1333 30.3333 21.6667 30.3333ZM21.6667 27C21.2933 27 21 27.2933 21 27.6667C21 28.04 21.2933 28.3333 21.6667 28.3333C22.04 28.3333 22.3333 28.04 22.3333 27.6667C22.3333 27.2933 22.04 27 21.6667 27ZM11 30.3333C9.53332 30.3333 8.33332 29.1333 8.33332 27.6667C8.33332 26.2 9.53332 25 11 25C12.4667 25 13.6667 26.2 13.6667 27.6667C13.6667 29.1333 12.4667 30.3333 11 30.3333ZM11 27C10.6267 27 10.3333 27.2933 10.3333 27.6667C10.3333 28.04 10.6267 28.3333 11 28.3333C11.3733 28.3333 11.6667 28.04 11.6667 27.6667C11.6667 27.2933 11.3733 27 11 27Z"
              fill="#1B1B1B"
            />
            <path
              d="M28 11.6667H12C11.4533 11.6667 11 11.2133 11 10.6667C11 10.12 11.4533 9.66666 12 9.66666H28C28.5467 9.66666 29 10.12 29 10.6667C29 11.2133 28.5467 11.6667 28 11.6667Z"
              fill="#1B1B1B"
            />
          </svg>
            سبد خرید
            <div class="cart-counter" style="right:85%;">
              1
            </div>
            </a>
            <a class="profile__menu-item" style="display: flex; align-items: center; gap: 10px;" onclick="userLogout()">
              <svg
                fill="#000000"
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 384.971 384.971"
                xml:space="preserve"
              >
                <g>
                  <g id="Sign_Out">
                    <path
                      d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
                C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
                C192.485,366.299,187.095,360.91,180.455,360.91z"
                    />
                    <path
                      d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
                c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
                c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"
                    />
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </g>
              </svg>
              <span>خروج از حساب کاربری</span>
            </a>
          </div>
          <div class="cart-counter">
            1
          </div>
        </a>
        `)

      })
      let cartCounterElem = document.querySelectorAll('.cart-counter')
      console.log(cartCounterElem);
      let totalCount = 0
      cartCounterNotificationHandler = () => {
        let localStorageOrderArray = JSON.parse(localStorage.getItem('order'))

        if (!localStorageOrderArray) {
          cartCounterElem.forEach(counter => {
            counter.style.visibility = 'hidden'
          })
          cartCounterElem.forEach(counter => {
            counter.style.opacity = '0'
          })
        } else {
          cartCounterElem.forEach(counter => {
            counter.style.visibility = 'visible'
          })
          cartCounterElem.forEach(counter => {
            counter.style.opacity = '1'
          })
          totalCount = localStorageOrderArray.reduce(function (accumulator, currentValue) {
            return accumulator + parseInt(currentValue.count);
          }, 0);

          cartCounterElem.forEach(counter => {
            counter.innerHTML = totalCount
          })
        }
      }
      cartCounterNotificationHandler()
    })

  }

}

const userLogout = async () => {

  let { error } = await supabase.auth.signOut()
  location.reload()

}

window.userLogout = userLogout

window.addEventListener('load', () => {
  showNavbarProfile()
  insertMenuDropdownItemsHtmlTemplate(menuDropdownElem)

})

export {
  cartCounterNotificationHandler
}
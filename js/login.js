import { userLogin } from "./func/auth.js"

const loginBtnElem = document.querySelector('.login-btn')

// user login

loginBtnElem.addEventListener('click', async e => {
    e.preventDefault()
    userLogin()
})

export {
    loginBtnElem
}
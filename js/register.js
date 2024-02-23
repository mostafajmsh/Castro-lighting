import { supabase } from '../../js/database.js'
import { userRegister } from './func/auth.js'




// User Signup
const registerBtnElem = document.querySelector('.register-btn')

registerBtnElem.addEventListener('click', async e => {
    e.preventDefault()
    userRegister()

})


const getMe = e => {
    
}
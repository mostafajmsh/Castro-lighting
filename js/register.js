import { supabase } from '../../js/database.js'

const emailInputElem = document.querySelector('.email-input')
const passwordInputElem = document.querySelector('.password-input')
const loginBtnElem = document.querySelector('.login-btn')

loginBtnElem.addEventListener('click', async e => {

    let { data, error } = await supabase.auth.signInWithPassword({
        email: 'someone@email.com',
        password: 'LlKGLdBRQXEHENjIaByZ'
    })

})
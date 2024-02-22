import { supabase } from '../../js/database.js'
import { successColor, successIcon, dangerIcon, dangerColor, statusModalChanger } from '../js/shared.js'

const emailInputElem = document.querySelector('.email-input')
const passwordInputElem = document.querySelector('.password-input')
const loginBtnElem = document.querySelector('.login-btn')

// user login

loginBtnElem.addEventListener('click', async e => {
    e.preventDefault()
    loginBtnElem.innerHTML = 'در حال ورود...'
    loginBtnElem.style.opacity = '0.8'

    let { data, error } = await supabase.auth.signInWithPassword({
        email: emailInputElem.value,
        password: passwordInputElem.value
    })

    if (error) {
        statusModalChanger('ERROR', `نام کاربری یا رمز عبور اشتباه است`, dangerColor, dangerIcon, 'امتحان دوباره')
        loginBtnElem.innerHTML = 'ورود'
        loginBtnElem.style.opacity = '1'
    } else {
        statusModalChanger('SUCCESS', `${data.user.user_metadata.first_name} عزیز خوش آمدید :)`, successColor, successIcon, 'صفحه اصلی')
        console.log(data);
        loginBtnElem.innerHTML = 'ورود'
        loginBtnElem.style.opacity = '1'
    }

})

// User Signup

const regNameInputElem = document.querySelector('.reg__fullname-input')
const regPhoneInputElem = document.querySelector('.reg__phone-input')
const regEmailInputElem = document.querySelector('.reg__email-input')
const regPasswordInputElem = document.querySelector('.reg__password-input')
const registerBtnElem = document.querySelector('.register-btn')

registerBtnElem.addEventListener('click', async e => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
        email: regEmailInputElem.value,
        password: regPasswordInputElem.value,
        options: {
            data: {
                full_name: regNameInputElem.value,
                phone: regPhoneInputElem.value
            },
        },
    })
    console.log(regEmailInputElem.value,
        regNameInputElem.value,
        regPasswordInputElem.value,
        regPhoneInputElem.value);
    if (error) {
        if (!regEmailInputElem.value.includes('@')) {
            statusModalChanger('ERROR', `ایمیل خود را بصورت صحیح وارد کنید`, dangerColor, dangerIcon, 'امتحان دوباره')
        }
        if (passwordInputElem.value.length < 6) {
            statusModalChanger('ERROR', `رمز عبور باید حداقل ۶ حرف داشته باشد`, dangerColor, dangerIcon, 'امتحان دوباره')
        }
        statusModalChanger('ERROR', `خطا هنگام ارتباط با سرور`, dangerColor, dangerIcon, 'امتحان دوباره')
    } else {
        statusModalChanger('SUCCESS', `ثبت نام شما با موفقیت انجام شد`, successColor, successIcon, 'صفحه اصلی')
    }
})

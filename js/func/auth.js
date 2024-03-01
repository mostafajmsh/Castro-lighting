import { supabase } from '../../js/database.js'
import { redirectToUserPanel, statusModalChanger } from './utils.js'
import { loginBtnElem } from '../login.js'

const userRegister = async () => {
    const regNameInputElem = document.querySelector('.reg__fullname-input')
    const regPhoneInputElem = document.querySelector('.reg__phone-input')
    const regEmailInputElem = document.querySelector('.reg__email-input')
    const regPasswordInputElem = document.querySelector('.reg__password-input')
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
        statusModalChanger('ERROR', `خطا هنگام ارتباط با سرور`, dangerColor, dangerIcon, 'امتحان دوباره')
    } else {
        statusModalChanger('SUCCESS', `ثبت نام شما با موفقیت انجام شد`, successColor, successIcon, 'ورود به پنل')
    }
}

const userLogin = async () => {
    const emailInputElem = document.querySelector('.email-input')
    const passwordInputElem = document.querySelector('.password-input')

    loginBtnElem.innerHTML = 'در حال ورود...'
    loginBtnElem.style.opacity = '0.8'

    let { data, error } = await supabase.auth.signInWithPassword({
        email: emailInputElem.value,
        password: passwordInputElem.value
    })

    if (error) {
        statusModalChanger('ERROR', `نام کاربری یا رمز عبور اشتباه است`, 'امتحان دوباره')
        loginBtnElem.innerHTML = 'ورود'
        loginBtnElem.style.opacity = '1'
    } else {
        statusModalChanger('SUCCESS', `${data.user.user_metadata.full_name} عزیز خوش آمدید :)`, 'ورود به پنل', redirectToUserPanel)
        console.log(data);
        loginBtnElem.innerHTML = 'ورود'
        loginBtnElem.style.opacity = '1'
    }
}

export {
    userRegister,
    userLogin,
}
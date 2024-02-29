import { getUserInfo } from "../js/utils.js"
import { supabase } from "../../js/database.js"
import { statusModalChanger } from "../../js/func/utils.js"
import { showUserInfosOnDashboard } from "../js/shared.js"

const profileTitle = document.querySelector('.profile-title')
const profileEmail = document.querySelector('.profile-email')
const fullNameElem = document.querySelector('.full-name')
const userAgeElem = document.querySelector('.user-age')
const emailAddressElem = document.querySelector('.email-address')
const phoneNumberElem = document.querySelector('.phone-number')
const userAddressElem = document.querySelector('.user-address')

window.addEventListener('load', () => {
    getUserInfo().then(user => {

        showUserInfosOnDashboard(
            user,
            profileTitle,
            profileEmail,
            fullNameElem,
            userAgeElem,
            emailAddressElem,
            phoneNumberElem,
            userAddressElem)
    })
})

const changeInfosBtn = document.querySelector('.change-info')
const editorModalElem = document.querySelector('.editor-modal')
const closeEditorModalBtn = document.querySelector('.close-editor-modal')
const fullNameInputElem = document.querySelector('.full-name-input')
const ageInputElem = document.querySelector('.age-input')
const emailInputElem = document.querySelector('.email-input')
const phoneInputElem = document.querySelector('.phone-input')
const passwordInputElem = document.querySelector('.password-input')
const submitPasswordBtn = document.querySelector('.submit-password')
const submitChangesBtnElem = document.querySelector('.submit-changes')

closeEditorModalBtn.addEventListener('click', () => {
    editorModalElem.style.visibility = 'hidden'
    editorModalElem.style.opacity = '0'
    editorModalElem.style.top = '0'

})

changeInfosBtn.addEventListener('click', () => {
    editorModalElem.style.visibility = 'visible'
    editorModalElem.style.opacity = '1'
    editorModalElem.style.top = '12%'
})

submitChangesBtnElem.addEventListener('click', e => {
    e.preventDefault()
    submitChangesBtnElem.innerHTML = 'در حال بررسی...'
    submitChangesBtnElem.style.opacity = '0.8'
    if (!fullNameInputElem.value.trim() &&
        !ageInputElem.value.trim() &&
        !emailInputElem.value.trim() &&
        !phoneInputElem.value.trim()) {

        statusModalChanger('ERROR', 'لطفا ابتدا مقداری وارد کنید', 'امتحان مجدد')
        submitChangesBtnElem.innerHTML = 'اعمال تغییرات'
        submitChangesBtnElem.style.opacity = '1'
    }
    if (fullNameInputElem.value.trim() ||
        ageInputElem.value.trim() ||
        emailInputElem.value.trim() ||
        phoneInputElem.value.trim()) {
        getUserInfo().then(async user => {
            let userEmailValue = emailInputElem.value.trim() ? emailInputElem.value.trim() : user.email
            let userNameValue = fullNameInputElem.value.trim() ? fullNameInputElem.value.trim() : user.user_metadata.full_name
            let userPhoneValue = phoneInputElem.value.trim() ? phoneInputElem.value.trim() : user.user_metadata.phone
            let userAgeValue = ageInputElem.value.trim() ? ageInputElem.value.trim() : user.user_metadata.age
            console.log(userEmailValue);
            const { data, error } = await supabase.auth.updateUser({
                email: userEmailValue,
                data: {
                    full_name: userNameValue,
                    phone: userPhoneValue,
                    age: userAgeValue
                }
            })
            if (error) {
                statusModalChanger(
                    'ERROR',
                    'خطایی هنگام اعمال تغییرات رخ داد\n لطفا اطلاعات وارد شده را بررسی و مجددا تلاش نمایید',
                    'امتحان مجدد')
                submitChangesBtnElem.innerHTML = 'اعمال تغییرات'
                submitChangesBtnElem.style.opacity = '1'
            } else {
                console.log(data);
                statusModalChanger(
                    'SUCCESS',
                    emailInputElem.value ? 'یک لینک تایید به ایمیل جدید شما ارسال شد \n جهت فعالسازی لطفا ایمیل جدید را تایید نمایید' : 'تغییرات شما با موفقیت ثبت شد',
                    'ادامه',
                    showUserInfosOnDashboard(
                        data.user,
                        profileTitle,
                        profileEmail,
                        fullNameElem,
                        userAgeElem,
                        emailAddressElem,
                        phoneNumberElem,
                        userAddressElem))
                editorModalElem.style.visibility = 'hidden'
                editorModalElem.style.opacity = '0'
                editorModalElem.style.top = '0'
                submitChangesBtnElem.innerHTML = 'اعمال تغییرات'
                submitChangesBtnElem.style.opacity = '1'
            }
        })
    }

})

const reSignUser = async () => {
    let { error } = await supabase.auth.signOut()
    location.href = '../../register.html'
}

submitPasswordBtn.addEventListener('click', e => {
    e.preventDefault()
    submitPasswordBtn.innerHTML = 'در حال بررسی...'
    submitPasswordBtn.style.opacity = '0.8'

    getUserInfo().then(async () => {

        const { data, error } = await supabase.auth.updateUser({
            password: passwordInputElem.value.trim(),
        })
        if (error) {
            statusModalChanger(
                'ERROR',
                'خطایی هنگام اعمال تغییرات رخ داد',
                'امتحان مجدد')
            submitPasswordBtn.innerHTML = 'اعمال تغییرات'
            submitPasswordBtn.style.opacity = '1'
        } else {
            console.log(data);
            statusModalChanger(
                'SUCCESS',
                'رمز عبور شما با موفقیت تغییر یافت \n لطفا مجددا وارد حساب خود شوید',
                'ادامه',
                setInterval(
                    reSignUser()
                    , 10000
                ))
            editorModalElem.style.visibility = 'hidden'
            editorModalElem.style.opacity = '0'
            editorModalElem.style.top = '0'
            submitPasswordBtn.innerHTML = 'اعمال تغییرات'
            submitPasswordBtn.style.opacity = '1'
        }
    })
})

const addNewAddressBtn = document.querySelector('.add-address')
const changeAddressModal = document.querySelector('.change-address-modal')
const closeAddressModalBtn = document.querySelector('.close-address-modal')
const addressInputElem = document.querySelector('.address-input')
const postInputElem = document.querySelector('.post-input')
const submitAddressElem = document.querySelector('.submit-address')

closeAddressModalBtn.addEventListener('click', () => {
    changeAddressModal.style.visibility = 'hidden'
    changeAddressModal.style.opacity = '0'
    changeAddressModal.style.top = '0'
})

addNewAddressBtn.addEventListener('click', () => {
    changeAddressModal.style.visibility = 'visible'
    changeAddressModal.style.opacity = '1'
    changeAddressModal.style.top = '25%'
})

submitAddressElem.addEventListener('click', e => {
    e.preventDefault()

    submitAddressElem.style.opacity = '0.8'
    submitAddressElem.innerHTML = 'در حال بررسی...'

    if (!addressInputElem.value || !postInputElem.value) {
        statusModalChanger('ERROR', 'آدرس یا کد پستی کامل نیست!!!!', 'امتحان مجدد')
        submitAddressElem.innerHTML = 'افزودن آدرس'
        submitAddressElem.style.opacity = '1'
    } else {
        getUserInfo().then(async user => {

            const { data, error } = await supabase.auth.updateUser({
                data: {
                    address: addressInputElem.value.trim(),
                    post_code: postInputElem.value.trim()
                }
            })
            if (error) {
                statusModalChanger(
                    'ERROR',
                    'خطایی هنگام اعمال تغییرات رخ داد',
                    'امتحان مجدد')
                submitAddressElem.innerHTML = 'افزودن آدرس'
                submitAddressElem.style.opacity = '1'
            } else {
                console.log(data);
                statusModalChanger(
                    'SUCCESS',
                    'آدرس شما با موفقیت ثبت شد',
                    'ادامه',
                    showUserInfosOnDashboard(
                        user,
                        profileTitle,
                        profileEmail,
                        fullNameElem,
                        userAgeElem,
                        emailAddressElem,
                        phoneNumberElem,
                        userAddressElem)
                )
                changeAddressModal.style.visibility = 'hidden'
                changeAddressModal.style.opacity = '0'
                changeAddressModal.style.top = '0'
                submitAddressElem.innerHTML = 'افزودن آدرس'
                submitAddressElem.style.opacity = '1'
            }
        })
    }

})
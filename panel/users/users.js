import { supabase } from '../../js/database.js'

const userFirstNameInput = document.querySelector('.user__name-input')
const userLastNameInput = document.querySelector('.user__family-input')
const userPhoneInput = document.querySelector('.user__phone-input')
const userEmailInput = document.querySelector('.user__email-input')
const userPasswordInput = document.querySelector('.user__password-input')
const createNewUserBtn = document.querySelector('.add__user-btn')

createNewUserBtn.addEventListener('click', async event => {
    event.preventDefault()
    const { data, error } = await supabase.auth.signUp({
        email: userEmailInput.value,
        password: userPasswordInput.value,
        options: {
            data: {
                first_name: userFirstNameInput.value,
                last_name: userLastNameInput.value,
                phone: userPhoneInput.value,
            },
        },
    })

    if (data) {
        console.log(data);
    } else {
        console.log(error);
    }
})

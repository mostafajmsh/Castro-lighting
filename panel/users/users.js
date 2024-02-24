import { supabase } from '../../js/database.js'

import {
    successColor,
    successIcon,
    dangerColor,
    dangerIcon,
    statusModalChanger,
    getUserRole,
    getUserInfo,
} from '../js/utils.js';

window.addEventListener('load', () => {
    if (!getUserRole()) {
        location.replace('../../register.html')
    }
    getUserInfo().then(user => {
        const profileTitle = document.querySelector('.profile-title')
        const profileEmail = document.querySelector('.profile-email')
        profileTitle.innerHTML = user.user_metadata.full_name
        profileEmail.innerHTML = user.email
    })
})

const userNameInput = document.querySelector('.user__name-input')
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
                full_name: userNameInput.value,
                phone: userPhoneInput.value,
                role: 'user'
            },
        },
    })

    if (data) {
        console.log(data);
    } else {
        console.log(error);
    }
})

const getAndShowAllUsers = async () => {
    const usersTable = document.querySelector('tbody')
    usersTable.innerHTML = ''

    const { data: { users }, error } = await supabase.auth.admin.listUsers()
    console.log(users);
    users.forEach(user => {
        usersTable.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="user-id">${user.id}</td>
                <td>${user.user_metadata.full_name}</td>
                <td>${user.user_metadata.role === 'admin' ? 'ADMIN' : 'USER'}</td>
                <td>${user.user_metadata.phone}</td>
                <td class="user-email">${user.email}</td>
                <td><button class="change-role" onclick="roleChanger('${user.id}')">تغییر نقش</button></td>
                <td><button class="edit-btn" onclick="userEditor('${user.id}')">ویرایش</button></td>
                <td><button class="delete-btn" onclick="userDelete()">حذف</button></td>
            </tr>
        `)
    });

}

const confirmModalElem = document.querySelector('.confirm-modal')
const changeRoleInputElem = document.querySelector('.change__role-input')
const cancelActionBtnElem = document.querySelector('.cancel-action')
const confirmActionBtnElem = document.querySelector('.confirm-action')

cancelActionBtnElem.addEventListener('click', () => {
    confirmModalElem.style.visibility = 'hidden'
    confirmModalElem.style.opacity = '0'
})

const roleChanger = (userID) => {

    confirmModalElem.style.visibility = 'visible'
    confirmModalElem.style.opacity = '1'

    confirmActionBtnElem.addEventListener('click', async e => {
        e.preventDefault()
        confirmActionBtnElem.innerHTML = 'در حال بررسی'
        confirmActionBtnElem.style.opacity = '0.8'
        const { data: user, error } = await supabase.auth.admin.updateUserById(
            userID,
            { user_metadata: { role: changeRoleInputElem.value.trim() } }
        )
        if (error) {
            statusModalChanger('ERROR', 'خطا در ارتباط با سرور', dangerColor, dangerIcon, 'امتحان مجدد')
        } else {
            statusModalChanger('SUCCESS', 'تغییر نقش با موفقیت انجام شد', successColor, successIcon, 'ادامه', getAndShowAllUsers)
            confirmModalElem.style.visibility = 'hidden'
            confirmModalElem.style.opacity = '0'
        }
    })

}

window.roleChanger = roleChanger

getAndShowAllUsers()

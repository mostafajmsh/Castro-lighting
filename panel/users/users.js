import { supabase } from '../../js/database.js'

import {
    statusModalChanger,
    getUserRole,
    getUserInfo,
} from '../js/utils.js';

import { getAllUsers } from '../js/shared.js';

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

    showAllUsersOnTable()
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

const showAllUsersOnTable = () => {
    const usersTable = document.querySelector('tbody')

    usersTable.innerHTML = ''

    getAllUsers().then(users => {
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
                    <td><button class="delete-btn" onclick="userDelete('${user.id}')">حذف</button></td>
                </tr>
            `)
        });
    })


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
            statusModalChanger('ERROR', 'خطا در ارتباط با سرور', 'امتحان مجدد')
        } else {
            statusModalChanger('SUCCESS', 'تغییر نقش با موفقیت انجام شد', 'ادامه', showAllUsersOnTable())
            confirmModalElem.style.visibility = 'hidden'
            confirmModalElem.style.opacity = '0'
        }
    })

}

const userEditorModal = document.querySelector('.user__editor-modal')
const userNameEditorInput = document.querySelector('.change-name')
const userEmailEditorInput = document.querySelector('.change-email')
const userPhoneEditorInput = document.querySelector('.change-phone')
const userPasswordEditorInput = document.querySelector('.change-password')
const changeUserPasswordBtn = document.querySelector('.change__user-password')
const confirmUserEditBtn = document.querySelector('.confirm-edit')
const cancelUserEditBtn = document.querySelector('.cancel-edit')

cancelUserEditBtn.addEventListener('click', () => {
    userEditorModal.style.visibility = 'hidden';
    userEditorModal.style.opacity = '0';
})

const changeUserInfosOnEditor = async (userID) => {
    let userNameInfo = document.querySelector('.user-name')
    let userEmailInfo = document.querySelector('.user__info-email')
    let userPhoneInfo = document.querySelector('.user-phone')
    userNameInfo.innerHTML = ''
    userEmailInfo.innerHTML = ''
    userPhoneInfo.innerHTML = ''

    const { data, error } = await supabase.auth.admin.getUserById(userID)

    userNameInfo.innerHTML = `
        <span>نام و نام خانوادگی کاربر: </span>${data.user.user_metadata.full_name}
    `
    userEmailInfo.innerHTML = `
        <span>ایمیل کاربر: </span>${data.user.email}
    `
    userPhoneInfo.innerHTML = `
        <span>شماره تلفن کاربر: </span>${data.user.user_metadata.phone}
    `
    return data.user
}

const userEditor = (userID) => {
    userEditorModal.style.visibility = 'visible';
    userEditorModal.style.opacity = '1';
    changeUserInfosOnEditor(userID)
    confirmUserEditBtn.addEventListener('click', e => {
        e.preventDefault()
        confirmUserEditBtn.innerHTML = 'در حال بررسی';
        confirmUserEditBtn.style.opacity = '0.8'

        let userNameInputValue
        let userEmailInputValue
        let userPhoneInputValue
        changeUserInfosOnEditor(userID).then(async chooseUser => {
            userNameInputValue = userNameEditorInput.value.trim() ? userNameEditorInput.value.trim() : chooseUser.user_metadata.name
            userEmailInputValue = userEmailEditorInput.value.trim() ? userEmailEditorInput.value.trim() : chooseUser.email
            userPhoneInputValue = userPhoneEditorInput.value.trim() ? userPhoneEditorInput.value.trim() : chooseUser.user_metadata.phone

            const { data: user, error } = await supabase.auth.admin.updateUserById(
                userID,
                {
                    email: userEmailInputValue,
                    user_metadata: {
                        full_name: userNameInputValue,
                        phone: userPhoneInputValue
                    }
                }
            )
            if (error) {
                statusModalChanger('ERROR', 'خطا در ارتباط با سرور', 'امتحان مجدد')
                confirmUserEditBtn.innerHTML = 'ویرایش اطلاعات';
                confirmUserEditBtn.style.opacity = '1'
            } else {
                statusModalChanger('SUCCESS', 'تغییرات جدید با موفقیت انجام شد', 'ادامه', showAllUsersOnTable())
                userEditorModal.style.visibility = 'hidden'
                userEditorModal.style.opacity = '0'
                confirmUserEditBtn.innerHTML = 'ویرایش اطلاعات';
                confirmUserEditBtn.style.opacity = '1'
            }

        })

    })

    changeUserPasswordBtn.addEventListener('click', async e => {
        e.preventDefault()
        changeUserPasswordBtn.innerHTML = 'در حال بررسی';
        changeUserPasswordBtn.style.opacity = '0.8'

        if (userPasswordEditorInput.value.length < 6) {
            alert('!!!!!رمز عبور باید حداقل ۶ حرف داشته باشد')
        } else {
            const { data: user, error } = await supabase.auth.admin.updateUserById(
                userID,
                { password: userPasswordEditorInput.value }
            )
            if (error) {
                statusModalChanger('ERROR', 'خطا در ارتباط با سرور', 'امتحان مجدد')
                changeUserPasswordBtn.innerHTML = 'تغییر رمز';
                changeUserPasswordBtn.style.opacity = '1'
            } else {
                statusModalChanger('SUCCESS', 'تغییر رمز عبور با موفقیت انجام شد', 'ادامه', showAllUsersOnTable())
                userEditorModal.style.visibility = 'hidden'
                userEditorModal.style.opacity = '0'
                changeUserPasswordBtn.innerHTML = 'تغییر رمز';
                changeUserPasswordBtn.style.opacity = '1'
            }
        }
    })

}

const confirmDeleteModal = document.querySelector('.confirm__delete-modal')
const cancelDeleteBtn = document.querySelector('.cancel-delete')
const confirmDeleteBtn = document.querySelector('.confirm-delete')

cancelDeleteBtn.addEventListener('click', () => {
    confirmDeleteModal.style.visibility = 'hidden'
    confirmDeleteModal.style.opacity = '0'
})

const userDelete = (userID) => {
    confirmDeleteModal.style.visibility = 'visible'
    confirmDeleteModal.style.opacity = '1'

    confirmDeleteBtn.addEventListener('click', async () => {
        confirmDeleteBtn.innerHTML = 'در حال حذف'
        confirmDeleteBtn.style.opacity = '0.8'

        const { data, error } = await supabase.auth.admin.deleteUser(
            userID
        )
        if (error) {
            statusModalChanger('ERROR', 'خطا در ارتباط با سرور', 'امتحان مجدد')
            confirmDeleteBtn.innerHTML = 'بله'
            confirmDeleteBtn.style.opacity = '1'
        } else {
            statusModalChanger('SUCCESS', 'حذف کاربر با موفقیت انجام شد', 'ادامه', showAllUsersOnTable())
            confirmDeleteBtn.innerHTML = 'بله'
            confirmDeleteBtn.style.opacity = '1'
            confirmDeleteModal.style.visibility = 'hidden'
            confirmDeleteModal.style.opacity = '0'
        }
    })
}

window.roleChanger = roleChanger
window.userEditor = userEditor
window.userDelete = userDelete

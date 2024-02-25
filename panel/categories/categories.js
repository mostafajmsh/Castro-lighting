import { supabase } from '../../js/database.js'

import {
    statusModalChanger,
    getUserRole,
    getUserInfo,
} from '../js/utils.js';

import { getAllCategories } from '../js/shared.js';

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

    showCategoriesOnTable()

})

const categoryTitleInput = document.querySelector('.category__title-input')
const categoryNameInput = document.querySelector('.category__name-input')
const categoryCoverInput = document.querySelector('.category__cover-input')
const addCategoryBtn = document.querySelector('.add__category-btn')


let categoryCover = null

categoryCoverInput.addEventListener("change", event => {
    categoryCover = event.target.files[0].name
});

const addNewCategory = async () => {

    const { data, error } = await supabase
        .from('categories')
        .insert([
            {
                title: categoryTitleInput.value.trim(),
                name: categoryNameInput.value.trim(),
                cover: categoryCover
            },
        ])
        .select()

    if (error) {
        statusModalChanger('ERROR', 'عملیات با خطا مواجه شد', 'امتحان مجدد')
        addCategoryBtn.innerHTML = 'افزودن'
        addCategoryBtn.style.opacity = '1'
    } else {
        statusModalChanger('SUCCESS', 'دسته بندی جدید با موفقیت ثبت شد', 'ادامه', showCategoriesOnTable())
        addCategoryBtn.innerHTML = 'افزودن'
        addCategoryBtn.style.opacity = '1'
        categoryTitleInput.value = ''
        categoryNameInput.value = ''
        categoryCoverInput.value = ''
    }

}

addCategoryBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addCategoryBtn.innerHTML = 'در حال بررسی...'
    addCategoryBtn.style.opacity = '0.8'
    addNewCategory()
})

const tableItemsWrapper = document.querySelector('tbody')

const showCategoriesOnTable = () => {
    getAllCategories().then(categories => {
        tableItemsWrapper.innerHTML = ''
        categories.forEach(category => {
            tableItemsWrapper.insertAdjacentHTML('beforeend', `
                <tr>
                    <td class="id-td">${category.id}</td>
                    <td>${category.title}</td>
                    <td>${category.name}</td>
                    <td class="cover-td">${category.cover}</td>
                    <td><button class="edit-btn" onclick="editCategory('${category.id}')">ویرایش</button></td>
                    <td><button class="delete-btn" onclick="deleteCategory('${category.id}')">حذف</button></td>
                </tr>
            `)
        });
    })
}
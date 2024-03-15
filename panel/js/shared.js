import { supabase } from '../../js/database.js'
import { statusModalChanger } from './utils.js'

const getAllProducts = async () => {

    let { data: products, error } = await supabase
        .from('products')
        .select('*')

    let allProducts = await products

    return allProducts
}

const ShowCategoriesOnCategorySelection = (inputElem) => {
    // inputElem.innerHTML = ''
    getAllCategories().then(categories => {
        categories.forEach(category => {
            inputElem.insertAdjacentHTML('beforeend', `
                <option class="${category.name}" value="${category.id}">${category.title}</option>
            `)

        })
    })
}

const productEditorHandler = async (updateBtn, inputName, obj, productID, elementsArray, errorMessage, modal, func) => {
    updateBtn.innerHTML = 'اعمال تغییرات...';
    updateBtn.style.opacity = '0.8';

    if (inputName.value.trim()) {
        const { data, error } = await supabase
            .from('products')
            .update(obj)
            .eq('id', productID)
            .select()

        if (data) {
            updateBtn.innerHTML = 'ویرایش محصول';
            updateBtn.style.opacity = '1';
            statusModalChanger('SUCCESS', 'ویرایش محصول با موفقیت انجام شد', 'ادامه')
            elementsArray.forEach(element => {
                element.value = ''
            })
            errorMessage.forEach(error => {
                error.style.visibility = 'hidden'
            })
            modal.style.visibility = 'hidden'
            modal.style.opacity = '0'
            func
        } else if (error) {
            statusModalChanger('ERROR', 'خطایی هنگام ویرایش محصول رخ داد', 'امتحان مجدد')
        }

    } else {
        errorMessage.forEach(error => {
            error.style.visibility = 'visible'
        })
        updateBtn.innerHTML = 'ویرایش محصول';
        updateBtn.style.opacity = '1';
    }
}

const getAllUsers = async () => {
    const { data: { users }, error } = await supabase.auth.admin.listUsers()

    let AllUsers = users

    return AllUsers
}

const getAllCategories = async () => {

    let { data: categories, error } = await supabase
        .from('categories')
        .select('*')
    let allCategories = categories

    return allCategories
}

export {
    getAllProducts,
    getAllUsers,
    productEditorHandler,
    ShowCategoriesOnCategorySelection,
    getAllCategories
}
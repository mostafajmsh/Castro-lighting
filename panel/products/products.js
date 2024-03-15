import { supabase } from '../../js/database.js'
import {
    statusModalChanger,
    getUserRole,
    getUserInfo,
} from '../js/utils.js';

import {
    productEditorHandler,
    getAllProducts,
    getAllCategories,
    ShowCategoriesOnCategorySelection
} from '../js/shared.js';

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
    tableBody.innerHTML = ''
    ShowCategoriesOnCategorySelection(categorySelectionInput)
    ShowCategoriesOnCategorySelection(productNewCategoryEditorInput)
    showProductsInTable()
})

const $ = document
let newProductFormElem = $.querySelector('.new-product-form');
let tableElem = $.querySelector('.products-table');
let tableBody = $.querySelector('tbody');
let saveBtnElem = $.querySelector('.save-btn');
let productsTableBtn = $.querySelector('.products__table-btn');
let backBtn = $.querySelector('.back-btn');
let confirmDeleteModal = $.querySelector('.confirm__delete-modal');
let cancelDeleteBtn = $.querySelector('.cancel-delete');
let confirmDeleteBtn = $.querySelector('.confirm-delete');

let productCover = null

let coverInputElem = $.querySelector('.cover-selection');

coverInputElem.addEventListener("change", event => {
    productCover = event.target.files[0].name
});

// Save New Products In Database

let categorySelectionInput = $.querySelector('.category')

let categoryID = null

let categoryTitle = null

categorySelectionInput.addEventListener('change', (event) => {
    categoryID = event.target.value
    getAllCategories().then(categories => {
        let filteredCategory = categories.filter(category => {
            if (category.id === categoryID) {
                return category
            }
        })
        categoryTitle = filteredCategory[0].title
        console.log(categoryID, categoryTitle);
        return categoryTitle
    })
    return categoryTitle
})

saveBtnElem.addEventListener('click', async e => {
    e.preventDefault()
    saveBtnElem.innerHTML = 'در حال ثبت...';
    saveBtnElem.style.opacity = '0.8';
    let nameInputElem = $.querySelector('.name-input');
    let priceInputElem = $.querySelector('.price-input');
    let scoreInputElem = $.querySelector('.score-input');
    let descriptionInputElem = $.querySelector('#product-description');
    let countInputElem = $.querySelector('.count-input');

    const { data, error } = await supabase
        .from('products')
        .insert([
            {
                name: nameInputElem.value.trim(),
                price: priceInputElem.value.trim(),
                cover: productCover,
                categoryID: categoryID,
                score: scoreInputElem.value.trim(),
                categoryTitle,
                description: descriptionInputElem.value.trim(),
                count: countInputElem.value.trim()
            },
        ])
        .select()
    console.log(data, error)
    if (data) {
        statusModalChanger('SUCCESS', 'محصول جدید با موفقیت ثبت شد', 'ادامه', showProductsInTable())
        saveBtnElem.innerHTML = 'ثبت محصول';
        saveBtnElem.style.opacity = '1';
        nameInputElem.value = '';
        priceInputElem.value = '';
        scoreInputElem.value = '';
        countInputElem.value = '';
        descriptionInputElem.value = '';
        coverInputElem.value = '';
    } else {
        statusModalChanger('ERROR', 'خطا در ارتباط با سرور', 'امتحان مجدد')
        saveBtnElem.innerHTML = 'ثبت محصول';
        saveBtnElem.style.opacity = '1';
    }
})

// Show And Hide Products Table
productsTableBtn.addEventListener('click', () => {
    newProductFormElem.style.display = 'none';
    tableElem.style.display = 'block';
    backBtn.style.display = 'flex';
})

backBtn.addEventListener('click', () => {
    newProductFormElem.style.display = 'unset';
    tableElem.style.display = 'none';
    backBtn.style.display = 'none';
})

// Show All Products In Products Table
const showProductsInTable = () => {
    tableBody.innerHTML = ''
    getAllProducts().then(productsArray => {
        tableBody.innerHTML = ''
        productsArray.forEach(product => {
            tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="product-id">${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.categoryTitle}</td>
                <td>${product.count}</td>
                <td><button class="edit-btn" onclick="editProduct('${product.id}')">ویرایش محصول</button></td>
                <td><button class="delete-btn" onclick="deleteProduct('${product.id}')">حذف محصول</button></td>
            </tr>
            `)
        });

    })
}

// Delete Btn Logic

const deleteProduct = (productID) => {

    confirmDeleteModal.style.visibility = 'visible';
    confirmDeleteModal.style.opacity = '1';
    confirmDeleteBtn.addEventListener('click', async function () {

        confirmDeleteBtn.innerHTML = 'در حال بررسی...';
        confirmDeleteBtn.style.opacity = '0.8';

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productID)
        if (error) {
            statusModalChanger('ERROR', 'خطایی هنگام حذف محصول رخ داد', 'امتحان مجدد')
        } else {
            statusModalChanger('SUCCESS', 'حذف محصول با موفقیت انجام شد', 'ادامه', showProductsInTable())
            confirmDeleteBtn.innerHTML = 'بله';
            confirmDeleteBtn.style.opacity = '1';
        }
        confirmDeleteModal.style.visibility = 'hidden';
        confirmDeleteModal.style.opacity = '0';

    })

}

window.deleteProduct = deleteProduct

cancelDeleteBtn.addEventListener('click', function () {
    confirmDeleteModal.style.visibility = 'hidden';
    confirmDeleteModal.style.opacity = '0';
})

// Edit Btn Logic

let editProductModal = $.querySelector('.edit__product-modal')
let columnSelectionElem = $.querySelector('#field-selection')
let nameEditorElem = $.querySelector('.name-editor')
let categoryEditorElem = $.querySelector('.category-editor')
let priceEditorElem = $.querySelector('.price-editor')
let scoreEditorElem = $.querySelector('.score-editor')
let countEditorElem = $.querySelector('.count-editor')
let descriptionEditorElem = $.querySelector('.description-editor')
let coverEditorElem = $.querySelector('.cover-editor')

if (columnSelectionElem.value === 'name') {
    nameEditorElem.style.display = 'flex'
}

columnSelectionElem.addEventListener('change', () => {

    if (+columnSelectionElem.value === -1) {
        nameEditorElem.style.display = 'none'
        categoryEditorElem.style.display = 'none'
        priceEditorElem.style.display = 'none'
        scoreEditorElem.style.display = 'none'
        countEditorElem.style.display = 'none'
        descriptionEditorElem.style.display = 'none'
        coverEditorElem.style.display = 'none'
    } else if (columnSelectionElem.value === 'name') {
        nameEditorElem.style.display = 'flex'
        categoryEditorElem.style.display = 'none'
        priceEditorElem.style.display = 'none'
        scoreEditorElem.style.display = 'none'
        countEditorElem.style.display = 'none'
        descriptionEditorElem.style.display = 'none'
        coverEditorElem.style.display = 'none'
    } else if (columnSelectionElem.value === 'category') {
        categoryEditorElem.style.display = 'flex'
        nameEditorElem.style.display = 'none'
        priceEditorElem.style.display = 'none'
        scoreEditorElem.style.display = 'none'
        countEditorElem.style.display = 'none'
        descriptionEditorElem.style.display = 'none'
        coverEditorElem.style.display = 'none'
    } else if (columnSelectionElem.value === 'price') {
        priceEditorElem.style.display = 'flex'
        categoryEditorElem.style.display = 'none'
        nameEditorElem.style.display = 'none'
        scoreEditorElem.style.display = 'none'
        countEditorElem.style.display = 'none'
        descriptionEditorElem.style.display = 'none'
        coverEditorElem.style.display = 'none'
    } else if (columnSelectionElem.value === 'score') {
        scoreEditorElem.style.display = 'flex'
        priceEditorElem.style.display = 'none'
        categoryEditorElem.style.display = 'none'
        nameEditorElem.style.display = 'none'
        countEditorElem.style.display = 'none'
        descriptionEditorElem.style.display = 'none'
        coverEditorElem.style.display = 'none'
    } else if (columnSelectionElem.value === 'count') {
        countEditorElem.style.display = 'flex'
        scoreEditorElem.style.display = 'none'
        priceEditorElem.style.display = 'none'
        categoryEditorElem.style.display = 'none'
        nameEditorElem.style.display = 'none'
        descriptionEditorElem.style.display = 'none'
        coverEditorElem.style.display = 'none'
    } else if (columnSelectionElem.value === 'description') {
        descriptionEditorElem.style.display = 'flex'
        countEditorElem.style.display = 'none'
        scoreEditorElem.style.display = 'none'
        priceEditorElem.style.display = 'none'
        categoryEditorElem.style.display = 'none'
        nameEditorElem.style.display = 'none'
        coverEditorElem.style.display = 'none'
    } else {
        coverEditorElem.style.display = 'flex'
        descriptionEditorElem.style.display = 'none'
        countEditorElem.style.display = 'none'
        scoreEditorElem.style.display = 'none'
        priceEditorElem.style.display = 'none'
        categoryEditorElem.style.display = 'none'
        nameEditorElem.style.display = 'none'
    }
})

let productNameEditorInput = $.querySelector('.product-name')
let productPriceEditorInput = $.querySelector('.product-price')
let productScoreEditorInput = $.querySelector('.product-score')
let productCountEditorInput = $.querySelector('.product-count')
let productNewDescriptionEditorInput = $.querySelector('#product-new-description')
let productNewCategoryEditorInput = $.querySelector('.product-new-category')
let productNewCoverSelection = $.querySelector('.new-cover-selection')
let updateBtn = $.querySelector('.update-btn')
let closeEditorBtn = $.querySelector('.close-editor')
let errorMessage = document.querySelectorAll('.error-message')


let elementsArray = [
    productNameEditorInput,
    productPriceEditorInput,
    productScoreEditorInput,
    productCountEditorInput,
    productNewDescriptionEditorInput,
    productNewCategoryEditorInput,
    productNewCoverSelection
]

closeEditorBtn.addEventListener('click', (e) => {
    e.preventDefault()
    editProductModal.style.visibility = 'hidden';
    editProductModal.style.opacity = '0';
    errorMessage.forEach(error => error.style.visibility = 'hidden')
    elementsArray.forEach(element => element.value = '')
})

productNewCategoryEditorInput.addEventListener('change', (event) => {
    categoryID = event.target.value
    getAllCategories().then(categories => {
        let filteredCategory = categories.filter(category => {
            if (category.id === categoryID) {
                return category
            }
        })
        categoryTitle = filteredCategory[0].title
        console.log(categoryID, categoryTitle);
        return categoryTitle
    })
    return categoryTitle
})

const editProduct = (productID) => {
    editProductModal.style.visibility = 'visible';
    editProductModal.style.opacity = '1';
    updateBtn.addEventListener('click', async (event) => {
        event.preventDefault()

        if (nameEditorElem.style.display === 'flex') {
            let nameObj = { name: productNameEditorInput.value.trim() }
            productEditorHandler(updateBtn, productNameEditorInput, nameObj, productID, elementsArray, errorMessage, editProductModal, showProductsInTable())
        }

        if (priceEditorElem.style.display === 'flex') {
            let priceObj = { price: productPriceEditorInput.value.trim() }
            productEditorHandler(updateBtn, productPriceEditorInput, priceObj, productID, elementsArray, errorMessage, editProductModal, showProductsInTable())
        }

        if (scoreEditorElem.style.display === 'flex') {
            let scoreObj = { score: productScoreEditorInput.value.trim() }
            productEditorHandler(updateBtn, productScoreEditorInput, scoreObj, productID, elementsArray, errorMessage, editProductModal, showProductsInTable())
        }

        if (countEditorElem.style.display === 'flex') {
            let countObj = { count: productCountEditorInput.value.trim() }
            productEditorHandler(updateBtn, productCountEditorInput, countObj, productID, elementsArray, errorMessage, editProductModal, showProductsInTable())
        }

        if (descriptionEditorElem.style.display === 'flex') {
            let descriptionObj = { description: productNewDescriptionEditorInput.value.trim() }
            productEditorHandler(updateBtn, productNewDescriptionEditorInput, descriptionObj, productID, elementsArray, errorMessage, editProductModal, showProductsInTable())
        }

        if (categoryEditorElem.style.display === 'flex') {
            let categoryObj = {
                categoryID: productNewCategoryEditorInput.value.trim()
            }
            let categoryTitleObj = {
                categoryTitle
            }
            productEditorHandler(updateBtn, productNewCategoryEditorInput, categoryObj, productID, elementsArray, errorMessage, editProductModal, showProductsInTable())
            productEditorHandler(updateBtn, productNewCategoryEditorInput, categoryTitleObj, productID, elementsArray, errorMessage, editProductModal, showProductsInTable())

        }

        if (coverEditorElem.style.display === 'flex') {
            let coverObj = { cover: productNewCoverSelection.value }
            productEditorHandler(updateBtn, productPriceEditorInput, coverObj, productID, elementsArray, errorMessage, editProductModal, showProductsInTable())
        }

    })
}

window.editProduct = editProduct
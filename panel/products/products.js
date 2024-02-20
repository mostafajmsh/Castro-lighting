import { supabase } from '../../js/database.js'
import { successColor, successIcon, dangerColor, dangerIcon, statusModalChanger, productEditorHandler, getAllProducts } from '../js/utils.js';

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

saveBtnElem.addEventListener('click', async e => {
    e.preventDefault()
    saveBtnElem.innerHTML = 'در حال ثبت...';
    saveBtnElem.style.opacity = '0.8';
    let nameInputElem = $.querySelector('.name-input');
    let priceInputElem = $.querySelector('.price-input');
    let scoreInputElem = $.querySelector('.score-input');
    let descriptionInputElem = $.querySelector('#product-description');
    let coverInputElem = $.querySelector('.cover-selection');
    let category = $.querySelector('.category').value.trim();
    let categoryName = $.querySelector(`option.${category}`).innerHTML;
    let countInputElem = $.querySelector('.count-input')

    const { data, error } = await supabase
        .from('products')
        .insert([
            {
                name: nameInputElem.value.trim(),
                price: priceInputElem.value.trim(),
                cover: coverInputElem.value.trim(),
                category,
                score: scoreInputElem.value.trim(),
                categoryName,
                description: descriptionInputElem.value.trim(),
                count: countInputElem.value.trim()
            },
        ])
        .select()
    console.log(data, error)
    if (data) {
        statusModalChanger('SUCCESS', 'محصول جدید با موفقیت ثبت شد', successColor, successIcon, 'ادامه')
        saveBtnElem.innerHTML = 'ثبت محصول';
        saveBtnElem.style.opacity = '1';
        nameInputElem.value = '';
        priceInputElem.value = '';
        scoreInputElem.value = '';
        countInputElem.value = '';
        descriptionInputElem.value = '';
        coverInputElem.value = '';
    } else {
        statusModalChanger('ERROR', 'خطا در ارتباط با سرور', dangerColor, dangerIcon, 'امتحان مجدد')
    }
})

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

export const showProductsInTable = () => {
    tableBody.innerHTML = ''
    getAllProducts().then(productsArray => {
        productsArray.forEach(product => {
            tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="product-id">${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.categoryName}</td>
                <td>${product.count}</td>
                <td><button class="edit-btn" onclick="editProduct('${product.id}')">ویرایش محصول</button></td>
                <td><button class="delete-btn" onclick="deleteProduct('${product.id}')">حذف محصول</button></td>
            </tr>
            `)
        });

    })
}

window.addEventListener('load', () => {

    showProductsInTable()

})

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
            statusModalChanger('ERROR', 'خطایی هنگام حذف محصول رخ داد', dangerColor, dangerIcon, 'امتحان مجدد')
        } else {
            console.log('ok');
            statusModalChanger('SUCCESS', 'حذف محصول با موفقیت انجام شد', successColor, successIcon, 'ادامه')
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

    if (columnSelectionElem.value === 'name') {
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
let errorMessage = $.querySelectorAll('.error-message')

closeEditorBtn.addEventListener('click', (e) => {
    e.preventDefault()
    editProductModal.style.visibility = 'hidden';
    editProductModal.style.opacity = '0';
    errorMessage.forEach(error => error.style.visibility = 'hidden')
    productNameEditorInput.value = ''
    productPriceEditorInput.value = ''
    productScoreEditorInput.value = ''
    productCountEditorInput.value = ''
    productNewDescriptionEditorInput.value = ''
    productNewCategoryEditorInput.value = ''
    productNewCoverSelection.value = ''
})

const editProduct = (productID) => {
    editProductModal.style.visibility = 'visible';
    editProductModal.style.opacity = '1';
    updateBtn.addEventListener('click', async (event) => {
        event.preventDefault()

        if (nameEditorElem.style.display === 'flex') {
            let nameObj = { name: productNameEditorInput.value.trim() }
            productEditorHandler(productNameEditorInput, nameObj, productID)
        }

        if (priceEditorElem.style.display === 'flex') {
            let priceObj = { price: productPriceEditorInput.value.trim() }
            productEditorHandler(productPriceEditorInput, priceObj, productID)
        }

        if (scoreEditorElem.style.display === 'flex') {
            let scoreObj = { score: productScoreEditorInput.value.trim() }
            productEditorHandler(productScoreEditorInput, scoreObj, productID)
        }

        if (countEditorElem.style.display === 'flex') {
            let countObj = { count: productCountEditorInput.value.trim() }
            productEditorHandler(productCountEditorInput, countObj, productID)
        }

        if (descriptionEditorElem.style.display === 'flex') {
            let descriptionObj = { description: productNewDescriptionEditorInput.value.trim() }
            productEditorHandler(productNewDescriptionEditorInput, descriptionObj, productID)
        }

        if (categoryEditorElem.style.display === 'flex') {
            let categoryObj = { category: productNewCategoryEditorInput.value.trim() }
            productEditorHandler(productNewCategoryEditorInput, categoryObj, productID)
        }

        if (coverEditorElem.style.display === 'flex') {
            let coverObj = { cover: productNewCoverSelection.value }
            productEditorHandler(productPriceEditorInput, coverObj, productID)
        }

    })
}

window.editProduct = editProduct

export {
    updateBtn,
    errorMessage,
    productNameEditorInput,
    productPriceEditorInput,
    productScoreEditorInput,
    productCountEditorInput,
    productNewDescriptionEditorInput,
    productNewCategoryEditorInput,
    productNewCoverSelection
}
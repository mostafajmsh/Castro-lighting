import { supabase } from '../../js/database.js'
import { getAllProducts } from '../../js/data-loader.js'

const $ = document
let formElem = $.querySelector('form')
let tableElem = $.querySelector('.products-table')
let tableBody = $.querySelector('tbody')
let saveBtnElem = $.querySelector('.save-btn');
let successCard = $.querySelector('.success');
let errorCard = $.querySelector('.danger');
let statusCardBtn = $.querySelector('#successBtn')
let errorCardBtn = $.querySelector('#errorBtn')
let productsTableBtn = $.querySelector('.products__table-btn')
let backBtn = $.querySelector('.back-btn')
let confirmDeleteModal = $.querySelector('.confirm__delete-modal')
let cancelDeleteBtn = $.querySelector('.cancel-delete')
let confirmDeleteBtn = $.querySelector('.confirm-delete')
let deleteSuccessCard = $.querySelector('.delete-success');
let deleteErrorCard = $.querySelector('.delete-danger');
let deleteStatusCardBtn = $.querySelector('#delete-successBtn')
let deleteErrorCardBtn = $.querySelector('#delete-errorBtn')

statusCardBtn.addEventListener('click', () => {
    successCard.style.visibility = 'hidden'
    successCard.style.opacity = '0'
})

errorCardBtn.addEventListener('click', () => {
    errorCard.style.visibility = 'hidden'
    errorCard.style.opacity = '0'
})

saveBtnElem.addEventListener('click', async e => {
    e.preventDefault()
    saveBtnElem.innerHTML = 'در حال ثبت...'
    saveBtnElem.style.opacity = '0.8'
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
        successCard.style.visibility = 'visible'
        successCard.style.opacity = '1'
        saveBtnElem.innerHTML = 'ثبت محصول'
        saveBtnElem.style.opacity = '1'
        nameInputElem.value = ''
        priceInputElem.value = ''
        scoreInputElem.value = ''
        descriptionInputElem.value = ''
        coverInputElem.value = ''
    } else {
        errorCard.style.visibility = 'visible'
        errorCard.style.opacity = '1'
    }
})

productsTableBtn.addEventListener('click', () => {
    formElem.style.display = 'none'
    tableElem.style.display = 'block'
    backBtn.style.display = 'flex'
})

backBtn.addEventListener('click', () => {
    formElem.style.display = 'flex'
    tableElem.style.display = 'none'
    backBtn.style.display = 'none'
})

window.addEventListener('load', () => {

    tableBody.innerHTML = ''

    getAllProducts().then(products => {
        console.log(products);
        products.forEach(product => {
            tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="product-id">${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.categoryName}</td>
                <td>${product.count}</td>
                <td><button class="edit-btn">ویرایش محصول</button></td>
                <td><button class="delete-btn" onclick="deleteProduct('${product.id}')">حذف محصول</button></td>
            </tr>
            `)
        });

    })
})

const deleteProduct = (productID) => {

    confirmDeleteModal.style.display = 'flex';
    confirmDeleteBtn.addEventListener('click', async function () {

        confirmDeleteBtn.innerHTML = 'در حال بررسی...';
        confirmDeleteBtn.style.opacity = '0.8'

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productID)
        if (error) {
            console.log(error);
            deleteErrorCard.style.visibility = 'visible'
            deleteErrorCard.style.opacity = '1'
        } else {
            console.log('ok');
            deleteSuccessCard.style.visibility = 'visible'
            deleteSuccessCard.style.opacity = '1'
            confirmDeleteBtn.innerHTML = 'بله';
            confirmDeleteBtn.style.opacity = '1'
        }
        confirmDeleteModal.style.display = 'none'
    })

}

window.deleteProduct = deleteProduct

cancelDeleteBtn.addEventListener('click', function () {
    confirmDeleteModal.style.display = 'none'
})

deleteStatusCardBtn.addEventListener('click', () => {
    deleteSuccessCard.style.visibility = 'hidden'
    deleteSuccessCard.style.opacity = '0'
})

deleteErrorCardBtn.addEventListener('click', () => {
    deleteErrorCard.style.visibility = 'hidden'
    deleteErrorCard.style.opacity = '0'
})
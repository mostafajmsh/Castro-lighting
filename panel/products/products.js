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
                description: descriptionInputElem.value.trim()
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
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.categoryName}</td>
                <td>۵</td>
                <td><button class="edit-btn">ویرایش محصول</button></td>
                <td><button class="delete-btn">حذف محصول</button></td>
            </tr>
            `)
        });
    })
})